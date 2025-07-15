import { Component, Input } from '@angular/core';
import { Web3Service } from '@app/core/web3.service';
import { UserPotService } from '@app/core/services/user-pot.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JoinPotRequest } from '@app/shared/models/user-pot.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'join-pot-btn',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './join-pot-btn.component.html',
  styleUrls: ['./join-pot-btn.component.scss'],
})
export class JoinPotBtnComponent {
  @Input() contractAddress = '';
  userAddress: string | null = null;
  joining = false;
  message = '';
  private sub!: Subscription;

  constructor(
    private web3: Web3Service,
    private userPotService: UserPotService
  ) {}

  ngOnInit() {
    this.sub = this.web3.userAddress$.subscribe(address => {
      this.userAddress = address;
    });
    // Optionally, check for existing connection on load
    this.web3.checkExistingConnection().catch(error => {
      this.message = 'Error checking wallet connection: ' + error.message;
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  async joinPot() {
    this.message = '';
    this.joining = true;
   
    try {
      const contract = this.web3.getContractAt(this.contractAddress);
      
      const entryAmount = await contract['entryAmount']();
      
      const tx = await contract['joinPot']({ value: entryAmount });
      await tx.wait();

      const joinRequest: JoinPotRequest = {
        contractAddress: this.contractAddress,
        walletAddress: this.userAddress!,
      };
      
      console.log('🌐 Sending request to backend:', joinRequest);
      this.userPotService.joinPot(joinRequest).subscribe({
        next: (response) => {
          this.message = 'Joined the pot!';
          this.joining = false;
        },
        error: (error) => {
          console.error('❌ Backend error:', error);
          this.message =
            'Smart contract transaction successful, but backend update failed.';
          this.joining = false;
        },
      });
    } catch (error: any) {
      console.error('❌ Smart contract error:', error);
      this.message = `❌ ${error.reason || error.message}`;
      this.joining = false;
    }
  }
}

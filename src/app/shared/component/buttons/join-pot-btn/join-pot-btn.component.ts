import { Component, Input } from '@angular/core';
import { Web3Service } from '@app/core/web3.service';
import { UserPotService } from '@app/core/services/user-pot.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WalletConnectComponent } from '@app/shared/component/wallet-connect/wallet-connect.component';
import { JoinPotRequest } from '@app/shared/models/user-pot.model';

@Component({
  selector: 'join-pot-btn',
  imports: [CommonModule, RouterModule, WalletConnectComponent],
  standalone: true,
  templateUrl: './join-pot-btn.component.html',
  styleUrls: ['./join-pot-btn.component.scss'],
})
export class JoinPotBtnComponent {
  @Input() userAddress: string | null = null;
  @Input() contractAddress = '';
  joining = false;
  connecting = false;
  message = '';

  constructor(
    private web3: Web3Service,
    private userPotService: UserPotService
  ) {}

  async ngOnInit() {
    if (!this.userAddress) {
      await this.connectWallet();
    }
  }

  async connectWallet() {
    this.connecting = true;
    this.message = '';
    try {
      this.userAddress = await this.web3.connectWallet();
    } catch (error: any) {
      this.message = error.message || 'Failed to connect wallet.';
    } finally {
      this.connecting = false;
    }
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
      
      this.userPotService.joinPot(joinRequest).subscribe({
        next: (response) => {
          this.message = '✅ Joined the pot!';
          console.log('Backend response:', response);
        },
        error: (error) => {
          this.message =
            '⚠️ Smart contract transaction successful, but backend update failed.';
          console.error('Backend API error:', error);
        },
      });
    } catch (error: any) {
      this.message = `❌ ${error.reason || error.message}`;
    } finally {
      this.joining = false;
    }
  }
}

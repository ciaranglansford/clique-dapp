import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreatePotRequest, Pot } from '@app/shared/models/pot.model';
import { Web3Service } from '@app/core/web3.service';
import { PotService } from '@app/core/services/pot.service';
import { ethers } from 'ethers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'create-pot-btn',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-pot-btn.component.html',
  styleUrls: ['./create-pot-btn.component.scss']
})
export class CreatePotBtnComponent {
  userAddress: string | null = null;
  isDeploying = false;
  deployMessage: string | null = null;
  entryAmountEth = '';
  message = '';
  private sub!: Subscription;

  constructor(private web3: Web3Service, private potService: PotService) {}

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

  async createPot() {
    this.deployMessage = null;
    this.isDeploying = true;
    console.log('🚀 Starting pot creation...');

    try {
      const entryAmount = ethers.parseEther(this.entryAmountEth);
      const maxParticipants = 10;
      
      const contractAddress = await this.web3.deployCliquePot(entryAmount, maxParticipants);

      const createPotRequest: CreatePotRequest = {
        contractAddress: contractAddress
      }
      
      console.log('🌐 Sending request to backend:', createPotRequest);
      this.potService.createPot(createPotRequest).subscribe({
        next: (result: Pot) => {
          this.deployMessage = `Pool created at ${result.contractAddress}`;
          this.isDeploying = false;
        },
        error: (err) => {
          console.error('❌ Backend error:', err);
          this.deployMessage = `❌ ${err.message || err}`;
          this.isDeploying = false;
        }
      });
    } catch (err: any) {
      console.error('❌ Smart contract error:', err);
      this.deployMessage = `❌ ${err.message || err}`;
      this.isDeploying = false;
    }
  }
} 
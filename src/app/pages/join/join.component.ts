import { Component } from '@angular/core';
import { Web3Service } from '@app/core/web3.service';
import { PotService } from '@app/core/services/pot.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WalletConnectComponent } from '@app/shared/component/wallet-connect/wallet-connect.component';
import { JoinPotRequest } from '@app/shared/models/pot.model';

@Component({
  selector: 'app-join',
  imports: [CommonModule, RouterModule, WalletConnectComponent],
  standalone: true,
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent {
  userAddress: string = '';
  joining = false;
  message = '';

  constructor(
    private web3: Web3Service,
    private potService: PotService
  ) {}

  async connectWallet() {
    try {
      this.userAddress = await this.web3.connectWallet();
    } catch (error: any) {
      this.message = error.message;
    }
  }

  async joinPot() {
    this.message = '';
    this.joining = true;
    try {
      // Step 1: Join the smart contract
      const contract = this.web3.getContract();
      const entryAmount = await contract['entryAmount'](); // already in wei
      const tx = await contract['joinPot']({ value: entryAmount });
      await tx.wait();
      
      // Step 2: Call backend API to record the join
      const contractAddress = contract.target as string;
      const joinRequest: JoinPotRequest = {
        contractAddress: contractAddress,
        walletAddress: this.userAddress
      };
      
      this.potService.joinPot(joinRequest).subscribe({
        next: (response) => {
          this.message = '✅ Joined the pot! Backend updated successfully.';
          console.log('Backend response:', response);
        },
        error: (error) => {
          this.message = '⚠️ Smart contract transaction successful, but backend update failed.';
          console.error('Backend API error:', error);
        }
      });
      
    } catch (error: any) {
      this.message = `❌ ${error.reason || error.message}`;
    } finally {
      this.joining = false;
    }
  }
}
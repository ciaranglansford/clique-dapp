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
    console.log('🚀 Starting pot join...');
    console.log('📋 Contract address:', this.contractAddress);
    console.log('👤 User address:', this.userAddress);
    
    try {
      console.log('🔗 Getting contract instance...');
      const contract = this.web3.getContractAt(this.contractAddress);
      
      console.log('💰 Getting entry amount...');
      const entryAmount = await contract['entryAmount']();
      console.log('💵 Entry amount:', entryAmount.toString());
      
      console.log('📝 Sending join transaction...');
      const tx = await contract['joinPot']({ value: entryAmount });
      console.log('⏳ Waiting for transaction confirmation...');
      await tx.wait();
      console.log('✅ Transaction confirmed!');

      const joinRequest: JoinPotRequest = {
        contractAddress: this.contractAddress,
        walletAddress: this.userAddress!,
      };
      
      console.log('🌐 Sending request to backend:', joinRequest);
      this.userPotService.joinPot(joinRequest).subscribe({
        next: (response) => {
          console.log('✅ Backend response:', response);
          this.message = '✅ Joined the pot!';
          this.joining = false;
        },
        error: (error) => {
          console.error('❌ Backend error:', error);
          this.message =
            '⚠️ Smart contract transaction successful, but backend update failed.';
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

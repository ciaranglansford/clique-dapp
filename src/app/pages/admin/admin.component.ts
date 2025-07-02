import { Component, OnInit, OnDestroy } from '@angular/core';
import { Web3Service } from '@app/core/web3.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WalletConnectComponent } from '@app/shared/component/wallet-connect/wallet-connect.component';


@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterModule, WalletConnectComponent],
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy{
  userAddress: string = '';
  message = '';
  processing = false;
  payoutInfo: { round: bigint, winner: string, amount: string } | null = null;

  constructor(private web3: Web3Service) {}

  async ngOnInit() {
    await this.web3.connectWallet();
    this.web3.listenToPayoutExecuted((data) => {
      console.log("📥 Event received in component:", data);
      this.payoutInfo = data;
    });
  }

  ngOnDestroy() {
    this.web3.removePayoutListeners();
  }

  async connectWallet() {
    try {
      this.userAddress = await this.web3.connectWallet();
    } catch (error: any) {
      this.message = error.message;
    }
  }

  async triggerPayout() {
    this.message = '';
    this.processing = true;
    try {
      const contract = this.web3.getContract();
      await contract['triggerPayout']();
      this.message = '✅ Payout triggered!';
    } catch (error: any) {
      this.message = `❌ ${error.reason || error.message}`;
    } finally {
      this.processing = false;
    }
  }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Web3Service } from '@app/core/web3.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  userAddress: string = '';
  message = '';
  processing = false;
  payoutInfo: { round: bigint, winner: string, amount: string } | null = null;
  private sub!: Subscription;

  constructor(private web3: Web3Service) {}

  ngOnInit() {
    this.sub = this.web3.userAddress$.subscribe(address => {
      this.userAddress = address || '';
    });
    // Optionally, check for existing connection on load
    this.web3.checkExistingConnection().catch(error => {
      this.message = error.message;
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  async triggerPayout() {
    this.message = '';
    this.processing = true;
    try {
      //const contract = this.web3.getContract();
      //await contract['triggerPayout']();
      this.message = '✅ Payout triggered!';
    } catch (error: any) {
      this.message = `❌ ${error.reason || error.message}`;
    } finally {
      this.processing = false;
    }
  }

  clearPayoutInfo() {
    this.payoutInfo = null;
  }
}
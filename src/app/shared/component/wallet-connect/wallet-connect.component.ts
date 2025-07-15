import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Web3Service } from '@app/core/web3.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wallet-connect',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wallet-connect.component.html',
  styleUrl: './wallet-connect.component.scss'
})
export class WalletConnectComponent implements OnInit, OnDestroy {
  userAddress: string = '';
  error: string = '';
  loading = false;
  private sub!: Subscription;

  constructor(private web3: Web3Service) {}

  ngOnInit() {
    this.sub = this.web3.userAddress$.subscribe(address => {
      this.userAddress = address || '';
    });
    // Removed checkExistingConnection call
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  async connectWallet() {
    this.loading = true;
    this.error = '';
    try {
      await this.web3.connectWallet();
      // userAddress will update via subscription
    } catch (err: any) {
      this.error = err.message || 'Wallet connection failed';
    } finally {
      this.loading = false;
    }
  }
}

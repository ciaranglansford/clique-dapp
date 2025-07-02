import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Web3Service } from '@app/core/web3.service';

@Component({
  selector: 'app-wallet-connect',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wallet-connect.component.html',
  styleUrl: './wallet-connect.component.scss'
})
export class WalletConnectComponent implements OnInit {
  userAddress: string = '';
  error: string = '';

  @Output() connected: EventEmitter<string> = new EventEmitter<string>();

  constructor(private web3: Web3Service) {}

  async ngOnInit() {
    // Check for existing wallet connection on component load
    try {
      const address = await this.web3.checkExistingConnection();
      if (address) {
        this.userAddress = address;
        this.connected.emit(this.userAddress);
      }
    } catch (err: any) {
      this.error = err.message || 'Wallet connection check failed';
    }
  }

  async connectWallet() {
    try {
      this.userAddress = await this.web3.connectWallet();
      this.connected.emit(this.userAddress);
    } catch (err: any) {
      this.error = err.message || 'Wallet connection failed';
    }
  }
}

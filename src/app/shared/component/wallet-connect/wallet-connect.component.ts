import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { Web3Service } from '@app/core/web3.service';

@Component({
  selector: 'app-wallet-connect',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wallet-connect.component.html',
  styleUrl: './wallet-connect.component.scss'
})
export class WalletConnectComponent {
  userAddress: string = '';
  error: string = '';

  @Output() connected: EventEmitter<string> = new EventEmitter<string>();

  constructor(private web3: Web3Service) {}

  async connectWallet() {
    try {
      this.userAddress = await this.web3.connectWallet();
      this.connected.emit(this.userAddress);
    } catch (err: any) {
      this.error = err.message || 'Wallet connection failed';
    }
  }
}

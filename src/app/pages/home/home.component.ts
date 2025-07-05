import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Web3Service } from '../../core/web3.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  walletConnected = false;
  userAddress: string | null = null;

  constructor(private web3: Web3Service) {}

  async connectWallet() {
    try {
      this.userAddress = await this.web3.connectWallet();
      this.walletConnected = true;
    } catch (err) {
      alert((err as Error).message);
    }
  }
}

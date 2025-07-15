import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { WalletConnectComponent } from './shared/component/wallet-connect/wallet-connect.component';
import { Web3Service } from './core/web3.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, WalletConnectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'clique-dapp';
  currentYear = new Date().getFullYear();

  constructor(private web3: Web3Service) {
    this.web3.checkExistingConnection();
  }
}

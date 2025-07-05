import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Web3Service } from '@app/core/web3.service';
import { WalletConnectComponent } from '@app/shared/component/wallet-connect/wallet-connect.component';
import { JoinPotComponent } from '@app/shared/component/join-pot/join-pot.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, WalletConnectComponent, JoinPotComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})

export class UserProfileComponent implements OnInit, OnDestroy{
  userAddress: string = '';
  message = '';

  constructor(private web3: Web3Service){}

  async ngOnInit() {
    await this.web3.connectWallet();
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

}

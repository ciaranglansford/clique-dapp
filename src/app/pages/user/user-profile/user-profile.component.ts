import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Web3Service } from '@app/core/web3.service';
import { WalletConnectComponent } from '@app/shared/component/wallet-connect/wallet-connect.component';
import { JoinPotBtnComponent } from '@app/shared/component/buttons/join-pot-btn/join-pot-btn.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, WalletConnectComponent, JoinPotBtnComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userAddress: string = '';
  message = '';

  constructor(private web3: Web3Service) {}

  async ngOnInit() {
    try {
      this.userAddress = await this.web3.checkExistingConnection() || '';
    } catch (error: any) {
      this.message = error.message;
    }
  }

  ngOnDestroy() {
    this.web3.removePayoutListeners();
  }

  onWalletConnected(address: string) {
    this.userAddress = address;
    this.message = '';
  }
}

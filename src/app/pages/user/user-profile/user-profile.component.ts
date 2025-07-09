import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Web3Service } from '@app/core/web3.service';
import { WalletConnectComponent } from '@app/shared/component/wallet-connect/wallet-connect.component';
import { JoinPotBtnComponent } from '@app/shared/component/buttons/join-pot-btn/join-pot-btn.component';
import { PotPreviewComponent } from '@app/shared/component/display/pot-preview/pot-preview.component'
import { UserPotService } from '@app/core/services/user-pot.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, WalletConnectComponent, JoinPotBtnComponent, PotPreviewComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userAddress: string = '';
  userPotAddresses: string[] = [];
  isLoading: boolean = false;
  message: string | null = null;

  constructor(private web3: Web3Service, private userPotService: UserPotService) {}

  async ngOnInit(): Promise<void> {
    try {
      const existingAddress = await this.web3.checkExistingConnection();
      if (existingAddress) {
        this.onWalletConnected(existingAddress);
      }
    } catch (error: any) {
      this.message = 'Error checking wallet connection: ' + error.message;
    }
  }

  ngOnDestroy(): void {
    this.web3.removePayoutListeners();
  }

  onWalletConnected(address: string): void {
    this.userAddress = address;
    this.isLoading = true;
    this.message = null;

    this.userPotService.getUserPots(address).subscribe({
      next: (res) => {
        this.userPotAddresses = res.potList || [];
        if (this.userPotAddresses.length === 0) {
          this.message = 'You haven’t joined any pots yet.';
        }
        this.isLoading = false;
      },
      error: () => {
        this.message = 'Could not load your pots. Please try again.';
        this.isLoading = false;
      }
    });
  }

  hasUserPots(): boolean {
    return Array.isArray(this.userPotAddresses) && this.userPotAddresses.length > 0;
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Web3Service } from '@app/core/web3.service';
import { JoinPotBtnComponent } from '@app/shared/component/buttons/join-pot-btn/join-pot-btn.component';
import { JoinedPotPreviewComponent } from '@app/shared/component/display/joined-pot-preview/joined-pot-preview.component';
import { UserPotService } from '@app/core/services/user-pot.service';
import { CreatePotBtnComponent } from '@app/shared/component/buttons/create-pot-btn/create-pot-btn.component';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, JoinPotBtnComponent, JoinedPotPreviewComponent, CreatePotBtnComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userAddress: string = '';
  userPotAddresses: string[] = [];
  isLoading: boolean = false;
  message: string | null = null;
  private sub!: Subscription;

  constructor(
    private web3: Web3Service,
    private userPotService: UserPotService,
  ) {}

  ngOnInit(): void {
    let firstEmission = true;
    this.sub = this.web3.userAddress$
      .pipe(distinctUntilChanged())
      .subscribe(address => {
        this.userAddress = address || '';
        if (this.userAddress) {
          this.loadUserPots(this.userAddress);
        } else if (!firstEmission) {
          this.userPotAddresses = [];
          this.message = null;
        }
        firstEmission = false;
      });
    // Removed checkExistingConnection call
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  private loadUserPots(address: string): void {
    this.isLoading = true;
    this.message = null;
    this.userPotService.getUserPots(address).subscribe({
      next: (res) => {
        this.userPotAddresses = res.contractAddresses || [];
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

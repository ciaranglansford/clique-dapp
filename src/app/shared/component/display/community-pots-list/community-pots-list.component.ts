import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PotService } from '@app/core/services/pot.service';
import { PotPreviewComponent } from '@app/shared/component/display/pot-preview/pot-preview.component';

@Component({
  selector: 'community-pots-list',
  standalone: true,
  imports: [CommonModule, PotPreviewComponent],
  templateUrl: './community-pots-list.component.html',
  styleUrl: './community-pots-list.component.scss'
})
export class CommunityPotsListComponent implements OnInit {
  isLoading = true;
  potContractAddresses: string[] = [];

  constructor(private potService: PotService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.potService.getAllPots().subscribe({
      next: (response) => {
        this.potContractAddresses = response.potList || [];
        this.isLoading = false;
      },
      error: () => {
        this.potContractAddresses = [];
        this.isLoading = false;
      }
    });
  }

  hasPots(): boolean {
    return this.potContractAddresses.length > 0;
  }
}

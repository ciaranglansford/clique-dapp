import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PotService } from '@app/core/services/pot.service';
import { PotPreviewComponent } from '@app/shared/component/display/pot-preview/pot-preview.component';
import { Pot } from '@app/shared/models/pot.model';

@Component({
  selector: 'community-pots-list',
  standalone: true,
  imports: [CommonModule, PotPreviewComponent],
  templateUrl: './community-pots-list.component.html',
  styleUrl: './community-pots-list.component.scss'
})
export class CommunityPotsListComponent implements OnInit {
  isLoading = true;
  potList: Pot[] = [];

  constructor(private potService: PotService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.potService.getAllPots().subscribe({
      next: (response) => {
        this.potList = response.potList || [];
        this.isLoading = false;
      },
      error: () => {
        this.potList = [];
        this.isLoading = false;
      }
    });
  }

  hasPots(): boolean {
    return this.potList.length > 0;
  }
}

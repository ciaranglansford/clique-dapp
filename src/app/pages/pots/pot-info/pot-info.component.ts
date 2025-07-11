import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PotService } from '@app/core/services/pot.service';
import { PotInfoResponse } from '@app/shared/models/pot.model';

@Component({
  selector: 'app-pot-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pot-info.component.html',
  styleUrl: './pot-info.component.scss'
})
export class PotInfoComponent implements OnInit {
  contractAddress!: string;
  potInfo: PotInfoResponse | null = null;
  isLoading = false;
  hasError = false;

  constructor(
    private route: ActivatedRoute,
    private potService: PotService
  ) {}

  ngOnInit() {
    this.contractAddress = this.route.snapshot.paramMap.get('contractAddress') ?? '';
    if (!this.contractAddress) {
      this.hasError = true;
      return;
    }
    this.fetchPotInfo();
  }

  fetchPotInfo() {
    this.isLoading = true;
    this.hasError = false;
    this.potService.getPotInfo(this.contractAddress).subscribe({
      next: (res) => {
        this.potInfo = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch pot info', err);
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PotService } from '@app/core/services/pot.service';
import { PotInfoResponse } from '@app/shared/models/pot.model';
import { Observable, catchError, shareReplay, of } from 'rxjs';
import { DetailedPotViewComponent } from '@app/shared/component/display/detailed-pot-view/detailed-pot-view.component';

@Component({
  selector: 'app-pot-info',
  standalone: true,
  imports: [CommonModule, DetailedPotViewComponent],
  templateUrl: './pot-info.component.html',
  styleUrl: './pot-info.component.scss'
})
export class PotInfoComponent implements OnInit {
  contractAddress!: string;
  potInfo$!: Observable<PotInfoResponse | null>;
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
    
    this.potInfo$ = this.potService.getPotInfo(this.contractAddress).pipe(
      catchError(err => {
        console.error('Failed to fetch pot info', err);
        this.hasError = true;
        this.isLoading = false;
        return of(null);
      }),
      shareReplay(1) // Cache the result and prevent duplicate fetches
    );
    
    this.potInfo$.subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}

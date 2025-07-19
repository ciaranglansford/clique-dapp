import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PotEntryService } from '@app/core/services/pot-entry.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DetailedPotViewComponent } from '@app/shared/component/display/detailed-pot-view/detailed-pot-view.component';
import { PotEntry } from '@app/shared/models/pot-entry.model';

@Component({
  selector: 'app-pot-info',
  standalone: true,
  imports: [CommonModule, DetailedPotViewComponent],
  templateUrl: './pot-info.component.html',
  styleUrl: './pot-info.component.scss'
})
export class PotInfoComponent implements OnInit {
  contractAddress!: string;
  potEntries$!: Observable<PotEntry[]>;

  isLoading = false;
  hasError = false;

  constructor(
    private route: ActivatedRoute,
    private potEntryService: PotEntryService
  ) {}

  ngOnInit() {
    this.contractAddress = this.route.snapshot.paramMap.get('contractAddress') ?? '';
    if (!this.contractAddress) {
      this.hasError = true;
      return;
    }
    this.fetchPotEntries();
  }

  fetchPotEntries() {
    this.isLoading = true;
    this.hasError = false;

    this.potEntries$ = this.potEntryService.getUsersByContract(this.contractAddress).pipe(
      catchError(err => {
        console.error('Failed to fetch pot entries', err);
        this.hasError = true;
        this.isLoading = false;
        return of([]); // Return an empty array to avoid breaking *ngFor
      })
    );

    // Only used to manage loading state; async pipe handles data in template
    this.potEntries$.subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.hasError = true;
      }
    });
  }
}

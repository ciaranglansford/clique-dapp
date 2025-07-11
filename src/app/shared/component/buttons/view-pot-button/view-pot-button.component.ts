import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'view-pot-button',
  standalone: true,
  imports: [],
  templateUrl: './view-pot-button.component.html',
  styleUrl: './view-pot-button.component.scss'
})
export class ViewPotButtonComponent {
  @Input() contractAddress!: string;

  constructor(private router: Router) {}

  navigateToPot() {
    if (!this.contractAddress) {
      console.warn('No contractAddress provided to view-pot-button');
      return;
    }
    this.router.navigate(['/pots', this.contractAddress]);
  }
}

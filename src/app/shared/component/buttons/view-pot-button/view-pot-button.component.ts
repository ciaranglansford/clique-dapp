import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Pot } from '@app/shared/models/pot.model';

@Component({
  selector: 'view-pot-button',
  standalone: true,
  imports: [],
  templateUrl: './view-pot-button.component.html',
  styleUrl: './view-pot-button.component.scss'
})
export class ViewPotButtonComponent {
  @Input() pot!: Pot;

  constructor(private router: Router) {}

  navigateToPot() {
    if (!this.pot.contractAddress) {
      console.warn('No contractAddress provided to view-pot-button');
      return;
    }
    this.router.navigate(['/pots', this.pot.contractAddress]);
  }
}

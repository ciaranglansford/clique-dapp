import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PotInfoResponse } from '@app/shared/models/pot.model';

/**
 * TODO: Improve the visual design of `detailed-pot-view`
 * - Apply Tailwind classes or Angular Material cards
 * - Add responsive layout and better visual hierarchy
 * - Consider status indicators (Active, Paid Out, etc.) if data supports it
 * - Add loading skeleton or spinner if needed
 */
@Component({
  selector: 'detailed-pot-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detailed-pot-view.component.html',
  styleUrl: './detailed-pot-view.component.scss'
})
export class DetailedPotViewComponent {
  @Input() potInfo!: PotInfoResponse;
} 
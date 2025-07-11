import { Component, Input } from '@angular/core';
import { JoinPotBtnComponent } from '@app/shared/component/buttons/join-pot-btn/join-pot-btn.component';
import { ViewPotButtonComponent } from '@app/shared/component/buttons/view-pot-button/view-pot-button.component';

@Component({
  selector: 'pot-preview',
  standalone: true,
  imports: [JoinPotBtnComponent, ViewPotButtonComponent],
  templateUrl: './pot-preview.component.html',
  styleUrl: './pot-preview.component.scss'
})
export class PotPreviewComponent {
  @Input() userAddress: string = '';
  @Input() contractAddress!: string;
}

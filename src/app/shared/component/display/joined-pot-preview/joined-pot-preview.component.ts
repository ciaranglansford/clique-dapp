import { Component, Input } from '@angular/core';
import { JoinPotBtnComponent } from '@app/shared/component/buttons/join-pot-btn/join-pot-btn.component';
import { ViewPotButtonComponent } from '@app/shared/component/buttons/view-pot-button/view-pot-button.component';

@Component({
  selector: 'joined-pot-preview',
  standalone: true,
  imports: [JoinPotBtnComponent, ViewPotButtonComponent],
  templateUrl: './joined-pot-preview.component.html',
  styleUrl: './joined-pot-preview.component.scss'
})
export class JoinedPotPreviewComponent {
  @Input() contractAddress!: string;
}

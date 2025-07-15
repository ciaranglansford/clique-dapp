import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PotService } from '@app/core/services/pot.service';
import { CustomPotRequest, CustomPotResponse } from '@app/shared/models/pot.model';
import { CreateCustomPotBtnComponent } from '@app/shared/component/buttons/create-custom-pot-btn/create-custom-pot-btn.component';

@Component({
  selector: 'app-custom-pot-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CreateCustomPotBtnComponent],
  templateUrl: './custom-pot.page.html',
  styleUrl: './custom-pot.page.scss'
})
export class CustomPotPageComponent {
  customPotForm: FormGroup;
  currencyOptions = [
    { label: 'ETH', value: 'ETH' }
    // Future: Add more currencies here
  ];
  message: string | null = null;
  createdPot: CustomPotResponse | null = null;

  constructor(private fb: FormBuilder, private potService: PotService) {
    this.customPotForm = this.fb.group({
      entryAmount: [0.01, [Validators.required, Validators.min(0.001)]],
      currencyType: ['ETH', Validators.required],
      maxPlayers: [2, [Validators.required, Validators.min(2)]]
    });
  }

  get formValue() {
    return this.customPotForm.value;
  }

  onCreateCustomPot(data: CustomPotRequest) {
    this.message = null;
    this.createdPot = null;
    this.potService.createCustomPot(data).subscribe({
      next: (res) => {
        this.createdPot = res;
        this.message = '✅ Custom pot created!';
      },
      error: (err) => {
        this.message = `❌ ${err.message || err}`;
      }
    });
  }
} 
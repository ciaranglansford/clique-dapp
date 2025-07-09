import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Web3Service } from '@app/core/web3.service';
import { PotService } from '@app/core/services/pot.service';

@Component({
  selector: 'app-create-pot-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-pot-btn.component.html',
  styleUrl: './create-pot-btn.component.scss'
})
export class CreatePotBtnComponent {
  @Input() userAddress: string | null = null;
  

  constructor( 
    private web3: Web3Service,
    private potService: PotService
  ){}

  async ngOnInit() {
    if (!this.userAddress) {
      await this.connectWallet();
    }
  }

  async connectWallet() {
    this.connecting = true;
    this.message = '';
    try {
      this.userAddress = await this.web3.connectWallet();
      this.message = 'Wallet connected!';
    } catch (error: any) {
      this.message = error.message || 'Failed to connect wallet.';
    } finally {
      this.connecting = false;
    }
  }
}

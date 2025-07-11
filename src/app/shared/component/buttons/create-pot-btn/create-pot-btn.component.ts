import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreatePotRequest, Pot } from '@app/shared/models/pot.model';
import { Web3Service } from '@app/core/web3.service';
import { PotService } from '@app/core/services/pot.service';
import { ethers } from 'ethers';

@Component({
  selector: 'create-pot-btn',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-pot-btn.component.html',
  styleUrls: ['./create-pot-btn.component.scss']
})
export class CreatePotBtnComponent {
  @Input() userAddress: string | null = null;
  isDeploying = false;
  deployMessage: string | null = null;
  entryAmountEth = '';
  connecting = false;
  message = '';

  constructor(private web3: Web3Service, private potService: PotService) {}

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

  async createPot() {
    this.deployMessage = null;
    this.isDeploying = true;

    try {
      const entryAmount = ethers.parseEther(this.entryAmountEth);
      const contractAddress = await this.web3.deployCliquePot(entryAmount);

      const createPotRequest: CreatePotRequest = {
        contractAddress: contractAddress
      }
      
      this.potService.createPot(createPotRequest).subscribe({
        next: (result: Pot) => {
          this.deployMessage = `✅ Pool created at ${result.contractAddress}`;
        },
        error: (err) => {
          this.deployMessage = `❌ ${err.message || err}`;
        }
      });
    } catch (err: any) {
      this.deployMessage = `❌ ${err.message || err}`;
    } finally {
      this.isDeploying = false;
    }
  }
} 
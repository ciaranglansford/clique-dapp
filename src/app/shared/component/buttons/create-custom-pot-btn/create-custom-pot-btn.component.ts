import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomPotRequest, CustomPotResponse } from '@app/shared/models/pot.model';
import { Web3Service } from '@app/core/web3.service';
import { PotService } from '@app/core/services/pot.service';
import { ethers } from 'ethers';

@Component({
  selector: 'create-custom-pot-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-custom-pot-btn.component.html',
  styleUrls: ['./create-custom-pot-btn.component.scss']
})
export class CreateCustomPotBtnComponent {
  @Input() customPotData!: CustomPotRequest;
  @Input() disabled = false;
  @Output() create = new EventEmitter<CustomPotResponse>();

  isDeploying = false;
  deployMessage: string | null = null;

  constructor(private web3: Web3Service, private potService: PotService) {}

  async createCustomPot() {
    this.deployMessage = null;
    this.isDeploying = true;
    try {
      const entryAmount = ethers.parseEther(this.customPotData.entryAmount.toString());
      const maxParticipants = this.customPotData.maxPlayers;
      // Deploy contract
      const contractAddress = await this.web3.deployCliquePot(entryAmount, maxParticipants);
      // Call backend
      const backendPayload = {
        ...this.customPotData,
        contractAddress
      };
      // this.potService.createCustomPot(backendPayload as any).subscribe({
      //   next: (result: CustomPotResponse) => {
      //     this.deployMessage = `Custom pot created at ${result.contractAddress}`;
      //     this.isDeploying = false;
      //     this.create.emit(result);
      //   },
      //   error: (err) => {
      //     this.deployMessage = `❌ ${err.message || err}`;
      //     this.isDeploying = false;
      //   }
      // });
    } catch (err: any) {
      this.deployMessage = `❌ ${err.message || err}`;
      this.isDeploying = false;
    }
  }
} 
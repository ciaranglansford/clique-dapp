import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePotRequest, CreatePotResponse } from '@app/shared/models/pot.model';
import { Web3Service } from '@app/core/web3.service';
import { PotService } from '@app/core/services/pot.service';
import { ethers } from 'ethers';

@Component({
  selector: 'create-comunity-pot-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-community-pot-btn.component.html',
  styleUrls: ['./create-community-pot-btn.component.scss']
})
export class CreateCommunityPotBtnComponent {
  @Input() customPotData!: CreatePotRequest;
  @Input() disabled = false;
  @Output() create = new EventEmitter<CreatePotResponse>();

  isDeploying = false;
  deployMessage: string | null = null;

  constructor(private web3: Web3Service, private potService: PotService) {}

  async createCustomPot() {
    this.deployMessage = null;
    this.isDeploying = true;
    try {
      const entryAmount = ethers.parseEther(this.customPotData.entryAmount.toString());
      const maxPlayers = this.customPotData.maxPlayers;
      // Deploy contract
      const contractAddress = await this.web3.deployCliquePot(entryAmount, maxPlayers);
      // Call backend
      const backendPayload = {
        ...this.customPotData,
        contractAddress
      };
      this.isDeploying = false;
      this.potService.createCustomPot(backendPayload as any).subscribe({
        next: (result: CreatePotResponse) => {
          this.deployMessage = `Custom pot created at ${result.contractAddress}`;
          this.isDeploying = false;
          this.create.emit(result);
        },
        error: (err) => {
          this.deployMessage = `❌ ${err.message || err}`;
          this.isDeploying = false;
        }
      });
    } catch (err: any) {
      this.deployMessage = `❌ ${err.message || err}`;
      this.isDeploying = false;
    }
  }
} 
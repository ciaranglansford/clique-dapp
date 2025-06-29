import { Component } from '@angular/core';
import { Web3Service } from '@app/core/web3.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-join',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent {
  userAddress: string = '';
  joining = false;
  message = '';

  constructor(private web3: Web3Service) {}

  async connectWallet() {
    try {
      this.userAddress = await this.web3.connectWallet();
    } catch (error: any) {
      this.message = error.message;
    }
  }

  async joinPool() {
    this.message = '';
    this.joining = true;
    try {
      const contract = this.web3.getContract();
      const entryAmount = await contract['entryAmount'](); // already in wei
      const tx = await contract['joinPool']({ value: entryAmount });
      await tx.wait();
      this.message = '✅ Joined the pool!';
    } catch (error: any) {
      this.message = `❌ ${error.reason || error.message}`;
    } finally {
      this.joining = false;
    }
  }
}
import { Component } from '@angular/core';
import { Web3Service } from '@app/core/web3.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  message = '';
  processing = false;

  constructor(private web3: Web3Service) {}

  async triggerPayout() {
    this.message = '';
    this.processing = true;
    try {
      const contract = this.web3.getContract();
      await contract['triggerPayout']();
      this.message = '✅ Payout triggered!';
    } catch (error: any) {
      this.message = `❌ ${error.reason || error.message}`;
    } finally {
      this.processing = false;
    }
  }
}
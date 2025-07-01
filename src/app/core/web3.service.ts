import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import CliquePoolAbi from '../../assets/CliquePool.json'; // your ABI

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

@Injectable({ providedIn: 'root' })
export class Web3Service {
  private provider!: ethers.BrowserProvider;
  private signer!: ethers.Signer;
  private contract!: ethers.Contract;

  async connectWallet(): Promise<string> {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }
    this.provider = new ethers.BrowserProvider(window.ethereum);
    await this.provider.send('eth_requestAccounts', []);
    this.signer = await this.provider.getSigner();
    this.contract = new ethers.Contract(CONTRACT_ADDRESS, CliquePoolAbi.abi as ethers.InterfaceAbi, this.signer);
    return this.signer.getAddress();
  }

  listenToPayoutExecuted(callback: (data: { round: bigint, winner: string, amount: string }) => void) {
    if (!this.contract) throw new Error("Contract not initialized. Call connectWallet() first.");
    
    console.log("🔊 Listening to PayoutExecuted...");
    this.contract.on('PayoutExecuted', (round, winner, amount) => {
      callback({
        round,
        winner,
        amount: ethers.formatEther(amount)
      });
    });
  }
  
  removePayoutListeners() {
    if (!this.contract) return;
    this.contract.removeAllListeners('PayoutExecuted');
  }

  getContract() {
    return this.contract;
  }

  getProvider() {
    return this.provider;
  }

  getSigner() {
    return this.signer;
  }
}
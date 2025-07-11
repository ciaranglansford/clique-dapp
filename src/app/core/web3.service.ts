import { Injectable } from '@angular/core';
import { ethers, getAddress  } from 'ethers';
import CliquePotAbi from '../../assets/CliquePot.json'; // your ABI
import { deployContract } from './services/deploy-contract.util';

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

@Injectable({ providedIn: 'root' })
export class Web3Service {
  private provider!: ethers.BrowserProvider;
  private signer!: ethers.Signer;
  private contract!: ethers.Contract;
  private _isConnected = false;
  private _userAddress: string | null = null;

  get isConnected(): boolean { return this._isConnected; }
  get userAddress(): string | null { return this._userAddress; }

  async connectWallet(): Promise<string> {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
      }
      this.provider = new ethers.BrowserProvider(window.ethereum);
      await this.provider.send('eth_requestAccounts', []);
      this.signer = await this.provider.getSigner();
      this.contract = new ethers.Contract(CONTRACT_ADDRESS, CliquePotAbi.abi as ethers.InterfaceAbi, this.signer);
      this._userAddress = await this.signer.getAddress();
      this._isConnected = true;

      // Check if we're on the right network
      const network = await this.provider.getNetwork();
      if (network.chainId !== 31337n) { // Replace with your target chain ID
        throw new Error("Please switch to the correct network");
      }

      return this._userAddress;
    } catch (error) {
      this._isConnected = false;
      this._userAddress = null;
      throw error;
    }
  }

  /**
   * Checks if there is an existing wallet connection (without prompting the user).
   * If connected, sets up provider, signer, contract, and state variables.
   * Returns the address if connected, otherwise null.
   */
  async checkExistingConnection(): Promise<string | null> {
    if (!window.ethereum) {
      this._isConnected = false;
      this._userAddress = null;
      return null;
    }

    this.provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await this.provider.send('eth_accounts', []);

    if (accounts && accounts.length > 0) {
      //To return case sensitive address
      const checksummed = getAddress(accounts[0]);

      this.signer = await this.provider.getSigner();
      this.contract = new ethers.Contract(CONTRACT_ADDRESS, CliquePotAbi.abi as ethers.InterfaceAbi, this.signer);
      this._userAddress = checksummed;
      this._isConnected = true;
      return this._userAddress;
    } else {
      this._isConnected = false;
      this._userAddress = null;
      return null;
    }
  }

  /**
   * Deploy a new CliquePot contract.
   * @param entryAmount The entry amount for the pot (uint256, in wei)
   * @returns The deployed contract address
   */
  async deployCliquePot(entryAmount: bigint): Promise<string> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }
    const abi = (CliquePotAbi as any).abi;
    const bytecode = (CliquePotAbi as any).bytecode;
    if (!bytecode) {
      throw new Error('CliquePot bytecode not found in ABI JSON');
    }
    // Use the reusable deployment utility
    return await deployContract(this.signer, abi, bytecode, entryAmount);
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
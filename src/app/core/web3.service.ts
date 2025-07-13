import { Injectable } from '@angular/core';
import { ethers, getAddress } from 'ethers';
import CliquePotAbi from '../../assets/CliquePot.json'; // ABI JSON (includes .abi + .bytecode)
import { deployContract } from './services/deploy-contract.util';

@Injectable({ providedIn: 'root' })
export class Web3Service {
  private provider!: ethers.BrowserProvider;
  private signer!: ethers.Signer;
  private _isConnected = false;
  private _userAddress: string | null = null;

  get isConnected(): boolean {
    return this._isConnected;
  }

  get userAddress(): string | null {
    return this._userAddress;
  }

  /**
   * Prompt user to connect their wallet via MetaMask
   */
  async connectWallet(): Promise<string> {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    this.provider = new ethers.BrowserProvider(window.ethereum);
    await this.provider.send('eth_requestAccounts', []);
    this.signer = await this.provider.getSigner();
    this._userAddress = await this.signer.getAddress();
    this._isConnected = true;

    const network = await this.provider.getNetwork();
    if (network.chainId !== 31337n) {
      throw new Error('Please switch to the correct network');
    }

    return this._userAddress;
  }

  /**
   * Check if the user is already connected without prompting
   */
  async checkExistingConnection(): Promise<string | null> {
    if (!window.ethereum) {
      return null;
    }

    this.provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await this.provider.send('eth_accounts', []);

    if (accounts && accounts.length > 0) {
      this.signer = await this.provider.getSigner();
      this._userAddress = getAddress(accounts[0]);
      this._isConnected = true;
      return this._userAddress;
    } else {
      this._isConnected = false;
      this._userAddress = null;
      return null;
    }
  }

  /**
   * Deploy a new instance of the CliquePot contract
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

    return await deployContract(this.signer, abi, bytecode, entryAmount);
  }

  /**
   * Get a contract instance at a specific address (with caching)
   */
  getContractAt(contractAddress: string): ethers.Contract {
    if (!this.signer && !this.provider) {
      throw new Error('Wallet not connected');
    }

    return new ethers.Contract(contractAddress, CliquePotAbi.abi as ethers.InterfaceAbi, this.signer);
  }

  /**
   * Listen for `PayoutExecuted` event on a specific contract instance
   */
  listenToPayoutExecuted(
    contractAddress: string,
    callback: (data: { round: bigint; winner: string; amount: string }) => void
  ) {
    const contract = this.getContractAt(contractAddress);

    console.log(`🔊 Listening to PayoutExecuted on ${contractAddress}...`);

    contract.on('PayoutExecuted', (round, winner, amount) => {
      callback({
        round,
        winner,
        amount: ethers.formatEther(amount),
      });
    });
  }

  /**
   * Remove all `PayoutExecuted` listeners for a given contract
   */
  removePayoutListeners(contractAddress: string) {
    const contract = new ethers.Contract(contractAddress, CliquePotAbi.abi as ethers.InterfaceAbi, this.signer);
    if (contract) {
      contract.removeAllListeners('PayoutExecuted');
    }
  }

  /**
   * Get the signer for direct contract interaction
   */
  getSigner(): ethers.Signer {
    if (!this.signer) throw new Error('Wallet not connected');
    return this.signer;
  }

  /**
   * Get the provider for read-only chain data
   */
  getProvider(): ethers.BrowserProvider {
    if (!this.provider) throw new Error('Provider not initialized');
    return this.provider;
  }
}
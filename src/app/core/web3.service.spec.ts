import { TestBed } from '@angular/core/testing';
import { Web3Service } from './web3.service';

// Mock window.ethereum
const mockEthereum = {
  request: jasmine.createSpy('request'),
  on: jasmine.createSpy('on'),
  removeListener: jasmine.createSpy('removeListener')
};

Object.defineProperty(window, 'ethereum', {
  value: mockEthereum,
  writable: true
});

describe('Web3Service', () => {
  let service: Web3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Web3Service]
    });
    service = TestBed.inject(Web3Service);

    // Reset mocks
    mockEthereum.request.calls.reset();
  });

  describe('connectWallet', () => {
    it('should throw error if MetaMask is not installed', async () => {
      Object.defineProperty(window, 'ethereum', {
        value: undefined,
        writable: true
      });

      try {
        await service.connectWallet();
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.message).toContain('MetaMask is not installed');
      }
    });
  });

  describe('checkExistingConnection', () => {
    it('should return null if MetaMask not installed', async () => {
      Object.defineProperty(window, 'ethereum', {
        value: undefined,
        writable: true
      });

      const result = await service.checkExistingConnection();

      expect(result).toBeNull();
    });
  });

  describe('deployCliquePot', () => {
    it('should throw error if wallet not connected', async () => {
      try {
        await service.deployCliquePot(BigInt('100000000000000000'), 10);
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.message).toContain('Wallet not connected');
      }
    });
  });

  describe('getContractAt', () => {
    it('should throw error if wallet not connected', () => {
      expect(() => service.getContractAt('0x123')).toThrowError('Wallet not connected');
    });
  });

  describe('getSigner', () => {
    it('should throw error if not connected', () => {
      expect(() => service.getSigner()).toThrowError('Wallet not connected');
    });
  });

  describe('getProvider', () => {
    it('should throw error if not initialized', () => {
      expect(() => service.getProvider()).toThrowError('Provider not initialized');
    });
  });
}); 
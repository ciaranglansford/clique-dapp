# Clique Dapp

Web3-powered rotating savings (Daret-style) app built using Angular and Solidity smart contracts.  
Phase 1 is focused on enabling users to connect wallets, create savings pools, and manage on-chain logic via smart contracts.

## Tech Stack
- Angular
- Hardhat (Solidity)
- Ethers.js v6


### 1. Setup
npm install

In src/app/core/web3.service.ts, update:
const CONTRACT_ADDRESS = '0x...'; // Replace with your deployed address

ng serve

Visit: http://localhost:4200

test
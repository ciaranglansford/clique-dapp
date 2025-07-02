# Clique Dapp

A Web3-powered rotating savings (Daret-style) application built with Angular and Solidity smart contracts.  
This dApp enables users to connect their wallets, join a savings pool, and manage on-chain logic via smart contracts.

---

## 1. Project Overview

Clique Dapp is a decentralized application (dApp) that allows users to participate in a rotating savings pool (Daret).  
Users can connect their Ethereum wallet, join the pool by depositing ETH, and (for admins) trigger payouts to randomly selected winners.  
All interactions are handled via a deployed smart contract, with a modern Angular frontend.

---

## 2. Folder & File Structure

```
clique-dapp/
  ├── src/
  │   ├── app/
  │   │   ├── core/
  │   │   │   └── web3.service.ts         # Handles all Web3 and contract logic
  │   │   ├── pages/
  │   │   │   ├── home/                   # Home page (navigation)
  │   │   │   ├── join/                   # Join pool page
  │   │   │   └── admin/                  # Admin page (trigger payout)
  │   │   └── shared/
  │   │       └── component/
  │   │           └── wallet-connect/     # Wallet connect button/component
  │   └── assets/
  │       └── CliquePool.json             # ABI for the deployed smart contract
  ├── angular.json                        # Angular project config
  ├── package.json                        # Dependencies and scripts
  └── README.md                           # Project documentation
```

---

## 3. Key Components & Services

### **Web3Service (`src/app/core/web3.service.ts`)**
- Handles all Ethereum wallet and contract interactions using ethers.js.
- Methods:
  - `connectWallet()`: Prompts user to connect wallet, sets up provider, signer, and contract.
  - `checkExistingConnection()`: Checks for an already-connected wallet (no prompt).
  - `listenToPayoutExecuted(callback)`: Listens for payout events from the contract.
  - `removePayoutListeners()`: Removes payout event listeners.
  - `getContract()`, `getProvider()`, `getSigner()`: Accessors for contract, provider, and signer.

### **WalletConnectComponent (`src/app/shared/component/wallet-connect/`)**
- UI button for connecting wallet.
- On load, checks if a wallet is already connected and updates the UI.
- Emits the connected address to parent components.

### **HomeComponent (`src/app/pages/home/`)**
- Landing page with navigation buttons to Join and Admin pages.

### **JoinComponent (`src/app/pages/join/`)**
- Lets users connect their wallet and join the pool by sending ETH.
- Shows connection status and join progress.

### **AdminComponent (`src/app/pages/admin/`)**
- For admins to connect their wallet and trigger a payout.
- Displays payout results and listens for payout events.

---

## 4. How to Run the Project

### **Prerequisites**
- Node.js (v16+ recommended)
- npm
- MetaMask (or another Ethereum wallet extension)
- Deployed CliquePool smart contract (update the contract address in `web3.service.ts`)

### **Installation & Setup**
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Update contract address:**
   - In `src/app/core/web3.service.ts`, set:
     ```ts
     const CONTRACT_ADDRESS = '0x...'; // Replace with your deployed contract address
     ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   or
   ```bash
   ng serve
   ```

4. **Open the app:**
   - Visit [http://localhost:4200](http://localhost:4200) in your browser.

---

## 5. Usage

### **Connect Wallet**
- Click the "Connect Wallet" button on any page.
- If already connected, the button will show "Connected" and display your address.

### **Join Pool**
- Go to the "Join" page.
- Connect your wallet (if not already connected).
- Click "Join Pool (0.1 ETH)" to participate.

### **Admin Actions**
- Go to the "Admin" page.
- Connect your wallet (if not already connected).
- Click "Trigger Payout" to select a winner and distribute the pool.
- Payout results will be displayed below.

### **Navigation**
- Use the navigation bar at the top to switch between Home, Join, and Admin pages.

---

## 6. Customization & Extending

- **Smart Contract ABI:**  
  Update `src/assets/CliquePool.json` if your contract ABI changes.

- **Contract Address:**  
  Update the `CONTRACT_ADDRESS` in `web3.service.ts` after deploying a new contract.

- **Adding New Pages/Features:**  
  - Add new components under `src/app/pages/` or `src/app/shared/component/`.
  - Register new routes in `src/app/app.routes.ts`.

- **Styling:**  
  - Global styles: `src/styles.scss`
  - Component styles: Each component has its own `.scss` file.

- **Web3 Logic:**  
  - Extend `Web3Service` for more contract interactions.
  - Use the service in any component by injecting it in the constructor.

---

## Tech Stack

- **Frontend:** Angular 17, Angular Material (optional)
- **Web3:** ethers.js v6
- **Smart Contracts:** Solidity (Hardhat for deployment/testing)
- **Wallet:** MetaMask (or any injected Ethereum provider)

---

## Contributing

1. Fork the repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## License

MIT
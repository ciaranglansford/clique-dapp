# Clique DApp - Angular Frontend

A decentralized application (DApp) built with Angular 17 that connects to smart contracts and a Spring Boot backend for pot-based pooling functionality.

## 🏗️ Architecture Overview

```
clique-dapp/
├── src/app/
│   ├── core/                    # Core services and utilities
│   │   ├── services/
│   │   │   └── pot.service.ts   # Backend API communication
│   │   └── web3.service.ts      # Smart contract interactions
│   ├── pages/                   # Main application pages
│   │   ├── home/               # Landing page
│   │   ├── join/               # Join pot functionality
│   │   └── admin/              # Admin panel for payouts
│   └── shared/                 # Reusable components & models
│       ├── component/
│       │   └── wallet-connect/ # Wallet connection component
│       └── models/
│           └── pot.model.ts    # TypeScript interfaces
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- Angular CLI (`npm install -g @angular/cli`)
- MetaMask browser extension
- Spring Boot backend running on `localhost:8080`

### Installation & Setup
```bash
# Install dependencies
npm install

# Start development server with proxy
npm run start:proxy

# Start without proxy (for production)
npm start
```

## 🔧 Configuration

### Proxy Setup
- **File**: `proxy.conf.json`
- **Purpose**: Forwards `/api` requests to Spring Boot backend
- **Target**: `http://localhost:8080`
- **Usage**: `npm run start:proxy`

### Smart Contract
- **Address**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- **ABI**: `src/assets/CliquePot.json`
- **Network**: Local development (Chain ID: 31337)

## 📱 Application Flow

### 1. Home Page (`/`)
- Landing page with navigation to Join and Admin
- Simple welcome interface

### 2. Join Pot (`/join`)
- **Step 1**: Connect wallet via MetaMask
- **Step 2**: Execute smart contract `joinPot()` transaction
- **Step 3**: Call backend API `/api/pots/join` to record participation
- **Error Handling**: Distinguishes between smart contract and backend failures

### 3. Admin Panel (`/admin`)
- **Purpose**: Trigger pot payouts
- **Functionality**: 
  - Connect wallet (admin only)
  - Execute `triggerPayout()` smart contract function
  - Listen for `PayoutExecuted` events
  - Display payout results

## 🔌 Key Services

### Web3Service (`core/web3.service.ts`)
- **Purpose**: Smart contract interactions
- **Key Methods**:
  - `connectWallet()`: MetaMask connection
  - `checkExistingConnection()`: Auto-reconnect
  - `listenToPayoutExecuted()`: Event listening
- **Contract Methods**: `joinPot()`, `triggerPayout()`, `entryAmount()`

### PotService (`core/services/pot.service.ts`)
- **Purpose**: Backend API communication
- **Endpoints**:
  - `POST /api/pots/create` - Create new pot
  - `POST /api/pots/join` - Record pot participation
- **Headers**: Auto-applied via HTTP interceptor

## 🎯 Data Models

### Pot Models (`shared/models/pot.model.ts`)
```typescript
interface CreatePotRequest {
  contractAddress: string;
}

interface JoinPotRequest {
  contractAddress: string;
  walletAddress: string;
}

interface JoinPotResponse {
  potId: number;
  walletAddress: string;
  joinedAt: Date;
}
```

## 🔄 HTTP Configuration

### Global Headers
- **Content-Type**: `application/json`
- **Accept**: `application/json`
- **Implementation**: HTTP interceptor (currently removed, add back if needed)

### API Endpoints
- **Base URL**: `/api` (proxied to `localhost:8080`)
- **Pot Endpoints**: `/api/pots/*`

## 🛠️ Development

### Adding New Features
1. **New Pages**: Add to `pages/` directory
2. **New Services**: Add to `core/services/`
3. **New Components**: Add to `shared/component/`
4. **New Models**: Add to `shared/models/`

### Smart Contract Integration
1. Update contract address in `web3.service.ts`
2. Update ABI in `src/assets/CliquePot.json`
3. Add new contract methods to `Web3Service`

### Backend Integration
1. Add new endpoints to `PotService`
2. Create corresponding models in `pot.model.ts`
3. Update proxy configuration if needed

## 🐛 Troubleshooting

### Common Issues
- **406 Not Acceptable**: Missing JSON headers (add HTTP interceptor)
- **MetaMask Connection**: Ensure MetaMask is installed and unlocked
- **Network Issues**: Verify correct network (Chain ID: 31337)
- **Proxy Issues**: Use `npm run start:proxy` for development

### Debug Commands
```bash
# Check Angular version
ng version

# Check for linting issues
ng lint

# Build for production
ng build --configuration production
```

## 📋 Environment Setup

### Required Environment Variables
- None currently (contract address hardcoded for development)

### Optional Environment Variables
- `CONTRACT_ADDRESS`: Smart contract address
- `BACKEND_URL`: Spring Boot backend URL

## 🔒 Security Notes

- **Wallet Connection**: Uses MetaMask for secure wallet interactions
- **Transaction Signing**: All transactions require user approval
- **Backend Communication**: Uses proxy to avoid CORS issues
- **No Sensitive Data**: No API keys or secrets stored in frontend

## 📚 Dependencies

### Core Dependencies
- **Angular**: 17.0.0 (standalone components)
- **Ethers.js**: 6.14.4 (Web3 interactions)
- **RxJS**: 7.8.0 (reactive programming)

### Development Dependencies
- **Angular CLI**: 17.0.10
- **TypeScript**: 5.2.2

---

**Last Updated**: [Current Date]
**Version**: 1.0.0
**Maintainer**: [Your Name/Team]
export interface CreatePotRequest {
  contractAddress: string;
}

export interface Pot {
  id: number;
  contractAddress: string;
}

export interface GetPotListResponse {
  potList: string[];
}

// Add PotInfoResponse for detailed pot info
export interface PotInfoResponse {
  contractAddress: string;
  name: string;
  description: string;
  creator: string;
  balance: string;
  participants: string[];
  createdAt: number;
  winner?: string; // Optional winner field
}

// Custom Pot Creation
export interface CustomPotRequest {
  entryAmount: number;
  currencyType: string;
  maxPlayers: number;
}

export interface CustomPotResponse {
  id: string;
  contractAddress: string;
  entryAmount: number;
  currencyType: string;
  maxPlayers: number;
  createdAt: string;
}
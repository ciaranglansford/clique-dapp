export interface CreatePotRequest {
  contractAddress: string;
  entryAmount: bigint;
  currencyType: string;
  maxPlayers: number;
}

export interface CreatePotResponse {
  id: string;
  contractAddress: string;
  entryAmount: bigint;
  currencyType: string;
  maxPlayers: number;
  createdAt: string;
}

export interface Pot {
  id: string;
  contractAddress: string;
  entryAmount: bigint;
  currencyType: string;
  maxPlayers: number;
  createdAt: Date;
}

export interface GetPotListResponse {
  potList: Pot[];
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


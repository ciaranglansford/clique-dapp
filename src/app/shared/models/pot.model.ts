export interface CreatePotRequest {
  contractAddress: string;
}

export interface JoinPotRequest {
  contractAddress: string;
  walletAddress: string;
}

export interface JoinPotResponse {
  potId: number;
  walletAddress: string;
  joinedAt: Date; 
}

export interface Pot {
  id: number;
  contractAddress: string;
  // Extend with any backend-returned fields
}

export interface UserPot {
  userId: string;
  potId: number;
  // Extend with real response
}
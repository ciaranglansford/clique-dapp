export interface JoinPotRequest {
  contractAddress: string;
  walletAddress: string;
}

export interface JoinPotResponse {
  potId: number;
  walletAddress: string;
  joinedAt: Date; 
}

//getListRequest

//getListResponse

export interface UserPot {
  userId: string;
  potId: number;
  // Extend with real response
}
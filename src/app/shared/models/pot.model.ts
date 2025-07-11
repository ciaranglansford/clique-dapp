export interface CreatePotRequest {
  contractAddress: string;
}

export interface Pot {
  id: number;
  contractAddress: string;
  // Extend with any backend-returned fields
}

export interface GetPotListResponse {
  potList: string[];
}

// Add PotInfoResponse for detailed pot info
export interface PotInfoResponse {
  name: string;
  description: string;
  creator: string;
  balance: string;
  participants: string[];
  createdAt: number;
  // Add any additional fields as needed
}
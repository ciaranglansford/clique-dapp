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
  contractAddress: string;
  name: string;
  description: string;
  creator: string;
  balance: string;
  participants: string[];
  createdAt: number;
  winner?: string; // Optional winner field
  // Add any additional fields as needed
}
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
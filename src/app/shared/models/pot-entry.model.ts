export interface PotEntry{
    id: string;
    walletAddress: string;
    contractAddress: string;
    joinedAt: Date;
}

export interface PotEntries{
    potEntries: PotEntry[];
}
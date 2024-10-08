export interface WalletConnection {
    address?: string  | null;
    message: string;
    signature?: string | null;
}

export interface WalletConnectionResult {
    walletAddress?: string | null;
    signedMessage: string;
    signature?: string | null;
    connectWallet?: Promise<WalletConnection>;
}
export interface Collections {
    ImageUrl: File | null | string;
    CollectionType: string;
    ContractName: string;
    ContractSymbol: string;
    NftType: string;
    StartDate: number;
    EndDate: number;
}

export interface MintOptions {
    SelfMint: string;
    LaunchpadMint: string;
}

export const mintSettings: MintOptions = {
    SelfMint: 'SelfMinting',
    LaunchpadMint: 'LaunchpadMinting'
};
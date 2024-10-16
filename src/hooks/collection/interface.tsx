export interface Collections {
    ImageUrl: File | null | string;
    CollectionType: string;
    ContractName: string;
    ContractSymbol: string;
    NftType: string | null;
    StartDate: number | null;
    EndDate: number | null;
}

export interface MintOptions {
    SelfMint: string;
    LaunchpadMint: string;
}

export const mintSettings: MintOptions = {
    SelfMint: 'SelfMinting',
    LaunchpadMint: 'LaunchpadMinting'
};

export interface CFTCollection {
    symbol: string;
    name: string;
    initialOwner: string;
    newUri: string;
}
interface MetaDatas {
    name: string;
    supply: number;
    description: string;
    imageUrl: string | "";
    address: string | "";
    tags: string[];
    properties: Properties[] | [];
    statistic: Statistic[] | [];
}

interface Properties {
    name: string;
    value: string
}

interface Statistic {
    name: string;
    value: string
}

interface Result {
    status: boolean;
    message: string;
}

interface ResultMany {
    status: boolean;
    message: string[] | string | TokenData;
}

interface TokenData {
    tokenId: string[] | [];
    url: string[] | [];
}
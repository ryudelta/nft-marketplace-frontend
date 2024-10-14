export interface PinataHeader {
    pinata_api_key: string,
    pinata_secret_key: string
}

export interface PinataPinningFile {
    IpfsHash: string,
    PinSize: number,
    Timestamp: string,
    isDuplicate: boolean
}

export interface PinataPinningJSON {
    IpfsHash: string,
    PinSize: number,
    Timestamp: string,
    isDuplicate: boolean
}

export interface listItems {
    Row: [any]
}

export interface Items {

}
import { AxiosRequestConfig } from "axios";
import { requestBuilder } from "../../action"
import { PinataPinningFile, PinataPinningJSON } from "./interface"

const config: AxiosRequestConfig = {
    baseURL: process.env.PINATA_BASE_URL,
    headers: {
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_key: process.env.PINATA_SECRET_KEY
    }
}

const pinataIpfs = {
    pinFiles: async(data: any): Promise<PinataPinningFile> => {
        try {
            const request = await requestBuilder.post('/pinning/pinFileToIPFS', data, config);
            const response: PinataPinningFile = request.data;

            return response;
        } catch (error) {
            throw error
        }
    },
    pinJSON: async(data: Record<string, any>): Promise<PinataPinningJSON> => {
        try {
            const request = await requestBuilder.post('/pinning/pinJSONToIPFS', data, config);
            const respose: PinataPinningJSON = request.data;
            return respose;
        } catch (error) {
            throw(error)
        }
    },
    listFile: async(): Promise<any> => {
        try {
            const request = await requestBuilder.get('data/pinList', config)
            return request
        } catch (error) {
            throw error
        }
    },
    deletePin: async(cid: string): Promise<any> => {
        try {
            const response = await requestBuilder.delete(`/pinning/unpin/${cid}`,config)
            return response
        } catch (error) {
            throw error
        }
    }
}

export { pinataIpfs }
import { requestBuilder } from "../../action"
import { PinataPinningFile, PinataPinningJSON } from "./interface"

const pinataIpfs = {
    pinFiles: async(data: any): Promise<PinataPinningFile> => {
        try {
            const request = await requestBuilder.post('/pinning/pinFileToIPFS', data);
            const response: PinataPinningFile = request.data;

            return response;
        } catch (error) {
            throw error
        }
    },
    pinJSON: async(data: Record<string, any>): Promise<PinataPinningJSON> => {
        try {
            const request = await requestBuilder.post('/pinning/pinJSONToIPFS', data);
            const respose: PinataPinningJSON = request.data;
            return respose;
        } catch (error) {
            throw(error)
        }
    },
    listFile: async(): Promise<any> => {
        try {
            const request = await requestBuilder.get('data/pinList')
            return request
        } catch (error) {
            throw error
        }
    },
    deletePin: async(cid: string): Promise<any> => {
        try {
            const response = await requestBuilder.delete(`/pinning/unpin/${cid}`)
            return response
        } catch (error) {
            throw error
        }
    }
}

export { pinataIpfs }
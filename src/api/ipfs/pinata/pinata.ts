import { AxiosRequestConfig } from "axios";
import { requestBuilder } from "../../action"
import { PinataPinningFile, PinataPinningJSON } from "./interface"

const config: AxiosRequestConfig = {
    
}

const pinataIpfs = {
    pinFiles: async(data: any): Promise<PinataPinningFile> => {
        // try {
        //     console.log(config);
            
            
        // } catch (error) {
        //     console.log(error);
        //     throw error
        // }
        const request = await requestBuilder.post('/pinning/pinFileToIPFS', data, config);
        const response: PinataPinningFile = request.data;

        console.log(`response pinata`, response);
        
        return response;
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
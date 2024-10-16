import { AxiosHeaders, AxiosHeaderValue, AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { requestBuilder } from "../../action"
import { PinataPinningFile, PinataPinningJSON } from "./interface"
import { axiosInstance } from "../../config";

const pinataIpfs = {
    pinFiles: async(data: any): Promise<PinataPinningFile> => {
        const headerConfig = {
            'Content-Type': 'multipart/form-data',
            pinata_api_key: '44d96723f9d3f83158e6',
            pinata_secret_api_key: '51a3f7459f120070d10997d0be1051a09a353ffaed6872ee11626535850768cb',
        }
        try {
            const request: any = await axiosInstance.post('pinning/pinFileToIPFS', data, {
                headers: headerConfig
            });
        
            const response: PinataPinningFile = request.data;

            return response;
        } catch (error: any) {
            return error
        }
    },
    pinJSON: async(data: Record<string, any>): Promise<PinataPinningJSON> => {
        try {
            const request = await requestBuilder.post('pinning/pinJSONToIPFS', data,);
            const respose: PinataPinningJSON = request.data;
            return respose;
        } catch (error) {
            throw(error)
        }
    },
    listFile: async(): Promise<any> => {
        try {
            const request = await requestBuilder.get('data/pinList',)
            return request
        } catch (error) {
            throw error
        }
    },
    deletePin: async(cid: string): Promise<any> => {
        try {
            const response = await requestBuilder.delete(`pinning/unpin/${cid}`)
            return response
        } catch (error) {
            throw error
        }
    }
}

export { pinataIpfs }
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "./config";

const requestBuilder = {
    post: async (path: string, data: any, config?: AxiosRequestConfig): Promise<any> => {
        // try {
            
        // } catch (error) {
        //     throw error
        // }
        const requestConfig: AxiosRequestConfig = {
            ...config
        }

        console.log(requestConfig);
        console.log(path);
        console.log(data);
        
        const response = await axios.post(path, data, {
            baseURL: "https://api.pinata.cloud",
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        console.log(`response`, response.request);
        return response.status
    },
    get: async (path: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
        try {
            const requestConfig: AxiosRequestConfig = {
                ...config
            }

            const response = await axiosInstance.get(path, requestConfig)
            return response
        } catch (error) {
            throw error
        }
    },
    put: async (path: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
        try {
            const requestConfig: AxiosRequestConfig = {
                ...config
            }

            const response = await axiosInstance.put(path, data, requestConfig)
            return response
        } catch (error) {
            throw error
        }
    },
    delete: async (path: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
        try {
          const requestConfig: AxiosRequestConfig = {
            ...config,
          };
  
          const response = await axiosInstance.delete(path, requestConfig);
          return response;
        } catch (error) {
          throw error;
        }
    },
}

export {
    requestBuilder
}
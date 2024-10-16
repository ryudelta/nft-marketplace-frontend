import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "./config";

const requestBuilder = {
    post: async (path: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
        try {
            const response = await axiosInstance.post(path, data, config)
            return response
        } catch (error) {
            console.log(data);
            console.log(path);
            console.log(`config`, JSON.stringify(config));
            console.log(`request error => `, error);
            throw error
        }
    },
    get: async (path: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
        try {
            const requestConfig: AxiosRequestConfig = {
                ...config
            }

            const response: AxiosResponse = await axiosInstance.get(path, requestConfig)
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

            const response: AxiosResponse = await axiosInstance.put(path, data, requestConfig)
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
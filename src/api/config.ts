import axios from "axios";

const base_url = import.meta.env?.VITE_PINATA_BASE_URL

const axiosInstance = axios.create({
    baseURL: `${base_url}`,
})

axiosInstance.interceptors.request.use((config) => {
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.code === 'ECONNABORTED') {
            console.error('Retrying request...');
            return axiosInstance.request(error.config);
          }
        console.error('Error message:', error.message);
        console.error('Error config:', JSON.stringify(error.config) );
        console.error('Error code:', error.code);
        console.error('Error response:', error.response);
        return Promise.reject(error);
    }
);

export {
    axiosInstance
};
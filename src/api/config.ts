import axios from "axios";

const axiosInstance = axios.create({
    baseURL: '',
    timeout: 5000,  
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(`token`)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        console.log('error request :>> ', error);
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Response Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
)

export {
    axiosInstance
};
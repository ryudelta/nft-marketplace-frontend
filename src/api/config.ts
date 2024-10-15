import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.pinata.cloud",
    headers: {
        "pinata_api_key": "44d96723f9d3f83158e6",
        "pinata_secret_key": "51a3f7459f120070d10997d0be1051a09a353ffaed6872ee11626535850768cb"
    },
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
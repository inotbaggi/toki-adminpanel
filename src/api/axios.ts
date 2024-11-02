import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'https://furina.qubixmc.net/api/v1',
});

api.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token && config.headers) {
        config.headers['Token'] = token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;

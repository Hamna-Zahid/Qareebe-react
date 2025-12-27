import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const PROD_URL = 'https://qareebe-backend.onrender.com/api'; // Replace with actual Render URL
const DEV_URL = 'http://192.168.1.11:5000/api';

const BASE_URL = __DEV__ ? DEV_URL : PROD_URL;

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authApi = {
    login: (data) => api.post('/auth/login', data),
    signup: (data) => api.post('/auth/signup', data),
    getProfile: () => api.get('/auth/profile'),
};

export const shopsApi = {
    getAll: () => api.get('/shops'),
    getById: (id) => api.get(`/shops/${id}`),
};

export const productsApi = {
    getPopular: () => api.get('/products/popular'),
    getByShop: (shopId) => api.get(`/products/shop/${shopId}`),
    getById: (id) => api.get(`/products/${id}`),
};

export default api;

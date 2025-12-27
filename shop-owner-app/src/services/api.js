import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Use same backend as consumer app
const BASE_URL = 'http://192.168.1.11:5000/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync('merchant_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Auth methods
export const authApi = {
    login: (phone, password) => api.post('/auth/login', { phone, password }),
    signup: (userData) => api.post('/auth/signup', userData),
    getMe: () => api.get('/auth/me'),
};

// Merchant specific methods
export const merchantApi = {
    getShop: () => api.get('/shops/me'),
    updateShop: (data) => api.put('/shops/me', data),
    getOrders: () => api.get('/orders/my-orders'),
    updateOrderStatus: (orderId, status) => api.put(`/orders/${orderId}/status`, { status }),
};

// Product management for merchant
export const productApi = {
    getProducts: (shopId) => api.get(`/products?shopId=${shopId || ''}`),
    createProduct: (data) => api.post('/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    updateProduct: (id, data) => api.put(`/products/${id}`, data),
    deleteProduct: (id) => api.delete(`/products/${id}`),
};

export default api;

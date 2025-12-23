import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const loginAdmin = async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    // basic check for role
    if (data.user.role !== 'admin') {
        throw new Error('Not authorized as admin');
    }
    return data;
};

export const getStats = async () => {
    const { data } = await api.get('/admin/stats');
    return data;
};

export const getUsers = async () => {
    const { data } = await api.get('/admin/users');
    return data;
};

export const getShops = async () => {
    const { data } = await api.get('/admin/shops');
    return data;
};

export default api;

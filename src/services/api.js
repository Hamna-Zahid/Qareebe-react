const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getToken = () => {
    return localStorage.getItem('token');
};

// Helper function to handle API responses
const handleResponse = async (response) => {
    const data = await response.json();

    if (!response.ok) {
        const error = data.error || { message: 'Something went wrong' };
        throw new Error(error.message);
    }

    return data;
};

// API Service
const api = {
    // Auth endpoints
    auth: {
        signup: async (userData) => {
            const response = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            return handleResponse(response);
        },

        login: async (credentials) => {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });
            return handleResponse(response);
        },

        getMe: async () => {
            const token = getToken();
            const response = await fetch(`${API_URL}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return handleResponse(response);
        }
    },

    // Shop endpoints
    shops: {
        getAll: async (search = '') => {
            const url = search ? `${API_URL}/shops?search=${encodeURIComponent(search)}` : `${API_URL}/shops`;
            const response = await fetch(url);
            return handleResponse(response);
        },

        getById: async (id) => {
            const response = await fetch(`${API_URL}/shops/${id}`);
            return handleResponse(response);
        },

        getProducts: async (shopId) => {
            const response = await fetch(`${API_URL}/shops/${shopId}/products`);
            return handleResponse(response);
        }
    },

    // Product endpoints
    products: {
        getAll: async (params = {}) => {
            const queryString = new URLSearchParams(params).toString();
            const url = queryString ? `${API_URL}/products?${queryString}` : `${API_URL}/products`;
            const response = await fetch(url);
            return handleResponse(response);
        },

        getPopular: async () => {
            const response = await fetch(`${API_URL}/products/popular`);
            return handleResponse(response);
        },

        getById: async (id) => {
            const response = await fetch(`${API_URL}/products/${id}`);
            return handleResponse(response);
        }
    },

    // Order endpoints
    orders: {
        create: async (orderData) => {
            const token = getToken();
            const response = await fetch(`${API_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            });
            return handleResponse(response);
        },

        getUserOrders: async (userId) => {
            const token = getToken();
            const response = await fetch(`${API_URL}/orders/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return handleResponse(response);
        },

        getById: async (id) => {
            const token = getToken();
            const response = await fetch(`${API_URL}/orders/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return handleResponse(response);
        }
    },

    // Address endpoints
    addresses: {
        getUserAddresses: async (userId) => {
            const token = getToken();
            const response = await fetch(`${API_URL}/addresses/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return handleResponse(response);
        },

        create: async (addressData) => {
            const token = getToken();
            const response = await fetch(`${API_URL}/addresses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(addressData)
            });
            return handleResponse(response);
        },

        delete: async (id) => {
            const token = getToken();
            const response = await fetch(`${API_URL}/addresses/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return handleResponse(response);
        }
    }
};

export default api;

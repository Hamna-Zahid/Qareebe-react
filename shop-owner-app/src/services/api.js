const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

// Helper function to make API calls
const apiCall = async (endpoint, options = {}, isMultipart = false) => {
    const token = localStorage.getItem('token');
    console.log('API Call:', endpoint, 'Token:', token ? 'Present' : 'Missing');

    const headers = {};

    // Only add Authorization if token exists and is valid
    if (token && token !== 'null' && token !== 'undefined') {
        headers.Authorization = `Bearer ${token}`;
    }

    // Add other headers
    Object.assign(headers, options.headers);

    // Only set Content-Type to application/json if NOT multipart
    if (!isMultipart) {
        headers['Content-Type'] = 'application/json';
    }

    const config = {
        ...options,
        headers,
    };


    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    console.log('API Response:', { endpoint, status: response.status, data });

    if (!response.ok) {
        console.error('API Error Response:', data);
        console.error('Request was:', { endpoint, headers: config.headers });
        throw new Error(data?.error?.message || data?.message || 'API request failed');
    }

    return data;
};

const api = {
    // Auth endpoints
    auth: {
        signup: (userData) => apiCall('/auth/signup', {
            method: 'POST',
            body: JSON.stringify(userData),
        }),
        login: (credentials) => apiCall('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        }),
        getMe: () => apiCall('/auth/me'),
    },

    // Shop Owner endpoints
    shopOwner: {
        createShop: (shopData) => apiCall('/shops', {
            method: 'POST',
            body: shopData, // shopData is FormData in Onboarding, handled by 'isMultipart' arg?
            // Wait, onboarding calls createShop(data). ShopOnboarding3 sends FormData.
            // apiCall helper: createShop: (shopData) => apiCall('/shops', { ... }, true) needs isMultipart=true if FormData!
        }, true), // Fixed: Added isMultipart=true for FormData

        getShop: () => apiCall('/shops/me'),

        updateShop: (shopData) => apiCall('/shops/me', {
            method: 'PUT',
            body: JSON.stringify(shopData),
        }),

        getOrders: () => apiCall('/orders/my-orders'), // Assuming orders.js has this

        updateOrderStatus: (orderId, status) => apiCall(`/orders/${orderId}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        }),

        // Use standard product endpoints for now
        getProducts: (shopId) => apiCall(`/products?shopId=${shopId || ''}`),

        createProduct: (productData) => apiCall('/products', {
            method: 'POST',
            body: productData,
        }, true), // isMultipart = true for FormData

        updateProduct: (productId, productData) => apiCall(`/products/${productId}`, {
            method: 'PUT',
            body: JSON.stringify(productData),
        }),

        deleteProduct: (productId) => apiCall(`/products/${productId}`, {
            method: 'DELETE',
        }),
    },
};

export default api;

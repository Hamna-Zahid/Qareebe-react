import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchShop = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await api.shopOwner.getShop();
            if (response.success) {
                setShop(response.data);
                return response.data;
            }
        } catch (error) {
            // If shop not found, it's expected for new users
            if (error.message?.includes('not found') || error.status === 404) {
                setShop(null);
            } else {
                console.error('Error fetching shop:', error);
            }
        }
    };

    useEffect(() => {
        const init = async () => {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            if (token && storedUser) {
                setUser(JSON.parse(storedUser));
                await fetchShop();
            }
            setLoading(false);
        };
        init();
    }, []);

    const login = async (credentials) => {
        try {
            const response = await api.auth.login(credentials);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            setUser(response.user);
            await fetchShop();
            return response;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const signup = async (userData) => {
        try {
            const response = await api.auth.signup({ ...userData, role: 'shop_owner' });
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            setUser(response.user);
            // Don't fetch shop yet as it hasn't been created
            return response;
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    };

    const mockLogin = async () => {
        try {
            console.log("Attempting Dev Login...");
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api'}/auth/dev-login`, {
                method: 'POST'
            });

            const data = await response.json();

            if (data.success) {
                console.log("Dev Login Success:", data);
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                await fetchShop();
                return true;
            } else {
                console.error("Dev Login Failed:", data);
                return false;
            }
        } catch (error) {
            console.error("Dev Login Error:", error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setShop(null);
    };

    const value = {
        user,
        shop,
        fetchShop,
        loading,
        login,
        signup,
        mockLogin,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div className="flex items-center justify-center min-h-screen bg-gray-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </div>
            ) : children}
        </AuthContext.Provider>
    );
};

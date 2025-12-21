import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing token and validate
        const token = localStorage.getItem('token');
        if (token) {
            // Verify token with backend
            api.auth.getMe()
                .then(response => {
                    setUser(response.user);
                })
                .catch(() => {
                    // Token invalid, clear it
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (credentials) => {
        try {
            const response = await api.auth.login(credentials);

            // Store token and user
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            setUser(response.user);

            return response.user;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const signup = async (userData) => {
        try {
            const response = await api.auth.signup(userData);

            // Store token and user
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            setUser(response.user);

            return response.user;
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const updateUser = (updates) => {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

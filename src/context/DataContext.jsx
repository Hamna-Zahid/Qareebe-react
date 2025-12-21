import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [shops, setShops] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [shopsRes, productsRes] = await Promise.all([
                    api.shops.getAll(),
                    api.products.getPopular()
                ]);

                setShops(shopsRes.data || []);
                setProducts(productsRes.data || []);
                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message);
                // Fallback to empty arrays
                setShops([]);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const searchShops = async (query) => {
        try {
            const response = await api.shops.getAll(query);
            return response.data || [];
        } catch (err) {
            console.error('Error searching shops:', err);
            return [];
        }
    };

    const searchProducts = async (query) => {
        try {
            const response = await api.products.getAll({ search: query });
            return response.data || [];
        } catch (err) {
            console.error('Error searching products:', err);
            return [];
        }
    };

    const getShopById = async (id) => {
        try {
            const response = await api.shops.getById(id);
            return response.data;
        } catch (err) {
            console.error('Error fetching shop:', err);
            throw err;
        }
    };

    const getProductById = async (id) => {
        try {
            const response = await api.products.getById(id);
            return response.data;
        } catch (err) {
            console.error('Error fetching product:', err);
            throw err;
        }
    };

    const getShopProducts = async (shopId) => {
        try {
            const response = await api.shops.getProducts(shopId);
            return response.data || [];
        } catch (err) {
            console.error('Error fetching shop products:', err);
            return [];
        }
    };

    return (
        <DataContext.Provider value={{
            shops,
            products,
            loading,
            error,
            searchShops,
            searchProducts,
            getShopById,
            getProductById,
            getShopProducts
        }}>
            {children}
        </DataContext.Provider>
    );
};

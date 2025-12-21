import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const storedCart = localStorage.getItem('cartItems');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error('Failed to parse cart items:', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Failed to save cart items:', error);
        }
    }, [cartItems]);

    const addToCart = (product, size, quantity = 1) => {
        setCartItems(prevItems => {
            // Check if item with same ID and size exists
            const existingItemIndex = prevItems.findIndex(
                item => item.id === product.id && item.selectedSize === size
            );

            if (existingItemIndex >= 0) {
                // Update quantity
                const newItems = [...prevItems];
                newItems[existingItemIndex] = {
                    ...newItems[existingItemIndex],
                    quantity: (newItems[existingItemIndex].quantity || 1) + quantity
                };
                return newItems;
            } else {
                // Add new item
                return [...prevItems, { ...product, selectedSize: size, quantity: quantity }];
            }
        });
    };

    const removeFromCart = (itemId, size) => {
        setCartItems(prevItems => prevItems.filter(item => !(item.id === itemId && item.selectedSize === size)));
    };

    const updateQuantity = (itemId, size, change) => {
        setCartItems(prevItems => {
            return prevItems.map(item => {
                if (item.id === itemId && item.selectedSize === size) {
                    const newQuantity = (item.quantity || 1) + change;
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
                }
                return item;
            });
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

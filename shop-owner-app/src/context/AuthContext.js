import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebaseConfig';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Fetch additional merchant data from Firestore
                    const merchantDoc = await getDoc(doc(db, 'merchants', firebaseUser.uid));
                    if (merchantDoc.exists()) {
                        const userData = {
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            ...merchantDoc.data()
                        };
                        setUser(userData);
                        await SecureStore.setItemAsync('merchant_user', JSON.stringify(userData));
                    } else {
                        // If auth exists but no firestore doc, handle accordingly
                        setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
                    }
                } catch (error) {
                    console.error('Error fetching merchant data:', error);
                }
            } else {
                setUser(null);
                await SecureStore.deleteItemAsync('merchant_user');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const formatIdentifier = (identifier) => {
        // If it looks like an email, keep it. If it's a phone number, make it look like an email for Firebase Auth.
        if (identifier.includes('@')) return identifier;
        // Strip non-numeric characters if it's a phone number
        const cleaned = identifier.replace(/\D/g, '');
        return `${cleaned}@qareebe.com`;
    };

    const login = async (identifier, password) => {
        try {
            const email = formatIdentifier(identifier);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;

            const merchantDoc = await getDoc(doc(db, 'merchants', firebaseUser.uid));
            let userData = { uid: firebaseUser.uid, email: firebaseUser.email };

            if (merchantDoc.exists()) {
                userData = { ...userData, ...merchantDoc.data() };
            }

            setUser(userData);
            await SecureStore.setItemAsync('merchant_user', JSON.stringify(userData));

            return { success: true };
        } catch (error) {
            let errorMessage = error.message;
            if (error.code === 'auth/invalid-credential') errorMessage = 'Invalid phone number or password';
            if (error.code === 'auth/user-not-found') errorMessage = 'No merchant found with this phone number';
            return { success: false, error: errorMessage || 'Login failed' };
        }
    };

    const register = async (emailOrPhone, password, merchantInfo) => {
        try {
            const email = formatIdentifier(emailOrPhone);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;

            const userData = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                phone: merchantInfo.phone || emailOrPhone,
                shopName: merchantInfo.shopName,
                name: merchantInfo.name,
                role: 'merchant',
                createdAt: new Date().toISOString()
            };

            // Initialize merchant in Firestore
            await setDoc(doc(db, 'merchants', firebaseUser.uid), userData);

            setUser(userData);
            await SecureStore.setItemAsync('merchant_user', JSON.stringify(userData));

            return { success: true };
        } catch (error) {
            let errorMessage = error.message;
            if (error.code === 'auth/email-already-in-use') errorMessage = 'This phone number is already registered';
            return { success: false, error: errorMessage || 'Registration failed' };
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            await SecureStore.deleteItemAsync('merchant_user');
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

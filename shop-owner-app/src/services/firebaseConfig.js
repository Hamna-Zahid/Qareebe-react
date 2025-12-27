import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Shared credentials from consumer app
const firebaseConfig = {
    apiKey: "AIzaSyA21q3MAlI7dNzwhxb_i2guQP3zx60RL7s",
    authDomain: "qareebe-ac093.firebaseapp.com",
    projectId: "qareebe-ac093",
    storageBucket: "qareebe-ac093.firebasestorage.app",
    messagingSenderId: "676605756984",
    appId: "1:676605756984:android:f1c30d9318c0a046a808cd"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

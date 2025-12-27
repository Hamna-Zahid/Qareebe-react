import { useState, useEffect } from 'react';
import { db, auth } from '../services/firebaseConfig';
import {
    collection,
    query,
    where,
    onSnapshot,
    doc,
    updateDoc,
    orderBy
} from 'firebase/firestore';
import { Audio } from 'expo-av'; // Install expo-av for sounds

export const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [newOrderModal, setNewOrderModal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;

        // Listen for PENDING orders assigned to this shop
        const q = query(
            collection(db, "orders"),
            where("shopId", "==", user.uid),
            where("status", "==", "pending"),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedOrders = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Check if there's a NEW pending order to trigger notification
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    const orderData = change.doc.data();
                    if (orderData.status === 'pending') {
                        triggerNewOrderAlert(change.doc.id, orderData);
                    }
                }
            });

            setOrders(fetchedOrders);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const triggerNewOrderAlert = async (id, order) => {
        setNewOrderModal({ id, ...order });
        try {
            const { sound } = await Audio.Sound.createAsync(
                require('../../assets/notification.mp3')
            );
            await sound.playAsync();
        } catch (error) {
            console.log("Sound play error:", error);
        }
    };

    const handleOrderAction = async (orderId, status) => {
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, {
            status,
            updatedAt: new Date().toISOString(),
            acceptedAt: status === 'accepted' ? new Date().toISOString() : null
        });
        setNewOrderModal(null);
    };

    return {
        orders,
        newOrderModal,
        setNewOrderModal,
        handleOrderAction,
        loading
    };
};

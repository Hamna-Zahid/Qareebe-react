import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    TextInput,
    Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';
import { auth, db } from '../services/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export const CheckoutScreen = () => {
    const navigation = useNavigation();
    const { location, requestLocation } = useLocation();
    const { user } = useAuth();
    const { cartItems, cartTotal, clearCart } = useCart();
    const [step, setStep] = useState(1);

    const handlePlaceOrder = async () => {
        const hasLocation = await requestLocation(true);
        if (!hasLocation) return;
        if (!user) {
            Alert.alert("Error", "You must be logged in to place an order");
            return;
        }

        try {
            const orderPayload = {
                customerId: user.uid,
                customerName: user.name || "Customer",
                customerPhone: user.phone || "",
                shopId: cartItems[0]?.shopId || "test_shop_123",
                shopName: cartItems[0]?.shopName || "Qareebe Shop",
                items: cartItems,
                totalAmount: cartTotal + 150,
                status: 'pending',
                deliveryLocation: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                },
                createdAt: serverTimestamp(),
                expiresAt: new Date(Date.now() + 5 * 60000).toISOString()
            };

            await addDoc(collection(db, "orders"), orderPayload);

            clearCart();
            navigation.navigate('OrderSuccess');
        } catch (error) {
            console.error("Place order error:", error);
            Alert.alert("Error", "Failed to place order. Please try again.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Checkout</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Progress Dots */}
                <View style={styles.progressRow}>
                    <View style={[styles.dot, styles.activeDot]} />
                    <View style={styles.line} />
                    <View style={[styles.dot, step >= 2 && styles.activeDot]} />
                    <View style={styles.line} />
                    <View style={[styles.dot, step >= 3 && styles.activeDot]} />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Delivery Address</Text>
                    <TouchableOpacity style={styles.addressCard}>
                        <View style={styles.iconBox}>
                            <Ionicons name="location" size={20} color="#E91E63" />
                        </View>
                        <View style={styles.addressInfo}>
                            <Text style={styles.addressLabel}>{location ? "Current Location" : "Deliver to"}</Text>
                            <Text style={styles.addressText} numberOfLines={2}>
                                {location
                                    ? `Lat: ${location.coords.latitude.toFixed(4)}, Long: ${location.coords.longitude.toFixed(4)}`
                                    : "House 42, Block J, DHA Phase 6, Lahore"}
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#CCC" />
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    <TouchableOpacity style={styles.paymentCard}>
                        <Ionicons name="cash-outline" size={24} color="#4CAF50" />
                        <Text style={styles.paymentText}>Cash on Delivery</Text>
                        <View style={styles.radioActive} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.paymentCard}>
                        <Ionicons name="card-outline" size={24} color="#999" />
                        <Text style={[styles.paymentText, { color: '#999' }]}>Card (Coming Soon)</Text>
                        <View style={styles.radioInactive} />
                    </TouchableOpacity>
                </View>

                <View style={styles.summarySection}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal</Text>
                        <Text style={styles.summaryValue}>Rs. {cartTotal}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Delivery Fee</Text>
                        <Text style={styles.summaryValue}>Rs. 150</Text>
                    </View>
                    <View style={[styles.summaryRow, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>Rs. {cartTotal + 150}</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
                    <Text style={styles.placeOrderText}>Place Order</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 },
    backButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 18, fontWeight: '800' },
    content: { padding: 24 },
    progressRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 40 },
    dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#EEE' },
    activeDot: { backgroundColor: '#E91E63' },
    line: { width: 40, height: 2, backgroundColor: '#EEE', marginHorizontal: 8 },
    section: { marginBottom: 32 },
    sectionTitle: { fontSize: 16, fontWeight: '800', color: '#333', marginBottom: 16 },
    addressCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        borderRadius: 20,
        backgroundColor: '#FAFAFA',
    },
    iconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FCE4EC', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    addressInfo: { flex: 1 },
    addressLabel: { fontSize: 14, fontWeight: '700', color: '#333' },
    addressText: { fontSize: 12, color: '#999', marginTop: 2 },
    paymentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        borderRadius: 20,
        marginBottom: 12,
    },
    paymentText: { flex: 1, marginLeft: 12, fontSize: 14, fontWeight: '600' },
    radioActive: { width: 20, height: 20, borderRadius: 10, borderWidth: 6, borderColor: '#E91E63' },
    radioInactive: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#EEE' },
    summarySection: { backgroundColor: '#F9F9F9', padding: 20, borderRadius: 25 },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    summaryLabel: { color: '#999', fontWeight: '600' },
    summaryValue: { color: '#333', fontWeight: '700' },
    totalRow: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#EEE' },
    totalLabel: { fontSize: 16, fontWeight: '800', color: '#333' },
    totalValue: { fontSize: 20, fontWeight: '900', color: '#E91E63' },
    footer: { padding: 24, borderTopWidth: 1, borderTopColor: '#F5F5F5' },
    placeOrderButton: { backgroundColor: '#333', height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
    placeOrderText: { color: '#fff', fontSize: 16, fontWeight: '800' }
});

export default CheckoutScreen;

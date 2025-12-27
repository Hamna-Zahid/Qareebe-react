import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigation = useNavigation();

    if (cartItems.length === 0) {
        return (
            <SafeAreaView style={styles.emptyContainer}>
                <Ionicons name="cart-outline" size={100} color="#f0f0f0" />
                <Text style={styles.emptyTitle}>Your cart is empty</Text>
                <Text style={styles.emptySubtitle}>Looks like you haven't added anything to your cart yet.</Text>
                <TouchableOpacity
                    style={styles.shopNowButton}
                    onPress={() => navigation.navigate('Explore')}
                >
                    <Text style={styles.shopNowText}>Start Shopping</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Cart</Text>
                <Text style={styles.itemCount}>{cartItems.length} items</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {cartItems.map((item) => (
                    <View key={item.id} style={styles.cartItem}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                            <Text style={styles.itemPrice}>Rs. {item.price}</Text>

                            <View style={styles.quantityRow}>
                                <View style={styles.qtySelector}>
                                    <TouchableOpacity
                                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                                        style={styles.qtyBtn}
                                    >
                                        <Ionicons name="remove" size={16} color="#333" />
                                    </TouchableOpacity>
                                    <Text style={styles.qtyText}>{item.quantity}</Text>
                                    <TouchableOpacity
                                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                                        style={styles.qtyBtn}
                                    >
                                        <Ionicons name="add" size={16} color="#333" />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                                    <Ionicons name="trash-outline" size={20} color="#FF5252" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total Amount</Text>
                    <Text style={styles.totalValue}>Rs. {cartTotal}</Text>
                </View>
                <TouchableOpacity
                    style={styles.checkoutButton}
                    onPress={() => navigation.navigate('Checkout')}
                >
                    <Text style={styles.checkoutText}>Proceed to Checkout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40, backgroundColor: '#fff' },
    emptyTitle: { fontSize: 24, fontWeight: '900', color: '#333', marginTop: 20 },
    emptySubtitle: { fontSize: 14, color: '#999', textAlign: 'center', marginTop: 10, lineHeight: 20 },
    shopNowButton: {
        backgroundColor: '#E91E63',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 15,
        marginTop: 30,
    },
    shopNowText: { color: '#fff', fontSize: 16, fontWeight: '800' },
    header: { padding: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
    headerTitle: { fontSize: 28, fontWeight: '900', color: '#333' },
    itemCount: { fontSize: 14, fontWeight: '700', color: '#999' },
    scrollContent: { paddingHorizontal: 24, paddingBottom: 120 },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#f5f5f5',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    itemImage: { width: 90, height: 90, borderRadius: 15, backgroundColor: '#f9f9f9' },
    itemDetails: { flex: 1, marginLeft: 16, justifyContent: 'space-between' },
    itemName: { fontSize: 15, fontWeight: '700', color: '#333' },
    itemPrice: { fontSize: 16, fontWeight: '900', color: '#E91E63' },
    quantityRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    qtySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 2,
    },
    qtyBtn: { width: 30, height: 30, justifyContent: 'center', alignItems: 'center' },
    qtyText: { fontSize: 14, fontWeight: '800', marginHorizontal: 10 },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: '#f5f5f5',
    },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    totalLabel: { fontSize: 14, color: '#999', fontWeight: '700' },
    totalValue: { fontSize: 20, fontWeight: '900', color: '#333' },
    checkoutButton: {
        backgroundColor: '#333',
        height: 55,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkoutText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});

export default CartScreen;

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

export const NativeProductCard = ({ product, width: cardWidth = 140 }) => {
    const navigation = useNavigation();
    const { addToCart } = useCart();

    const handleQuickAdd = () => {
        addToCart(product);
    };

    return (
        <TouchableOpacity
            style={[styles.productCard, { width: cardWidth }]}
            onPress={() => navigation.navigate('ProductDetails', { productId: product.id })}
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <TouchableOpacity style={styles.cardAddButton} onPress={handleQuickAdd}>
                    <Ionicons name="add" size={18} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.productPrice}>Rs. {product.price}</Text>
                    {product.originalPrice && (
                        <Text style={styles.originalPrice}>Rs. {product.originalPrice}</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export const NativeShopCard = ({ shop }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.shopCard}
            onPress={() => navigation.navigate('ShopDetails', { shopId: shop.id })}
        >
            <Image source={{ uri: shop.image }} style={styles.shopImage} />
            <View style={styles.shopOverlay}>
                <View style={styles.shopInfo}>
                    <Text style={styles.shopName}>{shop.name}</Text>
                    <View style={styles.shopMeta}>
                        <View style={styles.ratingBadge}>
                            <Ionicons name="star" size={12} color="#FFD700" />
                            <Text style={styles.ratingText}>{shop.rating}</Text>
                        </View>
                        <Text style={styles.deliveryText}>{shop.deliveryTime}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginRight: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
        height: 160,
    },
    productImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f9f9f9',
    },
    cardAddButton: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        width: 28,
        height: 28,
        backgroundColor: '#E91E63',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#E91E63',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    productInfo: {
        padding: 10,
    },
    productName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    productPrice: {
        fontSize: 14,
        fontWeight: '800',
        color: '#333',
    },
    originalPrice: {
        fontSize: 10,
        color: '#999',
        textDecorationLine: 'line-through',
    },
    shopCard: {
        width: '100%',
        height: 180,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 16,
        backgroundColor: '#eee',
    },
    shopImage: {
        width: '100%',
        height: '100%',
    },
    shopOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.25)',
        justifyContent: 'flex-end',
        padding: 16,
    },
    shopName: {
        fontSize: 18,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 4,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    shopMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        gap: 4,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#333',
    },
    deliveryText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#fff',
    }
});

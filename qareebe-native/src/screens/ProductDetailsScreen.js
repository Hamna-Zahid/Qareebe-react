import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { POPULAR_PRODUCTS } from '../data/mock';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

const ProductDetailsScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { addToCart } = useCart();
    const { productId } = route.params;
    const [quantity, setQuantity] = React.useState(1);

    const product = POPULAR_PRODUCTS.find(p => p.id === productId);

    if (!product) {
        return (
            <View style={styles.centered}>
                <Text>Product not found</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Custom Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.roundButton}>
                    <Ionicons name="heart-outline" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={{ uri: product.image }} style={styles.productImage} />

                <View style={styles.detailsContainer}>
                    <View style={styles.shopBadge}>
                        <Ionicons name="storefront-outline" size={14} color="#E91E63" />
                        <Text style={styles.shopBadgeText}>Premium Boutique</Text>
                    </View>

                    <Text style={styles.productName}>{product.name}</Text>

                    <View style={styles.priceRow}>
                        <Text style={styles.price}>Rs. {product.price}</Text>
                        {product.originalPrice && (
                            <Text style={styles.oldPrice}>Rs. {product.originalPrice}</Text>
                        )}
                        {product.originalPrice && (
                            <View style={styles.discountBadge}>
                                <Text style={styles.discountText}>
                                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                </Text>
                            </View>
                        )}
                    </View>

                    <Text style={styles.descriptionLabel}>Product Description</Text>
                    <Text style={styles.description}>
                        Experience ultimate comfort and style with this premium piece. Crafted from high-quality materials,
                        it's perfect for both casual outings and special occasions. Limited stock available in the local market.
                    </Text>

                    {/* Variants (Placeholders) */}
                    <View style={styles.variantsSection}>
                        <Text style={styles.variantLabel}>Select Size</Text>
                        <View style={styles.variantRow}>
                            {['S', 'M', 'L', 'XL'].map(size => (
                                <TouchableOpacity key={size} style={[styles.variantItem, size === 'M' && styles.variantSelected]}>
                                    <Text style={[styles.variantText, size === 'M' && styles.variantTextSelected]}>{size}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Footer / Buy Bar */}
            <View style={styles.footer}>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                        <Ionicons name="remove" size={20} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{quantity}</Text>
                    <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => setQuantity(quantity + 1)}
                    >
                        <Ionicons name="add" size={20} color="#333" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => {
                        for (let i = 0; i < quantity; i++) addToCart(product);
                    }}
                >
                    <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: {
        position: 'absolute',
        top: StatusBar.currentHeight || 44,
        left: 0,
        right: 0,
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    roundButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    productImage: {
        width: width,
        height: width * 1.2,
        backgroundColor: '#f5f5f5',
    },
    detailsContainer: {
        padding: 24,
        backgroundColor: '#fff',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: -40,
    },
    shopBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FCE4EC',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: 'flex-start',
        gap: 4,
        marginBottom: 12,
    },
    shopBadgeText: { fontSize: 10, fontWeight: '800', color: '#E91E63' },
    productName: { fontSize: 24, fontWeight: '900', color: '#333', marginBottom: 12 },
    priceRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 24 },
    price: { fontSize: 26, fontWeight: '900', color: '#333' },
    oldPrice: { fontSize: 16, color: '#999', textDecorationLine: 'line-through' },
    discountBadge: { backgroundColor: '#4CAF50', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    discountText: { color: '#fff', fontSize: 10, fontWeight: '800' },
    descriptionLabel: { fontSize: 16, fontWeight: '800', color: '#333', marginBottom: 8 },
    description: { fontSize: 14, color: '#666', lineHeight: 22, marginBottom: 24 },
    variantsSection: { marginBottom: 24 },
    variantLabel: { fontSize: 16, fontWeight: '800', color: '#333', marginBottom: 16 },
    variantRow: { flexDirection: 'row', gap: 12 },
    variantItem: {
        width: 50,
        height: 50,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    variantSelected: { backgroundColor: '#333', borderColor: '#333' },
    variantText: { fontSize: 14, fontWeight: '700', color: '#666' },
    variantTextSelected: { color: '#fff' },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#f5f5f5',
        backgroundColor: '#fff',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 15,
        padding: 4,
        marginRight: 16,
    },
    qtyBtn: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
    qtyText: { fontSize: 16, fontWeight: '800', marginHorizontal: 12 },
    addToCartButton: {
        flex: 1,
        backgroundColor: '#E91E63',
        height: 55,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#E91E63',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 4,
    },
    addToCartButtonText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});

export default ProductDetailsScreen;

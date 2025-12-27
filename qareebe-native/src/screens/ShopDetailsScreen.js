import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Dimensions,
    FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SHOPS, POPULAR_PRODUCTS } from '../data/mock';
import { NativeProductCard } from '../components/NativeComponents';

const { width } = Dimensions.get('window');

const ShopDetailsScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [activeCategory, setActiveCategory] = useState('All');
    const { shopId } = route.params;

    const shop = SHOPS.find(s => s.id === shopId);
    const shopProducts = POPULAR_PRODUCTS.filter(p => p.shopId === shopId);

    if (!shop) {
        return (
            <View style={styles.centered}>
                <Text>Shop not found</Text>
            </View>
        );
    }

    const categories = ['All', ...new Set(shop.tags)];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header Overlay */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.backButton}>
                    <Ionicons name="search" size={22} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: shop.image }} style={styles.shopImage} />
                    <View style={styles.shopOverlay}>
                        <Text style={styles.shopName}>{shop.name}</Text>
                        <View style={styles.metaRow}>
                            <View style={styles.badge}>
                                <Ionicons name="star" size={12} color="#FFD700" />
                                <Text style={styles.badgeText}>{shop.rating}</Text>
                            </View>
                            <View style={styles.badge}>
                                <Ionicons name="time-outline" size={12} color="#333" />
                                <Text style={styles.badgeText}>{shop.deliveryTime}</Text>
                            </View>
                            <Text style={styles.locationText}>{shop.location}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.content}>
                    {/* Category Tabs */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryTabs}>
                        {categories.map(cat => (
                            <TouchableOpacity
                                key={cat}
                                onPress={() => setActiveCategory(cat)}
                                style={[styles.tab, activeCategory === cat && styles.activeTab]}
                            >
                                <Text style={[styles.tabText, activeCategory === cat && styles.activeTabText]}>{cat}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Catalog */}
                    <Text style={styles.catalogTitle}>Product Catalog</Text>
                    <View style={styles.productsGrid}>
                        {shopProducts.map(product => (
                            <NativeProductCard
                                key={product.id}
                                product={product}
                                width={(width - 64) / 2}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: {
        position: 'absolute',
        top: 44,
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
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        height: 300,
        width: width,
    },
    shopImage: {
        width: '100%',
        height: '100%',
    },
    shopOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
        padding: 24,
        paddingBottom: 40,
    },
    shopName: {
        fontSize: 32,
        fontWeight: '900',
        color: '#fff',
        marginBottom: 8,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        gap: 4,
    },
    badgeText: { fontSize: 12, fontWeight: '800', color: '#333' },
    locationText: { color: '#fff', fontSize: 13, fontWeight: '600', textShadowColor: 'rgba(0,0,0,0.5)', textShadowRadius: 4 },
    content: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: -30,
        paddingTop: 24,
        minHeight: 500,
    },
    categoryTabs: { paddingHorizontal: 24, gap: 12, marginBottom: 24 },
    tab: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
    },
    activeTab: { backgroundColor: '#E91E63' },
    tabText: { fontSize: 14, fontWeight: '700', color: '#666' },
    activeTabText: { color: '#fff' },
    catalogTitle: { fontSize: 18, fontWeight: '800', color: '#333', paddingHorizontal: 24, marginBottom: 16 },
    productsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 24,
        gap: 16,
        paddingBottom: 40,
    }
});

export default ShopDetailsScreen;

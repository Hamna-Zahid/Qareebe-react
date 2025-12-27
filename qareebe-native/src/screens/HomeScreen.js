import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES, SHOPS, POPULAR_PRODUCTS } from '../data/mock';
import { NativeProductCard, NativeShopCard } from '../components/NativeComponents';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.brandTitle}>Qareebe</Text>
                    <View style={styles.locationContainer}>
                        <Text style={styles.locationText}>Delivering to </Text>
                        <Text style={styles.locationActive}>DHA Phase 6</Text>
                        <Ionicons name="chevron-down" size={12} color="#E91E63" />
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.profileButton}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Text style={styles.profileChar}>Q</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Search */}
                <TouchableOpacity
                    style={styles.searchBar}
                    onPress={() => navigation.navigate('Explore')}
                >
                    <Ionicons name="search" size={20} color="#999" />
                    <Text style={styles.searchPlaceholder}>Search for clothes, shops...</Text>
                </TouchableOpacity>

                {/* Promo Banner */}
                <View style={styles.banner}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1596462502278-27bfdd403c48?q=80&w=2070' }}
                        style={styles.bannerImage}
                    />
                    <View style={styles.bannerOverlay}>
                        <View style={styles.promoBadge}>
                            <Text style={styles.promoBadgeText}>LIMITED OFFER</Text>
                        </View>
                        <Text style={styles.bannerTitle}>Summer Sale</Text>
                        <Text style={styles.bannerSubtitle}>Up to 50% off on premium brands.</Text>
                        <TouchableOpacity
                            style={styles.bannerButton}
                            onPress={() => navigation.navigate('Explore')}
                        >
                            <Text style={styles.bannerButtonText}>Explore Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Categories */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Categories</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesList}>
                        {CATEGORIES.map(cat => (
                            <TouchableOpacity
                                key={cat.id}
                                style={styles.categoryCard}
                                onPress={() => navigation.navigate('Explore', { category: cat.id })}
                            >
                                <View style={styles.categoryIconContainer}>
                                    <Ionicons
                                        name={cat.id === 'women' ? 'woman' : cat.id === 'men' ? 'man' : cat.id === 'kids' ? 'happy' : 'pricetag'}
                                        size={22}
                                        color="#E91E63"
                                    />
                                </View>
                                <Text style={styles.categoryName}>{cat.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Popular Now */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Popular Now</Text>
                        <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.popularList}>
                        {POPULAR_PRODUCTS.map(product => (
                            <NativeProductCard key={product.id} product={product} />
                        ))}
                    </ScrollView>
                </View>

                {/* Nearby Shops */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Nearby Shops</Text>
                    <View style={styles.shopsList}>
                        {SHOPS.map(shop => (
                            <NativeShopCard key={shop.id} shop={shop} />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 16,
    },
    brandTitle: {
        fontSize: 26,
        fontWeight: '900',
        color: '#E91E63',
        letterSpacing: -1,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    locationText: {
        fontSize: 10,
        color: '#999',
        fontWeight: '600',
    },
    locationActive: {
        fontSize: 10,
        color: '#333',
        fontWeight: '800',
        textDecorationLine: 'underline',
    },
    profileButton: {
        width: 42,
        height: 42,
        backgroundColor: '#FCE4EC',
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    profileChar: {
        fontSize: 18,
        fontWeight: '900',
        color: '#E91E63',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        marginHorizontal: 24,
        paddingHorizontal: 16,
        height: 50,
        borderRadius: 15,
        marginBottom: 24,
        gap: 12,
    },
    searchPlaceholder: {
        fontSize: 13,
        color: '#999',
        fontWeight: '500',
    },
    banner: {
        marginHorizontal: 24,
        height: 200,
        borderRadius: 30,
        overflow: 'hidden',
        marginBottom: 30,
        backgroundColor: '#eee',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
    },
    bannerOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(233, 30, 99, 0.7)',
        padding: 24,
        justifyContent: 'center',
    },
    promoBadge: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginBottom: 10,
    },
    promoBadgeText: {
        color: '#fff',
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 1,
    },
    bannerTitle: {
        fontSize: 30,
        fontWeight: '900',
        color: '#fff',
        marginBottom: 4,
    },
    bannerSubtitle: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 16,
        maxWidth: '70%',
    },
    bannerButton: {
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
    },
    bannerButtonText: {
        color: '#E91E63',
        fontSize: 12,
        fontWeight: '800',
    },
    section: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#333',
        paddingHorizontal: 24,
        marginBottom: 16,
    },
    seeAll: {
        fontSize: 12,
        fontWeight: '700',
        color: '#E91E63',
    },
    categoriesList: {
        paddingHorizontal: 24,
        gap: 16,
    },
    categoryCard: {
        width: 80,
        backgroundColor: '#fff',
        paddingVertical: 16,
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#f0f0f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
        elevation: 2,
    },
    categoryIconContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#FCE4EC',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    categoryName: {
        fontSize: 10,
        fontWeight: '700',
        color: '#666',
    },
    popularList: {
        paddingHorizontal: 24,
        paddingBottom: 4,
    },
    shopsList: {
        paddingHorizontal: 24,
    }
});

export default HomeScreen;

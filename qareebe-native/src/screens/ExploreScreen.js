import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { POPULAR_PRODUCTS } from '../data/mock';
import { NativeProductCard } from '../components/NativeComponents';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const columnWidth = (width - 48) / 2;

// Removed local ProductCard in favor of reusable NativeProductCard

const ExploreScreen = () => {
    const [search, setSearch] = useState('');

    const filteredProducts = POPULAR_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Explore</Text>
                    <Text style={styles.headerSubtitle}>DISCOVER NEW TRENDS</Text>
                </View>
                <TouchableOpacity style={styles.trendingBadge}>
                    <Ionicons name="trending-up" size={12} color="#E91E63" />
                    <Text style={styles.trendingText}>HOT NOW</Text>
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search products, trends..."
                        style={styles.input}
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="options" size={20} color="white" />
                </TouchableOpacity>
            </View>

            {/* Products Grid */}
            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <NativeProductCard
                        product={item}
                        width={columnWidth}
                    />
                )}
                numColumns={2}
                contentContainerStyle={styles.listContent}
                columnWrapperStyle={styles.columnWrapper}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <Text style={styles.sectionTitle}>
                        {search ? `Search Results (${filteredProducts.length})` : 'Popular Products'}
                    </Text>
                )}
            />
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
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#333',
        letterSpacing: -0.5,
    },
    headerSubtitle: {
        fontSize: 10,
        fontWeight: '700',
        color: '#999',
        letterSpacing: 1,
        marginTop: 2,
    },
    trendingBadge: {
        backgroundColor: '#FCE4EC',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 4,
    },
    trendingText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#E91E63',
    },
    searchContainer: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        gap: 12,
        marginBottom: 24,
    },
    searchBar: {
        flex: 1,
        height: 50,
        backgroundColor: '#F5F5F5',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
    },
    filterButton: {
        width: 50,
        height: 50,
        backgroundColor: '#333',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        paddingHorizontal: 24,
        paddingBottom: 100,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#333',
        marginBottom: 16,
    },
    card: {
        width: columnWidth,
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        overflow: 'hidden',
    },
    productImage: {
        width: '100%',
        height: columnWidth * 1.2,
        backgroundColor: '#F9F9F9',
    },
    cardContent: {
        padding: 12,
    },
    productName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#444',
        marginBottom: 4,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    price: {
        fontSize: 14,
        fontWeight: '800',
        color: '#333',
    },
    oldPrice: {
        fontSize: 10,
        color: '#999',
        textDecorationLine: 'line-through',
    },
    addButton: {
        position: 'absolute',
        bottom: 40,
        right: 8,
        width: 28,
        height: 28,
        backgroundColor: '#E91E63',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#E91E63',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    }
});

export default ExploreScreen;

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { POPULAR_PRODUCTS } from '../data/mock';

const ShopProductsScreen = () => {
    const navigation = useNavigation();
    // Mock filter for Shop 1
    const myProducts = POPULAR_PRODUCTS.filter(p => p.shopId === 1);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.productItem}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>Rs. {item.price}</Text>
                <View style={styles.statusRow}>
                    <View style={styles.activeDot} />
                    <Text style={styles.statusText}>Active</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.editBtn}>
                <Ionicons name="create-outline" size={20} color="#666" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Inventory</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddProduct')}
                >
                    <Ionicons name="add" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={myProducts}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 },
    backButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 18, fontWeight: '800' },
    addButton: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#E91E63', justifyContent: 'center', alignItems: 'center' },
    list: { padding: 20 },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F5F5F5',
    },
    productImage: { width: 60, height: 60, borderRadius: 10, backgroundColor: '#F9F9F9' },
    productDetails: { flex: 1, marginLeft: 15 },
    productName: { fontSize: 15, fontWeight: '700', color: '#333' },
    productPrice: { fontSize: 13, fontWeight: '800', color: '#E91E63', marginTop: 2 },
    statusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    activeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#4CAF50', marginRight: 6 },
    statusText: { fontSize: 10, fontWeight: '700', color: '#4CAF50' },
    editBtn: { padding: 10 }
});

export default ShopProductsScreen;

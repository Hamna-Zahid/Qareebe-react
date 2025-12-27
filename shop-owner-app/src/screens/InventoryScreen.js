import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    ActivityIndicator,
    Alert,
    Dimensions,
    Modal,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { collection, query, where, getDocs, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { POPULAR_PRODUCTS } from '../data/mock';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const InventoryScreen = ({ navigation }) => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState('');

    // Editing State
    const [editingProduct, setEditingProduct] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editData, setEditData] = useState({ name: '', price: '', stock: '' });
    const [updateLoading, setUpdateLoading] = useState(false);

    useEffect(() => {
        const shopId = user?.uid || user?.shopId;
        if (!shopId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const q = query(collection(db, 'products'), where('shopId', '==', shopId));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedProducts = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            if (fetchedProducts.length > 0) {
                setProducts(fetchedProducts);
            } else {
                setProducts(POPULAR_PRODUCTS.map(p => ({ ...p, id: 'mock-' + p.id })));
            }
            setLoading(false);
            setRefreshing(false);
        }, (error) => {
            console.error('Inventory Snapshot error:', error);
            setLoading(false);
            setRefreshing(false);
        });

        return () => unsubscribe();
    }, [user]);

    const fetchProducts = () => {
        // Handled by onSnapshot, but keeping for compatibility if refreshed manually
        setRefreshing(true);
        // Refreshing state will trigger re-connect if needed, or simply wait for snap
        setRefreshing(false);
    };

    const handleRefresh = () => {
        setRefreshing(true);
        fetchProducts();
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes(search.toLowerCase()))
    );

    const handleDelete = async (productId) => {
        if (productId.startsWith('mock-')) {
            Alert.alert('Simulated Action', 'Mock products cannot be deleted from the database.');
            return;
        }

        try {
            await deleteDoc(doc(db, 'products', productId));
            Alert.alert('Success', 'Product removed from inventory.');
        } catch (error) {
            console.error('Delete error:', error);
            Alert.alert('Error', 'Failed to delete product.');
        }
    };

    const handleEdit = (product) => {
        if (product.id.startsWith('mock-')) {
            Alert.alert('Simulated Action', 'Mock products cannot be edited.');
            return;
        }
        setEditingProduct(product);
        setEditData({
            name: product.name,
            price: product.price.toString(),
            stock: product.stock.toString()
        });
        setEditModalVisible(true);
    };

    const handleUpdate = async () => {
        if (!editData.name || !editData.price || !editData.stock) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setUpdateLoading(true);
        try {
            const productRef = doc(db, 'products', editingProduct.id);
            await updateDoc(productRef, {
                name: editData.name,
                price: parseFloat(editData.price),
                stock: parseInt(editData.stock),
                category: editingProduct.category
            });

            setUpdateLoading(false);
            setEditModalVisible(false);

            // Notify user without blocking
            setTimeout(() => {
                Alert.alert('Success', 'Product updated successfully');
            }, 300);
        } catch (error) {
            setUpdateLoading(false);
            console.error('Update error:', error);
            Alert.alert('Error', 'Failed to update: ' + error.message);
        }
    };

    const ProductCard = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.cardInfo}>
                <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.productPrice}>Rs. {item.price}</Text>

                <View style={styles.stockRow}>
                    <View style={[
                        styles.stockBadge,
                        { backgroundColor: item.stock > 10 ? '#E8F5E9' : item.stock > 0 ? '#FFF3E0' : '#FFEBEE' }
                    ]}>
                        <Text style={[
                            styles.stockText,
                            { color: item.stock > 10 ? '#4CAF50' : item.stock > 0 ? '#FF9800' : '#F44336' }
                        ]}>
                            {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                        </Text>
                    </View>
                </View>

                <View style={styles.actionRow}>
                    <TouchableOpacity
                        style={styles.editBtn}
                        onPress={() => handleEdit(item)}
                    >
                        <Ionicons name="create-outline" size={16} color="#333" />
                        <Text style={styles.btnText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => Alert.alert('Delete Product', 'Are you sure you want to remove this item?', [
                            { text: 'Cancel', style: 'cancel' },
                            { text: 'Delete', style: 'destructive', onPress: () => handleDelete(item.id) }
                        ])}
                    >
                        <Ionicons name="trash-outline" size={16} color="#F44336" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>My Inventory</Text>
                    <Text style={styles.headerSubtitle}>{products.length} Products</Text>
                </View>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddProduct')}
                >
                    <Ionicons name="add" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search your inventory..."
                        style={styles.input}
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
            </View>

            {loading && !refreshing ? (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color="#E91E63" />
                </View>
            ) : (
                <FlatList
                    data={filteredProducts}
                    renderItem={({ item }) => <ProductCard item={item} />}
                    keyExtractor={item => item.id || item._id}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                    contentContainerStyle={styles.listContent}
                    onRefresh={handleRefresh}
                    refreshing={refreshing}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="cube-outline" size={60} color="#EEE" />
                            <Text style={styles.emptyText}>No products found</Text>
                        </View>
                    )}
                />
            )}

            {/* Edit Product Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={editModalVisible}
                onRequestClose={() => setEditModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.modalContent}
                    >
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Edit Product</Text>
                            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalForm} showsVerticalScrollIndicator={false}>
                            {editingProduct?.image && (
                                <Image source={{ uri: editingProduct.image }} style={styles.modalPreviewImage} />
                            )}

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Product Name</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    value={editData.name}
                                    onChangeText={(val) => setEditData({ ...editData, name: val })}
                                    placeholder="Enter product name"
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Category</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.modalCatScroll}>
                                    {['Women', 'Men', 'Kids', 'Accessories', 'Beauty'].map(cat => (
                                        <TouchableOpacity
                                            key={cat}
                                            style={[styles.modalCatChip, editingProduct?.category === cat && styles.modalActiveCat]}
                                            onPress={() => setEditingProduct({ ...editingProduct, category: cat })}
                                        >
                                            <Text style={[styles.modalCatText, editingProduct?.category === cat && styles.modalActiveCatText]}>{cat}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Price (Rs.)</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    value={editData.price}
                                    onChangeText={(val) => setEditData({ ...editData, price: val })}
                                    keyboardType="numeric"
                                    placeholder="0"
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Stock Quantity</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    value={editData.stock}
                                    onChangeText={(val) => setEditData({ ...editData, stock: val })}
                                    keyboardType="numeric"
                                    placeholder="0"
                                />
                            </View>

                            <TouchableOpacity
                                style={styles.updateBtn}
                                onPress={handleUpdate}
                                disabled={updateLoading}
                            >
                                {updateLoading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.updateBtnText}>Save Changes</Text>
                                )}
                            </TouchableOpacity>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 20 },
    headerTitle: { fontSize: 24, fontWeight: '900', color: '#333' },
    headerSubtitle: { fontSize: 12, color: '#999', fontWeight: '700', textTransform: 'uppercase', marginTop: 2 },
    addButton: { width: 50, height: 50, borderRadius: 15, backgroundColor: '#E91E63', justifyContent: 'center', alignItems: 'center', shadowColor: '#E91E63', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 4 },
    searchContainer: { paddingHorizontal: 24, marginBottom: 20 },
    searchBar: { height: 55, backgroundColor: '#F5F5F5', borderRadius: 15, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 },
    searchIcon: { marginRight: 10 },
    input: { flex: 1, fontSize: 16, fontWeight: '500' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    listContent: { paddingHorizontal: 24, paddingBottom: 100 },
    columnWrapper: { justifyContent: 'space-between' },
    card: { width: cardWidth, backgroundColor: '#fff', borderRadius: 20, marginBottom: 20, borderWidth: 1, borderColor: '#F5F5F5', overflow: 'hidden' },
    productImage: { width: '100%', height: cardWidth, backgroundColor: '#FAFAFA' },
    cardInfo: { padding: 12 },
    productName: { fontSize: 14, fontWeight: '800', color: '#333' },
    productPrice: { fontSize: 14, fontWeight: '700', color: '#E91E63', marginTop: 4 },
    stockRow: { marginTop: 8 },
    stockBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, alignSelf: 'flex-start' },
    stockText: { fontSize: 10, fontWeight: '800' },
    actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, gap: 8 },
    editBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F5F5', paddingVertical: 8, borderRadius: 10, gap: 4 },
    deleteBtn: { width: 36, height: 36, backgroundColor: '#FFEBEE', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    btnText: { fontSize: 12, fontWeight: '700', color: '#333' },
    emptyContainer: { alignItems: 'center', marginTop: 100 },
    emptyText: { color: '#999', fontSize: 16, marginTop: 10, fontWeight: '600' },

    // Modal Styles
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24, maxHeight: '80%' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
    modalTitle: { fontSize: 20, fontWeight: '900', color: '#333' },
    modalForm: { gap: 20 },
    inputGroup: { marginBottom: 20 },
    label: { fontSize: 12, fontWeight: '800', color: '#999', textTransform: 'uppercase', marginBottom: 8 },
    modalInput: { height: 55, backgroundColor: '#F5F5F5', borderRadius: 15, paddingHorizontal: 15, fontSize: 16, fontWeight: '600', color: '#333', borderWidth: 1, borderColor: '#EEE' },
    modalPreviewImage: { width: '100%', height: 200, borderRadius: 20, marginBottom: 20 },
    modalCatScroll: { marginHorizontal: -5 },
    modalCatChip: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 10, backgroundColor: '#F5F5F5', marginRight: 10 },
    modalActiveCat: { backgroundColor: '#333' },
    modalCatText: { fontSize: 12, fontWeight: '700', color: '#666' },
    modalActiveCatText: { color: '#fff' },
    updateBtn: { backgroundColor: '#333', height: 60, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 30 },
    updateBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' }
});

export default InventoryScreen;

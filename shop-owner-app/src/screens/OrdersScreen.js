import React, { useState, useEffect, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Linking,
    Alert,
    ActivityIndicator,
    Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { useAuth } from '../context/AuthContext';

const OrdersScreen = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('All');
    const [search, setSearch] = useState('');
    const { user } = useAuth();
    const insets = useSafeAreaInsets();

    useEffect(() => {
        const shopId = user?.uid || user?.shopId;
        if (!shopId) {
            setLoading(false);
            return;
        }

        const q = query(collection(db, 'orders'), where('shopId', '==', shopId));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const ordersList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setOrders(ordersList);
            setLoading(false);
        }, (error) => {
            console.error("Orders Snapshot error:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
            const matchesSearch =
                (order.id && order.id.toLowerCase().includes(search.toLowerCase())) ||
                (order.customer && order.customer.toLowerCase().includes(search.toLowerCase()));
            return matchesStatus && matchesSearch;
        });
    }, [orders, filterStatus, search]);

    const updateStatus = async (orderId, newStatus) => {
        try {
            await updateDoc(doc(db, 'orders', orderId), {
                status: newStatus
            });
        } catch (error) {
            Alert.alert('Error', 'Failed to update order status');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return '#FF9800';
            case 'Processing': return '#2196F3';
            case 'Ready': return '#9C27B0';
            case 'Completed': return '#4CAF50';
            default: return '#999';
        }
    };

    const OrderCard = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View>
                    <Text style={styles.orderId}>#{item.id.slice(-6).toUpperCase()}</Text>
                    <View style={styles.timeRow}>
                        <Ionicons name="time-outline" size={12} color="#999" />
                        <Text style={styles.timeText}>{item.time || 'Just now'}</Text>
                    </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '15' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
                </View>
            </View>

            <View style={styles.customerBox}>
                <View style={styles.customerTop}>
                    <Text style={styles.customerName}>{item.customer || 'Guest Customer'}</Text>
                    <TouchableOpacity
                        style={styles.callBtn}
                        onPress={() => item.phone && Linking.openURL(`tel:${item.phone}`)}
                    >
                        <Ionicons name="call" size={16} color="#4CAF50" />
                    </TouchableOpacity>
                </View>
                <View style={styles.addressRow}>
                    <Ionicons name="location-outline" size={14} color="#999" />
                    <Text style={styles.addressText}>{item.address || 'Standard Delivery'}</Text>
                </View>
            </View>

            <View style={styles.itemsBox}>
                <Text style={styles.sectionTitle}>Items ({item.items?.length || 0})</Text>
                {item.items?.map((prod, idx) => (
                    <View key={idx} style={styles.itemLine}>
                        <Text style={styles.itemText}><Text style={styles.qtyText}>{prod.qty}x</Text> {prod.name}</Text>
                        <Text style={styles.itemPrice}>Rs. {prod.price * prod.qty}</Text>
                    </View>
                ))}
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total Amount</Text>
                    <Text style={styles.totalValue}>Rs. {item.total || 0}</Text>
                </View>
            </View>

            {item.status !== 'Completed' && (
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.rejectBtn}
                        onPress={() => Alert.alert('Reject Order', 'Are you sure?')}
                    >
                        <Text style={styles.rejectText}>Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.acceptBtn}
                        onPress={() => {
                            const statuses = ['Pending', 'Processing', 'Ready', 'Completed'];
                            const currentIndex = statuses.indexOf(item.status);
                            if (currentIndex < statuses.length - 1) {
                                updateStatus(item.id, statuses[currentIndex + 1]);
                            }
                        }}
                    >
                        <Text style={styles.acceptText}>
                            {item.status === 'Pending' ? 'Accept' : item.status === 'Processing' ? 'Mark Ready' : 'Complete'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Incoming Orders</Text>
            </View>

            <View style={styles.searchBox}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color="#999" />
                    <TextInput
                        placeholder="Search ID or Customer..."
                        style={styles.input}
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
            </View>

            <View style={styles.filterSection}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                    {['All', 'Pending', 'Processing', 'Ready', 'Completed'].map(status => (
                        <TouchableOpacity
                            key={status}
                            style={[styles.filterChip, filterStatus === status && styles.activeChip]}
                            onPress={() => setFilterStatus(status)}
                        >
                            <Text style={[styles.filterText, filterStatus === status && styles.activeFilterText]}>{status}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#E91E63" />
                </View>
            ) : (
                <FlatList
                    data={filteredOrders}
                    renderItem={({ item }) => <OrderCard item={item} />}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={() => (
                        <View style={styles.empty}>
                            <Ionicons name="receipt-outline" size={60} color="#EEE" />
                            <Text style={styles.emptyText}>No orders found</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { paddingHorizontal: 24, paddingVertical: 20 },
    headerTitle: { fontSize: 24, fontWeight: '900', color: '#333' },
    searchBox: { paddingHorizontal: 24, marginBottom: 15 },
    searchBar: { height: 50, backgroundColor: '#F5F5F5', borderRadius: 15, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 },
    input: { flex: 1, marginLeft: 10, fontSize: 14, fontWeight: '600' },
    filterSection: { marginBottom: 20 },
    filterScroll: { paddingHorizontal: 24, gap: 10 },
    filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: '#EEE' },
    activeChip: { backgroundColor: '#333', borderColor: '#333' },
    filterText: { fontSize: 12, fontWeight: '700', color: '#666' },
    activeFilterText: { color: '#fff' },
    listContent: { paddingHorizontal: 24, paddingBottom: 100 },
    card: { backgroundColor: '#fff', borderRadius: 25, borderWIdth: 1, borderColor: '#F5F5F5', marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 10, elevation: 2, overflow: 'hidden', borderWidth: 1 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F9F9F9' },
    orderId: { fontSize: 18, fontWeight: '900', color: '#333' },
    timeRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
    timeText: { fontSize: 12, color: '#999', fontWeight: '500' },
    statusBadge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10 },
    statusText: { fontSize: 10, fontWeight: '800' },
    customerBox: { padding: 16, backgroundColor: '#FAFAFA' },
    customerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    customerName: { fontSize: 16, fontWeight: '800', color: '#333' },
    callBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#E8F5E9', justifyContent: 'center', alignItems: 'center' },
    addressRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
    addressText: { fontSize: 12, color: '#666', flex: 1 },
    itemsBox: { padding: 16 },
    sectionTitle: { fontSize: 10, fontWeight: '800', color: '#999', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 },
    itemLine: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    itemText: { fontSize: 14, color: '#333', fontWeight: '600' },
    qtyText: { color: '#E91E63' },
    itemPrice: { fontSize: 14, color: '#333', fontWeight: '700' },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F5F5F5' },
    totalLabel: { fontSize: 14, fontWeight: '700', color: '#333' },
    totalValue: { fontSize: 18, fontWeight: '900', color: '#E91E63' },
    actions: { flexDirection: 'row', padding: 12, gap: 10, backgroundColor: '#F9F9F9' },
    rejectBtn: { flex: 1, height: 48, borderRadius: 12, borderWIdth: 1, borderColor: '#EEE', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
    rejectText: { fontSize: 14, fontWeight: '700', color: '#666' },
    acceptBtn: { flex: 2, height: 48, borderRadius: 12, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center' },
    acceptText: { fontSize: 14, fontWeight: '800', color: '#fff' },
    empty: { alignItems: 'center', marginTop: 100 },
    emptyText: { color: '#999', fontSize: 16, marginTop: 10, fontWeight: '600' },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default OrdersScreen;

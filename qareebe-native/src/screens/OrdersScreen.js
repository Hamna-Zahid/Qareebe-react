import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MOCK_ORDERS = [
    { id: 'ORD-1234', date: '25 Dec, 2025', status: 'Delivered', total: 4650, items: 3, isOngoing: false },
    { id: 'ORD-5678', date: '20 Dec, 2025', status: 'Processing', total: 1200, items: 1, isOngoing: true },
    { id: 'ORD-9012', date: 'Just now', status: 'Confirmed', total: 2400, items: 2, isOngoing: true },
];

const OrdersScreen = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('Ongoing');

    const filteredOrders = MOCK_ORDERS.filter(order =>
        activeTab === 'Ongoing' ? order.isOngoing : !order.isOngoing
    );

    const renderOrder = ({ item }) => (
        <TouchableOpacity style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <Text style={styles.orderId}>{item.id}</Text>
                <View style={[styles.statusBadge, { backgroundColor: item.status === 'Delivered' ? '#E8F5E9' : '#FFF3E0' }]}>
                    <Text style={[styles.statusText, { color: item.status === 'Delivered' ? '#4CAF50' : '#FF9800' }]}>{item.status}</Text>
                </View>
            </View>
            <View style={styles.orderInfo}>
                <Text style={styles.orderDate}>{item.date}</Text>
                <Text style={styles.orderMeta}>{item.items} items • Rs. {item.total}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#CCC" style={styles.arrowIcon} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Orders</Text>
                <View style={{ width: 44 }} />
            </View>

            <View style={styles.tabs}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Ongoing' && styles.activeTab]}
                    onPress={() => setActiveTab('Ongoing')}
                >
                    <Text style={[styles.tabText, activeTab === 'Ongoing' && styles.activeTabText]}>Ongoing</Text>
                    {activeTab === 'Ongoing' && <View style={styles.activeIndicator} />}
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'History' && styles.activeTab]}
                    onPress={() => setActiveTab('History')}
                >
                    <Text style={[styles.tabText, activeTab === 'History' && styles.activeTabText]}>History</Text>
                    {activeTab === 'History' && <View style={styles.activeIndicator} />}
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredOrders}
                keyExtractor={item => item.id}
                renderItem={renderOrder}
                contentContainerStyle={styles.list}
                ListEmptyComponent={() => (
                    <View style={styles.empty}>
                        <Ionicons name="receipt-outline" size={60} color="#EEE" />
                        <Text style={styles.emptyText}>No orders yet</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 },
    backButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 18, fontWeight: '800' },
    tabs: { flexDirection: 'row', paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
    tab: { flex: 1, paddingVertical: 15, alignItems: 'center', position: 'relative' },
    tabText: { fontSize: 14, fontWeight: '700', color: '#999' },
    activeTabText: { color: '#E91E63' },
    activeIndicator: { position: 'absolute', bottom: 0, width: '40%', height: 3, backgroundColor: '#E91E63', borderRadius: 2 },
    list: { padding: 24 },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F5F5F5',
        shadowColor: '#000',
        shadowOpacity: 0.02,
        shadowRadius: 10,
        elevation: 2,
        position: 'relative'
    },
    orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    orderId: { fontSize: 14, fontWeight: '800', color: '#333' },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    statusText: { fontSize: 10, fontWeight: '800' },
    orderInfo: { gap: 4 },
    orderDate: { fontSize: 12, color: '#999', fontWeight: '500' },
    orderMeta: { fontSize: 14, fontWeight: '700', color: '#666' },
    arrowIcon: { position: 'absolute', right: 16, top: '50%', marginTop: 0 },
    empty: { alignItems: 'center', marginTop: 100 },
    emptyText: { color: '#999', fontSize: 14, marginTop: 10, fontWeight: '500' }
});

export default OrdersScreen;

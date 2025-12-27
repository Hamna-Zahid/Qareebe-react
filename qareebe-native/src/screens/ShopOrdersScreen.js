import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MOCK_SHOP_ORDERS = [
    { id: 'ORD-2001', customer: 'Hamna Zahid', items: 2, total: 3500, status: 'Pending', time: '2h ago' },
    { id: 'ORD-2002', customer: 'Ali Khan', items: 1, total: 1200, status: 'Preparing', time: '4h ago' },
    { id: 'ORD-2003', customer: 'Sara Malik', items: 3, total: 5400, status: 'On the way', time: '6h ago' },
];

const ShopOrdersScreen = () => {
    const navigation = useNavigation();

    const renderOrder = ({ item }) => (
        <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <View>
                    <Text style={styles.orderId}>{item.id}</Text>
                    <Text style={styles.customerName}>{item.customer}</Text>
                </View>
                <View style={styles.timeContainer}>
                    <Ionicons name="time-outline" size={12} color="#999" />
                    <Text style={styles.timeText}>{item.time}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.orderFooter}>
                <Text style={styles.orderMeta}>{item.items} items • Rs. {item.total}</Text>
                <TouchableOpacity style={[
                    styles.statusBadge,
                    item.status === 'Pending' ? styles.pendingBadge : styles.activeBadge
                ]}>
                    <Text style={[
                        styles.statusText,
                        item.status === 'Pending' ? styles.pendingText : styles.activeText
                    ]}>{item.status}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Incoming Orders</Text>
                <View style={{ width: 44 }} />
            </View>

            <FlatList
                data={MOCK_SHOP_ORDERS}
                keyExtractor={item => item.id}
                renderItem={renderOrder}
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
    list: { padding: 24 },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F5F5F5',
        shadowColor: '#000',
        shadowOpacity: 0.02,
        shadowRadius: 10,
        elevation: 2,
    },
    orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    orderId: { fontSize: 12, fontWeight: '700', color: '#999' },
    customerName: { fontSize: 16, fontWeight: '800', color: '#333', marginTop: 2 },
    timeContainer: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    timeText: { fontSize: 12, color: '#999', fontWeight: '500' },
    divider: { height: 1, backgroundColor: '#F5F5F5', marginVertical: 15 },
    orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    orderMeta: { fontSize: 14, fontWeight: '700', color: '#666' },
    statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
    pendingBadge: { backgroundColor: '#FCE4EC' },
    activeBadge: { backgroundColor: '#E3F2FD' },
    statusText: { fontSize: 12, fontWeight: '800' },
    pendingText: { color: '#E91E63' },
    activeText: { color: '#2196F3' }
});

export default ShopOrdersScreen;

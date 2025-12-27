import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { SHOPS, POPULAR_PRODUCTS } from '../data/mock';

const DashboardScreen = ({ navigation }) => {
    const { logout, user } = useAuth();

    const [productCount, setProductCount] = React.useState(0);
    const [orderCount, setOrderCount] = React.useState(0);

    React.useEffect(() => {
        const shopId = user?.uid || user?.shopId;
        if (!shopId) return;

        // Fetch Product Count
        const qProducts = query(collection(db, 'products'), where('shopId', '==', shopId));
        const unsubscribeProducts = onSnapshot(qProducts, (snapshot) => {
            setProductCount(snapshot.size);
        });

        // Fetch Order Count (Pending)
        const qOrders = query(collection(db, 'orders'), where('shopId', '==', shopId), where('status', '==', 'Pending'));
        const unsubscribeOrders = onSnapshot(qOrders, (snapshot) => {
            setOrderCount(snapshot.size);
        });

        return () => {
            unsubscribeProducts();
            unsubscribeOrders();
        };
    }, [user]);

    const stats = [
        { title: 'Total Sales', value: 'Rs. 0', icon: 'cash-outline', color: '#4CAF50' },
        { title: 'Pending Orders', value: orderCount.toString(), icon: 'time-outline', color: '#FF9800' },
        { title: 'New Reviews', value: '0', icon: 'star-outline', color: '#E91E63' },
        { title: 'Products', value: productCount.toString(), icon: 'shirt-outline', color: '#2196F3' }
    ];

    const StatCard = ({ title, value, icon, color }) => (
        <View style={styles.statCard}>
            <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
                <Ionicons name={icon} size={24} color={color} />
            </View>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statTitle}>{title}</Text>
        </View>
    );

    const QuickAction = ({ icon, title, subtitle, onPress, color }) => (
        <TouchableOpacity style={styles.actionCard} onPress={onPress}>
            <View style={[styles.actionIcon, { backgroundColor: color }]}>
                <Ionicons name={icon} size={24} color="#fff" />
            </View>
            <View style={styles.actionText}>
                <Text style={styles.actionTitle}>{title}</Text>
                <Text style={styles.actionSubtitle}>{subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </TouchableOpacity>
    );

    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <StatusBar barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.welcomeText}>Welcome back,</Text>
                        <Text style={styles.merchantName}>{user?.name} 👋</Text>
                    </View>
                    <TouchableOpacity style={styles.profileButton} onPress={() => Alert.alert('Profile', 'Profile settings coming soon!')}>
                        <Ionicons name="person-circle-outline" size={32} color="#333" />
                    </TouchableOpacity>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <QuickAction
                        icon="add-circle-outline"
                        title="Add New Product"
                        subtitle="Upload new inventory items"
                        color="#E91E63"
                        onPress={() => navigation.navigate('AddProduct')}
                    />
                    <QuickAction
                        icon="list-outline"
                        title="Manage Inventory"
                        subtitle="Update stock and pricing"
                        color="#2196F3"
                        onPress={() => navigation.navigate('Inventory')}
                    />
                    <QuickAction
                        icon="receipt-outline"
                        title="Track Orders"
                        subtitle="View and process orders"
                        color="#4CAF50"
                        onPress={() => navigation.navigate('OrdersTab')}
                    />
                </View>

                {/* Performance Chart Placeholder */}
                <View style={[styles.section, { marginBottom: 30 }]}>
                    <Text style={styles.sectionTitle}>Performance Overview</Text>
                    <View style={styles.chartPlaceholder}>
                        <Ionicons name="trending-up" size={40} color="#EEE" />
                        <Text style={styles.chartText}>Sales Analytics Chart</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <Ionicons name="log-out-outline" size={20} color="#F44336" />
                    <Text style={styles.logoutText}>Logout from Merchant Center</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    scrollContent: { padding: 24, paddingBottom: 100 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
    welcomeText: { fontSize: 14, color: '#999', fontWeight: '500' },
    merchantName: { fontSize: 24, fontWeight: '900', color: '#333' },
    profileButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, marginBottom: 30 },
    statCard: { width: '47.5%', backgroundColor: '#fff', padding: 16, borderRadius: 20, borderWidth: 1, borderColor: '#F5F5F5', shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 10, elevation: 2 },
    iconBox: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    statValue: { fontSize: 18, fontWeight: '900', color: '#333' },
    statTitle: { fontSize: 12, color: '#999', fontWeight: '600', marginTop: 2 },
    section: { marginTop: 10, gap: 12 },
    sectionTitle: { fontSize: 16, fontWeight: '800', color: '#333', marginBottom: 5 },
    actionCard: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#fff', borderRadius: 20, borderWidth: 1, borderColor: '#F5F5F5' },
    actionIcon: { width: 48, height: 48, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    actionText: { flex: 1 },
    actionTitle: { fontSize: 15, fontWeight: '800', color: '#333' },
    actionSubtitle: { fontSize: 12, color: '#999', marginTop: 2 },
    chartPlaceholder: { height: 150, backgroundColor: '#FAFAFA', borderRadius: 25, justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderWidth: 2, borderColor: '#EEE' },
    chartText: { color: '#CCC', fontWeight: '700', marginTop: 10 },
    logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20, gap: 10 },
    logoutText: { color: '#F44336', fontWeight: '700', fontSize: 14 }
});

export default DashboardScreen;

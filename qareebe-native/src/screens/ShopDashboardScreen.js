import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

const { width } = Dimensions.get('window');

const StatCard = ({ title, value, icon, color }) => (
    <TouchableOpacity
        style={styles.statCard}
        onPress={() => Alert.alert(title, `Total ${title.toLowerCase()}: ${value}`)}
    >
        <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
            <Ionicons name={icon} size={24} color={color} />
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
    </TouchableOpacity>
);

const ShopDashboardScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.welcomeText}>Merchant Center</Text>
                    <Text style={styles.shopNameText}>Zara's Boutique</Text>
                </View>
                <TouchableOpacity style={styles.settingsBtn}>
                    <Ionicons name="settings-outline" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <StatCard title="Total Sales" value="Rs. 45,200" icon="cash-outline" color="#4CAF50" />
                    <StatCard title="Orders" value="12" icon="cart-outline" color="#2196F3" />
                    <StatCard title="Products" value="28" icon="shirt-outline" color="#E91E63" />
                    <StatCard title="Rating" value="4.8" icon="star-outline" color="#FFD700" />
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.actionRow}>
                        <TouchableOpacity
                            style={styles.actionCard}
                            onPress={() => navigation.navigate('ShopProducts')}
                        >
                            <Ionicons name="add-circle-outline" size={32} color="#E91E63" />
                            <Text style={styles.actionText}>Add Product</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.actionCard}
                            onPress={() => navigation.navigate('ShopOrders')}
                        >
                            <Ionicons name="receipt-outline" size={32} color="#2196F3" />
                            <Text style={styles.actionText}>View Orders</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Recent Activity placeholder */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Orders</Text>
                    {[1, 2, 3].map(i => (
                        <View key={i} style={styles.activityItem}>
                            <View style={styles.activityIcon}>
                                <Ionicons name="gift-outline" size={20} color="#666" />
                            </View>
                            <View style={styles.activityInfo}>
                                <Text style={styles.activityTitle}>New Order #ORD-{2000 + i}</Text>
                                <Text style={styles.activityTime}>{i}h ago • Rs. 2,400</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.viewLink}>Details</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 20,
    },
    welcomeText: { fontSize: 13, fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: 1 },
    shopNameText: { fontSize: 24, fontWeight: '900', color: '#333' },
    settingsBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' },
    scrollContent: { paddingBottom: 40 },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 16,
        gap: 12,
    },
    statCard: {
        width: (width - 44) / 2,
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        shadowColor: '#000',
        shadowOpacity: 0.02,
        shadowRadius: 10,
        elevation: 2,
    },
    statIcon: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    statValue: { fontSize: 20, fontWeight: '900', color: '#333' },
    statTitle: { fontSize: 12, fontWeight: '600', color: '#999', marginTop: 4 },
    section: { paddingHorizontal: 24, marginTop: 32 },
    sectionTitle: { fontSize: 18, fontWeight: '800', color: '#333', marginBottom: 16 },
    actionRow: { flexDirection: 'row', gap: 16 },
    actionCard: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EEE',
    },
    actionText: { fontSize: 12, fontWeight: '800', color: '#333', marginTop: 10 },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    activityIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    activityInfo: { flex: 1 },
    activityTitle: { fontSize: 14, fontWeight: '700', color: '#333' },
    activityTime: { fontSize: 12, color: '#999', marginTop: 2 },
    viewLink: { fontSize: 12, fontWeight: '800', color: '#E91E63' },
});

export default ShopDashboardScreen;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image, Alert, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const ProfileItem = ({ icon, title, subtitle, onPress, color = '#333' }) => (
    <TouchableOpacity style={styles.profileItem} onPress={onPress}>
        <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
            <Ionicons name={icon} size={22} color={color} />
        </View>
        <View style={styles.itemTextContainer}>
            <Text style={styles.itemTitle}>{title}</Text>
            {subtitle && <Text style={styles.itemSubtitle}>{subtitle}</Text>}
        </View>
        <Ionicons name="chevron-forward" size={20} color="#CCC" />
    </TouchableOpacity>
);

const SettingToggle = ({ icon, title, value, onValueChange, color = '#333' }) => (
    <View style={styles.profileItem}>
        <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
            <Ionicons name={icon} size={22} color={color} />
        </View>
        <View style={styles.itemTextContainer}>
            <Text style={styles.itemTitle}>{title}</Text>
        </View>
        <Switch
            trackColor={{ false: "#eee", true: "#FCE4EC" }}
            thumbColor={value ? "#E91E63" : "#f4f3f4"}
            onValueChange={onValueChange}
            value={value}
        />
    </View>
);

const ProfileScreen = () => {
    const { user, logout } = useAuth();
    const navigation = useNavigation();
    const [notifications, setNotifications] = React.useState(true);
    const [biometrics, setBiometrics] = React.useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Profile Header */}
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'U'}</Text>
                        <TouchableOpacity style={styles.editAvatar}>
                            <Ionicons name="camera" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userName}>{user?.name || 'User Name'}</Text>
                    <Text style={styles.userPhone}>{user?.phoneNumber || '+92 300 1234567'}</Text>
                </View>

                {/* Account Sections */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Account Settings</Text>
                    <ProfileItem
                        icon="person-outline"
                        title="Edit Profile"
                        subtitle="Change your personal info"
                        color="#E91E63"
                        onPress={() => Alert.alert("Edit Profile", "Profile editing feature coming soon!")}
                    />
                    <ProfileItem
                        icon="receipt-outline"
                        title="My Orders"
                        subtitle="View your order history"
                        color="#FF9800"
                        onPress={() => navigation.navigate('Orders')}
                    />
                    <ProfileItem
                        icon="location-outline"
                        title="Shipping Address"
                        subtitle="DHA Phase 6, Lahore"
                        color="#4CAF50"
                        onPress={() => Alert.alert("Shipping Address", "Address management coming soon!")}
                    />
                    <ProfileItem
                        icon="card-outline"
                        title="Payment Methods"
                        subtitle="Visa ending in 4242"
                        color="#2196F3"
                        onPress={() => Alert.alert("Payment Methods", "Payment setup coming soon!")}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Preferences</Text>
                    <SettingToggle
                        icon="notifications-outline"
                        title="Push Notifications"
                        color="#FF9800"
                        value={notifications}
                        onValueChange={setNotifications}
                    />
                    <SettingToggle
                        icon="lock-closed-outline"
                        title="Biometric Login"
                        color="#9C27B0"
                        value={biometrics}
                        onValueChange={setBiometrics}
                    />
                    <ProfileItem
                        icon="help-circle-outline"
                        title="Help Support"
                        color="#607D8B"
                        onPress={() => Alert.alert("Help", "Help support center coming soon!")}
                    />
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <Ionicons name="log-out-outline" size={22} color="#F44336" />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

                <Text style={styles.version}>Qareebe Native v1.0.0</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { alignItems: 'center', paddingVertical: 40, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FCE4EC',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 16,
    },
    avatarText: { fontSize: 36, fontWeight: '900', color: '#E91E63' },
    editAvatar: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#E91E63',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#fff',
    },
    userName: { fontSize: 22, fontWeight: '900', color: '#333' },
    userPhone: { fontSize: 14, color: '#999', marginTop: 4, fontWeight: '500' },
    section: { paddingHorizontal: 24, marginTop: 30 },
    sectionLabel: { fontSize: 12, fontWeight: '800', color: '#999', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 },
    profileItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        marginBottom: 8,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    itemTextContainer: { flex: 1 },
    itemTitle: { fontSize: 16, fontWeight: '700', color: '#333' },
    itemSubtitle: { fontSize: 12, color: '#999', marginTop: 2 },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 20,
        gap: 8,
    },
    logoutText: { fontSize: 16, fontWeight: '800', color: '#F44336' },
    version: { textAlign: 'center', color: '#CCC', fontSize: 12, marginBottom: 40 },
});

export default ProfileScreen;

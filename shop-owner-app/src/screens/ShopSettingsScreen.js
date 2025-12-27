import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Alert,
    Switch,
    TextInput,
    ActivityIndicator,
    Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import * as Location from 'expo-location';
import { useAuth } from '../context/AuthContext';

const SettingItem = ({ icon, title, subtitle, onPress, color = '#333' }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
        <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
            <Ionicons name={icon} size={20} color={color} />
        </View>
        <View style={styles.itemText}>
            <Text style={styles.itemTitle}>{title}</Text>
            {subtitle && <Text style={styles.itemSubtitle}>{subtitle}</Text>}
        </View>
        <Ionicons name="chevron-forward" size={18} color="#CCC" />
    </TouchableOpacity>
);

const ShopSettingsScreen = () => {
    const { user, logout } = useAuth();
    const [notifications, setNotifications] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [profile, setProfile] = React.useState(user);
    const [isEditingProfile, setIsEditingProfile] = React.useState(false);

    React.useEffect(() => {
        if (user?.uid) {
            fetchMerchantProfile();
        }
    }, [user?.uid]);

    const fetchMerchantProfile = async () => {
        try {
            const docRef = doc(db, 'merchants', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProfile({ ...user, ...docSnap.data() });
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleUpdateLocation = async () => {
        setLoading(true);
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Location permission is required to update shop location.');
                setLoading(false);
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            // Get address from coordinates (reverse geocoding)
            const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
            const address = reverseGeocode[0] ?
                `${reverseGeocode[0].name}, ${reverseGeocode[0].city}` :
                'Unknown Location';

            const merchantRef = doc(db, 'merchants', user.uid);
            await updateDoc(merchantRef, {
                location: { latitude, longitude, address }
            });

            setProfile(prev => ({ ...prev, location: { latitude, longitude, address } }));
            Alert.alert('Success', 'Shop location updated to your current position!');
        } catch (error) {
            console.error('Location error:', error);
            Alert.alert('Error', 'Failed to update location');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateHours = () => {
        Alert.alert(
            'Working Hours',
            'Feature for detailed time picker is under development. Do you want to set default 9AM - 10PM?',
            [
                {
                    text: 'Set Default', onPress: async () => {
                        const merchantRef = doc(db, 'merchants', user.uid);
                        await updateDoc(merchantRef, { workingHours: '9:00 AM - 10:00 PM' });
                        setProfile(prev => ({ ...prev, workingHours: '9:00 AM - 10:00 PM' }));
                    }
                },
                { text: 'Cancel', style: 'cancel' }
            ]
        );
    };

    const handleSaveProfile = async (updatedData) => {
        setLoading(true);
        try {
            const merchantRef = doc(db, 'merchants', user.uid);
            await updateDoc(merchantRef, updatedData);
            setProfile(prev => ({ ...prev, ...updatedData }));
            setIsEditingProfile(false);
            Alert.alert('Success', 'Profile updated successfully!');
        } catch (error) {
            Alert.alert('Error', 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Settings</Text>
                    <Text style={styles.headerSubtitle}>Manage your Qareebe Merchant Store</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Business</Text>
                    <View style={styles.card}>
                        <SettingItem
                            icon="storefront-outline"
                            title="Shop Profile"
                            subtitle={profile?.shopName || 'Setup your shop'}
                            color="#E91E63"
                            onPress={() => setIsEditingProfile(true)}
                        />
                        <SettingItem
                            icon="map-outline"
                            title="Business Location"
                            subtitle={profile?.location?.address || 'Set Shop Location'}
                            color="#2196F3"
                            onPress={handleUpdateLocation}
                        />
                        <SettingItem
                            icon="time-outline"
                            title="Working Hours"
                            subtitle={profile?.workingHours || '9:00 AM - 10:00 PM'}
                            color="#FF9800"
                            onPress={handleUpdateHours}
                        />
                    </View>
                </View>

                {/* Profile Edit Modal */}
                <Modal visible={isEditingProfile} animationType="slide" transparent={true}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Edit Shop Profile</Text>
                            <TextInput
                                style={styles.modalInput}
                                placeholder="Shop Name"
                                defaultValue={profile?.shopName}
                                onChangeText={(val) => setProfile(prev => ({ ...prev, shopName: val }))}
                            />
                            <TextInput
                                style={styles.modalInput}
                                placeholder="Owner Name"
                                defaultValue={profile?.name}
                                onChangeText={(val) => setProfile(prev => ({ ...prev, name: val }))}
                            />
                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={styles.cancelBtn}
                                    onPress={() => setIsEditingProfile(false)}
                                >
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.saveBtn}
                                    onPress={() => handleSaveProfile({
                                        shopName: profile.shopName,
                                        name: profile.name
                                    })}
                                >
                                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveBtnText}>Save</Text>}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Preferences</Text>
                    <View style={styles.card}>
                        <View style={styles.item}>
                            <View style={[styles.iconBox, { backgroundColor: '#4CAF5015' }]}>
                                <Ionicons name="notifications-outline" size={20} color="#4CAF50" />
                            </View>
                            <View style={styles.itemText}>
                                <Text style={styles.itemTitle}>Order Notifications</Text>
                            </View>
                            <Switch
                                value={notifications}
                                onValueChange={setNotifications}
                                trackColor={{ false: "#eee", true: "#FCE4EC" }}
                                thumbColor={notifications ? "#E91E63" : "#f4f3f4"}
                            />
                        </View>
                        <SettingItem
                            icon="card-outline"
                            title="Payment Methods"
                            subtitle="EasyPaisa, Bank Transfer"
                            color="#673AB7"
                            onPress={() => handleAction('Payments')}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Support</Text>
                    <View style={styles.card}>
                        <SettingItem
                            icon="help-circle-outline"
                            title="Help Center"
                            color="#607D8B"
                            onPress={() => handleAction('Help')}
                        />
                        <SettingItem
                            icon="shield-checkmark-outline"
                            title="Privacy & Terms"
                            color="#9E9E9E"
                            onPress={() => handleAction('Privacy')}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                    <Ionicons name="log-out-outline" size={20} color="#F44336" />
                    <Text style={styles.logoutText}>Logout as Merchant</Text>
                </TouchableOpacity>

                <Text style={styles.version}>Merchant Core v1.0.0 (Native)</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    scrollContent: { padding: 24, paddingBottom: 100 },
    header: { marginBottom: 30 },
    headerTitle: { fontSize: 28, fontWeight: '900', color: '#333' },
    headerSubtitle: { fontSize: 14, color: '#999', marginTop: 4, fontWeight: '500' },
    section: { marginBottom: 25 },
    sectionLabel: { fontSize: 12, fontWeight: '800', color: '#999', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, marginLeft: 4 },
    card: { backgroundColor: '#fff', borderRadius: 20, borderWidth: 1, borderColor: '#F5F5F5', overflow: 'hidden' },
    item: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F9F9F9' },
    iconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    itemText: { flex: 1 },
    itemTitle: { fontSize: 15, fontWeight: '700', color: '#333' },
    itemSubtitle: { fontSize: 12, color: '#999', marginTop: 2 },
    logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20, gap: 10, marginTop: 10 },
    logoutText: { color: '#F44336', fontWeight: '800', fontSize: 15 },
    version: { textAlign: 'center', color: '#CCC', fontSize: 10, marginTop: 20 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
    modalContent: { backgroundColor: '#fff', borderRadius: 20, padding: 25, gap: 15 },
    modalTitle: { fontSize: 20, fontWeight: '800', color: '#333', marginBottom: 10 },
    modalInput: { height: 50, borderWidth: 1, borderColor: '#EEE', borderRadius: 10, paddingHorizontal: 15 },
    modalButtons: { flexDirection: 'row', gap: 10, marginTop: 10 },
    cancelBtn: { flex: 1, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: '#F5F5F5' },
    saveBtn: { flex: 1, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: '#E91E63' },
    saveBtnText: { color: '#fff', fontWeight: '800' }
});

export default ShopSettingsScreen;

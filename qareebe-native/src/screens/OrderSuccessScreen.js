import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const OrderSuccessScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.content}>
                <View style={styles.successIconContainer}>
                    <View style={styles.outerCircle}>
                        <View style={styles.innerCircle}>
                            <Ionicons name="checkmark" size={60} color="#fff" />
                        </View>
                    </View>
                </View>

                <Text style={styles.title}>Order Placed Successfully!</Text>
                <Text style={styles.subtitle}>
                    Your items are on their way. You can track the progress of your order in the "Orders" section.
                </Text>

                <View style={styles.orderNumberBox}>
                    <Text style={styles.orderLabel}>ORDER NUMBER</Text>
                    <Text style={styles.orderId}>#ORD-QI-{Math.floor(Math.random() * 90000) + 10000}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.trackButton}
                        onPress={() => navigation.navigate('Orders')}
                    >
                        <Text style={styles.trackButtonText}>Track My Order</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.homeButton}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.homeButtonText}>Back to Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
    successIconContainer: { marginBottom: 40 },
    outerCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#FCE4EC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E91E63',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#E91E63',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    title: { fontSize: 26, fontWeight: '900', color: '#333', textAlign: 'center', marginBottom: 16 },
    subtitle: { fontSize: 14, color: '#999', textAlign: 'center', lineHeight: 22, paddingHorizontal: 20, marginBottom: 40 },
    orderNumberBox: {
        backgroundColor: '#F9F9F9',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 50,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    orderLabel: { fontSize: 10, fontWeight: '800', color: '#999', letterSpacing: 1 },
    orderId: { fontSize: 18, fontWeight: '900', color: '#333', marginTop: 4 },
    buttonContainer: { width: '100%', gap: 15 },
    trackButton: {
        backgroundColor: '#E91E63',
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#E91E63',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    trackButtonText: { color: '#fff', fontSize: 16, fontWeight: '800' },
    homeButton: {
        backgroundColor: '#fff',
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EEE',
    },
    homeButtonText: { color: '#666', fontSize: 16, fontWeight: '800' },
});

export default OrderSuccessScreen;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const DetailHeader = ({ title }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}</Text>
            <View style={{ width: 40 }} />
        </View>
    );
};

export const ProductDetailsScreen = () => {
    const route = useRoute();
    const { productId } = route.params || {};
    return (
        <SafeAreaView style={styles.container}>
            <DetailHeader title="Product Details" />
            <View style={styles.content}>
                <Text style={styles.title}>Product ID: {productId}</Text>
                <Text style={styles.subtitle}>Detailed view coming soon...</Text>
            </View>
        </SafeAreaView>
    );
};

export const ShopDetailsScreen = () => {
    const route = useRoute();
    const { shopId } = route.params || {};
    return (
        <SafeAreaView style={styles.container}>
            <DetailHeader title="Shop Details" />
            <View style={styles.content}>
                <Text style={styles.title}>Shop ID: {shopId}</Text>
                <Text style={styles.subtitle}>Full shop catalog coming soon...</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: { fontSize: 16, fontWeight: '800', color: '#333' },
    content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
    title: { fontSize: 22, fontWeight: '900', color: '#333', marginBottom: 10 },
    subtitle: { fontSize: 14, color: '#999', fontWeight: '500' }
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlaceholderScreen = ({ name }) => (
    <View style={styles.container}>
        <Text style={styles.text}>{name} Screen</Text>
        <Text style={styles.subtext}>Coming Soon</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    text: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    subtext: { fontSize: 14, color: '#999', marginTop: 8 }
});

export const HomeScreen = () => <PlaceholderScreen name="Home" />;
export const CartScreen = () => <PlaceholderScreen name="Cart" />;
export const ProfileScreen = () => <PlaceholderScreen name="Profile" />;

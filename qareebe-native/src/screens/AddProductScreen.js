import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Image,
    Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AddProductScreen = () => {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: ''
    });

    const handleSave = () => {
        Alert.alert("Success", "Product added to your inventory!");
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add New Product</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <TouchableOpacity style={styles.imagePicker}>
                    <Ionicons name="camera-outline" size={40} color="#999" />
                    <Text style={styles.imagePickerText}>Upload Image</Text>
                </TouchableOpacity>

                <View style={styles.form}>
                    <Text style={styles.label}>Product Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. Summer Cotton Kurta"
                        value={formData.name}
                        onChangeText={t => setFormData({ ...formData, name: t })}
                    />

                    <Text style={styles.label}>Price (Rs.)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. 2500"
                        keyboardType="numeric"
                        value={formData.price}
                        onChangeText={t => setFormData({ ...formData, price: t })}
                    />

                    <Text style={styles.label}>Category</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. Women, Casual"
                        value={formData.category}
                        onChangeText={t => setFormData({ ...formData, category: t })}
                    />

                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Describe your product..."
                        multiline
                        numberOfLines={4}
                        value={formData.description}
                        onChangeText={t => setFormData({ ...formData, description: t })}
                    />

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save Product</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 },
    backButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 18, fontWeight: '800' },
    content: { padding: 24 },
    imagePicker: {
        height: 180,
        backgroundColor: '#F9F9F9',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#EEE',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    imagePickerText: { fontSize: 13, color: '#999', fontWeight: 'bold', marginTop: 10 },
    form: { gap: 16 },
    label: { fontSize: 14, fontWeight: '700', color: '#333' },
    input: {
        backgroundColor: '#F9F9F9',
        borderRadius: 15,
        padding: 16,
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#eee',
    },
    textArea: { height: 120, textAlignVertical: 'top' },
    saveButton: {
        backgroundColor: '#E91E63',
        height: 55,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '800' }
});

export default AddProductScreen;

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    ScrollView,
    Image,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { productApi } from '../services/api';

const AddProductScreen = ({ navigation }) => {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isScanning, setIsScanning] = useState(false);

    // Form data
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'Women',
        price: '',
        originalPrice: '',
        stock: '',
        sizes: []
    });

    const [image, setImage] = useState(null);

    const CATEGORIES = ['Women', 'Men', 'Kids', 'Accessories', 'Beauty'];
    const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const toggleSize = (size) => {
        setFormData(prev => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size]
        }));
    };

    const handlePickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'We need camera roll permissions to upload product photos.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleTakePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'We need camera permissions to take product photos.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleAIScan = () => {
        setIsScanning(true);
        setTimeout(() => {
            setFormData(prev => ({
                ...prev,
                name: 'Premium Embroidered Kurta',
                description: 'Elegant hand-embroidered cotton kurta with modern cut.',
                category: 'Women',
                price: '3500',
                stock: '50'
            }));
            setImage('https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500&q=80');
            setIsScanning(false);
            Alert.alert('AI Success', 'Product details auto-filled from image!');
        }, 2000);
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.price || !formData.stock) {
            Alert.alert('Missing Info', 'Please fill in all required fields.');
            return;
        }

        if (!image) {
            Alert.alert('Image Required', 'Please add a product image.');
            return;
        }

        setLoading(true);
        try {
            // In a real app, we'd upload the image to Firebase Storage first.
            // For now, we'll store the URI (which might be local) or a placeholder.
            // To ensure it shows in the customer app, we should use a public URL if possible,
            // but for this implementation, we'll save the product doc.

            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
                stock: parseInt(formData.stock),
                image: image,
                shopId: user?.uid || 'unknown',
                shopName: user?.shopName || 'Khyber Wear',
                createdAt: serverTimestamp(),
            };

            await addDoc(collection(db, 'products'), productData);

            setLoading(false);

            // Show alert and navigate on press
            Alert.alert('Success', 'Product published successfully!', [
                {
                    text: 'View Inventory',
                    onPress: () => navigation.navigate('Inventory')
                }
            ]);

            // Backup navigation if user doesn't interact for a few seconds
            setTimeout(() => {
                navigation.navigate('Inventory');
            }, 3000);
        } catch (error) {
            setLoading(false);
            console.error('Error adding product:', error);
            Alert.alert('Error', 'Failed to publish product: ' + error.message);
        }
    };

    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
                    <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add Product</Text>
                <View style={styles.stepIndicator}>
                    <Text style={styles.stepText}>{step}/3</Text>
                </View>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {step === 1 && (
                        <View style={styles.tabContent}>
                            <TouchableOpacity style={styles.aiBanner} onPress={handleAIScan}>
                                <View style={styles.aiIcon}>
                                    <Ionicons name="sparkles" size={24} color="#E91E63" />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.aiTitle}>AI Magic Auto-fill</Text>
                                    <Text style={styles.aiSubtitle}>Upload photo & AI will write details</Text>
                                </View>
                                {isScanning ? <ActivityIndicator color="#E91E63" /> : <Ionicons name="chevron-forward" size={20} color="#CCC" />}
                            </TouchableOpacity>

                            <View style={styles.section}>
                                <Text style={styles.sectionLabel}>Product Name</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. Silk Summer Dress"
                                    value={formData.name}
                                    onChangeText={t => setFormData({ ...formData, name: t })}
                                />
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionLabel}>Description</Text>
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    placeholder="Describe your product..."
                                    multiline
                                    numberOfLines={4}
                                    value={formData.description}
                                    onChangeText={t => setFormData({ ...formData, description: t })}
                                />
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionLabel}>Category</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
                                    {CATEGORIES.map(cat => (
                                        <TouchableOpacity
                                            key={cat}
                                            style={[styles.catChip, formData.category === cat && styles.activeCat]}
                                            onPress={() => setFormData({ ...formData, category: cat })}
                                        >
                                            <Text style={[styles.catText, formData.category === cat && styles.activeCatText]}>{cat}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>
                    )}

                    {step === 2 && (
                        <View style={styles.tabContent}>
                            <View style={styles.priceRow}>
                                <View style={[styles.section, { flex: 1 }]}>
                                    <Text style={styles.sectionLabel}>Price (Rs.)</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="0"
                                        keyboardType="numeric"
                                        value={formData.price}
                                        onChangeText={t => setFormData({ ...formData, price: t })}
                                    />
                                </View>
                                <View style={[styles.section, { flex: 1 }]}>
                                    <Text style={styles.sectionLabel}>Discount Price</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Optional"
                                        keyboardType="numeric"
                                        value={formData.originalPrice}
                                        onChangeText={t => setFormData({ ...formData, originalPrice: t })}
                                    />
                                </View>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionLabel}>Inventory Count (Stock)</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Available quantity"
                                    keyboardType="numeric"
                                    value={formData.stock}
                                    onChangeText={t => setFormData({ ...formData, stock: t })}
                                />
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionLabel}>Select Sizes</Text>
                                <View style={styles.sizeRow}>
                                    {SIZES.map(size => (
                                        <TouchableOpacity
                                            key={size}
                                            style={[styles.sizeBox, formData.sizes.includes(size) && styles.activeSize]}
                                            onPress={() => toggleSize(size)}
                                        >
                                            <Text style={[styles.sizeText, formData.sizes.includes(size) && styles.activeSizeText]}>{size}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </View>
                    )}

                    {step === 3 && (
                        <View style={styles.tabContent}>
                            <Text style={styles.sectionLabel}>Product Image</Text>
                            <TouchableOpacity
                                style={styles.imagePicker}
                                onPress={() => {
                                    Alert.alert(
                                        'Upload Photo',
                                        'Choose a source',
                                        [
                                            { text: 'Camera', onPress: handleTakePhoto },
                                            { text: 'Gallery', onPress: handlePickImage },
                                            { text: 'Cancel', style: 'cancel' }
                                        ]
                                    );
                                }}
                            >
                                {image ? (
                                    <Image source={{ uri: image }} style={styles.previewImage} />
                                ) : (
                                    <View style={styles.pickerContent}>
                                        <Ionicons name="camera-outline" size={40} color="#999" />
                                        <Text style={styles.pickerText}>Take photo or upload</Text>
                                    </View>
                                )}
                            </TouchableOpacity>

                            <View style={styles.aiModelCard}>
                                <View style={styles.aiModelIcon}>
                                    <Ionicons name="body-outline" size={24} color="#E91E63" />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.aiModelTitle}>AI Model Look</Text>
                                    <Text style={styles.aiModelSubtitle}>Generate professional model shoot</Text>
                                </View>
                                <TouchableOpacity style={styles.genBtn}>
                                    <Text style={styles.genBtnText}>Generate</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 24) }]}>
                {step > 1 && (
                    <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
                        <Text style={styles.backBtnText}>Back</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={[styles.nextBtn, { flex: step === 1 ? 1 : 2 }]}
                    onPress={step === 3 ? handleSubmit : handleNext}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.nextBtnText}>{step === 3 ? 'Publish Product' : 'Next Step'}</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 },
    closeBtn: { width: 44, height: 44, borderRadius: 15, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 18, fontWeight: '800', color: '#333' },
    stepIndicator: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, backgroundColor: '#FCE4EC' },
    stepText: { fontSize: 12, fontWeight: '800', color: '#E91E63' },
    scrollContent: { padding: 24, paddingBottom: 120 },
    tabContent: { gap: 24 },
    aiBanner: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#FCE4EC50', borderRadius: 20, borderWIdth: 1, borderColor: '#FCE4EC', gap: 15, borderWidth: 1 },
    aiIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
    aiTitle: { fontSize: 16, fontWeight: '800', color: '#333' },
    aiSubtitle: { fontSize: 12, color: '#666', marginTop: 2 },
    section: { gap: 10 },
    sectionLabel: { fontSize: 14, fontWeight: '800', color: '#999', textTransform: 'uppercase', letterSpacing: 0.5 },
    input: { height: 60, backgroundColor: '#F9F9F9', borderRadius: 15, paddingHorizontal: 20, fontSize: 16, fontWeight: '600', color: '#333', borderWidth: 1, borderColor: '#EEE' },
    textArea: { height: 120, paddingTop: 15, textAlignVertical: 'top' },
    catScroll: { marginHorizontal: -24, paddingHorizontal: 24 },
    catChip: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, backgroundColor: '#F5F5F5', marginRight: 10 },
    activeCat: { backgroundColor: '#333' },
    catText: { fontSize: 14, fontWeight: '700', color: '#666' },
    activeCatText: { color: '#fff' },
    priceRow: { flexDirection: 'row', gap: 15 },
    sizeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    sizeBox: { width: 55, height: 55, borderRadius: 15, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#EEE' },
    activeSize: { backgroundColor: '#333', borderColor: '#333' },
    sizeText: { fontSize: 14, fontWeight: '800', color: '#666' },
    activeSizeText: { color: '#fff' },
    imagePicker: { width: '100%', aspectRatio: 1, borderRadius: 25, backgroundColor: '#F9F9F9', borderStyle: 'dashed', borderWidth: 2, borderColor: '#DDD', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
    previewImage: { width: '100%', height: '100%' },
    pickerContent: { alignItems: 'center', gap: 10 },
    pickerText: { fontSize: 14, fontWeight: '600', color: '#999' },
    aiModelCard: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#FAFAFA', borderRadius: 20, marginTop: 20, gap: 12, borderWidth: 1, borderColor: '#EEE' },
    aiModelIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
    aiModelTitle: { fontSize: 14, fontWeight: '800', color: '#333' },
    aiModelSubtitle: { fontSize: 11, color: '#999', marginTop: 1 },
    genBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, backgroundColor: '#E91E63' },
    genBtnText: { fontSize: 10, fontWeight: '800', color: '#fff' },
    footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#F5F5F5', flexDirection: 'row', gap: 12 },
    backBtn: { flex: 1, height: 60, borderRadius: 15, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },
    backBtnText: { fontSize: 16, fontWeight: '700', color: '#666' },
    nextBtn: { height: 60, borderRadius: 15, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center' },
    nextBtnText: { fontSize: 16, fontWeight: '800', color: '#fff' }
});

export default AddProductScreen;

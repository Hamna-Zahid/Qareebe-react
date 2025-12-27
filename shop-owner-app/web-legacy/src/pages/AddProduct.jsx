import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Check, X, Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import api from '../services/api';
import AIService from '../services/aiService';

const AddProduct = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [previewImages, setPreviewImages] = useState([]);
    const [fileImages, setFileImages] = useState([]); // Store actual File objects
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [isScanning, setIsScanning] = useState(false);

    // AI Simulation Handler
    const handleAIAutoFill = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // 1. Show scanning UI
        setIsScanning(true);
        const url = URL.createObjectURL(file);

        try {
            // 2. Call AI Service
            const aiData = await AIService.analyzeProductImage(file);

            // 3. Populate Data
            setFormData(prev => ({
                ...prev,
                ...aiData
            }));

            // 4. Set Image
            setPreviewImages([url]);
            setFileImages([file]);

            alert("✨ AI Magic: Product details auto-filled!");
        } catch (error) {
            console.error("AI Error:", error);
            alert("Failed to analyze image.");
        } finally {
            setIsScanning(false);
        }
    };

    // Form States
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        originalPrice: '',
        description: '',
        category: 'Women',
        sizes: [],
        stock: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Your session has expired. Please login again.');
            navigate('/login');
        }
    }, [navigate]);

    const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
    const CATEGORIES = ['Women', 'Men', 'Kids', 'Accessories', 'Beauty'];
    const [isGeneratingModel, setIsGeneratingModel] = useState(false);

    const handleGenerateModelLook = async () => {
        if (fileImages.length === 0) return;
        setIsGeneratingModel(true);

        try {
            // Use the first file (actual File object)
            await AIService.generateModelLook(fileImages[0]);

            alert("✨ AI Model Generated! (Mock: Feature would display new image here)");

        } catch (error) {
            alert("Failed to generate model.");
        } finally {
            setIsGeneratingModel(false);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create local URL for preview
            const url = URL.createObjectURL(file);
            setPreviewImages([...previewImages, url]);
            setFileImages([...fileImages, file]);
        }
    };

    const removeImage = (idx) => {
        setPreviewImages(previewImages.filter((_, i) => i !== idx));
        setFileImages(fileImages.filter((_, i) => i !== idx));
    };

    const toggleSize = (size) => {
        setFormData(prev => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (fileImages.length === 0) {
            alert('Please add at least one image');
            return;
        }

        setIsSubmitting(true);

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('price', formData.price);
            data.append('originalPrice', formData.originalPrice);
            data.append('description', formData.description);
            data.append('category', formData.category);
            data.append('stock', formData.stock);
            // Append sizes as array (or handled by backend logic to parse if needed, but array append works standard)
            // Backend logic handles string parsing if sent as string, or multiple fields. 
            // We'll append each size individually which results in arrays in multer/express usually, OR json stringify it.
            // My backend logic handles "if typeof sizes === 'string' -> JSON.parse".
            // So safely:
            data.append('sizes', JSON.stringify(formData.sizes));

            // Append image (Backend expects single 'image' field for now in current implementation)
            // TODO: Update backend to support multiple files if needed. For now, take first.
            data.append('image', fileImages[0]);

            await api.shopOwner.createProduct(data);
            alert('Product Created Successfully!');
            navigate('/products');
        } catch (error) {
            console.error(error);
            alert(error.message || 'Failed to create product');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="absolute inset-0 bg-white z-[50] flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">Add New Product</h1>
                </div>
                <div className="text-sm font-medium text-purple-600">
                    Step {step} of 3
                </div>
            </div>

            {/* Step Content */}
            <div className="flex-1 overflow-y-auto p-5">
                {step === 1 && (
                    <div className="space-y-6 animate-in slide-in-from-right duration-300">
                        {/* AI Magic Section */}
                        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-2xl border border-purple-100">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm text-purple-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z" /></svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 mb-1">Magic Auto-fill</h3>
                                    <p className="text-sm text-gray-500 mb-3">Upload a photo and let AI write the details for you!</p>

                                    {isScanning ? (
                                        <div className="flex items-center gap-2 text-purple-600 font-medium py-2 px-4 bg-white rounded-lg border border-purple-100 shadow-sm w-fit">
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-600 border-t-transparent"></div>
                                            Analyzing Image...
                                        </div>
                                    ) : (
                                        <label className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-purple-700 transition-colors cursor-pointer shadow-sm shadow-purple-200">
                                            <Upload size={16} />
                                            Upload Photo to Auto-fill
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleAIAutoFill}
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-900 mb-1">Basic Details</h2>
                            <p className="text-sm text-gray-500 mb-6">Let's start with the basics</p>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">Product Name</label>
                                    <Input
                                        placeholder="e.g. Embroidered Lawn Suit"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">Description</label>
                                    <textarea
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
                                        placeholder="Describe fabric, color, style..."
                                        required
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">Category</label>
                                    <select
                                        className="w-full p-3 rounded-xl border border-gray-200 bg-white"
                                        required
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="">Select Category</option>
                                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-in slide-in-from-right duration-300">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 mb-1">Pricing & Stock</h2>
                            <p className="text-sm text-gray-500 mb-6">Set your price and inventory</p>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 block mb-1">Price (PKR)</label>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            value={formData.price}
                                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 block mb-1">Old Price (Optional)</label>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            value={formData.originalPrice}
                                            onChange={e => setFormData({ ...formData, originalPrice: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">Available Stock</label>
                                    <Input
                                        type="number"
                                        placeholder="Quantity available"
                                        value={formData.stock}
                                        onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-2">Sizes (Tap to select)</label>
                                    <div className="flex flex-wrap gap-2">
                                        {SIZES.map(size => (
                                            <button
                                                key={size}
                                                onClick={() => toggleSize(size)}
                                                className={`w-12 h-12 rounded-xl border-2 font-medium transition-all ${formData.sizes.includes(size)
                                                    ? 'border-purple-600 bg-purple-50 text-purple-700'
                                                    : 'border-gray-200 text-gray-600'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6 animate-in slide-in-from-right duration-300">
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 mb-1">Product Images</h2>
                                    <p className="text-sm text-gray-500">Add 1 main photo (Front View)</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                {previewImages.map((img, idx) => (
                                    <div key={idx} className="aspect-square rounded-xl bg-gray-100 relative group overflow-hidden border border-gray-100">
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => removeImage(idx)}
                                            className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                                {previewImages.length < 1 && (
                                    <label className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-purple-500 hover:text-purple-500 bg-gray-50 cursor-pointer hover:bg-purple-50 transition-colors">
                                        <Upload size={24} className="mb-2" />
                                        <span className="text-xs font-medium">Add Photo</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* AI Model Generator Section */}
                        {previewImages.length > 0 && (
                            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-5 rounded-2xl border border-pink-100 mt-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white rounded-xl shadow-sm text-pink-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wand-2"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z" /><path d="m14 7 3 3" /><path d="M5 6v4" /><path d="M19 14v4" /><path d="M10 2v2" /><path d="M7 8H3" /><path d="M21 16h-4" /><path d="M11 3H9" /></svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 mb-1">AI Fashion Model</h3>
                                        <p className="text-sm text-gray-600 mb-4">Turn your flat photo into a professional model shoot instantly.</p>

                                        <div className="flex gap-2">
                                            {isGeneratingModel ? (
                                                <div className="flex items-center gap-2 text-pink-600 font-medium py-2 px-4 bg-white rounded-lg border border-pink-100 shadow-sm w-full justify-center">
                                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-pink-600 border-t-transparent"></div>
                                                    Generating Look...
                                                </div>
                                            ) : (
                                                <Button
                                                    onClick={handleGenerateModelLook}
                                                    type="button"
                                                    className="w-full bg-white text-pink-600 border border-pink-200 hover:bg-pink-50 hover:border-pink-300 shadow-sm"
                                                >
                                                    ✨ Generate Model Look
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex gap-3">
                    {step > 1 && (
                        <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1" disabled={isSubmitting}>
                            Back
                        </Button>
                    )}
                    <Button
                        onClick={step === 3 ? handleSubmit : () => setStep(step + 1)}
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Publishing...' : step === 3 ? 'Publish Product' : 'Next'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;

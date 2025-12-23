import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { ArrowLeft, Check, Tag, Truck, Clock } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';

const ShopOnboarding3_Details = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        description: '',
        categories: [],
        tags: [],
        deliveryTime: '30-45 min',
        deliveryFee: 150
    });

    const CATEGORIES = ['Women', 'Men', 'Kids', 'Accessories'];
    const TAGS = ['Premium', 'Budget-Friendly', 'Fast Fashion', 'Sustainable', 'Luxury', 'Casual'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleCategory = (category) => {
        setFormData(prev => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...prev.categories, category]
        }));
    };

    const toggleTag = (tag) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.includes(tag)
                ? prev.tags.filter(t => t !== tag)
                : [...prev.tags, tag]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Combine all onboarding data
            const existingData = JSON.parse(localStorage.getItem('shopOnboarding') || '{}');
            const completeData = { ...existingData, ...formData };

            // Create shop via API
            const shopData = {
                name: completeData.shopName,
                ownerId: user.id,
                location: `${completeData.area}, ${completeData.city}`,
                address: completeData.address,
                rating: 4.5,
                deliveryTime: completeData.deliveryTime,
                tags: completeData.tags,
                image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070',
                businessInfo: {
                    businessType: completeData.businessType,
                    registrationNumber: completeData.registrationNumber,
                    yearEstablished: completeData.yearEstablished
                },
                contact: {
                    phone: completeData.contactPhone,
                    whatsapp: completeData.whatsapp || completeData.contactPhone
                },
                description: completeData.description,
                categories: completeData.categories,
                deliveryFee: completeData.deliveryFee
            };

            // TODO: Call API to create shop
            // await api.shopOwner.createShop(shopData);

            // For now, save to localStorage
            localStorage.setItem('shopData', JSON.stringify(shopData));
            localStorage.removeItem('shopOnboarding');

            // Navigate to dashboard
            navigate('/shop-owner/dashboard');
        } catch (error) {
            console.error('Shop creation failed:', error);
            alert('Failed to create shop. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        navigate('/shop-owner/onboarding/location');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
            <div className="max-w-2xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Step 3 of 4</span>
                        <span className="text-sm text-gray-500">Shop Details</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full transition-all" style={{ width: '75%' }}></div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            <Tag className="text-purple-600" size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Shop Details</h1>
                            <p className="text-sm text-gray-500">What makes your shop unique?</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Shop Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="description"
                                placeholder="Tell customers about your shop, products, and what makes you special..."
                                required
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Categories <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {CATEGORIES.map(category => (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => toggleCategory(category)}
                                        className={`p-3 rounded-xl border-2 transition-all ${formData.categories.includes(category)
                                            ? 'border-purple-600 bg-purple-50 text-purple-700'
                                            : 'border-gray-200 hover:border-purple-300'
                                            }`}
                                    >
                                        {formData.categories.includes(category) && (
                                            <Check size={16} className="inline mr-1" />
                                        )}
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tags (Select up to 3)
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {TAGS.map(tag => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => toggleTag(tag)}
                                        disabled={!formData.tags.includes(tag) && formData.tags.length >= 3}
                                        className={`p-2 text-sm rounded-lg border transition-all ${formData.tags.includes(tag)
                                            ? 'border-purple-600 bg-purple-50 text-purple-700'
                                            : 'border-gray-200 hover:border-purple-300 disabled:opacity-50'
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Clock size={16} className="inline mr-1" />
                                    Delivery Time
                                </label>
                                <select
                                    name="deliveryTime"
                                    value={formData.deliveryTime}
                                    onChange={handleChange}
                                    className="w-full h-12 px-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="15-25 min">15-25 min</option>
                                    <option value="25-35 min">25-35 min</option>
                                    <option value="30-45 min">30-45 min</option>
                                    <option value="45-60 min">45-60 min</option>
                                    <option value="1-2 hours">1-2 hours</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Truck size={16} className="inline mr-1" />
                                    Delivery Fee (PKR)
                                </label>
                                <Input
                                    name="deliveryFee"
                                    type="number"
                                    min="0"
                                    value={formData.deliveryFee}
                                    onChange={handleChange}
                                    className="h-12"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleBack}
                                className="flex-1"
                            >
                                <ArrowLeft size={18} className="mr-2" />
                                Back
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1 bg-purple-600 hover:bg-purple-700"
                                isLoading={isLoading}
                            >
                                <Check size={18} className="mr-2" />
                                Complete Setup
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ShopOnboarding3_Details;

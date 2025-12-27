import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { ArrowLeft, ArrowRight, Store, FileText } from 'lucide-react';

const ShopOnboarding1_Business = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        shopName: '',
        businessType: 'boutique',
        registrationNumber: '',
        yearEstablished: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = (e) => {
        e.preventDefault();
        // Save to localStorage temporarily
        localStorage.setItem('shopOnboarding', JSON.stringify({ ...JSON.parse(localStorage.getItem('shopOnboarding') || '{}'), ...formData }));
        navigate('/shop-owner/onboarding/location');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
            <div className="max-w-2xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Step 1 of 4</span>
                        <span className="text-sm text-gray-500">Business Information</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            <Store className="text-purple-600" size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Business Information</h1>
                            <p className="text-sm text-gray-500">Tell us about your shop</p>
                        </div>
                    </div>

                    <form onSubmit={handleNext} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Shop Name <span className="text-red-500">*</span>
                            </label>
                            <Input
                                name="shopName"
                                placeholder="e.g., Zara's Boutique"
                                required
                                value={formData.shopName}
                                onChange={handleChange}
                                className="h-12"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Business Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="businessType"
                                value={formData.businessType}
                                onChange={handleChange}
                                className="w-full h-12 px-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            >
                                <option value="boutique">Boutique</option>
                                <option value="retail">Retail Store</option>
                                <option value="wholesale">Wholesale</option>
                                <option value="online">Online Only</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Business Registration Number (Optional)
                            </label>
                            <Input
                                icon={FileText}
                                name="registrationNumber"
                                placeholder="e.g., 12345-ABC"
                                value={formData.registrationNumber}
                                onChange={handleChange}
                                className="h-12"
                            />
                            <p className="text-xs text-gray-500 mt-1">If you have a registered business</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Year Established (Optional)
                            </label>
                            <Input
                                name="yearEstablished"
                                type="number"
                                placeholder="e.g., 2020"
                                min="1900"
                                max={new Date().getFullYear()}
                                value={formData.yearEstablished}
                                onChange={handleChange}
                                className="h-12"
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/login')}
                                className="flex-1"
                            >
                                <ArrowLeft size={18} className="mr-2" />
                                Back
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1 bg-purple-600 hover:bg-purple-700"
                            >
                                Next
                                <ArrowRight size={18} className="ml-2" />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ShopOnboarding1_Business;

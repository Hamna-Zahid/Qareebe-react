import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ArrowLeft, ArrowRight, Store, FileText } from 'lucide-react';

const ShopOnboarding1_Business = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        shopName: '',
        businessType: 'Boutique',
        registrationNumber: '',
        yearEstablished: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = (e) => {
        e.preventDefault();
        // Save to temporary state/local storage
        const existingData = JSON.parse(localStorage.getItem('shopOnboarding') || '{}');
        localStorage.setItem('shopOnboarding', JSON.stringify({ ...existingData, ...formData }));
        navigate('/onboarding/location');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
            <div className="max-w-2xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Step 1 of 3</span>
                        <span className="text-sm text-gray-500">Business Information</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full transition-all" style={{ width: '33%' }}></div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            <Store className="text-purple-600" size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Tell us about your shop</h1>
                            <p className="text-sm text-gray-500">This info will be displayed to customers</p>
                        </div>
                    </div>

                    <form onSubmit={handleNext} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Shop Name <span className="text-red-500">*</span></label>
                            <Input
                                name="shopName"
                                placeholder="e.g. Zara's Boutique"
                                required
                                value={formData.shopName}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['Boutique', 'Retail Store', 'Wholesale'].map(type => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, businessType: type })}
                                        className={`p-3 text-sm rounded-xl border-2 transition-all ${formData.businessType === type
                                                ? 'border-purple-600 bg-purple-50 text-purple-700 font-medium'
                                                : 'border-gray-200 hover:border-purple-200 text-gray-600'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Registration No. (Optional)
                                </label>
                                <Input
                                    icon={FileText}
                                    name="registrationNumber"
                                    placeholder="NTN or Reg #"
                                    value={formData.registrationNumber}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Year Established
                                </label>
                                <Input
                                    type="number"
                                    name="yearEstablished"
                                    placeholder="2024"
                                    value={formData.yearEstablished}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" className="w-32 bg-purple-600 hover:bg-purple-700">
                                Next <ArrowRight size={18} className="ml-2" />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ShopOnboarding1_Business;

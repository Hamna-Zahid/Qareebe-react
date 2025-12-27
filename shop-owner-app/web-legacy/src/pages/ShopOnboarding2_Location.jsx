import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ArrowLeft, ArrowRight, MapPin, Phone, Clock } from 'lucide-react';

const ShopOnboarding2_Location = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        address: '',
        city: 'Lahore',
        area: '',
        contactPhone: '',
        whatsapp: '',
        openTime: '09:00',
        closeTime: '21:00'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = (e) => {
        e.preventDefault();
        const existingData = JSON.parse(localStorage.getItem('shopOnboarding') || '{}');
        localStorage.setItem('shopOnboarding', JSON.stringify({ ...existingData, ...formData }));
        navigate('/onboarding/details');
    };

    const handleBack = () => {
        navigate('/onboarding/business');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
            <div className="max-w-2xl mx-auto">
                {/* Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Step 2 of 3</span>
                        <span className="text-sm text-gray-500">Location & Contact</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full transition-all" style={{ width: '66%' }}></div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            <MapPin className="text-purple-600" size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Where are you located?</h1>
                            <p className="text-sm text-gray-500">Help customers find you easily</p>
                        </div>
                    </div>

                    <form onSubmit={handleNext} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Address <span className="text-red-500">*</span></label>
                            <Input
                                name="address"
                                placeholder="Shop #, Plaza, Main Market..."
                                required
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full h-12 px-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="Lahore">Lahore</option>
                                    <option value="Karachi">Karachi</option>
                                    <option value="Islamabad">Islamabad</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Area/Town <span className="text-red-500">*</span></label>
                                <Input
                                    name="area"
                                    placeholder="e.g. DHA Phase 5"
                                    required
                                    value={formData.area}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Phone size={16} className="inline mr-1" />
                                    Contact Phone
                                </label>
                                <Input
                                    name="contactPhone"
                                    placeholder="042-1234567"
                                    required
                                    value={formData.contactPhone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    WhatsApp (Optional)
                                </label>
                                <Input
                                    name="whatsapp"
                                    placeholder="+92 3..."
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Clock size={16} className="inline mr-1" />
                                Operating Hours
                            </label>
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <Input
                                        type="time"
                                        name="openTime"
                                        value={formData.openTime}
                                        onChange={handleChange}
                                    />
                                    <span className="text-xs text-gray-500 mt-1 block text-center">Open</span>
                                </div>
                                <span className="text-gray-400">to</span>
                                <div className="flex-1">
                                    <Input
                                        type="time"
                                        name="closeTime"
                                        value={formData.closeTime}
                                        onChange={handleChange}
                                    />
                                    <span className="text-xs text-gray-500 mt-1 block text-center">Close</span>
                                </div>
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
                            >
                                Next <ArrowRight size={18} className="ml-2" />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ShopOnboarding2_Location;

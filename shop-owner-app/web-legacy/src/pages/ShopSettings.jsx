import React, { useState } from 'react';
import {
    User,
    Store,
    Truck,
    CreditCard,
    Bell,
    Shield,
    HelpCircle,
    ChevronRight,
    LogOut,
    X,
    Save,
    Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const ShopSettings = () => {
    const { user, shop, fetchShop, logout } = useAuth();
    const navigate = useNavigate();
    const [activeModal, setActiveModal] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    // Form States
    const [profileForm, setProfileForm] = useState({
        name: shop?.name || '',
        description: shop?.description || '',
        location: shop?.location || ''
    });

    const [deliveryForm, setDeliveryForm] = useState({
        deliveryFee: shop?.deliveryFee || 0,
        deliveryTime: shop?.deliveryTime || '30-45 min'
    });

    const handleLogout = () => {
        logout();
        navigate('/signup');
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await api.shopOwner.updateShop(profileForm);
            await fetchShop();
            setActiveModal(null);
            alert('Profile updated successfully!');
        } catch (error) {
            alert('Failed to update profile');
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveDelivery = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await api.shopOwner.updateShop(deliveryForm);
            await fetchShop();
            setActiveModal(null);
            alert('Delivery settings updated!');
        } catch (error) {
            alert('Failed to update delivery settings');
        } finally {
            setIsSaving(false);
        }
    };

    const settingSections = [
        {
            title: 'Business',
            items: [
                { id: 'profile', icon: Store, label: 'Shop Profile', desc: shop?.name || 'Name, Logo, Description' },
                { id: 'delivery', icon: Truck, label: 'Delivery Settings', desc: `${shop?.deliveryFee} PKR, ${shop?.deliveryTime}` },
                { id: 'payment', icon: CreditCard, label: 'Payment Methods', desc: 'Bank Accounts, EasyPaisa' },
            ]
        },
        {
            title: 'App Settings',
            items: [
                { id: 'notifications', icon: Bell, label: 'Notifications', desc: 'Order alerts, Updates' },
                { id: 'account', icon: User, label: 'Account', desc: user?.email || 'Phone, Email, Password' },
            ]
        },
        {
            title: 'Support',
            items: [
                { id: 'help', icon: HelpCircle, label: 'Help Center', desc: 'FAQs, Contact Support' },
                { id: 'privacy', icon: Shield, label: 'Privacy & Terms', desc: 'Legal Information' },
            ]
        }
    ];

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-sm text-gray-500">Manage your shop preferences</p>
            </div>

            {settingSections.map((section, idx) => (
                <div key={idx} className="space-y-3">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-1">{section.title}</h2>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
                        {section.items.map((item, itemIdx) => (
                            <button
                                key={itemIdx}
                                onClick={() => setActiveModal(item.id)}
                                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-sm">{item.label}</h3>
                                        <p className="text-xs text-gray-500">{item.desc}</p>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-gray-300" />
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            <button
                onClick={handleLogout}
                className="w-full bg-red-50 text-red-600 font-semibold p-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
            >
                <LogOut size={20} />
                Sign Out
            </button>

            {/* Modals */}
            {activeModal === 'profile' && (
                <div className="fixed inset-0 bg-black/50 z-[60] flex items-end sm:items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 animate-in slide-in-from-bottom duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Shop Profile</h2>
                            <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSaveProfile} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block">Shop Name</label>
                                <Input
                                    value={profileForm.name}
                                    onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">Description</label>
                                <textarea
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
                                    value={profileForm.description}
                                    onChange={e => setProfileForm({ ...profileForm, description: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">Location</label>
                                <Input
                                    value={profileForm.location}
                                    onChange={e => setProfileForm({ ...profileForm, location: e.target.value })}
                                />
                            </div>
                            <Button type="submit" className="w-full bg-purple-600" isLoading={isSaving}>
                                Save Changes
                            </Button>
                        </form>
                    </div>
                </div>
            )}

            {activeModal === 'delivery' && (
                <div className="fixed inset-0 bg-black/50 z-[60] flex items-end sm:items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 animate-in slide-in-from-bottom duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Delivery Settings</h2>
                            <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSaveDelivery} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block">Delivery Fee (PKR)</label>
                                <Input
                                    type="number"
                                    value={deliveryForm.deliveryFee}
                                    onChange={e => setDeliveryForm({ ...deliveryForm, deliveryFee: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">Delivery Time</label>
                                <select
                                    className="w-full p-3 rounded-xl border border-gray-200 bg-white"
                                    value={deliveryForm.deliveryTime}
                                    onChange={e => setDeliveryForm({ ...deliveryForm, deliveryTime: e.target.value })}
                                >
                                    <option value="15-25 min">15-25 min</option>
                                    <option value="30-45 min">30-45 min</option>
                                    <option value="45-60 min">45-60 min</option>
                                </select>
                            </div>
                            <Button type="submit" className="w-full bg-purple-600" isLoading={isSaving}>
                                Save Settings
                            </Button>
                        </form>
                    </div>
                </div>
            )}

            {activeModal === 'payment' && (
                <div className="fixed inset-0 bg-black/50 z-[60] flex items-end sm:items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 animate-in slide-in-from-bottom duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Payment Methods</h2>
                            <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 border border-purple-100 bg-purple-50 rounded-2xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-purple-600 shadow-sm">
                                        <CreditCard size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">EasyPaisa / JazzCash</p>
                                        <p className="text-xs text-gray-500">{user?.phone || 'Not linked'}</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-purple-600 bg-white px-2 py-1 rounded-lg shadow-sm">Active</span>
                            </div>

                            <div className="p-4 border border-gray-100 rounded-2xl flex items-center justify-between opacity-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                                        <Store size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">Bank Transfer</p>
                                        <p className="text-xs text-gray-500">Connect your bank account</p>
                                    </div>
                                </div>
                                <Plus size={18} className="text-gray-400" />
                            </div>

                            <Button onClick={() => alert('Feature coming soon!')} className="w-full bg-gray-900 border-none">
                                Add Payment Method
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {activeModal === 'account' && (
                <div className="fixed inset-0 bg-black/50 z-[60] flex items-end sm:items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 animate-in slide-in-from-bottom duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Account Settings</h2>
                            <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block text-gray-500">Owner Name</label>
                                <Input value={user?.name} disabled />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block text-gray-500">Phone Number</label>
                                <Input value={user?.phone} disabled />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block text-gray-500">Email Address</label>
                                <Input value={user?.email} disabled />
                            </div>
                            <p className="text-[10px] text-gray-400 italic">To change your account details, please contact system administrator.</p>
                            <Button onClick={() => setActiveModal(null)} className="w-full bg-purple-600">
                                Done
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <p className="text-center text-xs text-gray-400 pt-4">App Version 1.0.0 (Build 2024.12)</p>
        </div>
    );
};

export default ShopSettings;

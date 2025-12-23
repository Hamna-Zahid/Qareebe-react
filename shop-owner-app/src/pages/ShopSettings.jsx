import React from 'react';
import {
    User,
    Store,
    Truck,
    CreditCard,
    Bell,
    Shield,
    HelpCircle,
    ChevronRight,
    LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ShopSettings = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/signup');
    };

    const settingSections = [
        {
            title: 'Business',
            items: [
                { icon: Store, label: 'Shop Profile', desc: 'Name, Logo, Description' },
                { icon: Truck, label: 'Delivery Settings', desc: 'Fees, Areas, Timings' },
                { icon: CreditCard, label: 'Payment Methods', desc: 'Bank Accounts, EasyPaisa' },
            ]
        },
        {
            title: 'App Settings',
            items: [
                { icon: Bell, label: 'Notifications', desc: 'Order alerts, Updates' },
                { icon: User, label: 'Account', desc: 'Phone, Email, Password' },
            ]
        },
        {
            title: 'Support',
            items: [
                { icon: HelpCircle, label: 'Help Center', desc: 'FAQs, Contact Support' },
                { icon: Shield, label: 'Privacy & Terms', desc: 'Legal Information' },
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
                            <button key={itemIdx} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left group">
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

            <p className="text-center text-xs text-gray-400 pt-4">App Version 1.0.0 (Build 2024.12)</p>
        </div>
    );
};

export default ShopSettings;

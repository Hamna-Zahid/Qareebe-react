import React, { useState } from 'react';
import { ArrowLeft, Bell, Mail, Lock, CheckCircle, ChevronRight, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SettingToggle = ({ icon: Icon, label, description, checked, onChange }) => (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-50 last:border-0">
        <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                <Icon size={16} />
            </div>
            <div>
                <div className="font-semibold text-gray-800 text-sm">{label}</div>
                {description && <div className="text-xs text-gray-400">{description}</div>}
            </div>
        </div>
        <div
            onClick={() => onChange(!checked)}
            className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${checked ? 'bg-brand-pink' : 'bg-gray-200'}`}
        >
            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
        </div>
    </div>
);

const SettingLink = ({ icon: Icon, label }) => (
    <button className="w-full flex items-center justify-between p-4 bg-white border-b border-gray-50 last:border-0 active:bg-gray-50">
        <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                <Icon size={16} />
            </div>
            <div className="font-semibold text-gray-800 text-sm">{label}</div>
        </div>
        <ChevronRight size={16} className="text-gray-300" />
    </button>
);

const Settings = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState(true);
    const [emails, setEmails] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white px-6 py-6 sticky top-0 z-40 shadow-sm flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="text-gray-800">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold">Settings</h1>
            </div>

            <div className="p-6 space-y-6">
                <div>
                    <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Preferences</h3>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <SettingToggle
                            icon={Bell}
                            label="Push Notifications"
                            description="Order updates and promotions"
                            checked={notifications}
                            onChange={setNotifications}
                        />
                        <SettingToggle
                            icon={Mail}
                            label="Email Updates"
                            description="Newsletters and daily digest"
                            checked={emails}
                            onChange={setEmails}
                        />
                    </div>
                </div>

                <div>
                    <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Security</h3>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <SettingLink icon={Lock} label="Change Password" />
                        <SettingLink icon={CheckCircle} label="Two-Factor Authentication" />
                    </div>
                </div>

                <div>
                    <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">About</h3>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <SettingLink icon={Github} label="App Version 1.0.0" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;

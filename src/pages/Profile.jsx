import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Package, Settings, LogOut, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const ProfileOption = ({ icon: Icon, label, value, to }) => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => to && navigate(to)}
            className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm mb-3 active:scale-98 transition-transform"
        >
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-light rounded-full flex items-center justify-center text-brand-pink">
                    <Icon size={20} />
                </div>
                <div className="text-left">
                    <div className="font-semibold text-gray-800">{label}</div>
                    {value && <div className="text-xs text-gray-400">{value}</div>}
                </div>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
        </button>
    );
};

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return (
            <div className="p-6 pb-24 min-h-screen flex flex-col justify-center items-center text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <User size={40} className="text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Not Signed In</h2>
                <p className="text-gray-500 mb-8">Sign in to view your profile and orders.</p>
                <Button onClick={() => navigate('/login')} className="w-full max-w-xs mb-3">Sign In</Button>
                <Button onClick={() => navigate('/signup')} variant="outline" className="w-full max-w-xs">Create Account</Button>
            </div>
        );
    }

    return (
        <div className="p-6 pb-24">
            <h1 className="text-2xl font-bold mb-6">Profile</h1>

            <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden border-4 border-white shadow-md">
                    <img src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80"} alt="User" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                    <p className="text-gray-500 text-sm">{user.email || user.phone}</p>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Account</h3>
                <ProfileOption icon={Package} label="My Orders" value="2 active orders" to="/orders" />
                <ProfileOption icon={MapPin} label="Delivery Addresses" value="Home, Office" to="/addresses" />
                <ProfileOption icon={Settings} label="Settings" to="/settings" />
            </div>

            <Button onClick={logout} variant="outline" className="w-full border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-red-500">
                <LogOut size={18} className="mr-2" />
                Log Out
            </Button>
        </div>
    );
};

export default Profile;

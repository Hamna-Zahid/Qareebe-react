import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { User, Phone, Mail, Lock, Store } from 'lucide-react';

const ShopOwnerSignup = () => {
    const navigate = useNavigate();
    const { signup, mockLogin } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        role: 'shop_owner'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await signup(formData);
            navigate('/onboarding/business');
        } catch (err) {
            console.error("Signup failed", err);
            setError(err.message || 'Signup failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full bg-white rounded-2xl shadow-xl p-8">
                <div className="mb-8 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-xl mx-auto flex items-center justify-center text-3xl mb-4">
                        <Store className="text-purple-600" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Start Selling on Qareebe</h1>
                    <p className="text-gray-500 text-sm">Join thousands of shop owners</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                        <Input
                            icon={User}
                            name="name"
                            placeholder="John Doe"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                        <Input
                            icon={Phone}
                            name="phone"
                            type="tel"
                            placeholder="+92 300 0000000"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                        <Input
                            icon={Mail}
                            name="email"
                            type="email"
                            placeholder="shop@example.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                        <Input
                            icon={Lock}
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <Button type="submit" className="w-full h-12 text-sm font-semibold mt-4 bg-purple-600 hover:bg-purple-700" isLoading={isLoading}>
                        Create Shop Owner Account
                    </Button>

                </form>

                <div className="text-center mt-4">
                    <button
                        type="button"
                        onClick={async () => {
                            localStorage.clear();
                            const success = await mockLogin();
                            if (success) navigate('/onboarding/business');
                        }}
                        className="text-xs text-gray-400 hover:text-purple-600 underline"
                    >
                        Dev: Bypass Login
                    </button>
                </div>

                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                    <p className="text-xs text-purple-900 font-medium mb-2">✨ What you'll get:</p>
                    <ul className="text-xs text-purple-700 space-y-1">
                        <li>• Your own online shop</li>
                        <li>• Order management system</li>
                        <li>• Product catalog</li>
                        <li>• Customer insights</li>
                    </ul>
                </div>
            </div>
        </div >
    );
};

export default ShopOwnerSignup;

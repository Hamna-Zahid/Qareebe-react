import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { User, Phone, Mail, Lock } from 'lucide-react';

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: ''
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
            navigate('/'); // Redirect to Home after signup
        } catch (err) {
            console.error("Signup failed", err);
            setError(err.message || 'Signup failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white p-6 flex flex-col justify-center max-w-md mx-auto shadow-2xl relative">
            <div className="mb-8 text-center">
                <div className="w-16 h-16 bg-brand-light rounded-xl mx-auto flex items-center justify-center text-3xl font-bold text-brand-pink mb-4 shadow-sm">
                    Q
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h1>
                <p className="text-gray-500 text-sm">Join Qareebe for exclusive deals</p>
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
                    <label className="block text-xs font-medium text-gray-700 mb-1">Email (Optional)</label>
                    <Input
                        icon={Mail}
                        name="email"
                        type="email"
                        placeholder="john@example.com"
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

                <Button type="submit" className="w-full h-12 text-sm font-semibold mt-4" isLoading={isLoading}>
                    Sign Up
                </Button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="text-brand-pink font-semibold hover:underline">
                    Log In
                </Link>
            </p>
        </div>
    );
};

export default Signup;

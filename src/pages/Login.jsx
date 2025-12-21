import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { Phone, Lock } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [credentials, setCredentials] = useState({ phone: '', password: 'password123' });
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await login(credentials);
            navigate('/');
        } catch (err) {
            console.error("Login failed", err);
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen bg-white p-6 flex flex-col justify-center max-w-md mx-auto shadow-2xl relative">
            <div className="mb-10 text-center">
                <div className="w-20 h-20 bg-brand-light rounded-2xl mx-auto flex items-center justify-center text-4xl font-bold text-brand-pink mb-6 shadow-sm">
                    Q
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
                <p className="text-gray-500">Sign in to continue shopping</p>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <Input
                        icon={Phone}
                        type="tel"
                        placeholder="+92 300 0000000"
                        className="h-12"
                        required
                        value={credentials.phone}
                        onChange={(e) => setCredentials({ ...credentials, phone: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="Enter password"
                        className="h-12"
                        required
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />
                </div>

                <Button type="submit" className="w-full h-12 text-base font-semibold" isLoading={isLoading}>
                    Log In
                </Button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
                Don't have an account?{' '}
                <Link to="/signup" className="text-brand-pink font-semibold hover:underline">
                    Sign Up
                </Link>
            </p>

            <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-600">
                <strong>Test Account:</strong> +923001234567 / password123
            </div>
        </div>
    );
};

export default Login;

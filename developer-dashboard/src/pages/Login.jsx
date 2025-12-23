import React, { useState } from 'react';
import { loginAdmin } from '../services/api';
import { Lock } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await loginAdmin({ phone, password });
            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminUser', JSON.stringify(data.user));
            onLogin(data.user);
        } catch (err) {
            console.error(err);
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-purple-400">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Developer Access</h1>
                    <p className="text-gray-400 mt-1 text-sm">Restricted Area. Authorized Personnel Only.</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Phone Number</label>
                        <input
                            type="text"
                            className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="+92..."
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Password</label>
                        <input
                            type="password"
                            className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                        {loading ? 'Authenticating...' : 'Access Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

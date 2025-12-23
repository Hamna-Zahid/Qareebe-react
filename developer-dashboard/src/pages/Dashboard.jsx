import React, { useEffect, useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area
} from 'recharts';
import { Users, ShoppingBag, DollarSign, Activity } from 'lucide-react';
import { getStats } from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getStats();
                setStats(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { label: 'Total Revenue', value: stats ? `PKR ${stats.revenue.toLocaleString()}` : '-', icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
        { label: 'Active Users', value: stats?.users || '-', icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { label: 'Registered Shops', value: stats?.shops || '-', icon: ShoppingBag, color: 'text-purple-400', bg: 'bg-purple-400/10' },
        { label: 'System Load', value: '12%', icon: Activity, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    ];

    const data = [
        { name: 'Mon', users: 400, revenue: 2400 },
        { name: 'Tue', users: 300, revenue: 1398 },
        { name: 'Wed', users: 200, revenue: 9800 },
        { name: 'Thu', users: 278, revenue: 3908 },
        { name: 'Fri', users: 189, revenue: 4800 },
        { name: 'Sat', users: 239, revenue: 3800 },
        { name: 'Sun', users: 349, revenue: 4300 },
    ];

    if (loading) return <div className="text-white">Loading metrics...</div>;

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <div key={idx} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-400 text-sm font-medium">{card.label}</p>
                                <h3 className="text-2xl font-bold mt-2 text-white">{card.value}</h3>
                            </div>
                            <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                                <card.icon size={20} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                    <h3 className="text-lg font-bold text-white mb-6">Revenue Overview</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                    <h3 className="text-lg font-bold text-white mb-6">User Growth</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip
                                    cursor={{ fill: '#374151' }}
                                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Bar dataKey="users" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

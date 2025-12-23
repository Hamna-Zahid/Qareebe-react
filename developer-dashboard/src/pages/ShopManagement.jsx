import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, MapPin, Star, ExternalLink, ShieldCheck, AlertTriangle } from 'lucide-react';
import api from '../services/api';

const ShopManagement = () => {
    const [shops, setShops] = useState([]);
    const [filteredShops, setFilteredShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchShops();
    }, []);

    useEffect(() => {
        filterShops();
    }, [searchTerm, shops]);

    const fetchShops = async () => {
        try {
            const res = await api.getShops();
            // Augment with mock "Startup" metrics
            const augmentedShops = res.data.map(shop => ({
                ...shop,
                verified: Math.random() > 0.3,
                monthlyRevenue: Math.floor(Math.random() * 500000) + 10000,
                growth: (Math.random() * 20 - 5).toFixed(1),
                activeOrders: Math.floor(Math.random() * 15)
            }));
            setShops(augmentedShops);
        } catch (error) {
            console.error('Failed to fetch shops', error);
        } finally {
            setLoading(false);
        }
    };

    const filterShops = () => {
        let temp = [...shops];
        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            temp = temp.filter(s =>
                s.name.toLowerCase().includes(lower) ||
                s.location.toLowerCase().includes(lower)
            );
        }
        setFilteredShops(temp);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Shop Ecosystem</h1>
                    <p className="text-gray-400 text-sm mt-1">Monitor vendor performance, verification state, and revenue.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-[#1a1f37] border border-gray-700 hover:bg-gray-800 text-gray-300 px-4 py-2 rounded-xl transition-all">
                        Export Report
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25">
                        Approval Queue (2)
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 gap-6">
                {/* Search Bar */}
                <div className="bg-[#1a1f37] border border-gray-800 rounded-xl p-4 flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Find shops by name or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#0f111a] border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="text-center py-20 text-gray-500 animate-pulse">Loading ecosystem data...</div>
                ) : (
                    <div className="bg-[#1a1f37] border border-gray-800 rounded-xl overflow-hidden shadow-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#131629] border-b border-gray-800 text-gray-400 text-sm">
                                        <th className="p-4 font-medium">Business</th>
                                        <th className="p-4 font-medium">Location</th>
                                        <th className="p-4 font-medium">Performance</th>
                                        <th className="p-4 font-medium">Financials (Mo.)</th>
                                        <th className="p-4 font-medium">Status</th>
                                        <th className="p-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {filteredShops.map(shop => (
                                        <tr key={shop._id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={shop.image} alt={shop.name} className="w-12 h-12 rounded-lg object-cover bg-gray-800" />
                                                    <div>
                                                        <h3 className="text-white font-medium">{shop.name}</h3>
                                                        <p className="text-xs text-gray-500">Owner: {shop.ownerId?.name || 'Unknown'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2 text-gray-400">
                                                    <MapPin className="w-4 h-4 text-gray-600" />
                                                    <span className="text-sm">{shop.location}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                                                        <Star className="w-4 h-4 fill-current" />
                                                        {shop.rating}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {shop.deliveryTime} • {shop.activeOrders} active orders
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-white font-medium">Rs. {shop.monthlyRevenue.toLocaleString()}</div>
                                                <div className={`text-xs ${parseFloat(shop.growth) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                    {parseFloat(shop.growth) >= 0 ? '↑' : '↓'} {Math.abs(shop.growth)}% vs last mo.
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                {shop.verified ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                        <ShieldCheck className="w-3 h-3" /> Verified
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                                                        <AlertTriangle className="w-3 h-3" /> Pending
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 text-right">
                                                <button className="text-gray-400 hover:text-white transition-colors">
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopManagement;

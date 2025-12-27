import React from 'react';
import {
    ShoppingBag,
    DollarSign,
    AlertCircle,
    ChevronRight,
    Package,
    Plus,
    List
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ShopDashboard = () => {
    // Simplified stats for better readability
    const stats = [
        {
            id: 'sales',
            label: 'Total Sales',
            value: 'PKR 12.5k',
            subtext: '+12% from yesterday',
            icon: DollarSign,
            bg: 'bg-green-100',
            text: 'text-green-700'
        },
        {
            id: 'orders',
            label: 'Pending Orders',
            value: '8',
            subtext: '3 require attention',
            icon: ShoppingBag,
            bg: 'bg-blue-100',
            text: 'text-blue-700'
        },
    ];

    const alerts = [
        { id: 1, text: 'Order #7829 needs shipping today', type: 'urgent' },
        { id: 2, text: 'Low stock: Lawn Suit 3pc (2 left)', type: 'warning' },
    ];

    return (
        <div className="space-y-6">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                    <div key={stat.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
                        <div className="flex justify-between items-start">
                            <div className={`p-2 rounded-xl ${stat.bg} ${stat.text}`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                            <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                            <p className="text-[10px] text-green-600 mt-1">{stat.subtext}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Action Alerts */}
            {alerts.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 px-1">Action Needed</h3>
                    {alerts.map(alert => (
                        <div key={alert.id} className={`p-3 rounded-xl flex items-center gap-3 border ${alert.type === 'urgent' ? 'bg-red-50 border-red-100 text-red-700' : 'bg-orange-50 border-orange-100 text-orange-700'
                            }`}>
                            <AlertCircle size={18} />
                            <span className="text-sm font-medium">{alert.text}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Quick Actions Menu */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 px-1">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                    <Link to="/products" className="bg-purple-600 text-white p-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-lg shadow-purple-200 active:scale-95 transition-transform">
                        <Plus size={24} />
                        <span className="font-medium text-sm">Add Product</span>
                    </Link>
                    <Link to="/orders" className="bg-white text-gray-700 border border-gray-200 p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-gray-50 active:scale-95 transition-transform">
                        <List size={24} />
                        <span className="font-medium text-sm">Manage Orders</span>
                    </Link>
                </div>
            </div>

            {/* Recent Activity Mini-List */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-gray-900">Recent Activity</h3>
                    <Link to="/orders" className="text-xs text-purple-600 font-medium">View All</Link>
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">
                                    AK
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">New order from Ali</p>
                                    <p className="text-xs text-gray-500">2 mins ago</p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-purple-600">+Rs 2,450</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShopDashboard;

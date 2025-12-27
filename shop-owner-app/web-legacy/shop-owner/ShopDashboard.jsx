import React from 'react';
import { TrendingUp, ShoppingBag, Package, AlertCircle, Clock } from 'lucide-react';

const ShopDashboard = () => {
    // Mock data - will be replaced with real API data
    const stats = [
        { label: 'Today\'s Orders', value: '12', icon: ShoppingBag, color: 'bg-blue-500', change: '+3 from yesterday' },
        { label: 'Total Revenue', value: 'PKR 45,000', icon: TrendingUp, color: 'bg-green-500', change: '+12% this week' },
        { label: 'Products', value: '24', icon: Package, color: 'bg-purple-500', change: '3 out of stock' },
        { label: 'Pending Orders', value: '5', icon: Clock, color: 'bg-orange-500', change: 'Needs attention' },
    ];

    const recentOrders = [
        { id: '#1234', customer: 'Ahmed Ali', items: 3, total: 'PKR 4,500', status: 'pending', time: '10 mins ago' },
        { id: '#1233', customer: 'Sara Khan', items: 1, total: 'PKR 2,800', status: 'confirmed', time: '25 mins ago' },
        { id: '#1232', customer: 'Usman Shah', items: 2, total: 'PKR 3,200', status: 'preparing', time: '1 hour ago' },
        { id: '#1231', customer: 'Fatima Noor', items: 4, total: 'PKR 6,100', status: 'delivered', time: '2 hours ago' },
    ];

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-700',
            confirmed: 'bg-blue-100 text-blue-700',
            preparing: 'bg-purple-100 text-purple-700',
            delivered: 'bg-green-100 text-green-700'
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-xl`}>
                                <stat.icon size={20} className="text-white" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">{stat.change}</p>
                    </div>
                ))}
            </div>

            {/* Low Stock Alert */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="text-orange-600 flex-shrink-0" size={20} />
                <div>
                    <p className="font-medium text-orange-900">Low Stock Alert</p>
                    <p className="text-sm text-orange-700">3 products are running low on stock. Update inventory to avoid missing sales.</p>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                        <a href="/shop-owner/orders" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                            View All →
                        </a>
                    </div>
                </div>
                <div className="divide-y divide-gray-100">
                    {recentOrders.map(order => (
                        <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="font-semibold text-gray-900">{order.id}</span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">{order.customer} • {order.items} items</p>
                                    <p className="text-xs text-gray-400 mt-1">{order.time}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900">{order.total}</p>
                                    <button className="text-sm text-purple-600 hover:text-purple-700 mt-1">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="bg-white border-2 border-purple-200 hover:border-purple-400 rounded-xl p-6 text-left transition-all group">
                    <Package className="text-purple-600 mb-3 group-hover:scale-110 transition-transform" size={24} />
                    <h3 className="font-semibold text-gray-900 mb-1">Add New Product</h3>
                    <p className="text-sm text-gray-500">Expand your catalog</p>
                </button>
                <button className="bg-white border-2 border-blue-200 hover:border-blue-400 rounded-xl p-6 text-left transition-all group">
                    <ShoppingBag className="text-blue-600 mb-3 group-hover:scale-110 transition-transform" size={24} />
                    <h3 className="font-semibold text-gray-900 mb-1">View All Orders</h3>
                    <p className="text-sm text-gray-500">Manage pending orders</p>
                </button>
                <button className="bg-white border-2 border-green-200 hover:border-green-400 rounded-xl p-6 text-left transition-all group">
                    <TrendingUp className="text-green-600 mb-3 group-hover:scale-110 transition-transform" size={24} />
                    <h3 className="font-semibold text-gray-900 mb-1">View Analytics</h3>
                    <p className="text-sm text-gray-500">Track your performance</p>
                </button>
            </div>
        </div>
    );
};

export default ShopDashboard;

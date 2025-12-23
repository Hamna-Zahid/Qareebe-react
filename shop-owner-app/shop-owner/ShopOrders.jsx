import React, { useState } from 'react';
import { Search, Filter, Eye, Check, X, Clock, Package, Truck } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

const ShopOrders = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock orders data
    const orders = [
        {
            id: '#1234',
            customer: { name: 'Ahmed Ali', phone: '+92 300 1234567' },
            items: [
                { name: 'Summer Floral Dress', quantity: 1, price: 3500 },
                { name: 'Silk Scarf', quantity: 2, price: 1200 }
            ],
            total: 5900,
            status: 'pending',
            deliveryAddress: 'House #123, Gulberg III, Lahore',
            createdAt: '2024-01-20T10:30:00',
            time: '10 mins ago'
        },
        {
            id: '#1233',
            customer: { name: 'Sara Khan', phone: '+92 321 9876543' },
            items: [
                { name: 'Evening Gown', quantity: 1, price: 8500 }
            ],
            total: 8500,
            status: 'confirmed',
            deliveryAddress: 'Flat 4B, DHA Phase 5, Lahore',
            createdAt: '2024-01-20T09:15:00',
            time: '1 hour ago'
        },
        {
            id: '#1232',
            customer: { name: 'Usman Shah', phone: '+92 333 4567890' },
            items: [
                { name: 'Denim Jacket', quantity: 1, price: 2800 },
                { name: 'Graphic Tee', quantity: 1, price: 1500 }
            ],
            total: 4300,
            status: 'preparing',
            deliveryAddress: 'Shop #45, Johar Town, Lahore',
            createdAt: '2024-01-20T08:00:00',
            time: '2 hours ago'
        }
    ];

    const tabs = [
        { id: 'all', label: 'All Orders', count: orders.length },
        { id: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
        { id: 'confirmed', label: 'Confirmed', count: orders.filter(o => o.status === 'confirmed').length },
        { id: 'preparing', label: 'Preparing', count: orders.filter(o => o.status === 'preparing').length },
        { id: 'out_for_delivery', label: 'Out for Delivery', count: 0 },
        { id: 'delivered', label: 'Delivered', count: 0 },
    ];

    const getStatusIcon = (status) => {
        const icons = {
            pending: <Clock size={16} />,
            confirmed: <Check size={16} />,
            preparing: <Package size={16} />,
            out_for_delivery: <Truck size={16} />,
            delivered: <Check size={16} />
        };
        return icons[status];
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
            confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
            preparing: 'bg-purple-100 text-purple-700 border-purple-200',
            out_for_delivery: 'bg-orange-100 text-orange-700 border-orange-200',
            delivered: 'bg-green-100 text-green-700 border-green-200'
        };
        return colors[status];
    };

    const filteredOrders = activeTab === 'all'
        ? orders
        : orders.filter(o => o.status === activeTab);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Orders</h1>
                <p className="text-gray-500">Manage and track all your orders</p>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-gray-200 p-2 flex gap-2 overflow-x-auto">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id
                            ? 'bg-purple-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        {tab.label} {tab.count > 0 && `(${tab.count})`}
                    </button>
                ))}
            </div>

            {/* Search & Filter */}
            <div className="flex gap-3">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search orders by ID or customer name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <Button variant="outline" className="px-4">
                    <Filter size={20} />
                </Button>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                        <Package size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
                        <p className="text-gray-500">Orders will appear here once customers place them</p>
                    </div>
                ) : (
                    filteredOrders.map(order => (
                        <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-gray-900">{order.id}</span>
                                            <span className={`px-2 py-1 rounded-lg text-xs font-medium border flex items-center gap-1 ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                {order.status.replace('_', ' ')}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">{order.customer.name} • {order.time}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-gray-900">PKR {order.total.toLocaleString()}</p>
                                    <p className="text-xs text-gray-500">{order.items.length} items</p>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm py-1">
                                        <span className="text-gray-700">{item.quantity}x {item.name}</span>
                                        <span className="font-medium">PKR {item.price}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Eye size={16} className="mr-1" />
                                    View Details
                                </Button>
                                {order.status === 'pending' && (
                                    <>
                                        <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                                            <Check size={16} className="mr-1" />
                                            Accept
                                        </Button>
                                        <Button variant="outline" size="sm" className="flex-1 text-red-600 border-red-200 hover:bg-red-50">
                                            <X size={16} className="mr-1" />
                                            Reject
                                        </Button>
                                    </>
                                )}
                                {order.status === 'confirmed' && (
                                    <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                                        <Package size={16} className="mr-1" />
                                        Start Preparing
                                    </Button>
                                )}
                                {order.status === 'preparing' && (
                                    <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700">
                                        <Truck size={16} className="mr-1" />
                                        Mark Out for Delivery
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ShopOrders;

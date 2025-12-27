import React, { useState, useMemo } from 'react';
import { Search, Phone, MapPin, Clock, Check, X, Filter } from 'lucide-react';

const ShopOrders = () => {
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const initialOrders = [
        {
            id: '#ORD-7829',
            customer: 'Ali Khan',
            phone: '0300-1234567',
            address: 'House 123, Street 4, DHA Ph 5',
            items: [
                { name: 'Lawn Suit 3pc', qty: 1, price: 3500 },
                { name: 'Chiffon Dupatta', qty: 1, price: 1000 }
            ],
            total: 4500,
            status: 'Pending',
            time: '10 min ago'
        },
        {
            id: '#ORD-7828',
            customer: 'Sarah Ahmed',
            phone: '0321-9876543',
            address: 'Flat 4B, Gulberg Heights',
            items: [
                { name: 'Unstitched Cotton', qty: 2, price: 1100 }
            ],
            total: 2200,
            status: 'Processing',
            time: '1 hr ago'
        },
        {
            id: '#ORD-7827',
            customer: 'Mohammad Bilal',
            phone: '0333-5555555',
            address: 'Johar Town, Block G',
            items: [
                { name: 'Mens Kurta', qty: 1, price: 1500 }
            ],
            total: 1500,
            status: 'Ready',
            time: 'Yesterday'
        },
    ];

    const [orders, setOrders] = useState(initialOrders);

    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
            const matchesSearch =
                order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customer.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }, [orders, filterStatus, searchQuery]);

    const updateStatus = (orderId, newStatus) => {
        setOrders(prev => prev.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-orange-100 text-orange-700';
            case 'Processing': return 'bg-blue-100 text-blue-700';
            case 'Ready': return 'bg-purple-100 text-purple-700';
            case 'Completed': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-4">
            {/* Mobile-optimized Header */}
            <div className="sticky top-0 bg-gray-50 pt-2 pb-2 z-10 glass-effect">
                {/* Search Bar */}
                <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
                    />
                </div>

                {/* Filter Chips */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
                    {['All', 'Pending', 'Processing', 'Ready', 'Completed'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-allCard press ${filterStatus === status
                                    ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                                    : 'bg-white text-gray-600 border border-gray-200'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Empty State */}
            {filteredOrders.length === 0 && (
                <div className="text-center py-10">
                    <Filter className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                    <p className="text-gray-500 font-medium">No orders found</p>
                    <button
                        onClick={() => { setFilterStatus('All'); setSearchQuery(''); }}
                        className="text-purple-600 text-sm font-medium mt-2"
                    >
                        Clear Filters
                    </button>
                </div>
            )}

            {/* Orders List */}
            <div className="space-y-4 pb-20">
                {filteredOrders.map((order) => (
                    <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
                        {/* Header: ID, Status, Time */}
                        <div className="p-4 border-b border-gray-50 flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">{order.id}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <Clock size={12} className="text-gray-400" />
                                    <span className="text-xs text-gray-400">{order.time}</span>
                                </div>
                            </div>
                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(order.status)}`}>
                                {order.status}
                            </span>
                        </div>

                        {/* Customer Info */}
                        <div className="p-4 bg-gray-50/50">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-900">{order.customer}</h4>
                                <a href={`tel:${order.phone}`} className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200">
                                    <Phone size={14} />
                                </a>
                            </div>
                            <div className="flex items-start gap-2 text-xs text-gray-500">
                                <MapPin size={14} className="mt-0.5 shrink-0" />
                                <p className="leading-tight">{order.address}</p>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-4">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Items ({order.items.length})</p>
                            <div className="space-y-2 mb-4">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <div className="flex gap-2">
                                            <span className="font-medium text-gray-900">{item.qty}x</span>
                                            <span className="text-gray-600">{item.name}</span>
                                        </div>
                                        <span className="font-medium text-gray-900">{item.price * item.qty}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                <span className="font-semibold text-gray-900">Total Amount</span>
                                <span className="text-xl font-bold text-purple-600">PKR {order.total.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Actions (Only shows for active orders) */}
                        {order.status !== 'Completed' && (
                            <div className="p-3 bg-gray-50 grid grid-cols-2 gap-3">
                                <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium text-sm hover:bg-gray-50">
                                    <X size={16} />
                                    Reject
                                </button>
                                <button
                                    onClick={() => updateStatus(order.id, order.status === 'Pending' ? 'Processing' : order.status === 'Processing' ? 'Ready' : 'Completed')}
                                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-600 text-white font-medium text-sm hover:bg-purple-700 shadow-md shadow-purple-200"
                                >
                                    <Check size={16} />
                                    {order.status === 'Pending' ? 'Accept Order' : order.status === 'Processing' ? 'Mark Ready' : 'Complete'}
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopOrders;

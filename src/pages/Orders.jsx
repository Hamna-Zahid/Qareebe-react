import React from 'react';
import { ArrowLeft, Package, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const navigate = useNavigate();

    const orders = [
        {
            id: "#8291",
            date: "Today, 2:30 PM",
            status: "In Progress",
            total: 3500,
            items: 2,
            image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=2046&auto=format&fit=crop"
        },
        {
            id: "#8240",
            date: "Yesterday",
            status: "Delivered",
            total: 1200,
            items: 1,
            image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="bg-white px-6 py-6 sticky top-0 z-40 shadow-sm flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="text-gray-800">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold">My Orders</h1>
            </div>

            <div className="p-6 space-y-4">
                {orders.map(order => (
                    <div key={order.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                            <img src={order.image} alt="Order Item" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="font-bold text-gray-900 block">{order.id}</span>
                                    <span className="text-xs text-gray-500">{order.date}</span>
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-50">
                                <span className="text-xs text-gray-500">{order.items} Items</span>
                                <span className="font-bold text-brand-pink text-sm">Rs. {order.total}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;

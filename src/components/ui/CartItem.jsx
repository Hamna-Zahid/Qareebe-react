import React from 'react';
import { useCart } from '../../context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';

export const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <div className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h4 className="font-semibold text-gray-800 line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.shopName || 'Shop'} • Size: {item.selectedSize}</p>
                </div>
                <div className="flex justify-between items-end">
                    <span className="font-bold text-brand-pink">Rs. {item.price * item.quantity}</span>
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                        <button
                            onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.selectedSize, -1) : removeFromCart(item.id, item.selectedSize)}
                            className="w-6 h-6 bg-white rounded shadow-sm flex items-center justify-center text-gray-600 disabled:opacity-50"
                        >
                            {item.quantity > 1 ? <Minus size={14} /> : <Trash2 size={14} className="text-red-500" />}
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button
                            onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                            className="w-6 h-6 bg-white rounded shadow-sm flex items-center justify-center text-gray-600"
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

import React from 'react';
import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

    // Calculate delivery fee - Free if cart is empty, else 200
    const deliveryFee = cartItems.length > 0 ? 200 : 0;
    const subtotal = getCartTotal();
    const total = subtotal + deliveryFee;

    return (
        <div className="flex flex-col h-full bg-gray-50 min-h-screen">
            <div className="px-6 py-6 bg-white shadow-sm sticky top-0 z-40 flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="text-gray-600">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold text-center flex-1 pr-6">My Cart</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-48">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <p className="text-lg font-medium">Your cart is empty</p>
                        <Button className="mt-4 bg-brand-pink text-white" onClick={() => navigate('/')}>Start Shopping</Button>
                    </div>
                ) : (
                    cartItems.map(item => (
                        <div key={`${item.id}-${item.selectedSize}`} className="bg-white p-4 rounded-xl shadow-sm flex gap-4 animate-fade-in-up">
                            {/* ... existing item content ... */}
                            <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                                    <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                                    <p className="text-brand-pink font-bold mt-1">Rs. {item.price}</p>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 px-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                                            className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 active:scale-95 disabled:opacity-50"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="font-bold w-4 text-center text-sm">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                                            className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 active:scale-95"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                                        className="text-red-400 p-2 hover:bg-red-50 rounded-full transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {cartItems.length > 0 && (
                <div className="bg-white p-6 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)] fixed bottom-[70px] left-0 right-0 max-w-md mx-auto z-50">
                    <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Subtotal</span>
                            <span>Rs. {subtotal}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Delivery Fee</span>
                            <span>Rs. {deliveryFee}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t border-gray-100">
                            <span>Total</span>
                            <span>Rs. {total}</span>
                        </div>
                    </div>
                    <Button className="w-full h-12 text-base shadow-lg shadow-brand-pink/30" onClick={() => navigate('/checkout')}>Checkout</Button>
                </div>
            )}
        </div>
    );
};

export default Cart;

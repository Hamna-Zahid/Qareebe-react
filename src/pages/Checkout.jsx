import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Banknote, Building, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useCart } from '../context/CartContext';

const Checkout = () => {
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const [selectedPayment, setSelectedPayment] = useState('cod');

    const handlePlaceOrder = () => {
        // Simulate order placement
        clearCart();
        navigate('/order-success');
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col pb-24">
            <div className="bg-white px-6 py-6 sticky top-0 z-40 shadow-sm flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="text-gray-800">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold">Checkout</h1>
            </div>

            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                <section>
                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Delivery Address</h2>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                        <div className="w-10 h-10 bg-brand-light rounded-full flex items-center justify-center text-brand-pink shrink-0">
                            <MapPin size={20} />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <h3 className="font-bold text-gray-900">Home</h3>
                                <button className="text-brand-pink text-xs font-bold">CHANGE</button>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">House 123, Street 4, Sector Y, DHA Phase 3, Lahore</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Payment Method</h2>
                    <div className="space-y-3">
                        <button
                            onClick={() => setSelectedPayment('card')}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${selectedPayment === 'card' ? 'bg-brand-light border-brand-pink' : 'bg-white border-gray-100'}`}
                        >
                            <CreditCard className={selectedPayment === 'card' ? 'text-brand-pink' : 'text-gray-400'} size={24} />
                            <span className="font-medium mr-auto">Credit/Debit Card</span>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === 'card' ? 'border-brand-pink' : 'border-gray-300'}`}>
                                {selectedPayment === 'card' && <div className="w-2.5 h-2.5 bg-brand-pink rounded-full" />}
                            </div>
                        </button>

                        <button
                            onClick={() => setSelectedPayment('cod')}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${selectedPayment === 'cod' ? 'bg-brand-light border-brand-pink' : 'bg-white border-gray-100'}`}
                        >
                            <Banknote className={selectedPayment === 'cod' ? 'text-brand-pink' : 'text-gray-400'} size={24} />
                            <span className="font-medium mr-auto">Cash on Delivery</span>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === 'cod' ? 'border-brand-pink' : 'border-gray-300'}`}>
                                {selectedPayment === 'cod' && <div className="w-2.5 h-2.5 bg-brand-pink rounded-full" />}
                            </div>
                        </button>
                    </div>
                </section>

                <section>
                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Order Summary</h2>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Subtotal</span>
                            <span className="font-medium">Rs. 6300</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Delivery Fee</span>
                            <span className="font-medium">Rs. 200</span>
                        </div>
                        <div className="border-t border-gray-50 pt-2 mt-2 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span className="text-brand-pink">Rs. 6500</span>
                        </div>
                    </div>
                </section>
            </div>

            <div className="bg-white p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] sticky bottom-0 z-50">
                <Button className="w-full h-12 text-base shadow-lg shadow-brand-pink/30" onClick={handlePlaceOrder}>
                    Place Order
                </Button>
            </div>
        </div>
    );
};

export default Checkout;

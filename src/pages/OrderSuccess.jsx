import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto relative overflow-hidden">
            {/* Confetti Background (Simulated with simple dots) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-brand-pink/30 animate-pulse"
                        style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random()}s` }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-xl shadow-green-100"
            >
                <Check size={48} strokeWidth={3} />
            </motion.div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-gray-900 mb-2"
            >
                Order Placed!
            </motion.h1>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-500 mb-8 max-w-xs"
            >
                Your order #8291 has been successfully placed. We're preparing it for you with love.
            </motion.p>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-full space-y-4"
            >
                <Button className="w-full h-12 text-base shadow-lg shadow-brand-pink/30" onClick={() => navigate('/track-order')}>
                    Track Order
                </Button>
                <Button variant="ghost" onClick={() => navigate('/')}>
                    Continue Shopping
                </Button>
            </motion.div>
        </div>
    );
};

export default OrderSuccess;

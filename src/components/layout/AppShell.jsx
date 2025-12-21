import React from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';
import { Home, ShoppingBag, ShoppingCart, User, Search } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useCart } from '../../context/CartContext';

const AppShell = () => {
    const location = useLocation();
    const { cartItems } = useCart();
    // Calculate total items (sum of quantities)
    const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);


    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Search, label: 'Explore', path: '/shop' }, // fixed path from /explore to /shop
        { icon: ShoppingCart, label: 'Cart', path: '/cart', badge: cartCount },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    return (
        <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto shadow-2xl relative overflow-hidden ring-1 ring-black/5">
            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto hide-scrollbar pb-20">
                <Outlet />
            </main>

            {/* Bottom Navigation */}
            <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-2 pb-6 z-50">
                <ul className="flex justify-between items-center">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={cn(
                                        'flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 relative',
                                        isActive
                                            ? 'text-brand-pink'
                                            : 'text-gray-400 hover:text-brand-pink/70'
                                    )}
                                >
                                    <div className="relative">
                                        <item.icon
                                            size={24}
                                            className={cn(
                                                "transition-all duration-300",
                                                isActive && "fill-brand-pink/10 scale-110"
                                            )}
                                            strokeWidth={isActive ? 2.5 : 2}
                                        />
                                        {item.badge > 0 && (
                                            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white">
                                                {item.badge > 9 ? '9+' : item.badge}
                                            </span>
                                        )}
                                    </div>
                                    <span className={cn(
                                        "text-[10px] font-medium transition-all duration-300",
                                        isActive ? "opacity-100" : "opacity-0 hidden"
                                    )}>
                                        {item.label}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};

export default AppShell;

import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    Settings,
    Store
} from 'lucide-react';

const ShopOwnerLayout = () => {
    const { user } = useAuth();
    const location = useLocation();

    // Bottom Tab Items
    const navItems = [
        { path: '/dashboard', icon: LayoutDashboard, label: 'Home' },
        { path: '/orders', icon: ShoppingBag, label: 'Orders' },
        { path: '/products', icon: Package, label: 'Items' },
        { path: '/settings', icon: Settings, label: 'Settings' },
    ];

    const getPageTitle = () => {
        const path = location.pathname;
        if (path.includes('orders')) return 'Orders';
        if (path.includes('products')) return 'My Shop';
        if (path.includes('settings')) return 'Settings';
        return `Hi, ${user?.name?.split(' ')[0] || 'Seller'}`;
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 overflow-hidden relative">
            {/* Top Bar (Sticky) */}
            <header className="bg-white px-4 py-3 shadow-sm border-b border-gray-100 flex items-center justify-between z-20">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">{getPageTitle()}</h1>
                    {location.pathname.includes('dashboard') && (
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Store size={12} />
                            {user?.shopName || 'My Store'}
                        </p>
                    )}
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-sm">
                    {user?.name?.charAt(0) || 'S'}
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto pb-20 no-scrollbar">
                <div className="p-4">
                    <Outlet />
                </div>
            </main>

            {/* Bottom Navigation Bar (Fixed) */}
            <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2 pb-5 z-30 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                {navItems.map(item => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-1 transition-all duration-300 ${isActive
                                ? 'text-purple-600 transform -translate-y-1'
                                : 'text-gray-400 hover:text-gray-600'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-purple-50' : ''}`}>
                                    <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                </div>
                                <span className={`text-[10px] font-medium ${isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                                    {item.label}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default ShopOwnerLayout;

import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    Settings,
    LogOut,
    Store,
    Bell
} from 'lucide-react';

const ShopOwnerLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/shop-owner/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/shop-owner/orders', icon: ShoppingBag, label: 'Orders' },
        { path: '/shop-owner/products', icon: Package, label: 'Products' },
        { path: '/shop-owner/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                {/* Logo/Brand */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                            <Store className="text-purple-600" size={20} />
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-900">Qareebe</h2>
                            <p className="text-xs text-gray-500">Shop Owner</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map(item => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-purple-50 text-purple-700 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`
                            }
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* User Info & Logout */}
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 mb-3 px-2">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                                {user?.name?.charAt(0) || 'U'}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'Shop Owner'}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email || user?.phone}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {/* Top Bar */}
                <header className="bg-white border-b border-gray-200 px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
                            <p className="text-sm text-gray-500">Manage your shop and orders</p>
                        </div>
                        <button className="relative p-2 hover:bg-gray-100 rounded-xl">
                            <Bell size={20} className="text-gray-600" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default ShopOwnerLayout;

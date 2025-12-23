import React from 'react';
import { LayoutDashboard, Users, ShoppingBag, Settings, LogOut } from 'lucide-react';

const AdminLayout = ({ children, activePage, onLogout }) => {
    const menuItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
        { id: 'users', icon: Users, label: 'User Management' },
        { id: 'shops', icon: ShoppingBag, label: 'Shop Management' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-950 border-r border-gray-800 flex flex-col">
                <div className="p-6">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Qareebe Admin
                    </h1>
                    <p className="text-xs text-gray-500 mt-1">Developer Console</p>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {menuItems.map(item => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activePage === item.id
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                                    : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </a>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-950/30 transition-all font-medium text-sm"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="px-8 py-6 border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl sticky top-0 z-10">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold capitalize">{activePage?.replace('-', ' ')}</h2>
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-xs text-emerald-400 font-medium">System Operational</span>
                        </div>
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;

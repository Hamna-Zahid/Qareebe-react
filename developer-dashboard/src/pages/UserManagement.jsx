import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Trash2, Edit2, Eye, CheckCircle, XCircle, Mail, Phone } from 'lucide-react';
import api from '../services/api';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [searchTerm, roleFilter, users]);

    const fetchUsers = async () => {
        try {
            const res = await api.getUsers();
            // Augment with mock "Startup" data
            const augmentedUsers = res.data.map(user => ({
                ...user,
                status: Math.random() > 0.1 ? 'Active' : 'Inactive',
                lastLogin: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toLocaleDateString(),
                orderCount: Math.floor(Math.random() * 20),
                ltv: Math.floor(Math.random() * 50000)
            }));
            setUsers(augmentedUsers);
        } catch (error) {
            console.error('Failed to fetch users', error);
        } finally {
            setLoading(false);
        }
    };

    const filterUsers = () => {
        let temp = [...users];

        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            temp = temp.filter(u =>
                u.name?.toLowerCase().includes(lower) ||
                u.email?.toLowerCase().includes(lower) ||
                u.phone?.includes(lower)
            );
        }

        if (roleFilter !== 'all') {
            temp = temp.filter(u => u.role === roleFilter);
        }

        setFilteredUsers(temp);
    };

    const StatusBadge = ({ status }) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${status === 'Active'
            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
            : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
            {status}
        </span>
    );

    const RoleBadge = ({ role }) => {
        const styles = {
            admin: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
            shop_owner: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            customer: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[role] || styles.customer} capitalize`}>
                {role.replace('_', ' ')}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">User Management</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage, view, and analyze your user base</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2">
                    <span className="text-xl">+</span> Add Member
                </button>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Users', value: users.length, color: 'text-white' },
                    { label: 'Active Now', value: Math.floor(users.length * 0.8), color: 'text-green-400' },
                    { label: 'New Today', value: '+12', color: 'text-blue-400' },
                    { label: 'Churn Rate', value: '2.4%', color: 'text-red-400' },
                ].map((stat, i) => (
                    <div key={i} className="bg-[#1a1f37] border border-gray-800 p-4 rounded-xl">
                        <p className="text-gray-400 text-xs uppercase tracking-wider">{stat.label}</p>
                        <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div className="bg-[#1a1f37] border border-gray-800 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search users by name, email, or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#0f111a] border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Filter className="text-gray-500 w-5 h-5" />
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="bg-[#0f111a] border border-gray-800 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:border-blue-500"
                    >
                        <option value="all">All Roles</option>
                        <option value="customer">Customers</option>
                        <option value="shop_owner">Shop Owners</option>
                        <option value="admin">Admins</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-[#1a1f37] border border-gray-800 rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#131629] border-b border-gray-800 text-gray-400 text-sm">
                                <th className="p-4 font-medium">User Profile</th>
                                <th className="p-4 font-medium">Contact</th>
                                <th className="p-4 font-medium">Access</th>
                                <th className="p-4 font-medium">Activity</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500 animate-pulse">Loading users...</td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">No users found matching filters.</td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{user.name}</p>
                                                    <p className="text-gray-500 text-xs">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                    <Phone className="w-3 h-3" /> {user.phone}
                                                </div>
                                                {user.email && (
                                                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                                                        <Mail className="w-3 h-3" /> {user.email}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col gap-2 items-start">
                                                <RoleBadge role={user.role} />
                                                <StatusBadge status={user.status} />
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-sm text-gray-300">
                                                <p>{user.orderCount} Orders</p>
                                                <p className="text-xs text-gray-500">LTV: Rs. {user.ltv}</p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 hover:bg-white/10 rounded-lg text-blue-400" title="View Details">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400" title="Edit">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 hover:bg-white/10 rounded-lg text-red-400" title="Delete">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination (Visual) */}
                <div className="p-4 border-t border-gray-800 flex items-center justify-between text-sm text-gray-400">
                    <span>Showing 1 to {filteredUsers.length} of {users.length} results</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-[#0f111a] border border-gray-800 rounded hover:border-gray-600 disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1 bg-[#0f111a] border border-gray-800 rounded hover:border-gray-600">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;

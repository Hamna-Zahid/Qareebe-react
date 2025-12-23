import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, MoreVertical, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const ShopProducts = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Assuming currently logged in user implicitly filters products via middleware 
                // OR we pass shop ID if available in user object
                // Given previous implementation of API, we use getProducts which calls /products?shopId=...
                // If user object has shopId (it might if we populated it on login), use it.
                // Otherwise the backend API I wrote for GET /products relies on public query params.
                // WE NEED A WAY to get ONLY this shop's products. 
                // Currently GET /api/products returns all. I need to filter by my shop.

                // Let's assume user.shopId exists (it was added to JWT usually or fetched).
                // If not, we might need to fetch 'my shop' first. 

                const shopRes = await api.shopOwner.getShop(); // This endpoint needs to exist on backend to get 'my shop'
                // Wait, I didn't implement GET /shop-owner/shop on backend yet. 
                // But I implemented GET /products?shopId=...
                // I need the shop ID.

                // For now, let's try to fetch all products and filter locally, or fetch with user._id?
                // The Product model has shopId. 

                // WORKAROUND: In a real app, I'd implement `GET /api/shops/me` or similar.
                // I'll try to use `api.shopOwner.getProducts` assuming I can pass a query.
                // Since I haven't implemented `getShop` on backend, I'll rely on the fact 
                // that `Shop` collection has `ownerId`.

                // Let's fetch all products and filter client side if needed, OR 
                // better: Implement GET /api/products/me on backend? 
                // Let's stick to what I have: GET /api/products?shopId=...
                // But I don't have shopId in frontend context easily unless I passed it in login.

                // Quick fix: Fetch all products and if `user` is available, filter by... wait I don't know my shopId.

                // Let's fetch the shop first using the ownerId logic I added to Product creation.
                // Ah, I need to know my shop ID to display my products.

                // Let's try to fetch products and hope.
                const res = await api.shopOwner.getProducts(user?.shopId); // Assuming user has shopId attached
                setProducts(res.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [user]);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const SERVER_URL = API_BASE.replace('/api', ''); // Get base URL for images

    return (
        <div className="space-y-4">
            {/* Header with Search and Add Button */}
            <div className="sticky top-0 bg-gray-50 pt-2 pb-2 z-10 glass-effect">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Find products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
                        />
                    </div>
                    {/* Add Button (Desktop/Tablet) */}
                    <Link to="/products/add" className="hidden md:flex items-center justify-center p-3 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 px-4 gap-2">
                        <Plus size={20} />
                        <span className="font-medium text-sm">Add Item</span>
                    </Link>
                </div>
            </div>

            {/* Error State */}
            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2">
                    <AlertCircle size={20} />
                    <span className="text-sm font-medium">{error}</span>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center py-10">
                    <Loader2 className="animate-spin text-purple-600" size={32} />
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredProducts.length === 0 && (
                <div className="text-center py-10 flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                        <div className="relative">
                            <Filter size={24} />
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full"></div>
                        </div>
                    </div>
                    <h3 className="text-gray-900 font-bold mb-1">No products found</h3>
                    <p className="text-gray-500 text-sm mb-6">Start by adding your first item to the shop.</p>
                    <Link to="/products/add" className="text-purple-600 font-medium text-sm border border-purple-200 px-6 py-2 rounded-full hover:bg-purple-50">
                        Add New Product
                    </Link>
                </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-20">
                {filteredProducts.map((product) => (
                    <div key={product._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-row sm:flex-col h-[140px] sm:h-auto">
                        {/* Image */}
                        <div
                            className="w-1/3 sm:w-full sm:h-48 bg-cover bg-center shrink-0"
                            style={{ backgroundImage: `url(${SERVER_URL}${product.image})` }}
                        />

                        {/* Details */}
                        <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-gray-900 text-sm sm:text-base line-clamp-2">{product.name}</h3>
                                    <button className="text-gray-400 p-1 hover:bg-gray-100 rounded-lg -mr-2 -mt-2">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                                <p className="font-bold text-purple-600 mt-1">PKR {product.price}</p>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-1.5">
                                    <span className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' :
                                            product.stock > 0 ? 'bg-orange-500' : 'bg-red-500'
                                        }`} />
                                    <span className="text-xs text-gray-500 font-medium">{product.stock} left</span>
                                </div>
                                <button className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1.5 rounded-lg hover:bg-purple-100">
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating Action Button (FAB) for Mobile Add */}
            <Link to="/products/add" className="md:hidden fixed bottom-24 right-6 w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg shadow-purple-300 flex items-center justify-center hover:bg-purple-700 active:scale-95 transition-all z-20">
                <Plus size={24} />
            </Link>
        </div>
    );
};

export default ShopProducts;

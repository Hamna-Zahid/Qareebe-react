import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const ShopProducts = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // grid or list

    // Mock products data
    const products = [
        {
            id: 1,
            name: 'Summer Floral Dress',
            price: 3500,
            originalPrice: 4500,
            image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=400',
            category: 'Women',
            stock: 15,
            sizes: ['S', 'M', 'L', 'XL'],
            isActive: true
        },
        {
            id: 2,
            name: 'Silk Scarf',
            price: 1200,
            image: 'https://images.unsplash.com/photo-1601368156644-d8bc5d290238?q=80&w=400',
            category: 'Accessories',
            stock: 8,
            sizes: ['One Size'],
            isActive: true
        },
        {
            id: 3,
            name: 'Evening Gown',
            price: 8500,
            originalPrice: 12000,
            image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400',
            category: 'Women',
            stock: 3,
            sizes: ['S', 'M', 'L'],
            isActive: true
        },
        {
            id: 4,
            name: 'Denim Jacket',
            price: 2800,
            image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=400',
            category: 'Women',
            stock: 0,
            sizes: ['M', 'L', 'XL'],
            isActive: false
        }
    ];

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Products</h1>
                    <p className="text-gray-500">{products.length} total products</p>
                </div>
                <Button
                    onClick={() => navigate('/shop-owner/products/add')}
                    className="bg-purple-600 hover:bg-purple-700"
                >
                    <Plus size={20} className="mr-2" />
                    Add Product
                </Button>
            </div>

            {/* Search & View Toggle */}
            <div className="flex gap-3">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div className="flex gap-2 bg-white border border-gray-200 rounded-xl p-1">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`px-3 py-2 rounded-lg text-sm ${viewMode === 'grid' ? 'bg-purple-100 text-purple-700' : 'text-gray-600'}`}
                    >
                        Grid
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`px-3 py-2 rounded-lg text-sm ${viewMode === 'list' ? 'bg-purple-100 text-purple-700' : 'text-gray-600'}`}
                    >
                        List
                    </button>
                </div>
            </div>

            {/* Products Grid */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                {product.stock === 0 && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            Out of Stock
                                        </span>
                                    </div>
                                )}
                                {product.stock > 0 && product.stock < 5 && (
                                    <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                                        Low Stock
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 mb-1 truncate">{product.name}</h3>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-lg font-bold text-gray-900">PKR {product.price}</span>
                                    {product.originalPrice && (
                                        <span className="text-sm text-gray-400 line-through">PKR {product.originalPrice}</span>
                                    )}
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                    <span>Stock: {product.stock}</span>
                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{product.category}</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <Edit size={14} className="mr-1" />
                                        Edit
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                                        <Trash2 size={14} />
                                    </Button>
                                    <Button variant="outline" size="sm" className={product.isActive ? 'text-gray-600' : 'text-green-600'}>
                                        {product.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* List View */
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left p-4 text-sm font-medium text-gray-700">Product</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-700">Category</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-700">Price</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-700">Stock</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-700">Status</th>
                                <th className="text-right p-4 text-sm font-medium text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredProducts.map(product => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                                            <span className="font-medium text-gray-900">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">{product.category}</td>
                                    <td className="p-4">
                                        <div>
                                            <span className="font-semibold text-gray-900">PKR {product.price}</span>
                                            {product.originalPrice && (
                                                <span className="text-xs text-gray-400 line-through ml-2">PKR {product.originalPrice}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`text-sm ${product.stock === 0 ? 'text-red-600 font-medium' : product.stock < 5 ? 'text-orange-600' : 'text-gray-600'}`}>
                                            {product.stock} units
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                            {product.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2 justify-end">
                                            <Button variant="outline" size="sm">
                                                <Edit size={14} />
                                            </Button>
                                            <Button variant="outline" size="sm" className="text-red-600 border-red-200">
                                                <Trash2 size={14} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {filteredProducts.length === 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-500 mb-4">Try adjusting your search</p>
                </div>
            )}
        </div>
    );
};

export default ShopProducts;

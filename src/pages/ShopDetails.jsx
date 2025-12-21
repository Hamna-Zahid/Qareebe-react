import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, MapPin, Search } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { SHOPS, POPULAR_PRODUCTS } from '../data/mock';
import { useCart } from '../context/CartContext';

const ShopDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addToCart } = useCart();
    const shop = SHOPS.find(s => s.id === parseInt(id)) || SHOPS[0];

    // Filter products for this shop
    const shopProducts = POPULAR_PRODUCTS.filter(p => p.shopId === shop.id);

    const [activeTab, setActiveTab] = useState('new'); // new, sale, all

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header Image */}
            <div className="relative h-48 w-full">
                <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-sm border border-white/30"
                >
                    <ArrowLeft size={20} />
                </button>
            </div>

            {/* Shop Info */}
            <div className="bg-white rounded-t-3xl -mt-6 relative px-6 py-6 shadow-sm z-10">
                <div className="flex justify-between items-start mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">{shop.name}</h1>
                    <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded text-sm font-bold text-green-700">
                        <span>{shop.rating}</span>
                        <Star size={12} className="fill-current" />
                    </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                        <Clock size={14} className="text-brand-pink" />
                        <span>{shop.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-brand-pink" />
                        <span>{shop.location}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {shop.tags.map(tag => (
                        <span key={tag} className="text-xs bg-brand-light text-brand-dark px-3 py-1 rounded-full font-medium">
                            {tag}
                        </span>
                    ))}
                </div>

                <Input
                    icon={Search}
                    placeholder={`Search in ${shop.name}...`}
                    className="bg-gray-50 border-0"
                />
            </div>

            {/* Catalogue */}
            <div className="p-6">
                {/* Tabs */}
                <div className="flex gap-4 mb-6 border-b border-gray-100 pb-1">
                    {['new', 'sale', 'all'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 text-sm font-bold capitalize transition-colors ${activeTab === tab ? 'text-brand-pink border-b-2 border-brand-pink' : 'text-gray-400'}`}
                        >
                            {tab === 'new' ? 'New Arrivals' : tab}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {shopProducts.length > 0 ? (
                        shopProducts.map(product => (
                            <div
                                key={product.id}
                                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 p-2 cursor-pointer transition-transform hover:-translate-y-1"
                                onClick={() => navigate(`/product/${product.id}`)}
                            >
                                <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-2 overflow-hidden">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <h4 className="font-medium text-sm line-clamp-1">{product.name}</h4>
                                <div className="flex justify-between items-center mt-1">
                                    <div>
                                        <span className="font-bold text-sm block">Rs. {product.price}</span>
                                        {product.originalPrice && <span className="text-[10px] text-gray-400 line-through">Rs. {product.originalPrice}</span>}
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addToCart(product, 'M', 1);
                                            // Simple feedback could be added here
                                        }}
                                        className="w-6 h-6 bg-brand-pink text-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform active:scale-90"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-2 text-center text-gray-400 py-10">
                            No products found in this category.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShopDetails;

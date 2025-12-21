import React, { useState } from 'react';
import { ArrowLeft, Heart, Share2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { POPULAR_PRODUCTS, SHOPS } from '../data/mock';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const product = POPULAR_PRODUCTS.find(p => p.id === parseInt(id)) || POPULAR_PRODUCTS[0];
    const shop = SHOPS.find(s => s.id === product.shopId) || SHOPS[0];
    const { addToCart } = useCart();

    const [selectedSize, setSelectedSize] = useState('M');
    const [quantity, setQuantity] = useState(1);
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];

    // State for temporary feedback
    const [addedToCart, setAddedToCart] = useState(false);

    const handleAddToCart = (qty = 1) => {
        addToCart(product, selectedSize, qty);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    return (
        <div className="bg-white min-h-screen flex flex-col relative max-w-md mx-auto shadow-2xl">
            {/* Image Carousel */}
            <div className="relative h-[45vh] bg-gray-100 group">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                {/* Header Actions */}
                <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-gray-800 shadow-sm"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-gray-800 shadow-sm">
                            <Share2 size={20} />
                        </button>
                        <button className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-brand-pink shadow-sm">
                            <Heart size={20} className="fill-current" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 bg-white rounded-t-3xl -mt-8 relative z-10 px-6 py-8 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">{product.name}</h1>
                        <p className="text-sm text-gray-500 font-medium">{shop.name}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-brand-pink">Rs. {product.price}</div>
                        {product.originalPrice && (
                            <div className="text-sm text-gray-400 line-through">Rs. {product.originalPrice}</div>
                        )}
                    </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                    <div className="flex text-yellow-400 text-sm">★★★★★</div>
                    <span className="text-xs text-gray-400">(45 reviews)</span>
                </div>

                {/* Size Selector */}
                <div className="mb-8">
                    <h3 className="font-bold text-gray-900 mb-3">Select Size</h3>
                    <div className="flex gap-3">
                        {sizes.map(size => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${selectedSize === size
                                    ? 'bg-brand-pink text-white shadow-lg shadow-brand-pink/30 scale-105'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <div className="mb-8 flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">Description</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Elegant and comfortable design perfect for the summer season. Made with high-quality breathable fabric to keep you cool and stylish. Supports local craftsmanship.
                    </p>
                </div>

                {/* Bottom Action */}
                <div className="flex gap-4 items-center pt-4 border-t border-gray-100 relative">
                    {/* Feedback Toast */}
                    {addedToCart && (
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-sm px-4 py-2 rounded-full shadow-lg animate-fade-in-up">
                            Added to Cart!
                        </div>
                    )}

                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-2 px-3">
                        <button
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 active:scale-95"
                        >
                            <Minus size={16} />
                        </button>
                        <span className="font-bold w-4 text-center">{quantity}</span>
                        <button
                            onClick={() => setQuantity(q => q + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 active:scale-95"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                    <Button className="flex-1 h-14 text-base shadow-xl shadow-brand-pink/20" onClick={() => handleAddToCart(quantity)}>
                        <ShoppingBag className="mr-2" size={20} />
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

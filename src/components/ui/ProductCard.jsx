import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useCart } from '../../context/CartContext';

export const ProductCard = ({ product, className }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = React.useState(false);

    const handleCardClick = () => {
        navigate(`/product/${product.id}`);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product, 'M', 1); // Default size M, qty 1
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1500);
    };

    return (
        <div
            onClick={handleCardClick}
            className={cn("bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 w-36 flex-shrink-0 snap-start cursor-pointer", className)}
        >
            <div className="relative aspect-[3/4] w-full bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
                <button
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className={cn(
                        "absolute bottom-2 right-2 w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all duration-300",
                        isAdded
                            ? "bg-green-500 text-white scale-110"
                            : "bg-white text-brand-pink hover:bg-brand-pink hover:text-white"
                    )}
                >
                    {isAdded ? <Check size={18} /> : <Plus size={18} />}
                </button>
            </div>
            <div className="p-2">
                <h4 className="text-xs font-medium text-gray-700 line-clamp-1 mb-1">{product.name}</h4>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-brand-dark">Rs. {product.price}</span>
                    {product.originalPrice && (
                        <span className="text-[10px] text-gray-400 line-through">Rs. {product.originalPrice}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

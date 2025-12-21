import { useNavigate } from 'react-router-dom';
import { Star, Clock, MapPin } from 'lucide-react';
import { cn } from '../../lib/utils';

export const ShopCard = ({ shop, className, ...props }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/shop/${shop.id}`)}
            className={cn("bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer", className)}
            {...props}
        >
            <div className="relative h-32 w-full">
                <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-xs font-semibold shadow-sm">
                    <Clock size={12} className="text-brand-pink" />
                    <span>{shop.deliveryTime}</span>
                </div>
            </div>
            <div className="p-3">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-800 line-clamp-1">{shop.name}</h3>
                    <div className="flex items-center gap-1 bg-green-50 px-1.5 py-0.5 rounded text-xs font-bold text-green-700">
                        <span>{shop.rating}</span>
                        <Star size={10} className="fill-current" />
                    </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                    <MapPin size={12} />
                    <span>{shop.location}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                    {shop.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] bg-brand-light text-brand-dark px-2 py-0.5 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

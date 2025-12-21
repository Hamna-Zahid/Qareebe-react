import React from 'react';
import { Search, Flame } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { ProductCard } from '../components/ui/ProductCard';
import { POPULAR_PRODUCTS } from '../data/mock';

const Explore = () => {
    // In a real app, we might have a specific "hot selling" list or filter
    const hotProducts = POPULAR_PRODUCTS;

    return (
        <div className="pb-24 space-y-6">
            <div className="px-6 pt-6 sticky top-0 bg-white z-40 pb-4 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <Flame className="text-brand-pink fill-brand-pink" size={24} />
                    <h1 className="text-2xl font-bold">Explore</h1>
                </div>
                <Input
                    icon={Search}
                    placeholder="Search hot selling items..."
                    className="shadow-sm border-0 bg-gray-50"
                />
            </div>

            <div className="px-6">
                <h2 className="text-lg font-bold mb-4 text-gray-800">Hot Selling</h2>
                <div className="grid grid-cols-2 gap-4">
                    {hotProducts.map(product => (
                        <div key={product.id} className="w-full">
                            {/* Reusing ProductCard but overriding width for grid layout if needed, 
                               though ProductCard has fixed w-36. 
                               Let's allow it to be flexible or wrap it. 
                               ProductCard has w-36 className by default. 
                               We should probably override it to w-full for grid. */}
                            <ProductCard product={product} className="w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Explore;

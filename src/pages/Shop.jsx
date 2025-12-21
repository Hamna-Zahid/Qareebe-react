import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { ShopCard } from '../components/ui/ShopCard';
import { SHOPS } from '../data/mock';

const Shop = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const filteredShops = SHOPS.filter(shop =>
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="pb-24 space-y-6">
            <div className="px-6 pt-6 sticky top-0 bg-white z-40 pb-4 shadow-sm">
                <h1 className="text-2xl font-bold mb-4">Shops</h1>
                <div className="flex gap-2">
                    <Input
                        icon={Search}
                        placeholder="Search shops..."
                        className="shadow-sm border-0 bg-gray-50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="w-11 h-11 bg-brand-light rounded-xl flex items-center justify-center text-brand-pink flex-shrink-0">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            <div className="px-6 grid gap-4">
                {filteredShops.length > 0 ? (
                    filteredShops.map(shop => (
                        <ShopCard key={shop.id} shop={shop} />
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-400">
                        <p>No shops found matching "{searchQuery}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;

import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ShopCard } from '../components/ui/ShopCard';
import { ProductCard } from '../components/ui/ProductCard';
import { CATEGORIES, SHOPS, POPULAR_PRODUCTS } from '../data/mock';

const Home = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

    return (
        <div className="pb-24 space-y-6">
            {/* Header */}
            <div className="px-6 pt-6 flex justify-between items-center bg-white sticky top-0 z-40 pb-4 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-brand-pink tracking-tight">Qareebe</h1>
                    <p className="text-xs text-gray-500 font-medium">Delivering to <span className="text-brand-dark underline decoration-brand-pink/50">DHA Phase 6</span></p>
                </div>
                <div className="w-10 h-10 bg-brand-light rounded-full flex items-center justify-center text-xl font-bold text-brand-pink shadow-inner border border-white">
                    Q
                </div>
            </div>

            {/* Search */}
            <div className="px-6">
                <Input
                    icon={Search}
                    placeholder="Search for clothes, shops..."
                    className="shadow-sm border-0 bg-white ring-1 ring-gray-100"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {searchQuery ? (
                <div className="px-6 space-y-6">
                    <div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Results</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {POPULAR_PRODUCTS
                                .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                .map(product => (
                                    <ProductCard key={product.id} product={product} className="w-full" />
                                ))}
                        </div>
                        {POPULAR_PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                            <div className="text-center py-10 text-gray-400">
                                <p>No products found matching "{searchQuery}"</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    {/* Banner */}
                    <div className="px-6">
                        <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-brand-pink/30 h-48">
                            <img src="https://images.unsplash.com/photo-1596462502278-27bfdd403c48?q=80&w=2070&auto=format&fit=crop" alt="Summer Sale" className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-pink/90 to-transparent"></div>

                            <div className="relative z-10 p-6 h-full flex flex-col justify-center text-white">
                                <div>
                                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold mb-3 backdrop-blur-sm">LIMITED OFFER</span>
                                    <h2 className="text-3xl font-bold mb-1">Summer Sale</h2>
                                    <p className="opacity-90 mb-6 text-sm max-w-[60%]">Up to 50% off on premium brands.</p>
                                    <Button className="bg-white text-brand-pink hover:bg-gray-50 shadow-sm border-0 h-10 px-6 font-bold text-sm">Explore Now</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="pl-6">
                        <h3 className="text-lg font-bold mb-4 text-gray-800">Categories</h3>
                        <div className="flex gap-3 overflow-x-auto pb-4 pr-6 hide-scrollbar snap-x">
                            {CATEGORIES.map(cat => (
                                <button key={cat.id} className="min-w-[80px] bg-white p-3 rounded-2xl flex flex-col items-center gap-2 border border-blue-50/50 shadow-sm snap-start active:scale-95 transition-transform">
                                    <div className="w-10 h-10 bg-brand-light rounded-full flex items-center justify-center text-brand-pink">
                                        {/* Placeholder for Icon */}
                                        <div className="w-5 h-5 bg-current rounded-sm opacity-20"></div>
                                    </div>
                                    <span className="text-xs font-medium text-gray-600">{cat.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Popular Products */}
                    <div className="pl-6">
                        <div className="flex justify-between items-center pr-6 mb-4">
                            <h3 className="text-lg font-bold text-gray-800">Popular Now</h3>
                            <button className="text-xs text-brand-pink font-semibold">See All</button>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-4 pr-6 hide-scrollbar snap-x">
                            {POPULAR_PRODUCTS.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>

                    {/* Featured Shops */}
                    <div className="px-6">
                        <h3 className="text-lg font-bold mb-4 text-gray-800">Nearby Shops</h3>
                        <div className="grid gap-4">
                            {SHOPS.map(shop => (
                                <ShopCard key={shop.id} shop={shop} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;

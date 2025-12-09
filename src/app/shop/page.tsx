'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProductStore } from '@/store/product-store';
import ProductCard from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';
import { SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

// Client Component for SearchParams
function ShopContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');
    const products = useProductStore((state) => state.products);

    const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'All');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
    const [sortOption, setSortOption] = useState('newest');
    const [showFilters, setShowFilters] = useState(false);

    // Filter Logic
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
            const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
            return categoryMatch && priceMatch;
        }).sort((a, b) => {
            if (sortOption === 'price-low') return a.price - b.price;
            if (sortOption === 'price-high') return b.price - a.price;
            return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0); // newest first
        });
    }, [selectedCategory, priceRange, sortOption]);

    const categories = ['All', 'Women', 'Men', 'Accessories'];
    const sortOptions = [
        { name: 'Newest Arrivals', value: 'newest' },
        { name: 'Price: Low to High', value: 'price-low' },
        { name: 'Price: High to Low', value: 'price-high' },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-primary mb-2">Shop Collection</h1>
                    <p className="text-muted-foreground"> {filteredProducts.length} items found</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <Button variant="outline" className="md:hidden flex-1" onClick={() => setShowFilters(!showFilters)}>
                        <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
                    </Button>

                    <Menu as="div" className="relative inline-block text-left z-10">
                        <Menu.Button as={Button} variant="ghost" className="group text-sm font-medium text-foreground">
                            Sort
                            <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground group-hover:text-foreground" aria-hidden="true" />
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    {sortOptions.map((option) => (
                                        <Menu.Item key={option.value}>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => setSortOption(option.value)}
                                                    className={cn(
                                                        active ? 'bg-muted' : '',
                                                        sortOption === option.value ? 'font-medium text-primary' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm w-full text-left flex justify-between'
                                                    )}
                                                >
                                                    {option.name}
                                                    {sortOption === option.value && <Check className="w-4 h-4" />}
                                                </button>
                                            )}
                                        </Menu.Item>
                                    ))}
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Sidebar */}
                <div className={cn("lg:w-64 space-y-8", showFilters ? "block" : "hidden lg:block")}>
                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-medium text-primary mb-4">Category</h3>
                        <div className="space-y-2">
                            {categories.map((cat) => (
                                <div key={cat} className="flex items-center">
                                    <button
                                        onClick={() => setSelectedCategory(cat)}
                                        className={cn(
                                            "text-sm hover:text-primary transition-colors",
                                            selectedCategory === cat ? "text-primary font-bold underline" : "text-muted-foreground"
                                        )}
                                    >
                                        {cat}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div>
                        <h3 className="text-lg font-medium text-primary mb-4">Price</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm text-foreground">
                                <span>₹{priceRange[0]}</span>
                                <span>₹{priceRange[1]}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="50000"
                                step="1000"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="flex-1">
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-muted/30 rounded-lg">
                            <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
                            <Button variant="link" onClick={() => {
                                setSelectedCategory('All');
                                setPriceRange([0, 50000]);
                            }}>
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Shop() {
    return (
        <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center">Loading shop...</div>}>
            <ShopContent />
        </Suspense>
    );
}

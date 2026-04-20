'use client';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, ChevronDown, X, Grid3X3, LayoutList } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import QuickViewModal from '@/components/product/QuickViewModal';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { Product, SortOption } from '@/types';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38', '40', '42', '44'];
const COLORS = ['White', 'Black', 'Forest Green', 'Sky Blue', 'Cream', 'Earth Brown', 'Olive', 'Navy', 'Ecru', 'Charcoal'];
const FABRICS = ['Cotton', 'Linen', 'Wool', 'Polyester', 'Elastane'];

export default function ShopClient({ initialCategory }: { initialCategory?: string }) {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category') || searchParams.get('q') || initialCategory || null;
    const saleParam = searchParams.get('sale') === 'true';

    const [sort, setSort] = useState<SortOption>('popular');
    const [filterOpen, setFilterOpen] = useState(false);
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Filter state
    const [selCats, setSelCats] = useState<string[]>(categoryParam ? [categoryParam] : []);
    const [selSizes, setSelSizes] = useState<string[]>([]);
    const [selColors, setSelColors] = useState<string[]>([]);
    const [selFabs, setSelFabs] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
    const [saleOnly, setSaleOnly] = useState(saleParam);

    const toggle = (arr: string[], set: (v: string[]) => void, val: string) => {
        set(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
    };

    const filteredProducts = useMemo(() => {
        let prods = [...PRODUCTS];

        if (saleOnly) prods = prods.filter(p => p.isOnSale);
        if (selCats.length) prods = prods.filter(p => selCats.some(c => p.category.toLowerCase() === c.toLowerCase() || p.collection.toLowerCase() === c.toLowerCase()));
        if (selSizes.length) prods = prods.filter(p => p.variants.some(v => selSizes.includes(v.size)));
        if (selColors.length) prods = prods.filter(p => p.variants.some(v => selColors.includes(v.color)));
        if (selFabs.length) prods = prods.filter(p => selFabs.some(f => p.fabric.toLowerCase().includes(f.toLowerCase())));
        prods = prods.filter(p => {
            const price = Math.round(p.basePrice * (1 - p.discountPercentage / 100));
            return price >= priceRange[0] && price <= priceRange[1];
        });

        switch (sort) {
            case 'newest': return prods.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
            case 'price-asc': return prods.sort((a, b) => a.basePrice * (1 - a.discountPercentage / 100) - b.basePrice * (1 - b.discountPercentage / 100));
            case 'price-desc': return prods.sort((a, b) => b.basePrice * (1 - b.discountPercentage / 100) - a.basePrice * (1 - a.discountPercentage / 100));
            default: return prods.sort((a, b) => b.reviewCount - a.reviewCount);
        }
    }, [selCats, selSizes, selColors, selFabs, priceRange, saleOnly, sort]);

    const activeFilterCount = selCats.length + selSizes.length + selColors.length + selFabs.length + (saleOnly ? 1 : 0);
    const clearAll = () => { setSelCats([]); setSelSizes([]); setSelColors([]); setSelFabs([]); setPriceRange([0, 30000]); setSaleOnly(false); };

    const FilterCheckbox = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => (
        <label className="flex items-center gap-2 cursor-pointer group">
            <div
                onClick={onChange}
                className={`w-4 h-4 border flex items-center justify-center transition-colors ${checked ? 'border-[var(--forest-green)] bg-[var(--forest-green)]' : 'border-[var(--border-light)] group-hover:border-[var(--forest-green)]'}`}
            >
                {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>}
            </div>
            <span className="text-sm font-sans select-none">{label}</span>
        </label>
    );

    return (
        <div className="min-h-screen">
            {/* Page Header */}
            <div className="text-center py-12" style={{ background: 'var(--cream)' }}>
                <p className="text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--soft-gold)' }}>
                    Explore
                </p>
                <h1 className="font-serif text-4xl md:text-5xl">Our Collection</h1>
                <p className="text-sm font-sans mt-3" style={{ color: 'var(--text-muted)' }}>
                    {filteredProducts.length} styles
                </p>
            </div>

            {/* Controls bar */}
            <div className="sticky top-20 z-40 bg-white" style={{ borderBottom: '1px solid var(--border-light)' }}>
                <div className="container-xl py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setFilterOpen(!filterOpen)}
                            className="flex items-center gap-2 text-sm font-sans font-medium hover:text-[var(--forest-green)] transition-colors"
                        >
                            <SlidersHorizontal size={16} />
                            Filters
                            {activeFilterCount > 0 && (
                                <span className="w-5 h-5 rounded-full text-white text-xs flex items-center justify-center" style={{ background: 'var(--forest-green)' }}>
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>
                        {activeFilterCount > 0 && (
                            <button onClick={clearAll} className="text-xs font-sans underline" style={{ color: 'var(--text-muted)' }}>
                                Clear all
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {/* View mode */}
                        <div className="hidden sm:flex border" style={{ borderColor: 'var(--border-light)' }}>
                            <button
                                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[var(--forest-green)] text-white' : 'hover:bg-[var(--cream)]'}`}
                                onClick={() => setViewMode('grid')}
                            >
                                <Grid3X3 size={15} />
                            </button>
                            <button
                                className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-[var(--forest-green)] text-white' : 'hover:bg-[var(--cream)]'}`}
                                onClick={() => setViewMode('list')}
                            >
                                <LayoutList size={15} />
                            </button>
                        </div>

                        {/* Sort */}
                        <div className="relative">
                            <select
                                value={sort}
                                onChange={e => setSort(e.target.value as SortOption)}
                                className="appearance-none pl-3 pr-8 py-2 text-xs font-sans border outline-none cursor-pointer"
                                style={{ borderColor: 'var(--border-light)' }}
                            >
                                <option value="popular">Most Popular</option>
                                <option value="newest">Newest First</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                            </select>
                            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-xl py-8">
                <div className="flex gap-8">
                    {/* Filter Sidebar */}
                    <aside
                        className="flex-shrink-0 transition-all duration-300 overflow-hidden"
                        style={{ width: filterOpen ? '240px' : '0', opacity: filterOpen ? 1 : 0 }}
                    >
                        <div style={{ width: '240px', paddingRight: '2rem' }}>
                            <div className="space-y-7">
                                {/* Category */}
                                <div>
                                    <h3 className="text-xs font-sans font-semibold tracking-widest uppercase mb-3">Category</h3>
                                    <div className="space-y-2">
                                        {CATEGORIES.map(c => (
                                            <FilterCheckbox
                                                key={c.id}
                                                label={`${c.name} (${c.count})`}
                                                checked={selCats.includes(c.name)}
                                                onChange={() => toggle(selCats, setSelCats, c.name)}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Size */}
                                <div>
                                    <h3 className="text-xs font-sans font-semibold tracking-widest uppercase mb-3">Size</h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {SIZES.map(sz => (
                                            <button
                                                key={sz}
                                                onClick={() => toggle(selSizes, setSelSizes, sz)}
                                                className={`size-option w-auto px-3 h-8 text-xs ${selSizes.includes(sz) ? 'active' : ''}`}
                                            >
                                                {sz}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Color */}
                                <div>
                                    <h3 className="text-xs font-sans font-semibold tracking-widest uppercase mb-3">Colour</h3>
                                    <div className="space-y-2">
                                        {COLORS.map(c => (
                                            <FilterCheckbox
                                                key={c}
                                                label={c}
                                                checked={selColors.includes(c)}
                                                onChange={() => toggle(selColors, setSelColors, c)}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Price */}
                                <div>
                                    <h3 className="text-xs font-sans font-semibold tracking-widest uppercase mb-3">
                                        Price: ₹{priceRange[0].toLocaleString('en-IN')} – ₹{priceRange[1].toLocaleString('en-IN')}
                                    </h3>
                                    <input
                                        type="range"
                                        min={0}
                                        max={30000}
                                        step={500}
                                        value={priceRange[1]}
                                        onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                                        className="w-full accent-[var(--forest-green)]"
                                    />
                                </div>

                                {/* Fabric */}
                                <div>
                                    <h3 className="text-xs font-sans font-semibold tracking-widest uppercase mb-3">Fabric</h3>
                                    <div className="space-y-2">
                                        {FABRICS.map(f => (
                                            <FilterCheckbox
                                                key={f}
                                                label={f}
                                                checked={selFabs.includes(f)}
                                                onChange={() => toggle(selFabs, setSelFabs, f)}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Sale only */}
                                <div>
                                    <FilterCheckbox label="Sale Items Only" checked={saleOnly} onChange={() => setSaleOnly(v => !v)} />
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1 min-w-0">
                        {/* Active filters chips */}
                        {activeFilterCount > 0 && (
                            <div className="flex flex-wrap gap-2 mb-5">
                                {[...selCats, ...selSizes, ...selColors, ...selFabs, ...(saleOnly ? ['Sale'] : [])].map(f => (
                                    <span
                                        key={f}
                                        className="flex items-center gap-1.5 px-3 py-1 text-xs font-sans rounded-full"
                                        style={{ background: 'var(--cream)', border: '1px solid var(--border-light)' }}
                                    >
                                        {f}
                                        <X size={11} className="cursor-pointer hover:text-red-600" onClick={() => {
                                            if (selCats.includes(f)) toggle(selCats, setSelCats, f);
                                            if (selSizes.includes(f)) toggle(selSizes, setSelSizes, f);
                                            if (selColors.includes(f)) toggle(selColors, setSelColors, f);
                                            if (selFabs.includes(f)) toggle(selFabs, setSelFabs, f);
                                            if (f === 'Sale') setSaleOnly(false);
                                        }} />
                                    </span>
                                ))}
                            </div>
                        )}

                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="font-serif text-3xl mb-3">No Results Found</p>
                                <p className="text-sm font-sans mb-6" style={{ color: 'var(--text-muted)' }}>
                                    Try adjusting your filters.
                                </p>
                                <button onClick={clearAll} className="btn-secondary text-xs">Clear Filters</button>
                            </div>
                        ) : (
                            <div className={`grid gap-4 md:gap-6 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {quickViewProduct && (
                <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
            )}
        </div>
    );
}

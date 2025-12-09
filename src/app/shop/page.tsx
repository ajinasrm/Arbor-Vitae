import { Suspense } from 'react';
import { products } from '@/lib/products';
import ProductCard from '@/components/ui/ProductCard';
import ShopFilters from '@/components/shop/ShopFilters';
import { Button } from '@/components/ui/Button';
import { SlidersHorizontal } from 'lucide-react';

// This is a Server Component that receives searchParams prop
export default function ShopPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
    const subCategory = typeof searchParams.subCategory === 'string' ? searchParams.subCategory : undefined;
    const size = typeof searchParams.size === 'string' ? searchParams.size : undefined;
    // const sort = typeof searchParams.sort === 'string' ? searchParams.sort : undefined;

    // Filter Logic
    let filteredProducts = products;

    if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    if (subCategory) {
        filteredProducts = filteredProducts.filter(p => p.subCategory === subCategory);
    }
    if (size) {
        filteredProducts = filteredProducts.filter(p => p.sizes.includes(size));
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-baseline justify-between border-b border-border pb-6">
                <h1 className="text-4xl font-serif font-bold tracking-tight text-primary">Shop Collection</h1>
                <div className="flex items-center">
                    {/* Sort could go here */}
                    <span className="text-sm text-muted-foreground mr-4">{filteredProducts.length} Results</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 pt-12">
                {/* Filters Desktop */}
                <div className="hidden lg:block">
                    <Suspense>
                        <ShopFilters />
                    </Suspense>
                </div>

                {/* Filters Mobile (Simplified placeholder) */}
                <div className="lg:hidden mb-6">
                    {/* In a real app, this would be a Drawer/Sheet */}
                    <details className="group">
                        <summary className="flex items-center justify-between font-medium text-foreground cursor-pointer list-none">
                            <span>Filter Products</span>
                            <span className="transition group-open:rotate-180">
                                <SlidersHorizontal className="h-4 w-4" />
                            </span>
                        </summary>
                        <div className="mt-4">
                            <Suspense>
                                <ShopFilters />
                            </Suspense>
                        </div>
                    </details>
                </div>

                {/* Product Grid */}
                <div className="lg:col-span-3">
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground text-lg">No products found matching your filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

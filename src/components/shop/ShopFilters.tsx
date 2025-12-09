'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const categories = ['Women', 'Men', 'Accessories'];
const subCategories = ['Tops', 'Bottoms', 'Outerwear', 'Bags', 'Scarves'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'One Size'];

export default function ShopFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Helper to create new search params string
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            if (params.get(name) === value) {
                params.delete(name); // Toggle off if clicked again
            } else {
                params.set(name, value)
            }
            return params.toString()
        },
        [searchParams]
    );

    const currentCategory = searchParams.get('category');
    const currentSubCategory = searchParams.get('subCategory');
    const currentSize = searchParams.get('size');

    return (
        <div className="space-y-8">
            {/* Categories */}
            <div>
                <h3 className="text-lg font-serif font-medium text-foreground">Category</h3>
                <div className="mt-4 space-y-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => router.push(`/shop?${createQueryString('category', category)}`)}
                            className={cn(
                                "block text-sm transition-colors",
                                currentCategory === category ? "font-bold text-primary underline" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sub Categories */}
            <div>
                <h3 className="text-md font-medium text-foreground">Type</h3>
                <div className="mt-4 space-y-2">
                    {subCategories.map((sub) => (
                        <button
                            key={sub}
                            onClick={() => router.push(`/shop?${createQueryString('subCategory', sub)}`)}
                            className={cn(
                                "block text-sm transition-colors",
                                currentSubCategory === sub ? "font-bold text-primary underline" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {sub}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sizes */}
            <div>
                <h3 className="text-md font-medium text-foreground">Size</h3>
                <div className="mt-4 grid grid-cols-3 gap-2">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => router.push(`/shop?${createQueryString('size', size)}`)}
                            className={cn(
                                "flex items-center justify-center rounded-sm border py-2 text-sm transition-all",
                                currentSize === size
                                    ? "border-primary bg-primary text-white"
                                    : "border-input hover:border-foreground text-foreground"
                            )}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {(currentCategory || currentSubCategory || currentSize) && (
                <Button variant="ghost" onClick={() => router.push('/shop')} className="w-full text-muted-foreground hover:text-foreground">
                    Clear Filters
                </Button>
            )}
        </div>
    );
}

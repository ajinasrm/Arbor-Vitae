'use client';

import { useProductStore } from '@/store/product-store';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cart-store';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Check, Truck, Shield, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/ui/ProductCard';

interface Props {
    params: {
        id: string;
    }
}

export default function ProductPage({ params }: Props) {
    const products = useProductStore((state) => state.products);
    // Hydration check or simple finding
    const product = products.find((p) => p.id === params.id);

    const { addItem } = useCartStore();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    // Handle case where product might not be loaded yet or wrong ID
    if (!product && products.length > 0) {
        // Only 404 if products are loaded but this specific one is missing
        // In a real app we'd handle loading state
        notFound();
    }

    if (!product) return <div className="p-20 text-center">Loading product...</div>;

    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mb-20">
                {/* Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Details */}
                <div className="flex flex-col">
                    <div>
                        <p className="text-sm text-accent font-medium tracking-wide mb-2">{product.category} / {product.subCategory}</p>
                        <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">{product.name}</h1>
                        <p className="text-2xl font-medium text-foreground mb-8">₹{product.price.toLocaleString()}</p>
                    </div>

                    <div className="prose prose-sm text-muted-foreground mb-8">
                        <p>{product.description}</p>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-sm font-medium text-foreground mb-4">Size</h3>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={cn(
                                        "flex items-center justify-center rounded-md border py-3 text-sm font-medium transition-all",
                                        selectedSize === size
                                            ? "border-primary bg-primary text-white shadow-sm"
                                            : "border-border bg-white text-foreground hover:bg-muted"
                                    )}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mb-8">
                        <Button
                            size="lg"
                            className="w-full text-lg h-12"
                            disabled={!selectedSize}
                            onClick={() => selectedSize && addItem(product, selectedSize)}
                        >
                            {selectedSize ? "Add to Cart" : "Select a Size"}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">Free shipping on all orders over ₹5,000</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 py-8 border-t border-border">
                        {product.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Check className="h-4 w-4 text-green-600" />
                                {feature}
                            </div>
                        ))}
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
                            <Truck className="h-4 w-4" /> Fast Delivery
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <RotateCcw className="h-4 w-4" /> 30-Day Returns
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="border-t border-border pt-16">
                    <h2 className="text-2xl font-serif font-bold text-primary mb-8 text-center">You Might Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

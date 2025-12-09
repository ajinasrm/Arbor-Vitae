'use client';

import { useState } from 'react';
import Image from 'next/image';
import { products, Product } from '@/lib/products';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cart-store';
import { Check, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/ui/ProductCard';
import { useParams } from 'next/navigation';

export default function ProductPage() {
    const params = useParams();
    const id = params.id as string;
    const product = products.find(p => p.id === id);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const { addItem, openCart } = useCartStore();

    if (!product) {
        return <div className="text-center py-24">Product not found</div>;
    }

    const handleAddToCart = () => {
        if (!selectedSize) return;
        addItem(product, selectedSize);
        openCart();
    };

    // Recommendations logic (simple matching category)
    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="bg-background">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">

                {/* Product Gallery (Left) */}
                <div className="lg:max-w-lg lg:self-end">
                    <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover object-center"
                            priority
                        />
                    </div>
                </div>

                {/* Product Info (Right) */}
                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                    <h1 className="text-3xl font-serif font-bold tracking-tight text-primary">{product.name}</h1>
                    <div className="mt-3">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-foreground">₹{product.price.toLocaleString()}</p>
                    </div>

                    <div className="mt-6">
                        <h3 className="sr-only">Description</h3>
                        <p className="space-y-6 text-base text-muted-foreground">{product.description}</p>
                    </div>

                    <div className="mt-8">
                        <div className="flex items-center gap-2 text-sm text-primary font-medium">
                            <Check className="h-4 w-4" />
                            In stock and ready to ship
                        </div>
                    </div>

                    <form className="mt-6">
                        {/* Size Selector */}
                        <div>
                            <h3 className="text-sm font-medium text-foreground">Size</h3>
                            <div className="mt-2 grid grid-cols-4 gap-4 sm:grid-cols-6">
                                {product.sizes.map((size) => (
                                    <div key={size} className={cn(
                                        "cursor-pointer rounded-md border py-3 px-3 text-center text-sm font-medium hover:bg-muted focus:outline-none sm:flex-1",
                                        selectedSize === size
                                            ? "border-primary bg-primary text-white hover:bg-primary/90"
                                            : "border-border bg-white text-foreground shadow-sm hover:bg-gray-50"
                                    )}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </div>
                                ))}
                            </div>
                            {!selectedSize && <p className="mt-2 text-sm text-red-500">Please select a size</p>}
                        </div>

                        <div className="mt-10 flex">
                            <Button
                                type="button"
                                size="lg"
                                className="flex-1 text-base"
                                onClick={handleAddToCart}
                                disabled={!selectedSize}
                            >
                                Add to bag
                            </Button>
                        </div>

                        <div className="mt-6 flex justify-center text-center">
                            <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                                <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                                    <Truck className="h-6 w-6 text-primary" />
                                    <span>Free shipping on all orders</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                                    <ShieldCheck className="h-6 w-6 text-primary" />
                                    <span>Sustainable Warranty</span>
                                </div>
                            </div>
                        </div>
                    </form>

                    <section aria-labelledby="details-heading" className="mt-12">
                        <h2 id="details-heading" className="sr-only">
                            Additional details
                        </h2>
                        <div className="border-t border-border pt-6">
                            <h3 className="text-sm font-medium text-foreground">Material & Care</h3>
                            <div className="mt-4 prose prose-sm text-muted-foreground">
                                <ul role="list">
                                    {product.features.map((feature) => (
                                        <li key={feature}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8 border-t border-border">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-serif font-bold tracking-tight text-foreground">You Might Also Like</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {relatedProducts.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

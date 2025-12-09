'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cart-store';
import { motion } from 'framer-motion';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCartStore();

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem(product, product.sizes[0]); // Default to first size for quick add
    };

    return (
        <Link href={`/product/${product.id}`} className="group block">
            <motion.div
                className="relative overflow-hidden rounded-md bg-muted aspect-[3/4]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
                {product.isNew && (
                    <span className="absolute left-4 top-4 bg-primary px-3 py-1 text-xs font-medium text-white shadow-sm">
                        New
                    </span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex justify-center">
                    <Button
                        onClick={handleQuickAdd}
                        className="w-full shadow-lg bg-white/90 text-primary hover:bg-white backdrop-blur-sm"
                    >
                        Quick Add
                    </Button>
                </div>
            </motion.div>

            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm font-medium text-foreground">
                        {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
                </div>
                <p className="text-sm font-medium text-foreground">₹{product.price.toLocaleString()}</p>
            </div>
        </Link>
    );
}

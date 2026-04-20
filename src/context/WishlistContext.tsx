'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/types';

interface WishlistContextValue {
    items: Product[];
    isWishlisted: (id: string) => boolean;
    toggle: (product: Product) => void;
    count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<Product[]>([]);

    const isWishlisted = (id: string) => items.some(p => p.id === id);

    const toggle = (product: Product) => {
        setItems(prev =>
            isWishlisted(product.id)
                ? prev.filter(p => p.id !== product.id)
                : [...prev, product]
        );
    };

    return (
        <WishlistContext.Provider value={{ items, isWishlisted, toggle, count: items.length }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const ctx = useContext(WishlistContext);
    if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
    return ctx;
}

import { Suspense } from 'react';
import ShopClient from '@/components/shop/ShopClient';

export const metadata = {
    title: 'Shop All | Arbor Vitae',
    description: 'Browse the full Arbor Vitae collection — premium shirts, blazers, suits, trousers and accessories.',
};

export default function ShopPage() {
    return (
        <Suspense fallback={<div className="text-center py-20 font-serif text-2xl">Loading…</div>}>
            <ShopClient />
        </Suspense>
    );
}

import { Suspense } from 'react';
import ShopClient from '@/components/shop/ShopClient';
import { CATEGORIES } from '@/data/products';

export async function generateStaticParams() {
    return CATEGORIES.map(c => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <Suspense fallback={<div className="text-center py-20 font-serif text-2xl">Loading...</div>}>
      <ShopClient initialCategory={slug} />
    </Suspense>
  );
}

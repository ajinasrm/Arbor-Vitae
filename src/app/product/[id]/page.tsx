import { PRODUCTS } from '@/data/products';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return PRODUCTS.map(p => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return {};
  return {
    title: `${product.name} | Arbor Vitae`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}

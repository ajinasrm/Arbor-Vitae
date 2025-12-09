import Hero from '@/components/home/Hero';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import BrandStory from '@/components/home/BrandStory';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function Home() {
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      <FeaturedCategories />

      {/* New Arrivals Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary">New Arrivals</h2>
              <p className="mt-2 text-muted-foreground">Fresh styles for the season.</p>
            </div>
            <Button variant="ghost" className="hidden sm:flex hover:bg-transparent hover:text-primary gap-1" asChild>
              <Link href="/shop">View all <span aria-hidden="true">&rarr;</span></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 flex justify-center sm:hidden">
            <Button variant="outline" asChild>
              <Link href="/shop">View all New Arrivals</Link>
            </Button>
          </div>
        </div>
      </section>

      <BrandStory />
    </div>
  );
}

'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Star, MapPin, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import QuickViewModal from '@/components/product/QuickViewModal';
import { PRODUCTS, CATEGORIES, COLLECTIONS, TESTIMONIALS, BLOG_POSTS } from '@/data/products';
import { Product } from '@/types';

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const trending = PRODUCTS.filter(p => p.isTrending).slice(0, 4);
  const newArr = PRODUCTS.filter(p => p.isNewArrival).slice(0, 4);
  const bestSell = PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative w-full" style={{ height: 'min(90vh, 800px)' }}>
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=85"
          alt="Arbor Vitae – Forest Luxe Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <div className="max-w-xl">
            <p className="text-xs font-sans font-semibold tracking-[0.35em] uppercase mb-4 animate-fade-in-up" style={{ color: 'var(--soft-gold)', animationDelay: '0.1s' }}>
              New Season
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Born from<br />the Forest
            </h1>
            <p className="text-base md:text-lg font-sans text-white/80 mb-8 max-w-sm animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
              Nature-inspired luxury menswear. Crafted from the finest sustainable fabrics for the discerning modern man.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <Link href="/shop" className="btn-primary">
                Shop the Collection <ArrowRight size={16} />
              </Link>
              <Link href="/shop?collection=forest-luxe" className="btn-secondary" style={{ borderColor: 'white', color: 'white' }}>
                Forest Luxe Lookbook
              </Link>
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-10 bg-white/40" />
          <p className="text-white/40 text-xs font-sans tracking-widest uppercase">Scroll</p>
        </div>
      </section>

      {/* ── CAMPAIGN BANNERS (3 up) ── */}
      <section className="section-padding-sm">
        <div className="container-xl grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              label: 'New Arrivals',
              title: 'Fresh from the Studio',
              image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&q=80',
              href: '/shop?collection=new-arrivals',
            },
            {
              label: 'Summer Edit',
              title: 'Lightweight Luxury',
              image: 'https://images.unsplash.com/photo-1487222099091-7d27e8cbe12c?w=600&q=80',
              href: '/shop?collection=summer-edit',
            },
            {
              label: 'Sale — Up to 30% Off',
              title: 'Don\'t Miss Out',
              image: 'https://images.unsplash.com/photo-1490707958678-a55a12c5f36d?w=600&q=80',
              href: '/shop?sale=true',
            },
          ].map((b) => (
            <Link key={b.label} href={b.href} className="block relative overflow-hidden group" style={{ aspectRatio: '4/3' }}>
              <img
                src={b.image}
                alt={b.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
              />
              <div className="overlay-dark" />
              <div className="absolute bottom-5 left-5">
                <p className="text-xs font-sans font-semibold tracking-widest uppercase mb-1" style={{ color: 'var(--soft-gold)' }}>{b.label}</p>
                <h3 className="font-serif text-2xl text-white">{b.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED CATEGORIES ── */}
      <section className="section-padding" style={{ background: 'var(--cream)' }}>
        <div className="container-xl">
          <div className="text-center mb-10">
            <p className="text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--soft-gold)' }}>Explore</p>
            <h2 className="font-serif text-4xl md:text-5xl">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <Link key={cat.id} href={`/shop/${cat.slug}`} className="group text-center">
                <div className="overflow-hidden rounded-full mx-auto mb-3 w-24 h-24 md:w-28 md:h-28">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <p className="text-xs font-sans font-semibold tracking-widest uppercase">{cat.name}</p>
                <p className="text-xs font-sans mt-0.5" style={{ color: 'var(--text-muted)' }}>{cat.count} styles</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRENDING NOW ── */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-1" style={{ color: 'var(--soft-gold)' }}>What&apos;s Hot</p>
              <h2 className="font-serif text-4xl md:text-5xl">Trending Now</h2>
            </div>
            <Link href="/shop?sort=popular" className="hidden sm:flex items-center gap-1.5 text-xs font-sans font-semibold tracking-widest uppercase hover:text-[var(--forest-green)] transition-colors">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {trending.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL-WIDTH BRAND BANNER ── */}
      <section className="relative" style={{ height: 'min(60vh, 520px)' }}>
        <img
          src="https://images.unsplash.com/photo-1558171813-f3a96b1c4ef6?w=1600&q=80"
          alt="Arbor Vitae — The Art of Dressing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(45,80,22,0.55)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-xs font-sans font-semibold tracking-[0.35em] uppercase mb-3" style={{ color: 'var(--soft-gold)' }}>
            Our Philosophy
          </p>
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-4 max-w-3xl">
            Dress with Intention. Live with Purpose.
          </h2>
          <p className="text-white/75 font-sans text-base max-w-xl mb-8">
            Every Arbor Vitae piece begins in nature — in the forests that inspire us and the soil that sustains us. We craft clothing that connects you to something greater.
          </p>
          <Link href="/about" className="btn-gold text-xs">
            Our Story <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── NEW ARRIVALS ── */}
      <section className="section-padding" style={{ background: 'var(--cream)' }}>
        <div className="container-xl">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-1" style={{ color: 'var(--soft-gold)' }}>Just In</p>
              <h2 className="font-serif text-4xl md:text-5xl">New Arrivals</h2>
            </div>
            <Link href="/shop?collection=new-arrivals" className="hidden sm:flex items-center gap-1.5 text-xs font-sans font-semibold tracking-widest uppercase hover:text-[var(--forest-green)] transition-colors">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {newArr.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SEASONAL COLLECTIONS ── */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="text-center mb-10">
            <p className="text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--soft-gold)' }}>Curated</p>
            <h2 className="font-serif text-4xl md:text-5xl">Our Collections</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COLLECTIONS.map((col) => (
              <Link key={col.id} href={`/shop?collection=${col.slug}`} className="group block">
                <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <img
                    src={col.image}
                    alt={col.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="overlay-dark" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--soft-gold)' }}>
                      Collection
                    </p>
                    <h3 className="font-serif text-3xl text-white mb-2">{col.name}</h3>
                    <p className="text-sm font-sans text-white/75 mb-4">{col.description}</p>
                    <span className="inline-flex items-center gap-1.5 text-white text-sm font-sans font-medium group-hover:gap-3 transition-all duration-200">
                      Explore <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEST SELLERS ── */}
      <section className="section-padding" style={{ background: 'var(--cream)' }}>
        <div className="container-xl">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-1" style={{ color: 'var(--soft-gold)' }}>Fan Favourites</p>
              <h2 className="font-serif text-4xl md:text-5xl">Best Sellers</h2>
            </div>
            <Link href="/shop?sort=popular" className="hidden sm:flex items-center gap-1.5 text-xs font-sans font-semibold tracking-widest uppercase hover:text-[var(--forest-green)] transition-colors">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {bestSell.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* ── LOOKBOOK ── */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="text-center mb-10">
            <p className="text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--soft-gold)' }}>Inspiration</p>
            <h2 className="font-serif text-4xl md:text-5xl">The Lookbook</h2>
            <p className="text-sm font-sans mt-3 max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
              Discover how to style our pieces together. Each look, curated by our creative team.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&q=80',
              'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80',
              'https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=600&q=80',
              'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80',
            ].map((src, i) => (
              <div
                key={i}
                className={`relative overflow-hidden group cursor-pointer ${i === 1 ? 'md:row-span-2' : ''}`}
                style={{ aspectRatio: i === 1 ? '3/5' : '3/4' }}
              >
                <img
                  src={src}
                  alt={`Lookbook ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white text-xs font-sans font-semibold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5">
                    <Play size={14} fill="white" /> View Look
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND STORY ── */}
      <section className="section-padding" style={{ background: 'var(--cream)' }}>
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80"
                alt="Arbor Vitae Brand Story — The Forest"
                className="w-full object-cover"
                style={{ aspectRatio: '4/5' }}
              />
              <div className="absolute -bottom-6 -right-6 hidden lg:block p-8 text-white shadow-xl" style={{ background: 'var(--forest-green)', maxWidth: '260px' }}>
                <p className="font-serif text-3xl mb-1">2018</p>
                <p className="text-xs font-sans leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>Founded in Coorg, the Coffee Capital of India</p>
              </div>
            </div>
            <div className="lg:pl-12">
              <p className="text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--soft-gold)' }}>Our Story</p>
              <h2 className="font-serif text-4xl md:text-5xl mb-6">The Tree of Life</h2>
              <p className="font-sans text-base leading-relaxed mb-4 text-charcoal/80">
                Arbor Vitae — Latin for "Tree of Life" — was born in the misty coffee plantations of Coorg in 2018. Our founders, avid naturalists and lovers of fine clothing, believed that the best fashion, like nature, is both timeless and sustainable.
              </p>
              <p className="font-sans text-base leading-relaxed mb-8 text-charcoal/80">
                Today, we source organic cotton from Gujarat, linen from Belgium, and wool from the Italian highlands — and craft every garment with the patience and precision of a master arborist tending to a rare tree.
              </p>
              <Link href="/about" className="btn-secondary">
                Read Our Full Story <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="text-center mb-12">
            <p className="text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--soft-gold)' }}>Reviews</p>
            <h2 className="font-serif text-4xl md:text-5xl">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="p-8 relative" style={{ background: 'var(--cream)', borderLeft: `3px solid var(--soft-gold)` }}>
                <div className="stars mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="font-sans text-sm leading-relaxed mb-6 italic" style={{ color: 'var(--text-muted)' }}>
                  &ldquo;{t.body}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-sans font-semibold">{t.name}</p>
                    <p className="text-xs font-sans" style={{ color: 'var(--text-muted)' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM FEED ── */}
      <section className="section-padding-sm" style={{ background: 'var(--cream)' }}>
        <div className="container-xl">
          <div className="text-center mb-8">
            <p className="text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-1" style={{ color: 'var(--soft-gold)' }}>Follow us</p>
            <h2 className="font-serif text-3xl">@arborvitae.in</h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {[
              'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400&q=80',
              'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&q=80',
              'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80',
              'https://images.unsplash.com/photo-1602810316693-3667c854239a?w=400&q=80',
              'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80',
              'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
            ].map((src, i) => (
              <a key={i} href="https://instagram.com" target="_blank" rel="noreferrer" className="block overflow-hidden group relative" style={{ aspectRatio: '1/1' }}>
                <img
                  src={src}
                  alt={`Instagram post ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[var(--forest-green)]/0 group-hover:bg-[var(--forest-green)]/35 transition-colors duration-300" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-1" style={{ color: 'var(--soft-gold)' }}>Insights</p>
              <h2 className="font-serif text-4xl md:text-5xl">From the Journal</h2>
            </div>
            <Link href="/blog" className="hidden sm:flex items-center gap-1.5 text-xs font-sans font-semibold tracking-widest uppercase hover:text-[var(--forest-green)] transition-colors">
              All Articles <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <div className="overflow-hidden mb-4" style={{ aspectRatio: '16/9' }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="text-xs font-sans font-semibold tracking-widest uppercase" style={{ color: 'var(--soft-gold)' }}>
                  {post.category}
                </span>
                <h3 className="font-serif text-xl mt-1.5 mb-2 group-hover:text-[var(--forest-green)] transition-colors duration-200">
                  {post.title}
                </h3>
                <p className="text-sm font-sans leading-relaxed mb-3 text-charcoal/70">
                  {post.excerpt}
                </p>
                <p className="text-xs font-sans text-charcoal/50">
                  {post.date} · {post.readTime}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORE LOCATOR STRIP ── */}
      <section className="py-16 border-t" style={{ background: 'var(--cream)', borderColor: 'var(--border-light)' }}>
        <div className="container-xl flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white border border-forest-green/10 shadow-sm">
              <MapPin size={28} style={{ color: 'var(--forest-green)' }} />
            </div>
            <div>
              <h3 className="font-serif text-3xl text-[var(--forest-green)]">Visit a Store</h3>
              <p className="text-sm font-sans mt-1 text-charcoal/60 max-w-md">
                Experience the craftsmanship and feel the textures of our collection in-person at our premium flagship stores.
              </p>
            </div>
          </div>
          <Link href="/stores" className="btn-primary flex-shrink-0 bg-[var(--forest-green)] text-white hover:bg-forest-green/90">
            Find a Store Near You <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </>
  );
}

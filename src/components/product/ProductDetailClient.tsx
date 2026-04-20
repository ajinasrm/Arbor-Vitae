'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Heart, Share2, Star, Truck, RotateCcw, Shield, ChevronDown, Plus, Minus, ShoppingBag, ZoomIn } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/product/ProductCard';
import { Product, ProductVariant } from '@/types';

export default function ProductDetailClient({ product }: { product: Product }) {
    const { addItem } = useCart();
    const { isWishlisted, toggle } = useWishlist();
    const [mainImgIdx, setMainImgIdx] = useState(0);
    const [selectedColor, setSelectedColor] = useState(product.variants[0].color);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [pincode, setPincode] = useState('');
    const [pincodeMsg, setPincodeMsg] = useState('');
    const [addedMsg, setAddedMsg] = useState('');
    const [error, setError] = useState('');
    const [openAccordion, setOpenAccordion] = useState<string>('description');
    const imgRef = useRef<HTMLDivElement>(null);

    const colors = [...new Set(product.variants.map(v => v.color))];
    const sizes = [...new Set(product.variants.filter(v => v.color === selectedColor).map(v => v.size))];
    const selectedVariant: ProductVariant | undefined = product.variants.find(v => v.color === selectedColor && v.size === selectedSize);
    const discountedPrice = Math.round(product.basePrice * (1 - product.discountPercentage / 100));

    const handleAddToCart = () => {
        if (!selectedSize) { setError('Please select a size to continue.'); return; }
        if (!selectedVariant || selectedVariant.stock === 0) { setError('This variant is out of stock.'); return; }
        addItem(product, selectedVariant, quantity);
        setAddedMsg('Added to bag!');
        setTimeout(() => setAddedMsg(''), 2500);
        setError('');
    };

    const checkPincode = () => {
        if (pincode.length === 6) {
            setPincodeMsg(`✓ Delivery available in 3–5 business days.`);
        } else {
            setPincodeMsg('Please enter a valid 6-digit pincode.');
        }
    };

    const relatedProducts = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

    const AccordionItem = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
        <div style={{ borderBottom: '1px solid var(--border-light)' }}>
            <button
                className="w-full flex items-center justify-between py-4 text-sm font-sans font-medium"
                onClick={() => setOpenAccordion(openAccordion === id ? '' : id)}
            >
                {title}
                <ChevronDown size={16} className={`transition-transform duration-200 ${openAccordion === id ? 'rotate-180' : ''}`} />
            </button>
            <div className={`accordion-content ${openAccordion === id ? 'pb-4' : ''}`} style={{ maxHeight: openAccordion === id ? '500px' : '0', opacity: openAccordion === id ? 1 : 0 }}>
                <div className="text-sm font-sans leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {children}
                </div>
            </div>
        </div>
    );

    return (
        <div>
            {/* Breadcrumb */}
            <div className="container-lg py-4">
                <nav className="flex items-center gap-2 text-xs font-sans" style={{ color: 'var(--text-muted)' }}>
                    <Link href="/" className="hover:text-[var(--forest-green)] transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/shop" className="hover:text-[var(--forest-green)] transition-colors">Shop</Link>
                    <span>/</span>
                    <Link href={`/shop/${product.category.toLowerCase()}`} className="hover:text-[var(--forest-green)] transition-colors">{product.category}</Link>
                    <span>/</span>
                    <span>{product.name}</span>
                </nav>
            </div>

            {/* Main Product Section */}
            <div className="container-lg pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
                    {/* ── Image Gallery ── */}
                    <div className="relative">
                        <div className="flex gap-3">
                            {/* Thumbnails */}
                            {product.images.length > 1 && (
                                <div className="flex flex-col gap-2 flex-shrink-0">
                                    {product.images.map((img, i) => (
                                        <button
                                            key={img.id}
                                            onClick={() => setMainImgIdx(i)}
                                            className="w-16 overflow-hidden transition-all duration-200"
                                            style={{
                                                border: i === mainImgIdx ? '2px solid var(--forest-green)' : '2px solid transparent',
                                                opacity: i === mainImgIdx ? 1 : 0.6
                                            }}
                                        >
                                            <img src={img.url} alt={img.alt} className="w-full h-20 object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Main image */}
                            <div ref={imgRef} className="flex-1 image-zoom-container relative" style={{ aspectRatio: '3/4', background: 'var(--cream)' }}>
                                <img
                                    src={product.images[mainImgIdx]?.url}
                                    alt={product.images[mainImgIdx]?.alt}
                                    className="w-full h-full object-cover"
                                />
                                {/* Prev/Next */}
                                {product.images.length > 1 && (
                                    <>
                                        <button
                                            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/85 flex items-center justify-center rounded-full hover:bg-white transition-colors shadow"
                                            onClick={() => setMainImgIdx(i => (i - 1 + product.images.length) % product.images.length)}
                                        >
                                            <ChevronLeft size={18} />
                                        </button>
                                        <button
                                            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/85 flex items-center justify-center rounded-full hover:bg-white transition-colors shadow"
                                            onClick={() => setMainImgIdx(i => (i + 1) % product.images.length)}
                                        >
                                            <ChevronRight size={18} />
                                        </button>
                                    </>
                                )}
                                {/* Badges */}
                                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                                    {product.isNewArrival && <span className="badge badge-new">New</span>}
                                    {product.isOnSale && <span className="badge badge-sale">Sale</span>}
                                </div>
                                {/* Zoom hint */}
                                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/40 text-white text-xs font-sans px-2 py-1 rounded">
                                    <ZoomIn size={12} /> Hover to zoom
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Product Info ── */}
                    <div className="lg:sticky lg:top-24">
                        {/* Category & SKU */}
                        <div className="flex items-center justify-between mb-2">
                            <Link href={`/shop/${product.category.toLowerCase()}`} className="text-xs font-sans tracking-widest uppercase hover:text-[var(--forest-green)] transition-colors" style={{ color: 'var(--soft-gold)' }}>
                                {product.category}
                            </Link>
                            <span className="text-xs font-sans" style={{ color: 'var(--text-muted)' }}>SKU: {product.sku}</span>
                        </div>

                        <h1 className="font-serif text-3xl md:text-4xl mb-3">{product.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="stars">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} size={14} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} strokeWidth={1.5} />
                                ))}
                            </div>
                            <span className="text-sm font-sans font-medium">{product.rating}</span>
                            <a href="#reviews" className="text-sm font-sans underline hover:text-[var(--forest-green)] transition-colors" style={{ color: 'var(--text-muted)' }}>
                                ({product.reviewCount} reviews)
                            </a>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-4 mb-6">
                            <span className="font-sans text-3xl font-semibold">₹{discountedPrice.toLocaleString('en-IN')}</span>
                            {product.discountPercentage > 0 && (
                                <>
                                    <span className="text-lg font-sans line-through" style={{ color: 'var(--text-muted)' }}>₹{product.basePrice.toLocaleString('en-IN')}</span>
                                    <span className="badge badge-sale text-sm">{product.discountPercentage}% OFF</span>
                                </>
                            )}
                        </div>

                        <p className="text-sm font-sans leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>{product.shortDescription}</p>

                        {/* Divider */}
                        <div style={{ height: '1px', background: 'var(--border-light)', marginBottom: '1.5rem' }} />

                        {/* Color */}
                        <div className="mb-5">
                            <p className="text-xs font-sans font-semibold uppercase tracking-wider mb-3">
                                Colour: <span className="font-normal normal-case">{selectedColor}</span>
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                {colors.map(c => {
                                    const hex = product.variants.find(v => v.color === c)?.colorHex || '#ccc';
                                    return (
                                        <button
                                            key={c}
                                            title={c}
                                            className={`color-swatch ${selectedColor === c ? 'active' : ''}`}
                                            style={{ background: hex, width: '2.25rem', height: '2.25rem' }}
                                            onClick={() => { setSelectedColor(c); setSelectedSize(null); setError(''); }}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        {/* Size */}
                        <div className="mb-5">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-xs font-sans font-semibold uppercase tracking-wider">Size</p>
                                <Link href="/size-guide" className="text-xs font-sans underline hover:text-[var(--forest-green)] transition-colors" style={{ color: 'var(--text-muted)' }}>
                                    Size Guide
                                </Link>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {sizes.map(sz => {
                                    const variant = product.variants.find(v => v.color === selectedColor && v.size === sz);
                                    const unavail = !variant || variant.stock === 0;
                                    return (
                                        <button
                                            key={sz}
                                            className={`size-option ${selectedSize === sz ? 'active' : ''} ${unavail ? 'unavailable' : ''}`}
                                            onClick={() => { if (!unavail) { setSelectedSize(sz); setError(''); } }}
                                            disabled={unavail}
                                        >
                                            {sz}
                                        </button>
                                    );
                                })}
                            </div>
                            {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
                            {selectedVariant && (
                                <p className="text-xs font-sans mt-2" style={{ color: selectedVariant.stock <= 3 ? '#c0392b' : 'var(--forest-green)' }}>
                                    {selectedVariant.stock <= 0 ? 'Out of stock' : selectedVariant.stock <= 3 ? `Only ${selectedVariant.stock} left!` : 'In stock'}
                                </p>
                            )}
                        </div>

                        {/* Quantity */}
                        <div className="mb-6">
                            <p className="text-xs font-sans font-semibold uppercase tracking-wider mb-3">Quantity</p>
                            <div className="flex items-center border w-fit" style={{ borderColor: 'var(--border-light)' }}>
                                <button
                                    className="w-10 h-10 flex items-center justify-center hover:bg-[var(--cream)] transition-colors"
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="w-12 text-center font-sans font-medium">{quantity}</span>
                                <button
                                    className="w-10 h-10 flex items-center justify-center hover:bg-[var(--cream)] transition-colors"
                                    onClick={() => setQuantity(q => Math.min(selectedVariant?.stock || 10, q + 1))}
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex gap-3 mb-4">
                            <button onClick={handleAddToCart} className="btn-primary flex-1 text-xs py-4 relative">
                                {addedMsg ? (
                                    <span className="animate-fade-in">✓ {addedMsg}</span>
                                ) : (
                                    <><ShoppingBag size={16} /> Add to Bag</>
                                )}
                            </button>
                            <button
                                onClick={() => toggle(product)}
                                className={`w-14 flex items-center justify-center border transition-all duration-200 ${isWishlisted(product.id) ? 'border-[var(--forest-green)] bg-[var(--forest-green)] text-white' : 'border-[var(--border-light)] hover:border-[var(--forest-green)] hover:text-[var(--forest-green)]'}`}
                                aria-label="Add to wishlist"
                            >
                                <Heart size={18} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
                            </button>
                            <button className="w-14 flex items-center justify-center border hover:border-[var(--forest-green)] hover:text-[var(--forest-green)] transition-all duration-200" style={{ borderColor: 'var(--border-light)' }} aria-label="Share">
                                <Share2 size={18} />
                            </button>
                        </div>

                        {/* Delivery pincode check */}
                        <div className="mb-5 p-4" style={{ background: 'var(--cream)', border: '1px solid var(--border-light)' }}>
                            <p className="text-xs font-sans font-semibold uppercase tracking-wider mb-2.5">Check Delivery</p>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Enter 6-digit pincode"
                                    value={pincode}
                                    onChange={e => { setPincode(e.target.value.replace(/\D/g, '').slice(0, 6)); setPincodeMsg(''); }}
                                    className="input-field flex-1 py-2 text-sm"
                                    maxLength={6}
                                />
                                <button onClick={checkPincode} className="btn-secondary py-2 px-4 text-xs">Check</button>
                            </div>
                            {pincodeMsg && (
                                <p className={`text-xs mt-2 font-sans ${pincodeMsg.startsWith('✓') ? 'text-[var(--forest-green)]' : 'text-red-600'}`}>
                                    {pincodeMsg}
                                </p>
                            )}
                        </div>

                        {/* Trust badges */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            {[
                                { Icon: Truck, text: 'Free delivery above ₹2,999' },
                                { Icon: RotateCcw, text: '30-day easy returns' },
                                { Icon: Shield, text: '100% authentic products' },
                            ].map(({ Icon, text }) => (
                                <div key={text} className="flex flex-col items-center text-center gap-1.5">
                                    <Icon size={20} style={{ color: 'var(--forest-green)' }} />
                                    <p className="text-[10px] font-sans leading-tight" style={{ color: 'var(--text-muted)' }}>{text}</p>
                                </div>
                            ))}
                        </div>

                        {/* Accordion */}
                        <div style={{ borderTop: '1px solid var(--border-light)' }}>
                            <AccordionItem id="description" title="Description">
                                {product.description}
                            </AccordionItem>
                            <AccordionItem id="fabric" title="Fabric & Care">
                                <p className="mb-2"><strong>Material:</strong> {product.fabric}</p>
                                <p className="mb-2"><strong>Fit:</strong> {product.fit}</p>
                                <p><strong>Care:</strong> {product.care}</p>
                            </AccordionItem>
                            <AccordionItem id="delivery" title="Delivery & Returns">
                                <p className="mb-2">Standard delivery: {product.deliveryDays} business days.</p>
                                <p className="mb-2">Free shipping on orders above ₹2,999.</p>
                                <p>Easy 30-day returns. Items must be unworn, unwashed, and in original packaging.</p>
                            </AccordionItem>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Reviews ── */}
            <div id="reviews" className="section-padding" style={{ background: 'var(--cream)' }}>
                <div className="container-lg">
                    <h2 className="font-serif text-3xl md:text-4xl mb-2">Customer Reviews</h2>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="stars">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} size={18} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} strokeWidth={1.5} />
                            ))}
                        </div>
                        <span className="font-sans text-xl font-semibold">{product.rating}</span>
                        <span className="font-sans" style={{ color: 'var(--text-muted)' }}>out of 5 ({product.reviewCount} reviews)</span>
                    </div>
                    {product.reviews.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {product.reviews.map((rev) => (
                                <div key={rev.id} className="bg-white p-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="stars">
                                            {Array.from({ length: rev.rating }).map((_, i) => (
                                                <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                                            ))}
                                        </div>
                                        {rev.verified && (
                                            <span className="text-[10px] font-sans font-semibold uppercase tracking-wider" style={{ color: 'var(--forest-green)' }}>✓ Verified</span>
                                        )}
                                    </div>
                                    <p className="font-sans font-semibold text-sm mb-1">{rev.title}</p>
                                    <p className="text-sm font-sans leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>{rev.body}</p>
                                    <p className="text-xs font-sans" style={{ color: 'var(--text-muted)' }}>{rev.author} — {new Date(rev.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="font-sans text-sm" style={{ color: 'var(--text-muted)' }}>No reviews yet. Be the first to review this product!</p>
                    )}
                </div>
            </div>

            {/* ── Related Products ── */}
            {relatedProducts.length > 0 && (
                <section className="section-padding">
                    <div className="container-lg">
                        <h2 className="font-serif text-3xl md:text-4xl mb-8">You May Also Like</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

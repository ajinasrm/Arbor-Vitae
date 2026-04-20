'use client';
import { useState } from 'react';
import Link from 'next/link';
import { X, Heart, ShoppingBag, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, ProductVariant } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface QuickViewModalProps {
    product: Product;
    onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
    const { addItem } = useCart();
    const { isWishlisted, toggle } = useWishlist();
    const [selectedColor, setSelectedColor] = useState(product.variants[0].color);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [imgIdx, setImgIdx] = useState(0);
    const [error, setError] = useState('');

    const discountedPrice = Math.round(product.basePrice * (1 - product.discountPercentage / 100));
    const colors = [...new Set(product.variants.map(v => v.color))];
    const sizes = [...new Set(product.variants.filter(v => v.color === selectedColor).map(v => v.size))];

    const getVariant = (): ProductVariant | undefined =>
        product.variants.find(v => v.color === selectedColor && v.size === selectedSize);

    const handleAddToCart = () => {
        if (!selectedSize) { setError('Please select a size.'); return; }
        const variant = getVariant();
        if (!variant || variant.stock === 0) { setError('This variant is out of stock.'); return; }
        addItem(product, variant, 1);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 animate-fade-in" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full max-w-3xl animate-scale-in z-[310] bg-white overflow-hidden grid grid-cols-1 md:grid-cols-2" style={{ maxHeight: '90vh' }}>
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-[var(--cream)] transition-colors"
                    aria-label="Close quick view"
                >
                    <X size={16} />
                </button>

                {/* Images */}
                <div className="relative overflow-hidden" style={{ background: 'var(--cream)', aspectRatio: '3/4' }}>
                    <img
                        src={product.images[imgIdx]?.url}
                        alt={product.images[imgIdx]?.alt}
                        className="w-full h-full object-cover"
                    />
                    {product.images.length > 1 && (
                        <>
                            <button
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/80 rounded-full"
                                onClick={() => setImgIdx(i => (i - 1 + product.images.length) % product.images.length)}
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/80 rounded-full"
                                onClick={() => setImgIdx(i => (i + 1) % product.images.length)}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </>
                    )}
                </div>

                {/* Info */}
                <div className="p-6 overflow-y-auto">
                    <p className="text-xs font-sans tracking-widest uppercase mb-1" style={{ color: 'var(--soft-gold)' }}>{product.category}</p>
                    <h2 className="font-serif text-2xl mb-2">{product.name}</h2>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="stars">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} size={12} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} strokeWidth={1.5} />
                            ))}
                        </div>
                        <span className="text-xs font-sans" style={{ color: 'var(--text-muted)' }}>({product.reviewCount} reviews)</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-3 mb-4">
                        <span className="text-2xl font-sans font-semibold">₹{discountedPrice.toLocaleString('en-IN')}</span>
                        {product.discountPercentage > 0 && (
                            <>
                                <span className="text-sm font-sans line-through" style={{ color: 'var(--text-muted)' }}>₹{product.basePrice.toLocaleString('en-IN')}</span>
                                <span className="badge badge-sale">{product.discountPercentage}% off</span>
                            </>
                        )}
                    </div>

                    <p className="text-sm font-sans leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>{product.shortDescription}</p>

                    {/* Color */}
                    <div className="mb-4">
                        <p className="text-xs font-sans font-semibold uppercase tracking-wider mb-2">
                            Colour: <span className="font-normal normal-case">{selectedColor}</span>
                        </p>
                        <div className="flex gap-2 flex-wrap">
                            {colors.map(c => {
                                const hex = product.variants.find(v => v.color === c)?.colorHex || '#ccc';
                                return (
                                    <button
                                        key={c}
                                        className={`color-swatch ${selectedColor === c ? 'active' : ''}`}
                                        style={{ background: hex }}
                                        onClick={() => { setSelectedColor(c); setSelectedSize(null); setError(''); }}
                                        title={c}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* Size */}
                    <div className="mb-5">
                        <p className="text-xs font-sans font-semibold uppercase tracking-wider mb-2">Size</p>
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
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mb-4">
                        <button onClick={handleAddToCart} className="btn-primary flex-1 text-xs py-3">
                            <ShoppingBag size={15} /> Add to Bag
                        </button>
                        <button
                            onClick={() => toggle(product)}
                            className={`w-12 h-12 flex items-center justify-center border transition-colors ${isWishlisted(product.id) ? 'border-[var(--forest-green)] bg-[var(--forest-green)] text-white' : 'border-[var(--border-light)] hover:border-[var(--forest-green)]'}`}
                            aria-label="Wishlist"
                        >
                            <Heart size={16} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
                        </button>
                    </div>

                    <Link
                        href={`/product/${product.id}`}
                        onClick={onClose}
                        className="block text-center text-xs font-sans font-medium underline underline-offset-2 hover:text-[var(--forest-green)] transition-colors"
                    >
                        View Full Details
                    </Link>
                </div>
            </div>
        </div>
    );
}

'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Heart, Eye, Star } from 'lucide-react';
import { Product } from '@/types';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
    product: Product;
    onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
    const { isWishlisted, toggle } = useWishlist();
    const { addItem } = useCart();
    const [imgLoaded, setImgLoaded] = useState(false);
    const [isHearted, setIsHearted] = useState(false);

    const wishlisted = isWishlisted(product.id);
    const discountedPrice = Math.round(product.basePrice * (1 - product.discountPercentage / 100));
    const primaryImage = product.images.find(i => i.isPrimary) || product.images[0];
    const hoverImage = product.images[1] || primaryImage;

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsHearted(true);
        setTimeout(() => setIsHearted(false), 400);
        toggle(product);
    };

    const handleQuickAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const defaultVariant = product.variants.find(v => v.stock > 0);
        if (defaultVariant) addItem(product, defaultVariant, 1);
    };

    return (
        <div className="product-card group">
            {/* Image area */}
            <Link href={`/product/${product.id}`} className="block relative overflow-hidden bg-[var(--cream)] aspect-[3/4]">
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                    {product.isNewArrival && <span className="badge badge-new">New</span>}
                    {product.isOnSale && product.discountPercentage > 0 && (
                        <span className="badge badge-sale">-{product.discountPercentage}%</span>
                    )}
                    {product.isBestSeller && !product.isOnSale && <span className="badge badge-best">Best Seller</span>}
                </div>

                {/* Wishlist button */}
                <button
                    onClick={handleWishlist}
                    className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${wishlisted ? 'bg-[var(--forest-green)] text-white' : 'bg-white/80 text-charcoal hover:bg-white'
                        } ${isHearted ? 'heart-pulse' : ''}`}
                    aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>

                {/* Primary image */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${hoverImage !== primaryImage ? 'group-hover:opacity-0' : ''}`}>
                    {!imgLoaded && <div className="skeleton absolute inset-0" />}
                    <img
                        src={primaryImage.url}
                        alt={primaryImage.alt}
                        className="product-card-image w-full h-full object-cover"
                        onLoad={() => setImgLoaded(true)}
                        loading="lazy"
                    />
                </div>

                {/* Hover image */}
                {hoverImage !== primaryImage && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <img
                            src={hoverImage.url}
                            alt={hoverImage.alt}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                )}

                {/* Quick actions overlay */}
                <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex">
                    <button
                        onClick={handleQuickAddToCart}
                        className="flex-1 py-3 text-xs font-sans font-medium tracking-widest uppercase text-white transition-colors duration-200"
                        style={{ background: 'var(--forest-green)' }}
                    >
                        Quick Add
                    </button>
                    {onQuickView && (
                        <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView(product); }}
                            className="px-4 py-3 text-charcoal bg-white hover:bg-[var(--cream)] transition-colors duration-200"
                            aria-label="Quick view"
                        >
                            <Eye size={16} />
                        </button>
                    )}
                </div>
            </Link>

            {/* Info */}
            <div className="pt-3 pb-1">
                <p className="text-[11px] font-sans uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-muted)' }}>
                    {product.category}
                </p>
                <Link href={`/product/${product.id}`} className="block">
                    <h3 className="text-sm font-sans font-medium text-charcoal hover:text-[var(--forest-green)] transition-colors line-clamp-1 mb-1">
                        {product.name}
                    </h3>
                </Link>
                {/* Stars */}
                <div className="flex items-center gap-1.5 mb-2">
                    <div className="stars">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                size={11}
                                fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                                strokeWidth={1.5}
                            />
                        ))}
                    </div>
                    <span className="text-[11px] font-sans" style={{ color: 'var(--text-muted)' }}>({product.reviewCount})</span>
                </div>
                {/* Price */}
                <div className="flex items-baseline gap-2">
                    <span className="text-sm font-sans font-semibold" style={{ color: 'var(--charcoal)' }}>
                        ₹{discountedPrice.toLocaleString('en-IN')}
                    </span>
                    {product.discountPercentage > 0 && (
                        <span className="text-xs font-sans line-through" style={{ color: 'var(--text-muted)' }}>
                            ₹{product.basePrice.toLocaleString('en-IN')}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

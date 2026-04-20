'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, User, Search, X, Menu, ChevronDown, Leaf } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useUser } from '@/context/UserContext';

const NAV_ITEMS = [
    {
        label: 'Shop',
        href: '/shop',
        mega: true,
        columns: [
            {
                title: 'New',
                links: [
                    { label: 'New Arrivals', href: '/shop?collection=new-arrivals' },
                    { label: 'Trending Now', href: '/shop?sort=popular' },
                    { label: 'Summer Edit', href: '/shop?collection=summer-edit' },
                ],
            },
            {
                title: 'Clothing',
                links: [
                    { label: 'Shirts', href: '/shop/shirts' },
                    { label: 'T-shirts', href: '/shop/t-shirts' },
                    { label: 'Trousers', href: '/shop/trousers' },
                    { label: 'Blazers', href: '/shop/blazers' },
                    { label: 'Suits', href: '/shop/suits' },
                    { label: 'Accessories', href: '/shop/accessories' },
                ],
            },
            {
                title: 'Collections',
                links: [
                    { label: 'Forest Luxe', href: '/shop?collection=forest-luxe' },
                    { label: 'Earth Tones', href: '/shop?collection=earth-tones' },
                    { label: 'Core Essentials', href: '/shop?collection=core-essentials' },
                ],
            },
            {
                title: 'Offers',
                links: [
                    { label: 'Sale', href: '/shop?sale=true' },
                    { label: 'Best Sellers', href: '/shop?sort=popular' },
                ],
            },
        ],
        promo: {
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80',
            label: 'Forest Luxe Collection',
            href: '/shop?collection=forest-luxe',
        },
    },
    { label: 'New Arrivals', href: '/shop?collection=new-arrivals' },
    { label: 'Shirts', href: '/shop/shirts' },
    { label: 'T-shirts', href: '/shop/t-shirts' },
    { label: 'Trousers', href: '/shop/trousers' },
    { label: 'Blazers', href: '/shop/blazers' },
    { label: 'Suits', href: '/shop/suits' },
    { label: 'Accessories', href: '/shop/accessories' },
    { label: 'Sale', href: '/shop?sale=true', accent: true },
];

export default function Header() {
    const { itemCount, openDrawer } = useCart();
    const { count: wishlistCount } = useWishlist();
    const { isAuthenticated, isAdmin } = useUser();
    const [scrolled, setScrolled] = useState(false);
    const [megaOpen, setMegaOpen] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const megaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (searchOpen) searchRef.current?.focus();
    }, [searchOpen]);

    const handleMegaEnter = (label: string) => {
        if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
        setMegaOpen(label);
    };

    const handleMegaLeave = () => {
        megaTimerRef.current = setTimeout(() => setMegaOpen(null), 150);
    };

    return (
        <>
            {/* Announcement Bar */}
            <div style={{ background: 'var(--forest-green)', color: 'white' }} className="text-center text-xs py-2 font-sans tracking-widest uppercase">
                <div className="animate-marquee flex whitespace-nowrap">
                    <span className="pr-16">Free shipping on orders above ₹2,999</span>
                    <span className="pr-16">|</span>
                    <span className="pr-16">Sustainable fashion, crafted with purpose</span>
                    <span className="pr-16">|</span>
                    <span className="pr-16">New arrivals every week</span>
                    <span className="pr-16">|</span>
                    <span className="pr-16">Free shipping on orders above ₹2,999</span>
                    <span className="pr-16">|</span>
                    <span className="pr-16">Sustainable fashion, crafted with purpose</span>
                    <span className="pr-16">|</span>
                    <span className="pr-16">New arrivals every week</span>
                    <span className="pr-16">|</span>
                </div>
            </div>

            <header
                className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md bg-white/97 backdrop-blur-md' : 'bg-white'
                    }`}
                style={{ borderBottom: '1px solid var(--border-light)' }}
            >
                <div className="container-xl">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Mobile menu button */}
                        <button
                            className="lg:hidden p-2 text-charcoal"
                            onClick={() => setMobileOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu size={22} />
                        </button>

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <Leaf
                                size={28}
                                className="transition-transform duration-300 group-hover:rotate-12"
                                style={{ color: 'var(--forest-green)' }}
                            />
                            <span className="font-serif text-xl lg:text-2xl tracking-wider" style={{ color: 'var(--forest-green)' }}>
                                Arbor Vitae
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-2 xl:gap-6">
                            {NAV_ITEMS.map((item) => (
                                <div
                                    key={item.label}
                                    className=""
                                    onMouseEnter={() => item.mega && handleMegaEnter(item.label)}
                                    onMouseLeave={() => item.mega && handleMegaLeave()}
                                >
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-0.5 px-3 xl:px-4 py-2 text-xs font-sans font-medium tracking-widest uppercase transition-colors duration-200 ${item.accent
                                                ? 'text-red-700 hover:text-red-900'
                                                : 'text-charcoal hover:text-[var(--forest-green)]'
                                            }`}
                                    >
                                        {item.label}
                                        {item.mega && <ChevronDown size={12} className={`transition-transform duration-200 ${megaOpen === item.label ? 'rotate-180' : ''}`} />}
                                    </Link>

                                    {/* Mega Menu */}
                                    {item.mega && megaOpen === item.label && (
                                        <div
                                            className="mega-menu-panel"
                                            onMouseEnter={() => handleMegaEnter(item.label)}
                                            onMouseLeave={handleMegaLeave}
                                        >
                                            <div className="container-xl flex gap-10">
                                                {item.columns?.map((col) => (
                                                    <div key={col.title} className="min-w-[130px]">
                                                        <h4 className="text-xs font-sans font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--soft-gold)' }}>
                                                            {col.title}
                                                        </h4>
                                                        <ul className="space-y-2.5">
                                                            {col.links.map((link) => (
                                                                <li key={link.label}>
                                                                    <Link
                                                                        href={link.href}
                                                                        className="text-sm font-sans text-charcoal hover:text-[var(--forest-green)] transition-colors duration-150"
                                                                        onClick={() => setMegaOpen(null)}
                                                                    >
                                                                        {link.label}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                                {/* Promo banner */}
                                                {item.promo && (
                                                    <div className="ml-auto flex-shrink-0 w-56">
                                                        <Link href={item.promo.href} onClick={() => setMegaOpen(null)} className="block group">
                                                            <div className="overflow-hidden relative">
                                                                <img
                                                                    src={item.promo.image}
                                                                    alt={item.promo.label}
                                                                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                                                                />
                                                                <div className="absolute inset-0 bg-black/30 flex items-end p-3">
                                                                    <p className="text-white text-xs font-sans font-medium tracking-wider uppercase">{item.promo.label}</p>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isAdmin && (
                                <Link 
                                    href="/admin" 
                                    className="px-3 xl:px-4 py-2 text-xs font-sans font-bold tracking-widest uppercase text-[var(--forest-green)] hover:text-[var(--forest-green-dark)] transition-colors"
                                >
                                    Admin
                                </Link>
                            )}
                        </nav>

                        {/* Right actions */}
                        <div className="flex items-center gap-2 lg:gap-3">
                            {/* Search */}
                            <button
                                className="p-2 text-charcoal hover:text-[var(--forest-green)] transition-colors"
                                onClick={() => setSearchOpen(!searchOpen)}
                                aria-label="Search"
                            >
                                <Search size={20} />
                            </button>

                            {/* Wishlist */}
                            <Link href="/account/wishlist" className="relative p-2 text-charcoal hover:text-[var(--forest-green)] transition-colors hidden sm:block" aria-label="Wishlist">
                                <Heart size={20} />
                                {wishlistCount > 0 && (
                                    <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full text-white text-[10px] font-bold flex items-center justify-center" style={{ background: 'var(--forest-green)' }}>
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>

                            {/* Account */}
                            <Link href={isAuthenticated ? "/account" : "/auth/login"} className="p-2 text-charcoal hover:text-[var(--forest-green)] transition-colors hidden sm:block" aria-label="Account">
                                <User size={20} />
                            </Link>

                            {/* Cart */}
                            <button
                                className="relative p-2 text-charcoal hover:text-[var(--forest-green)] transition-colors"
                                onClick={openDrawer}
                                aria-label="Cart"
                            >
                                <ShoppingBag size={20} />
                                {itemCount > 0 && (
                                    <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full text-white text-[10px] font-bold flex items-center justify-center" style={{ background: 'var(--forest-green)' }}>
                                        {itemCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search bar (dropdown) */}
                {searchOpen && (
                    <div className="border-t animate-fade-in" style={{ borderColor: 'var(--border-light)', background: 'var(--cream)' }}>
                        <div className="container-xl py-4">
                            <div className="flex items-center gap-3 max-w-2xl mx-auto">
                                <Search size={18} style={{ color: 'var(--text-muted)' }} />
                                <input
                                    ref={searchRef}
                                    type="text"
                                    placeholder="Search for shirts, blazers, suits…"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1 bg-transparent text-base font-sans outline-none placeholder:text-muted"
                                    style={{ color: 'var(--charcoal)' }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Escape') setSearchOpen(false);
                                        if (e.key === 'Enter' && searchQuery.trim()) {
                                            window.location.href = `/shop?q=${encodeURIComponent(searchQuery)}`;
                                        }
                                    }}
                                />
                                <button onClick={() => setSearchOpen(false)} className="text-muted hover:text-charcoal transition-colors">
                                    <X size={18} />
                                </button>
                            </div>
                            {/* Quick search suggestions */}
                            <div className="flex flex-wrap gap-2 mt-3 max-w-2xl mx-auto">
                                {['Heritage Shirts', 'Linen', 'Blazers', 'Suits', 'Summer Sale'].map(term => (
                                    <Link
                                        key={term}
                                        href={`/shop?q=${term}`}
                                        onClick={() => setSearchOpen(false)}
                                        className="text-xs font-sans px-3 py-1 bg-white border transition-colors duration-150 hover:border-[var(--forest-green)] hover:text-[var(--forest-green)]"
                                        style={{ borderColor: 'var(--border-light)' }}
                                    >
                                        {term}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Mobile Sidebar */}
            {mobileOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-[150]"
                        onClick={() => setMobileOpen(false)}
                    />
                    <div className="fixed top-0 left-0 bottom-0 w-80 bg-white z-[200] overflow-y-auto animate-slide-right" style={{ animationName: 'slideInLeft' }}>
                        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border-light)' }}>
                            <div className="flex items-center gap-2">
                                <Leaf size={22} style={{ color: 'var(--forest-green)' }} />
                                <span className="font-serif text-lg" style={{ color: 'var(--forest-green)' }}>Arbor Vitae</span>
                            </div>
                            <button onClick={() => setMobileOpen(false)}>
                                <X size={22} />
                            </button>
                        </div>
                        <nav className="p-4">
                            {NAV_ITEMS.map((item) => (
                                <div key={item.label}>
                                    <div className="flex items-center justify-between">
                                        <Link
                                            href={item.href}
                                            className={`block py-3 text-sm font-sans font-medium tracking-wider uppercase ${item.accent ? 'text-red-700' : ''}`}
                                            onClick={() => !item.mega && setMobileOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                        {item.mega && (
                                            <button onClick={() => setMobileExpandedItem(mobileExpandedItem === item.label ? null : item.label)}>
                                                <ChevronDown size={16} className={`transition-transform ${mobileExpandedItem === item.label ? 'rotate-180' : ''}`} />
                                            </button>
                                        )}
                                    </div>
                                    {item.mega && mobileExpandedItem === item.label && (
                                        <div className="pl-4 pb-2">
                                            {item.columns?.map(col => (
                                                <div key={col.title} className="mb-3">
                                                    <p className="text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: 'var(--soft-gold)' }}>{col.title}</p>
                                                    {col.links.map(link => (
                                                        <Link key={link.label} href={link.href} className="block py-1.5 text-sm text-charcoal" onClick={() => setMobileOpen(false)}>
                                                            {link.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div style={{ height: '1px', background: 'var(--border-light)' }} />
                                </div>
                            ))}
                        </nav>
                        <div className="p-4 border-t mt-2" style={{ borderColor: 'var(--border-light)' }}>
                            <Link href="/account" className="flex items-center gap-2 py-2 text-sm font-sans" onClick={() => setMobileOpen(false)}>
                                <User size={16} /> My Account
                            </Link>
                            <Link href="/account/wishlist" className="flex items-center gap-2 py-2 text-sm font-sans" onClick={() => setMobileOpen(false)}>
                                <Heart size={16} /> Wishlist ({wishlistCount})
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

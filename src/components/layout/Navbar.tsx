'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, Menu, X, User, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/Button';

const links = [
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'Our Story' },
    // { href: '/new-arrivals', label: 'New Arrivals' },
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const pathname = usePathname();
    const { openCart, items } = useCartStore();
    const { user, isAuthenticated, logout } = useAuthStore();
    const router = useRouter();

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    const isHome = pathname === '/';

    useEffect(() => {
        setMobileMenuOpen(false);
        setUserMenuOpen(false);
    }, [pathname]);

    const handleLogout = () => {
        logout();
        setUserMenuOpen(false);
        router.push('/');
    };

    return (
        <header
            className={cn(
                "sticky top-0 z-40 w-full transition-all duration-300",
                isHome ? "bg-gradient-to-b from-black/50 to-transparent" : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex-1 md:flex md:items-center md:gap-12">
                        <Link href="/" className={cn("block text-2xl font-serif font-bold tracking-tight transition-colors", isHome ? "text-white" : "text-primary")}>
                            Arbor Vitae
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <nav aria-label="Global">
                            <ul className="flex items-center gap-8 text-sm font-medium">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={cn(
                                                "transition hover:underline underline-offset-4",
                                                isHome ? "text-white/90 hover:text-white" : "text-muted-foreground hover:text-foreground",
                                                pathname === link.href && (isHome ? "text-white font-bold" : "text-foreground font-semibold")
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className={cn("flex items-center gap-4 transition-colors", isHome ? "text-white" : "text-primary")}>
                        <div className="sm:flex sm:gap-4 items-center">
                            {/* User Menu */}
                            <div className="relative">
                                {isAuthenticated ? (
                                    <div className="relative">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                                            className="relative"
                                        >
                                            <span className="sr-only">Open user menu</span>
                                            <div className={cn(
                                                "h-8 w-8 rounded-full flex items-center justify-center font-medium transition-colors",
                                                isHome ? "bg-white text-primary shadow-sm" : "bg-primary/10 text-primary"
                                            )}>
                                                {user?.name?.[0]?.toUpperCase() || 'U'}
                                            </div>
                                        </Button>

                                        <AnimatePresence>
                                            {userMenuOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                                    className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-border"
                                                >
                                                    <div className="px-4 py-2 border-b border-border">
                                                        <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
                                                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                                                    </div>
                                                    {user?.role === 'admin' && (
                                                        <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                            Admin Dashboard
                                                        </Link>
                                                    )}
                                                    <button
                                                        onClick={handleLogout}
                                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Sign out
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <Link href="/login">
                                        <Button
                                            variant={isHome ? "outline" : "ghost"}
                                            size="sm"
                                            className={cn("text-sm font-medium", isHome ? "border-white bg-white/10 text-white hover:bg-white hover:text-primary" : "")}
                                        >
                                            Sign in
                                        </Button>
                                    </Link>
                                )}
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative hover:bg-white/20"
                                onClick={openCart}
                            >
                                <span className="sr-only">Open cart</span>
                                <ShoppingBag className="h-5 w-5" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                                        {totalItems}
                                    </span>
                                )}
                            </Button>
                        </div>

                        <div className="block md:hidden">
                            <button
                                className={cn(
                                    "rounded p-2 transition",
                                    isHome ? "text-white hover:bg-white/20" : "bg-gray-100 text-gray-600 hover:text-gray-600/75"
                                )}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-border bg-background"
                    >
                        <nav aria-label="Global" className="p-4">
                            <ul className="flex flex-col gap-4 text-sm">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="block w-full rounded-lg px-4 py-2 hover:bg-muted font-medium"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                                {!isAuthenticated && (
                                    <li>
                                        <Link
                                            href="/login"
                                            className="block w-full rounded-lg px-4 py-2 hover:bg-muted font-medium text-primary"
                                        >
                                            Sign In
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

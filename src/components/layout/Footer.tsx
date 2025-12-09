import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div>
                        <Link href="/" className="text-2xl font-serif font-bold tracking-tight text-white">
                            Arbor Vitae
                        </Link>
                        <p className="mt-4 max-w-xs text-secondary-foreground/80 leading-relaxed">
                            Rooted in nature, crafted with care. Sustainable fashion that grows with you.
                        </p>
                        <div className="mt-8 flex gap-4 text-secondary-foreground/80">
                            <a href="#" className="hover:text-white transition-colors">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                <span className="sr-only">Instagram</span>
                                <Instagram className="h-6 w-6" />
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-6 w-6" />
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
                        <div>
                            <p className="font-medium text-white">Shop</p>
                            <ul className="mt-6 space-y-4 text-sm text-secondary-foreground/80">
                                <li><Link href="/shop" className="hover:text-white transition-colors">All Products</Link></li>
                                <li><Link href="/shop?category=Men" className="hover:text-white transition-colors">Men</Link></li>
                                <li><Link href="/shop?category=Women" className="hover:text-white transition-colors">Women</Link></li>
                                <li><Link href="/shop?category=Accessories" className="hover:text-white transition-colors">Accessories</Link></li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-medium text-white">Company</p>
                            <ul className="mt-6 space-y-4 text-sm text-secondary-foreground/80">
                                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-medium text-white">Legal</p>
                            <ul className="mt-6 space-y-4 text-sm text-secondary-foreground/80">
                                <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Returns Policy</Link></li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-medium text-white">Newsletter</p>
                            <p className="mt-4 text-sm text-secondary-foreground/80">
                                Join our community for exclusive updates and sustainable style tips.
                            </p>
                            <form className="mt-4">
                                <div className="flex gap-2">
                                    <input type="email" placeholder="email@example.com" className="w-full bg-secondary text-white placeholder:text-secondary-foreground/50 rounded px-3 py-2 text-sm border-none focus:ring-1 focus:ring-accent" />
                                    <button type="button" className="bg-accent text-accent-foreground px-3 py-2 rounded text-sm font-medium hover:bg-accent/90">Join</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-secondary pt-8">
                    <p className="text-center text-xs text-secondary-foreground/60">
                        &copy; {new Date().getFullYear()} Arbor Vitae. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

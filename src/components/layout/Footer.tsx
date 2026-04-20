'use client';
import Link from 'next/link';
import { Leaf, Instagram, Facebook, Twitter, Youtube, Mail } from 'lucide-react';

const FOOTER_LINKS = {
    Shop: [
        { label: 'New Arrivals', href: '/shop?collection=new-arrivals' },
        { label: 'Shirts', href: '/shop/shirts' },
        { label: 'T-shirts', href: '/shop/t-shirts' },
        { label: 'Trousers', href: '/shop/trousers' },
        { label: 'Blazers', href: '/shop/blazers' },
        { label: 'Suits', href: '/shop/suits' },
        { label: 'Accessories', href: '/shop/accessories' },
        { label: 'Sale', href: '/shop?sale=true' },
    ],
    'Customer Service': [
        { label: 'Contact Us', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Store Locator', href: '/stores' },
        { label: 'Order Tracking', href: '/account/orders' },
        { label: 'Returns & Exchanges', href: '/returns' },
        { label: 'Size Guide', href: '/size-guide' },
    ],
    Company: [
        { label: 'About Arbor Vitae', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Sustainability', href: '/about#sustainability' },
        { label: 'Careers', href: '/careers' },
    ],
    Policies: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms & Conditions', href: '/terms' },
        { label: 'Shipping Policy', href: '/shipping' },
        { label: 'Returns Policy', href: '/returns' },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-charcoal text-white relative overflow-hidden">
            {/* Ambient Leaf Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none -translate-y-1/2 translate-x-1/2">
                <Leaf size={200} className="text-forest" />
            </div>

            {/* Newsletter strip: Join the Circle */}
            <div className="py-24 border-b border-white/5 relative z-10">
                <div className="container-lg flex flex-col items-center text-center px-6">
                    <p className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-forest mb-6 animate-fade-in">
                        The Arbor Circle
                    </p>
                    <h3 className="font-serif text-5xl md:text-6xl text-white mb-6 tracking-tight">Elegance in Your Inbox</h3>
                    <p className="text-lg font-sans mb-12 text-white/50 max-w-xl leading-relaxed italic">
                        Subscribe to receive high-heritage collection alerts, bespoke style insights, and invite-only digital events.
                    </p>
                    <form className="w-full max-w-xl group" onSubmit={e => e.preventDefault()}>
                        <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 group-focus-within:border-forest/50 transition-all duration-500">
                            <div className="flex items-center flex-1 px-4 py-2">
                                <Mail size={18} className="text-gray-500 mr-3" />
                                <input
                                    type="email"
                                    placeholder="yourname@heritage.com"
                                    className="flex-1 bg-transparent text-sm font-sans text-white placeholder:text-gray-600 outline-none w-full"
                                />
                            </div>
                            <button className="bg-forest text-white px-10 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] shadow-xl shadow-forest/20 hover:shadow-forest/40 hover:-translate-y-1 transition-all duration-300">
                                Join Now
                            </button>
                        </div>
                        <p className="mt-6 text-[10px] font-sans font-bold uppercase tracking-widest text-gray-500">
                            Discretion Guaranteed. Unsubscribe with a single touch.
                        </p>
                    </form>
                </div>
            </div>

            {/* Main footer contents */}
            <div className="container-lg py-24 px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16 lg:gap-10">
                    {/* Brand column */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-forest/20 rounded-2xl flex items-center justify-center shadow-lg">
                                <Leaf size={24} className="text-forest" />
                            </div>
                            <span className="font-serif text-3xl tracking-tight text-white">Arbor Vitae</span>
                        </div>
                        <p className="text-sm font-sans leading-relaxed text-gray-400 max-w-xs">
                            Born from the forest, crafted for the discerning. Since 2018, we have defined the intersection of nature-inspired design and world-class tailoring.
                        </p>
                        {/* Social Presence */}
                        <div className="flex gap-4">
                            {[
                                { Icon: Instagram, label: 'Instagram' },
                                { Icon: Twitter, label: 'Twitter' },
                                { Icon: Facebook, label: 'Facebook' },
                                { Icon: Youtube, label: 'YouTube' },
                            ].map(({ Icon, label }) => (
                                <a
                                    key={label}
                                    href="#"
                                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-forest transition-all duration-300"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
                        <div key={heading}>
                            <h4 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-forest mb-8">
                                {heading}
                            </h4>
                            <ul className="space-y-4">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-xs font-sans font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all hover:tracking-[0.2em]"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar: The Audit */}
                <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-4 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-500">
                        <span>© {new Date().getFullYear()} Arbor Vitae Private Ltd</span>
                        <span className="hidden md:block w-1 h-1 rounded-full bg-white/20" />
                        <span>Crafted with Integrity in India</span>
                    </div>
                    
                    {/* Trust/Payment Infrastructure */}
                    <div className="flex items-center gap-3">
                        {['VISA', 'MC', 'AMEX', 'UPI', 'GPAY', 'PAYTM', 'COD'].map(p => (
                            <span
                                key={p}
                                className="px-3 py-1.5 text-[9px] font-sans font-bold border border-white/5 rounded-lg text-gray-600 hover:text-gray-400 hover:border-white/10 transition-colors"
                            >
                                {p}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

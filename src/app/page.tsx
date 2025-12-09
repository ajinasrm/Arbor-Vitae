'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import ProductCard from "@/components/ui/ProductCard";
import { useProductStore } from "@/store/product-store";
import { ArrowRight, Leaf, ShieldCheck, Sprout } from "lucide-react";

export default function Home() {
    const products = useProductStore((state) => state.products);
    const newArrivals = products.filter(p => p.isNew).slice(0, 4);

    return (
        <div className="flex flex-col gap-16 pb-16">
            {/* Hero Section */}
            <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2670&auto=format&fit=crop"
                        alt="Woman walking in nature wearing sustainable clothing"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-white tracking-tight text-shadow-lg">
                        Rooted in Style, <br className="hidden md:block" /> Growing in Grace.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto font-light leading-relaxed">
                        Experience the harmony of sustainable fashion. Timeless designs crafted from the earth, for the earth.
                    </p>
                    <div className="pt-4">
                        <Link href="/shop">
                            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 border-none text-lg px-8 py-6 rounded-full">
                                Shop Collection
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center text-center mb-12 space-y-4">
                    <span className="text-accent font-medium tracking-wider uppercase text-sm">Curated for you</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">Our Collections</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { name: "Women", image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1000&auto=format&fit=crop", href: "/shop?category=Women" },
                        { name: "Men", image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=1000&auto=format&fit=crop", href: "/shop?category=Men" },
                        { name: "Accessories", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop", href: "/shop?category=Accessories" },
                    ].map((cat) => (
                        <Link key={cat.name} href={cat.href} className="group relative h-[400px] overflow-hidden rounded-lg shadow-md">
                            <Image
                                src={cat.image}
                                alt={cat.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                            <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end">
                                <div>
                                    <h3 className="text-2xl font-serif font-bold text-white mb-2">{cat.name}</h3>
                                    <span className="text-white/80 text-sm group-hover:text-white transition-colors flex items-center gap-2">
                                        Explore <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* New Arrivals */}
            <section className="bg-muted/50 py-16">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <span className="text-accent font-medium tracking-wider uppercase text-sm">Just In</span>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mt-2">New Arrivals</h2>
                        </div>
                        <Link href="/shop" className="hidden md:flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors">
                            View All <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {newArrivals.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="mt-8 text-center md:hidden">
                        <Link href="/shop">
                            <Button variant="outline" className="w-full">
                                View All Arrivals
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Brand Story Snippet */}
            <section className="container mx-auto px-4 py-8">
                <div className="bg-primary rounded-2xl overflow-hidden shadow-2xl">
                    <div className="grid md:grid-cols-2">
                        <div className="relative h-64 md:h-auto min-h-[400px]">
                            <Image
                                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop"
                                alt="Close up of sustainable fabric texture"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center text-white">
                            <div className="flex items-center gap-2 text-accent mb-4">
                                <Sprout className="w-6 h-6" />
                                <span className="font-bold tracking-wider uppercase text-sm">Our Philosophy</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 leading-tight">
                                Weaving Sustainability into Every Thread
                            </h2>
                            <p className="text-secondary-foreground/80 mb-8 leading-relaxed text-lg">
                                Arbor Vitae represents a commitment to the planet and to you. We use only organically grown fibers, ethical manufacturing processes, and timeless designs throughout our collection.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                <div className="flex items-start gap-3">
                                    <Leaf className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold mb-1">Eco-Friendly</h4>
                                        <p className="text-sm text-secondary-foreground/70">100% Organic materials.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <ShieldCheck className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold mb-1">Ethical Labor</h4>
                                        <p className="text-sm text-secondary-foreground/70">Fair wages & safe conditions.</p>
                                    </div>
                                </div>
                            </div>

                            <Link href="/about">
                                <Button variant="secondary" className="self-start">
                                    Read Our Story
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

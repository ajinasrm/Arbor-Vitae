'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const categories = [
    {
        name: 'Women',
        href: '/shop?category=Women',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop',
        description: 'Elegance in every thread',
    },
    {
        name: 'Men',
        href: '/shop?category=Men',
        image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=1000&auto=format&fit=crop',
        description: 'Timeless durability',
    },
    {
        name: 'Accessories',
        href: '/shop?category=Accessories',
        image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=1000&auto=format&fit=crop',
        description: 'The perfect finishing touch',
    },
];

export default function FeaturedCategories() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-serif font-bold text-primary sm:text-4xl">Curated Collections</h2>
                    <p className="mt-4 text-muted-foreground">Find your perfect fit from our sustainably sourced lines.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <Link key={category.name} href={category.href} className="group relative block aspect-[4/5] overflow-hidden rounded-lg bg-gray-100">
                            <motion.div
                                className="h-full w-full"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover object-center"
                                />
                            </motion.div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                                <h3 className="text-2xl font-serif font-bold">{category.name}</h3>
                                <p className="mt-2 text-sm text-white/90 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                    {category.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

'use client';

import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative h-[90vh] w-full overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2670&auto=format&fit=crop")',
                }}
            >
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
                <div className="max-w-3xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-serif text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl"
                    >
                        Rooted in Style, <br /> Growing in Grace.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="mt-6 text-lg text-white/90 sm:text-xl max-w-2xl mx-auto"
                    >
                        Sustainable luxury crafted from the finest organic materials. Experience fashion that breathes life into your wardrobe.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto" asChild>
                            <Link href="/shop">Shop Collection</Link>
                        </Button>
                        <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto" asChild>
                            <Link href="/about">Our Philosophy</Link>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function BrandStory() {
    return (
        <section className="py-24 bg-secondary/5 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative order-2 lg:order-1 h-[400px] lg:h-[600px] rounded-lg overflow-hidden shadow-2xl">
                        <Image
                            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1313&auto=format&fit=crop"
                            alt="Sustainable fabric texture"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="order-1 lg:order-2 lg:pl-10">
                        <h2 className="text-3xl font-serif font-bold text-primary sm:text-4xl mb-6">
                            Wear Your Values
                        </h2>
                        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                At <span className="font-semibold text-primary">Arbor Vitae</span>, we believe fashion shouldn't cost the earth. Our name, "Tree of Life," reflects our commitment to growth, deep roots in sustainable practices, and designs that stand the test of time.
                            </p>
                            <p>
                                Every garment is crafted from organic materials, recycled fibers, or ethical tech-fabrics. We partner directly with artisans to ensure fair wages and minimize our carbon footprint.
                            </p>
                        </div>
                        <div className="mt-8">
                            <Button variant="default" size="lg" asChild>
                                <Link href="/about">Read Our Full Story</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

import Image from "next/image";

export default function About() {
    return (
        <div className="bg-background">
            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center">
                <Image
                    src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2564&auto=format&fit=crop"
                    alt="Forest texture"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">Arbor Vitae</h1>
                    <p className="text-xl md:text-2xl font-light tracking-wide">The Tree of Life</p>
                </div>
            </section>

            {/* Content */}
            <section className="container mx-auto px-4 py-20 max-w-4xl">
                <div className="prose prose-lg prose-stone mx-auto">
                    <h2 className="font-serif text-3xl md:text-4xl text-primary text-center mb-10">Our Roots</h2>
                    <p className="leading-relaxed text-muted-foreground text-lg mb-8">
                        Founded on the principles of sustainability and grace, Arbor Vitae was born from a desire to reconnect fashion with nature.
                        Just as the "Tree of Life" symbolizes growth, connection, and strength, our brand embodies these values in every stitch.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 py-10">
                        <div className="relative h-[300px] rounded-lg overflow-hidden">
                            <Image src="https://images.unsplash.com/photo-1532667449560-72a95c8d381b?q=80&w=1000&auto=format&fit=crop" alt="Sustainable sewing" fill className="object-cover" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3 className="font-serif text-2xl text-primary mb-4">Conscious Creation</h3>
                            <p className="text-muted-foreground">
                                We believe that what you wear should reflect who you are and what you stand for.
                                That's why we meticulously source materials that are kind to the earth—organic cotton,
                                hemp, and cruelty-free silks.
                            </p>
                        </div>
                    </div>

                    <p className="leading-relaxed text-muted-foreground text-lg">
                        Our journey is one of continuous improvement. From minimizing water usage in our production
                        processes to ensuring fair labor practices in every workshop we partner with, we are dedicated
                        to leaving a positive footprint. Fashion is fleeting, but style—and the planet—should last forever.
                    </p>
                </div>
            </section>
        </div>
    );
}

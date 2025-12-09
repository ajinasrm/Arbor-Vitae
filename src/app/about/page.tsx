import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="bg-background">
            <div className="relative h-[60vh] w-full overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1313&auto=format&fit=crop"
                    alt="About Arbor Vitae"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h1 className="text-5xl font-serif font-bold text-white tracking-widest uppercase">Our Story</h1>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-16 prose prose-lg prose-headings:font-serif prose-headings:text-primary">
                <h2>The Root of It All</h2>
                <p>
                    Arbor Vitae was born from a simple desire: to create clothing that honors the earth as much as the wearer. In a world of fast fashion and fleeting trends, we wanted to build something lasting. Like the ancient trees that inspire our name, we believe in deep roots.
                </p>
                <p>
                    Our journey began in 2023, seeking out artisans who still weave by hand and farmers who grow cotton without harmful chemicals. We realized that true luxury isn't about exclusivity—it's about the time, care, and conscience poured into every thread.
                </p>

                <h2>Growing with Grace</h2>
                <p>
                    Sustainability isn't a buzzword for us; it's our operating system. From buttons made of recycled brass to packaging that returns to the soil, every decision is weighed against its impact. We are committed to transparency, fair wages, and a circular fashion economy.
                </p>
            </div>
        </div>
    )
}

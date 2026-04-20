import Link from 'next/link';
import { STORES } from '@/data/products';
import { Leaf, Target, Heart, Sprout } from 'lucide-react';

export const metadata = { title: 'About Arbor Vitae | Our Story', description: 'The story of Arbor Vitae — India\'s premium nature-inspired menswear brand.' };

export default function AboutPage() {
    return (
        <div className="bg-cream">
            {/* Hero */}
            <section className="relative h-[80vh] min-h-[600px] overflow-hidden bg-charcoal">
                <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=85" alt="About Arbor Vitae" className="w-full h-full object-cover opacity-50 transition-transform duration-[2000s] hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/0 via-charcoal/40 to-charcoal" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <p className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-forest mb-6 animate-fade-in">Established MMXVIII</p>
                    <h1 className="font-serif text-6xl md:text-8xl text-white tracking-tighter mb-6 relative">
                        Arbor Vitae
                        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-24 h-[1px] bg-forest/50" />
                    </h1>
                    <p className="text-lg font-sans text-white/70 max-w-xl leading-relaxed italic">The Tree of Life. Born in the forests of Coorg. Crafted for those who value both heritage craftsmanship and the soul of the planet.</p>
                </div>
            </section>

            {/* Story */}
            <section className="py-32 px-6">
                <div className="container-lg grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="relative">
                        <div className="absolute top-[-40px] left-[-40px] w-24 h-24 bg-forest/5 rounded-full blur-3xl" />
                        <p className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-forest mb-4">The Origin</p>
                        <h2 className="font-serif text-5xl md:text-6xl text-charcoal tracking-tight mb-8">From the Forest, <br/>For the Discerning</h2>
                        <div className="space-y-6 text-gray-500 font-sans text-lg leading-relaxed">
                            <p>
                                Arbor Vitae (Latin for &quot;Tree of Life&quot;) was born in the emerald coffee plantations of Coorg, Karnataka. Our founders — Nikhil Rao and Priya Dixit — were avid naturalists who were frustrated that sustainable and luxury simply couldn&apos;t coexist in Indian menswear.
                            </p>
                            <p>
                                From our first studio in Bangalore&apos;s Indiranagar, we began crafting shirts from organic Egyptian cotton and suits from Italian wool, selling only direct-to-consumer to guarantee quality and fair pricing.
                            </p>
                            <p className="font-serif italic text-charcoal text-xl pt-4 border-l-2 border-forest pl-6">
                                &quot;We don&apos;t just create clothing; we preserve the dialogue between nature and the modern man.&quot;
                            </p>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-0 border border-forest/20 translate-x-6 translate-y-6 rounded-[3rem] transition-transform group-hover:translate-x-4 group-hover:translate-y-4 duration-700" />
                        <img src="https://images.unsplash.com/photo-1558171813-f3a96b1c4ef6?w=800&q=80" alt="Arbor Vitae founders" className="w-full object-cover rounded-[3rem] relative z-10 shadow-2xl" style={{ aspectRatio: '4/5' }} />
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-32 px-6 bg-charcoal relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(45,80,22,0.15),transparent_70%)]" />
                <div className="container-lg relative z-10">
                    <div className="text-center mb-20">
                        <p className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-forest mb-4">Our Integrity</p>
                        <h2 className="font-serif text-5xl text-white tracking-tight">The Heritage Pillars</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { Icon: Sprout, title: 'Sustainability', desc: 'Every fabric is responsibly sourced. We target net-zero emissions by 2028.' },
                            { Icon: Target, title: 'Craftsmanship', desc: 'Each garment passes through 40 quality checkpoints before it reaches your door.' },
                            { Icon: Heart, title: 'Fairness', desc: 'All artisans are paid living wages. We publish our supply chain annually.' },
                            { Icon: Leaf, title: 'Timelessness', desc: 'We create clothing meant to last a decade, not a season. Quality over quantity.' },
                        ].map(({ Icon, title, desc }) => (
                            <div key={title} className="bg-white/5 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all duration-500 group">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-forest/20 group-hover:scale-110 transition-transform duration-500">
                                    <Icon size={28} className="text-forest" />
                                </div>
                                <h3 className="font-serif text-2xl text-white mb-4 tracking-tight">{title}</h3>
                                <p className="text-sm font-sans leading-relaxed text-gray-400">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-24 px-6 border-y border-gray-100">
                <div className="container-lg grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {[
                        { num: '2018', label: 'Founded' },
                        { num: '120+', label: 'Team Members' },
                        { num: '4', label: 'Stores' },
                        { num: '50K+', label: 'Happy Clients' },
                    ].map(({ num, label }) => (
                        <div key={label} className="group">
                            <p className="font-serif text-6xl text-charcoal mb-2 tracking-tighter group-hover:text-forest transition-colors duration-500">{num}</p>
                            <p className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-gray-400">{label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-6">
                <div className="container-lg max-w-4xl mx-auto bg-charcoal rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-forest/10 blur-[100px] rounded-full" />
                    <div className="relative z-10">
                        <h2 className="font-serif text-5xl md:text-6xl text-white tracking-tight mb-8">Ready to Join the Forest?</h2>
                        <p className="text-lg font-sans text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed italic">
                            Discover our curated collections and define your digital heritage legacy.
                        </p>
                        <Link href="/shop" className="inline-block px-12 py-5 bg-forest text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-2xl shadow-xl shadow-forest/20 hover:shadow-forest/40 hover:-translate-y-1 transition-all duration-300">Shop the Collection</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

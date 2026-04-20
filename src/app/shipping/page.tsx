import Link from 'next/link';

export const metadata = { title: 'Shipping Policy | Arbor Vitae' };
export default function ShippingPage() {
    return (
        <div className="min-h-screen bg-cream">
            {/* Premium Header */}
            <div className="pt-32 pb-20 px-6 bg-charcoal relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(45,80,22,0.3),transparent_70%)]" />
                </div>
                <div className="container-lg relative z-10 text-center">
                    <p className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-forest mb-4">Operations & Compliance</p>
                    <h1 className="font-serif text-6xl text-white tracking-tight">Shipping Policy</h1>
                </div>
            </div>

            <div className="container-lg py-24 max-w-4xl mx-auto px-6">
                <div className="bg-white/70 backdrop-blur-md rounded-[3rem] p-12 md:p-20 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.08)] border border-white relative">
                    <div className="absolute top-10 right-10 opacity-10">
                        <Leaf size={120} className="text-forest" />
                    </div>
                    
                    <div className="space-y-16 relative z-10">
                        {[
                            { title: 'Free Standard Shipping', body: 'All orders above ₹2,999 qualify for our complimentary standard fulfillment across India. We aim for transit perfection within 3–5 business days.' },
                            { title: 'Express White-Glove Delivery', body: 'Accelerated transit (1–2 business days) is available for ₹349 within major metropolitan sectors: Bangalore, Mumbai, Delhi, Chennai, Hyderabad, Kolkata, and Pune.' },
                            { title: 'Custodial Processing', body: 'Orders submitted before 2:00 PM IST on business days are processed within the same cycle. Weekend submissions are prioritized for the next ensuing business cycle.' },
                            { title: 'Real-time Provenance Tracking', body: 'Upon dispatch, you will receive encrypted tracking credentials. You may monitor the journey via your Executive Account dashboard.' },
                            { title: 'Global Vision', body: 'Current logistics are optimized strictly for India. Global distribution expansion is slated for the 2027 fiscal year.' },
                        ].map(({ title, body }) => (
                            <div key={title} className="group">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-2 h-2 rounded-full bg-forest opacity-50 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100" />
                                    <h2 className="font-serif text-3xl text-charcoal">{title}</h2>
                                </div>
                                <p className="font-sans text-base leading-relaxed text-gray-500 max-w-2xl ml-6">{body}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 pt-12 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-xs font-sans font-bold uppercase tracking-widest text-gray-400">Effective Since 2018</p>
                        <Link href="/contact" className="text-xs font-sans font-bold uppercase tracking-widest text-forest hover:tracking-[0.2em] transition-all">Support Center</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const metadata = { title: 'Terms & Conditions | Arbor Vitae' };
export default function TermsPage() {
    return (
        <div className="min-h-screen bg-cream">
            {/* Premium Header */}
            <div className="pt-32 pb-20 px-6 bg-charcoal relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(45,80,22,0.3),transparent_70%)]" />
                </div>
                <div className="container-lg relative z-10 text-center">
                    <p className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-forest mb-4">Legal Framework</p>
                    <h1 className="font-serif text-6xl text-white tracking-tight">Terms & Conditions</h1>
                    <p className="text-sm font-sans mt-6 text-gray-400 font-medium uppercase tracking-widest italic">Last codified: March 2026</p>
                </div>
            </div>

            <div className="container-lg py-24 max-w-4xl mx-auto px-6">
                <div className="bg-white/70 backdrop-blur-md rounded-[3rem] p-12 md:p-20 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.08)] border border-white relative">
                    <div className="space-y-16 relative z-10">
                        {[
                            { title: '1. Acceptance of Terms', body: 'By accessing or acquiring assets from arborvitae.in, you acknowledge and agree to be bound by these formal Terms and Conditions and our Privacy Protocol. Institutional non-compliance mandates immediate cessation of service use.' },
                            { title: '2. Curated Assets & Valuation', body: 'All product descriptions and valuations are maintained with executive precision. We reserve the right to rectify inadvertent discrepancies and redact orders processed via incorrect valuation modules. All transactions are denominated in Indian Rupees (INR) and are GST-inclusive.' },
                            { title: '3. Transaction Fulfillment', body: 'Order confirmation is finalized upon successful capital clearance and the dispatch of a digital confirmation. We maintain the right to redact transactions due to inventory depletion, payment irregularities, or security risk flags.' },
                            { title: '4. Intellectual Proprietary Rights', body: 'All digital assets on this platform — including but not limited to branding, cinematic media, and heritage copy — are the exclusive property of Arbor Vitae Private Limited. Unauthorized reproduction is strictly prohibited under global copyright statutes.' },
                            { title: '5. Liability Protocol', body: 'Arbor Vitaes liability is strictly capped at the capital amount disbursed for the specific asset in question. We assume no responsibility for indirect or consequential disturbances arising from the use of our heritage products.' },
                            { title: '6. Governance & Jurisdiction', body: 'These Terms are governed by the established laws of India. Any legal dialogue shall be subject to the exclusive jurisdiction of the executive courts in Bangalore, Karnataka.' },
                        ].map(({ title, body }) => (
                            <div key={title} className="group">
                                <h2 className="font-serif text-3xl text-charcoal mb-4 group-hover:text-forest transition-colors duration-500">{title}</h2>
                                <p className="font-sans text-base leading-relaxed text-gray-500 max-w-2xl">{body}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 pt-12 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-xs font-sans font-bold uppercase tracking-widest text-gray-400 font-medium">Official Registry — Arbor Vitae PVT LTD</p>
                        <Link href="/contact" className="text-xs font-sans font-bold uppercase tracking-widest text-forest hover:tracking-[0.2em] transition-all">Institutional Support</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

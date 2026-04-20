import Link from 'next/link';

export const metadata = { title: 'Returns & Exchanges | Arbor Vitae' };
export default function ReturnsPage() {
    return (
        <div className="min-h-screen bg-cream">
            {/* Premium Header */}
            <div className="pt-32 pb-20 px-6 bg-charcoal relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(45,80,22,0.3),transparent_70%)]" />
                </div>
                <div className="container-lg relative z-10 text-center">
                    <p className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-forest mb-4">Post-Acquisition Support</p>
                    <h1 className="font-serif text-6xl text-white tracking-tight">Returns & Exchanges</h1>
                </div>
            </div>

            <div className="container-lg py-24 max-w-4xl mx-auto px-6">
                <div className="bg-white/70 backdrop-blur-md rounded-[3rem] p-12 md:p-20 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.08)] border border-white relative">
                    <div className="space-y-16 relative z-10">
                        {[
                            { title: 'The 30-Day Heritage Guarantee', body: 'We offer a definitive 30-day window for returns from the moment of delivery. To maintain the integrity of our collections, items must be unworn, unwashed, and returned in their original custodial packaging with all archival tags intact.' },
                            { title: 'The Return Protocol', body: 'Access your Executive Account dashboard, navigate to the Acquisition Ledger, select your specific order, and initiate the return request. A specialized courier will be dispatched for doorstep archival pickup within 48 operational hours.' },
                            { title: 'Executive Exchanges', body: 'To transition an asset to a different specification (size or color), we recommend initiating a return and simultaneously securing your new asset via the boutique. Processing cycles typically conclude within 7 business days.' },
                            { title: 'Capital Reconstitution', body: 'Refunds are executed back to the original funding source within 5–7 business days following the successful quality verification at our Heritage Center.' },
                            { title: 'Exclusions & Non-Returnable Assets', body: 'Custom/Bespoke configurations, assets marked as "Archival Sale", and hygiene-governed accessories cannot be returned once the security seal is breached.' },
                        ].map(({ title, body }) => (
                            <div key={title} className="group">
                                <h2 className="font-serif text-3xl text-charcoal mb-4 group-hover:text-forest transition-colors duration-500">{title}</h2>
                                <p className="font-sans text-base leading-relaxed text-gray-500 max-w-2xl">{body}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 pt-12 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-xs font-sans font-bold uppercase tracking-widest text-gray-400 font-medium italic">Service Level Agreement — v2.4</p>
                        <Link href="/account" className="text-xs font-sans font-bold uppercase tracking-widest text-forest hover:tracking-[0.2em] transition-all">My Acquisition Ledger</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

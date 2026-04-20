'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);

    return (
        <div className="min-h-screen bg-cream">
            {/* Premium Header */}
            <div className="pt-32 pb-20 px-6 bg-charcoal relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(45,80,22,0.3),transparent_70%)]" />
                </div>
                <div className="container-lg relative z-10 text-center">
                    <p className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-forest mb-4">Support Center</p>
                    <h1 className="font-serif text-6xl text-white tracking-tight">Get in Touch</h1>
                </div>
            </div>

            <section className="py-24 px-6">
                <div className="container-lg grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Left: contact info */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="font-serif text-4xl mb-4 text-charcoal">Global Headquarters</h2>
                            <p className="text-sm text-gray-500 font-sans leading-relaxed max-w-sm">Our executive concierge is available for personalized consultations and support regarding your heritage wardrobe.</p>
                        </div>
                        
                        <div className="space-y-8">
                            {[
                                { Icon: Mail, label: 'Executive Support', value: 'hello@arborvitae.in' },
                                { Icon: Phone, label: 'Concierge Line', value: '+91 80 2222 0000' },
                                { Icon: MapPin, label: 'Heritage Office', value: 'UB City, Vittal Mallya Road, Bangalore 560 001' },
                                { Icon: Clock, label: 'Operational Hours', value: 'Mon–Sat, 9:00 AM – 7:00 PM IST' },
                            ].map(({ Icon, label, value }) => (
                                <div key={label} className="flex items-start gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-white border border-gray-100 shadow-sm group-hover:shadow-md group-hover:border-forest/20 transition-all duration-500">
                                        <Icon size={22} className="text-forest" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] mb-1.5 text-gray-400">{label}</p>
                                        <p className="font-serif text-xl text-charcoal">{value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-8 bg-forest/5 rounded-3xl border border-forest/10 relative overflow-hidden group">
                            <div className="absolute top-[-20px] right-[-20px] opacity-10 group-hover:rotate-12 transition-transform duration-700">
                                <Leaf size={80} />
                            </div>
                            <p className="font-serif text-xl text-forest mb-2">WhatsApp Direct</p>
                            <p className="font-sans text-sm text-forest/70 leading-relaxed">For immediate resolution, engage with our concierge via encrypted messaging at +91 88889 00001.</p>
                        </div>
                    </div>

                    {/* Right: form */}
                    <div className="bg-white p-12 md:p-16 rounded-[3rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.06)] border border-gray-100 h-fit">
                        {!sent ? (
                            <>
                                <h3 className="font-serif text-3xl mb-8 text-charcoal">Secure Inquiry</h3>
                                <form className="space-y-8" onSubmit={e => { e.preventDefault(); setSent(true); }}>
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Your Identity</label>
                                        <input className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-sans text-sm focus:ring-2 focus:ring-forest/20 transition-all" placeholder="e.g. Arjun Mehta" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Digital Correspondence</label>
                                        <input type="email" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-sans text-sm focus:ring-2 focus:ring-forest/20 transition-all" placeholder="you@heritage.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Subject of Interest</label>
                                        <input className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-sans text-sm focus:ring-2 focus:ring-forest/20 transition-all" placeholder="Fulfillment / Bespoke Services / General Inquiry" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Detailed Inquiry</label>
                                        <textarea rows={5} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-sans text-sm focus:ring-2 focus:ring-forest/20 transition-all resize-none" placeholder="Elaborate on your requirements…" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
                                    </div>
                                    <button type="submit" className="w-full bg-forest text-white py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] shadow-xl shadow-forest/20 hover:shadow-forest/40 hover:-translate-y-1 transition-all duration-300">Transmit Message</button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-20">
                                <div className="w-20 h-20 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse text-forest">
                                    <Mail size={32} />
                                </div>
                                <h3 className="font-serif text-3xl mb-4 text-charcoal">Transmission Received</h3>
                                <p className="text-sm font-sans text-gray-500 leading-relaxed">Our concierge team will respond within one full business cycle.</p>
                                <button onClick={() => setSent(false)} className="mt-10 text-xs font-sans font-bold uppercase tracking-widest text-forest hover:tracking-[0.2em] transition-all">New Inquiry</button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

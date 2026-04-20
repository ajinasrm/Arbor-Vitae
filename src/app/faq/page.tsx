'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '@/data/products';

export const dynamic = 'force-dynamic';

export default function FAQPage() {
    const [open, setOpen] = useState<string | null>(null);

    return (
        <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
            <div className="text-center py-14" style={{ background: 'var(--forest-green)' }}>
                <p className="text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--soft-gold)' }}>Help Centre</p>
                <h1 className="font-serif text-5xl text-white">Frequently Asked Questions</h1>
            </div>

            <div className="container-lg py-16 max-w-3xl mx-auto">
                <div className="bg-white">
                    {FAQS.map(faq => (
                        <div key={faq.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                            <button
                                id={`faq-${faq.id}`}
                                className="w-full flex items-center justify-between px-6 py-5 text-left"
                                onClick={() => setOpen(open === faq.id ? null : faq.id)}
                            >
                                <span className="font-sans font-medium text-sm pr-4">{faq.question}</span>
                                <ChevronDown size={18} className={`transition-transform duration-200 flex-shrink-0 ${open === faq.id ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`accordion-content px-6 ${open === faq.id ? 'pb-5' : ''}`} style={{ maxHeight: open === faq.id ? '300px' : '0', opacity: open === faq.id ? 1 : 0 }}>
                                <p className="text-sm font-sans leading-relaxed" style={{ color: 'var(--text-muted)' }}>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="font-sans text-sm mb-4" style={{ color: 'var(--text-muted)' }}>Didn&apos;t find your answer?</p>
                    <a href="/contact" className="btn-primary text-xs">Contact Our Team</a>
                </div>
            </div>
        </div>
    );
}

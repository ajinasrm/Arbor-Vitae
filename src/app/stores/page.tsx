import { STORES } from '@/data/products';
import { MapPin, Phone, Clock } from 'lucide-react';

export const metadata = { title: 'Store Locator | Arbor Vitae', description: 'Find an Arbor Vitae store near you.' };

export default function StoresPage() {
    return (
        <div className="min-h-screen">
            <div className="text-center py-14" style={{ background: 'var(--forest-green)' }}>
                <p className="text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--soft-gold)' }}>Find Us</p>
                <h1 className="font-serif text-5xl text-white">Store Locator</h1>
                <p className="text-sm font-sans mt-3" style={{ color: 'rgba(255,255,255,0.7)' }}>Visit us in person — we&apos;d love to meet you.</p>
            </div>
            <section className="section-padding" style={{ background: 'var(--cream)' }}>
                <div className="container-lg grid grid-cols-1 md:grid-cols-2 gap-6">
                    {STORES.map(store => (
                        <div key={store.id} className="bg-white p-6" style={{ borderLeft: '4px solid var(--soft-gold)' }}>
                            <h2 className="font-serif text-2xl mb-3">{store.city}</h2>
                            <div className="space-y-2">
                                <div className="flex items-start gap-2 text-sm font-sans">
                                    <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--forest-green)' }} />
                                    <span style={{ color: 'var(--text-muted)' }}>{store.address}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-sans">
                                    <Phone size={14} style={{ color: 'var(--forest-green)' }} />
                                    <span style={{ color: 'var(--text-muted)' }}>{store.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-sans">
                                    <Clock size={14} style={{ color: 'var(--forest-green)' }} />
                                    <span style={{ color: 'var(--text-muted)' }}>{store.hours}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

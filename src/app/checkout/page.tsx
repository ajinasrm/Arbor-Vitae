'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Check, ChevronRight, CreditCard, Smartphone, Building2, Wallet, Truck, Leaf } from 'lucide-react';

const STEPS = ['Shipping', 'Delivery', 'Payment', 'Review'];

export default function CheckoutPage() {
    const { items, subtotal, clearCart } = useCart();
    const router = useRouter(); // Assuming useRouter is available from previous sessions or added
    const [step, setStep] = useState(0);
    const [placed, setPlaced] = useState(false);

    const [address, setAddress] = useState({ firstName: '', lastName: '', email: '', phone: '', street: '', apartment: '', city: '', state: '', pincode: '' });
    const [delivery, setDelivery] = useState<'standard' | 'express'>('standard');
    const [payType, setPayType] = useState<'card' | 'upi' | 'netbanking' | 'wallet' | 'cod'>('card');
    const [coupon, setCoupon] = useState('');
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [couponMsg, setCouponMsg] = useState('');

    const shippingCost = delivery === 'express' ? 349 : subtotal >= 2999 ? 0 : 199;
    const total = subtotal + shippingCost - couponDiscount;

    const COUPONS: Record<string, number> = { WELCOME10: Math.round(subtotal * 0.1), FIRST15: Math.round(subtotal * 0.15), FOREST20: Math.round(subtotal * 0.2) };

    const applyCoupon = () => {
        const disc = COUPONS[coupon.toUpperCase()];
        if (disc) { setCouponDiscount(disc); setCouponMsg(`✓ Coupon applied! You save ₹${disc.toLocaleString('en-IN')}`); }
        else { setCouponDiscount(0); setCouponMsg('Invalid coupon code.'); }
    };

    if (placed) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-charcoal px-4 relative overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-forest/20 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-forest/10 blur-[120px] rounded-full" />
                
                <div className="text-center max-w-lg bg-white/5 backdrop-blur-3xl p-16 rounded-[4rem] border border-white/10 shadow-2xl relative z-10 animate-premium-modal">
                    <div className="w-24 h-24 bg-forest rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-xl shadow-forest/20">
                        <Check size={48} className="text-white" />
                    </div>
                    <h1 className="font-serif text-5xl mb-6 text-white tracking-tight">Acquisition Finalized</h1>
                    <p className="font-sans text-sm mb-4 text-gray-400 leading-relaxed">
                        Your heritage assets have been secured. A formal confirmation dispatch is being transmitted to <strong className="text-forest">{address.email}</strong>.
                    </p>
                    <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] mb-12 text-gray-600">
                        Estimated Fulfillment: {delivery === 'express' ? '24–48 HOURS' : '3–5 BUSINESS DAYS'}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/account/orders" className="bg-forest text-white px-10 py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] hover:shadow-xl hover:-translate-y-1 transition-all">Track Order</Link>
                        <Link href="/shop" className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white/10 transition-all">Return to Boutique</Link>
                    </div>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-cream gap-8 px-6 text-center">
                <div className="w-20 h-20 bg-charcoal/5 rounded-full flex items-center justify-center text-charcoal/20">
                    <Truck size={40} />
                </div>
                <div>
                    <h1 className="font-serif text-4xl mb-4 text-charcoal tracking-tight">Your Acquisition Ledger is Empty</h1>
                    <p className="text-sm font-sans text-gray-400 mb-8 max-w-xs mx-auto italic leading-relaxed">The forest awaits. Discover our curated collections to begin your heritage journey.</p>
                </div>
                <Link href="/shop" className="bg-charcoal text-white px-12 py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] shadow-xl shadow-charcoal/20 hover:-translate-y-1 transition-all">Shop Collections</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream">
            {/* Minimal Secure Header */}
            <div className="bg-charcoal py-10 px-6 border-b border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-full bg-forest/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="container-lg flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                        <Leaf size={24} className="text-forest" />
                        <span className="font-serif text-2xl text-white tracking-tight">Checkout Vault</span>
                    </div>
                    <div className="hidden md:flex items-center gap-4 text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-gray-500">
                        <CreditCard size={14} className="text-forest" />
                        Secure Encrypted Transaction
                    </div>
                </div>
            </div>

            <div className="container-lg py-16 px-6">
                <div className="mb-12">
                    <Link href="/shop" className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-charcoal transition-all">
                        ← Continue Shopping
                    </Link>
                </div>

                {/* Step indicator: Progress Bar Style */}
                <div className="max-w-4xl mx-auto mb-20">
                    <div className="flex items-center justify-between relative">
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-100 -translate-y-1/2" />
                        <div 
                            className="absolute top-1/2 left-0 h-[2px] bg-forest -translate-y-1/2 transition-all duration-700" 
                            style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
                        />
                        {STEPS.map((s, i) => (
                            <div key={s} className="relative z-10 flex flex-col items-center gap-4">
                                <button
                                    onClick={() => i < step && setStep(i)}
                                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                        i <= step ? 'bg-forest text-white shadow-lg shadow-forest/20' : 'bg-white text-gray-300 border border-gray-100'
                                    }`}
                                >
                                    {i < step ? <Check size={18} /> : (
                                        <span className="font-serif italic text-lg">{i + 1}</span>
                                    )}
                                </button>
                                <span className={`text-[10px] font-sans font-bold uppercase tracking-[0.2em] ${i === step ? 'text-charcoal' : 'text-gray-400'}`}>
                                    {s}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Left: Input Modules */}
                    <div className="lg:col-span-8 animate-fade-in">
                        {step === 0 && (
                            <div className="bg-white/70 backdrop-blur-md rounded-[3rem] p-10 md:p-14 shadow-sm border border-white">
                                <h2 className="font-serif text-4xl text-charcoal tracking-tight mb-12">Registry Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Given Name</label>
                                        <input className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-sans text-sm focus:ring-2 focus:ring-forest/20 transition-all" value={address.firstName} onChange={e => setAddress(a => ({ ...a, firstName: e.target.value }))} placeholder="Arjun" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Family Name</label>
                                        <input className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-sans text-sm focus:ring-2 focus:ring-forest/20 transition-all" value={address.lastName} onChange={e => setAddress(a => ({ ...a, lastName: e.target.value }))} placeholder="Mehta" required />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Digital Correspondence</label>
                                        <input type="email" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-sans text-sm focus:ring-2 focus:ring-forest/20 transition-all" value={address.email} onChange={e => setAddress(a => ({ ...a, email: e.target.value }))} placeholder="you@heritage.com" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Operational Phone</label>
                                        <input className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-sans text-sm focus:ring-2 focus:ring-forest/20 transition-all" value={address.phone} onChange={e => setAddress(a => ({ ...a, phone: e.target.value }))} placeholder="+91 98765 43210" required />
                                    </div>
                                </div>
                                <div className="space-y-8 mb-12">
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Street Address</label>
                                        <input className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-sans text-sm focus:ring-2 focus:ring-forest/20 transition-all" value={address.street} onChange={e => setAddress(a => ({ ...a, street: e.target.value }))} placeholder="123, MG Road" required />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">City</label>
                                            <input className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-sans text-sm focus:ring-2 focus:ring-forest/20 transition-all" value={address.city} onChange={e => setAddress(a => ({ ...a, city: e.target.value }))} placeholder="Bangalore" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">State</label>
                                            <input className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-sans text-sm focus:ring-2 focus:ring-forest/20 transition-all" value={address.state} onChange={e => setAddress(a => ({ ...a, state: e.target.value }))} placeholder="Karnataka" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Pincode</label>
                                            <input className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-sans text-sm focus:ring-2 focus:ring-forest/20 transition-all font-medium" value={address.pincode} onChange={e => setAddress(a => ({ ...a, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) }))} placeholder="560001" maxLength={6} required />
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full bg-forest text-white py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] shadow-xl shadow-forest/20 hover:scale-[1.02] transition-all" onClick={() => setStep(1)}>Proceed to Delivery Logistics</button>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="bg-white/70 backdrop-blur-md rounded-[3rem] p-10 md:p-14 shadow-sm border border-white">
                                <h2 className="font-serif text-4xl text-charcoal tracking-tight mb-12">Logistic Sovereignty</h2>
                                <div className="space-y-4 mb-12">
                                    {[
                                        { id: 'standard', label: 'Standard Heritage Transit', desc: 'Complimentary fulfillment via surface routes (3–5 days)', price: subtotal >= 2999 ? 'COMPLIMENTARY' : '₹199' },
                                        { id: 'express', label: 'Executive Express Delivery', desc: 'Prioritized air-transit for high-priority acquisition (24–48h)', price: '₹349' },
                                    ].map(({ id, label, desc, price }) => (
                                        <label
                                            key={id}
                                            className={`flex items-center gap-6 p-8 rounded-[2rem] border cursor-pointer transition-all duration-500 hover:shadow-lg ${
                                                delivery === id ? 'bg-forest/5 border-forest/30' : 'bg-white border-gray-100'
                                            }`}
                                        >
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                                delivery === id ? 'border-forest' : 'border-gray-200'
                                            }`}>
                                                {delivery === id && <div className="w-3 h-3 bg-forest rounded-full" />}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-serif text-xl text-charcoal mb-1">{label}</p>
                                                <p className="text-xs font-sans text-gray-400 font-medium uppercase tracking-widest">{desc}</p>
                                            </div>
                                            <p className="font-serif text-lg text-forest">{price}</p>
                                        </label>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={() => setStep(0)} className="px-10 py-5 bg-gray-50 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:bg-gray-100 transition-all">Back</button>
                                    <button onClick={() => setStep(2)} className="flex-1 bg-forest text-white py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] shadow-xl shadow-forest/20 hover:scale-[1.02] transition-all">Select Payment Protocol</button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="bg-white/70 backdrop-blur-md rounded-[3rem] p-10 md:p-14 shadow-sm border border-white">
                                <h2 className="font-serif text-4xl text-charcoal tracking-tight mb-12">Settlement Module</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                                    {[
                                        { id: 'card', label: 'Executive Credit', Icon: CreditCard },
                                        { id: 'upi', label: 'UPI Transaction', Icon: Smartphone },
                                        { id: 'netbanking', label: 'Institutional Banking', Icon: Building2 },
                                        { id: 'cod', label: 'Settlement on Entry', Icon: Truck },
                                    ].map(({ id, label, Icon }) => (
                                        <label
                                            key={id}
                                            className={`flex items-center gap-4 p-6 rounded-2xl border cursor-pointer transition-all ${
                                                payType === id ? 'bg-charcoal text-white border-charcoal shadow-xl' : 'bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100'
                                            }`}
                                        >
                                            <Icon size={20} className={payType === id ? 'text-forest' : ''} />
                                            <span className="font-sans font-bold text-[10px] uppercase tracking-[0.2em]">{label}</span>
                                            {payType === id && <Check size={16} className="ml-auto text-forest" />}
                                        </label>
                                    ))}
                                </div>

                                {payType === 'card' && (
                                    <div className="bg-white/50 p-8 rounded-[2rem] border border-gray-100 mb-12 space-y-6">
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Card Credentials</label>
                                            <input className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 font-sans text-sm focus:ring-2 focus:ring-forest/20 transition-all font-medium tracking-widest" placeholder="XXXX XXXX XXXX XXXX" maxLength={19} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Expiry Cipher</label>
                                                <input className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 font-sans text-sm focus:ring-2 focus:ring-forest/20 transition-all" placeholder="MM / YY" maxLength={7} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Secure CVV</label>
                                                <input className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 font-sans text-sm focus:ring-2 focus:ring-forest/20 transition-all" type="password" placeholder="•••" maxLength={4} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-4">
                                    <button onClick={() => setStep(1)} className="px-10 py-5 bg-gray-50 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:bg-gray-100 transition-all">Back</button>
                                    <button onClick={() => setStep(3)} className="flex-1 bg-forest text-white py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] shadow-xl shadow-forest/20 hover:scale-[1.02] transition-all">Review Final Audit</button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="bg-white/70 backdrop-blur-md rounded-[3rem] p-10 md:p-14 shadow-sm border border-white">
                                <h2 className="font-serif text-4xl text-charcoal tracking-tight mb-8 text-center">Executive Audit</h2>
                                <p className="text-center text-sm font-sans text-gray-400 mb-12 italic leading-relaxed">Verifying provenance and settlement details before final commitment.</p>
                                
                                <div className="space-y-4 mb-12">
                                    {items.map(item => {
                                        const price = Math.round(item.product.basePrice * (1 - item.product.discountPercentage / 100));
                                        return (
                                            <div key={item.variant.id} className="flex items-center gap-6 p-6 bg-white/50 rounded-3xl border border-gray-50 transition-all hover:bg-white hover:shadow-md group">
                                                <img src={item.product.images[0].url} alt={item.product.name} className="w-16 h-20 object-cover rounded-xl shadow-sm group-hover:scale-105 transition-transform" />
                                                <div className="flex-1">
                                                    <p className="font-serif text-lg text-charcoal">{item.product.name}</p>
                                                    <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-gray-400 mt-1">{item.variant.color} · {item.variant.size} · QUANTITY: {item.quantity}</p>
                                                </div>
                                                <p className="font-serif text-xl text-charcoal">₹{(price * item.quantity).toLocaleString('en-IN')}</p>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="flex gap-4">
                                    <button onClick={() => setStep(2)} className="px-10 py-5 bg-gray-50 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:bg-gray-100 transition-all">Back</button>
                                    <button onClick={() => { clearCart(); setPlaced(true); }} className="flex-1 bg-charcoal text-white py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.5em] shadow-2xl hover:bg-forest transition-all">
                                        COMMIT ACQUISITION — ₹{total.toLocaleString('en-IN')}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Jewelry Box Order Summary */}
                    <div className="lg:col-span-4 sticky top-24">
                        <div className="bg-charcoal p-10 rounded-[3rem] shadow-2xl border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-forest/20 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                            
                            <h2 className="font-serif text-2xl text-white mb-8 tracking-tight relative z-10">Ledger Summary</h2>
                            
                            <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar relative z-10">
                                {items.map(item => {
                                    const price = Math.round(item.product.basePrice * (1 - item.product.discountPercentage / 100));
                                    return (
                                        <div key={item.variant.id} className="flex items-center gap-4">
                                            <div className="relative">
                                                <img src={item.product.images[0].url} alt="" className="w-12 h-16 object-cover rounded-xl border border-white/10" />
                                                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-2xl bg-forest text-white text-[10px] font-bold flex items-center justify-center shadow-lg">{item.quantity}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-sans font-bold text-white uppercase tracking-widest line-clamp-1">{item.product.name}</p>
                                                <p className="text-[10px] font-sans text-white/40 uppercase tracking-widest mt-0.5">{item.variant.size}</p>
                                            </div>
                                            <p className="text-xs font-serif text-forest">₹{(price * item.quantity).toLocaleString('en-IN')}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Coupon Logic: Premium Style */}
                            <div className="mb-10 relative z-10">
                                <div className="flex gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl group focus-within:border-forest/50 transition-all">
                                    <input className="flex-1 bg-transparent px-4 py-2 text-xs font-sans text-white uppercase tracking-widest outline-none placeholder:text-white/20" placeholder="CIPHER" value={coupon} onChange={e => setCoupon(e.target.value.toUpperCase())} />
                                    <button onClick={applyCoupon} className="bg-forest text-white px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:shadow-lg transition-all">Apply</button>
                                </div>
                                {couponMsg && <p className={`text-[9px] mt-2 font-sans font-bold uppercase tracking-widest text-center ${couponMsg.startsWith('✓') ? 'text-forest' : 'text-red-400'}`}>{couponMsg}</p>}
                            </div>

                            {/* Totals: Ledger Style */}
                            <div className="space-y-4 relative z-10 pt-8 border-t border-white/5">
                                <div className="flex justify-between text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-white/40">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-white/40">
                                    <span>Logistics</span>
                                    <span className={shippingCost === 0 ? 'text-forest' : ''}>{shippingCost === 0 ? 'COMPLIMENTARY' : `₹${shippingCost}`}</span>
                                </div>
                                {couponDiscount > 0 && (
                                    <div className="flex justify-between text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-forest">
                                        <span>Redemption ({coupon})</span>
                                        <span>−₹{couponDiscount.toLocaleString('en-IN')}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-end pt-4 border-t border-white/10">
                                    <span className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-white/70">Final Valuation</span>
                                    <span className="font-serif text-4xl text-white tracking-tighter">₹{total.toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <div className="mt-12 flex items-center justify-center gap-3 opacity-20 group-hover:opacity-40 transition-opacity">
                                <Check size={12} className="text-white" />
                                <span className="text-[8px] font-sans font-bold uppercase tracking-[0.3em] text-white">SSL CERTIFIED SECURE ACQUISITION</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

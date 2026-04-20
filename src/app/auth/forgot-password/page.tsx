'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Leaf } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-charcoal">
            {/* Ambient Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-forest/20 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-forest/10 blur-[120px] rounded-full" />
            
            <div className="w-full max-w-md bg-white/5 backdrop-blur-3xl p-12 rounded-[3rem] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative z-10 animate-premium-modal">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-12 h-12 bg-forest rounded-2xl flex items-center justify-center shadow-lg shadow-forest/20">
                        <Leaf size={24} className="text-white" />
                    </div>
                    <span className="font-serif text-2xl tracking-tight text-white">Arbor Vitae</span>
                </div>

                {!sent ? (
                    <>
                        <h1 className="font-serif text-4xl mb-3 text-white tracking-tight">Forgot Password?</h1>
                        <p className="text-sm font-sans mb-10 text-gray-400 leading-relaxed">
                            Enter your registered identity and we&apos;ll transmit a high-priority reset link to your inbox.
                        </p>
                        <form className="space-y-6" onSubmit={e => { e.preventDefault(); setSent(true); }}>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-500 ml-1">Email Address</label>
                                <input 
                                    id="forgot-email" 
                                    type="email" 
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white font-sans text-sm focus:outline-none focus:border-forest/50 transition-all placeholder:text-gray-600" 
                                    placeholder="you@heritage.com" 
                                    value={email} 
                                    onChange={e => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                            <button type="submit" className="w-full bg-forest text-white flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl shadow-forest/20 hover:shadow-forest/40 hover:-translate-y-1 transition-all duration-300">
                                Transmit Reset Link <ArrowRight size={16} />
                            </button>
                        </form>
                        <p className="text-center mt-8">
                            <Link href="/auth/login" className="text-xs font-sans font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Return to Vault</Link>
                        </p>
                    </>
                ) : (
                    <div className="text-center py-4">
                        <div className="w-20 h-20 bg-forest/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                            <ArrowRight size={32} className="text-forest" />
                        </div>
                        <h2 className="font-serif text-3xl mb-4 text-white tracking-tight">Transmission Sent</h2>
                        <p className="text-sm font-sans mb-10 text-gray-400 leading-relaxed">
                            We&apos;ve dispatched a secure reset link to <strong className="text-forest">{email}</strong>. It will remain active for the next 15 minutes.
                        </p>
                        <Link href="/auth/login" className="inline-block px-10 py-4 bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all">Back to Login</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

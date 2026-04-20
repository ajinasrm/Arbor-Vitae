'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight, Leaf } from 'lucide-react';

export default function RegisterPage() {
    const [showPwd, setShowPwd] = useState(false);
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '', terms: false });

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className="hidden lg:flex relative overflow-hidden" style={{ background: 'var(--forest-green)' }}>
                <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&q=80"
                    alt="Arbor Vitae"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="relative z-10 flex flex-col justify-end p-12 pb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <Leaf size={32} style={{ color: 'var(--soft-gold)' }} />
                        <span className="font-serif text-3xl text-white">Arbor Vitae</span>
                    </div>
                    <h2 className="font-serif text-4xl text-white mb-4 leading-tight">Join the forest.<br />Discover who you are.</h2>
                    <p className="font-sans text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        Create an account for early access, exclusive offers, and your personal style journey.
                    </p>
                </div>
            </div>

            <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-24">
                <div className="w-full max-w-md mx-auto">
                    <div className="flex items-center gap-2 mb-8 lg:hidden">
                        <Leaf size={24} style={{ color: 'var(--forest-green)' }} />
                        <span className="font-serif text-xl" style={{ color: 'var(--forest-green)' }}>Arbor Vitae</span>
                    </div>

                    <h1 className="font-serif text-3xl mb-2">Create Account</h1>
                    <p className="text-sm font-sans mb-8" style={{ color: 'var(--text-muted)' }}>
                        Already have an account?{' '}
                        <Link href="/auth/login" className="font-medium underline hover:text-[var(--forest-green)] transition-colors">
                            Sign in
                        </Link>
                    </p>

                    <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-sans font-semibold uppercase tracking-wider mb-1.5">First Name</label>
                                <input id="reg-first" type="text" className="input-field" placeholder="Arjun" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} required />
                            </div>
                            <div>
                                <label className="block text-xs font-sans font-semibold uppercase tracking-wider mb-1.5">Last Name</label>
                                <input id="reg-last" type="text" className="input-field" placeholder="Mehta" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-sans font-semibold uppercase tracking-wider mb-1.5">Email</label>
                            <input id="reg-email" type="email" className="input-field" placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} autoComplete="email" required />
                        </div>

                        <div>
                            <label className="block text-xs font-sans font-semibold uppercase tracking-wider mb-1.5">Phone Number</label>
                            <input id="reg-phone" type="tel" className="input-field" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} autoComplete="tel" required />
                        </div>

                        <div>
                            <label className="block text-xs font-sans font-semibold uppercase tracking-wider mb-1.5">Password</label>
                            <div className="relative">
                                <input id="reg-password" type={showPwd ? 'text' : 'password'} className="input-field pr-10" placeholder="Min. 8 characters" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required minLength={8} />
                                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} onClick={() => setShowPwd(v => !v)}>
                                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-sans font-semibold uppercase tracking-wider mb-1.5">Confirm Password</label>
                            <input id="reg-confirm-password" type="password" className="input-field" placeholder="••••••••" value={form.confirmPassword} onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))} required />
                        </div>

                        <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                            <input id="reg-terms" type="checkbox" checked={form.terms} onChange={e => setForm(f => ({ ...f, terms: e.target.checked }))} className="accent-[var(--forest-green)] w-4 h-4 flex-shrink-0 mt-0.5" required />
                            <span className="text-sm font-sans leading-relaxed">
                                I agree to the{' '}
                                <Link href="/terms" className="underline hover:text-[var(--forest-green)] transition-colors">Terms & Conditions</Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="underline hover:text-[var(--forest-green)] transition-colors">Privacy Policy</Link>
                            </span>
                        </label>

                        <button type="submit" className="btn-primary w-full text-xs py-4 mt-2">
                            Create Account <ArrowRight size={14} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

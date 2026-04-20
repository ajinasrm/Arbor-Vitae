'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight, Leaf } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const { login } = useUser();
    const router = useRouter();
    const [showPwd, setShowPwd] = useState(false);
    const [form, setForm] = useState({ email: '', password: '', remember: false });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Admin check
        if (form.email === 'ajinas0496@gmail.com' && form.password === 'Arborvitae@admin007') {
            login(form.email, 'admin');
            router.push('/admin');
        } else {
            login(form.email, 'user');
            router.push('/account');
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Left: visual panel */}
            <div className="hidden lg:flex relative overflow-hidden" style={{ background: 'var(--forest-green)' }}>
                <img
                    src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1000&q=80"
                    alt="Arbor Vitae"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="relative z-10 flex flex-col justify-end p-12 pb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <Leaf size={32} style={{ color: 'var(--soft-gold)' }} />
                        <span className="font-serif text-3xl text-white">Arbor Vitae</span>
                    </div>
                    <h2 className="font-serif text-4xl text-white mb-4 leading-tight">
                        Welcome back<br />to the forest.
                    </h2>
                    <p className="font-sans text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        Sign in to access your orders, wishlist, and exclusive member benefits.
                    </p>
                </div>
            </div>

            {/* Right: form */}
            <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-24" style={{ background: 'white' }}>
                <div className="w-full max-w-md mx-auto">
                    {/* Mobile logo */}
                    <div className="flex items-center gap-2 mb-8 lg:hidden">
                        <Leaf size={24} style={{ color: 'var(--forest-green)' }} />
                        <span className="font-serif text-xl" style={{ color: 'var(--forest-green)' }}>Arbor Vitae</span>
                    </div>

                    <h1 className="font-serif text-3xl mb-2">Sign In</h1>
                    <p className="text-sm font-sans mb-8" style={{ color: 'var(--text-muted)' }}>
                        Don&apos;t have an account?{' '}
                        <Link href="/auth/register" className="font-medium underline hover:text-[var(--forest-green)] transition-colors">
                            Create one
                        </Link>
                    </p>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-xs font-sans font-semibold uppercase tracking-wider mb-1.5">Email / Phone</label>
                            <input
                                id="login-email"
                                type="text"
                                className="input-field"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                autoComplete="email"
                                required
                            />
                        </div>
                        <div>
                            <div className="flex justify-between mb-1.5">
                                <label className="text-xs font-sans font-semibold uppercase tracking-wider">Password</label>
                                <Link href="/auth/forgot-password" className="text-xs font-sans underline hover:text-[var(--forest-green)] transition-colors" style={{ color: 'var(--text-muted)' }}>
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    id="login-password"
                                    type={showPwd ? 'text' : 'password'}
                                    className="input-field pr-10"
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                                    autoComplete="current-password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                    style={{ color: 'var(--text-muted)' }}
                                    onClick={() => setShowPwd(v => !v)}
                                    aria-label={showPwd ? 'Hide password' : 'Show password'}
                                >
                                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <label className="flex items-center gap-2.5 cursor-pointer">
                            <input
                                type="checkbox"
                                id="login-remember"
                                checked={form.remember}
                                onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))}
                                className="accent-[var(--forest-green)] w-4 h-4"
                            />
                            <span className="text-sm font-sans">Remember me</span>
                        </label>

                        <button type="submit" className="btn-primary w-full text-xs py-4">
                            Sign In <ArrowRight size={14} />
                        </button>
                    </form>

                    <div className="divider-gold my-6">
                        <span className="text-xs font-sans px-2" style={{ color: 'var(--text-muted)' }}>Or continue with</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { label: 'Google', icon: '🇬' },
                            { label: 'Facebook', icon: '🇫' },
                        ].map(({ label, icon }) => (
                            <button
                                key={label}
                                id={`social-login-${label.toLowerCase()}`}
                                className="flex items-center justify-center gap-2 py-3 border text-sm font-sans font-medium hover:border-[var(--forest-green)] hover:text-[var(--forest-green)] transition-colors"
                                style={{ borderColor: 'var(--border-light)' }}
                            >
                                <span>{icon}</span> {label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

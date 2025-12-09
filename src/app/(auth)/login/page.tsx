'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/Button';
import { Circle, User } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (email && password) {
            const isAdmin = email === 'ajinas0496@gmail.com' && password === 'Alaksa0070@';

            login({
                id: isAdmin ? 'admin-user-id' : crypto.randomUUID(),
                name: isAdmin ? 'Admin User' : email.split('@')[0],
                email: email,
                role: isAdmin ? 'admin' : 'customer'
            });

            router.push(isAdmin ? '/admin' : '/');
        } else {
            setError('Invalid credentials');
        }
        setLoading(false);
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg border border-border/40">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                        <User className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-primary tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Sign in to access your account and order history
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full rounded-md border-0 py-3 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full rounded-md border-0 py-3 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                            {error}
                        </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                            <label htmlFor="remember-me" className="ml-2 block text-muted-foreground">Remember me</label>
                        </div>
                        <a href="#" className="font-medium text-primary hover:text-primary/80">
                            Forgot password?
                        </a>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="w-full justify-center py-3"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </div>
                </form>

                <p className="mt-4 text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link href="/signup" className="font-medium text-primary hover:text-primary/80 transition-colors">
                        Sign up for free
                    </Link>
                </p>
            </div>
        </div>
    );
}

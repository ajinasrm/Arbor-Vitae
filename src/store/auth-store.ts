'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type User = {
    id: string;
    name: string;
    email: string;
    role: 'customer' | 'admin';
};

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
    register: (name: string, email: string, password: string) => void; // Mock registration
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            login: (user) => set({ user, isAuthenticated: true }),
            logout: () => set({ user: null, isAuthenticated: false }),
            register: (name, email, password) => {
                // Mock registration logic - in a real app this would call an API
                // For now, we just log them in immediately
                const newUser: User = {
                    id: crypto.randomUUID(),
                    name,
                    email,
                    role: 'customer'
                };
                set({ user: newUser, isAuthenticated: true });
            }
        }),
        {
            name: 'arbor-vitae-auth',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

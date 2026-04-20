'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    email: string;
    firstName: string;
    lastName: string;
    role: 'user' | 'admin';
}

interface UserContextType {
    user: User | null;
    login: (email: string, role: 'user' | 'admin') => void;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('av_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (email: string, role: 'user' | 'admin') => {
        const newUser: User = {
            email,
            firstName: role === 'admin' ? 'Admin' : 'Arjun',
            lastName: role === 'admin' ? 'User' : 'Mehta',
            role
        };
        setUser(newUser);
        localStorage.setItem('av_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('av_user');
    };

    return (
        <UserContext.Provider value={{ 
            user, 
            login, 
            logout, 
            isAuthenticated: !!user, 
            isAdmin: user?.role === 'admin' 
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

'use client';

import { useProductStore } from '@/store/product-store';
import { Shirt, DollarSign, ShoppingBag, Users } from 'lucide-react';

export default function StatsCards() {
    const { products } = useProductStore();

    const totalProducts = products.length;
    const totalValue = products.reduce((acc, p) => acc + p.price, 0);

    // Mock data for demo
    const totalOrders = 124;
    const totalRevenue = 452000;
    const totalCustomers = 89;

    const stats = [
        {
            name: 'Total Inventory',
            value: totalProducts,
            icon: Shirt,
            color: 'text-primary',
            bg: 'bg-primary/10',
        },
        {
            name: 'Inventory Value',
            value: `₹${totalValue.toLocaleString()}`,
            icon: DollarSign,
            color: 'text-secondary',
            bg: 'bg-secondary/10',
        },
        {
            name: 'Total Orders',
            value: totalOrders,
            icon: ShoppingBag,
            color: 'text-accent',
            bg: 'bg-accent/10',
        },
        {
            name: 'Total Revenue',
            value: `₹${totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            color: 'text-primary',
            bg: 'bg-muted',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
                <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm border border-border flex items-center">
                    <div className={`p-3 rounded-full ${stat.bg} mr-4`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

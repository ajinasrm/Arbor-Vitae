'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import CSVImport from '@/components/admin/CSVImport';
import ProductTable from '@/components/admin/ProductTable';
import AddProductForm from '@/components/admin/AddProductForm';
import StatsCards from '@/components/admin/StatsCards';
import OrderList from '@/components/admin/OrderList';
import { LayoutDashboard } from 'lucide-react';

export default function AdminPage() {
    const { user, isAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'admin') {
            router.push('/login');
        }
    }, [isAuthenticated, user, router]);

    if (!isAuthenticated || user?.role !== 'admin') return null;

    return (
        <div className="min-h-screen bg-muted/20">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-primary flex items-center gap-2">
                            <LayoutDashboard className="w-8 h-8" />
                            Dashboard
                        </h1>
                        <p className="text-muted-foreground mt-1">Manage your inventory, uploads, and store settings.</p>
                    </div>
                </div>

                <StatsCards />

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="xl:col-span-2 space-y-8">
                        {/* Inventory Section */}
                        <section className="bg-white p-6 rounded-lg shadow-sm border border-border">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-primary">Inventory Management</h2>
                            </div>
                            <ProductTable />
                        </section>

                        {/* Orders Section */}
                        <section>
                            <OrderList />
                        </section>
                    </div>

                    {/* Sidebar Tools */}
                    <div className="space-y-8">
                        <section>
                            <CSVImport />
                        </section>

                        <section>
                            <AddProductForm />
                        </section>

                        <section className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                            <h3 className="font-medium text-primary mb-2">Admin Note</h3>
                            <p className="text-sm text-primary/80">
                                This is a client-side demo. Data is stored in your browser's LocalStorage.
                                Clearing your cache will reset the inventory to default.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

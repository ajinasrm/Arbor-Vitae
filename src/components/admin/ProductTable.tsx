'use client';

import { useProductStore } from '@/store/product-store';
import { Product } from '@/lib/products';
import { Trash2, TrendingUp, Download } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export default function ProductTable() {
    const { products, removeProduct } = useProductStore();
    const [filter, setFilter] = useState('');

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(filter.toLowerCase()) ||
        p.category.toLowerCase().includes(filter.toLowerCase())
    );

    const exportCSV = () => {
        const headers = ["id", "name", "price", "category", "subCategory", "description", "isNew"];
        const rows = products.map(p => [
            p.id,
            `"${p.name.replace(/"/g, '""')}"`, // Escape quotes
            p.price,
            p.category,
            p.subCategory,
            `"${p.description.replace(/"/g, '""')}"`,
            p.isNew
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "arbor_vitae_inventory.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="border border-input rounded-md px-3 py-2 text-sm w-full max-w-sm"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <Button variant="outline" size="sm" onClick={exportCSV}>
                    <Download className="w-4 h-4 mr-2" /> Export CSV
                </Button>
            </div>

            <div className="border border-border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-border">
                    <thead className="bg-muted/50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Product</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-border">
                        {filteredProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-muted/30">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0 relative overflow-hidden rounded-md border border-border">
                                            <Image className="object-cover" src={product.image} alt="" fill sizes="40px" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-foreground">{product.name}</div>
                                            <div className="text-xs text-muted-foreground truncate max-w-[150px]">{product.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary">
                                        {product.category}
                                    </span>
                                    <span className="ml-2 text-xs text-muted-foreground">{product.subCategory}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                                    ₹{product.price.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {product.isNew && (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                                            <TrendingUp className="w-3 h-3" /> New
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => removeProduct(product.id)}
                                        className="text-red-500 hover:text-red-700 transition-colors bg-red-50 p-2 rounded-full hover:bg-red-100"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredProducts.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

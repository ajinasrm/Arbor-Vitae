'use client';

import { useState } from 'react';
import { useProductStore } from '@/store/product-store';
import { Button } from '@/components/ui/Button';
import { Product } from '@/lib/products';
import { PlusCircle } from 'lucide-react';

export default function AddProductForm() {
    const { addProduct } = useProductStore();
    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        price: 0,
        category: 'Women',
        subCategory: 'Tops',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000',
        description: '',
        sizes: ['S', 'M', 'L'],
        isNew: true
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.price) return;

        const newProduct: Product = {
            id: crypto.randomUUID(),
            name: formData.name,
            price: Number(formData.price),
            category: formData.category as any,
            subCategory: formData.subCategory as any,
            image: formData.image || '',
            description: formData.description || '',
            features: ['Sustainable Material', 'Ethically Made'],
            sizes: formData.sizes || ['One Size'],
            isNew: formData.isNew
        };

        addProduct(newProduct);
        setIsOpen(false);
        // Reset form partially
        setFormData({ ...formData, name: '', price: 0, description: '' });
    };

    if (!isOpen) {
        return (
            <Button onClick={() => setIsOpen(true)} className="w-full sm:w-auto">
                <PlusCircle className="w-4 h-4 mr-2" /> Add Product Manually
            </Button>
        )
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-border mt-6">
            <h3 className="text-lg font-medium text-primary mb-4">Add New Product</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Product Name</label>
                        <input
                            type="text"
                            required
                            className="w-full border border-input rounded px-3 py-2"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Price (₹)</label>
                        <input
                            type="number"
                            required
                            className="w-full border border-input rounded px-3 py-2"
                            value={formData.price}
                            onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <select
                            className="w-full border border-input rounded px-3 py-2 bg-white"
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                        >
                            <option value="Women">Women</option>
                            <option value="Men">Men</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Sub Category</label>
                        <input
                            type="text"
                            className="w-full border border-input rounded px-3 py-2"
                            value={formData.subCategory}
                            onChange={e => setFormData({ ...formData, subCategory: e.target.value as any })}
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">Image URL</label>
                        <input
                            type="url"
                            required
                            className="w-full border border-input rounded px-3 py-2"
                            value={formData.image}
                            onChange={e => setFormData({ ...formData, image: e.target.value })}
                        />
                        <p className="text-xs text-muted-foreground">Use an Unsplash URL for demo.</p>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            className="w-full border border-input rounded px-3 py-2"
                            rows={3}
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button type="submit">Publish Product</Button>
                </div>
            </form>
        </div>
    );
}

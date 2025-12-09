'use client';

import { useState } from 'react';
import Papa from 'papaparse';
import { Button } from '@/components/ui/Button';
import { useProductStore } from '@/store/product-store';
import { Product } from '@/lib/products';
import { Upload, FileUp, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function CSVImport() {
    const { addProducts } = useProductStore();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setError(null);
        setSuccess(null);
        setFileName(null);

        if (!file) return;

        setFileName(file.name);

        if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
            setError('Please upload a valid CSV file.');
            return;
        }

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                if (results.errors.length > 0) {
                    setError(`Error parsing CSV: ${results.errors[0].message}`);
                    return;
                }

                try {
                    const newProducts: Product[] = results.data.map((row: any, index) => {
                        // Basic validation
                        if (!row.name || !row.price) {
                            throw new Error(`Row ${index + 1} is missing required fields (name or price).`);
                        }

                        return {
                            id: row.id || crypto.randomUUID(),
                            name: row.name,
                            price: parseInt(row.price) || 0,
                            category: row.category || 'Accessories',
                            subCategory: row.subCategory || 'Other',
                            image: row.image || 'https://via.placeholder.com/400',
                            description: row.description || '',
                            features: row.features ? row.features.split('|') : [],
                            sizes: row.sizes ? row.sizes.split('|') : ['One Size'],
                            isNew: row.isNew === 'true',
                        } as Product;
                    });

                    addProducts(newProducts);
                    setSuccess(`Successfully imported ${newProducts.length} products.`);
                } catch (err: any) {
                    setError(err.message || 'Failed to process product data.');
                }
            },
            error: (err) => {
                setError(`File read error: ${err.message}`);
            }
        });
    };

    const downloadTemplate = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "name,price,category,subCategory,image,description,features,sizes,isNew\n"
            + "Sample Product,15000,Women,Tops,https://example.com/image.jpg,Description here,Feature 1|Feature 2,S|M|L,true";
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "arbor_vitae_template.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
            <h3 className="text-lg font-medium text-primary mb-4 flex items-center gap-2">
                <FileUp className="w-5 h-5" /> Import Products via CSV
            </h3>

            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="relative">
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Button variant="outline" className="w-full sm:w-auto">
                            <Upload className="w-4 h-4 mr-2" />
                            {fileName || "Select CSV File"}
                        </Button>
                    </div>
                    <Button variant="ghost" size="sm" onClick={downloadTemplate} className="text-xs text-muted-foreground hover:text-foreground">
                        Download Template
                    </Button>
                </div>

                {error && (
                    <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                {success && (
                    <div className="flex items-start gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-md">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <p>{success}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

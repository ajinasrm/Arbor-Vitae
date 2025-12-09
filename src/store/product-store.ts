import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, products as initialProducts } from '@/lib/products';

interface ProductState {
    products: Product[];
    addProduct: (product: Product) => void;
    addProducts: (products: Product[]) => void;
    removeProduct: (id: string) => void;
    resetProducts: () => void;
}

export const useProductStore = create<ProductState>()(
    persist(
        (set) => ({
            products: initialProducts,
            addProduct: (product) => set((state) => ({
                products: [product, ...state.products]
            })),
            addProducts: (newProducts) => set((state) => ({
                products: [...newProducts, ...state.products]
            })),
            removeProduct: (id) => set((state) => ({
                products: state.products.filter((p) => p.id !== id)
            })),
            resetProducts: () => set({ products: initialProducts }),
        }),
        {
            name: 'arbor-vitae-products',
        }
    )
);

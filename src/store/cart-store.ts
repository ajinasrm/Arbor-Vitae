import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/products';

export interface CartItem extends Product {
    quantity: number;
    selectedSize: string;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    addItem: (product: Product, size: string) => void;
    removeItem: (productId: string, size: string) => void;
    updateQuantity: (productId: string, size: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            isOpen: false,
            addItem: (product, size) => set((state) => {
                const existingItem = state.items.find(
                    (item) => item.id === product.id && item.selectedSize === size
                );

                if (existingItem) {
                    return {
                        items: state.items.map((item) =>
                            item.id === product.id && item.selectedSize === size
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                        isOpen: true, // open cart when adding
                    };
                }

                return {
                    items: [...state.items, { ...product, quantity: 1, selectedSize: size }],
                    isOpen: true,
                };
            }),
            removeItem: (id, size) => set((state) => ({
                items: state.items.filter((item) => !(item.id === id && item.selectedSize === size)),
            })),
            updateQuantity: (id, size, quantity) => set((state) => ({
                items: state.items.map((item) =>
                    item.id === id && item.selectedSize === size
                        ? { ...item, quantity: Math.max(1, quantity) }
                        : item
                ),
            })),
            clearCart: () => set({ items: [] }),
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
        }),
        {
            name: 'arbor-vitae-cart',
        }
    )
);

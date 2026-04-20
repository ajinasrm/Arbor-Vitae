'use client';
import { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, Product, ProductVariant } from '@/types';

interface CartState {
    items: CartItem[];
    isOpen: boolean;
}

type CartAction =
    | { type: 'ADD_ITEM'; product: Product; variant: ProductVariant; quantity: number }
    | { type: 'REMOVE_ITEM'; variantId: string }
    | { type: 'UPDATE_QTY'; variantId: string; quantity: number }
    | { type: 'CLEAR_CART' }
    | { type: 'TOGGLE_DRAWER' }
    | { type: 'OPEN_DRAWER' }
    | { type: 'CLOSE_DRAWER' };

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existing = state.items.find(i => i.variant.id === action.variant.id);
            if (existing) {
                return {
                    ...state,
                    items: state.items.map(i =>
                        i.variant.id === action.variant.id
                            ? { ...i, quantity: Math.min(i.quantity + action.quantity, action.variant.stock) }
                            : i
                    ),
                    isOpen: true,
                };
            }
            return {
                ...state,
                items: [...state.items, { product: action.product, variant: action.variant, quantity: action.quantity }],
                isOpen: true,
            };
        }
        case 'REMOVE_ITEM':
            return { ...state, items: state.items.filter(i => i.variant.id !== action.variantId) };
        case 'UPDATE_QTY':
            return {
                ...state,
                items: state.items
                    .map(i => i.variant.id === action.variantId ? { ...i, quantity: action.quantity } : i)
                    .filter(i => i.quantity > 0),
            };
        case 'CLEAR_CART':
            return { ...state, items: [] };
        case 'TOGGLE_DRAWER':
            return { ...state, isOpen: !state.isOpen };
        case 'OPEN_DRAWER':
            return { ...state, isOpen: true };
        case 'CLOSE_DRAWER':
            return { ...state, isOpen: false };
        default:
            return state;
    }
}

interface CartContextValue {
    items: CartItem[];
    isOpen: boolean;
    itemCount: number;
    subtotal: number;
    addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
    removeItem: (variantId: string) => void;
    updateQty: (variantId: string, quantity: number) => void;
    clearCart: () => void;
    toggleDrawer: () => void;
    openDrawer: () => void;
    closeDrawer: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

    const discountedPrice = (p: Product) =>
        Math.round(p.basePrice * (1 - p.discountPercentage / 100));

    const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = state.items.reduce((sum, i) => sum + discountedPrice(i.product) * i.quantity, 0);

    return (
        <CartContext.Provider value={{
            items: state.items,
            isOpen: state.isOpen,
            itemCount,
            subtotal,
            addItem: (product, variant, qty = 1) => dispatch({ type: 'ADD_ITEM', product, variant, quantity: qty }),
            removeItem: (variantId) => dispatch({ type: 'REMOVE_ITEM', variantId }),
            updateQty: (variantId, quantity) => dispatch({ type: 'UPDATE_QTY', variantId, quantity }),
            clearCart: () => dispatch({ type: 'CLEAR_CART' }),
            toggleDrawer: () => dispatch({ type: 'TOGGLE_DRAWER' }),
            openDrawer: () => dispatch({ type: 'OPEN_DRAWER' }),
            closeDrawer: () => dispatch({ type: 'CLOSE_DRAWER' }),
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used inside CartProvider');
    return ctx;
}

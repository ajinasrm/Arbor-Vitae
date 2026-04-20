'use client';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
    const { items, isOpen, closeDrawer, removeItem, updateQty, subtotal, itemCount } = useCart();

    const shippingFree = subtotal >= 2999;
    const shippingCost = shippingFree ? 0 : 199;
    const total = subtotal + shippingCost;

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[180] bg-black/50 animate-fade-in"
                onClick={closeDrawer}
            />

            {/* Drawer */}
            <div className="cart-drawer z-[190]">
                {/* Header */}
                <div
                    className="flex items-center justify-between px-6 py-4 flex-shrink-0"
                    style={{ borderBottom: '1px solid var(--border-light)' }}
                >
                    <div className="flex items-center gap-2">
                        <ShoppingBag size={20} style={{ color: 'var(--forest-green)' }} />
                        <h2 className="font-serif text-xl">Your Bag</h2>
                        {itemCount > 0 && (
                            <span
                                className="text-xs font-sans font-semibold px-2 py-0.5 rounded-full text-white"
                                style={{ background: 'var(--forest-green)' }}
                            >
                                {itemCount}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={closeDrawer}
                        className="p-1.5 rounded-full hover:bg-[var(--cream)] transition-colors"
                        aria-label="Close cart"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Free shipping progress */}
                {!shippingFree && subtotal > 0 && (
                    <div className="px-6 py-3 text-xs font-sans" style={{ background: 'var(--cream)' }}>
                        <div className="flex justify-between mb-1.5">
                            <span style={{ color: 'var(--text-muted)' }}>Add ₹{(2999 - subtotal).toLocaleString('en-IN')} more for free shipping</span>
                            <span style={{ color: 'var(--forest-green)', fontWeight: 600 }}>
                                {Math.min(Math.round((subtotal / 2999) * 100), 100)}%
                            </span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-light)' }}>
                            <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{ width: `${Math.min((subtotal / 2999) * 100, 100)}%`, background: 'var(--forest-green)' }}
                            />
                        </div>
                    </div>
                )}
                {shippingFree && subtotal > 0 && (
                    <div className="px-6 py-2.5 text-xs font-sans font-semibold text-center text-white" style={{ background: 'var(--forest-green)' }}>
                        🎉 You've unlocked free shipping!
                    </div>
                )}

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center py-16">
                            <ShoppingBag size={56} style={{ color: 'var(--border-light)' }} className="mb-4" />
                            <h3 className="font-serif text-xl mb-2">Your bag is empty</h3>
                            <p className="text-sm font-sans mb-6" style={{ color: 'var(--text-muted)' }}>
                                Discover our premium collection and add something special.
                            </p>
                            <button onClick={closeDrawer} className="btn-primary text-xs py-3 px-6">
                                Shop Now
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {items.map((item) => {
                                const price = Math.round(item.product.basePrice * (1 - item.product.discountPercentage / 100));
                                return (
                                    <div key={item.variant.id} className="flex gap-4">
                                        <Link href={`/product/${item.product.id}`} onClick={closeDrawer} className="flex-shrink-0">
                                            <img
                                                src={item.product.images.find(i => i.isPrimary)?.url || item.product.images[0].url}
                                                alt={item.product.name}
                                                className="w-20 h-24 object-cover"
                                                style={{ background: 'var(--cream)' }}
                                            />
                                        </Link>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <Link href={`/product/${item.product.id}`} onClick={closeDrawer}>
                                                        <p className="text-sm font-sans font-medium line-clamp-1 hover:text-[var(--forest-green)] transition-colors">
                                                            {item.product.name}
                                                        </p>
                                                    </Link>
                                                    <p className="text-xs font-sans mt-0.5" style={{ color: 'var(--text-muted)' }}>
                                                        {item.variant.color} / {item.variant.size}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.variant.id)}
                                                    className="ml-2 flex-shrink-0 text-muted hover:text-red-600 transition-colors"
                                                    aria-label="Remove item"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between mt-3">
                                                {/* Qty control */}
                                                <div className="flex items-center border" style={{ borderColor: 'var(--border-light)' }}>
                                                    <button
                                                        onClick={() => updateQty(item.variant.id, item.quantity - 1)}
                                                        className="w-7 h-7 flex items-center justify-center hover:bg-[var(--cream)] transition-colors"
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-sans font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQty(item.variant.id, Math.min(item.quantity + 1, item.variant.stock))}
                                                        className="w-7 h-7 flex items-center justify-center hover:bg-[var(--cream)] transition-colors"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                                <p className="text-sm font-sans font-semibold">
                                                    ₹{(price * item.quantity).toLocaleString('en-IN')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="px-6 py-5 flex-shrink-0" style={{ borderTop: '1px solid var(--border-light)' }}>
                        <div className="space-y-2 mb-4 text-sm font-sans">
                            <div className="flex justify-between">
                                <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                                <span>₹{subtotal.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
                                <span style={{ color: shippingFree ? 'var(--forest-green)' : undefined }}>
                                    {shippingFree ? 'Free' : `₹${shippingCost}`}
                                </span>
                            </div>
                            <div className="flex justify-between font-semibold text-base pt-2" style={{ borderTop: '1px solid var(--border-light)' }}>
                                <span>Total</span>
                                <span>₹{total.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                        <Link
                            href="/checkout"
                            onClick={closeDrawer}
                            className="btn-primary w-full text-center block text-xs"
                        >
                            Proceed to Checkout
                        </Link>
                        <button
                            onClick={closeDrawer}
                            className="w-full text-center text-xs font-sans mt-3 underline underline-offset-2"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

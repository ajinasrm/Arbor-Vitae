'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

export default function CartSidebar() {
    const { isOpen, closeCart, items, removeItem, updateQuantity } = useCartStore();

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeCart}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-background shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-foreground font-serif">
                                                    Shopping Cart
                                                </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-muted-foreground hover:text-foreground"
                                                        onClick={closeCart}
                                                    >
                                                        <span className="absolute -inset-0.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <X className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    {items.length === 0 ? (
                                                        <div className="flex flex-col items-center justify-center py-12 text-center">
                                                            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                                                            <p className="text-lg font-medium text-foreground">Your cart is empty</p>
                                                            <p className="mt-1 text-sm text-muted-foreground">
                                                                Start adding some sustainable fashion to your wardrobe.
                                                            </p>
                                                            <div className="mt-6">
                                                                <Button onClick={closeCart} variant="outline">
                                                                    Continue Shopping
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <ul role="list" className="-my-6 divide-y divide-border">
                                                            {items.map((item) => (
                                                                <li key={`${item.id}-${item.selectedSize}`} className="flex py-6">
                                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border">
                                                                        <Image
                                                                            src={item.image}
                                                                            alt={item.name}
                                                                            width={96}
                                                                            height={96}
                                                                            className="h-full w-full object-cover object-center"
                                                                        />
                                                                    </div>

                                                                    <div className="ml-4 flex flex-1 flex-col">
                                                                        <div>
                                                                            <div className="flex justify-between text-base font-medium text-foreground">
                                                                                <h3>
                                                                                    <Link href={`/product/${item.id}`} onClick={closeCart}>
                                                                                        {item.name}
                                                                                    </Link>
                                                                                </h3>
                                                                                <p className="ml-4">₹{(item.price * item.quantity).toLocaleString()}</p>
                                                                            </div>
                                                                            <p className="mt-1 text-sm text-muted-foreground">{item.category} - {item.selectedSize}</p>
                                                                        </div>
                                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                                            <div className="flex items-center border border-border rounded-md">
                                                                                <button
                                                                                    type="button"
                                                                                    className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                                                                    onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                                                                                    disabled={item.quantity <= 1}
                                                                                >
                                                                                    <Minus className="h-4 w-4" />
                                                                                </button>
                                                                                <span className="px-2 font-medium min-w-[20px] text-center">{item.quantity}</span>
                                                                                <button
                                                                                    type="button"
                                                                                    className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                                                                    onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                                                                                >
                                                                                    <Plus className="h-4 w-4" />
                                                                                </button>
                                                                            </div>

                                                                            <div className="flex">
                                                                                <button
                                                                                    type="button"
                                                                                    className="font-medium text-accent hover:text-accent/80 transition-colors"
                                                                                    onClick={() => removeItem(item.id, item.selectedSize)}
                                                                                >
                                                                                    Remove
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {items.length > 0 && (
                                            <div className="border-t border-border px-4 py-6 sm:px-6">
                                                <div className="flex justify-between text-base font-medium text-foreground">
                                                    <p>Subtotal</p>
                                                    <p>₹{subtotal.toLocaleString()}</p>
                                                </div>
                                                <p className="mt-0.5 text-sm text-muted-foreground">
                                                    Shipping and taxes calculated at checkout.
                                                </p>
                                                <div className="mt-6">
                                                    <Button className="w-full" size="lg">
                                                        Checkout
                                                    </Button>
                                                </div>
                                                <div className="mt-6 flex justify-center text-center text-sm text-muted-foreground">
                                                    <p>
                                                        or{' '}
                                                        <button
                                                            type="button"
                                                            className="font-medium text-primary hover:text-primary/90"
                                                            onClick={closeCart}
                                                        >
                                                            Continue Shopping
                                                            <span aria-hidden="true"> &rarr;</span>
                                                        </button>
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

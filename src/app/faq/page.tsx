'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to select countries globally. Carbon-neutral shipping options are available at checkout."
    },
    {
        question: "What is your return policy?",
        answer: "We offer a 30-day return window for unworn items with tags attached. As a sustainable brand, we encourage mindful purchasing to reduce shipping impact."
    },
    {
        question: "How do I care for organic cotton?",
        answer: "We recommend washing on cold with gentle, eco-friendly detergents and air drying to preserve the fiber quality and save energy."
    },
    {
        question: "Are your materials certified?",
        answer: "Absolutely. Our cotton is GOTS certified, and our wool is RWS (Responsible Wool Standard) certified. We believe in full transparency."
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="bg-background py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-serif font-bold text-primary mb-12 text-center">Frequently Asked Questions</h1>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-border rounded-lg overflow-hidden bg-white">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="flex items-center justify-between w-full p-6 text-left"
                            >
                                <span className="font-medium text-foreground text-lg">{faq.question}</span>
                                <ChevronDown
                                    className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                                />
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-muted-foreground">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

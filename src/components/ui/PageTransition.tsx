'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHome = pathname === '/';

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={cn(!isHome && "pt-20")}
        >
            {children}
        </motion.div>
    );
}

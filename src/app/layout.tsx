import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import { UserProvider } from '@/context/UserContext';

export const metadata: Metadata = {
  title: 'Arbor Vitae — Premium Menswear | Tree of Life',
  description:
    'Discover Arbor Vitae, India\'s premium nature-inspired menswear brand. Shop our curated collection of shirts, blazers, suits, trousers and accessories crafted from the finest sustainable fabrics.',
  keywords: 'Arbor Vitae, premium menswear, sustainable fashion, formal wear, luxury clothing, Indian fashion brand',
  openGraph: {
    title: 'Arbor Vitae — Premium Menswear',
    description: 'Nature-inspired luxury men\'s fashion. Fine fabrics, exceptional tailoring.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <UserProvider>
          <CartProvider>
            <WishlistProvider>
              <Header />
              <main>{children}</main>
              <Footer />
              <CartDrawer />
            </WishlistProvider>
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}

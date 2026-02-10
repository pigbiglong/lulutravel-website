import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/components/providers/AuthProvider';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'lulutravel - Premium China Tours',
    template: '%s | lulutravel',
  },
  description: 'Discover the beauty of China with premium, customized travel experiences. Expert-guided tours through ancient gardens, culinary adventures, and natural wonders.',
  keywords: ['China tours', 'travel', 'customized tours', 'premium travel', 'Oriental adventures'],
  authors: [{ name: 'lulutravel' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lulutravel.com',
    siteName: 'lulutravel',
    title: 'lulutravel - Premium China Tours',
    description: 'Discover the beauty of China with premium, customized travel experiences.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'lulutravel - Premium China Tours',
    description: 'Discover the beauty of China with premium, customized travel experiences.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${cormorant.variable} ${inter.variable} font-sans antialiased bg-cream text-dai`}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

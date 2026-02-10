# lulutravel Next.js Refactor Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Refactor static HTML website to Next.js 14+ application with Tailwind CSS, Zustand, and Supabase.

**Architecture:** Create modern React application with App Router, component-based architecture, state management, and full SEO configuration. All content in English.

**Tech Stack:** Next.js 14+, TypeScript, Tailwind CSS, Zustand, Supabase, Vercel

---

## Phase 1: Project Setup

### Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `eslint.config.mjs`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`

**Step 1: Create package.json**

```json
{
  "name": "lulutravel-next",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@supabase/supabase-js": "^2.39.0",
    "zustand": "^4.5.0",
    "lucide-react": "^0.344.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "14.2.0"
  }
}
```

**Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Step 3: Create next.config.mjs**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'zhlldovnjbfyznyrvwma.supabase.co',
      }
    ],
  },
};

export default nextConfig;
```

**Step 4: Create tailwind.config.ts**

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1a3a2f',
        bamboo: '#4a7c59',
        dai: '#2c3e44',
        wood: '#c4a574',
        'wood-light': '#d4b88a',
        cream: '#f8f5f0',
        stone: '#8a8a8a',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
```

**Step 5: Create remaining config files**

- eslint.config.mjs: Standard Next.js ESLint config
- postcss.config.mjs: Standard PostCSS config with Tailwind

**Step 6: Install dependencies**

Run: `npm install`

**Step 7: Commit**

```bash
git add package.json tsconfig.json next.config.mjs tailwind.config.ts postcss.config.mjs eslint.config.mjs
git commit -m "chore: initialize Next.js project with TypeScript and Tailwind"
```

---

### Task 2: Create Project Directory Structure

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `src/app/page.tsx`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Input.tsx`
- Create: `src/components/ui/Modal.tsx`
- Create: `src/lib/supabase.ts`
- Create: `src/lib/utils.ts`
- Create: `src/lib/constants.ts`
- Create: `src/types/index.ts`
- Create: `src/store/useCartStore.ts`
- Create: `src/store/useAuthStore.ts`
- Create: `src/store/useUIStore.ts`

**Step 1: Create src/app/layout.tsx**

```tsx
import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

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
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

**Step 2: Create src/app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-ink: #1a3a2f;
  --color-bamboo: #4a7c59;
  --color-dai: #2c3e44;
  --color-wood: #c4a574;
  --color-wood-light: #d4b88a;
  --color-cream: #f8f5f0;
  --color-stone: #8a8a8a;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    @apply bg-cream text-dai;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-serif font-semibold;
  }
}

@layer components {
  .btn-primary {
    @apply inline-flex items-center justify-center px-6 py-3 bg-ink text-white font-medium rounded-lg
           transition-all duration-300 hover:bg-ink/90 hover:shadow-lg hover:-translate-y-0.5;
  }
  
  .btn-secondary {
    @apply inline-flex items-center justify-center px-6 py-3 bg-wood text-white font-medium rounded-lg
           transition-all duration-300 hover:bg-wood-light hover:shadow-lg hover:-translate-y-0.5;
  }
  
  .btn-outline {
    @apply inline-flex items-center justify-center px-6 py-3 border-2 border-ink text-ink font-medium rounded-lg
           transition-all duration-300 hover:bg-ink hover:text-white;
  }
  
  .card {
    @apply bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300
           hover:shadow-xl hover:-translate-y-1;
  }
  
  .input {
    @apply w-full px-4 py-3 border border-stone/30 rounded-lg bg-white
           focus:outline-none focus:ring-2 focus:ring-bamboo focus:border-transparent
           transition-all duration-200;
  }
  
  .section-title {
    @apply text-3xl md:text-4xl font-serif font-semibold text-ink;
  }
  
  .container-custom {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

**Step 3: Create src/types/index.ts**

```typescript
export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  heroImage: string;
  gallery: string[];
  highlights: string[];
  itinerary: ItineraryDay[];
  included: string[];
  notIncluded: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  image?: string;
  meals: string[];
}

export interface CartItem {
  productId: string;
  product: Product;
  guests: number;
  date?: string;
  addons: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
}

export interface Booking {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}
```

**Step 4: Create src/lib/constants.ts**

```typescript
export const PRODUCTS = {
  classic: {
    id: 'classic',
    slug: 'classic',
    title: 'Classic China Journey',
    subtitle: 'Timeless Wonders of the Middle Kingdom',
    description: 'Experience the iconic landmarks and ancient treasures of China on this carefully curated journey through history.',
    price: 2999,
    duration: '12 Days',
    location: 'Beijing, Xi\'an, Shanghai, Suzhou',
    heroImage: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1920',
    gallery: [],
    highlights: [
      'Walk the Great Wall at Mutianyu',
      'Explore the Terracotta Warriors',
      'Cruise the Huangpu River in Shanghai',
      'Wander the classical gardens of Suzhou',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Beijing',
        description: 'Welcome to China! Transfer to your luxury hotel in the heart of Beijing.',
        meals: ['Dinner'],
      },
      {
        day: 2,
        title: 'Forbidden City & Tiananmen',
        description: 'Explore the imperial palace and the vast square that witnessed history.',
        meals: ['Breakfast', 'Lunch'],
      },
      {
        day: 3,
        title: 'Great Wall at Mutianyu',
        description: 'Walk along the ancient ramparts of the Great Wall with stunning mountain views.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
      },
    ],
    included: ['Luxury hotel accommodations', 'Daily meals as specified', 'Professional guides', 'All entrance fees', 'Private transfers'],
    notIncluded: ['International flights', 'Personal expenses', 'Travel insurance'],
  },
  culinary: {
    id: 'culinary',
    slug: 'culinary',
    title: 'Culinary China Adventure',
    subtitle: 'A Gastronomic Journey Through Tradition',
    description: 'Discover the rich flavors and culinary heritage of China through hands-on cooking experiences and authentic dining.',
    price: 3499,
    duration: '10 Days',
    location: 'Chengdu, Xi\'an, Hong Kong, Guangzhou',
    heroImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920',
    gallery: [],
    highlights: [
      'Learn to make dumplings in Chengdu',
      'Sichuan cooking class with master chef',
      'Dim sum brunch in Hong Kong',
      'Street food tour in Guangzhou',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Chengdu',
        description: 'Welcome to the spicy heart of Sichuan cuisine!',
        meals: ['Dinner'],
      },
    ],
    included: ['Luxury hotel accommodations', 'Daily meals', 'Cooking classes', 'Professional guides', 'Private transfers'],
    notIncluded: ['International flights', 'Personal expenses', 'Travel insurance'],
  },
  nature: {
    id: 'nature',
    slug: 'nature',
    title: 'Natural Wonders of China',
    subtitle: 'From Mountains to Rice Terraces',
    description: 'Explore the breathtaking natural landscapes of China, from ancient mountains to terraced rice fields.',
    price: 2799,
    duration: '11 Days',
    location: 'Guilin, Yangshuo, Zhangjiajie, Kunming',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920',
    gallery: [],
    highlights: [
      'Cruise the Li River',
      'Explore Zhangjiajie National Forest Park',
      'Bike through Yangshuo countryside',
      'Visit the Stone Forest',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Guilin',
        description: 'Arrive in Guilin, gateway to China\'s most scenic landscapes.',
        meals: ['Dinner'],
      },
    ],
    included: ['Luxury hotel accommodations', 'Daily meals', 'Professional guides', 'All tours and transfers'],
    notIncluded: ['International flights', 'Personal expenses', 'Travel insurance'],
  },
} as const;

export const SITE_NAME = 'lulutravel';
export const SITE_URL = 'https://lulutravel.com';
export const SUPPORT_EMAIL = 'support@lulutravel.com';
```

**Step 5: Create src/lib/utils.ts**

```typescript
import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function calculateDays(start: Date, end: Date): number {
  const diff = end.getTime() - start.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
```

**Step 6: Create src/lib/supabase.ts**

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zhlldovnjbfyznyrvwma.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpobGxkb3ZuamJmeXpueXJ2d21hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNDg5MDcsImV4cCI6MjA4NTgyNDkwN30.lzljjCLKrph6ZXN_VZycVfYHHN90yMljwwreoFULsMQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Step 7-9: Create store files**

- `useCartStore.ts`: Zustand store for cart management with add/remove/update actions
- `useAuthStore.ts`: Zustand store for authentication state
- `useUIStore.ts`: Zustand store for UI state (modals, toasts, etc.)

**Step 10: Commit**

```bash
git add src/
git commit -m "feat: add project structure, types, and core libraries"
```

---

## Phase 2: UI Components

### Task 3: Create Button Component

**Files:**
- Create: `src/components/ui/Button.tsx`

```tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-ink text-white hover:bg-ink/90',
    secondary: 'bg-wood text-white hover:bg-wood-light',
    outline: 'border-2 border-ink text-ink hover:bg-ink hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300',
        'hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4\" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
}
```

**Step 1-3: Write test, run, implement, run, commit**

**Step 4: Commit**

```bash
git add src/components/ui/Button.tsx
git commit -m "feat: create Button component"
```

---

### Task 4: Create Card Component

**Files:**
- Create: `src/components/ui/Card.tsx`

```tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-md overflow-hidden',
        hover && 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('p-6', className)}>{children}</div>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('p-6 pt-0', className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('p-6 pt-0', className)}>{children}</div>;
}
```

**Step 1-3: Write test, run, implement, run, commit**

**Step 4: Commit**

```bash
git add src/components/ui/Card.tsx
git commit -m "feat: create Card component"
```

---

### Task 5: Create Input and Modal Components

**Files:**
- Create: `src/components/ui/Input.tsx`
- Create: `src/components/ui/Modal.tsx`

**Step 1-3: Write tests, run, implement, run, commit**

**Step 4: Commit**

```bash
git add src/components/ui/Input.tsx src/components/ui/Modal.tsx
git commit -m "feat: create Input and Modal components"
```

---

## Phase 3: Layout Components

### Task 6: Create Navbar Component

**Files:**
- Create: `src/components/layout/Navbar.tsx`

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products/classic', label: 'Classic Tours' },
  { href: '/products/culinary', label: 'Culinary Adventures' },
  { href: '/products/nature', label: 'Nature & Wellness' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      )}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2">
            <span className={cn('text-2xl font-serif font-bold', isScrolled ? 'text-ink' : 'text-white')}>
              lulutravel
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-medium transition-colors duration-200',
                  isScrolled ? 'text-dai hover:text-bamboo' : 'text-white/90 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/cart"
              className={cn(
                'p-2 rounded-lg transition-colors',
                isScrolled ? 'text-dai hover:bg-stone/10' : 'text-white hover:bg-white/10'
              )}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </Link>
            <Link
              href="/login"
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-colors',
                isScrolled ? 'bg-wood text-white hover:bg-wood-light' : 'bg-white/20 text-white hover:bg-white/30'
              )}
            >
              Sign In
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone/20">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-dai font-medium hover:text-bamboo"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center space-x-4 pt-4">
                <Link href="/cart" className="text-dai font-medium">Cart</Link>
                <Link href="/login" className="btn-primary">Sign In</Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
```

**Step 1-3: Write test, run, implement, run, commit**

**Step 4: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: create Navbar component with scroll effect and mobile menu"
```

---

### Task 7: Create Footer Component

**Files:**
- Create: `src/components/layout/Footer.tsx`

```tsx
import Link from 'next/link';

const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Team', href: '/about#team' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
  tours: [
    { label: 'Classic Tours', href: '/products/classic' },
    { label: 'Culinary Adventures', href: '/products/culinary' },
    { label: 'Nature & Wellness', href: '/products/nature' },
    { label: 'Custom Itineraries', href: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">lulutravel</h3>
            <p className="text-white/80 mb-6">
              Premium China travel experiences crafted for discerning travelers seeking authentic cultural journeys.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="18" cy="6" r="1.5" fill="currentColor" />
                </svg>
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/80 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/80 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Tours</h4>
            <ul className="space-y-3">
              {footerLinks.tours.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/80 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60">
              &copy; {new Date().getFullYear()} lulutravel. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-white/60">
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

**Step 1-3: Write test, run, implement, run, commit**

**Step 4: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: create Footer component"
```

---

## Phase 4: Section Components

### Task 8: Create Hero Component

**Files:**
- Create: `src/components/sections/Hero.tsx`

```tsx
'use client';

import React from 'react';
import Button from '@/components/ui/Button';

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
}

export default function Hero({ title, subtitle, description, image, cta, secondaryCta }: HeroProps) {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-ink/50" />
      </div>

      <div className="relative container-custom">
        <div className="max-w-3xl">
          <p className="text-wood font-medium mb-4 tracking-wide uppercase">{subtitle}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {cta && (
              <Button variant="secondary" size="lg" onClick={() => window.location.href = cta.href}>
                {cta.label}
              </Button>
            )}
            {secondaryCta && (
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ink">
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
```

**Step 1-3: Write test, run, implement, run, commit**

**Step 4: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: create Hero component"
```

---

### Task 9: Create ExperienceCard and ProductCard Components

**Files:**
- Create: `src/components/sections/ExperienceCard.tsx`
- Create: `src/components/sections/ProductCard.tsx`

**Step 1-3: Write tests, run, implement, run, commit**

**Step 4: Commit**

```bash
git add src/components/sections/ExperienceCard.tsx src/components/sections/ProductCard.tsx
git commit -m "feat: create ExperienceCard and ProductCard components"
```

---

### Task 10: Create ProductHero and Itinerary Components

**Files:**
- Create: `src/components/sections/ProductHero.tsx`
- Create: `src/components/sections/Itinerary.tsx`

**Step 1-3: Write tests, run, implement, run, commit**

**Step 4: Commit**

```bash
git add src/components/sections/ProductHero.tsx src/components/sections/Itinerary.tsx
git commit -m "feat: create ProductHero and Itinerary components"
```

---

### Task 11: Create BookingForm and Testimonials Components

**Files:**
- Create: `src/components/sections/BookingForm.tsx`
- Create: `src/components/sections/Testimonials.tsx`

**Step 1-3: Write tests, run, implement, run, commit**

**Step 4: Commit**

```bash
git add src/components/sections/BookingForm.tsx src/components/sections/Testimonials.tsx
git commit -m "feat: create BookingForm and Testimonials components"
```

---

## Phase 5: Pages

### Task 12: Create Homepage

**Files:**
- Create: `src/app/page.tsx`
- Create: `src/components/sections/Features.tsx`

```tsx
import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import ExperienceCard from '@/components/sections/ExperienceCard';
import ProductCard from '@/components/sections/ProductCard';
import Testimonials from '@/components/sections/Testimonials';

export const metadata: Metadata = {
  title: 'Premium China Tours & Travel Experiences',
  description: 'Discover the beauty of China with lulutravel. Expert-guided tours through ancient gardens, culinary adventures, and natural wonders.',
};

const experiences = [
  {
    icon: '🏯',
    title: 'Ancient Temples',
    description: 'Explore millennia-old temples and monasteries hidden in misty mountains.',
  },
  {
    icon: '🍜',
    title: 'Culinary Delights',
    description: 'Master the art of Chinese cooking with hands-on classes led by master chefs.',
  },
  {
    icon: '🌿',
    title: 'Natural Wonders',
    description: 'Journey through breathtaking landscapes from rice terraces to karst peaks.',
  },
  {
    icon: '🎭',
    title: 'Cultural Heritage',
    description: 'Experience traditional arts, performances, and living traditions.',
  },
];

const products = [
  {
    slug: 'classic',
    title: 'Classic China Journey',
    subtitle: 'Timeless Wonders',
    description: 'Experience iconic landmarks and ancient treasures.',
    price: 2999,
    duration: '12 Days',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800',
  },
  {
    slug: 'culinary',
    title: 'Culinary China',
    subtitle: 'Gastronomic Journey',
    description: 'Discover rich flavors and culinary heritage.',
    price: 3499,
    duration: '10 Days',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
  },
  {
    slug: 'nature',
    title: 'Natural Wonders',
    subtitle: 'Mountains & Rice Terraces',
    description: 'Explore breathtaking natural landscapes.',
    price: 2799,
    duration: '11 Days',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero
        title="Discover the Timeless Beauty of China"
        subtitle="Premium Travel Experiences"
        description="Journey through ancient gardens, culinary adventures, and natural wonders with expert guides who share our passion for authentic Chinese culture."
        image="https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1920"
        cta={{ label: 'Explore Tours', href: '/products/classic' }}
        secondaryCta={{ label: 'Learn More', href: '/about' }}
      />

      <section className="py-20 bg-cream">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Unforgettable Experiences</h2>
            <p className="text-lg text-stone max-w-2xl mx-auto">
              Every journey is carefully crafted to provide authentic, immersive experiences that connect you with China's rich cultural heritage.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {experiences.map((experience, index) => (
              <ExperienceCard key={index} {...experience} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Our Tour Collections</h2>
            <p className="text-lg text-stone max-w-2xl mx-auto">
              Choose from our carefully curated tour collections, each offering a unique perspective on China's diverse wonders.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.slug} {...product} />
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="py-20 bg-ink text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Contact our travel experts to create your perfect China adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-secondary">
              Contact Us
            </a>
            <a href="/products/classic" className="btn-outline border-white text-white hover:bg-white hover:text-ink">
              Browse Tours
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
```

**Step 1-3: Write test, run, implement, run, commit**

**Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: create homepage with Hero, ExperienceCard, ProductCard, and Testimonials"
```

---

### Task 13: Create Product Pages

**Files:**
- Create: `src/app/products/classic/page.tsx`
- Create: `src/app/products/culinary/page.tsx`
- Create: `src/app/products/nature/page.tsx`
- Create: `src/app/products/[slug]/page.tsx`

```tsx
import { Metadata } from 'next';
import { PRODUCTS } from '@/lib/constants';
import ProductHero from '@/components/sections/ProductHero';
import Itinerary from '@/components/sections/Itinerary';
import BookingForm from '@/components/sections/BookingForm';

export async function generateStaticParams() {
  return Object.keys(PRODUCTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = PRODUCTS[slug as keyof typeof PRODUCTS];
  if (!product) return { title: 'Tour Not Found' };

  return {
    title: product.title,
    description: product.description,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = PRODUCTS[params.slug as keyof typeof PRODUCTS];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Tour not found</h1>
      </div>
    );
  }

  return (
    <>
      <ProductHero
        title={product.title}
        subtitle={product.subtitle}
        description={product.description}
        image={product.heroImage}
        price={product.price}
        duration={product.duration}
        location={product.location}
        highlights={product.highlights}
      />

      <Itinerary days={product.itinerary} />

      <section className="py-20 bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-serif font-bold text-ink mb-6">What's Included</h3>
              <ul className="space-y-3">
                {product.included.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-bamboo mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-dai">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-ink mb-6">What's Not Included</h3>
              <ul className="space-y-3">
                {product.notIncluded.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-wood mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-dai">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <BookingForm product={product} />
    </>
  );
}
```

**Step 1-3: Write test, run, implement, run, commit**

**Step 4: Commit**

```bash
git add src/app/products/
git commit -m "feat: create product pages with dynamic routing"
```

---

### Task 14: Create Authentication Pages

**Files:**
- Create: `src/app/login/page.tsx`

```tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name } },
        });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push('/profile');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 bg-cream">
      <div className="container-custom max-w-md">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-ink mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-stone">
              {isSignUp ? 'Start your China journey today' : 'Sign in to access your account'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-dai mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                  placeholder="Enter your name"
                  required={isSignUp}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dai mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dai mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Enter your password"
                required
                minLength={6}
              />
            </div>

            <Button type="submit" variant="primary" className="w-full" loading={loading}>
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone/30" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-stone">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleOAuthSignIn('google')}
                className="flex items-center justify-center px-4 py-3 border border-stone/30 rounded-lg hover:bg-cream transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              <button
                type="button"
                onClick={() => handleOAuthSignIn('github')}
                className="flex items-center justify-center px-4 py-3 border border-stone/30 rounded-lg hover:bg-cream transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-stone">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-bamboo font-medium hover:underline"
            >
              {isSignUp ? 'Sign in' : 'Create one'}
            </button>
          </p>
        </Card>
      </div>
    </div>
  );
}
```

**Step 1-3: Write test, run, implement, run, commit**

**Step 4: Commit**

```bash
git add src/app/login/page.tsx
git commit -m "feat: create login page with email and OAuth authentication"
```

---

### Task 15: Create Cart and Booking Pages

**Files:**
- Create: `src/app/cart/page.tsx`
- Create: `src/app/booking/page.tsx`

**Step 1-3: Write tests, run, implement, run, commit**

**Step 4: Commit**

```bash
git add src/app/cart/page.tsx src/app/booking/page.tsx
git commit -m "feat: create cart and booking pages"
```

---

### Task 16: Create Profile Page

**Files:**
- Create: `src/app/profile/page.tsx`

**Step 1-3: Write test, run, implement, run, commit**

**Step 4: Commit**

```bash
git add src/app/profile/page.tsx
git commit -m "feat: create user profile page"
```

---

### Task 17: Create Content Pages

**Files:**
- Create: `src/app/about/page.tsx`
- Create: `src/app/blog/page.tsx`
- Create: `src/app/contact/page.tsx`
- Create: `src/app/faq/page.tsx`
- Create: `src/app/terms/page.tsx`
- Create: `src/app/privacy/page.tsx`
- Create: `src/app/404/page.tsx`

**Step 1-3: Write tests, run, implement, run, commit**

**Step 4: Commit**

```bash
git add src/app/about/page.tsx src/app/blog/page.tsx src/app/contact/page.tsx src/app/faq/page.tsx src/app/terms/page.tsx src/app/privacy/page.tsx src/app/404/page.tsx
git commit -m "feat: create content pages (about, blog, contact, FAQ, terms, privacy, 404)"
```

---

## Phase 6: Testing and Deployment

### Task 18: Build and Verify

**Step 1: Run build**

Run: `npm run build`
Expected: All pages compile successfully with no TypeScript errors

**Step 2: Run lint**

Run: `npm run lint`
Expected: No ESLint errors

**Step 3: Fix any issues found**

---

### Task 19: Create Vercel Configuration

**Files:**
- Create: `vercel.json`

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase_url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase_anon_key"
  }
}
```

**Step 1: Commit**

```bash
git add vercel.json
git commit -m "chore: add Vercel deployment configuration"
```

---

### Task 20: Final Review and Summary

**Step 1: Run full build test**

```bash
npm run build && npm run lint
```

**Step 2: Create summary document**

---

## Summary

This plan converts the static lulutravel HTML website to a modern Next.js 14+ application with:

- **TypeScript** for type safety
- **Tailwind CSS** with Oriental Garden color palette
- **Zustand** for state management
- **Supabase** for authentication
- **SEO metadata** on every page
- **Responsive design** with mobile-first approach
- **Component-based architecture** for maintainability
- **Full English content** replacing Chinese

The migration preserves all original functionality and design aesthetic while adding modern React patterns, better performance, and easier maintenance.

**Plan complete!** Ready for subagent-driven execution.

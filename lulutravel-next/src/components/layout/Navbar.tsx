'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/tours', label: 'Tours' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const lightPages = ['/login', '/profile', '/cart', '/booking', '/about', '/contact'];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isLightPage = lightPages.some(page => pathname?.startsWith(page));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showSolidBg = isLightPage || isScrolled;

  const handleLogout = () => {
    logout();
    router.push('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        showSolidBg ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      )}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <span className={cn('text-2xl font-serif font-bold', showSolidBg ? 'text-ink' : 'text-white')}>
              lulutravel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-medium transition-colors duration-200',
                  showSolidBg ? 'text-dai hover:text-bamboo' : 'text-white/90 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/cart"
              className={cn(
                'p-2 rounded-lg transition-colors relative',
                showSolidBg ? 'text-dai hover:bg-stone/10' : 'text-white hover:bg-white/10'
              )}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  href="/profile"
                  className={cn(
                    'flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors',
                    showSolidBg ? 'text-dai hover:bg-stone/10' : 'text-white hover:bg-white/10'
                  )}
                >
                  <div className="w-8 h-8 bg-wood rounded-full flex items-center justify-center text-white font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">{user.name}</span>
                </Link>
              </div>
            ) : (
              <Link
                href="/login"
                className={cn(
                  'px-5 py-2.5 rounded-lg font-medium transition-colors',
                  showSolidBg 
                    ? 'bg-wood text-white hover:bg-wood-light' 
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                )}
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              'md:hidden p-2',
              showSolidBg ? 'text-dai' : 'text-white'
            )}
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 bg-white border-t border-stone/10">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-dai font-medium hover:text-bamboo px-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center space-x-4 pt-4 px-2 border-t border-stone/10">
                <Link href="/cart" className="text-dai font-medium flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Cart
                </Link>
              </div>
              
              {user ? (
                <div className="px-2 pt-2 space-y-3">
                  <Link 
                    href="/profile" 
                    className="flex items-center text-dai font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="w-8 h-8 bg-wood rounded-full flex items-center justify-center text-white font-medium mr-2">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    {user.name}
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-stone hover:text-ink"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  className="mx-2 px-4 py-2 bg-wood text-white rounded-lg text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface ProductHeroProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  location: string;
  highlights: readonly string[];
}

export default function ProductHero({ title, subtitle, description, image, price, duration, location, highlights }: ProductHeroProps) {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-end pb-20">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
      </div>

      <div className="relative container-custom">
        <div className="max-w-3xl">
          <p className="text-wood font-medium mb-4 tracking-wide uppercase">{subtitle}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-white/90 mb-8">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {duration}
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </div>
          </div>
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <span className="text-3xl font-serif font-bold text-white">
              {formatPrice(price)}
              <span className="text-lg font-sans font-normal text-white/70"> / person</span>
            </span>
            <Button variant="secondary" size="lg" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

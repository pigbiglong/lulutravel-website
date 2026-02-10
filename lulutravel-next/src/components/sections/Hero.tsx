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

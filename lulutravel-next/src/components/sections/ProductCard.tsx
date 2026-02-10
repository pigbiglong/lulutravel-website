'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface ProductCardProps {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  duration: string;
  image: string;
}

export default function ProductCard({ slug, title, subtitle, description, price, duration, image }: ProductCardProps) {
  return (
    <div className="card">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-wood text-white px-3 py-1 rounded-full text-sm font-medium">
          {duration}
        </div>
      </div>
      <div className="p-6">
        <p className="text-bamboo text-sm font-medium mb-2">{subtitle}</p>
        <h3 className="text-xl font-serif font-semibold text-ink mb-3">{title}</h3>
        <p className="text-stone mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-serif font-bold text-ink">
            {formatPrice(price)}
            <span className="text-sm font-sans font-normal text-stone"> / person</span>
          </span>
          <Link href={`/products/${slug}`}>
            <Button variant="outline" size="sm">View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

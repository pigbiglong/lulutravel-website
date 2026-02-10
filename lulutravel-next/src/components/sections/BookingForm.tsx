'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface BookingFormProps {
  product: Product;
}

export default function BookingForm({ product }: BookingFormProps) {
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    addItem(product, guests, date);
    setTimeout(() => {
      setLoading(false);
      window.location.href = '/cart';
    }, 500);
  };

  return (
    <section id="booking" className="py-20 bg-cream">
      <div className="container-custom">
        <div className="max-w-xl mx-auto">
          <div className="card p-8">
            <h2 className="section-title text-center mb-8">Book This Tour</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                id="date"
                type="date"
                label="Preferred Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />

              <div>
                <label className="block text-sm font-medium text-dai mb-2">Number of Guests</label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="px-4 py-3 border border-stone/30 rounded-l-lg hover:bg-stone/10 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full py-3 border-t border-b border-stone/30 text-center focus:outline-none"
                    min="1"
                  />
                  <button
                    type="button"
                    onClick={() => setGuests(guests + 1)}
                    className="px-4 py-3 border border-stone/30 rounded-r-lg hover:bg-stone/10 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="border-t border-stone/20 pt-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-dai">Total Price</span>
                  <span className="text-2xl font-serif font-bold text-ink">
                    {formatPrice(product.price * guests)}
                  </span>
                </div>
                <Button type="submit" variant="primary" className="w-full" loading={loading}>
                  Add to Cart
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

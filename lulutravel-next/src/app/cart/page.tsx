'use client';

import { useState } from 'react';
import Link from 'next/link';

const initialCartItems = [
  {
    id: 1,
    name: 'Classic China',
    duration: '8 Days / 7 Nights',
    date: 'March 15, 2024',
    guests: 2,
    price: 2999,
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400',
  },
  {
    id: 2,
    name: 'Culinary Adventures',
    duration: '10 Days / 9 Nights',
    date: 'April 2, 2024',
    guests: 2,
    price: 3499,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400',
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateGuests = (id: number, newGuests: number) => {
    if (newGuests < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, guests: newGuests } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.guests, 0);

  return (
    <main className="pt-24 pb-16 bg-cream min-h-screen">
      <div className="container-custom">
        <h1 className="text-4xl font-serif font-bold text-ink mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg">
            <svg className="w-16 h-16 text-stone mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-2xl font-serif font-bold text-ink mb-2">Your cart is empty</h2>
            <p className="text-stone mb-6">Start exploring our tours to add items to your cart</p>
            <Link
              href="/tours"
              className="inline-flex items-center justify-center px-6 py-3 bg-wood text-white font-medium rounded-lg hover:bg-wood-light transition-colors"
            >
              Browse Tours
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-6 shadow-sm flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-serif font-bold text-ink">{item.name}</h3>
                        <p className="text-stone text-sm">{item.duration}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-stone hover:text-red-500 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-stone text-sm mb-4">Departure: {item.date}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-stone text-sm mr-3">Guests:</span>
                        <button
                          onClick={() => updateGuests(item.id, item.guests - 1)}
                          className="w-8 h-8 rounded border border-stone/30 flex items-center justify-center hover:bg-stone/10 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-medium">{item.guests}</span>
                        <button
                          onClick={() => updateGuests(item.id, item.guests + 1)}
                          className="w-8 h-8 rounded border border-stone/30 flex items-center justify-center hover:bg-stone/10 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-xl font-serif font-bold text-ink">
                        ${(item.price * item.guests).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
                <h2 className="text-xl font-serif font-bold text-ink mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-stone">{item.name} × {item.guests}</span>
                      <span className="text-dai">${(item.price * item.guests).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-stone/20 pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-stone">Subtotal</span>
                    <span className="text-dai font-medium">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-stone">Service Fee</span>
                    <span className="text-dai">$99</span>
                  </div>
                  <div className="flex justify-between items-center text-lg mt-4 pt-4 border-t border-stone/20">
                    <span className="font-serif font-bold text-ink">Total</span>
                    <span className="font-serif font-bold text-ink">${(subtotal + 99).toLocaleString()}</span>
                  </div>
                </div>

                <Link
                  href="/booking"
                  className="block w-full py-4 bg-wood text-white font-medium rounded-lg hover:bg-wood-light transition-colors text-center"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/tours"
                  className="block w-full py-3 text-center text-stone hover:text-bamboo transition-colors mt-3"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';

const steps = ['Guest Details', 'Payment', 'Confirmation'];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <main className="pt-24 pb-16 bg-cream min-h-screen">
      <div className="container-custom">
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    index <= currentStep
                      ? 'bg-wood text-white'
                      : 'bg-white text-stone border border-stone/30'
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`ml-3 hidden sm:block ${
                    index <= currentStep ? 'text-ink' : 'text-stone'
                  }`}
                >
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 sm:w-24 h-0.5 mx-4 ${
                      index < currentStep ? 'bg-wood' : 'bg-stone/30'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              {currentStep === 0 && (
                <>
                  <h2 className="text-2xl font-serif font-bold text-ink mb-6">Guest Details</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-dai mb-1">First Name</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dai mb-1">Last Name</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dai mb-1">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dai mb-1">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dai mb-1">Special Requests (Optional)</label>
                      <textarea
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none resize-none"
                        placeholder="Dietary requirements, accessibility needs, etc."
                      />
                    </div>
                  </div>
                </>
              )}

              {currentStep === 1 && (
                <>
                  <h2 className="text-2xl font-serif font-bold text-ink mb-6">Payment Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-dai mb-1">Card Number</label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-dai mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={formData.expiry}
                          onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                          className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dai mb-1">CVV</label>
                        <input
                          type="text"
                          value={formData.cvv}
                          onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                          className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dai mb-1">Name on Card</label>
                      <input
                        type="text"
                        value={formData.nameOnCard}
                        onChange={(e) => setFormData({ ...formData, nameOnCard: e.target.value })}
                        className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-cream rounded-lg">
                    <p className="text-sm text-stone flex items-center">
                      <svg className="w-5 h-5 mr-2 text-bamboo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Your payment information is encrypted and secure
                    </p>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-ink mb-4">Booking Confirmed!</h2>
                  <p className="text-stone mb-6">
                    Thank you for your booking. A confirmation email has been sent to {formData.email || 'your email'}.
                  </p>
                  <p className="text-stone mb-8">
                    Booking Reference: <span className="font-medium text-ink">BK-2024-003</span>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/profile"
                      className="px-6 py-3 bg-wood text-white font-medium rounded-lg hover:bg-wood-light transition-colors"
                    >
                      View My Bookings
                    </Link>
                    <Link
                      href="/tours"
                      className="px-6 py-3 border border-stone/30 text-dai font-medium rounded-lg hover:bg-stone/5 transition-colors"
                    >
                      Book Another Tour
                    </Link>
                  </div>
                </div>
              )}

              {currentStep < 2 && (
                <div className="flex justify-between mt-8 pt-6 border-t border-stone/20">
                  {currentStep > 0 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="px-6 py-3 border border-stone/30 text-dai font-medium rounded-lg hover:bg-stone/5 transition-colors"
                    >
                      Back
                    </button>
                  ) : (
                    <Link
                      href="/cart"
                      className="px-6 py-3 border border-stone/30 text-dai font-medium rounded-lg hover:bg-stone/5 transition-colors"
                    >
                      Back to Cart
                    </Link>
                  )}
                  <button
                    type="submit"
                    className="px-8 py-3 bg-wood text-white font-medium rounded-lg hover:bg-wood-light transition-colors"
                  >
                    {currentStep === 1 ? 'Complete Booking' : 'Continue'}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          {currentStep < 2 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h3 className="text-lg font-serif font-bold text-ink mb-4">Order Summary</h3>
                
                <div className="flex gap-4 mb-4 pb-4 border-b border-stone/20">
                  <img
                    src="https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=100"
                    alt="Classic China"
                    className="w-20 h-14 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-medium text-ink">Classic China</h4>
                    <p className="text-sm text-stone">8 Days × 2 Guests</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-stone">Subtotal</span>
                    <span className="text-dai">$5,998</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone">Service Fee</span>
                    <span className="text-dai">$99</span>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-stone/20">
                  <span className="font-serif font-bold text-ink">Total</span>
                  <span className="font-serif font-bold text-ink">$6,097</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';

const userBookings = [
  {
    id: 'BK-2024-001',
    tour: 'Classic China',
    date: 'March 15, 2024',
    guests: 2,
    status: 'Confirmed',
    total: 6097,
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=200',
  },
  {
    id: 'BK-2024-002',
    tour: 'Culinary Adventures',
    date: 'June 10, 2024',
    guests: 2,
    status: 'Pending',
    total: 7097,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=200',
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, isInitialized } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'bookings' | 'settings'>('bookings');

  useEffect(() => {
    if (isInitialized && !user) {
      router.push('/login');
    }
  }, [isInitialized, user, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (!isInitialized || !user) {
    return (
      <main className="pt-24 pb-16 bg-cream min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-wood border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16 bg-cream min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-ink">Welcome, {user.name}</h1>
            <p className="text-stone">{user.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="mt-4 md:mt-0 px-6 py-2 border border-stone/30 text-dai rounded-lg hover:bg-stone/5 transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone/20 mb-8">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'bookings'
                ? 'text-wood border-b-2 border-wood'
                : 'text-stone hover:text-ink'
            }`}
          >
            My Bookings
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'settings'
                ? 'text-wood border-b-2 border-wood'
                : 'text-stone hover:text-ink'
            }`}
          >
            Account Settings
          </button>
        </div>

        {/* Content */}
        {activeTab === 'bookings' ? (
          <div>
            {userBookings.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg">
                <svg className="w-16 h-16 text-stone mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h2 className="text-2xl font-serif font-bold text-ink mb-2">No bookings yet</h2>
                <p className="text-stone mb-6">Start your adventure by exploring our tours</p>
                <Link
                  href="/tours"
                  className="inline-flex items-center justify-center px-6 py-3 bg-wood text-white font-medium rounded-lg hover:bg-wood-light transition-colors"
                >
                  Browse Tours
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userBookings.map((booking) => (
                  <div key={booking.id} className="bg-white rounded-lg p-6 shadow-sm flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-40 h-28 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={booking.image}
                        alt={booking.tour}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
                        <div>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'Confirmed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {booking.status}
                          </span>
                          <h3 className="text-xl font-serif font-bold text-ink mt-2">{booking.tour}</h3>
                        </div>
                        <span className="text-stone text-sm mt-2 md:mt-0">Booking ID: {booking.id}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                        <div>
                          <p className="text-stone">Departure</p>
                          <p className="text-dai font-medium">{booking.date}</p>
                        </div>
                        <div>
                          <p className="text-stone">Guests</p>
                          <p className="text-dai font-medium">{booking.guests}</p>
                        </div>
                        <div>
                          <p className="text-stone">Total</p>
                          <p className="text-ink font-medium">${booking.total.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex md:flex-col gap-2 flex-shrink-0">
                      <button className="flex-1 md:flex-none px-4 py-2 bg-wood text-white rounded-lg hover:bg-wood-light transition-colors text-sm">
                        View Details
                      </button>
                      <button className="flex-1 md:flex-none px-4 py-2 border border-stone/30 text-dai rounded-lg hover:bg-stone/5 transition-colors text-sm">
                        Contact Support
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-2xl">
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <h2 className="text-xl font-serif font-bold text-ink mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-dai mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dai mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dai mb-1">Phone</label>
                  <input
                    type="tel"
                    defaultValue={user.phone || ''}
                    placeholder="Add phone number"
                    className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none"
                  />
                </div>
              </div>
              <button className="mt-6 px-6 py-3 bg-wood text-white font-medium rounded-lg hover:bg-wood-light transition-colors">
                Save Changes
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-serif font-bold text-ink mb-6">Password</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dai mb-1">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dai mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dai mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none"
                  />
                </div>
              </div>
              <button className="mt-6 px-6 py-3 bg-ink text-white font-medium rounded-lg hover:bg-ink/90 transition-colors">
                Update Password
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

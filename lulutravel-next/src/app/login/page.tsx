'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
  const router = useRouter();
  const { login, signup, isLoading } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        router.push('/profile');
      } else {
        setError(result.error || 'Login failed');
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      const name = `${formData.firstName} ${formData.lastName}`;
      const result = await signup(formData.email, formData.password, name);
      if (result.success) {
        router.push('/profile');
      } else {
        setError(result.error || 'Signup failed');
      }
    }
  };

  return (
    <main className="pt-24 pb-16 bg-cream min-h-screen flex items-center">
      <div className="container-custom">
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="text-3xl font-serif font-bold text-ink">
              lulutravel
            </Link>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-white rounded-lg p-1 mb-6 shadow-sm">
            <button
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`flex-1 py-3 rounded-md font-medium transition-all ${
                isLogin
                  ? 'bg-wood text-white'
                  : 'text-stone hover:text-ink'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`flex-1 py-3 rounded-md font-medium transition-all ${
                !isLogin
                  ? 'bg-wood text-white'
                  : 'text-stone hover:text-ink'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-serif font-bold text-ink mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-stone mb-6">
              {isLogin
                ? 'Sign in to manage your bookings'
                : 'Join us to start your journey'}
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-dai mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none"
                      required={!isLogin}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-dai mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-dai mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-dai mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none"
                  required
                  minLength={6}
                />
                {!isLogin && (
                  <p className="text-xs text-stone mt-1">Minimum 6 characters</p>
                )}
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-dai mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none"
                    required={!isLogin}
                  />
                </div>
              )}

              {isLogin && (
                <div className="text-right">
                  <button type="button" className="text-sm text-bamboo hover:text-bamboo/80">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-wood text-white font-medium rounded-lg hover:bg-wood-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </form>

            {/* Toggle Text */}
            <p className="text-center mt-6 text-stone">
              {isLogin ? (
                <>
                  Don&apos;t have an account?{' '}
                  <button
                    onClick={() => { setIsLogin(false); setError(''); }}
                    className="text-bamboo hover:text-bamboo/80 font-medium"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => { setIsLogin(true); setError(''); }}
                    className="text-bamboo hover:text-bamboo/80 font-medium"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

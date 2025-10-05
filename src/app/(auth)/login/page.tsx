'use client';

import { useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { getCurrentUser, login } from '@/actions/auth-actions';
import { BorderEffect } from '@/components/ui/border-effect';
import { CircleScrollButton } from '@/components/ui/circle-scroll-button';
import { ExploreLink } from '@/components/ui/explore-link';
import { InsuredButton } from '@/components/ui/insured-button';
import { ReferClientButton } from '@/components/ui/refer-client-button';
import { Step } from '@/components/ui/step';

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        const user = await getCurrentUser();
        const callbackUrl = searchParams.get('callbackUrl');

        if (callbackUrl) {
          router.push(callbackUrl);
        } else if (user?.role === 'broker') {
          router.push('/broker');
        } else if (user?.role === 'provider') {
          router.push('/provider');
        } else {
          router.push('/');
        }

        router.refresh();
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fillCredentials = (role: 'broker' | 'provider') => {
    if (role === 'broker') {
      setEmail('broker@pinchiq.com');
      setPassword('broker123');
    } else {
      setEmail('provider@pinchiq.com');
      setPassword('provider123');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Pinchiq</h1>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>

        <div className="mt-8 rounded-lg bg-white p-8 shadow">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                {error}
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
                placeholder="Enter your password"
              />
            </div>
            <div className="bg-amber-600 p-6">
              <BorderEffect>
                <InsuredButton
                  type="submit"
                  disabled={isLoading}
                  isLoading={isLoading}
                />
              </BorderEffect>
            </div>
            <CircleScrollButton />
            <Step title="Business Details" stepNumber={2} />
            <ExploreLink />
          </form>

          <div className="mt-6 border-t pt-6">
            <p className="mb-3 text-xs font-medium text-gray-700">
              Test Credentials:
            </p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => fillCredentials('broker')}
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-left text-sm hover:bg-gray-50"
              >
                <span className="font-medium">Broker:</span> broker@pinchiq.com
                / broker123
              </button>
              <button
                type="button"
                onClick={() => fillCredentials('provider')}
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-left text-sm hover:bg-gray-50"
              >
                <span className="font-medium">Provider:</span>{' '}
                provider@pinchiq.com / provider123
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

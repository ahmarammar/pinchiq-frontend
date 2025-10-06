'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Password reset requested for:', email);
    // Navigate to verify email page
    router.push('/verify-email');
  };

  return (
    <div className="rounded-[32px] bg-white p-8 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Address */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            required
          />
        </div>

        {/* Reset Password Button */}
        <button
          type="submit"
          className="w-full rounded-[14px] bg-[#1a1a1a] py-3.5 text-base font-semibold text-white transition-colors hover:bg-gray-800"
        >
          Reset password
        </button>

        {/* Back to sign in */}
        <Link
          href="/login"
          className="block w-full rounded-[14px] border border-gray-200 bg-white py-3.5 text-center text-base font-medium text-gray-900 transition-colors hover:bg-gray-50"
        >
          Back to sign in
        </Link>
      </form>
    </div>
  );
}

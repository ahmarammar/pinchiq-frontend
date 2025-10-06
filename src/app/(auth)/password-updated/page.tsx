'use client';

import Link from 'next/link';

import { CheckCircle2 } from 'lucide-react';

export default function PasswordUpdated() {
  return (
    <div className="mt-8 w-full space-y-5">
      {/* Header */}
      <div className="text-center">
        <h1 className="mb-2 text-6xl text-white">Updated Successfully</h1>
        <p className="text-base text-white/90">
          You can now sign in with your new password.
        </p>
      </div>

      {/* Success Card */}
      <div className="rounded-[32px] bg-white p-8 shadow-xl">
        <div className="flex flex-col items-center space-y-6 py-6">
          {/* Success Icon */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
            <CheckCircle2 className="h-12 w-12 text-blue-600" />
          </div>

          {/* Success Message */}
          <p className="text-center text-base font-medium text-blue-600">
            Your password has been changed
          </p>

          {/* Back to Sign In Button */}
          <Link
            href="/login"
            className="w-full rounded-[14px] bg-[#1a1a1a] py-3.5 text-center text-base font-semibold text-white transition-colors hover:bg-gray-800"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

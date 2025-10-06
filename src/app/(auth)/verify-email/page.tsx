'use client';

import VerifyEmailForm from '@/features/auth/components/forms/verify-email/verify-email-form';

export default function VerifyEmail() {
  return (
    <div className="mt-8 w-full space-y-5">
      {/* Header */}
      <div className="text-center">
        <h1 className="mb-2 text-6xl text-white">Forgot Password?</h1>
        <p className="text-base text-white/90">
          No worries, we'll send you reset instructions.
        </p>
      </div>

      {/* Form Card */}
      <VerifyEmailForm />
    </div>
  );
}

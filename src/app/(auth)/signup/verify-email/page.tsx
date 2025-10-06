'use client';

import VerifyEmailForm from '@/features/auth/components/forms/verify-email/verify-email-form';

export default function SignupVerifyEmail() {
  return (
    <div className="mt-8 w-full space-y-5">
      {/* Header */}
      <div className="text-center">
        <h1 className="mb-2 text-6xl text-white">Create An Account</h1>
        <p className="text-base text-white/90">
          Start your registration to access the platform
        </p>
      </div>

      {/* Form Card */}
      <VerifyEmailForm showTerms onSuccess="/login" />
    </div>
  );
}

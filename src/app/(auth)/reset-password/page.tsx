'use client';

import ResetPasswordForm from '@/features/auth/components/forms/reset-password/reset-password-form';

export default function ResetPassword() {
  return (
    <div className="mt-8 w-full space-y-5">
      {/* Header */}
      <div className="text-center">
        <h1 className="mb-2 text-6xl text-white">Create A New Password</h1>
        <p className="text-base text-white/90">
          Min. 8 characters, 1 number, 1 symbol
        </p>
      </div>

      {/* Form Card */}
      <ResetPasswordForm />
    </div>
  );
}

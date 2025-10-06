'use client';

import LoginForm from '@/features/auth/components/forms/login/login-form';

export default function Login() {
  return (
    <div className="mt-8 w-full space-y-5">
      {/* Header */}
      <div className="text-center">
        <h1 className="mb-2 text-6xl text-white">Welcome Back</h1>
        <p className="text-base text-white/90">
          Enter your credentials to access the platform.
        </p>
      </div>

      {/* Form Card */}
      <LoginForm />
    </div>
  );
}

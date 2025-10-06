'use client';

import { useState } from 'react';

import RoleTabs from '@/components/ui/role-tabs';
import SignupForm from '@/features/auth/components/forms/signup/signup-form';

export default function Signup() {
  const [role, setRole] = useState<'broker' | 'provider'>('broker');

  return (
    <div className="mt-8 w-full space-y-5">
      {/* Header */}
      <div className="text-center">
        <h1 className="mb-2 text-6xl text-white">Create An Account</h1>
        <p className="text-base text-white/90">
          Start your registration to access the platform
        </p>
      </div>

      {/* Role Tabs */}
      <div className="flex justify-center">
        <RoleTabs value={role} onValueChange={setRole} />
      </div>

      {/* Form Card */}
      <SignupForm role={role} />
    </div>
  );
}

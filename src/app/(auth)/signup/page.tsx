'use client';

import { useState } from 'react';

import { GradientBorder } from '@/components/ui/gradient-border';
import SignupForm from '@/features/auth/components/forms/signup/signup-form';
import RoleTabs from '@/features/auth/components/ui/role-tabs';

export default function Signup() {
  const [role, setRole] = useState<'broker' | 'provider'>('broker');

  return (
    <>
      <GradientBorder className="mx-auto">
        <div className="mt-8 flex justify-center">
          <RoleTabs value={role} onValueChange={setRole} />
        </div>
      </GradientBorder>

      <div className="-mt-2.5">
        <SignupForm role={role} />
      </div>
    </>
  );
}

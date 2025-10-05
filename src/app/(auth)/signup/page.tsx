'use client';

import { useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';

import AuthHeader from '@/components/auth-header';
import RoleTabs from '@/components/ui/role-tabs';
import SignupForm from '@/features/auth/components/forms/signup/signup-form';

export default function Signup() {
  const [role, setRole] = useState<'broker' | 'provider'>('broker');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ ...formData, role });
  };

  return (
    <div className="flex min-h-screen items-center justify-center py-8">
      <div className="relative w-full max-w-xl px-4">
        <AuthHeader />

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
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function ResetPasswordForm({}) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="mx-auto mt-8 max-w-lg rounded-3xl bg-white p-13 shadow-xl">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-xl leading-tight font-medium tracking-normal text-black">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.password}
              onChange={e =>
                setFormData({ ...formData, password: e.target.value })
              }
              className={`${showPassword ? 'text-xl tracking-normal' : 'text-6xl tracking-[0.3em]'} border-light-neutral-500 placeholder:text-dark-neutral-200 h-11-5 w-full rounded-xl border bg-white px-4 leading-tight font-medium text-black placeholder:text-6xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-[0.3em] focus:outline-none`}
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-dark-neutral-600 hover:text-dark-neutral-600/90 absolute top-1/2 right-4 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        <div className="mt-7">
          <label className="mb-2 block text-xl leading-tight font-medium tracking-normal text-black">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={e =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className={`border-light-neutral-500 placeholder:text-dark-neutral-200 h-11-5 w-full rounded-xl border bg-white px-4 text-6xl leading-tight font-medium tracking-[0.3em] text-black placeholder:text-6xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-[0.3em] focus:outline-none`}
              required
              minLength={8}
            />
          </div>
        </div>
        <Button
          type="submit"
          variant={'inverse'}
          className="h-11-5 mt-7 w-full text-xl"
        >
          Update password
        </Button>
        <Button
          type="submit"
          variant={'muted'}
          className="h-11-5 mt-2 w-full text-xl"
        >
          Back to sign in
        </Button>
      </form>
    </div>
  );
}

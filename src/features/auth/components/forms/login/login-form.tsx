'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export default function LoginForm({}) {
  const [rememberThisDevice, setRememberThisDevice] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="mx-auto mt-8 max-w-lg rounded-3xl bg-white p-12 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-7">
        <div>
          <label className="mb-2 block text-xl leading-tight font-medium tracking-normal text-black">
            Email Address <span className="text-dark-blue">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="border-light-neutral-500 placeholder:text-dark-neutral-400 h-11-5 w-full rounded-xl border bg-white px-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-xl leading-tight font-medium tracking-normal text-black">
            Password <span className="text-dark-blue">*</span>
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
          <Button
            type="button"
            variant={'ghost'}
            className="hover:text-dark-blue/80 text-dark-blue p-0 text-xl leading-tight font-medium tracking-normal"
          >
            Forgot your password?
          </Button>
        </div>

        <div className="-mt-2.5 flex items-center gap-2">
          <Checkbox
            id="terms"
            checked={rememberThisDevice}
            onCheckedChange={checked => setRememberThisDevice(checked === true)}
            required
          />
          <label
            htmlFor="terms"
            className="mt-0.5 text-xl leading-tight font-medium tracking-normal text-black"
          >
            Remember this device
          </label>
        </div>

        <Button
          type="submit"
          variant={'inverse'}
          className="h-11-5 -mt-1.5 w-full text-xl"
        >
          Continue
        </Button>

        <div className="space-y-5-5 -mt-1.5 w-full">
          <div className="flex items-center justify-center">
            <span className="text-xl leading-tight font-medium tracking-normal">
              or continue with
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant={'ghost'}
              className="bg-light-neutral-300 hover:bg-light-neutral-300/90 h-12 rounded-xl"
            >
              <Image
                src="/authentication/google.svg"
                alt="Google"
                width={14.67}
                height={14.67}
              />
            </Button>
            <Button
              variant={'ghost'}
              className="bg-light-neutral-300 hover:bg-light-neutral-300/90 h-12 rounded-xl"
            >
              <Image
                src="/authentication/facebook.svg"
                alt="Facebook"
                width={7}
                height={13.33}
              />
            </Button>
            <Button
              variant={'ghost'}
              className="bg-light-neutral-300 hover:bg-light-neutral-300/90 h-12 rounded-xl"
            >
              <Image
                src="/authentication/apple.svg"
                alt="Apple"
                width={12.36}
                height={14.67}
              />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

export default function ForgotPasswordForm({}) {
  const [formData, setFormData] = useState({
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="mx-auto mt-8 max-w-lg rounded-3xl bg-white p-13 shadow-xl">
      <form onSubmit={handleSubmit}>
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
        <Button
          type="submit"
          variant={'inverse'}
          className="h-11-5 mt-7 w-full text-xl"
        >
          Reset password
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

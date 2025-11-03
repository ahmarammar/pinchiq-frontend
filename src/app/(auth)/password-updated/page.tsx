'use client';

import { CheckCircle2, CircleCheckBig } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function PasswordUpdated() {
  return (
    <>
      <div className="mx-auto mt-3 max-w-lg rounded-3xl bg-white p-13 shadow-xl">
        <div className="flex flex-col items-center space-y-9">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white">
            <CircleCheckBig className="text-brand-blue-700 h-10 w-10" />
          </div>

          <p className="text-brand-blue-700 -mt-9 max-w-48 text-center text-3xl leading-snug font-semibold tracking-normal">
            Your password has been changed
          </p>

          <Button
            type="submit"
            variant={'inverse'}
            className="h-11-5 mt-2 w-full text-xl"
          >
            Back to sign in
          </Button>
        </div>
      </div>
    </>
  );
}

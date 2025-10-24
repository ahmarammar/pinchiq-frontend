'use client';

import { KeyboardEvent, useRef, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import BlackButton from '@/components/ui/black-button';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface VerifyEmailFormProps {
  email?: string;
  onSuccess?: string;
  showTerms?: boolean;
}

export default function VerifyEmailForm({
  email = '{email}',
  onSuccess = '/reset-password',
  showTerms = false,
}: VerifyEmailFormProps) {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    console.log('OTP submitted:', otpCode);
    router.push(onSuccess);
  };

  const handleResend = () => {
    console.log('Resending code...');
    setOtp(['', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="mx-auto mt-8 max-w-lg rounded-3xl bg-white p-12 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="tracking-snug text-6xl leading-snug font-semibold text-black">
            Verify Your Email
          </h2>
          <p className="text-dark-neutral-600 mt-2 text-xl leading-normal font-medium tracking-normal">
            We've sent a 5-digit code to {email}.
          </p>
          <p className="text-dark-neutral-600 text-xl leading-normal font-medium tracking-normal">
            Enter the code below to verify your account.
          </p>
        </div>

        <div className="grid grid-cols-5 justify-center gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => {
                inputRefs.current[index] = el;
              }}
              type="number"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              className="border-light-neutral-500 placeholder:text-light-neutral-500 min-h-16 min-w-16 rounded-xl border bg-white px-4 text-center text-8xl leading-tight font-medium tracking-normal text-black placeholder:text-center placeholder:text-8xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
            />
          ))}
        </div>

        <div className="-mt-4 text-left">
          <Button
            type="button"
            variant={'ghost'}
            className="hover:text-dark-blue/80 text-dark-blue p-0 text-xl leading-tight font-medium tracking-normal"
          >
            Resend code
          </Button>
        </div>

        {showTerms && (
          <div className="-mt-1 flex items-center gap-2">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={checked => setAgreedToTerms(checked === true)}
              required
              variant={'modern'}
            />
            <label
              htmlFor="terms"
              className="text-dark-neutral-500 mt-0.5 text-xl leading-tight font-medium tracking-normal"
            >
              I agree to the{' '}
              <Link href="/terms" className="text-dark-blue hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-dark-blue hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>
        )}

        <Button
          type="submit"
          variant={'inverse'}
          className={`h-11-5 w-full text-xl ${showTerms ? 'mt-1' : '-mt-0.5'}`}
          disabled={showTerms && !agreedToTerms}
        >
          Verify
        </Button>

        <div className="mt-1 text-center text-xl leading-normal font-medium tracking-normal text-black">
          <p>Didn't get it?</p>
          <p>
            Check your spam folder or try resending in{' '}
            <span className="text-dark-blue text-xl leading-normal font-medium tracking-normal">
              56s
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

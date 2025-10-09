'use client';

import { KeyboardEvent, useRef, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import BlackButton from '@/components/ui/black-button';

interface VerifyEmailFormProps {
  email?: string;
  onSuccess?: string; // Route to navigate to on success
  showTerms?: boolean; // Show terms and conditions checkbox
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

    // Move to next input if value is entered
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    console.log('OTP submitted:', otpCode);
    // Navigate to success route
    router.push(onSuccess);
  };

  const handleResend = () => {
    console.log('Resending code...');
    setOtp(['', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="rounded-[32px] bg-white p-8 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a 5-digit code to {email}.
          </p>
          <p className="text-sm text-gray-600">
            Enter the code below to verify your account.
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              className="h-14 w-14 rounded-xl border-2 border-gray-200 bg-gray-50 text-center text-2xl font-semibold text-gray-900 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none"
            />
          ))}
        </div>

        {/* Resend Code */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleResend}
            className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
          >
            Resend code
          </button>
        </div>

        {/* Terms and Conditions */}
        {showTerms && (
          <div className="flex items-start gap-2">
            <input
              id="terms"
              type="checkbox"
              checked={agreedToTerms}
              onChange={e => setAgreedToTerms(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-900">
              I agree to the{' '}
              <Link href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>
        )}

        {/* Verify Button */}
        <BlackButton type="submit" disabled={showTerms && !agreedToTerms}>
          Verify
        </BlackButton>

        {/* Help Text */}
        <div className="text-center text-sm text-gray-600">
          <p>Didn't get it?</p>
          <p>
            Check your spam folder or try resending in{' '}
            <span className="font-medium text-blue-600">56s</span>
          </p>
        </div>
      </form>
    </div>
  );
}

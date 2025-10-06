import Image from 'next/image';
import Link from 'next/link';

import AuthButton from './ui/auth-button';
import { BorderEffect } from './ui/border-effect';

export default function AuthHeader() {
  return (
    <BorderEffect className="fixed left-1/2 z-50 -translate-x-1/2">
      <div className="flex h-[60px] items-center justify-between gap-[52px] rounded-[100px] bg-[#5e8dd9] py-2 pr-2 pl-8 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Pinch IQ Logo"
            width={63}
            height={16}
            priority
          />
        </div>

        <div className="flex items-center gap-3">
          <AuthButton href="/login" variant="secondary">
            Log In
          </AuthButton>
          <AuthButton href="/signup" variant="secondary">
            Sign Up
          </AuthButton>
        </div>
      </div>
    </BorderEffect>
  );
}

'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function AuthHeader() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="fixed left-1/2 z-50 mt-4 -translate-x-1/2">
      <div className="bg-button-glass h-12-5 flex items-center justify-between gap-13 rounded-[6.25rem] py-2 pr-2.5 pl-8 shadow-xs shadow-white/5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Pinch IQ Logo"
            width={63}
            height={18}
            priority
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              router.push('/login');
            }}
            variant={
              pathname.startsWith('/login') ||
              pathname.startsWith('/reset-password') ||
              pathname.startsWith('/password-updated') ||
              pathname.startsWith('/forgot-password')
                ? 'secondary'
                : 'lighter'
            }
            className="min-w-20 text-xl"
          >
            Log In
          </Button>
          <Button
            onClick={() => {
              router.push('/signup');
            }}
            variant={pathname.startsWith('/signup') ? 'secondary' : 'lighter'}
            className="min-w-20 text-xl"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}

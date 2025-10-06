'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

interface AuthButtonProps {
  href: string;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
}

export default function AuthButton({
  href,
  variant = 'secondary',
  children,
  className,
}: AuthButtonProps) {
  const pathname = usePathname();

  // Check if current route matches the button's href or is a child route
  const isActive = pathname === href || pathname.startsWith(href + '/');

  // If on forgot-password, verify-email, reset-password, or password-updated routes, activate login button
  const passwordResetRoutes = [
    '/forgot-password',
    '/verify-email',
    '/reset-password',
    '/password-updated',
  ];
  const isPasswordResetFlow = passwordResetRoutes.includes(pathname);
  const shouldActivateLogin = href === '/login' && isPasswordResetFlow;

  const baseStyles =
    'inline-flex min-w-[80px] items-center justify-center gap-2.5 rounded-[100px] px-3.5 py-2.5 font-medium transition-all duration-200';

  const variants = {
    primary: 'bg-white text-gray-900 hover:bg-gray-100',
    secondary: 'bg-[#FFFFFF26] text-white hover:bg-[#FFFFFF40]',
  };

  // If active or login button during password reset flow, use primary variant
  const activeVariant = isActive || shouldActivateLogin ? 'primary' : variant;

  return (
    <Link
      href={href}
      className={cn(baseStyles, variants[activeVariant], className)}
    >
      {children}
    </Link>
  );
}

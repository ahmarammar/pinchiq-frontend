import Link from 'next/link';

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
  const baseStyles =
    'inline-flex min-w-[80px] items-center justify-center gap-2.5 rounded-[100px] px-3.5 py-2.5 font-medium transition-all duration-200';

  const variants = {
    primary: 'bg-white text-gray-900 hover:bg-gray-100',
    secondary: 'bg-[#FFFFFF26] text-white hover:bg-[#FFFFFF40]',
  };

  return (
    <Link href={href} className={cn(baseStyles, variants[variant], className)}>
      {children}
    </Link>
  );
}

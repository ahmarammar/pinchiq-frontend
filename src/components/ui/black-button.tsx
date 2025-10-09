import { ButtonHTMLAttributes, forwardRef } from 'react';

import { cn } from '@/lib/utils';

interface BlackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const BlackButton = forwardRef<HTMLButtonElement, BlackButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'w-full rounded-[14px] bg-[#1a1a1a] py-3.5 text-base font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

BlackButton.displayName = 'BlackButton';

export default BlackButton;

import * as React from 'react';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

const checkboxVariants = cva(
  'peer ring-offset-background h-5 w-5 shrink-0 transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'rounded-md border border-light-neutral-400 bg-transparent focus-visible:ring-light-neutral-500 data-[state=checked]:border-black data-[state=checked]:bg-black',
        modern:
          'rounded-full border border-light-neutral-300 bg-transparent focus-visible:ring-blue-2 data-[state=checked]:border-blue-2 data-[state=checked]:bg-blue-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({ variant }), className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-white')}
    >
      {variant === 'modern' ? (
        <div className="h-2 w-2 rounded-full bg-white" />
      ) : (
        <Check className="h-4 w-4 stroke-[2.5]" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

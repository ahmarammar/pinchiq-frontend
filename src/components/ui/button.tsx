import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        light:
          'text-white text-xl font-semibold leading-tight tracking-normal bg-white/20 rounded-[3.125rem] hover:bg-white/30 active:scale-95',
        ghost:
          'text-white/80 text-xl font-semibold leading-tight tracking-normal bg-transparent rounded-[3.125rem] hover:bg-white/10 active:scale-95',
        subtle:
          'text-white text-3xl font-bold leading-tight tracking-normal bg-button-glass rounded-[6.25rem] hover:bg-button-glass/80 active:scale-95',
        secondary:
          'text-black text-3xl font-bold leading-tight tracking-normal bg-white rounded-[6.25rem] hover:bg-white/90 active:scale-95',
        lighter:
          'text-white text-3xl font-bold leading-tight tracking-normal bg-gray-2 rounded-[6.25rem] hover:bg-gray-2/80 active:scale-95',
        default:
          'text-white text-3xl font-bold leading-tight tracking-normal bg-dark-blue rounded-[6.25rem] hover:bg-dark-blue/90 active:scale-95',
        inverse:
          'text-white text-3xl font-bold leading-tight tracking-normal bg-black rounded-[6.25rem] hover:bg-black/90 active:scale-95 disabled:bg-light-neutral-300 disabled:text-black disabled:opacity-100',
        muted:
          'text-black text-3xl font-bold leading-tight tracking-normal bg-gray rounded-[6.25rem] hover:bg-gray/80 active:scale-95',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9 rounded-[2.5rem] hover:scale-105 active:scale-95',
      },
    },
    compoundVariants: [
      {
        size: 'icon',
        variant: 'light',
        className: 'hover:bg-white/20',
      },
      {
        size: 'icon',
        variant: 'ghost',
        className: 'hover:bg-transparent',
      },
      {
        size: 'icon',
        variant: 'subtle',
        className: 'hover:bg-button-glass',
      },
      {
        size: 'icon',
        variant: 'secondary',
        className: 'hover:bg-white',
      },
      {
        size: 'icon',
        variant: 'lighter',
        className: 'hover:bg-gray-2',
      },
      {
        size: 'icon',
        variant: 'default',
        className: 'hover:bg-dark-blue',
      },
      {
        size: 'icon',
        variant: 'inverse',
        className: 'hover:bg-black',
      },
      {
        size: 'icon',
        variant: 'muted',
        className: 'border border-gray hover:bg-gray',
      },
      {
        size: 'icon',
        variant: 'secondary',
        className: 'border border-secondary-2',
      },
      {
        size: 'icon',
        variant: 'inverse',
        className: 'border border-secondary-2',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

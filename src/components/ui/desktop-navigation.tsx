import React from 'react';

import { motion, useMotionValueEvent, useScroll } from 'motion/react';

import { cn } from '@/lib/utils';

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

export const DesktopNavbar = ({ children, className }: NavbarProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const [visible, setVisible] = React.useState<boolean>(false);

  useMotionValueEvent(scrollY, 'change', latest => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn('fixed inset-x-0 top-0 z-40 w-full', className)}
    >
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
    </motion.div>
  );
};

export const DesktopNavBody = ({
  children,
  className,
  visible,
}: NavBodyProps) => {
  return (
    <div
      className={cn(
        'relative z-[60] mx-auto hidden w-[98.5%] flex-row items-center justify-between self-start px-4 py-3 lg:flex',
        className
      )}
    >
      {children}
    </div>
  );
};

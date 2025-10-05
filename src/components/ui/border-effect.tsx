import React, { ReactNode } from 'react';

interface BorderEffectProps {
  children: ReactNode;
  rotation?: number;
  insetX?: string;
  insetY?: string;
  gradientFrom?: string;
  gradientTo?: string;
  borderRadius?: string;
}

export const BorderEffect: React.FC<BorderEffectProps> = ({
  children,
  rotation = 0.75,
  insetX = '0.06rem',
  insetY = '0.094rem',
  gradientFrom = '#fcfcfc',
  gradientTo = '#fcfcfc',
  borderRadius = 'rounded-full',
}) => {
  return (
    <div className="relative w-full">
      <div
        className={`relative z-10 w-full before:absolute before:-z-10 ${borderRadius} before:bg-gradient-to-r`}
        style={{
          '--rotation': `${rotation}deg`,
          '--inset-x': `-${insetX}`,
          '--inset-y': `${insetY}`,
          '--gradient-from': gradientFrom,
          '--gradient-to': gradientTo,
        } as React.CSSProperties}
      >
        <style jsx>{`
          div::before {
            content: '';
            transform: rotate(var(--rotation));
            inset-inline: var(--inset-x);
            inset-block: var(--inset-y);
            border-radius: inherit;
            background-image: linear-gradient(
              to right,
              var(--gradient-from),
              transparent,
              var(--gradient-to)
            );
          }
        `}</style>
        {children}
      </div>
    </div>
  );
};
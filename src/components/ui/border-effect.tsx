import React, { ReactNode } from 'react';

interface BorderEffectProps {
  children: ReactNode;
  rotation?: number;
  insetX?: string;
  insetY?: string;
  gradientFrom?: string;
  gradientTo?: string;
  borderRadius?: string;
  className?: string;
}

export const BorderEffect: React.FC<BorderEffectProps> = ({
  children,
  rotation = 0.75,
  insetX = '0.06rem',
  insetY = '0.094rem',
  gradientFrom = '#fcfcfc',
  gradientTo = '#fcfcfc',
  borderRadius = 'rounded-full',
  className = '',
}) => {
  return (
    <div
      className={`relative ${className.includes('w-') ? '' : 'w-fit'} ${className}`}
    >
      <div
        className={`absolute ${borderRadius}`}
        style={{
          transform: `rotate(${rotation}deg)`,
          insetInline: `-${insetX}`,
          insetBlock: insetY,
          backgroundImage: `linear-gradient(to right, ${gradientFrom}, transparent, ${gradientTo})`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

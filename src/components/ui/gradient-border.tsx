import React, { ReactNode } from 'react';

interface GradientBorderProps {
  children: ReactNode;
  rotation?: number;
  insetX?: string;
  insetY?: string;
  gradientFrom?: string;
  gradientTo?: string;
  borderWidth?: string;
  borderRadius?: string;
  className?: string;
}

export const GradientBorder: React.FC<GradientBorderProps> = ({
  children,
  rotation = 0.75,
  insetX = '0.06rem',
  insetY = '0.094rem',
  gradientFrom = '#ffffff',
  gradientTo = '#ffffff',
  borderWidth = '1.5px',
  borderRadius = 'rounded-full',
  className = '',
}) => {
  return (
    <div className={`relative w-fit ${className}`}>
      <div
        className={`absolute ${borderRadius}`}
        style={{
          transform: `rotate(${rotation}deg)`,
          insetInline: `-${insetX}`,
          insetBlock: `${insetY}`, // Changed from just insetY to -${insetY}
          background: `linear-gradient(to right, ${gradientFrom}, transparent, ${gradientTo})`,
          padding: borderWidth,
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

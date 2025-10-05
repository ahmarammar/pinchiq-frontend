'use client';

import React from 'react';

interface ReferClientButtonProps {
  onClick?: () => void;
  className?: string;
}

export const ReferClientButton: React.FC<ReferClientButtonProps> = ({
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden rounded-full bg-white px-12 py-4 text-lg font-semibold text-black transition-all duration-300 hover:bg-[#1668DA] hover:text-white active:bg-[#242424] active:text-white ${className} `}
    >
      Refer Clients
    </button>
  );
};

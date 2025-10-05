import React, { useState } from 'react';

import { ChevronRight } from 'lucide-react';

interface CircleScrollButtonProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const CircleScrollButton: React.FC<CircleScrollButtonProps> = ({
  onClick,
  className = '',
  disabled = false,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`group relative flex h-[54px] w-[54px] items-center justify-center rounded-[40px] transition-all duration-300 ease-in-out outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
        isPressed
          ? 'border border-[#D9D9D9] bg-[#242424]'
          : 'bg-[#F8F8F8] hover:border hover:border-[#D9D9D9] hover:bg-white'
      } ${className}`}
    >
      <ChevronRight
        className={`transition-all duration-300 ${
          isPressed ? 'text-white' : 'text-black'
        }`}
        size={24}
      />
    </button>
  );
};

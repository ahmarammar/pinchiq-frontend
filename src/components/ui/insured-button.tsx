import React from 'react';

interface InsuredButtonProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const InsuredButton: React.FC<InsuredButtonProps> = ({
  onClick,
  className = '',
  disabled = false,
  isLoading = false,
  type = 'submit',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`bg-blue-2 hover:bg-blue-linear w-full rounded-full px-4 py-4 text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {isLoading ? 'Signing in...' : 'Sign in'}
    </button>
  );
};

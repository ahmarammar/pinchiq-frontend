import React from 'react';

interface StepProps {
  title: string;
  stepNumber: number;
  onClick?: () => void;
  className?: string;
}

export const Step: React.FC<StepProps> = ({
  title,
  stepNumber,
  onClick,
  className = '',
}) => {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className={`flex h-[67px] w-full max-w-[426px] items-center justify-between rounded-[24px] border-2 px-8 outline-none focus:outline-none ${
        pressed
          ? 'border-[#77ADFF]'
          : hovered
            ? 'border-transparent bg-[#F5F5F5] transition-colors duration-200'
            : 'border-transparent bg-transparent transition-colors duration-200'
      } ${className} `}
      style={
        pressed
          ? {
              background:
                'linear-gradient(white, white) padding-box, linear-gradient(135deg, #D4E3F8 0%, #77ADFF 100%) border-box',
            }
          : undefined
      }
    >
      <span
        className={`text-[18px] font-medium ${
          pressed ? 'text-[#2B7FFF]' : 'text-black'
        }`}
      >
        {title}
      </span>
      <span
        className={`text-[14px] ${pressed ? 'text-[#2B7FFF]' : 'text-[#999999]'}`}
      >
        Step {stepNumber}
      </span>
    </button>
  );
};

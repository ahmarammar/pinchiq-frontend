import React from 'react';

interface ExploreLinkProps {
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const ExploreLink: React.FC<ExploreLinkProps> = ({
  href = '#',
  onClick,
  className = '',
}) => {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className={`inline-flex h-[40px] items-center gap-[10px] pb-4 outline-none focus:outline-none ${className}`}
    >
      <span
        className={`text-[20px] font-medium ${
          pressed
            ? 'text-[#242424]'
            : hovered
              ? 'text-[#77ADFF]'
              : 'text-[#1668DA]'
        }`}
      >
        Explore Solutions
      </span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={
          pressed
            ? 'text-[#242424]'
            : hovered
              ? 'text-[#77ADFF]'
              : 'text-[#1668DA]'
        }
      >
        <path
          d="M7 17L17 7M17 7H7M17 7V17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
};

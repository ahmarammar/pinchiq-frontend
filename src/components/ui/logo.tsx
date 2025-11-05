import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="#" className="flex items-center">
      <Image
        src="/logo.svg"
        alt="Pinch IQ Logo"
        width={120}
        height={30}
        priority
        className="h-auto w-auto"
      />
    </Link>
  );
};

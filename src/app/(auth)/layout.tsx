import type { Metadata } from 'next';

import AuthHeader from '@/components/auth-header';

export const metadata: Metadata = {
  title: 'Auth - Pinchiq',
  description: 'Pinchiq authentication',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="background-linear relative">
      <AuthHeader />
      <div className="flex h-full min-h-screen items-center justify-center pt-32 pb-12">
        <div className="w-full max-w-3xl px-4">{children}</div>
      </div>
    </div>
  );
}

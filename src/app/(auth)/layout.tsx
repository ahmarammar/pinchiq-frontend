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
    <div
      className="min-h-screen pt-4"
      style={{
        background: 'linear-gradient(0.05deg, #D4E3F8 0.04%, #6394DE 99.96%)',
      }}
    >
      <AuthHeader />
      <div className="flex min-h-screen items-center justify-center py-8">
        <div className="w-full max-w-xl px-4">{children}</div>
      </div>
    </div>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - Pinchiq',
  description: 'Login to your Pinchiq account',
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

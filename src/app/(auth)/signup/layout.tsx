import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - Pinchiq',
  description: 'Create your Pinchiq account',
};

export default function SignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(0.05deg, #D4E3F8 0.04%, #6394DE 99.96%)',
      }}
    >
      {children}
    </div>
  );
}

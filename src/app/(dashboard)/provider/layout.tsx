import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Provider Dashboard - Pinchiq',
  description: 'Provider dashboard for managing your services',
};

export default function ProviderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold">Pinchiq - Provider Dashboard</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}

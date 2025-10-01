import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Broker Dashboard - Pinchiq',
  description: 'Broker dashboard for managing your business',
};

export default function BrokerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold">Pinchiq - Broker Dashboard</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}

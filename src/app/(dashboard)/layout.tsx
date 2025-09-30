import type { Metadata } from 'next';

import { checkAuth, getCurrentUser } from '@/actions/auth-actions';

export const metadata: Metadata = {
  title: 'Pinchiq - Broker & Provider Platform',
  description: 'Platform for brokers and providers to manage their business',
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = await checkAuth();
  const user = await getCurrentUser();

  if (!isAuthenticated) {
    return children;
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold">
            Pinchiq - {user?.role === 'broker' ? 'Broker' : 'Provider'} Dashboard
          </h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}

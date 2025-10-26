import { ReactNode } from 'react';

import type { Metadata } from 'next';

import WorkspaceHeader from '@/features/provider/components/workspace-header';

export const metadata: Metadata = {
  title: 'Provider Dashboard - PinchIQ',
  description: 'Provider dashboard for managing your services',
};

interface ProviderWorkspaceLayoutProps {
  children: ReactNode;
}

export default function ProviderWorkspaceLayout({
  children,
}: ProviderWorkspaceLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="sticky top-0 right-0 left-0 z-[50]">
        <WorkspaceHeader
          userName={'Int. Technologies'}
          userRole={'Admin Account'}
        />
      </div>
      <main className="relative w-full flex-1 rounded-tl-4xl rounded-tr-4xl bg-white px-22 py-16">
        {children}
      </main>
    </div>
  );
}

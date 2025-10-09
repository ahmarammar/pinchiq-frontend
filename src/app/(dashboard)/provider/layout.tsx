import type { Metadata } from 'next';

import WorkspaceLayout from '@/features/provider-workspace/components/workspace-layout';

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
    <WorkspaceLayout userName="Int. Technologies" userRole="Admin Account">
      {children}
    </WorkspaceLayout>
  );
}

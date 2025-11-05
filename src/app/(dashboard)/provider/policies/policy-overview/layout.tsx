import { ReactNode, Suspense } from 'react';

import type { Metadata } from 'next';

import PolicyOverviewClientLayout from '@/features/provider/components/layouts/policy-overview-client-layout';

export const metadata: Metadata = {
  title: 'Policy Overview - PinchIQ',
  description: 'View and manage policy details',
};

interface PolicyOverviewLayoutProps {
  children: ReactNode;
}

export default function PolicyOverviewLayout({
  children,
}: PolicyOverviewLayoutProps) {
  return (
    <Suspense fallback={<div></div>}>
      <PolicyOverviewClientLayout>{children}</PolicyOverviewClientLayout>
    </Suspense>
  );
}

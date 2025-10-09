import { ReactNode } from 'react';

import WorkspaceHeader from './workspace-header';

interface WorkspaceLayoutProps {
  children: ReactNode;
  userName?: string;
  userRole?: string;
}

export default function WorkspaceLayout({
  children,
  userName,
  userRole,
}: WorkspaceLayoutProps) {
  return (
    <div className="min-h-screen bg-[#6394DE]">
      <WorkspaceHeader userName={userName} userRole={userRole} />
      <main className="w-full rounded-tl-[2rem] rounded-tr-[2rem] bg-white px-20 py-16">
        {children}
      </main>
    </div>
  );
}

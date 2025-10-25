'use client';

import { useState } from 'react';

import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DesktopNavbar,
  DesktopNavBody,
} from '@/components/ui/desktop-navigation';
import { Logo } from '@/components/ui/logo';

interface WorkspaceHeaderProps {
  userName?: string;
  userRole?: string;
}

export default function WorkspaceHeader({
  userName = 'Int. Technologies',
  userRole = 'Admin Account',
}: WorkspaceHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full overflow-hidden">
      <DesktopNavbar className="relative top-0 w-full p-2">
        <DesktopNavBody className="h-12-5 bg-button-glass w-full overflow-hidden rounded-[6.25rem] px-8 py-4 shadow-xs shadow-white/5 backdrop-blur-md">
          <div className="flex shrink-0 items-center">
            <Logo />
          </div>

          <div className="relative left-12 mx-auto max-w-[21.25rem] flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by policies, claims, docs etc..."
                className="h-8-5 px-4-5 w-full rounded-xl border-0 bg-white/15 pr-12 text-xl leading-tight font-medium tracking-normal text-white/80 placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal placeholder:text-white/80 focus:ring-0 focus:outline-none"
              />
              <Search className="absolute top-1/2 right-3.5 h-3.5 w-3.5 -translate-y-1/2 text-white" />
            </div>
          </div>

          <div className="mr-12 flex shrink-0 items-center gap-6">
            <Button
              variant={'subtle'}
              className="h-8-5 bg-white/15 pr-3.5 pl-5 hover:bg-white/20"
            >
              <span className="text-xl leading-tight font-semibold tracking-normal text-white">
                Inbox
              </span>
              <div className="relative">
                <span className="-ml-1-25 bg-success-200 mb-2.5 flex h-1 w-1 rounded-full"></span>
              </div>
            </Button>

            <div className="flex flex-col items-start gap-0.5">
              <span className="text-xl leading-tight font-semibold tracking-normal text-white">
                {userName}
              </span>
              <span className="text-lg leading-tight font-medium tracking-normal text-white">
                {userRole}
              </span>
            </div>
          </div>
        </DesktopNavBody>
      </DesktopNavbar>
    </div>
  );
}

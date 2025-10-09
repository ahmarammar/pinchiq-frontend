'use client';

import { useState } from 'react';

import { Bell, Search } from 'lucide-react';

import { BorderEffect } from '@/components/ui/border-effect';
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
        <DesktopNavBody className="h-16 w-[98.5%] overflow-hidden rounded-[5.625rem] bg-[#5e8dd9] px-8 py-4 shadow-sm backdrop-blur-md">
          {/* Logo */}
          <div className="flex shrink-0 items-center">
            <Logo />
          </div>

          {/* Search Bar */}
          <div className="relative mx-auto max-w-3xl flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by policies, claims, docs etc..."
                className="w-full rounded-full border-0 bg-[#6BA3E8] px-6 py-3.5 pr-12 text-base text-white shadow-sm placeholder:text-white/80 focus:bg-[#7AAFE9] focus:ring-0 focus:outline-none"
              />
              <Search className="absolute top-1/2 right-5 h-5 w-5 -translate-y-1/2 text-white" />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex shrink-0 items-center gap-6">
            {/* Inbox */}
            <button className="relative flex items-center gap-2 text-white transition-colors hover:text-white/80">
              <span className="text-sm font-medium">Inbox</span>
              <div className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                  3
                </span>
              </div>
            </button>

            {/* User Info */}
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold text-white">
                {userName}
              </span>
              <span className="text-xs text-white/80">{userRole}</span>
            </div>
          </div>
        </DesktopNavBody>
      </DesktopNavbar>
    </div>
  );
}

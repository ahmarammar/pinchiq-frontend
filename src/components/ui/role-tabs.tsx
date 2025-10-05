'use client';

import * as Tabs from '@radix-ui/react-tabs';

import { GradientBorder } from './gradient-border';

interface RoleTabsProps {
  value: 'broker' | 'provider';
  onValueChange: (value: 'broker' | 'provider') => void;
}

export default function RoleTabs({ value, onValueChange }: RoleTabsProps) {
  return (
    <GradientBorder className="mx-auto" borderWidth="2px">
      <Tabs.Root
        value={value}
        onValueChange={onValueChange as (value: string) => void}
      >
        <Tabs.List className="flex gap-4 rounded-full bg-[#385DBB26] p-1.5 backdrop-blur-sm">
          <Tabs.Trigger
            value="broker"
            className="min-w-[120px] rounded-full px-6 py-3 text-base font-medium text-white transition-all duration-200 hover:bg-white/10 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-md data-[state=active]:hover:bg-white"
          >
            I'm Broker
          </Tabs.Trigger>
          <Tabs.Trigger
            value="provider"
            className="min-w-[120px] rounded-full px-6 py-3 text-base font-medium text-white transition-all duration-200 hover:bg-white/10 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-md data-[state=active]:hover:bg-white"
          >
            I'm Provider
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </GradientBorder>
  );
}

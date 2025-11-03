'use client';

import * as Tabs from '@radix-ui/react-tabs';

import { Button } from '@/components/ui/button';

interface RoleTabsProps {
  value: 'broker' | 'provider';
  onValueChange: (value: 'broker' | 'provider') => void;
}

export default function RoleTabs({ value, onValueChange }: RoleTabsProps) {
  return (
    <Tabs.Root
      value={value}
      onValueChange={onValueChange as (value: string) => void}
    >
      <Tabs.List className="bg-button-glass flex gap-1 rounded-[6.25rem] p-2 backdrop-blur-sm">
        <Tabs.Trigger value="broker" asChild>
          <Button
            variant={value === 'broker' ? 'secondary' : 'ghost'}
            className={`text-xl ${value === 'broker' ? '' : 'text-white'}`}
          >
            I'm Broker
          </Button>
        </Tabs.Trigger>
        <Tabs.Trigger value="provider" asChild>
          <Button
            variant={value === 'provider' ? 'secondary' : 'ghost'}
            className={`text-xl ${value === 'provider' ? '' : 'text-white'}`}
          >
            I'm Provider
          </Button>
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
}

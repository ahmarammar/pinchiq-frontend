'use client';

import * as Tabs from '@radix-ui/react-tabs';

import { Button } from '@/components/ui/button';

interface PolicyTypeTabsProps {
  value: 'Claims-made' | 'Occurrence';
  onValueChange: (value: 'Claims-made' | 'Occurrence') => void;
}

export default function PolicyTypeTabs({
  value,
  onValueChange,
}: PolicyTypeTabsProps) {
  return (
    <Tabs.Root
      value={value}
      onValueChange={onValueChange as (value: string) => void}
    >
      <Tabs.List className="h-11-5 bg-gray px-1-75 flex items-center justify-center gap-1 rounded-xl py-1 backdrop-blur-sm">
        <Tabs.Trigger value="Claims-made" asChild>
          <Button
            variant={value === 'Claims-made' ? 'muted' : 'ghost'}
            className={`w-1/2 text-xl leading-tight font-semibold tracking-normal hover:bg-inherit/80 ${value === 'Claims-made' ? 'rounded-lg bg-white text-black' : 'text-dark-neutral-500 bg-transparent'}`}
          >
            Claims-made
          </Button>
        </Tabs.Trigger>
        <Tabs.Trigger value="Occurrence" asChild>
          <Button
            variant={value === 'Occurrence' ? 'muted' : 'ghost'}
            className={`w-1/2 text-xl leading-tight font-semibold tracking-normal hover:bg-inherit/80 ${value === 'Occurrence' ? 'rounded-lg bg-white text-black' : 'text-dark-neutral-500 bg-transparent'}`}
          >
            Occurrence
          </Button>
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
}

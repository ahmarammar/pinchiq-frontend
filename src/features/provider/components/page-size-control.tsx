'use client';

import * as Tabs from '@radix-ui/react-tabs';

import { Button } from '@/components/ui/button';

interface PageSizeControlProps {
  value: '10 items' | '20' | 'Scroll';
  onValueChange: (value: '10 items' | '20' | 'Scroll') => void;
}

export default function PageSizeControl({
  value,
  onValueChange,
}: PageSizeControlProps) {
  return (
    <Tabs.Root
      value={value}
      onValueChange={onValueChange as (value: string) => void}
    >
      <Tabs.List className="flex h-12 gap-1 rounded-[6.25rem] bg-white p-1.5 backdrop-blur-sm">
        <Tabs.Trigger value="10 items">
          <Button
            variant={value === '10 items' ? 'muted' : 'ghost'}
            className={`leading-medium text-xl font-medium ${value === '10 items' ? '' : 'text-black'}`}
          >
            10 items
          </Button>
        </Tabs.Trigger>
        <Tabs.Trigger value="20">
          <Button
            variant={value === '20' ? 'muted' : 'ghost'}
            className={`leading-medium text-xl font-medium ${value === '20' ? '' : 'text-black'}`}
          >
            20
          </Button>
        </Tabs.Trigger>
        <Tabs.Trigger value="Scroll">
          <Button
            variant={value === 'Scroll' ? 'muted' : 'ghost'}
            className={`leading-medium text-xl font-medium ${value === 'Scroll' ? '' : 'text-black'}`}
          >
            Scroll
          </Button>
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
}

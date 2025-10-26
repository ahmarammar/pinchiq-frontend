'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';

interface PageSizeControlProps<T> {
  table: Table<T>;
  value: '10 items' | '20' | 'Scroll';
  onValueChange: (value: '10 items' | '20' | 'Scroll') => void;
}

export default function PageSizeControl<T>({
  table,
  value,
  onValueChange,
}: PageSizeControlProps<T>) {
  const handleValueChange = (newValue: string) => {
    const typedValue = newValue as '10 items' | '20' | 'Scroll';
    onValueChange(typedValue);

    switch (typedValue) {
      case '10 items':
        table.setPageSize(10);
        break;
      case '20':
        table.setPageSize(20);
        break;
      case 'Scroll':
        table.setPageSize(table.getFilteredRowModel().rows.length);
        break;
    }
  };

  return (
    <Tabs.Root value={value} onValueChange={handleValueChange}>
      <Tabs.List className="flex h-12 gap-1 rounded-[6.25rem] bg-white p-1.5 backdrop-blur-sm">
        <Tabs.Trigger value="10 items" asChild>
          <Button
            variant={value === '10 items' ? 'muted' : 'ghost'}
            className={`leading-medium text-xl font-medium ${value === '10 items' ? '' : 'text-black'}`}
          >
            10 items
          </Button>
        </Tabs.Trigger>
        <Tabs.Trigger value="20" asChild>
          <Button
            variant={value === '20' ? 'muted' : 'ghost'}
            className={`leading-medium text-xl font-medium ${value === '20' ? '' : 'text-black'}`}
          >
            20
          </Button>
        </Tabs.Trigger>
        <Tabs.Trigger value="Scroll" asChild>
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

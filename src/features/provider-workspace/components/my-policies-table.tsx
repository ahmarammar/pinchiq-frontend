'use client';

import { useState } from 'react';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Policy {
  id: string;
  name: string;
  status: string;
  facilities: number;
  renewalDate: string;
  icon: string;
}

const mockPolicies: Policy[] = [
  {
    id: '1',
    name: 'Maplewood Senior Living',
    status: 'Accepting Bids',
    facilities: 27,
    renewalDate: 'Sep 15, 2026',
    icon: '✕',
  },
  {
    id: '2',
    name: 'Riverside Care Center',
    status: 'Action Required',
    facilities: 34,
    renewalDate: 'Oct 22, 2024',
    icon: '◧',
  },
  {
    id: '3',
    name: 'Willow Creek Retirement Home',
    status: 'Ready to Renew',
    facilities: 42,
    renewalDate: 'Nov 30, 2023',
    icon: '●',
  },
  {
    id: '4',
    name: 'Bright Horizons Assisted Living',
    status: 'Completed',
    facilities: 58,
    renewalDate: 'Jan 5, 2027',
    icon: '◧',
  },
  {
    id: '5',
    name: 'Oak Hill Nursing Home',
    status: 'Accepting Bids',
    facilities: 63,
    renewalDate: 'Feb 18, 2025',
    icon: '⚷',
  },
  {
    id: '6',
    name: 'Harborview Long-Term Care',
    status: 'Action Required',
    facilities: 79,
    renewalDate: 'Mar 27, 2028',
    icon: '⚸',
  },
  {
    id: '7',
    name: 'Silverlake Wellness Center',
    status: 'Ready to Renew',
    facilities: 85,
    renewalDate: 'Apr 11, 2026',
    icon: '⚶',
  },
  {
    id: '8',
    name: 'Silverlake Wellness Center',
    status: 'Completed',
    facilities: 85,
    renewalDate: 'Apr 11, 2026',
    icon: '⊕',
  },
  {
    id: '9',
    name: 'Sunset Valley Care Home',
    status: 'Accepting Bids',
    facilities: 45,
    renewalDate: 'May 15, 2026',
    icon: '✕',
  },
  {
    id: '10',
    name: 'Mountain View Senior Living',
    status: 'Action Required',
    facilities: 52,
    renewalDate: 'Jun 20, 2024',
    icon: '◧',
  },
  {
    id: '11',
    name: 'Lakeside Retirement Community',
    status: 'Ready to Renew',
    facilities: 38,
    renewalDate: 'Jul 10, 2023',
    icon: '●',
  },
  {
    id: '12',
    name: 'Greenfield Assisted Living',
    status: 'Completed',
    facilities: 67,
    renewalDate: 'Aug 25, 2027',
    icon: '◧',
  },
];

export default function MyPoliciesTable() {
  const [data] = useState<Policy[]>(mockPolicies);
  const [openDialogRowId, setOpenDialogRowId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const columns: ColumnDef<Policy>[] = [
    {
      accessorKey: 'name',
      header: 'Policy',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <span className="text-lg">{row.original.icon}</span>
          <span className="text-sm font-medium text-gray-900">
            {row.getValue('name')}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        const getStatusColor = (status: string) => {
          switch (status) {
            case 'Accepting Bids':
              return 'bg-[#00C389]';
            case 'Action Required':
              return 'bg-[#FF6B9D]';
            case 'Ready to Renew':
              return 'bg-[#FFB800]';
            case 'Completed':
              return 'bg-[#4A90E2]';
            default:
              return 'bg-gray-400';
          }
        };

        return (
          <div className="inline-flex h-[1.875rem] items-center gap-2 rounded-full bg-white px-3">
            <span
              className={`h-2 w-2 flex-shrink-0 rounded-full ${getStatusColor(status)}`}
            ></span>
            <span className="text-sm leading-none font-medium text-gray-900">
              {status}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'facilities',
      header: 'Facilities',
      cell: ({ row }) => (
        <div className="flex h-[1.875rem] w-[2.4375rem] items-center justify-center gap-2.5 rounded-full bg-white px-3 py-1.5">
          <span className="text-sm font-medium text-gray-900">
            {row.getValue('facilities')}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'renewalDate',
      header: 'Renewal date',
      cell: ({ row }) => (
        <span className="text-sm text-gray-900">
          {row.getValue('renewalDate')}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const isThisRowOpen = openDialogRowId === row.original.id;

        return (
          <div className="relative">
            <button
              onClick={() => {
                if (isThisRowOpen) {
                  setOpenDialogRowId(null);
                  setDialogOpen(false);
                } else {
                  setOpenDialogRowId(row.original.id);
                  setDialogOpen(true);
                }
              }}
              className="flex -space-x-3 text-gray-400"
            >
              <MoreVertical className="h-5 w-5" />
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="items-center justify-center space-y-10 space-x-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[3.25rem] leading-[100%] font-medium tracking-[-0.04em] text-[#242424] capitalize">
          My Policies
        </h1>
        <div className="flex items-center justify-between">
          <p className="mt-5 text-base leading-[120%] font-medium text-[#929292]">
            Keep track of your organization's insurance portfolio.
          </p>
          <div className="flex items-center gap-2">
            <button className="flex h-[2.375rem] items-center justify-center rounded-full bg-[#F8F8F8] px-5 text-sm font-medium text-gray-900 backdrop-blur-[20px] hover:bg-gray-200">
              Filters
            </button>
            <button className="flex h-[2.375rem] items-center justify-center gap-2 rounded-full bg-[#F8F8F8] px-5 text-sm font-medium text-gray-900 backdrop-blur-[20px] hover:bg-gray-200">
              <span className="text-gray-500">Sort by:</span>
              <span className="font-semibold">Recent</span>
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <button className="flex h-[2.375rem] items-center justify-center rounded-full bg-[#242424] px-5 text-sm font-semibold text-white hover:bg-gray-800">
              + Add Policy
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-[#f8f8f8] px-12 py-3">
        <Table>
          <TableHeader className="bg-[#F8F8F8]">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow
                key={headerGroup.id}
                className="border-0 hover:bg-transparent"
              >
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    className="px-6 py-3 text-sm leading-[120%] font-medium text-[#7C7C7C]"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, rowIndex) => {
                const isThisRowOpen = openDialogRowId === row.original.id;

                return (
                  <TableRow
                    key={row.id}
                    className={`border-b border-gray-100 transition-all ${
                      openDialogRowId && openDialogRowId !== row.original.id
                        ? 'opacity-60 blur-[2px]'
                        : ''
                    } ${
                      openDialogRowId === row.original.id
                        ? 'relative z-10 bg-white hover:bg-white'
                        : 'hover:bg-gray-50'
                    }`}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell, cellIndex) => (
                      <TableCell
                        key={cell.id}
                        className={`px-6 py-5 ${cellIndex === 3 ? 'relative' : ''}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}

                        {/* Render dialog in the Renewal Date column (index 3) */}
                        {cellIndex === 3 && isThisRowOpen && dialogOpen && (
                          <div className="absolute top-full right-2 z-50 mt-2">
                            <div className="h-[7.625rem] w-[19.875rem] rounded-[2rem] border-0 bg-white p-4 shadow-[0px_4px_60px_0px_rgba(0,0,0,0.05)]">
                              <div className="flex items-center justify-center gap-6">
                                <button className="flex flex-col items-center justify-center gap-4 transition-all">
                                  <svg
                                    className="h-6 w-6 text-[#525252]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                                    />
                                  </svg>
                                  <span className="text-xs leading-[100%] font-semibold text-[#525252]">
                                    Loss Run
                                  </span>
                                </button>

                                <button className="flex flex-col items-center justify-center gap-4 transition-all">
                                  <svg
                                    className="h-6 w-6 text-[#525252]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                    />
                                  </svg>
                                  <span className="text-xs leading-[100%] font-semibold text-[#525252]">
                                    Start Renewal
                                  </span>
                                </button>

                                <button className="flex h-[5.625rem] w-[5.625rem] flex-col items-center justify-center gap-4 rounded-2xl bg-[#F5F5F5] transition-all outline-none hover:bg-[#FAFAFA]">
                                  <svg
                                    className="h-6 w-6 text-[#242424]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                    />
                                  </svg>
                                  <span className="text-xs leading-[100%] font-semibold text-[#242424]">
                                    Edit Policy
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow className="border-0 bg-[#f8f8f8]">
              <TableCell colSpan={columns.length} className="px-6 py-3.5">
                {/* Pagination */}
                <div className="flex items-center justify-between">
                  <div className="flex h-12 items-center gap-1 rounded-full bg-white p-1 text-sm text-gray-600">
                    <span className="flex h-10 w-21 items-center justify-center gap-2.5 rounded-full bg-[#F8F8F8] px-4 py-3 font-medium">
                      {table.getRowModel().rows.length} items
                    </span>
                    <select
                      value={table.getState().pagination.pageSize}
                      onChange={e => {
                        table.setPageSize(Number(e.target.value));
                      }}
                      className="rounded-full border-0 bg-transparent px-2 py-1 text-sm font-medium text-gray-900 focus:ring-0 focus:outline-none"
                    >
                      {[10, 20, 50, 100].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                          {pageSize}
                        </option>
                      ))}
                    </select>
                    <span className="flex h-10 w-21 items-center justify-center gap-2.5 rounded-full px-4 py-3 font-medium">
                      Scroll
                    </span>
                  </div>

                  {/* Pagination 2 */}
                  <Pagination className="m-0 w-auto px-20">
                    <PaginationContent className="h-12 justify-center gap-1 rounded-full bg-white px-2">
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => table.previousPage()}
                          className={`h-10 rounded-full px-4 text-sm font-medium text-gray-900 hover:bg-gray-200 ${
                            !table.getCanPreviousPage()
                              ? 'pointer-events-none opacity-50'
                              : 'cursor-pointer'
                          }`}
                        />
                      </PaginationItem>

                      <PaginationItem>
                        <PaginationLink
                          onClick={() => table.setPageIndex(0)}
                          isActive={table.getState().pagination.pageIndex === 0}
                          className="h-10 min-w-[2.5rem] cursor-pointer rounded-full border-0 px-4 text-sm font-medium data-[active=true]:bg-[#F8F8F8] data-[active=true]:text-gray-900"
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>

                      <PaginationItem>
                        <PaginationLink
                          onClick={() => table.setPageIndex(1)}
                          isActive={table.getState().pagination.pageIndex === 1}
                          className="h-10 min-w-[2.5rem] cursor-pointer rounded-full border-0 px-4 text-sm font-medium data-[active=true]:bg-[#F8F8F8] data-[active=true]:text-gray-900"
                        >
                          2
                        </PaginationLink>
                      </PaginationItem>

                      <PaginationItem>
                        <PaginationLink
                          onClick={() => table.setPageIndex(2)}
                          isActive={table.getState().pagination.pageIndex === 2}
                          className="h-10 min-w-[2.5rem] cursor-pointer rounded-full border-0 px-4 text-sm font-medium data-[active=true]:bg-[#F8F8F8] data-[active=true]:text-gray-900"
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>

                      <PaginationItem>
                        <PaginationEllipsis className="h-10 w-auto px-2 text-sm font-medium text-gray-400" />
                      </PaginationItem>

                      <PaginationItem>
                        <PaginationLink
                          onClick={() => table.setPageIndex(11)}
                          isActive={
                            table.getState().pagination.pageIndex === 11
                          }
                          className="h-10 min-w-[2.5rem] cursor-pointer rounded-full border-0 px-4 text-sm font-medium data-[active=true]:bg-[#F8F8F8] data-[active=true]:text-gray-900"
                        >
                          12
                        </PaginationLink>
                      </PaginationItem>

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => table.nextPage()}
                          className={`h-10 rounded-full px-4 text-sm font-medium text-gray-900 hover:bg-gray-200 ${
                            !table.getCanNextPage()
                              ? 'pointer-events-none opacity-50'
                              : 'cursor-pointer'
                          }`}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}

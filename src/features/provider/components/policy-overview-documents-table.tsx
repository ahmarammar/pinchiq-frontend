'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Eye, MoreVertical, View } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import PageSizeControl from './page-size-control';
import { Pagination } from './pagination';

interface Document {
  id: string;
  file: {
    name: string;
    type: string;
  };
  uploadedOn: {
    date: string;
    time: string;
  };
  size: string;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    file: { name: 'Policy_Document_2023.pdf', type: 'pdf' },
    uploadedOn: { date: '15 Sep 2026', time: '9:32am' },
    size: '12.7 MB',
  },
  {
    id: '2',
    file: { name: 'Employee_Handbook.pdf', type: 'pdf' },
    uploadedOn: { date: '18 Sep 2026', time: '10:15am' },
    size: '8.4 MB',
  },
  {
    id: '3',
    file: { name: 'Insurance_Claim_Form.docx', type: 'docx' },
    uploadedOn: { date: '20 Sep 2026', time: '2:45pm' },
    size: '2.1 MB',
  },
  {
    id: '4',
    file: { name: 'Facility_Inspection_Report.pdf', type: 'pdf' },
    uploadedOn: { date: '22 Sep 2026', time: '11:05am' },
    size: '5.9 MB',
  },
  {
    id: '5',
    file: { name: 'Vendor_Contract_2026.pdf', type: 'pdf' },
    uploadedOn: { date: '23 Sep 2026', time: '4:21pm' },
    size: '6.3 MB',
  },
  {
    id: '6',
    file: { name: 'Policy_Update_Notice.pdf', type: 'pdf' },
    uploadedOn: { date: '25 Sep 2026', time: '1:02pm' },
    size: '3.8 MB',
  },
  {
    id: '7',
    file: { name: 'Employee_Onboarding_Guide.pdf', type: 'pdf' },
    uploadedOn: { date: '27 Sep 2026', time: '9:48am' },
    size: '7.5 MB',
  },
  {
    id: '8',
    file: { name: 'Facility_Maintenance_Schedule.xlsx', type: 'xlsx' },
    uploadedOn: { date: '28 Sep 2026', time: '3:10pm' },
    size: '1.9 MB',
  },
  {
    id: '9',
    file: { name: 'Compliance_Audit_Report.pdf', type: 'pdf' },
    uploadedOn: { date: '30 Sep 2026', time: '10:27am' },
    size: '11.2 MB',
  },
  {
    id: '10',
    file: { name: 'Incident_Report_Sept.pdf', type: 'pdf' },
    uploadedOn: { date: '1 Oct 2026', time: '8:53am' },
    size: '4.6 MB',
  },
  {
    id: '11',
    file: { name: 'Safety_Checklist.xlsx', type: 'xlsx' },
    uploadedOn: { date: '3 Oct 2026', time: '12:44pm' },
    size: '2.5 MB',
  },
  {
    id: '12',
    file: { name: 'Facility_Lease_Agreement.pdf', type: 'pdf' },
    uploadedOn: { date: '4 Oct 2026', time: '9:02am' },
    size: '9.1 MB',
  },
  {
    id: '13',
    file: { name: 'Inspection_Results_2026.pdf', type: 'pdf' },
    uploadedOn: { date: '5 Oct 2026', time: '11:40am' },
    size: '10.3 MB',
  },
  {
    id: '14',
    file: { name: 'Expense_Report_Q3.xlsx', type: 'xlsx' },
    uploadedOn: { date: '6 Oct 2026', time: '5:05pm' },
    size: '1.6 MB',
  },
  {
    id: '15',
    file: { name: 'Policy_Review_Meeting_Minutes.docx', type: 'docx' },
    uploadedOn: { date: '8 Oct 2026', time: '3:30pm' },
    size: '3.2 MB',
  },
  {
    id: '16',
    file: { name: 'Emergency_Response_Plan.pdf', type: 'pdf' },
    uploadedOn: { date: '9 Oct 2026', time: '2:12pm' },
    size: '6.0 MB',
  },
  {
    id: '17',
    file: { name: 'Training_Materials.pdf', type: 'pdf' },
    uploadedOn: { date: '11 Oct 2026', time: '9:25am' },
    size: '8.2 MB',
  },
  {
    id: '18',
    file: { name: 'Project_Proposal_2027.pdf', type: 'pdf' },
    uploadedOn: { date: '12 Oct 2026', time: '1:18pm' },
    size: '5.0 MB',
  },
  {
    id: '19',
    file: { name: 'Internal_Audit_Summary.pdf', type: 'pdf' },
    uploadedOn: { date: '13 Oct 2026', time: '11:00am' },
    size: '7.9 MB',
  },
  {
    id: '20',
    file: { name: 'Team_Attendance_Log.xlsx', type: 'xlsx' },
    uploadedOn: { date: '14 Oct 2026', time: '4:50pm' },
    size: '2.3 MB',
  },
  {
    id: '21',
    file: { name: 'Vendor_Invoice_Sept.pdf', type: 'pdf' },
    uploadedOn: { date: '15 Oct 2026', time: '9:09am' },
    size: '4.1 MB',
  },
  {
    id: '22',
    file: { name: 'Health_Safety_Policy.pdf', type: 'pdf' },
    uploadedOn: { date: '16 Oct 2026', time: '10:47am' },
    size: '9.4 MB',
  },
  {
    id: '23',
    file: { name: 'Facility_Plan_Overview.pdf', type: 'pdf' },
    uploadedOn: { date: '17 Oct 2026', time: '12:00pm' },
    size: '6.8 MB',
  },
  {
    id: '24',
    file: { name: 'Equipment_List.xlsx', type: 'xlsx' },
    uploadedOn: { date: '18 Oct 2026', time: '3:33pm' },
    size: '1.8 MB',
  },
  {
    id: '25',
    file: { name: 'Performance_Report_Q3.pdf', type: 'pdf' },
    uploadedOn: { date: '19 Oct 2026', time: '11:55am' },
    size: '10.1 MB',
  },
  {
    id: '26',
    file: { name: 'Employee_Review_Sheet.docx', type: 'docx' },
    uploadedOn: { date: '20 Oct 2026', time: '8:37am' },
    size: '3.0 MB',
  },
  {
    id: '27',
    file: { name: 'Accident_Report.pdf', type: 'pdf' },
    uploadedOn: { date: '22 Oct 2026', time: '2:48pm' },
    size: '4.7 MB',
  },
  {
    id: '28',
    file: { name: 'Budget_Plan_2027.xlsx', type: 'xlsx' },
    uploadedOn: { date: '23 Oct 2026', time: '1:20pm' },
    size: '2.7 MB',
  },
  {
    id: '29',
    file: { name: 'Compliance_Form.pdf', type: 'pdf' },
    uploadedOn: { date: '24 Oct 2026', time: '9:14am' },
    size: '6.5 MB',
  },
  {
    id: '30',
    file: { name: 'Inspection_Summary_Report.pdf', type: 'pdf' },
    uploadedOn: { date: '25 Oct 2026', time: '10:50am' },
    size: '11.6 MB',
  },
];

export default function PolicyOverviewDocumentsTable({
  setDocumentId,
}: {
  setDocumentId: (id: string) => void;
}) {
  const [data] = useState<Document[]>(mockDocuments);
  const [openDialogRowId, setOpenDialogRowId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pageSize, setPageSize] = useState<'10 items' | '20' | 'Scroll'>(
    '10 items'
  );
  const columns: ColumnDef<Document>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <div className="h-4 w-4">
          <Checkbox
            variant="modern"
            className="h-4 w-4 border-[#d8d8d8] bg-transparent"
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="h-4 w-4">
          <Checkbox
            variant="modern"
            className="h-4 w-4 border-[#d8d8d8] bg-transparent"
            checked={row.getIsSelected()}
            onCheckedChange={value => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
    },
    {
      accessorKey: 'file',
      header: 'File Name',
      cell: ({ row }) => {
        const { name, type } = row.getValue('file') as Document['file'];
        return (
          <div className="gap-4-5 flex items-center">
            <div className="relative flex h-10 w-8 items-center justify-center">
              <Image
                src="/provider/add-policy/file-type.svg"
                alt="File Icon"
                width={32}
                height={40}
              />
              <Image
                src="/provider/add-policy/file-type-earmark.svg"
                alt="File Icon Overlay"
                width={12}
                height={12}
                className="absolute top-0 right-0"
              />
              <h4 className="text-dark-blue absolute bottom-1.5 left-2.5 text-sm leading-tight font-semibold tracking-normal lowercase">
                {type}
              </h4>
            </div>
            <span className="leading-medium text-xl font-medium tracking-normal text-black">
              {name}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'uploadedOn',
      header: 'Uploaded On',
      cell: ({ row }) => {
        const { date, time } = row.getValue(
          'uploadedOn'
        ) as Document['uploadedOn'];
        return (
          <div className="flex items-center gap-1">
            <div className="min-h-7-5 leading-medium rounded-[6.25rem] bg-white px-3 py-1.5 text-xl font-medium tracking-normal text-black">
              {date}
            </div>
            <div className="min-h-7-5 leading-medium rounded-[6.25rem] bg-white px-3 py-1.5 text-xl font-medium tracking-normal text-black">
              {time}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'size',
      header: 'Size',
      cell: ({ row }) => (
        <div className="text-xl leading-4 font-medium tracking-normal text-black">
          {row.getValue('size')}
        </div>
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
              className="text-dark-neutral-200 ml-3 flex -space-x-3"
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
    <div className="items-center justify-center space-y-10">
      <div className="bg-gray relative overflow-hidden rounded-4xl py-3">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} className="border-none">
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    className="text-dark-neutral-500 pt-4 pb-6 text-xl leading-snug font-medium tracking-normal first:pl-6 last:pr-6"
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, rowIndex) => {
                const isThisRowOpen = openDialogRowId === row.original.id;
                return (
                  <TableRow
                    key={row.id}
                    className={`border-none transition-all ${
                      openDialogRowId && openDialogRowId !== row.original.id
                        ? 'opacity-60 blur-[0.084rem]'
                        : ''
                    } ${
                      openDialogRowId === row.original.id
                        ? 'relative z-10 bg-white shadow-xs shadow-black/[0.01]'
                        : ''
                    }`}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell, cellIndex) => {
                      const isFirstCell = cellIndex === 0;
                      const isLastCell =
                        cellIndex === row.getVisibleCells().length - 1;
                      const isActiveRow = openDialogRowId === row.original.id;

                      return (
                        <TableCell
                          key={cell.id}
                          className={`py-5 ${isFirstCell && 'pl-6'} ${isLastCell && 'pr-6'} ${cellIndex === 3 ? 'relative' : ''} ${
                            isActiveRow && isFirstCell ? 'rounded-l-2xl' : ''
                          } ${
                            isActiveRow && isLastCell ? 'rounded-r-2xl' : ''
                          }`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}

                          {cellIndex === 3 && isThisRowOpen && dialogOpen && (
                            <div
                              className={`absolute right-0 z-50 ${isThisRowOpen && rowIndex + 1 <= table.getRowModel().rows.length - 1 ? 'top-full mt-2' : 'bottom-full mb-2'}`}
                            >
                              <div className="h-[7.625rem] rounded-4xl border-0 bg-white p-4 shadow-[0rem_0.25rem_3.75rem_0rem_#0000000D]">
                                <div className="flex items-center justify-end gap-7">
                                  <button
                                    onClick={() => {
                                      setDocumentId(row.original.id);
                                    }}
                                    className="bg-light-neutral-100 hover:bg-light-neutral-300 flex h-[5.625rem] w-[5.625rem] flex-col items-center justify-center gap-4 rounded-2xl transition-all outline-none"
                                  >
                                    <Eye
                                      className="text-dark-neutral-500 h-6 w-6"
                                      size={24}
                                    />
                                    <span className="text-lg leading-tight font-semibold tracking-normal text-black">
                                      View
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </TableCell>
                      );
                    })}
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
            <TableRow className="bg-gray border-0">
              <TableCell colSpan={columns.length} className="px-6 py-5">
                <div className="flex items-center justify-between">
                  <PageSizeControl
                    table={table}
                    value={pageSize}
                    onValueChange={setPageSize}
                  />
                  <Pagination table={table} maxVisiblePages={2} />
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}

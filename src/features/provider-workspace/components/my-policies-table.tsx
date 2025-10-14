'use client';

import { useState } from 'react';

import Image from 'next/image';

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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = 4;

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
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex h-[2.375rem] items-center justify-center rounded-full bg-[#242424] px-5 text-sm font-semibold text-white hover:bg-gray-800">
                  + Add Policy
                </button>
              </DialogTrigger>
              <DialogContent className="scrollbar-hide max-h-[95vh] w-[61.25rem] overflow-y-auto rounded-[1.5rem] border-0 bg-white px-[3.25rem] pt-[3.25rem] pb-8 opacity-100 shadow-[0px_4px_120px_0px_rgba(0,0,0,0.05)]">
                <div className="space-y-[3.25rem]">
                  {/* Header */}
                  <div className="space-y-3">
                    <h2 className="text-[1.5rem] leading-[120%] font-semibold text-[#242424]">
                      Add new policy
                    </h2>
                    <p className="text-sm leading-[120%] font-normal text-[#929292]">
                      Provide the required details to create a new insurance
                      policy for your facility.
                    </p>
                    {/* Multi-step Progress Bar */}
                    <div className="flex gap-2">
                      {Array.from({ length: totalSteps }).map((_, index) => {
                        const stepNumber = index + 1;
                        const isCompleted = stepNumber < currentStep;
                        const isActive = stepNumber === currentStep;

                        return (
                          <div
                            key={stepNumber}
                            className="relative h-2 w-[213px] overflow-hidden rounded-full bg-[#E5E5E5]"
                          >
                            <div
                              className={`absolute inset-0 h-full rounded-full transition-all duration-500 ease-out ${
                                isCompleted || isActive
                                  ? 'w-full bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5]'
                                  : 'w-0 bg-transparent'
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="w-[54.75rem]">
                    {/* Step 1: Policy Details */}
                    {currentStep === 1 && (
                      <>
                        {/* Policy Name and Link */}
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                            <svg
                              className="h-5 w-5 text-gray-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <input
                              type="text"
                              placeholder="Enter policy name"
                              className="h-8 w-[13.25rem] rounded border-[1.5px] border-[#AFC8F2] px-2 py-1 text-center text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                            <input
                              type="url"
                              placeholder="Add a link to a website"
                              className="h-6 w-[10.6875rem] rounded border-[1.5px] border-[#AFC8F2] p-1 text-center text-sm text-blue-500 focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Two Column Layout */}
                        <div className="mt-8 grid grid-cols-2 gap-6">
                          {/* Insured Name */}
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">
                              Insured Name{' '}
                              <span className="text-blue-500">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Enter legal name"
                              className="h-[2.875rem] w-[26.625rem] rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                          </div>

                          {/* Contact Name */}
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">
                              Contact Name{' '}
                              <span className="text-blue-500">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Enter full name"
                              className="h-[2.875rem] w-[26.625rem] rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                          </div>

                          {/* Contact Phone */}
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">
                              Contact Phone{' '}
                              <span className="text-blue-500">*</span>
                            </label>
                            <input
                              type="tel"
                              placeholder="+1 (___) ___-____"
                              className="h-[2.875rem] w-[26.625rem] rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                          </div>

                          {/* Contact Email */}
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">
                              Contact Email{' '}
                              <span className="text-blue-500">*</span>
                            </label>
                            <input
                              type="email"
                              placeholder="name@example.com"
                              className="h-[2.875rem] w-[26.625rem] rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Step 2: Current Policy */}
                    {currentStep === 2 && (
                      <div className="grid grid-cols-2 gap-6">
                        {/* Effective Date */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-900">
                            Effective Date{' '}
                            <span className="text-blue-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="mm/dd/yyyy"
                            className="h-[2.875rem] w-[26.625rem] rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>

                        {/* Expiration Date */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-900">
                            Expiration Date{' '}
                            <span className="text-blue-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="mm/dd/yyyy"
                            className="h-[2.875rem] w-[26.625rem] rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>

                        {/* Insurance Company */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-900">
                            Insurance Company{' '}
                            <span className="text-blue-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter company name"
                            className="h-[2.875rem] w-[26.625rem] rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>

                        {/* Policy Type */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-900">
                            Policy Type <span className="text-blue-500">*</span>
                          </label>
                          <Tabs defaultValue="claims-made" className="w-full">
                            <TabsList className="grid h-auto w-full grid-cols-2 rounded-xl bg-[#F5F5F5] p-1">
                              <TabsTrigger
                                value="claims-made"
                                className="rounded-xl px-4 py-3 text-sm font-normal text-gray-900 transition-all data-[state=active]:bg-white data-[state=active]:font-medium data-[state=active]:text-[#242424] data-[state=active]:shadow-sm"
                              >
                                Claims-made
                              </TabsTrigger>
                              <TabsTrigger
                                value="occurrence"
                                className="rounded-xl px-4 py-3 text-sm font-normal text-gray-900 transition-all data-[state=active]:bg-white data-[state=active]:font-medium data-[state=active]:text-[#242424] data-[state=active]:shadow-sm"
                              >
                                Occurrence
                              </TabsTrigger>
                            </TabsList>
                          </Tabs>
                        </div>

                        {/* Coverage Limit */}
                        <div className="col-span-2 space-y-2">
                          <label className="text-sm font-medium text-gray-900">
                            Coverage Limit{' '}
                            <span className="text-blue-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter amount (e.g. $5,000,000)"
                            className="h-[2.875rem] w-full rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>

                        {/* Deductible */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-900">
                            Deductible <span className="text-blue-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter amount (e.g. $25,000)"
                            className="h-[2.875rem] w-[26.625rem] rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>

                        {/* Premium */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-900">
                            Premium <span className="text-blue-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter amount (e.g. $25,000)"
                            className="h-[2.875rem] w-[26.625rem] rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>

                        {/* Coverage Issues */}
                        <div className="space-y-4">
                          <label className="text-sm font-medium text-gray-900">
                            Coverage Issues{' '}
                            <span className="text-blue-500">*</span>
                          </label>
                          <RadioGroup
                            defaultValue="no"
                            className="flex flex-col gap-4"
                          >
                            <div className="mt-4 flex items-center gap-2">
                              <RadioGroupItem value="no" id="coverage-no" />
                              <label
                                htmlFor="coverage-no"
                                className="cursor-pointer text-sm font-normal text-gray-900"
                              >
                                No
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="yes" id="coverage-yes" />
                              <label
                                htmlFor="coverage-yes"
                                className="cursor-pointer text-sm font-normal text-gray-900"
                              >
                                Yes
                              </label>
                            </div>
                          </RadioGroup>
                        </div>

                        {/* Bankruptcy Filings */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-900">
                            Bankruptcy Filings{' '}
                            <span className="text-blue-500">*</span>
                          </label>
                          <RadioGroup
                            defaultValue="no"
                            className="flex flex-col gap-4"
                          >
                            <div className="mt-4 flex items-center gap-2">
                              <RadioGroupItem value="no" id="coverage-no" />
                              <label
                                htmlFor="coverage-no"
                                className="cursor-pointer text-sm font-normal text-gray-900"
                              >
                                No
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="yes" id="coverage-yes" />
                              <label
                                htmlFor="coverage-yes"
                                className="cursor-pointer text-sm font-normal text-gray-900"
                              >
                                Yes
                              </label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Upload Documents */}
                    {currentStep === 3 && (
                      <div className="flex flex-col items-center justify-center space-y-6">
                        {/* Upload Area */}
                        <div className="flex h-[209px] w-[876px] flex-col items-center justify-center gap-4 rounded-2xl bg-[#F8F8F8] px-8 py-[52px]">
                          {/* Upload Icon */}
                          <div className="bg-opacity-10 flex h-16 w-16 items-center justify-center">
                            <Image
                              src="/file-icon.svg"
                              alt="Upload Icon"
                              width={32}
                              height={32}
                            />
                          </div>

                          {/* Upload Text */}
                          <div className="text-center">
                            <h3 className="text-lg font-semibold text-[#242424]">
                              Upload Documents
                            </h3>
                            <p className="mt-2 text-sm text-[#929292]">
                              Drag & drop or
                              <button className="px-1 font-medium text-[#4A90E2] hover:underline">
                                click to upload
                              </button>
                              Loss Run (PDF)
                            </p>
                          </div>
                        </div>

                        {/* Disclaimer Text */}
                        <div className="max-w-2xl text-center">
                          <p className="text-xs leading-relaxed text-[#929292]">
                            Uploaded documents must not include personally
                            identifiable health information (PHI) unless
                            authorized under HIPAA or relevant laws. By
                            uploading, you confirm your right to share these
                            materials for insurance underwriting purposes.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Step 4: Facility Setup */}
                    {currentStep === 4 && (
                      <div className="space-y-8">
                        {/* Basic Information */}
                        <div>
                          <h3 className="mb-4 text-base font-semibold text-[#242424]">
                            Basic Information
                          </h3>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-900">
                                Facility Name{' '}
                                <span className="text-blue-500">*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="Green Valley Nursing Home"
                                className="h-[2.875rem] w-full rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-900">
                                Facility Address{' '}
                                <span className="text-blue-500">*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="321 Main Street, Southfield, IL 62704"
                                className="h-[2.875rem] w-full rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-900">
                                Website
                              </label>
                              <input
                                type="url"
                                placeholder="www.greenvalleynursing.com"
                                className="h-[2.875rem] w-full rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-900">
                                CMS Provider ID{' '}
                                <span className="text-blue-500">*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="445721"
                                className="h-[2.875rem] w-full rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Bed Capacity */}
                        <div>
                          <h3 className="mb-4 text-base font-semibold text-[#242424]">
                            Bed Capacity
                          </h3>
                          <div className="space-y-4">
                            {/* Bed Type 1 */}
                            <div className="grid grid-cols-[1fr_200px_200px_40px] items-start gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">
                                  Bed Type{' '}
                                  <span className="text-blue-500">*</span>
                                </label>
                                <select className="h-[2.875rem] w-full rounded-xl border border-[#F0F0F0] bg-white px-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none">
                                  <option>
                                    Skilled Nursing Facility (SNF)
                                  </option>
                                </select>
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">
                                  Licensed{' '}
                                  <span className="text-blue-500">*</span>
                                </label>
                                <input
                                  type="number"
                                  placeholder="120"
                                  className="h-[2.875rem] w-full rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">
                                  Occupied{' '}
                                  <span className="text-blue-500">*</span>
                                </label>
                                <input
                                  type="number"
                                  placeholder="110"
                                  className="h-[2.875rem] w-full rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>

                              <div className="mt-8 flex items-end">
                                <button className="flex -space-x-3 text-gray-400">
                                  <MoreVertical className="h-5 w-5" />
                                  <MoreVertical className="h-5 w-5" />
                                </button>
                              </div>
                            </div>

                            {/* Bed Type 2 */}
                            <div className="grid grid-cols-[1fr_200px_200px_40px] items-start gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">
                                  Bed Type{' '}
                                  <span className="text-blue-500">*</span>
                                </label>
                                <select className="h-[2.875rem] w-full rounded-xl border border-[#F0F0F0] bg-white px-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none">
                                  <option>Assisted Living (ALF)</option>
                                </select>
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">
                                  Licensed{' '}
                                  <span className="text-blue-500">*</span>
                                </label>
                                <input
                                  type="number"
                                  placeholder="60"
                                  className="h-[2.875rem] w-full rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">
                                  Occupied{' '}
                                  <span className="text-blue-500">*</span>
                                </label>
                                <input
                                  type="number"
                                  placeholder="55"
                                  className="h-[2.875rem] w-full rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>

                              <div className="mt-8 flex items-end">
                                <button className="flex -space-x-3 text-gray-400">
                                  <MoreVertical className="h-5 w-5" />
                                  <MoreVertical className="h-5 w-5" />
                                </button>
                              </div>
                            </div>

                            {/* Bed Type 3 */}
                            <div className="grid grid-cols-[1fr_200px_200px_40px] items-start gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">
                                  Bed Type{' '}
                                  <span className="text-blue-500">*</span>
                                </label>
                                <select className="h-[2.875rem] w-full rounded-xl border border-[#F0F0F0] bg-white px-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none">
                                  <option>Memory Care / Dementia Unit</option>
                                </select>
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">
                                  Licensed{' '}
                                  <span className="text-blue-500">*</span>
                                </label>
                                <input
                                  type="number"
                                  placeholder="40"
                                  className="h-[2.875rem] w-full rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">
                                  Occupied{' '}
                                  <span className="text-blue-500">*</span>
                                </label>
                                <input
                                  type="number"
                                  placeholder="32"
                                  className="h-[2.875rem] w-full rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>

                              <div className="mt-8 flex items-end">
                                <button className="flex -space-x-3 text-gray-400">
                                  <MoreVertical className="h-5 w-5" />
                                  <MoreVertical className="h-5 w-5" />
                                </button>
                              </div>
                            </div>

                            <div className="mt-4 flex items-center justify-center gap-4">
                              <div className="h-[1px] flex-1 bg-gray-200"></div>
                              <button className="flex items-center gap-2 rounded-lg bg-[#F5F8FB] px-4 py-2 text-sm font-medium text-[#4A90E2] hover:bg-[#E8F1F8]">
                                <span className="text-lg">+</span>
                                <span>Add another bed type</span>
                              </button>
                              <div className="h-[1px] flex-1 bg-gray-200"></div>
                            </div>
                          </div>
                        </div>

                        {/* Ownership */}
                        <div>
                          <h3 className="mb-4 text-base font-semibold text-[#242424]">
                            Ownership
                          </h3>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">
                                  Owner of Facility{' '}
                                  <span className="text-blue-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  placeholder="Healthcare Partners LLC"
                                  className="h-[2.875rem] w-full rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">
                                  How Long Owned
                                </label>
                                <input
                                  type="text"
                                  placeholder="6 years"
                                  className="h-[2.875rem] w-full rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">
                                  Other Owned Facilities
                                </label>
                                <input
                                  type="text"
                                  placeholder="Sunrise Rehabilitation Center"
                                  className="h-[2.875rem] w-full rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">
                                  Facility ID{' '}
                                  <span className="text-blue-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  placeholder="22495"
                                  className="h-[2.875rem] w-full rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>
                            </div>
                            <div className="mt-4 flex items-center justify-center gap-4">
                              <div className="h-[1px] flex-1 bg-gray-200"></div>
                              <button className="flex items-center gap-2 rounded-lg bg-[#F5F8FB] px-4 py-2 text-sm font-medium text-[#4A90E2] hover:bg-[#E8F1F8]">
                                <span className="text-lg">+</span>
                                <span>Add another owner</span>
                              </button>
                              <div className="h-[1px] flex-1 bg-gray-200"></div>
                            </div>
                          </div>
                        </div>

                        {/* Management Company */}
                        <div>
                          <h3 className="mb-4 text-base font-semibold text-[#242424]">
                            Management Company
                          </h3>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-900">
                                Managed by Company?{' '}
                                <span className="text-blue-500">*</span>
                              </label>
                              <RadioGroup
                                defaultValue="yes"
                                className="mt-2 flex gap-12"
                              >
                                <div className="flex items-center gap-2">
                                  <RadioGroupItem
                                    value="yes"
                                    id="managed-yes"
                                  />
                                  <label
                                    htmlFor="managed-yes"
                                    className="cursor-pointer text-sm font-normal text-gray-900"
                                  >
                                    Yes
                                  </label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <RadioGroupItem value="no" id="managed-no" />
                                  <label
                                    htmlFor="managed-no"
                                    className="cursor-pointer text-sm font-normal text-gray-900"
                                  >
                                    No
                                  </label>
                                </div>
                              </RadioGroup>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">
                                  Management Company Name{' '}
                                  <span className="text-blue-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  placeholder="MediCare Management Group"
                                  className="h-[2.875rem] w-full rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">
                                  How Long Managed
                                </label>
                                <input
                                  type="text"
                                  placeholder="7 years"
                                  className="h-[2.875rem] w-full rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">
                                  Other Managed Facilities
                                </label>
                                <input
                                  type="text"
                                  placeholder="HillSide Memory Care"
                                  className="h-[2.875rem] w-full rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">
                                  Facility ID{' '}
                                  <span className="text-blue-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  placeholder="33306"
                                  className="h-[2.875rem] w-full rounded-xl border border-[#F0F0F0] bg-white p-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="mt-4 flex items-center justify-center gap-4">
                              <div className="h-[1px] flex-1 bg-gray-200"></div>
                              <button className="flex items-center gap-2 rounded-lg bg-[#F5F8FB] px-4 py-2 text-sm font-medium text-[#4A90E2] hover:bg-[#E8F1F8]">
                                <span className="text-lg">+</span>
                                <span>Add another management company</span>
                              </button>
                              <div className="h-[1px] flex-1 bg-gray-200"></div>
                            </div>
                          </div>
                        </div>

                        {/* Agreement Checkbox */}
                        <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-4">
                          <input
                            type="radio"
                            id="agreement"
                            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                          />
                          <label
                            htmlFor="agreement"
                            className="text-xs text-gray-600"
                          >
                            By submitting this facility data, I acknowledge that
                            I am authorized to do so and accept the{' '}
                            <a
                              href="#"
                              className="font-medium text-blue-500 hover:underline"
                            >
                              Provider Submission Agreement
                            </a>
                            , including rules on disclosures, confidentiality,
                            and compliance.
                          </label>
                        </div>
                      </div>
                    )}
                    {/* Footer Buttons */}
                    <div className="flex items-center justify-between pt-8">
                      {currentStep === 4 ? (
                        <>
                          <button className="flex h-[46px] items-center justify-center rounded-[100px] border border-[#F0F0F0] px-8 py-4 text-sm font-medium text-[#242424] transition-colors hover:bg-gray-50">
                            Save as Draft
                          </button>
                          <div className="flex gap-3">
                            <button
                              onClick={() => setCurrentStep(currentStep - 1)}
                              className="flex h-[46px] w-[209px] items-center justify-center rounded-[100px] border border-[#F0F0F0] px-8 py-4 text-sm font-medium text-[#242424] transition-colors hover:bg-gray-50"
                            >
                              Go Back
                            </button>
                            <button className="flex h-[46px] w-[209px] items-center justify-center gap-2 rounded-[100px] bg-[#F8F8F8] px-4 py-2 text-sm font-medium text-[#4A90E2] transition-colors hover:bg-[#DBEAFE]">
                              <span>Save Policy</span>
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
                          </div>
                        </>
                      ) : (
                        <>
                          <button className="flex h-[46px] w-[209px] items-center justify-center rounded-[100px] border border-[#F0F0F0] px-8 py-4 text-sm font-medium text-[#242424] transition-colors hover:bg-gray-50">
                            Save as Draft
                          </button>
                          <div className="flex gap-3">
                            {currentStep > 1 ? (
                              <button
                                onClick={() => setCurrentStep(currentStep - 1)}
                                className="flex h-[46px] w-[209px] items-center justify-center rounded-[100px] border border-[#F0F0F0] px-8 py-4 text-sm font-medium text-[#242424] transition-colors hover:bg-gray-50"
                              >
                                Go Back
                              </button>
                            ) : (
                              <DialogTrigger asChild>
                                <button className="flex h-[46px] w-[209px] items-center justify-center rounded-[100px] border border-[#F0F0F0] px-8 py-4 text-sm font-medium text-[#242424] transition-colors hover:bg-gray-50">
                                  Cancel
                                </button>
                              </DialogTrigger>
                            )}
                            <button
                              onClick={() => setCurrentStep(currentStep + 1)}
                              className="flex h-[46px] w-[209px] items-center justify-center rounded-[100px] bg-[#4A90E2] px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-[#3A7BC8]"
                            >
                              Continue
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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

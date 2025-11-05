'use client';

import { Fragment, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ChevronDown,
  Instagram,
  MoreVertical,
  Plus,
  Trash2,
  XIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import PolicyTypeTabs from './policy-type-tabs';

interface Policy {
  id: string;
  name: string;
  status: string;
  facilities: number;
  renewalDate: string;
  iconSrc: string;
}

const mockPolicies: Policy[] = [
  {
    id: '1',
    name: 'Maplewood Senior Living',
    status: 'Accepting Bids',
    facilities: 27,
    renewalDate: 'Sep 15, 2026',
    iconSrc: '/provider/workspace/company-logo.svg',
  },
  {
    id: '2',
    name: 'Riverside Care Center',
    status: 'Action Required',
    facilities: 34,
    renewalDate: 'Oct 22, 2024',
    iconSrc: '/provider/workspace/company-logo.svg',
  },
  {
    id: '3',
    name: 'Willow Creek Retirement Home',
    status: 'Ready to Renew',
    facilities: 42,
    renewalDate: 'Nov 30, 2023',
    iconSrc: '/provider/workspace/company-logo.svg',
  },
  {
    id: '4',
    name: 'Bright Horizons Assisted Living',
    status: 'Completed',
    facilities: 58,
    renewalDate: 'Jan 5, 2027',
    iconSrc: '/provider/workspace/company-logo.svg',
  },
  {
    id: '5',
    name: 'Oak Hill Nursing Home',
    status: 'Accepting Bids',
    facilities: 63,
    renewalDate: 'Feb 18, 2025',
    iconSrc: '/provider/workspace/company-logo.svg',
  },
  {
    id: '6',
    name: 'Harborview Long-Term Care',
    status: 'Action Required',
    facilities: 79,
    renewalDate: 'Mar 27, 2028',
    iconSrc: '/provider/workspace/company-logo.svg',
  },
  {
    id: '7',
    name: 'Silverlake Wellness Center',
    status: 'Ready to Renew',
    facilities: 85,
    renewalDate: 'Apr 11, 2026',
    iconSrc: '/provider/workspace/company-logo.svg',
  },
  {
    id: '8',
    name: 'Silverlake Wellness Center',
    status: 'Completed',
    facilities: 85,
    renewalDate: 'Apr 11, 2026',
    iconSrc: '/provider/workspace/company-logo.svg',
  },
  {
    id: '9',
    name: 'Sunset Valley Care Home',
    status: 'Accepting Bids',
    facilities: 45,
    renewalDate: 'May 15, 2026',
    iconSrc: '/provider/workspace/company-logo.svg',
  },
  {
    id: '10',
    name: 'Mountain View Senior Living',
    status: 'Action Required',
    facilities: 52,
    renewalDate: 'Jun 20, 2024',
    iconSrc: '/provider/workspace/company-logo.svg',
  },
  {
    id: '11',
    name: 'Lakeside Retirement Community',
    status: 'Ready to Renew',
    facilities: 38,
    renewalDate: 'Jul 10, 2023',
    iconSrc: '/provider/workspace/company-logo.svg',
  },
  {
    id: '12',
    name: 'Greenfield Assisted Living',
    status: 'Completed',
    facilities: 67,
    renewalDate: 'Aug 25, 2027',
    iconSrc: '/provider/workspace/company-logo.svg',
  },
];

export default function MyPoliciesTable() {
  const [data] = useState<Policy[]>(mockPolicies);
  const [openDialogRowId, setOpenDialogRowId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [pageSize, setPageSize] = useState<'10 items' | '20' | 'Scroll'>(
    '10 items'
  );
  const [policyType, setPolicyType] = useState<'Claims-made' | 'Occurrence'>(
    'Claims-made'
  );
  const [addNewPolicyFormData, setAddNewPolicyFormData] = useState({
    policyName: '',
    policyLink: '',
    insuredName: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
  });
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lossRunInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{
      id: string;
      name: string;
      size: number;
      uploadedAt: Date;
      fileType: string;
    }>
  >([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = e => {
        setUploadedLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).map(file => {
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'file';
      return {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        uploadedAt: new Date(),
        fileType: fileExtension,
      };
    });

    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFileUpload(event.target.files);
    event.target.value = '';
  };

  const handleFileClick = () => {
    lossRunInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDeleteFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(lossRun => lossRun.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatUploadDate = (date: Date) => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month} ${day}, ${year} ${hours}:${minutes}`;
  };

  const [currentPolicyFormData, setCurrentPolicyFormData] = useState({
    effectiveDate: '',
    expirationDate: '',
    insuranceCompany: '',
    coverageLimit: '',
    retroactiveDate: '',
    deductible: '',
    premium: '',
    coverageIssues: '',
    bankruptcyFilings: '',
  });
  const [facilitySetupFormData, setFacilitySetupFormData] = useState({
    iAgree: '',
    basicInformation: {
      facilityName: '',
      facilityAddress: '',
      website: '',
      cmsProviderID: '',
    },
    bedCapacity: [
      {
        bedType: '',
        licensedBeds: '',
        occupiedBeds: '',
      },
    ],
    ownership: [
      {
        ownerName: '',
        howLongOwned: '',
        otherOwnedFacilities: '',
        facilityID: '',
      },
    ],
    managementCompany: [
      {
        managedByCompany: '',
        managementCompanyName: '',
        howLongManaged: '',
        otherManagedFacilities: '',
        facilityID: '',
      },
    ],
  });

  const totalSteps = 4;

  const columns: ColumnDef<Policy>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <div className="h-5 w-5">
          <Checkbox
            variant="modern"
            className="border-[#d8d8d8] bg-transparent"
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
        <div className="h-5 w-5">
          <Checkbox
            variant="modern"
            className="border-[#d8d8d8] bg-transparent"
            checked={row.getIsSelected()}
            onCheckedChange={value => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
    },
    {
      accessorKey: 'name',
      header: 'Policy',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-sm shadow-black/[0.0125] ${openDialogRowId === row.original.id && dialogOpen ? 'bg-gray' : 'bg-white'}`}
          >
            <Instagram className="h-4 w-4 text-black" />
          </div>
          <span className="leading-medium text-3xl font-medium tracking-normal text-black">
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
              return 'bg-success-400';
            case 'Action Required':
              return 'bg-pink-400';
            case 'Ready to Renew':
              return 'bg-warning-300';
            case 'Completed':
              return 'bg-blue-2';
            default:
              return 'bg-gray';
          }
        };

        return (
          <div
            className={`h-7-5 inline-flex min-w-24 items-center gap-2 rounded-[6.25rem] ${
              openDialogRowId === row.original.id && dialogOpen
                ? 'bg-gray'
                : 'bg-white'
            } px-3`}
          >
            <span
              className={`h-1 w-1 flex-shrink-0 rounded-full ${getStatusColor(status)}`}
            ></span>
            <span className="leading-medium text-xl font-[550] tracking-normal text-black">
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
        <div
          className={`h-7-5 flex max-w-10 items-center justify-center gap-2.5 rounded-[6.25rem] ${
            openDialogRowId === row.original.id && dialogOpen
              ? 'bg-gray'
              : 'bg-white'
          } px-3 py-1.5`}
        >
          <span className="leading-medium text-xl font-medium tracking-normal text-black">
            {row.getValue('facilities')}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'renewalDate',
      header: 'Renewal date',
      cell: ({ row }) => (
        <span className="leading-medium text-3xl font-medium tracking-normal text-black">
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
      <div className="mb-10">
        <h1 className="text-[3.25rem] leading-tight font-medium tracking-tighter text-black capitalize">
          My Policies
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-dark-neutral-400 mt-3.5 text-3xl leading-snug font-medium tracking-normal">
            Keep track of your organization's insurance portfolio.
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant={'muted'}
              className="!px-4-5 h-9-5 text-xl leading-tight font-semibold tracking-normal text-black"
            >
              Filters
            </Button>
            <Button
              variant={'muted'}
              className="!px-4-5 h-9-5 flex items-center justify-center gap-2 text-xl leading-tight font-semibold tracking-normal text-black"
            >
              <span className="text-dark-neutral-300">Sort by:</span>
              <span>Recent</span>
              <ChevronDown className="mb-0.5 h-3 w-3" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={'inverse'}
                  className="!px-4-5 h-9-5 flex items-center justify-center gap-2 text-xl leading-tight font-semibold tracking-normal"
                >
                  <Plus className="mb-0.5 h-3 w-3" />
                  <span>Add Policy</span>
                </Button>
              </DialogTrigger>
              <DialogContent
                showCloseButton={false}
                className="scrollbar-hide max-h-[95vh] w-[61.25rem] overflow-y-auto rounded-3xl border-0 bg-white px-13 pt-13 pb-8 opacity-100 shadow-[0rem_0.25rem_7.5rem_0rem_rgba(0,0,0,0.05)]"
              >
                <div className="space-y-[2.75rem]">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-4">
                        <h2 className="tracking-snug text-8xl leading-tight font-[550] text-black">
                          {currentStep === 1 && 'Add new policy'}
                          {currentStep === 2 && 'Current Policy'}
                          {currentStep === 3 && 'Upload Loss Run'}
                          {currentStep === 4 && 'Facility Setup'}
                          {currentStep === 5 && 'Policy Summary'}
                          {currentStep === 6 && 'Provider Submission Agreement'}
                        </h2>
                        <p className="text-dark-neutral-400 text-3xl leading-snug font-medium tracking-normal">
                          {currentStep === 1 &&
                            'Provide the required details to create a new insurance policy for your facility.'}
                          {currentStep === 2 &&
                            'Extended overview of coverage limits and deductibles.'}
                          {currentStep === 3 &&
                            'Required policy documents and legal compliance records.'}
                          {currentStep === 4 &&
                            'Required policy documents and legal compliance records.'}
                          {currentStep === 5 &&
                            'Please review the policy details and facilities below before finalizing.'}
                          {currentStep === 6 &&
                            'Terms and conditions for submitting facility data through the PinchIQ platform.'}
                        </p>
                      </div>
                      <DialogTrigger asChild>
                        <XIcon className="mt-1.5 h-5 w-5 text-black" />
                      </DialogTrigger>
                    </div>
                    {currentStep <= 4 ? (
                      <div className="mt-7-5 flex gap-2">
                        {Array.from({ length: totalSteps }).map((_, index) => {
                          const stepNumber = index + 1;
                          const isCompleted = stepNumber < currentStep;
                          const isActive = stepNumber === currentStep;

                          return (
                            <div
                              key={stepNumber}
                              className="bg-gray relative h-2 w-[13.313rem] overflow-hidden rounded-full"
                            >
                              <div
                                className={`bg-blue-2 absolute inset-0 h-full rounded-full bg-gradient-to-r transition-all duration-500 ease-out ${
                                  isCompleted
                                    ? 'w-full'
                                    : isActive
                                      ? 'w-[57.62%] delay-500'
                                      : 'w-0'
                                }`}
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    {currentStep === 1 && (
                      <>
                        <div className="flex items-center gap-6">
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleLogoUpload}
                            accept="image/*"
                            className="hidden"
                          />
                          <div className="relative flex h-13 w-13 items-center justify-center rounded-[1.125rem] bg-[#000000]/5">
                            <div
                              onClick={
                                !uploadedLogo ? handleLogoClick : undefined
                              }
                              className={`flex items-center justify-center ${!uploadedLogo ? 'cursor-pointer' : ''}`}
                            >
                              <Image
                                src={
                                  uploadedLogo ||
                                  '/provider/add-policy/videoaudio.svg'
                                }
                                alt="Policy Logo"
                                className="h-4 w-4 object-cover"
                                width={16}
                                height={16}
                              />
                            </div>
                            {uploadedLogo && (
                              <button
                                onClick={handleLogoClick}
                                className="absolute -right-1 -bottom-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-tl-[0.625rem] bg-white transition-all"
                              >
                                <Image
                                  src="/provider/add-policy/pen.svg"
                                  alt="Edit Logo"
                                  className="h-4 w-4"
                                  width={16}
                                  height={16}
                                />
                              </button>
                            )}
                          </div>
                          <div className="flex flex-col space-y-0.5">
                            <input
                              type="text"
                              value={addNewPolicyFormData.policyName}
                              onChange={e =>
                                setAddNewPolicyFormData({
                                  ...addNewPolicyFormData,
                                  policyName: e.target.value,
                                })
                              }
                              placeholder="Enter policy name"
                              className={`${addNewPolicyFormData.policyName ? 'w-full border-transparent' : 'border-brand-blue-300 max-w-[13.25rem]'} placeholder:text-dark-neutral-200 h-8 rounded-[0.25rem] border-[0.094rem] p-1 pr-2 text-6xl leading-tight font-medium tracking-normal text-[#000000] placeholder:text-6xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none`}
                            />
                            <input
                              type="url"
                              value={addNewPolicyFormData.policyLink}
                              onChange={e =>
                                setAddNewPolicyFormData({
                                  ...addNewPolicyFormData,
                                  policyLink: e.target.value,
                                })
                              }
                              placeholder="Add a link to a website"
                              className={`${addNewPolicyFormData.policyLink ? 'w-full border-transparent' : 'border-brand-blue-300 max-w-[13.25rem]'} placeholder:text-dark-neutral-200 text-brand-blue-700 h-6 rounded-[0.25rem] border-[0.094rem] p-1 text-3xl leading-tight font-medium tracking-normal placeholder:text-3xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none`}
                            />
                          </div>
                        </div>

                        <div className="mt-6-5 grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xl leading-tight font-medium tracking-normal text-black">
                              Insured Name
                              <span className="text-dark-blue"> *</span>
                            </label>
                            <input
                              type="text"
                              value={addNewPolicyFormData.insuredName}
                              onChange={e =>
                                setAddNewPolicyFormData({
                                  ...addNewPolicyFormData,
                                  insuredName: e.target.value,
                                })
                              }
                              placeholder="Enter legal name"
                              className="border-light-neutral-300 placeholder:text-dark-neutral-400 h-11-5 mt-1 w-full rounded-xl border bg-white p-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-xl leading-tight font-medium tracking-normal text-black">
                              Contact Name
                              <span className="text-dark-blue"> *</span>
                            </label>
                            <input
                              type="text"
                              value={addNewPolicyFormData.contactName}
                              onChange={e =>
                                setAddNewPolicyFormData({
                                  ...addNewPolicyFormData,
                                  contactName: e.target.value,
                                })
                              }
                              placeholder="Enter full name"
                              className="border-light-neutral-300 placeholder:text-dark-neutral-400 h-11-5 mt-1 w-full rounded-xl border bg-white p-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-xl leading-tight font-medium tracking-normal text-black">
                              Contact Phone
                              <span className="text-dark-blue"> *</span>
                            </label>
                            <input
                              type="text"
                              value={addNewPolicyFormData.contactPhone}
                              onChange={e =>
                                setAddNewPolicyFormData({
                                  ...addNewPolicyFormData,
                                  contactPhone: e.target.value,
                                })
                              }
                              placeholder="+ 1 (___) ___ ___"
                              className="border-light-neutral-300 placeholder:text-dark-neutral-400 h-11-5 mt-1 w-full rounded-xl border bg-white p-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-xl leading-tight font-medium tracking-normal text-black">
                              Contact Email
                              <span className="text-dark-blue"> *</span>
                            </label>
                            <input
                              type="email"
                              value={addNewPolicyFormData.contactEmail}
                              onChange={e =>
                                setAddNewPolicyFormData({
                                  ...addNewPolicyFormData,
                                  contactEmail: e.target.value,
                                })
                              }
                              placeholder="name@example.com"
                              className="border-light-neutral-300 placeholder:text-dark-neutral-400 h-11-5 mt-1 w-full rounded-xl border bg-white p-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {currentStep === 2 && (
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xl leading-tight font-medium tracking-normal text-black">
                            Effective Date
                            <span className="text-dark-blue"> *</span>
                          </label>
                          <input
                            type="text"
                            value={currentPolicyFormData.effectiveDate}
                            onChange={e =>
                              setCurrentPolicyFormData({
                                ...currentPolicyFormData,
                                effectiveDate: e.target.value,
                              })
                            }
                            placeholder="mm/dd/yyyy"
                            className="border-light-neutral-300 placeholder:text-dark-neutral-400 h-11-5 mt-1 w-full rounded-xl border bg-white p-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xl leading-tight font-medium tracking-normal text-black">
                            Expiration Date
                            <span className="text-dark-blue"> *</span>
                          </label>
                          <input
                            type="text"
                            value={currentPolicyFormData.expirationDate}
                            onChange={e =>
                              setCurrentPolicyFormData({
                                ...currentPolicyFormData,
                                expirationDate: e.target.value,
                              })
                            }
                            placeholder="mm/dd/yyyy"
                            className="border-light-neutral-300 placeholder:text-dark-neutral-400 h-11-5 mt-1 w-full rounded-xl border bg-white p-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xl leading-tight font-medium tracking-normal text-black">
                            Insurance Company
                            <span className="text-dark-blue"> *</span>
                          </label>
                          <input
                            type="text"
                            value={currentPolicyFormData.insuranceCompany}
                            onChange={e =>
                              setCurrentPolicyFormData({
                                ...currentPolicyFormData,
                                insuranceCompany: e.target.value,
                              })
                            }
                            placeholder="Enter company name"
                            className="border-light-neutral-300 placeholder:text-dark-neutral-400 h-11-5 mt-1 w-full rounded-xl border bg-white p-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xl leading-tight font-medium tracking-normal text-black">
                            Policy Type
                            <span className="text-dark-blue"> *</span>
                          </label>
                          <PolicyTypeTabs
                            value={policyType}
                            onValueChange={setPolicyType}
                          />
                        </div>

                        <div
                          className={`space-y-2 ${policyType === 'Claims-made' ? '' : 'col-span-2'}`}
                        >
                          <label className="text-xl leading-tight font-medium tracking-normal text-black">
                            Coverage Limit
                            <span className="text-dark-blue"> *</span>
                          </label>
                          <input
                            type="text"
                            value={currentPolicyFormData.coverageLimit}
                            onChange={e =>
                              setCurrentPolicyFormData({
                                ...currentPolicyFormData,
                                coverageLimit: e.target.value,
                              })
                            }
                            placeholder="Enter amount (e.g. $5,000,000)"
                            className="border-light-neutral-300 placeholder:text-dark-neutral-400 h-11-5 mt-1 w-full rounded-xl border bg-white p-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                          />
                        </div>

                        {policyType === 'Claims-made' && (
                          <div className="space-y-2">
                            <label className="text-xl leading-tight font-medium tracking-normal text-black">
                              Retroactive Date
                              <span className="text-dark-blue"> *</span>
                            </label>
                            <input
                              type="text"
                              value={currentPolicyFormData.retroactiveDate}
                              onChange={e =>
                                setCurrentPolicyFormData({
                                  ...currentPolicyFormData,
                                  retroactiveDate: e.target.value,
                                })
                              }
                              placeholder="mm/dd/yyyy"
                              className="border-light-neutral-300 placeholder:text-dark-neutral-400 h-11-5 mt-1 w-full rounded-xl border bg-white p-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                            />
                          </div>
                        )}

                        <div className="space-y-2">
                          <label className="text-xl leading-tight font-medium tracking-normal text-black">
                            Deductible
                            <span className="text-dark-blue"> *</span>
                          </label>
                          <input
                            type="text"
                            value={currentPolicyFormData.deductible}
                            onChange={e =>
                              setCurrentPolicyFormData({
                                ...currentPolicyFormData,
                                deductible: e.target.value,
                              })
                            }
                            placeholder="Enter amount (e.g. $25,000)"
                            className="border-light-neutral-300 placeholder:text-dark-neutral-400 h-11-5 mt-1 w-full rounded-xl border bg-white p-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xl leading-tight font-medium tracking-normal text-black">
                            Premium
                            <span className="text-dark-blue"> *</span>
                          </label>
                          <input
                            type="text"
                            value={currentPolicyFormData.premium}
                            onChange={e =>
                              setCurrentPolicyFormData({
                                ...currentPolicyFormData,
                                premium: e.target.value,
                              })
                            }
                            placeholder="Enter amount (e.g. $25,000)"
                            className="border-light-neutral-300 placeholder:text-dark-neutral-400 h-11-5 mt-1 w-full rounded-xl border bg-white p-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xl leading-tight font-medium tracking-normal text-black">
                            Coverage Issues
                            <span className="text-dark-blue"> *</span>
                          </label>
                          <div className="mt-5 flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                              <Checkbox
                                variant="modern"
                                checked={
                                  currentPolicyFormData.coverageIssues === 'No'
                                }
                                onClick={e =>
                                  setCurrentPolicyFormData({
                                    ...currentPolicyFormData,
                                    coverageIssues: 'No',
                                  })
                                }
                                className="border-light-neutral-300 h-4 w-4 border-1"
                              />
                              <span
                                onClick={e =>
                                  setCurrentPolicyFormData({
                                    ...currentPolicyFormData,
                                    coverageIssues: 'No',
                                  })
                                }
                                className="mt-0.5 cursor-default text-xl leading-tight font-semibold tracking-normal text-black"
                              >
                                No
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Checkbox
                                variant="modern"
                                checked={
                                  currentPolicyFormData.coverageIssues === 'Yes'
                                }
                                onClick={e =>
                                  setCurrentPolicyFormData({
                                    ...currentPolicyFormData,
                                    coverageIssues: 'Yes',
                                  })
                                }
                                className="border-light-neutral-300 h-4 w-4 border-1"
                              />
                              <span
                                onClick={e =>
                                  setCurrentPolicyFormData({
                                    ...currentPolicyFormData,
                                    coverageIssues: 'Yes',
                                  })
                                }
                                className="mt-0.5 cursor-default text-xl leading-tight font-semibold tracking-normal text-black"
                              >
                                Yes
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xl leading-tight font-medium tracking-normal text-black">
                            Bankruptcy Filings
                            <span className="text-dark-blue"> *</span>
                          </label>
                          <div className="mt-5 flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                              <Checkbox
                                variant="modern"
                                checked={
                                  currentPolicyFormData.bankruptcyFilings ===
                                  'No'
                                }
                                onClick={e =>
                                  setCurrentPolicyFormData({
                                    ...currentPolicyFormData,
                                    bankruptcyFilings: 'No',
                                  })
                                }
                                className="border-light-neutral-300 h-4 w-4 border-1"
                              />
                              <span
                                onClick={e =>
                                  setCurrentPolicyFormData({
                                    ...currentPolicyFormData,
                                    bankruptcyFilings: 'No',
                                  })
                                }
                                className="mt-0.5 cursor-default text-xl leading-tight font-semibold tracking-normal text-black"
                              >
                                No
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Checkbox
                                variant="modern"
                                checked={
                                  currentPolicyFormData.bankruptcyFilings ===
                                  'Yes'
                                }
                                onClick={e =>
                                  setCurrentPolicyFormData({
                                    ...currentPolicyFormData,
                                    bankruptcyFilings: 'Yes',
                                  })
                                }
                                className="border-light-neutral-300 h-4 w-4 border-1"
                              />
                              <span
                                onClick={e =>
                                  setCurrentPolicyFormData({
                                    ...currentPolicyFormData,
                                    bankruptcyFilings: 'Yes',
                                  })
                                }
                                className="mt-0.5 cursor-default text-xl leading-tight font-semibold tracking-normal text-black"
                              >
                                Yes
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-8-5 mt-12 flex flex-col items-center justify-center">
                        <input
                          type="file"
                          ref={lossRunInputRef}
                          onChange={handleFileInputChange}
                          accept="*"
                          multiple
                          className="hidden"
                        />
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={handleFileClick}
                          className={`bg-gray flex min-h-52 w-full cursor-pointer flex-col items-center justify-center gap-3.5 rounded-2xl px-8 py-13 transition-all ${
                            isDragging
                              ? 'border-brand-blue-700 border-2 border-dashed bg-blue-50'
                              : ''
                          }`}
                        >
                          <div className="flex h-10 w-10 items-center justify-center">
                            <Image
                              src="/provider/add-policy/doc-file-type.svg"
                              alt="Upload Icon"
                              width={40}
                              height={40}
                            />
                          </div>

                          <div className="text-center">
                            <h3 className="text-3xl leading-snug font-medium tracking-normal text-black">
                              Upload Documents
                            </h3>
                            <p className="text-dark-neutral-500 mt-3.5 text-xl leading-tight font-normal tracking-normal">
                              Drag & drop or
                              <span className="text-brand-blue-700 px-1 hover:underline">
                                click to upload
                              </span>
                              Loss Run (PDF)
                            </p>
                          </div>
                        </div>

                        {uploadedFiles.length > 0 && (
                          <div className="w-full">
                            {uploadedFiles.map(lossRun => (
                              <div
                                key={lossRun.id}
                                className="flex items-center justify-between rounded-2xl bg-white px-6 py-3"
                              >
                                <div className="flex items-center gap-10">
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
                                      {lossRun.fileType}
                                    </h4>
                                  </div>
                                  <span className="leading-medium text-xl font-medium tracking-normal text-black">
                                    {lossRun.name}
                                  </span>
                                </div>

                                <div className="flex items-center gap-12">
                                  <span className="leading-medium bg-gray pb-0-75 h-6 min-w-15 rounded-[6.25rem] px-2 pt-1 text-lg font-semibold tracking-normal text-black">
                                    {formatFileSize(lossRun.size)}
                                  </span>
                                  <span className="leading-medium ml-10 text-xl font-medium tracking-normal text-black">
                                    Uploaded on:{' '}
                                    {formatUploadDate(lossRun.uploadedAt)}
                                  </span>
                                  <button
                                    onClick={() => handleDeleteFile(lossRun.id)}
                                    className="mb-1 ml-12"
                                  >
                                    <Image
                                      src="/provider/add-policy/trash-bin.svg"
                                      alt="Delete PDF"
                                      width={20}
                                      height={20}
                                    />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="text-start">
                          <p className="text-dark-neutral-500 text-xl leading-normal font-normal tracking-normal">
                            Uploaded documents must not include personally
                            identifiable health information (PHI) unless
                            authorized under HIPAA or relevant laws. By
                            uploading, you confirm your right to share these
                            materials for insurance underwriting purposes.
                          </p>
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2 mt-1 text-6xl leading-tight font-medium tracking-normal">
                          Basic Information
                        </div>
                        <div className="space-y-2">
                          <label className="text-xl leading-tight font-medium tracking-normal text-black">
                            Facility Name
                            <span className="text-dark-blue"> *</span>
                          </label>
                          <input
                            type="text"
                            value={
                              facilitySetupFormData.basicInformation
                                .facilityName
                            }
                            onChange={e =>
                              setFacilitySetupFormData({
                                ...facilitySetupFormData,
                                basicInformation: {
                                  ...facilitySetupFormData.basicInformation,
                                  facilityName: e.target.value,
                                },
                              })
                            }
                            placeholder="Enter facility name"
                            className="border-light-neutral-300 placeholder:text-dark-neutral-400 h-11-5 mt-1 w-full rounded-xl border bg-white p-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xl leading-tight font-medium tracking-normal text-black">
                            Facility Address
                            <span className="text-dark-blue"> *</span>
                          </label>
                          <input
                            type="text"
                            value={
                              facilitySetupFormData.basicInformation
                                .facilityAddress
                            }
                            onChange={e =>
                              setFacilitySetupFormData({
                                ...facilitySetupFormData,
                                basicInformation: {
                                  ...facilitySetupFormData.basicInformation,
                                  facilityAddress: e.target.value,
                                },
                              })
                            }
                            placeholder="Street, City, State, ZIP"
                            className="border-light-neutral-300 placeholder:text-dark-neutral-400 h-11-5 mt-1 w-full rounded-xl border bg-white p-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xl leading-tight font-medium tracking-normal text-black">
                            Website
                            <span className="text-dark-blue"> *</span>
                          </label>
                          <input
                            type="text"
                            value={
                              facilitySetupFormData.basicInformation.website
                            }
                            onChange={e =>
                              setFacilitySetupFormData({
                                ...facilitySetupFormData,
                                basicInformation: {
                                  ...facilitySetupFormData.basicInformation,
                                  website: e.target.value,
                                },
                              })
                            }
                            placeholder="www.example.com"
                            className="border-light-neutral-300 placeholder:text-dark-neutral-400 h-11-5 mt-1 w-full rounded-xl border bg-white p-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xl leading-tight font-medium tracking-normal text-black">
                            CMS Provider ID
                            <span className="text-dark-blue"> *</span>
                          </label>
                          <input
                            type="text"
                            value={
                              facilitySetupFormData.basicInformation
                                .cmsProviderID
                            }
                            onChange={e =>
                              setFacilitySetupFormData({
                                ...facilitySetupFormData,
                                basicInformation: {
                                  ...facilitySetupFormData.basicInformation,
                                  cmsProviderID: e.target.value,
                                },
                              })
                            }
                            placeholder="Enter CMS ID"
                            className="border-light-neutral-300 placeholder:text-dark-neutral-400 h-11-5 mt-1 w-full rounded-xl border bg-white p-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                          />
                        </div>

                        <div className="col-span-2 mt-2.5 text-6xl leading-tight font-medium tracking-normal">
                          Bed Capacity
                        </div>

                        {facilitySetupFormData.bedCapacity.map(
                          (bedCapacityRow, index) => {
                            return (
                              <Fragment key={index}>
                                <div className="space-y-2">
                                  <label className="text-xl leading-tight font-medium tracking-normal text-black">
                                    Bed Type
                                    <span className="text-dark-blue"> *</span>
                                  </label>
                                  <div className="mt-1">
                                    <Select
                                      value={bedCapacityRow.bedType}
                                      onValueChange={value => {
                                        const updatedBedCapacity = [
                                          ...facilitySetupFormData.bedCapacity,
                                        ];
                                        updatedBedCapacity[index].bedType =
                                          value;
                                        setFacilitySetupFormData({
                                          ...facilitySetupFormData,
                                          bedCapacity: updatedBedCapacity,
                                        });
                                      }}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select bed type" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="private">
                                          Private
                                        </SelectItem>
                                        <SelectItem value="semi-private">
                                          Semi-Private
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>

                                <div
                                  className={`flex items-end ${facilitySetupFormData.bedCapacity.length > 1 ? 'gap-2' : 'gap-6'}`}
                                >
                                  <div className="space-y-2">
                                    <label className="text-xl leading-tight font-medium tracking-normal text-black">
                                      Licensed
                                      <span className="text-dark-blue"> *</span>
                                    </label>
                                    <input
                                      type="text"
                                      value={bedCapacityRow.licensedBeds}
                                      onChange={e => {
                                        const updatedBedCapacity = [
                                          ...facilitySetupFormData.bedCapacity,
                                        ];
                                        updatedBedCapacity[index].licensedBeds =
                                          e.target.value;
                                        setFacilitySetupFormData({
                                          ...facilitySetupFormData,
                                          bedCapacity: updatedBedCapacity,
                                        });
                                      }}
                                      placeholder="Enter licensed beds"
                                      className="border-light-neutral-300 placeholder:text-dark-neutral-400 h-11-5 mt-1 w-full rounded-xl border bg-white p-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-xl leading-tight font-medium tracking-normal text-black">
                                      Occupied
                                      <span className="text-dark-blue"> *</span>
                                    </label>
                                    <input
                                      type="text"
                                      value={bedCapacityRow.occupiedBeds}
                                      onChange={e => {
                                        const updatedBedCapacity = [
                                          ...facilitySetupFormData.bedCapacity,
                                        ];
                                        updatedBedCapacity[index].occupiedBeds =
                                          e.target.value;
                                        setFacilitySetupFormData({
                                          ...facilitySetupFormData,
                                          bedCapacity: updatedBedCapacity,
                                        });
                                      }}
                                      placeholder="Enter occupied beds"
                                      className="border-light-neutral-300 placeholder:text-dark-neutral-400 h-11-5 mt-1 w-full rounded-xl border bg-white p-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                                    />
                                  </div>
                                  {facilitySetupFormData.bedCapacity.length >
                                  1 ? (
                                    <div className="relative mb-3">
                                      <button className="text-dark-neutral-200 flex -space-x-3">
                                        <MoreVertical className="h-5 w-5" />
                                        <MoreVertical className="h-5 w-5" />
                                      </button>
                                    </div>
                                  ) : null}
                                </div>
                              </Fragment>
                            );
                          }
                        )}

                        <div className="relative col-span-2 mt-5 mb-3">
                          <div className="border-t-light-neutral-300 absolute inset-0 border-t"></div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Button
                              variant="muted"
                              onClick={() => {
                                setFacilitySetupFormData(prev => ({
                                  ...prev,
                                  bedCapacity: [
                                    ...prev.bedCapacity,
                                    {
                                      bedType: '',
                                      licensedBeds: '',
                                      occupiedBeds: '',
                                    },
                                  ],
                                }));
                              }}
                              className="max-h-7-5 bg-gray text-dark-blue min-w-56 rounded-lg text-xl leading-tight font-semibold tracking-normal"
                            >
                              <Plus className="mb-0.5 h-3 w-3" />
                              <span>Add another bed type</span>
                            </Button>
                          </div>
                        </div>

                        <div className="col-span-2 mt-2.5 text-6xl leading-tight font-medium tracking-normal">
                          Ownership
                        </div>

                        {facilitySetupFormData.ownership.map(
                          (ownerhipRow, index) => {
                            return (
                              <Fragment key={index}>
                                <div className="space-y-2">
                                  <label className="text-xl leading-tight font-medium tracking-normal text-black">
                                    Owner of Facility
                                    <span className="text-dark-blue"> *</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={ownerhipRow.ownerName}
                                    onChange={e => {
                                      const newOwnership = [
                                        ...facilitySetupFormData.ownership,
                                      ];
                                      newOwnership[index].ownerName =
                                        e.target.value;
                                      setFacilitySetupFormData(prev => ({
                                        ...prev,
                                        ownership: newOwnership,
                                      }));
                                    }}
                                    placeholder="Enter owner name"
                                    className="border-light-neutral-300 placeholder:text-dark-neutral-400 h-11-5 mt-1 w-full rounded-xl border bg-white p-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <label className="text-xl leading-tight font-medium tracking-normal text-black">
                                    How Long Owned
                                    <span className="text-dark-blue"> *</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={ownerhipRow.howLongOwned}
                                    onChange={e => {
                                      const newOwnership = [
                                        ...facilitySetupFormData.ownership,
                                      ];
                                      newOwnership[index].howLongOwned =
                                        e.target.value;
                                      setFacilitySetupFormData(prev => ({
                                        ...prev,
                                        ownership: newOwnership,
                                      }));
                                    }}
                                    placeholder="e.g. 5 years, 3 months"
                                    className="border-light-neutral-300 placeholder:text-dark-neutral-400 h-11-5 mt-1 w-full rounded-xl border bg-white p-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <label className="text-xl leading-tight font-medium tracking-normal text-black">
                                    Other Owned Facilities
                                    <span className="text-dark-blue"> *</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={ownerhipRow.otherOwnedFacilities}
                                    onChange={e => {
                                      const newOwnership = [
                                        ...facilitySetupFormData.ownership,
                                      ];
                                      newOwnership[index].otherOwnedFacilities =
                                        e.target.value;
                                      setFacilitySetupFormData(prev => ({
                                        ...prev,
                                        ownership: newOwnership,
                                      }));
                                    }}
                                    placeholder="Enter facility name"
                                    className="border-light-neutral-300 placeholder:text-dark-neutral-400 h-11-5 mt-1 w-full rounded-xl border bg-white p-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <label className="text-xl leading-tight font-medium tracking-normal text-black">
                                    Facility ID
                                    <span className="text-dark-blue"> *</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={ownerhipRow.facilityID}
                                    onChange={e => {
                                      const newOwnership = [
                                        ...facilitySetupFormData.ownership,
                                      ];
                                      newOwnership[index].facilityID =
                                        e.target.value;
                                      setFacilitySetupFormData(prev => ({
                                        ...prev,
                                        ownership: newOwnership,
                                      }));
                                    }}
                                    placeholder="Enter facility ID"
                                    className="border-light-neutral-300 placeholder:text-dark-neutral-400 h-11-5 mt-1 w-full rounded-xl border bg-white p-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                                  />
                                </div>
                              </Fragment>
                            );
                          }
                        )}

                        <div className="relative col-span-2 mt-5 mb-3">
                          <div className="border-t-light-neutral-300 absolute inset-0 border-t"></div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Button
                              variant="muted"
                              onClick={() => {
                                setFacilitySetupFormData(prev => ({
                                  ...prev,
                                  ownership: [
                                    ...prev.ownership,
                                    {
                                      ownerName: '',
                                      howLongOwned: '',
                                      otherOwnedFacilities: '',
                                      facilityID: '',
                                    },
                                  ],
                                }));
                              }}
                              className="max-h-7-5 bg-gray text-dark-blue min-w-56 rounded-lg text-xl leading-tight font-semibold tracking-normal"
                            >
                              <Plus className="mb-0.5 h-3 w-3" />
                              <span>Add another owner</span>
                            </Button>
                          </div>
                        </div>

                        <div className="col-span-2 mt-2.5 text-6xl leading-tight font-medium tracking-normal">
                          Management Company
                        </div>

                        {facilitySetupFormData.managementCompany.map(
                          (managementCompanyRow, index) => {
                            return (
                              <Fragment key={index}>
                                <div className="col-span-2 mb-2 space-y-2">
                                  <label className="text-xl leading-tight font-medium tracking-normal text-black">
                                    Managed by Company?
                                    <span className="text-dark-blue"> *</span>
                                  </label>
                                  <div className="mt-5 flex gap-13">
                                    <div className="flex items-center gap-3.5">
                                      <Checkbox
                                        variant="modern"
                                        checked={
                                          managementCompanyRow.managedByCompany ===
                                          'Yes'
                                        }
                                        onClick={() => {
                                          const updatedManagementCompany = [
                                            ...facilitySetupFormData.managementCompany,
                                          ];
                                          updatedManagementCompany[
                                            index
                                          ].managedByCompany = 'Yes';
                                          setFacilitySetupFormData(prev => ({
                                            ...prev,
                                            managementCompany:
                                              updatedManagementCompany,
                                          }));
                                        }}
                                        className="border-light-neutral-300 h-4 w-4 border-1"
                                      />
                                      <span
                                        className="mt-0.5 cursor-default text-xl leading-tight font-semibold tracking-normal text-black"
                                        onClick={() => {
                                          const updatedManagementCompany = [
                                            ...facilitySetupFormData.managementCompany,
                                          ];
                                          updatedManagementCompany[
                                            index
                                          ].managedByCompany = 'Yes';
                                          setFacilitySetupFormData(prev => ({
                                            ...prev,
                                            managementCompany:
                                              updatedManagementCompany,
                                          }));
                                        }}
                                      >
                                        Yes
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-3.5">
                                      <Checkbox
                                        variant="modern"
                                        checked={
                                          managementCompanyRow.managedByCompany ===
                                          'No'
                                        }
                                        onClick={() => {
                                          const updatedManagementCompany = [
                                            ...facilitySetupFormData.managementCompany,
                                          ];
                                          updatedManagementCompany[
                                            index
                                          ].managedByCompany = 'No';
                                          setFacilitySetupFormData(prev => ({
                                            ...prev,
                                            managementCompany:
                                              updatedManagementCompany,
                                          }));
                                        }}
                                        className="border-light-neutral-300 h-4 w-4 border-1"
                                      />
                                      <span
                                        onClick={() => {
                                          const updatedManagementCompany = [
                                            ...facilitySetupFormData.managementCompany,
                                          ];
                                          updatedManagementCompany[
                                            index
                                          ].managedByCompany = 'No';
                                          setFacilitySetupFormData(prev => ({
                                            ...prev,
                                            managementCompany:
                                              updatedManagementCompany,
                                          }));
                                        }}
                                        className="mt-0.5 cursor-default text-xl leading-tight font-semibold tracking-normal text-black"
                                      >
                                        No
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <label className="text-xl leading-tight font-medium tracking-normal text-black">
                                    Management Company Name
                                    <span className="text-dark-blue"> *</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={
                                      managementCompanyRow.managementCompanyName
                                    }
                                    onChange={e => {
                                      const updatedManagementCompany = [
                                        ...facilitySetupFormData.managementCompany,
                                      ];
                                      updatedManagementCompany[
                                        index
                                      ].managementCompanyName = e.target.value;
                                      setFacilitySetupFormData(prev => ({
                                        ...prev,
                                        managementCompany:
                                          updatedManagementCompany,
                                      }));
                                    }}
                                    placeholder="Enter company name"
                                    className="border-light-neutral-300 placeholder:text-dark-neutral-400 h-11-5 mt-1 w-full rounded-xl border bg-white p-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <label className="text-xl leading-tight font-medium tracking-normal text-black">
                                    How Long Managed
                                    <span className="text-dark-blue"> *</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={managementCompanyRow.howLongManaged}
                                    onChange={e => {
                                      const updatedManagementCompany = [
                                        ...facilitySetupFormData.managementCompany,
                                      ];
                                      updatedManagementCompany[
                                        index
                                      ].howLongManaged = e.target.value;
                                      setFacilitySetupFormData(prev => ({
                                        ...prev,
                                        managementCompany:
                                          updatedManagementCompany,
                                      }));
                                    }}
                                    placeholder="e.g. 7 years, 2 months"
                                    className="border-light-neutral-300 placeholder:text-dark-neutral-400 h-11-5 mt-1 w-full rounded-xl border bg-white p-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <label className="text-xl leading-tight font-medium tracking-normal text-black">
                                    Other Managed Facilities
                                    <span className="text-dark-blue"> *</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={
                                      managementCompanyRow.otherManagedFacilities
                                    }
                                    onChange={e => {
                                      const updatedManagementCompany = [
                                        ...facilitySetupFormData.managementCompany,
                                      ];
                                      updatedManagementCompany[
                                        index
                                      ].otherManagedFacilities = e.target.value;
                                      setFacilitySetupFormData(prev => ({
                                        ...prev,
                                        managementCompany:
                                          updatedManagementCompany,
                                      }));
                                    }}
                                    placeholder="Enter facility name"
                                    className="border-light-neutral-300 placeholder:text-dark-neutral-400 h-11-5 mt-1 w-full rounded-xl border bg-white p-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <label className="text-xl leading-tight font-medium tracking-normal text-black">
                                    Facility ID
                                    <span className="text-dark-blue"> *</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={managementCompanyRow.facilityID}
                                    onChange={e => {
                                      const updatedManagementCompany = [
                                        ...facilitySetupFormData.managementCompany,
                                      ];
                                      updatedManagementCompany[
                                        index
                                      ].facilityID = e.target.value;
                                      setFacilitySetupFormData(prev => ({
                                        ...prev,
                                        managementCompany:
                                          updatedManagementCompany,
                                      }));
                                    }}
                                    placeholder="Enter facility ID"
                                    className="border-light-neutral-300 placeholder:text-dark-neutral-400 h-11-5 mt-1 w-full rounded-xl border bg-white p-4 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                                  />
                                </div>
                              </Fragment>
                            );
                          }
                        )}

                        <div className="relative col-span-2 mt-5 mb-3">
                          <div className="border-t-light-neutral-300 absolute inset-0 border-t"></div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Button
                              variant="muted"
                              onClick={() => {
                                setFacilitySetupFormData(prev => ({
                                  ...prev,
                                  managementCompany: [
                                    ...prev.managementCompany,
                                    {
                                      managedByCompany: '',
                                      managementCompanyName: '',
                                      howLongManaged: '',
                                      otherManagedFacilities: '',
                                      facilityID: '',
                                    },
                                  ],
                                }));
                              }}
                              className="max-h-7-5 bg-gray text-dark-blue min-w-56 rounded-lg text-xl leading-tight font-semibold tracking-normal"
                            >
                              <Plus className="mb-0.5 h-3 w-3" />
                              <span>Add another management company</span>
                            </Button>
                          </div>
                        </div>

                        <div className="col-span-2 mt-2.5 flex items-start gap-3.5">
                          <Checkbox
                            variant="modern"
                            checked={facilitySetupFormData.iAgree === 'Yes'}
                            onClick={() =>
                              setFacilitySetupFormData(prev => ({
                                ...prev,
                                iAgree: prev.iAgree === 'Yes' ? 'No' : 'Yes',
                              }))
                            }
                            className="border-light-neutral-300 mt-0.5 h-4 w-4 border-1"
                          />
                          <span className="text-dark-neutral-500 mt-0.5 text-xl leading-snug font-medium tracking-normal">
                            By submitting this facility data, I acknowledge that
                            I am authorized to do so and accept the{' '}
                            <span className="text-dark-blue hover:underline">
                              Provider Submission Agreement,
                            </span>
                            <span>
                              {' '}
                              including rules on data use, confidentiality, and
                              compliance.
                            </span>
                          </span>
                        </div>
                      </div>
                    )}

                    {currentStep === 5 && (
                      <div className="mt-3 grid grid-cols-1 gap-8">
                        <div className="gap-4-5 flex items-center">
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleLogoUpload}
                            accept="image/*"
                            className="hidden"
                          />
                          <div className="relative flex h-13 w-13 items-center justify-center rounded-[1.125rem] bg-[#000000]/5">
                            <div className={`flex items-center justify-center`}>
                              <Image
                                src={
                                  uploadedLogo ||
                                  '/provider/add-policy/videoaudio.svg'
                                }
                                alt="Policy Logo"
                                className="h-4 w-4 object-cover"
                                width={16}
                                height={16}
                              />
                            </div>
                            {/* {uploadedLogo && (
                              <button className="absolute -right-1 -bottom-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-tl-[0.625rem] bg-white transition-all">
                                <Image
                                  src="/provider/add-policy/pen.svg"
                                  alt="Edit Logo"
                                  className="h-4 w-4"
                                  width={16}
                                  height={16}
                                />
                              </button>
                            )} */}
                          </div>
                          <div className="flex flex-col space-y-0.5">
                            <input
                              type="text"
                              value={addNewPolicyFormData.policyName}
                              onChange={e =>
                                setAddNewPolicyFormData({
                                  ...addNewPolicyFormData,
                                  policyName: e.target.value,
                                })
                              }
                              disabled={true}
                              placeholder="Enter policy name"
                              className={`${addNewPolicyFormData.policyName ? 'border-transparent' : 'border-brand-blue-300'} placeholder:text-dark-neutral-200 h-8 max-w-[13.25rem] rounded-[0.25rem] border-[0.094rem] p-1 pr-2 text-6xl leading-tight font-medium tracking-normal text-[#000000] placeholder:text-6xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none`}
                            />
                            <input
                              type="url"
                              value={addNewPolicyFormData.policyLink}
                              onChange={e =>
                                setAddNewPolicyFormData({
                                  ...addNewPolicyFormData,
                                  policyLink: e.target.value,
                                })
                              }
                              disabled={true}
                              placeholder="Add a link to a website"
                              className={`${addNewPolicyFormData.policyLink ? 'border-transparent' : 'border-brand-blue-300'} placeholder:text-dark-neutral-200 text-brand-blue-700 h-6 max-w-[10.688rem] rounded-[0.25rem] border-[0.094rem] p-1 text-3xl leading-tight font-medium tracking-normal placeholder:text-3xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none`}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-13">
                          <div className="grid grid-cols-2 gap-1">
                            <div className="grid grid-cols-[150fr_268fr] gap-x-4 gap-y-5">
                              <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal text-nowrap">
                                Insured Name
                              </div>
                              <div className="text-xl leading-tight font-medium tracking-normal text-black">
                                Springfield Care Group
                              </div>
                              <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                                Contact name
                              </div>
                              <div className="text-xl leading-tight font-medium tracking-normal text-black">
                                Sarah Miller
                              </div>
                              <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                                Contact phone
                              </div>
                              <div className="text-xl leading-tight font-medium tracking-normal text-black">
                                +1 (555) 341-9922
                              </div>
                              <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                                Contact email
                              </div>
                              <div className="text-xl leading-tight font-medium tracking-normal text-black">
                                sarah@riversidecare.com
                              </div>
                              <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                                Insurance Company
                              </div>
                              <div className="text-xl leading-tight font-medium tracking-normal text-black">
                                ABC Insurance Co.
                              </div>
                              <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                                Policy Type
                              </div>
                              <div className="text-xl leading-tight font-medium tracking-normal text-black">
                                GL/PL
                              </div>
                            </div>
                            <div className="grid grid-cols-[150fr_268fr] gap-x-4 gap-y-5">
                              <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                                Coverage Limit
                              </div>
                              <div className="text-xl leading-tight font-medium tracking-normal text-black">
                                $5 000 000
                              </div>
                              <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                                Retroactive Date
                              </div>
                              <div className="text-xl leading-tight font-medium tracking-normal text-black">
                                Aug 20, 2024
                              </div>
                              <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                                Deductible
                              </div>
                              <div className="text-xl leading-tight font-medium tracking-normal text-black">
                                $50,000
                              </div>
                              <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                                Premium
                              </div>
                              <div className="text-xl leading-tight font-medium tracking-normal text-black">
                                $185,000
                              </div>
                              <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                                Coverage Issues
                              </div>
                              <div className="text-xl leading-tight font-medium tracking-normal text-black">
                                None reported
                              </div>
                              <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                                Bankruptcy Filings
                              </div>
                              <div className="text-xl leading-tight font-medium tracking-normal text-black">
                                None reported
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 gap-4">
                            <h3 className="text-5xl leading-tight font-medium tracking-normal text-[#000000]">
                              Policy documents
                            </h3>
                            {uploadedFiles.length > 0 && (
                              <div className="w-full">
                                {uploadedFiles.map(lossRun => (
                                  <div
                                    key={lossRun.id}
                                    className="grid grid-cols-2 place-items-stretch rounded-2xl bg-white px-5 py-3"
                                  >
                                    <div className="flex items-center gap-10">
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
                                          {lossRun.fileType}
                                        </h4>
                                      </div>
                                      <span className="leading-medium text-xl font-medium tracking-normal text-black">
                                        {lossRun.name}
                                      </span>
                                    </div>

                                    <div className="grid grid-cols-[150fr_268fr] gap-x-4">
                                      <span className="leading-medium bg-gray pb-0-75 h-6 w-fit rounded-[6.25rem] px-2 pt-1 text-lg font-semibold tracking-normal text-black">
                                        {formatFileSize(lossRun.size)}
                                      </span>
                                      <span className="leading-medium ml-10 text-xl font-medium tracking-normal text-black">
                                        Uploaded on:{' '}
                                        {formatUploadDate(lossRun.uploadedAt)}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="grid grid-cols-1 gap-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-5xl leading-tight font-medium tracking-normal text-[#000000]">
                                Facilities List
                              </h3>
                              <Button
                                variant={'muted'}
                                className="text-brand-blue-700 max-h-7 min-w-28 gap-2 px-3 py-2 text-lg leading-tight font-semibold tracking-normal"
                              >
                                <Plus className="!h-3 !w-3" />
                                <span>Add Facility</span>
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {Array.from([1, 2, 3, 4]).map(facility => {
                                return (
                                  <div
                                    key={facility}
                                    className="bg-gray grid grid-cols-1 gap-6 rounded-[1.75rem] px-2 pt-8 pb-2"
                                  >
                                    <div className="ml-13 px-4">
                                      <div className="text-3xl leading-tight font-medium tracking-normal text-black">
                                        Riverside Nursing Pavilion
                                      </div>
                                      <div className="text-dark-neutral-500 mt-3 text-lg leading-tight font-normal tracking-normal">
                                        12 Riverside Ave, Boston, MA
                                      </div>
                                    </div>
                                    <div className="px-4">
                                      <div className="border-b-light-neutral-400 text-dark-blue border-b pb-3 text-xl leading-tight font-medium tracking-normal">
                                        nursing.pavilion.com
                                      </div>
                                      <div className="mt-4 grid grid-cols-2 gap-2">
                                        <div>
                                          <div className="text-dark-neutral-500 text-lg leading-tight font-medium tracking-normal">
                                            CMS Provider ID
                                          </div>
                                          <div className="mt-2.5 text-3xl leading-tight font-medium tracking-normal text-black">
                                            #154328
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-dark-neutral-500 text-lg leading-tight font-medium tracking-normal">
                                            Licensed Beds
                                          </div>
                                          <div className="mt-2.5 text-3xl leading-tight font-medium tracking-normal text-black">
                                            SNF 80, ALF 40
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 place-content-center gap-2">
                                      <Button
                                        variant={'secondary'}
                                        className="border-light-neutral-400 border-[0.047rem] bg-transparent px-5 py-3 text-lg leading-4 font-semibold tracking-normal text-black"
                                      >
                                        Remove
                                      </Button>
                                      <Button
                                        variant={'secondary'}
                                        className="text-dark-blue border-[0.047rem] border-white px-5 py-3 text-lg leading-4 font-semibold tracking-normal"
                                      >
                                        Edit
                                      </Button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 6 && (
                      <div className="-mt-2.5 grid grid-cols-1 gap-8">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-3 px-2.5">
                            <div className="h-1 w-1 rounded-full bg-black"></div>
                            <h3 className="text-3xl leading-snug font-semibold tracking-normal text-black">
                              Authority Warranties
                            </h3>
                          </div>
                          <p className="text-dark-neutral-400 text-2xl leading-snug font-medium tracking-normal">
                            The Provider represents and warrants that they are
                            duly authorized to submit facility data on behalf of
                            the facility and have the necessary rights and
                            approvals to provide such information to PinchIQ.
                          </p>
                        </div>
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-3 px-2.5">
                            <div className="h-1 w-1 rounded-full bg-black"></div>
                            <h3 className="text-3xl leading-snug font-semibold tracking-normal text-black">
                              Prohibition of PHI
                            </h3>
                          </div>
                          <p className="text-dark-neutral-400 text-2xl leading-snug font-medium tracking-normal">
                            The Provider agrees not to upload, share, or
                            transmit any documents or information containing
                            Protected Health Information (PHI) unless expressly
                            authorized under HIPAA and other applicable privacy
                            laws.
                          </p>
                        </div>
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-3 px-2.5">
                            <div className="h-1 w-1 rounded-full bg-black"></div>
                            <h3 className="text-3xl leading-snug font-semibold tracking-normal text-black">
                              License to Use Data
                            </h3>
                          </div>
                          <p className="text-dark-neutral-400 text-2xl leading-snug font-medium tracking-normal">
                            The Provider grants PinchIQ a limited, non-exclusive
                            license to transmit, display, and share the
                            submitted facility data with brokers solely for the
                            purpose of evaluating and providing insurance bids.
                          </p>
                        </div>
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-3 px-2.5">
                            <div className="h-1 w-1 rounded-full bg-black"></div>
                            <h3 className="text-3xl leading-snug font-semibold tracking-normal text-black">
                              Disclosure & Confidentiality
                            </h3>
                          </div>
                          <p className="text-dark-neutral-400 text-2xl leading-snug font-medium tracking-normal">
                            The Provider acknowledges that broker access to
                            facility data is limited to evaluation and quoting
                            activities. PinchIQ disclaims responsibility for any
                            misuse or unauthorized disclosure by brokers.
                          </p>
                        </div>
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-3 px-2.5">
                            <div className="h-1 w-1 rounded-full bg-black"></div>
                            <h3 className="text-3xl leading-snug font-semibold tracking-normal text-black">
                              Indemnification
                            </h3>
                          </div>
                          <p className="text-dark-neutral-400 text-2xl leading-snug font-medium tracking-normal">
                            The Provider agrees to indemnify and hold harmless
                            PinchIQ, its officers, employees, and affiliates
                            from any claims, damages, or liabilities arising
                            from the submission of false information,
                            unauthorized uploads, or violation of applicable
                            laws.
                          </p>
                        </div>
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-3 px-2.5">
                            <div className="h-1 w-1 rounded-full bg-black"></div>
                            <h3 className="text-3xl leading-snug font-semibold tracking-normal text-black">
                              Facility Data Usage License
                            </h3>
                          </div>
                          <p className="text-dark-neutral-400 text-2xl leading-snug font-medium tracking-normal">
                            The Provider grants PinchIQ a non-exclusive,
                            royalty-free license to store, process, and analyze
                            submitted facility information, including policy
                            data, operational characteristics, and structured
                            insights derived from uploaded documents (such as
                            loss runs). PinchIQ may use such information in
                            de-identified and aggregated form to enhance the
                            platform, develop industry benchmarks, or create
                            analytics products. PinchIQ may license or
                            distribute such de-identified and aggregated
                            insights to third parties, provided that no data is
                            shared in a manner that identifies any specific
                            facility, operator, or uploaded document.
                          </p>
                        </div>
                      </div>
                    )}

                    {currentStep <= 5 ? (
                      <div className="flex items-center justify-between pt-8">
                        <DialogTrigger asChild>
                          <Button
                            variant={'secondary'}
                            className="h-11-5 border-light-neutral-300 min-w-52 border px-8 py-4 text-xl font-semibold"
                          >
                            Save as Draft
                          </Button>
                        </DialogTrigger>
                        <div className="flex gap-3">
                          {currentStep === 4 ? (
                            <>
                              {!!facilitySetupFormData.basicInformation.facilityName.trim() &&
                              !!facilitySetupFormData.basicInformation.facilityAddress.trim() &&
                              !!facilitySetupFormData.basicInformation.website.trim() &&
                              !!facilitySetupFormData.basicInformation.cmsProviderID.trim() &&
                              facilitySetupFormData.bedCapacity.every(
                                bed =>
                                  !!bed.bedType.trim() &&
                                  !!bed.licensedBeds.trim() &&
                                  !!bed.occupiedBeds.trim()
                              ) &&
                              facilitySetupFormData.managementCompany.every(
                                company =>
                                  !!company.facilityID.trim() &&
                                  !!company.howLongManaged.trim() &&
                                  !!company.otherManagedFacilities.trim() &&
                                  !!company.managementCompanyName.trim() &&
                                  (company.managedByCompany.trim() === 'Yes' ||
                                    company.managedByCompany.trim() === 'No')
                              ) &&
                              facilitySetupFormData.iAgree.trim() === 'Yes' ? (
                                <>
                                  <Button
                                    variant={'secondary'}
                                    className="h-11-5 border-light-neutral-300 min-w-52 gap-2 border px-8 py-4 text-xl font-semibold"
                                  >
                                    <Plus className="mb-0-75 !h-3.5 !w-3.5" />
                                    <span>Add More Facility</span>
                                  </Button>
                                  <Button
                                    variant={'inverse'}
                                    onClick={() =>
                                      setCurrentStep(currentStep + 1)
                                    }
                                    className={`h-11-5 border-gray min-w-52 border px-8 py-4 text-xl font-semibold text-white`}
                                  >
                                    Complete
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button
                                    variant={'secondary'}
                                    onClick={() => {
                                      setCurrentStep(currentStep - 1);
                                    }}
                                    className="h-11-5 border-light-neutral-300 min-w-52 border px-8 py-4 text-xl font-semibold"
                                  >
                                    Go Back
                                  </Button>
                                  <Button
                                    variant={'muted'}
                                    onClick={() =>
                                      setCurrentStep(currentStep + 1)
                                    }
                                    className="h-11-5 border-gray text-dark-blue flex min-w-52 items-center justify-center gap-1 border px-8 py-4 text-xl font-semibold"
                                  >
                                    <span>Save Policy</span>
                                    <ChevronDown className="h-3.5 w-3.5" />
                                  </Button>
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {(currentStep === 1 &&
                                !!addNewPolicyFormData.policyName.trim() &&
                                !!addNewPolicyFormData.contactName.trim() &&
                                !!addNewPolicyFormData.contactPhone.trim() &&
                                !!addNewPolicyFormData.contactEmail.trim() &&
                                !!addNewPolicyFormData.policyName.trim() &&
                                !!addNewPolicyFormData.policyLink.trim()) ||
                              (currentStep === 2 &&
                                !!currentPolicyFormData.effectiveDate.trim() &&
                                !!currentPolicyFormData.expirationDate.trim() &&
                                !!currentPolicyFormData.insuranceCompany.trim() &&
                                !!currentPolicyFormData.coverageLimit.trim() &&
                                ((policyType === 'Claims-made' &&
                                  !!currentPolicyFormData.retroactiveDate.trim()) ||
                                  policyType === 'Occurrence') &&
                                !!currentPolicyFormData.deductible.trim() &&
                                !!currentPolicyFormData.premium.trim() &&
                                (currentPolicyFormData.coverageIssues.trim() ===
                                  'Yes' ||
                                  currentPolicyFormData.coverageIssues.trim() ===
                                    'No') &&
                                (currentPolicyFormData.bankruptcyFilings.trim() ===
                                  'Yes' ||
                                  currentPolicyFormData.bankruptcyFilings.trim() ===
                                    'No')) ||
                              (currentStep === 3 && uploadedFiles.length > 0) ||
                              currentStep === 5 ? (
                                <>
                                  <Button
                                    variant={'secondary'}
                                    onClick={() => {
                                      if (currentStep === 1) return;
                                      setCurrentStep(currentStep - 1);
                                    }}
                                    className="h-11-5 border-light-neutral-300 min-w-52 border px-8 py-4 text-xl font-semibold"
                                  >
                                    Go Back
                                  </Button>
                                  {currentStep === 5 ? (
                                    <Button
                                      variant={'inverse'}
                                      onClick={() =>
                                        setCurrentStep(currentStep + 1)
                                      }
                                      className={`h-11-5 border-gray min-w-52 border px-8 py-4 text-xl font-semibold text-white`}
                                    >
                                      Save & Complete
                                    </Button>
                                  ) : (
                                    <Button
                                      variant={'inverse'}
                                      onClick={() =>
                                        setCurrentStep(currentStep + 1)
                                      }
                                      className={`h-11-5 border-gray min-w-52 border px-8 py-4 text-xl font-semibold text-white`}
                                    >
                                      Continue
                                    </Button>
                                  )}
                                </>
                              ) : (
                                <>
                                  <Button
                                    variant={'secondary'}
                                    onClick={() => {
                                      if (currentStep === 1) return;
                                      setCurrentStep(currentStep - 1);
                                    }}
                                    className="h-11-5 border-light-neutral-300 min-w-52 border px-8 py-4 text-xl font-semibold"
                                  >
                                    Go Back
                                  </Button>
                                  <Button
                                    variant={'muted'}
                                    onClick={() =>
                                      setCurrentStep(currentStep + 1)
                                    }
                                    className={`h-11-5 border-gray text-dark-blue min-w-52 border px-8 py-4 text-xl font-semibold`}
                                  >
                                    Continue
                                  </Button>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="bg-gray relative overflow-hidden rounded-4xl px-1.5 py-3">
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
                              className={`left-8-5 absolute z-50 ${isThisRowOpen && rowIndex + 1 <= table.getRowModel().rows.length - 1 ? 'top-full mt-2' : 'bottom-full mb-2'}`}
                            >
                              <div className="h-[7.625rem] w-[19.875rem] rounded-4xl border-0 bg-white p-4 shadow-[0rem_0.25rem_3.75rem_0rem_#0000000D]">
                                <div className="flex items-center justify-end gap-7">
                                  <button className="flex flex-col items-center justify-center gap-4 transition-all">
                                    <Image
                                      src="/provider/workspace/notes.svg"
                                      alt="Loss Run Icon"
                                      width={24}
                                      height={24}
                                      className="h-6 w-6"
                                    />
                                    <span className="text-lg leading-tight font-semibold tracking-normal text-black">
                                      Loss Run
                                    </span>
                                  </button>

                                  <button className="flex flex-col items-center justify-center gap-4 transition-all">
                                    <Image
                                      src="/provider/workspace/arrows.svg"
                                      alt="Start Renewal Icon"
                                      width={24}
                                      height={24}
                                      className="h-6 w-6"
                                    />
                                    <span className="text-lg leading-tight font-semibold tracking-normal text-black">
                                      Start Renewal
                                    </span>
                                  </button>

                                  <Link
                                    href={`/provider/policies/policy-overview?policy_id=${row.original.id}`}
                                  >
                                    <button className="bg-light-neutral-100 hover:bg-light-neutral-300 -ml-4 flex h-[5.625rem] w-[5.625rem] flex-col items-center justify-center gap-4 rounded-2xl transition-all outline-none">
                                      <Image
                                        src="/provider/workspace/messages.svg"
                                        alt="Edit Policy Icon"
                                        width={24}
                                        height={24}
                                        className="h-6 w-6"
                                      />
                                      <span className="text-lg leading-tight font-semibold tracking-normal text-black">
                                        Edit Policy
                                      </span>
                                    </button>
                                  </Link>
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

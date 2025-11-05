'use client';

import { Fragment } from 'react';

import Image from 'next/image';

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Ellipsis,
  MoreVertical,
  Pencil,
  Plus,
} from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';

import { Button } from '@/components/ui/button';
import PolicyOverviewDocumentsTable from '@/features/provider/components/policy-overview-documents-table';
import { cn } from '@/lib/utils';
import { useProviderStore } from '@/store/provider.store';

export default function PolicyOverviewPage() {
  const {
    isEditModeOn,
    setIsEditModeOn,
    editPolicyFormData,
    setEditPolicyFormData,
  } = useProviderStore();
  const [activeTab, setActiveTab] = useQueryState(
    'active_tab',
    parseAsString.withDefault('overview')
  );
  const [facilityId, setFacilityId] = useQueryState(
    'facility_id',
    parseAsString.withDefault('')
  );
  const [documentId, setDocumentId] = useQueryState(
    'document_id',
    parseAsString.withDefault('')
  );

  return (
    <div className="bg-gray min-h-[74.35vh] rounded-tl-[1.875rem] rounded-tr-[1.875rem] px-2 pt-2">
      <div className="flex items-start">
        {isEditModeOn ||
        (activeTab === 'facilities' && Boolean(facilityId)) ||
        (activeTab === 'documents' && Boolean(documentId)) ? null : (
          <div className="grid min-w-36 grid-cols-1">
            <Button
              variant={'muted'}
              className={cn(
                'min-h-11-5 w-full bg-transparent px-5 py-3 text-xl leading-tight font-semibold tracking-normal text-black hover:bg-transparent',
                {
                  'bg-white hover:bg-white': activeTab === 'overview',
                }
              )}
              onClick={() => {
                setFacilityId('');
                setActiveTab('overview');
              }}
            >
              <span className="mr-auto">Overview</span>
            </Button>
            <Button
              variant={'muted'}
              className={cn(
                'min-h-11-5 w-full bg-transparent px-5 py-3 text-xl leading-tight font-semibold tracking-normal text-black hover:bg-transparent',
                {
                  'bg-white hover:bg-white': activeTab === 'facilities',
                }
              )}
              onClick={() => {
                setFacilityId('');
                setActiveTab('facilities');
              }}
            >
              <span className="mr-auto">Facilities</span>
            </Button>
            <Button
              variant={'muted'}
              className={cn(
                'min-h-11-5 w-full bg-transparent px-5 py-3 text-xl leading-tight font-semibold tracking-normal text-black hover:bg-transparent',
                {
                  'bg-white hover:bg-white': activeTab === 'documents',
                }
              )}
              onClick={() => {
                setFacilityId('');
                setActiveTab('documents');
              }}
            >
              <span className="mr-auto">Documents</span>
            </Button>
          </div>
        )}
        {activeTab === 'overview' ? (
          <div
            className={cn('grid w-full grid-cols-1 gap-16 py-8 pr-4 pl-13', {
              'pr-8': isEditModeOn,
            })}
          >
            <div className="space-y-10">
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <h3 className="text-7xl leading-tight font-semibold tracking-normal text-black">
                    {isEditModeOn ? 'Edit Mode' : 'Overview'}
                  </h3>
                  <span className="text-dark-neutral-500 text-xl leading-tight font-normal tracking-normal">
                    {isEditModeOn
                      ? 'Review coverage, contacts, and compliance info carefully before submitting updates.'
                      : 'Key details and quick insights for this policy.'}
                  </span>
                </div>
                {!isEditModeOn ? (
                  <div className="flex items-center gap-1">
                    <Button
                      variant={'muted'}
                      className="max-h-7-5 gap-2 rounded-lg bg-white px-3 py-2 text-xl leading-tight font-semibold tracking-normal text-black"
                    >
                      <Ellipsis size={14} className="h-3.5 w-3.5 text-black" />
                    </Button>
                    <Button
                      variant={'muted'}
                      onClick={() => {
                        setIsEditModeOn(true);
                      }}
                      className="max-h-7-5 gap-2 rounded-lg bg-white px-3 py-2 text-xl leading-tight font-semibold tracking-normal text-black"
                    >
                      Edit
                    </Button>
                    <Button
                      variant={'muted'}
                      className="max-h-7-5 gap-2 rounded-lg bg-white px-3 py-2 text-xl leading-tight font-semibold tracking-normal text-black"
                    >
                      <Image
                        src="/provider/policy-overview/ArrowAction.svg"
                        alt="Arrow Action"
                        width={12}
                        height={12}
                        className="mb-0.5"
                      />
                      <span>Export</span>
                    </Button>
                  </div>
                ) : null}
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div
                  className={cn(
                    'grid grid-cols-[130fr_360.5fr] items-center gap-x-4 gap-y-5',
                    {
                      'grid-cols-[130fr_425.5fr] gap-y-4': isEditModeOn,
                    }
                  )}
                >
                  <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                    Contact name
                  </div>
                  {isEditModeOn ? (
                    <input
                      type="text"
                      value={editPolicyFormData.contactName}
                      onChange={e =>
                        setEditPolicyFormData({
                          contactName: e.target.value,
                        })
                      }
                      placeholder="Enter contact name"
                      className="border-brand-blue-300 placeholder:text-dark-neutral-200 h-6 max-w-52 rounded-[0.25rem] border-[0.094rem] p-1 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                    />
                  ) : (
                    <div className="text-xl leading-tight font-medium tracking-normal text-black">
                      Sarah Miller
                    </div>
                  )}
                  <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                    Contact phone
                  </div>
                  {isEditModeOn ? (
                    <input
                      type="tel"
                      value={editPolicyFormData.contactPhone}
                      onChange={e =>
                        setEditPolicyFormData({
                          contactPhone: e.target.value,
                        })
                      }
                      placeholder="Enter contact phone"
                      className="border-brand-blue-300 placeholder:text-dark-neutral-200 h-6 max-w-52 rounded-[0.25rem] border-[0.094rem] p-1 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                    />
                  ) : (
                    <div className="text-xl leading-tight font-medium tracking-normal text-black">
                      +1 (555) 341-9922
                    </div>
                  )}
                  <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                    Contact email
                  </div>
                  {isEditModeOn ? (
                    <input
                      type="email"
                      value={editPolicyFormData.contactEmail}
                      onChange={e =>
                        setEditPolicyFormData({
                          contactEmail: e.target.value,
                        })
                      }
                      placeholder="Enter contact email"
                      className="border-brand-blue-300 placeholder:text-dark-neutral-200 h-6 max-w-52 rounded-[0.25rem] border-[0.094rem] p-1 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                    />
                  ) : (
                    <div className="text-xl leading-tight font-medium tracking-normal text-black">
                      sarah@riversidecare.com
                    </div>
                  )}
                  <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal text-nowrap">
                    Insurance Company
                  </div>
                  {isEditModeOn ? (
                    <input
                      type="text"
                      value={editPolicyFormData.insuranceCompany}
                      onChange={e =>
                        setEditPolicyFormData({
                          insuranceCompany: e.target.value,
                        })
                      }
                      placeholder="Enter insurance company"
                      className="border-brand-blue-300 placeholder:text-dark-neutral-200 h-6 max-w-52 rounded-[0.25rem] border-[0.094rem] p-1 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                    />
                  ) : (
                    <div className="text-xl leading-tight font-medium tracking-normal text-black">
                      ABC Insurance Co.
                    </div>
                  )}
                </div>
                <div
                  className={cn(
                    'grid grid-cols-[130fr_360.5fr] items-center gap-x-4 gap-y-5',
                    {
                      'grid-cols-[130fr_425.5fr] gap-y-4': isEditModeOn,
                    }
                  )}
                >
                  <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                    Effective date
                  </div>
                  {isEditModeOn ? (
                    <input
                      type="text"
                      value={editPolicyFormData.effectiveDate}
                      onChange={e =>
                        setEditPolicyFormData({
                          effectiveDate: e.target.value,
                        })
                      }
                      placeholder="Enter effective date"
                      className="border-brand-blue-300 placeholder:text-dark-neutral-200 h-6 max-w-52 rounded-[0.25rem] border-[0.094rem] p-1 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                    />
                  ) : (
                    <div className="text-xl leading-tight font-medium tracking-normal text-black">
                      Aug 22, 2024
                    </div>
                  )}
                  <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                    Expiration date
                  </div>
                  {isEditModeOn ? (
                    <input
                      type="text"
                      value={editPolicyFormData.expirationDate}
                      onChange={e =>
                        setEditPolicyFormData({
                          expirationDate: e.target.value,
                        })
                      }
                      placeholder="Enter expiration date"
                      className="border-brand-blue-300 placeholder:text-dark-neutral-200 h-6 max-w-52 rounded-[0.25rem] border-[0.094rem] p-1 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                    />
                  ) : (
                    <div className="text-xl leading-tight font-medium tracking-normal text-black">
                      Aug 22, 2025
                    </div>
                  )}
                  <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                    Coverage Limit
                  </div>
                  {isEditModeOn ? (
                    <input
                      type="text"
                      value={editPolicyFormData.coverageLimit}
                      onChange={e =>
                        setEditPolicyFormData({
                          coverageLimit: e.target.value,
                        })
                      }
                      placeholder="Enter coverage limit"
                      className="border-brand-blue-300 placeholder:text-dark-neutral-200 h-6 max-w-52 rounded-[0.25rem] border-[0.094rem] p-1 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                    />
                  ) : (
                    <div className="text-xl leading-tight font-medium tracking-normal text-black">
                      $5 000 000
                    </div>
                  )}
                  <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                    Premium
                  </div>
                  {isEditModeOn ? (
                    <input
                      type="text"
                      value={editPolicyFormData.premium}
                      onChange={e =>
                        setEditPolicyFormData({ premium: e.target.value })
                      }
                      placeholder="Enter premium"
                      className="border-brand-blue-300 placeholder:text-dark-neutral-200 h-6 max-w-52 rounded-[0.25rem] border-[0.094rem] p-1 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                    />
                  ) : (
                    <div className="text-xl leading-tight font-medium tracking-normal text-black">
                      $12,500 Annual
                    </div>
                  )}
                </div>
              </div>
              {!isEditModeOn ? (
                <div className="space-y-8">
                  <h4 className="flex items-center gap-2">
                    <span className="text-dark-neutral-500 text-xl leading-tight font-bold tracking-normal">
                      Additional Information
                    </span>
                    <span>
                      <ChevronUp
                        size={20}
                        className="text-dark-neutral-300 h-5 w-5"
                      />
                    </span>
                  </h4>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="grid grid-cols-[130fr_360.5fr] gap-x-4 gap-y-5">
                      <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                        Policy Type
                      </div>
                      <div className="text-xl leading-tight font-medium tracking-normal text-black">
                        Sarah Miller
                      </div>
                      <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                        Retroactive Date
                      </div>
                      <div className="text-xl leading-tight font-medium tracking-normal text-black">
                        +1 (555) 341-9922
                      </div>
                      <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                        Policy History
                      </div>
                      <div className="text-xl leading-tight font-medium tracking-normal text-black">
                        sarah@riversidecare.com
                      </div>
                      <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                        Bankruptcy
                      </div>
                      <div className="text-xl leading-tight font-medium tracking-normal text-black">
                        ABC Insurance Co.
                      </div>
                    </div>
                    <div className="grid grid-cols-[130fr_360.5fr] gap-x-4 gap-y-5">
                      <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                        Loss Run
                      </div>
                      <div className="text-xl leading-tight font-medium tracking-normal text-black">
                        Aug 22, 2024
                      </div>
                      <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                        Report Date
                      </div>
                      <div className="text-xl leading-tight font-medium tracking-normal text-black">
                        Aug 22, 2025
                      </div>
                      <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                        Facilities Covered
                      </div>
                      <div className="text-xl leading-tight font-medium tracking-normal text-black">
                        $5 000 000
                      </div>
                      <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                        &#8205;
                      </div>
                      <div className="text-xl leading-tight font-medium tracking-normal text-black">
                        &#8205;
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-13 space-y-10">
                  <div className="space-y-4">
                    <h3 className="text-6xl leading-tight font-semibold tracking-normal text-black">
                      Additional information
                    </h3>
                    <span className="text-dark-neutral-500 text-xl leading-tight font-normal tracking-normal">
                      Extra information to complete compliance requirements.
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div
                      className={cn(
                        'grid grid-cols-[130fr_360.5fr] items-center gap-x-4 gap-y-5',
                        {
                          'grid-cols-[130fr_425.5fr] gap-y-4': isEditModeOn,
                        }
                      )}
                    >
                      <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                        Coverage Basis
                      </div>
                      <input
                        type="text"
                        value={editPolicyFormData.coverageBasis}
                        onChange={e =>
                          setEditPolicyFormData({
                            coverageBasis: e.target.value,
                          })
                        }
                        placeholder="Enter coverage basis"
                        className="border-brand-blue-300 placeholder:text-dark-neutral-200 h-6 max-w-52 rounded-[0.25rem] border-[0.094rem] p-1 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                      />
                      <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                        Retroactive Date
                      </div>
                      <input
                        type="text"
                        value={editPolicyFormData.retroactiveDate}
                        onChange={e =>
                          setEditPolicyFormData({
                            retroactiveDate: e.target.value,
                          })
                        }
                        placeholder="Enter retroactive date"
                        className="border-brand-blue-300 placeholder:text-dark-neutral-200 h-6 max-w-52 rounded-[0.25rem] border-[0.094rem] p-1 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                      />
                      <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                        Deductible
                      </div>
                      <input
                        type="text"
                        value={editPolicyFormData.deductible}
                        onChange={e =>
                          setEditPolicyFormData({
                            deductible: e.target.value,
                          })
                        }
                        placeholder="Enter deductible"
                        className="border-brand-blue-300 placeholder:text-dark-neutral-200 h-6 max-w-52 rounded-[0.25rem] border-[0.094rem] p-1 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                      />
                    </div>
                    <div
                      className={cn(
                        'grid grid-cols-[130fr_360.5fr] items-center gap-x-4 gap-y-5',
                        {
                          'grid-cols-[130fr_425.5fr] gap-y-4': isEditModeOn,
                        }
                      )}
                    >
                      <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                        Policy History
                      </div>
                      <input
                        type="text"
                        value={editPolicyFormData.policyHistory}
                        onChange={e =>
                          setEditPolicyFormData({
                            policyHistory: e.target.value,
                          })
                        }
                        placeholder="Enter policy history"
                        className="border-brand-blue-300 placeholder:text-dark-neutral-200 h-6 max-w-52 rounded-[0.25rem] border-[0.094rem] p-1 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                      />
                      <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                        Bankruptcy
                      </div>
                      <input
                        type="text"
                        value={editPolicyFormData.bankruptcy}
                        onChange={e =>
                          setEditPolicyFormData({
                            bankruptcy: e.target.value,
                          })
                        }
                        placeholder="Enter bankruptcy info"
                        className="border-brand-blue-300 placeholder:text-dark-neutral-200 h-6 max-w-52 rounded-[0.25rem] border-[0.094rem] p-1 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                      />
                      <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                        Loss Run
                      </div>
                      <input
                        type="text"
                        value={editPolicyFormData.lossRun}
                        onChange={e =>
                          setEditPolicyFormData({ lossRun: e.target.value })
                        }
                        placeholder="Enter loss run info"
                        className="border-brand-blue-300 placeholder:text-dark-neutral-200 h-6 max-w-52 rounded-[0.25rem] border-[0.094rem] p-1 text-xl leading-tight font-medium tracking-normal text-black placeholder:text-xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            {!isEditModeOn ? (
              <div className="space-y-8">
                <div className="flex items-end justify-between">
                  <div className="space-y-4">
                    <h3 className="text-6xl leading-tight font-semibold tracking-normal text-black">
                      Facilities
                    </h3>
                    <span className="text-dark-neutral-500 text-xl leading-tight font-normal tracking-normal">
                      Facilities covered under this policy.
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant={'muted'}
                      className="max-h-7-5 gap-2 rounded-lg bg-white px-3 py-2 text-xl leading-tight font-semibold tracking-normal text-black"
                    >
                      <Plus
                        size={12}
                        className="text-dark-neutral-200 mb-0.5 h-3.5 w-3.5"
                      />
                      <span>Add Facility</span>
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {Array.from([1, 2, 3, 4]).map(facility => {
                    return (
                      <div
                        key={facility}
                        className="grid grid-cols-1 gap-8 rounded-[1.75rem] bg-white px-2 pt-8 pb-2"
                      >
                        <div className="flex items-start justify-between px-8">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-[#000000]/5"></div>
                            <div className="space-y-1">
                              <div className="text-3xl leading-tight font-medium tracking-normal text-black">
                                Riverside Nursing Pavilion
                              </div>
                              <div className="text-dark-neutral-500 mt-3 text-lg leading-tight font-normal tracking-normal">
                                12 Riverside Ave, Boston, MA
                              </div>
                            </div>
                          </div>
                          {facility % 2 === 0 ? (
                            <div className="bg-gray flex items-center gap-2 rounded-[6.25rem] px-3 py-1.5">
                              <div className="bg-dark-neutral-400 mb-0.5 h-1 w-1 rounded-full"></div>
                              <span className="leading-medium text-xl font-semibold tracking-normal text-black">
                                Inactive
                              </span>
                            </div>
                          ) : (
                            <div className="bg-success-25 flex items-center gap-2 rounded-[6.25rem] px-3 py-1.5">
                              <div className="bg-success-600 mb-0.5 h-1 w-1 rounded-full"></div>
                              <span className="text-success-800 leading-medium text-xl font-semibold tracking-normal">
                                Active
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="space-y-4 px-8">
                          <div className="border-b-light-neutral-400 text-dark-blue border-b pb-3 text-xl leading-tight font-medium tracking-normal">
                            <span>nursing.pavilion.com</span>
                            <ArrowUpRight
                              size={14}
                              className="ml-2 inline h-3.5 w-3.5"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
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
                                Current Stage
                              </div>
                              <div className="mt-2.5 text-3xl leading-tight font-medium tracking-normal text-black">
                                Active (Covered)
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 place-content-center gap-2">
                          <Button
                            variant={'secondary'}
                            className="border-light-neutral-300 min-h-10 border bg-transparent px-5 py-3 text-lg leading-4 font-semibold tracking-normal text-black"
                          >
                            <span>Edit</span>
                            <ChevronDown size={12} className="h-3 w-3" />
                          </Button>
                          <Button
                            variant={'secondary'}
                            className="text-dark-blue border-gray bg-gray min-h-10 border px-5 py-3 text-lg leading-4 font-semibold tracking-normal"
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2">
                    <span className="text-dark-neutral-400 text-xl leading-tight font-medium tracking-normal">
                      Pending
                    </span>
                    <span>
                      <ChevronUp
                        size={20}
                        className="text-dark-neutral-300 h-5 w-5"
                      />
                    </span>
                  </h4>
                  <h4 className="flex items-center gap-2">
                    <span className="text-dark-neutral-400 text-xl leading-tight font-medium tracking-normal">
                      Archived
                    </span>
                    <span>
                      <ChevronUp
                        size={20}
                        className="text-dark-neutral-300 h-5 w-5"
                      />
                    </span>
                  </h4>
                </div>
              </div>
            ) : null}
          </div>
        ) : activeTab === 'facilities' && Boolean(facilityId) ? (
          <div className="w-full space-y-13 px-10 py-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Image
                    src="/provider/policy-overview/home.svg"
                    alt="Policy Icon"
                    width={16}
                    height={16}
                    className="pb-0-75"
                  />
                  <span
                    onClick={() => {
                      setFacilityId('');
                      setActiveTab('facilities');
                    }}
                    className="text-dark-neutral-400 mx-2.5 cursor-pointer text-xl leading-4 font-normal tracking-normal"
                  >
                    Facilities
                  </span>
                  <Image
                    src="/provider/policy-overview/ChevronForward.svg"
                    alt="Chevron Icon"
                    width={16}
                    height={16}
                    className="pb-0-75 mt-0.5 mr-2.5 h-3.5 w-3.5"
                  />
                  <span className="text-dark-neutral-400 mt-0.5 text-xl leading-4 font-normal tracking-normal">
                    ...
                  </span>
                  <Image
                    src="/provider/policy-overview/ChevronForward.svg"
                    alt="Chevron Icon"
                    width={16}
                    height={16}
                    className="pb-0-75 mx-2.5 mt-0.5 h-3.5 w-3.5"
                  />
                  <span className="flex min-h-6 items-center justify-center rounded-lg bg-white px-2 text-xl leading-4 font-[550] text-black">
                    View Profile
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <Button variant={'ghost'} size={'icon'} className="h-4 w-4">
                    <ArrowLeft
                      size={16}
                      className="text-dark-neutral-400 !h-4 !w-4"
                    />
                  </Button>
                  <Button variant={'ghost'} size={'icon'} className="h-4 w-4">
                    <ArrowRight
                      size={16}
                      className="text-dark-neutral-400 !h-4 !w-4"
                    />
                  </Button>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div className="space-y-4">
                  <h3 className="text-7xl leading-tight font-semibold tracking-normal text-black">
                    Green Valley Nursing Home
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-dark-neutral-500 text-xl leading-tight font-normal tracking-normal">
                      123 Main St, Springfield, IL 62704
                    </span>
                    <span className="text-brand-blue-700 flex max-h-6 min-h-6 items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-lg font-semibold">
                      <span>website</span>
                      <ArrowUpRight size={12} className="!h-3 !w-3" />
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant={'muted'}
                    className="max-h-7-5 gap-2 rounded-lg bg-white px-3 py-2 text-xl leading-tight font-semibold tracking-normal text-black"
                  >
                    <Ellipsis size={14} className="h-3.5 w-3.5 text-black" />
                  </Button>
                  <Button
                    variant={'muted'}
                    onClick={() => {
                      setIsEditModeOn(true);
                    }}
                    className="max-h-7-5 gap-2 rounded-lg bg-white px-3 py-2 text-xl leading-tight font-semibold tracking-normal text-black"
                  >
                    Edit
                  </Button>
                  <Button
                    variant={'muted'}
                    className="max-h-7-5 gap-2 rounded-lg bg-white px-3 py-2 text-xl leading-tight font-semibold tracking-normal text-black"
                  >
                    <Image
                      src="/provider/policy-overview/ArrowAction.svg"
                      alt="Arrow Action"
                      width={12}
                      height={12}
                      className="mb-0.5"
                    />
                    <span>Download PDF</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-[431fr_700fr] gap-10">
              <div className="space-y-10">
                <div className="space-y-8">
                  <h4 className="text-6xl leading-tight font-semibold tracking-normal text-black">
                    Ownership
                  </h4>
                  <div className="gap-y-5-5 grid grid-cols-[160fr_247fr] gap-x-6">
                    <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                      CMS Provider ID
                    </div>
                    <div className="text-xl leading-tight font-medium tracking-normal text-black">
                      123456
                    </div>
                    <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                      Owner of Facility
                    </div>
                    <div className="text-xl leading-tight font-medium tracking-normal text-black">
                      Springfield Care Group
                    </div>
                    <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                      Owned Duration
                    </div>
                    <div className="text-xl leading-tight font-medium tracking-normal text-black">
                      12 years
                    </div>
                    <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                      Other Facilities
                    </div>
                    <div className="text-xl leading-tight font-medium tracking-normal text-black">
                      245
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  <h4 className="text-6xl leading-tight font-semibold tracking-normal text-black">
                    Management
                  </h4>
                  <div className="gap-y-5-5 grid grid-cols-[160fr_247fr] gap-x-6">
                    <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                      Management Company
                    </div>
                    <div className="text-xl leading-tight font-medium tracking-normal text-black">
                      HealthFirst Management LLC
                    </div>
                    <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                      Management Duration
                    </div>
                    <div className="text-xl leading-tight font-medium tracking-normal text-black">
                      7 years
                    </div>
                    <div className="text-dark-neutral-500 text-xl leading-tight font-medium tracking-normal">
                      Other Facilities
                    </div>
                    <div className="text-xl leading-tight font-medium tracking-normal text-black">
                      245
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-[312fr_194fr_107fr_87fr] place-content-start gap-y-13 rounded-3xl bg-white py-7 pr-7 pl-12">
                <div className="text-dark-neutral-500 text-xl leading-snug font-medium tracking-normal">
                  Bed Type
                </div>
                <div className="text-dark-neutral-500 text-xl leading-snug font-medium tracking-normal">
                  Licensed #
                </div>
                <div className="text-dark-neutral-500 text-xl leading-snug font-medium tracking-normal">
                  Occupied #
                </div>
                <div></div>
                {[1, 2, 3, 4, 5].map(facility => {
                  return (
                    <Fragment key={facility}>
                      <div className="leading-medium text-3xl font-medium tracking-normal text-black">
                        Skilled Nursing Facility (SNF)
                      </div>
                      <div className="leading-medium text-xl font-semibold tracking-normal text-black">
                        120
                      </div>
                      <div className="leading-medium text-xl font-semibold tracking-normal text-black">
                        110
                      </div>
                      <button className="text-dark-neutral-200 ml-3 flex -space-x-3">
                        <MoreVertical className="h-5 w-5" />
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        ) : activeTab === 'documents' && Boolean(documentId) ? (
          <div className="w-full space-y-16 px-10 py-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Image
                    src="/provider/policy-overview/home.svg"
                    alt="Policy Icon"
                    width={16}
                    height={16}
                    className="pb-0-75"
                  />
                  <span
                    onClick={() => {
                      setDocumentId('');
                      setActiveTab('documents');
                    }}
                    className="text-dark-neutral-400 mx-2.5 cursor-pointer text-xl leading-4 font-normal tracking-normal"
                  >
                    Documents
                  </span>
                  <Image
                    src="/provider/policy-overview/ChevronForward.svg"
                    alt="Chevron Icon"
                    width={16}
                    height={16}
                    className="pb-0-75 mt-0.5 mr-2.5 h-3.5 w-3.5"
                  />
                  <span className="text-dark-neutral-400 mt-0.5 text-xl leading-4 font-normal tracking-normal">
                    ...
                  </span>
                  <Image
                    src="/provider/policy-overview/ChevronForward.svg"
                    alt="Chevron Icon"
                    width={16}
                    height={16}
                    className="pb-0-75 mx-2.5 mt-0.5 h-3.5 w-3.5"
                  />
                  <span className="flex min-h-6 items-center justify-center rounded-lg bg-white px-2 text-xl leading-4 font-[550] text-black">
                    View docs
                  </span>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div className="space-y-4">
                  <h3 className="text-7xl leading-tight font-semibold tracking-normal text-black">
                    Policy_Agreement_2024.pdf
                  </h3>
                  <div className="flex items-center">
                    <span className="text-dark-neutral-500 text-xl leading-tight font-normal tracking-normal">
                      Expiration Date: 22 Aug 2025
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant={'muted'}
                    className="max-h-7-5 gap-2 rounded-lg bg-white px-3 py-2 text-xl leading-tight font-semibold tracking-normal text-black"
                  >
                    <Ellipsis size={14} className="h-3.5 w-3.5 text-black" />
                  </Button>
                  <Button
                    variant={'muted'}
                    className="max-h-7-5 gap-2 rounded-lg bg-white px-3 py-2 text-xl leading-tight font-semibold tracking-normal text-black"
                  >
                    Copy Link
                  </Button>
                  <Button
                    variant={'muted'}
                    className="max-h-7-5 gap-2 rounded-lg bg-white px-3 py-2 text-xl leading-tight font-semibold tracking-normal text-black"
                  >
                    <Image
                      src="/provider/policy-overview/ArrowAction.svg"
                      alt="Arrow Action"
                      width={12}
                      height={12}
                      className="mb-0.5"
                    />
                    <span>Download PDF</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="mx-auto min-h-[69.872rem] max-w-[49.375rem] bg-white"></div>
          </div>
        ) : activeTab === 'facilities' ? (
          <div className="w-full py-8 pr-4 pl-13">
            <div className="space-y-8">
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <h3 className="text-7xl leading-tight font-semibold tracking-normal text-black">
                    Facilities
                  </h3>
                  <span className="text-dark-neutral-500 text-xl leading-tight font-normal tracking-normal">
                    Facilities covered under this policy.
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant={'muted'}
                    className="max-h-7-5 gap-2 rounded-lg bg-white px-3 py-2 text-xl leading-tight font-semibold tracking-normal text-black"
                  >
                    <Ellipsis
                      size={14}
                      className="mb-0.5 !h-3.5 !w-3.5 text-black"
                    />
                  </Button>
                  <Button
                    variant={'muted'}
                    className="max-h-7-5 gap-2 rounded-lg bg-white px-3 py-2 text-xl leading-tight font-semibold tracking-normal text-black"
                  >
                    <Pencil
                      size={12}
                      className="text-dark-neutral-200 mb-0.5 !h-3 !w-3"
                    />
                    <span>Edit</span>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Array.from([1, 2, 3, 4]).map(facility => {
                  return (
                    <div
                      key={facility}
                      className="grid grid-cols-1 gap-8 rounded-[1.75rem] bg-white px-2 pt-8 pb-2"
                    >
                      <div className="flex items-start justify-between px-8">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-[#000000]/5"></div>
                          <div className="space-y-1">
                            <div className="text-3xl leading-tight font-medium tracking-normal text-black">
                              Riverside Nursing Pavilion
                            </div>
                            <div className="text-dark-neutral-500 mt-3 text-lg leading-tight font-normal tracking-normal">
                              12 Riverside Ave, Boston, MA
                            </div>
                          </div>
                        </div>
                        {facility % 2 === 0 ? (
                          <div className="bg-gray flex items-center gap-2 rounded-[6.25rem] px-3 py-1.5">
                            <div className="bg-dark-neutral-400 mb-0.5 h-1 w-1 rounded-full"></div>
                            <span className="leading-medium text-xl font-semibold tracking-normal text-black">
                              Inactive
                            </span>
                          </div>
                        ) : (
                          <div className="bg-success-25 flex items-center gap-2 rounded-[6.25rem] px-3 py-1.5">
                            <div className="bg-success-600 mb-0.5 h-1 w-1 rounded-full"></div>
                            <span className="text-success-800 leading-medium text-xl font-semibold tracking-normal">
                              Active
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-4 px-8">
                        <div className="border-b-light-neutral-400 text-dark-blue border-b pb-3 text-xl leading-tight font-medium tracking-normal">
                          <span>nursing.pavilion.com</span>
                          <ArrowUpRight
                            size={14}
                            className="ml-2 inline h-3.5 w-3.5"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
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
                              Current Stage
                            </div>
                            <div className="mt-2.5 text-3xl leading-tight font-medium tracking-normal text-black">
                              Active (Covered)
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 place-content-center gap-2">
                        <Button
                          variant={'secondary'}
                          className="border-light-neutral-300 min-h-10 border bg-transparent px-5 py-3 text-lg leading-4 font-semibold tracking-normal text-black"
                        >
                          <span>Edit</span>
                          <ChevronDown size={12} className="h-3 w-3" />
                        </Button>
                        <Button
                          onClick={() => {
                            setFacilityId('154328');
                          }}
                          variant={'secondary'}
                          className="text-dark-blue border-gray bg-gray min-h-10 border px-5 py-3 text-lg leading-4 font-semibold tracking-normal"
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="space-y-4">
                <h4 className="flex items-center gap-2">
                  <span className="text-dark-neutral-400 text-xl leading-tight font-medium tracking-normal">
                    Pending
                  </span>
                  <span>
                    <ChevronUp
                      size={20}
                      className="text-dark-neutral-300 h-5 w-5"
                    />
                  </span>
                </h4>
                <h4 className="flex items-center gap-2">
                  <span className="text-dark-neutral-400 text-xl leading-tight font-medium tracking-normal">
                    Archived
                  </span>
                  <span>
                    <ChevronUp
                      size={20}
                      className="text-dark-neutral-300 h-5 w-5"
                    />
                  </span>
                </h4>
              </div>
            </div>
          </div>
        ) : activeTab === 'documents' ? (
          <div className="w-full pt-8 pb-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between pr-4 pl-13">
                <div className="space-y-4">
                  <h3 className="text-7xl leading-tight font-semibold tracking-normal text-black">
                    Documents
                  </h3>
                  <span className="text-dark-neutral-500 text-xl leading-tight font-normal tracking-normal">
                    All agreements, renewals, and compliance files linked to
                    this policy.
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant={'muted'}
                    onClick={() => {
                      setIsEditModeOn(true);
                    }}
                    className="max-h-7-5 gap-2 rounded-lg bg-white px-3 py-2 text-xl leading-tight font-semibold tracking-normal text-black"
                  >
                    Edit
                  </Button>
                  <Button
                    variant={'muted'}
                    className="max-h-7-5 gap-2 rounded-lg bg-white px-3 py-2 text-xl leading-tight font-semibold tracking-normal text-black"
                  >
                    <Image
                      src="/provider/policy-overview/ArrowAction.svg"
                      alt="Arrow Action"
                      width={12}
                      height={12}
                      className="mb-0.5"
                    />
                    <span>Upload Docs</span>
                  </Button>
                </div>
              </div>
              <div className="pl-7">
                <PolicyOverviewDocumentsTable setDocumentId={setDocumentId} />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

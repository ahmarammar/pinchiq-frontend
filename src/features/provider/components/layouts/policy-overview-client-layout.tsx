'use client';

import { ReactNode, useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useProviderStore } from '@/store/provider.store';

interface PolicyOverviewClientLayoutProps {
  children: ReactNode;
}

export default function PolicyOverviewClientLayout({
  children,
}: PolicyOverviewClientLayoutProps) {
  const router = useRouter();
  const {
    editPolicyFormData,
    setEditPolicyFormData,
    uploadedLogo,
    setUploadedLogo,
    isEditModeOn,
    setIsEditModeOn,
  } = useProviderStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="px-22 pt-10">
      {!isEditModeOn ? (
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
              router.push('/provider/policies');
            }}
            className="text-dark-neutral-500 mx-2.5 cursor-pointer text-xl leading-4 font-normal tracking-normal"
          >
            Policies
          </span>
          <Image
            src="/provider/policy-overview/ChevronForward.svg"
            alt="Chevron Icon"
            width={16}
            height={16}
            className="pb-0-75 mt-0.5 mr-2.5 h-3.5 w-3.5"
          />
          <span className="text-dark-neutral-500 mt-0.5 text-xl leading-4 font-normal tracking-normal">
            ...
          </span>
          <Image
            src="/provider/policy-overview/ChevronForward.svg"
            alt="Chevron Icon"
            width={16}
            height={16}
            className="pb-0-75 mx-2.5 mt-0.5 h-3.5 w-3.5"
          />
          <span className="bg-gray flex min-h-6 items-center justify-center rounded-lg px-2 text-xl leading-4 font-[550] text-black">
            Overview
          </span>
        </div>
      ) : null}
      <div
        className={cn('mt-8 flex items-end justify-between', {
          'mt-4': isEditModeOn,
        })}
      >
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
                !uploadedLogo && isEditModeOn ? handleLogoClick : undefined
              }
              className={`flex items-center justify-center ${!uploadedLogo ? 'cursor-pointer' : ''}`}
            >
              <Image
                src={uploadedLogo || '/provider/add-policy/videoaudio.svg'}
                alt="Policy Logo"
                className="h-4 w-4 object-cover"
                width={16}
                height={16}
              />
            </div>
            {isEditModeOn && (
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
            {!isEditModeOn && (
              <div className="bg-blue-2 absolute top-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div className="flex flex-col space-y-0.5">
            <div className="flex items-center">
              {isEditModeOn ? (
                <input
                  type="text"
                  value={editPolicyFormData.policyName}
                  onChange={e =>
                    setEditPolicyFormData({
                      ...editPolicyFormData,
                      policyName: e.target.value,
                    })
                  }
                  placeholder="Enter policy name"
                  className={`border-brand-blue-300 placeholder:text-dark-neutral-200 h-8 max-w-64 rounded-[0.25rem] border-[0.094rem] p-1 pr-2 text-6xl leading-tight font-medium tracking-normal text-[#000000] placeholder:text-6xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none`}
                />
              ) : (
                <>
                  <span className="h-8 p-1 pr-2 text-6xl leading-tight font-medium tracking-normal text-[#000000]">
                    {editPolicyFormData.policyName || 'Enter policy name'}
                  </span>
                  <div className="bg-gray text-brand-blue-700 ml-1 min-h-6 rounded-lg px-3 py-1.5 text-lg leading-tight font-semibold tracking-normal">
                    245 days left
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center">
              {isEditModeOn ? (
                <input
                  type="url"
                  value={editPolicyFormData.policyLink}
                  onChange={e =>
                    setEditPolicyFormData({
                      ...editPolicyFormData,
                      policyLink: e.target.value,
                    })
                  }
                  placeholder="Add a link to a website"
                  className={`border-brand-blue-300 placeholder:text-dark-neutral-200 h-6 max-w-36 rounded-[0.25rem] border-[0.094rem] p-1 text-3xl leading-tight font-medium tracking-normal text-black placeholder:text-3xl placeholder:leading-tight placeholder:font-medium placeholder:tracking-normal focus:outline-none`}
                />
              ) : (
                <>
                  <span className="text-brand-blue-700 h-6 p-1 text-3xl leading-tight font-medium tracking-normal">
                    {editPolicyFormData.policyLink || 'Add a link to a website'}
                  </span>
                  <Image
                    src="/provider/policy-overview/ArrowUpRight.svg"
                    alt="Arrow Icon"
                    className="h-4 w-4"
                    width={14}
                    height={14}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div
          className={cn(`grid grid-cols-2 place-content-center gap-2`, {
            'grid-cols-1': isEditModeOn,
          })}
        >
          {isEditModeOn ? (
            <Button
              variant={'inverse'}
              onClick={() => setIsEditModeOn(false)}
              className="px-5 py-3 text-xl leading-tight font-semibold tracking-normal text-white"
            >
              Save Changes
            </Button>
          ) : (
            <>
              <Button
                variant={'muted'}
                className="text-dark-blue min-h-9-5 px-5 py-3 text-xl leading-tight font-semibold tracking-normal"
              >
                Loss Run
              </Button>
              <Button
                variant={'inverse'}
                className="px-5 py-3 text-xl leading-tight font-semibold tracking-normal text-white"
              >
                <Image
                  src="/provider/policy-overview/transfer.svg"
                  alt="Transfer"
                  className="h-3 w-3 object-cover"
                  width={12}
                  height={12}
                />
                <span>Start Renewal</span>
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}

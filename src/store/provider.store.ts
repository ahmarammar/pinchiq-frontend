import { create } from 'zustand';

import { EditPolicyFormData } from '@/types/provider.types';

interface ProviderStore {
  isEditModeOn: boolean;
  setIsEditModeOn: (value: boolean) => void;

  uploadedLogo: string | null;
  setUploadedLogo: (value: string | null) => void;

  editPolicyFormData: EditPolicyFormData;
  setEditPolicyFormData: (value: Partial<EditPolicyFormData>) => void;
}

export const useProviderStore = create<ProviderStore>((set, get) => ({
  isEditModeOn: false,
  setIsEditModeOn: value => set({ isEditModeOn: value }),

  uploadedLogo: null,
  setUploadedLogo: value => set({ uploadedLogo: value }),

  editPolicyFormData: {
    policyName: 'Riverside Care Center',
    policyLink: 'riversidecare.com',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    insuranceCompany: '',
    effectiveDate: '',
    expirationDate: '',
    coverageLimit: '',
    premium: '',
    coverageBasis: '',
    policyHistory: '',
    retroactiveDate: '',
    bankruptcy: '',
    deductible: '',
    lossRun: '',
  },
  setEditPolicyFormData: value =>
    set(state => ({
      editPolicyFormData: { ...state.editPolicyFormData, ...value },
    })),
}));

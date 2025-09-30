import { create } from 'zustand';

export const useNavigationStore = create<{
  activePageTitle: string;
  setActivePageTitle: (title: string) => void;
}>(set => ({
  activePageTitle: 'Dashboard',
  setActivePageTitle: (title: string) => set({ activePageTitle: title }),
}));

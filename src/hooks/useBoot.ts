import { create } from 'zustand';

interface BootState {
  booted: boolean;
  finishBoot: () => void;
}

export const useBoot = create<BootState>((set) => ({
  booted: false,
  finishBoot: () => set({ booted: true }),
}));

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Mode = 'light' | 'dark';

interface ThemeState {
  mode: Mode;
  toggle: () => void;
  set: (m: Mode) => void;
}

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'dark',
      toggle: () => set((s) => ({ mode: s.mode === 'dark' ? 'light' : 'dark' })),
      set: (m) => set({ mode: m }),
    }),
    { name: 'tahoe-theme' },
  ),
);

export function applyThemeClass(mode: Mode) {
  const root = document.documentElement;
  root.classList.toggle('dark', mode === 'dark');
}

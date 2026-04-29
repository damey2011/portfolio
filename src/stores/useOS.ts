import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type AppId =
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "education"
  | "contact"
  | "resume";

export type WindowInstance = {
  id: string;
  appId: AppId;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
  prevBounds?: { x: number; y: number; w: number; h: number };
};

interface OSState {
  windows: Record<string, WindowInstance>;
  order: string[];
  focusedId: string | null;
  nextZ: number;
  openApp: (
    appId: AppId,
    defaults?: Partial<Pick<WindowInstance, "x" | "y" | "w" | "h">>,
  ) => void;
  closeWindow: (id: string) => void;
  focus: (id: string) => void;
  move: (id: string, x: number, y: number) => void;
  resize: (id: string, w: number, h: number) => void;
  setMinimized: (id: string, value: boolean) => void;
  toggleMaximized: (id: string, viewport?: { w: number; h: number }) => void;
}

const MENUBAR_H = 28;

function defaultBounds(appId: AppId): {
  x: number;
  y: number;
  w: number;
  h: number;
} {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const w = Math.min(960, Math.floor(vw * 0.72));
  const h = Math.min(640, Math.floor(vh * 0.72));
  const offsetIndex = (appId.charCodeAt(0) % 5) * 22;
  return {
    w,
    h,
    x: Math.max(20, Math.floor((vw - w) / 2) + offsetIndex),
    y: Math.max(MENUBAR_H + 16, Math.floor((vh - h) / 2 - 20) + offsetIndex),
  };
}

export const useOS = create<OSState>()(
  immer((set) => ({
    windows: {},
    order: [],
    focusedId: null,
    nextZ: 1,

    openApp: (appId, defaults) => {
      set((state) => {
        const id = appId;
        const existing = state.windows[id];
        if (existing) {
          existing.minimized = false;
          existing.z = state.nextZ++;
          state.focusedId = id;
          state.order = state.order.filter((x) => x !== id).concat(id);
          return;
        }
        const base = defaultBounds(appId);
        const w: WindowInstance = {
          id,
          appId,
          x: defaults?.x ?? base.x,
          y: defaults?.y ?? base.y,
          w: defaults?.w ?? base.w,
          h: defaults?.h ?? base.h,
          z: state.nextZ++,
          minimized: false,
          maximized: false,
        };
        state.windows[id] = w;
        state.order.push(id);
        state.focusedId = id;
      });
    },

    closeWindow: (id) => {
      set((state) => {
        delete state.windows[id];
        state.order = state.order.filter((x) => x !== id);
        if (state.focusedId === id) {
          state.focusedId = state.order[state.order.length - 1] ?? null;
        }
      });
    },

    focus: (id) => {
      set((state) => {
        const w = state.windows[id];
        if (!w) return;
        w.z = state.nextZ++;
        w.minimized = false;
        state.focusedId = id;
        state.order = state.order.filter((x) => x !== id).concat(id);
      });
    },

    move: (id, x, y) => {
      set((state) => {
        const w = state.windows[id];
        if (!w || w.maximized) return;
        w.x = x;
        w.y = y;
      });
    },

    resize: (id, width, height) => {
      set((state) => {
        const w = state.windows[id];
        if (!w || w.maximized) return;
        w.w = width;
        w.h = height;
      });
    },

    setMinimized: (id, value) => {
      set((state) => {
        const w = state.windows[id];
        if (!w) return;
        w.minimized = value;
        if (value && state.focusedId === id) {
          const remaining = state.order.filter(
            (x) => !state.windows[x]?.minimized && x !== id,
          );
          state.focusedId = remaining[remaining.length - 1] ?? null;
        }
      });
    },

    toggleMaximized: (id, viewport) => {
      set((state) => {
        const w = state.windows[id];
        if (!w) return;
        if (w.maximized) {
          if (w.prevBounds) {
            w.x = w.prevBounds.x;
            w.y = w.prevBounds.y;
            w.w = w.prevBounds.w;
            w.h = w.prevBounds.h;
          }
          w.maximized = false;
          w.prevBounds = undefined;
        } else {
          w.prevBounds = { x: w.x, y: w.y, w: w.w, h: w.h };
          w.maximized = true;
          if (viewport) {
            w.x = 0;
            w.y = MENUBAR_H;
            w.w = viewport.w;
            w.h = viewport.h - MENUBAR_H;
          }
        }
      });
    },
  })),
);

export const MENUBAR_HEIGHT = MENUBAR_H;

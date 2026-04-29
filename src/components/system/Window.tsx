import { useRef, type PointerEvent as RPointerEvent } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useOS, MENUBAR_HEIGHT, type WindowInstance } from '../../stores/useOS';
import { APPS } from './AppRegistry';
import { cn } from '../../lib/glass';

const MIN_W = 360;
const MIN_H = 280;

type Props = {
  instance: WindowInstance;
  isMobile: boolean;
};

export default function Window({ instance, isMobile }: Props) {
  const { id, appId, x, y, w, h, z, maximized, minimized } = instance;
  const app = APPS[appId];
  const focus = useOS((s) => s.focus);
  const closeWindow = useOS((s) => s.closeWindow);
  const move = useOS((s) => s.move);
  const resize = useOS((s) => s.resize);
  const setMinimized = useOS((s) => s.setMinimized);
  const toggleMaximized = useOS((s) => s.toggleMaximized);
  const focusedId = useOS((s) => s.focusedId);
  const isFocused = focusedId === id;

  const ref = useRef<HTMLDivElement>(null);

  const startDrag = (e: RPointerEvent<HTMLDivElement>) => {
    if (isMobile || maximized) return;
    if ((e.target as HTMLElement).closest('[data-no-drag]')) return;
    focus(id);
    const startX = e.clientX;
    const startY = e.clientY;
    const baseX = x;
    const baseY = y;

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const nx = Math.max(-w + 80, Math.min(vw - 80, baseX + dx));
      const ny = Math.max(MENUBAR_HEIGHT, Math.min(vh - 60, baseY + dy));
      move(id, nx, ny);
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      document.body.style.userSelect = '';
    };
    document.body.style.userSelect = 'none';
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const startResize = (e: RPointerEvent<HTMLDivElement>) => {
    if (isMobile || maximized) return;
    e.stopPropagation();
    focus(id);
    const startX = e.clientX;
    const startY = e.clientY;
    const baseW = w;
    const baseH = h;

    const onMove = (ev: PointerEvent) => {
      const dw = ev.clientX - startX;
      const dh = ev.clientY - startY;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const nw = Math.max(MIN_W, Math.min(vw - x - 8, baseW + dw));
      const nh = Math.max(MIN_H, Math.min(vh - y - 8, baseH + dh));
      resize(id, nw, nh);
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      document.body.style.userSelect = '';
    };
    document.body.style.userSelect = 'none';
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  if (minimized) return null;

  const style = isMobile
    ? {
        left: 0,
        top: 'var(--menubar-h)',
        width: '100vw',
        height: 'calc(100vh - var(--menubar-h) - var(--dock-bottom-gap))',
        zIndex: z,
      }
    : { left: x, top: y, width: w, height: h, zIndex: z };

  const Body = app.Component;

  return (
    <motion.div
      ref={ref}
      className={cn(
        'absolute glass-window text-fg overflow-hidden flex flex-col',
        maximized || isMobile ? 'rounded-none' : 'rounded-xl',
        !isFocused && 'opacity-95',
      )}
      style={style}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 500, damping: 38, mass: 0.6 }}
      onPointerDown={() => !isFocused && focus(id)}
    >
      <div
        className="h-9 flex items-center px-3 cursor-grab active:cursor-grabbing select-none border-b border-white/10 dark:border-white/5"
        onPointerDown={startDrag}
        onDoubleClick={() => toggleMaximized(id, { w: window.innerWidth, h: window.innerHeight })}
      >
        <div className="flex items-center gap-2 group" data-no-drag>
          <button
            aria-label="Close"
            onClick={() => closeWindow(id)}
            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 flex items-center justify-center"
          >
            <X className="w-2 h-2 text-black/60 opacity-0 group-hover:opacity-100" strokeWidth={3} />
          </button>
          <button
            aria-label="Minimize"
            onClick={() => setMinimized(id, true)}
            className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 flex items-center justify-center"
          >
            <Minus className="w-2 h-2 text-black/60 opacity-0 group-hover:opacity-100" strokeWidth={3} />
          </button>
          <button
            aria-label="Maximize"
            onClick={() => toggleMaximized(id, { w: window.innerWidth, h: window.innerHeight })}
            className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 flex items-center justify-center"
          >
            <Maximize2 className="w-2 h-2 text-black/60 opacity-0 group-hover:opacity-100" strokeWidth={3} />
          </button>
        </div>
        <div className="flex-1 text-center text-xs font-medium text-fg/80 pointer-events-none">
          {app.title}
        </div>
        <div className="w-[60px]" />
      </div>

      <div className="flex-1 overflow-auto scrollbar-thin">
        <Body />
      </div>

      {!isMobile && !maximized && (
        <div
          onPointerDown={startResize}
          data-no-drag
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
          style={{
            background:
              'linear-gradient(135deg, transparent 0%, transparent 50%, rgb(var(--fg) / 0.25) 50%, rgb(var(--fg) / 0.25) 60%, transparent 60%, transparent 70%, rgb(var(--fg) / 0.25) 70%, rgb(var(--fg) / 0.25) 80%, transparent 80%)',
          }}
        />
      )}
    </motion.div>
  );
}

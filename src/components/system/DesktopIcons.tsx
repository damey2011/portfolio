import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { useOS } from '../../stores/useOS';
import { APPS, APP_ORDER } from './AppRegistry';

function IconTile({
  Icon,
  iconColor,
  label,
  onActivate,
  delay,
}: {
  Icon: LucideIcon;
  iconColor: string;
  label: string;
  onActivate: () => void;
  delay: number;
}) {
  return (
    <motion.button
      onClick={onActivate}
      onDoubleClick={onActivate}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      className="group flex flex-col items-center gap-1 w-20 outline-none focus-visible:ring-2 ring-white/60 rounded-lg p-1 shrink-0"
      title={label}
    >
      <span
        className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/55 dark:bg-black/45 backdrop-blur-2xl border border-white/60 dark:border-white/15 group-hover:scale-105 group-active:scale-95 transition-transform"
        style={{ boxShadow: '0 8px 22px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.55)' }}
      >
        <Icon className="w-7 h-7" style={{ color: iconColor }} strokeWidth={2.2} />
      </span>
      <span
        className="text-[11px] leading-tight text-white text-center max-w-full px-1.5 py-0.5 rounded"
        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.55)' }}
      >
        {label}
      </span>
    </motion.button>
  );
}

export default function DesktopIcons({ isMobile }: { isMobile: boolean }) {
  const openApp = useOS((s) => s.openApp);

  return (
    <div
      className="absolute flex flex-col flex-wrap content-start gap-2 z-0 pointer-events-auto"
      style={{
        top: 'calc(var(--menubar-h) + 12px)',
        left: isMobile ? 12 : 24,
        maxHeight:
          'calc(100vh - var(--menubar-h) - var(--dock-bottom-gap) - 12px)',
      }}
    >
      {APP_ORDER.map((id, i) => {
        const app = APPS[id];
        return (
          <IconTile
            key={app.id}
            Icon={app.icon}
            iconColor={app.iconColor}
            label={app.title}
            onActivate={() => openApp(app.id)}
            delay={0.7 + i * 0.05}
          />
        );
      })}
    </div>
  );
}

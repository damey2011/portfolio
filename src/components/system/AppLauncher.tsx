import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Search, type LucideIcon } from 'lucide-react';
import { useOS, type AppId } from '../../stores/useOS';
import { APPS, APP_ORDER, EXTERNAL_LINKS } from './AppRegistry';

type LauncherItem =
  | { kind: 'app'; id: AppId; title: string; icon: LucideIcon; iconColor: string }
  | { kind: 'link'; id: string; title: string; icon: LucideIcon; iconColor: string; href: string };

export default function AppLauncher({ onClose }: { onClose: () => void }) {
  const openApp = useOS((s) => s.openApp);
  const [q, setQ] = useState('');

  const items = useMemo<LauncherItem[]>(
    () => [
      ...APP_ORDER.map((id): LauncherItem => {
        const a = APPS[id];
        return { kind: 'app', id: a.id, title: a.title, icon: a.icon, iconColor: a.iconColor };
      }),
      ...EXTERNAL_LINKS.map(
        (l): LauncherItem => ({
          kind: 'link',
          id: l.id,
          title: l.title,
          icon: l.icon,
          iconColor: l.iconColor,
          href: l.href,
        }),
      ),
    ],
    [],
  );

  const filtered = q
    ? items.filter((i) => i.title.toLowerCase().includes(q.toLowerCase()))
    : items;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const activate = (item: LauncherItem) => {
    if (item.kind === 'app') {
      openApp(item.id);
    } else {
      window.open(item.href, '_blank', 'noopener,noreferrer');
    }
    onClose();
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filtered[0]) activate(filtered[0]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-2xl flex items-start justify-center pt-16 sm:pt-24 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, y: -8, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.97, y: -6, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        className="w-full max-w-md rounded-3xl p-5 text-white"
        style={{
          background: 'rgba(28, 28, 30, 0.78)',
          backdropFilter: 'blur(36px) saturate(180%)',
          WebkitBackdropFilter: 'blur(36px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.1), 0 24px 64px rgba(0,0,0,0.55), 0 6px 16px rgba(0,0,0,0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={onSubmit} className="relative mb-4">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/55" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Applications"
            autoFocus
            className="w-full pl-9 pr-9 py-2.5 text-[15px] rounded-xl bg-white/10 border border-white/15 placeholder-white/45 outline-none focus:bg-white/15"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/10 hover:bg-white/20"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="grid grid-cols-4 gap-3">
          {filtered.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.kind + ':' + item.id}
                onClick={() => activate(item)}
                className="flex flex-col items-center gap-1.5 group outline-none focus-visible:ring-2 ring-white/40 rounded-xl p-1"
              >
                <span
                  className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/15 border border-white/20 group-hover:scale-105 group-active:scale-95 transition-transform"
                  style={{
                    boxShadow:
                      'inset 0 1px 0 rgba(255,255,255,0.4), 0 8px 22px rgba(0,0,0,0.32)',
                  }}
                >
                  <Icon className="w-7 h-7" style={{ color: item.iconColor }} strokeWidth={2.2} />
                </span>
                <span className="text-[10.5px] text-center leading-tight max-w-full px-1 line-clamp-2">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-white/55 text-sm py-6">No apps match "{q}"</div>
        )}
      </motion.div>
    </motion.div>
  );
}

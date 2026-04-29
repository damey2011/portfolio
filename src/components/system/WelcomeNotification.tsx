import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hand } from 'lucide-react';
import { useOS, type AppId } from '../../stores/useOS';

const AUTO_DISMISS_MS = 5000;

export default function WelcomeNotification({ onDismiss }: { onDismiss: () => void }) {
  const openApp = useOS((s) => s.openApp);

  useEffect(() => {
    const t = setTimeout(onDismiss, AUTO_DISMISS_MS);
    return () => clearTimeout(t);
  }, [onDismiss]);

  const choose = (appId: AppId) => {
    openApp(appId);
    onDismiss();
  };

  return (
    <motion.div
      initial={{ x: 380, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 380, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
      className="fixed right-4 z-[60] w-[360px]"
      style={{ top: 'calc(var(--menubar-h) + 12px)' } as React.CSSProperties}
    >
      <div
        className="rounded-2xl text-white p-3.5"
        style={{
          background: 'rgba(28, 28, 30, 0.72)',
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.08), 0 18px 48px rgba(0,0,0,0.55), 0 4px 8px rgba(0,0,0,0.3)',
        }}
      >
        <div className="flex gap-3 items-start">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: 'linear-gradient(135deg, #0a84ff 0%, #5e5ce6 60%, #bf5af2 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), 0 4px 10px rgba(0,0,0,0.35)',
            }}
          >
            <Hand className="w-5 h-5 text-white" strokeWidth={2.4} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-semibold text-[14px] truncate">Welcome 👋</span>
              <span className="text-[11px] text-white/50 shrink-0">now</span>
            </div>
            <p className="text-[13px] text-white/85 leading-snug mt-0.5">
              What would you like to see first?
            </p>
          </div>
        </div>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => choose('about')}
            className="flex-1 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 active:bg-white/30 text-[13px] font-medium transition-colors"
          >
            About me
          </button>
          <button
            onClick={() => choose('experience')}
            className="flex-1 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 active:bg-white/30 text-[13px] font-medium transition-colors"
          >
            Experience
          </button>
        </div>
      </div>
    </motion.div>
  );
}

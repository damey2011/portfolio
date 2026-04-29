import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import projects from '../../content/projects.json';
import { useOS } from '../../stores/useOS';

const GRADIENTS: Record<string, string> = {
  postchef: 'linear-gradient(135deg, #ff9500 0%, #ff375f 100%)',
  cinekick: 'linear-gradient(135deg, #0a84ff 0%, #5e5ce6 60%, #bf5af2 100%)',
};

export default function BuildingWidgets({ isMobile }: { isMobile: boolean }) {
  const openApp = useOS((s) => s.openApp);
  if (isMobile) return null;

  return (
    <div
      className="absolute right-6 flex flex-col gap-3 z-0 w-[280px]"
      style={{ top: 'calc(var(--menubar-h) + 12px)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5, ease: 'easeOut' }}
        className="flex items-center gap-2 px-1 text-[11px] uppercase tracking-widest text-white/85"
        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.55)' }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34c759] opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34c759]" />
        </span>
        Currently building
      </motion.div>

      {projects.map((p, i) => {
        const grad = GRADIENTS[p.slug] ?? 'linear-gradient(135deg, #0a84ff 0%, #5e5ce6 100%)';
        const subtitle = (p as { subtitle?: string }).subtitle;
        return (
          <motion.button
            key={p.slug}
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{
              y: -4,
              scale: 1.02,
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.55), 0 24px 48px rgba(0,0,0,0.42), 0 8px 16px rgba(0,0,0,0.22)',
              transition: { type: 'spring', stiffness: 320, damping: 22 },
            }}
            whileTap={{ scale: 0.985, y: 0 }}
            transition={{ delay: 1.1 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
            onClick={() => openApp('projects')}
            className="relative w-full h-[150px] rounded-2xl overflow-hidden text-left group"
            style={{
              background: grad,
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.4), 0 12px 32px rgba(0,0,0,0.32), 0 4px 8px rgba(0,0,0,0.18)',
              border: '1px solid rgba(255,255,255,0.18)',
            }}
            title={`Open ${p.title}`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.22),transparent_55%)] group-hover:bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.34),transparent_60%)] transition-[background] duration-300" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.18)_50%,transparent_70%)] bg-[length:240%_100%] bg-[position:120%_0] group-hover:bg-[position:-20%_0]" />

            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Visit ${p.title}`}
                className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur text-white opacity-80 group-hover:opacity-100 transition-opacity"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <div className="relative h-full flex flex-col justify-end p-4 text-white">
              <h3 className="text-2xl font-semibold tracking-tight drop-shadow group-hover:translate-x-0.5 transition-transform">{p.title}</h3>
              {subtitle && (
                <p className="text-[11px] text-white/80 mt-0.5" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
                  {subtitle}
                </p>
              )}
              <p
                className="text-[12px] text-white/85 line-clamp-2 mt-1.5 leading-snug"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.35)' }}
              >
                {p.description}
              </p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

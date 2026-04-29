import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import wallpaper from '../../img/wallpaper.jpg';
import { useOS } from '../../stores/useOS';
import Window from './Window';
import DesktopIcons from './DesktopIcons';
import BuildingWidgets from './BuildingWidgets';

export default function Desktop({ isMobile }: { isMobile: boolean }) {
  const windows = useOS((s) => s.windows);
  const order = useOS((s) => s.order);

  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('a, button, input, textarea')) e.preventDefault();
    };
    document.addEventListener('contextmenu', onContextMenu);
    return () => document.removeEventListener('contextmenu', onContextMenu);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30 pointer-events-none" />

      <DesktopIcons isMobile={isMobile} />
      <BuildingWidgets isMobile={isMobile} />

      <AnimatePresence>
        {order.map((id) => {
          const w = windows[id];
          if (!w) return null;
          return <Window key={id} instance={w} isMobile={isMobile} />;
        })}
      </AnimatePresence>
    </motion.div>
  );
}

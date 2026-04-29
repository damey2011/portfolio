import { motion } from 'framer-motion';
import { useBoot } from '../../hooks/useBoot';

export default function BootScreen() {
  const finishBoot = useBoot((s) => s.finishBoot);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.svg
        viewBox="0 0 64 64"
        className="w-20 h-20 mb-10"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <defs>
          <linearGradient id="boot-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#a0a0a8" />
          </linearGradient>
        </defs>
        <path
          d="M14 10 H32 C46 10 54 18 54 32 C54 46 46 54 32 54 H14 Z M22 18 V46 H32 C42 46 46 40 46 32 C46 24 42 18 32 18 Z"
          fill="url(#boot-grad)"
        />
      </motion.svg>

      <div className="w-48 h-1 rounded-full bg-white/15 overflow-hidden">
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.2 }}
          onAnimationComplete={() => setTimeout(finishBoot, 180)}
        />
      </div>

      <p className="mt-6 text-xs text-white/50 tracking-widest">DAMILOLA</p>
    </motion.div>
  );
}

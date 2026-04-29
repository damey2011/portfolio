import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

type Props = { src: string; alt: string; onClose: () => void };

export default function PhotoLightbox({ src, alt, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-md flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
      >
        <X className="w-5 h-5" />
      </button>
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 36 }}
        className="max-w-[90vw] max-h-[85vh] rounded-2xl shadow-2xl object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  );
}

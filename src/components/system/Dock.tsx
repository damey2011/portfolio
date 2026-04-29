import { useRef, useState, type RefObject } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Grid2x2, type LucideIcon } from "lucide-react";
import { useOS } from "../../stores/useOS";
import { APPS, APP_ORDER, EXTERNAL_LINKS } from "./AppRegistry";
import { cn } from "../../lib/glass";
import AppLauncher from "./AppLauncher";

const BASE = 48;
const PEAK = 80;

type IconBtnProps = {
  Icon: LucideIcon;
  iconColor: string;
  title: string;
  active: boolean;
  mouseX: MotionValue<number>;
  containerRef: RefObject<HTMLDivElement | null>;
  onClick?: () => void;
  href?: string;
};

function DockIcon({
  Icon,
  iconColor,
  title,
  active,
  mouseX,
  containerRef,
  onClick,
  href,
}: IconBtnProps) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const node = ref.current;
    const container = containerRef.current;
    if (!node || !container || val === Number.POSITIVE_INFINITY) return 9999;
    const rect = node.getBoundingClientRect();
    return val - (rect.left + rect.width / 2);
  });

  const sizeRaw = useTransform(distance, [-150, 0, 150], [BASE, PEAK, BASE]);
  const size = useSpring(sizeRaw, { mass: 0.1, stiffness: 200, damping: 15 });

  const content = (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      className="relative flex items-end justify-center"
      title={title}
    >
      <button
        onClick={onClick}
        aria-label={title}
        className="w-full h-full flex items-center justify-center rounded-2xl bg-white/40 dark:bg-white/10 border border-white/40 dark:border-white/10 shadow-md hover:brightness-110 transition-[filter]"
      >
        <Icon
          className="w-1/2 h-1/2"
          style={{ color: iconColor }}
          strokeWidth={2.2}
        />
      </button>
      <span
        className={cn(
          "absolute -bottom-1.5 w-1 h-1 rounded-full bg-fg/70 transition-opacity",
          active ? "opacity-100" : "opacity-0",
        )}
      />
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return content;
}

function MobileDock() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className="fixed left-1/2 -translate-x-1/2 z-40"
        style={{ bottom: 'calc(12px + env(safe-area-inset-bottom, 0px))' }}
      >
        <motion.button
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.4 }}
          onClick={() => setOpen(true)}
          aria-label="Open apps"
          className="glass-bar rounded-2xl w-16 h-16 flex items-center justify-center text-fg active:brightness-110"
          style={{
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,0.45), 0 12px 28px rgba(0,0,0,0.32)',
          }}
        >
          <Grid2x2 className="w-7 h-7" strokeWidth={2.4} />
        </motion.button>
      </div>
      <AnimatePresence>
        {open && <AppLauncher onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

export default function Dock({ isMobile }: { isMobile: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const openApp = useOS((s) => s.openApp);
  const windows = useOS((s) => s.windows);

  if (isMobile) return <MobileDock />;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 z-40 bottom-2">
      <motion.div
        ref={containerRef}
        onPointerMove={(e) => mouseX.set(e.clientX)}
        onPointerLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 28, delay: 0.4 }}
        className="glass-bar rounded-2xl flex items-end gap-1.5 px-3 py-2"
      >
        {APP_ORDER.map((appId) => {
          const app = APPS[appId];
          return (
            <DockIcon
              key={app.id}
              Icon={app.icon}
              iconColor={app.iconColor}
              title={app.title}
              active={Boolean(windows[app.id])}
              mouseX={mouseX}
              containerRef={containerRef}
              onClick={() => openApp(app.id)}
            />
          );
        })}
        <div className="self-center w-px h-10 mx-1 bg-fg/20" />
        {EXTERNAL_LINKS.map((link) => (
          <DockIcon
            key={link.id}
            Icon={link.icon}
            iconColor={link.iconColor}
            title={link.title}
            active={false}
            mouseX={mouseX}
            containerRef={containerRef}
            href={link.href}
          />
        ))}
      </motion.div>
    </div>
  );
}

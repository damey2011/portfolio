import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import BootScreen from './components/system/BootScreen';
import Desktop from './components/system/Desktop';
import MenuBar from './components/system/MenuBar';
import Dock from './components/system/Dock';
import WelcomeNotification from './components/system/WelcomeNotification';
import { useBoot } from './hooks/useBoot';
import { useTheme, applyThemeClass } from './stores/useTheme';
import { useOS, type AppId } from './stores/useOS';
import { APP_ORDER } from './components/system/AppRegistry';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isMobile;
}

function RouteSync() {
  const location = useLocation();
  const navigate = useNavigate();
  const openApp = useOS((s) => s.openApp);
  const focusedId = useOS((s) => s.focusedId);

  useEffect(() => {
    const path = location.pathname.replace(/^\//, '');
    if (path && (APP_ORDER as string[]).includes(path)) {
      openApp(path as AppId);
    }
  }, [location.pathname, openApp]);

  useEffect(() => {
    if (!focusedId) return;
    const target = `/${focusedId}`;
    if (location.pathname !== target) navigate(target, { replace: true });
  }, [focusedId, location.pathname, navigate]);

  return null;
}

export default function App() {
  const booted = useBoot((s) => s.booted);
  const mode = useTheme((s) => s.mode);
  const isMobile = useIsMobile();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    applyThemeClass(mode);
  }, [mode]);

  useEffect(() => {
    if (!booted) return;
    const path = window.location.hash.replace(/^#\//, '');
    if (path && (APP_ORDER as string[]).includes(path)) {
      useOS.getState().openApp(path as AppId);
      return;
    }
    const t = setTimeout(() => setShowWelcome(true), 700);
    return () => clearTimeout(t);
  }, [booted]);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <Desktop isMobile={isMobile} />
      <MenuBar isMobile={isMobile} />
      <Dock isMobile={isMobile} />
      <RouteSync />

      <AnimatePresence>
        {showWelcome && (
          <WelcomeNotification key="welcome" onDismiss={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>{!booted && <BootScreen key="boot" />}</AnimatePresence>
    </div>
  );
}

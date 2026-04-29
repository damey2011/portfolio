import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Apple, Sun, Moon, Wifi, BatteryFull, Search } from "lucide-react";
import dayjs from "dayjs";
import { useOS } from "../../stores/useOS";
import { useTheme } from "../../stores/useTheme";
import { APPS, APP_ORDER } from "./AppRegistry";

function useClock() {
  const [now, setNow] = useState(() => dayjs());
  useEffect(() => {
    const t = setInterval(() => setNow(dayjs()), 30_000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function MenuItem({
  children,
  onSelect,
}: {
  children: React.ReactNode;
  onSelect?: () => void;
}) {
  return (
    <DropdownMenu.Item
      onSelect={onSelect}
      className="px-3 py-1.5 text-sm rounded-md hover:bg-fg/10 outline-none cursor-default flex items-center"
    >
      {children}
    </DropdownMenu.Item>
  );
}

function Menu({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="px-2 py-0.5 rounded text-sm hover:bg-fg/10 outline-none data-[state=open]:bg-fg/10">
        {label}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={6}
          className="glass-window rounded-lg p-1 min-w-[200px] text-fg z-50"
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default function MenuBar({ isMobile }: { isMobile: boolean }) {
  const focusedId = useOS((s) => s.focusedId);
  const focusedTitle = focusedId
    ? APPS[useOS.getState().windows[focusedId]?.appId]?.title
    : "Finder";
  const openApp = useOS((s) => s.openApp);
  const closeWindow = useOS((s) => s.closeWindow);
  const { mode, toggle } = useTheme();
  const now = useClock();

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
      className="fixed top-0 inset-x-0 h-7 glass-bar text-fg z-50 flex items-center px-3 text-[13px] select-none py-4"
      style={
        isMobile
          ? {
              height: 'calc(1.75rem + env(safe-area-inset-top, 0px))',
              paddingTop: 'calc(1rem + env(safe-area-inset-top, 0px))',
            }
          : undefined
      }
    >
      <div className="flex items-center gap-1">
        <Menu label={<Apple className="w-4 h-4" strokeWidth={2.4} />}>
          <MenuItem>About this Portfolio</MenuItem>
          <DropdownMenu.Separator className="h-px bg-fg/15 my-1" />
          <MenuItem onSelect={() => openApp("about")}>Open About…</MenuItem>
          <MenuItem onSelect={() => openApp("resume")}>Open Résumé…</MenuItem>
          <DropdownMenu.Separator className="h-px bg-fg/15 my-1" />
          <MenuItem onSelect={() => location.reload()}>Restart</MenuItem>
        </Menu>

        <span className="px-2 font-semibold">{focusedTitle ?? "Finder"}</span>

        {!isMobile && (
          <>
            <Menu label="File">
              {APP_ORDER.map((id) => (
                <MenuItem key={id} onSelect={() => openApp(id)}>
                  Open {APPS[id].title}
                </MenuItem>
              ))}
              <DropdownMenu.Separator className="h-px bg-fg/15 my-1" />
              <MenuItem
                onSelect={() => {
                  if (focusedId) closeWindow(focusedId);
                }}
              >
                Close Window
              </MenuItem>
            </Menu>

            <Menu label="View">
              <MenuItem onSelect={toggle}>
                Toggle {mode === "dark" ? "Light" : "Dark"} Mode
              </MenuItem>
            </Menu>

            <Menu label="Help">
              <MenuItem
                onSelect={() =>
                  window.open(
                    "https://github.com/damey2011",
                    "_blank",
                    "noopener",
                  )
                }
              >
                GitHub
              </MenuItem>
              <MenuItem
                onSelect={() =>
                  window.open(
                    "https://linkedin.com/in/nifemi",
                    "_blank",
                    "noopener",
                  )
                }
              >
                LinkedIn
              </MenuItem>
            </Menu>
          </>
        )}

        {isMobile && (
          <Menu label="Apps">
            {APP_ORDER.map((id) => (
              <MenuItem key={id} onSelect={() => openApp(id)}>
                {APPS[id].title}
              </MenuItem>
            ))}
          </Menu>
        )}
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-3">
        {!isMobile && (
          <>
            <Wifi className="w-3.5 h-3.5 opacity-80" />
            <BatteryFull className="w-4 h-4 opacity-80" />
            <Search className="w-3.5 h-3.5 opacity-80" />
          </>
        )}
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="hover:bg-fg/10 rounded p-0.5"
        >
          {mode === "dark" ? (
            <Sun className="w-3.5 h-3.5" />
          ) : (
            <Moon className="w-3.5 h-3.5" />
          )}
        </button>
        <span className="tabular-nums text-[12px]">
          {now.format("ddd MMM D  HH:mm")}
        </span>
      </div>
    </motion.div>
  );
}

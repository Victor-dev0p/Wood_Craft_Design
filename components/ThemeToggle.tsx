"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";

export default function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isLight = mounted ? mode === "light" : true;

  return (
    <button
      onClick={toggleTheme}
      className="relative grid h-9 w-9 place-items-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-(--accent)"
      style={{
        borderColor: "var(--border-strong)",
        background: "transparent",
        color: "var(--text-main)",
      }}
      aria-label={mounted ? `Switch to ${isLight ? "dark" : "light"} mode` : "Toggle theme"}
      suppressHydrationWarning
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLight ? (
          <motion.div key="sun" initial={{ y: -12, opacity: 0, rotate: -40 }} animate={{ y: 0, opacity: 1, rotate: 0 }} exit={{ y: 12, opacity: 0, rotate: 40 }} transition={{ duration: 0.2 }}>
            <Sun className="w-4 h-4 stroke-[1.75]" />
          </motion.div>
        ) : (
          <motion.div key="moon" initial={{ y: -12, opacity: 0, rotate: -40 }} animate={{ y: 0, opacity: 1, rotate: 0 }} exit={{ y: 12, opacity: 0, rotate: 40 }} transition={{ duration: 0.2 }}>
            <Moon className="w-4 h-4 stroke-[1.75]" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
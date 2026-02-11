"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "blockchain-visualizer-theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY) as "dark" | "light" | null;
    const preferred = stored ?? "dark";
    setTheme(preferred);
    document.documentElement.setAttribute("data-theme", preferred === "light" ? "light" : "");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next === "light" ? "light" : "");
    localStorage.setItem(THEME_KEY, next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:opacity-90"
      style={{
        borderColor: "var(--border-ui)",
        backgroundColor: "var(--card-bg)",
        color: "var(--text-primary)",
      }}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
}

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Accent = "orange" | "green" | "blue" | "purple" | "gold";
export type Mode = "dark" | "light";

interface ThemeCtx {
  accent: Accent;
  mode: Mode;
  setAccent: (a: Accent) => void;
  setMode: (m: Mode) => void;
  toggleMode: () => void;
}

const Ctx = createContext<ThemeCtx | null>(null);

export const ACCENTS: { key: Accent; hex: string }[] = [
  { key: "orange", hex: "#ff6a2b" },
  { key: "green", hex: "#22e07a" },
  { key: "blue", hex: "#3aa2ff" },
  { key: "purple", hex: "#a970ff" },
  { key: "gold", hex: "#f0c04a" },
];

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [accent, setAccentState] = useState<Accent>("orange");
  const [mode, setModeState] = useState<Mode>("dark");

  useEffect(() => {
    const a = (localStorage.getItem("fr-accent") as Accent) || "orange";
    const m = (localStorage.getItem("fr-mode") as Mode) || "dark";
    setAccentState(a);
    setModeState(m);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-accent", accent);
    localStorage.setItem("fr-accent", accent);
  }, [accent]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", mode === "light");
    root.classList.toggle("dark", mode === "dark");
    localStorage.setItem("fr-mode", mode);
  }, [mode]);

  return (
    <Ctx.Provider
      value={{
        accent,
        mode,
        setAccent: setAccentState,
        setMode: setModeState,
        toggleMode: () => setModeState((m) => (m === "dark" ? "light" : "dark")),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useTheme() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useTheme must be used within ThemeProvider");
  return c;
}

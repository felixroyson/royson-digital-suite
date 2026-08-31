import { createFileRoute } from "@tanstack/react-router";
import { createPortal } from "react-dom";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  ArrowRight,
  Download,
  ArrowDown,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import portrait from "@/assets/hero-portrait.png";
console.log("Portrait URL:", portrait);
import { useTheme, type Accent } from "@/lib/theme";
export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Felix Royson — Cybersecurity Engineer & Researcher" },
      {
        name: "description",
        content:
          "Felix Royson A — Computer Science student specialising in cybersecurity, vulnerability assessment, and security research. Portfolio, projects, and publications.",
      },
      { property: "og:title", content: "Felix Royson — Cybersecurity Engineer & Researcher" },
      {
        property: "og:description",
        content:
          "Cybersecurity engineer & researcher. SOC dashboards, pentest platforms, Android security, and threat research.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

/* -------------------- REAL DATA -------------------- */

const CONTACT = {
  name: "Felix Royson A",
  email: "felixroys2004@gmail.com",
  gmail:
    "https://mail.google.com/mail/u/0/?fs=1&to=felixroys2004@gmail.com&tf=cm",
  github: "https://github.com/felixroyson/",
  linkedin: "https://www.linkedin.com/in/felix-royson-a-72894a374",
  location: "Thoothukudi, Tamil Nadu",
  resume: "/Felix_Royson_Resume.pdf",
};

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "research", label: "Research" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

/* -------------------- NAV -------------------- */

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] || "home");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);

  return active;
}

function Header() {
  const active = useActiveSection(NAV_LINKS.map((l) => l.id));
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border" : ""
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-10">
        <a href="#home" className="group flex items-center gap-3">
          <span
            className="grid h-10 w-10 place-items-center rounded-md border font-display text-sm font-bold tracking-tight"
            style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
          >
            FR
          </span>
          <span className="hidden font-display text-sm font-medium tracking-[0.25em] md:block">
            FELIX ROYSON
          </span>
        </a>

        <PokemonThemeSwitcher activeNavId={active} />
      </div>
    </header>
  );
}

/* -------------------- POKÉMON THEME SWITCHER & COMPANIONS -------------------- */

type PokeType = {
  key: Accent;
  label: string;
  pokemon: string;
  id: number;
  hex: string;
  sprite: string;
  ability: string;
};

const POKE_TYPES: PokeType[] = [
  {
    key: "orange",
    label: "Fire",
    pokemon: "Charizard",
    id: 6,
    hex: "#ff6a2b",
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/6.png",
    ability: "Firewall Shield",
  },
  {
    key: "green",
    label: "Grass",
    pokemon: "Bulbasaur",
    id: 1,
    hex: "#22c96b",
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/1.png",
    ability: "Encryption Vines",
  },
  {
    key: "blue",
    label: "Water",
    pokemon: "Greninja",
    id: 658,
    hex: "#3aa2ff",
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/658.png",
    ability: "Water Shuriken Security",
  },
  {
    key: "purple",
    label: "Ghost",
    pokemon: "Gengar",
    id: 94,
    hex: "#8a5cf6",
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/94.png",
    ability: "Shadow Audit",
  },
  {
    key: "gold",
    label: "Electric",
    pokemon: "Pikachu",
    id: 25,
    hex: "#f5d020",
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/25.png",
    ability: "Thunderbolt SOC",
  },
  {
    key: "pink",
    label: "Psychic",
    pokemon: "Mewtwo",
    id: 150,
    hex: "#ec4899",
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/150.png",
    ability: "Psystrike Intel",
  },
];

function FireRedPokeball({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.65)] ${className}`}
    >
      <defs>
        <radialGradient id="frRedGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ff3b3b" />
          <stop offset="45%" stopColor="#e11d48" />
          <stop offset="85%" stopColor="#881337" />
          <stop offset="100%" stopColor="#4c0519" />
        </radialGradient>

        <radialGradient id="frWhiteGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#f1f5f9" />
          <stop offset="85%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </radialGradient>
      </defs>

      <circle cx="50" cy="50" r="48" fill="#000000" />

      <g transform="rotate(-32 50 50)">
        <path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="url(#frRedGrad)" />

        <path d="M 4 50 A 46 46 0 0 0 96 50 Z" fill="url(#frWhiteGrad)" />

        <ellipse cx="26" cy="24" rx="14" ry="7.5" fill="#ffffff" fillOpacity="0.75" transform="rotate(-15 26 24)" />
        <circle cx="16" cy="32" r="2.8" fill="#ffffff" fillOpacity="0.85" />

        <rect x="4" y="44" width="92" height="12" fill="#090d16" />

        <circle cx="50" cy="50" r="16.5" fill="#090d16" stroke="#000000" strokeWidth="2.5" />

        <circle cx="50" cy="50" r="12" fill="#1e293b" />

        <circle cx="50" cy="50" r="8" fill="#ffffff" stroke="#090d16" strokeWidth="1.5" />
        <circle cx="47" cy="47" r="2.5" fill="#ffffff" />
      </g>
    </svg>
  );
}

const Real3DPokeball = FireRedPokeball;

function PokeballIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.5" />
      <path d="M3.5 12H9.5M14.5 12H20.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2.8" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="1.2" fill={color} />
    </svg>
  );
}



type BattleEffect = {
  pokemon: string;
  label: string;
  hex: string;
  sprite: string;
} | null;

function PokemonThemeSwitcher({ activeNavId }: { activeNavId: string }) {
  const { mode, toggleMode, accent, setAccent } = useTheme();
  const [battleEffect, setBattleEffect] = useState<BattleEffect>(null);

  const isDark = mode === "dark";
  const modePokemon = isDark ? "Lunala" : "Solgaleo";
  const modeSprite = isDark
    ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/792.png"
    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/791.png";
  const modeHex = isDark ? "#c9d2ff" : "#f5d020";

  const triggerBattle = (poke: { pokemon: string; label: string; hex: string; sprite: string }) => {
    setBattleEffect(poke);
    setTimeout(() => {
      setBattleEffect(null);
    }, 2800);
  };

  const handleToggleMode = () => {
    toggleMode();
    const nextIsDark = mode === "dark"; 
    triggerBattle({
      pokemon: nextIsDark ? "Solgaleo" : "Lunala",
      label: nextIsDark ? "Sun" : "Moon",
      hex: nextIsDark ? "#f5d020" : "#c9d2ff",
      sprite: nextIsDark
        ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/791.png"
        : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/792.png",
    });
  };

  const handleAccentChange = (t: (typeof POKE_TYPES)[0]) => {
    setAccent(t.key);
    triggerBattle({
      pokemon: t.pokemon,
      label: t.label,
      hex: t.hex,
      sprite: t.sprite,
    });
  };

  return (
    <>
      <div className="flex items-center gap-6">
        <nav className="hidden items-center gap-2 md:flex">
          <PokeButton
            label={isDark ? "Moon (Lunala)" : "Sun (Solgaleo)"}
            pokemon={modePokemon}
            sprite={modeSprite}
            hex={modeHex}
            active={true}
            onClick={handleToggleMode}
            isThemeToggle
          >
            {isDark ? <PokeMoonIcon size={18} /> : <PokeSunIcon size={18} />}
          </PokeButton>

          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="group relative px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className={activeNavId === l.id ? "text-foreground" : ""}>{l.label}</span>
              {activeNavId === l.id && (
                <motion.span
                  layoutId="nav-dot"
                  className="absolute left-1/2 -bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {POKE_TYPES.map((t) => {
            const active = accent === t.key;
            return (
              <PokeButton
                key={t.key}
                label={t.label}
                pokemon={t.pokemon}
                sprite={t.sprite}
                hex={t.hex}
                active={active}
                onClick={() => handleAccentChange(t)}
              />
            );
          })}
        </div>
      </div>

      <PokemonBattleOverlay
        battleEffect={battleEffect}
        onClose={() => setBattleEffect(null)}
      />
    </>
  );
}

function PokemonBattleOverlay({
  battleEffect,
  onClose,
}: {
  battleEffect: BattleEffect;
  onClose: () => void;
}) {
  if (!battleEffect || typeof document === "undefined") return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[999999] flex items-center justify-center overflow-hidden font-mono bg-background/85 backdrop-blur-xl">
      {/* Background Cyber Matrix Grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Cyber HUD Ambient Flash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0.3, 0] }}
        transition={{ duration: 2.4, times: [0, 0.3, 0.7, 1] }}
        className="absolute inset-0 z-10"
        style={{
          background: `radial-gradient(circle at 50% 45%, ${battleEffect.hex}cc 0%, ${battleEffect.hex}44 45%, transparent 80%)`,
        }}
      />

      {/* ================= CYBERSECURITY HUD CUT-IN STRIPE ================= */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: ["-100%", "0%", "0%", "100%"] }}
        transition={{ duration: 1.35, times: [0, 0.25, 0.75, 1], ease: "easeInOut" }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 flex h-36 items-center border-y-2 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden"
        style={{
          borderColor: battleEffect.hex,
          background: `linear-gradient(90deg, #090d16 0%, color-mix(in oklab, ${battleEffect.hex} 35%, #090d16) 35%, color-mix(in oklab, ${battleEffect.hex} 50%, #090d16) 65%, #090d16 100%)`,
        }}
      >
        {/* Animated Cyber Grid Lines */}
        <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_16px,#ffffff_16px,#ffffff_17px)] animate-marquee-slow" />
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.8)_51%)] bg-[length:100%_4px]" />

        <div className="relative mx-auto flex w-full max-w-[1400px] items-center justify-between px-10">
          {/* Left: Security Researcher Avatar Badge */}
          <div className="flex items-center gap-6">
            {/* Cyber Shield Badge */}
            <div
              className="relative flex h-20 w-20 items-center justify-center rounded-xl border-2 bg-surface-1 shadow-[0_0_20px_rgba(0,0,0,0.8)] overflow-hidden"
              style={{ borderColor: battleEffect.hex }}
            >
              <div className="absolute inset-0 bg-grid-white/10" />
              <ShieldCheck size={38} style={{ color: battleEffect.hex }} className="animate-pulse" />
              <span
                className="absolute bottom-1 font-mono text-[9px] font-black uppercase tracking-widest px-1 rounded"
                style={{ background: battleEffect.hex, color: "#000000" }}
              >
                SOC-X
              </span>
            </div>

            {/* Cyber HUD Text Info */}
            <div className="flex flex-col">
              <span className="font-display text-3xl font-black uppercase tracking-wider text-foreground drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] md:text-4xl">
                <span style={{ color: battleEffect.hex }}>{battleEffect.pokemon.toUpperCase()}</span>! I CHOOSE YOU!
              </span>
            </div>
          </div>

          {/* Right: Cyber HUD Lock-on Target & Spinning 3D Pokeball */}
          <div className="relative flex items-center justify-center">
            <div
              className="absolute h-20 w-20 rounded-full border border-dashed animate-spin-slow"
              style={{ borderColor: `${battleEffect.hex}88` }}
            />
            <Real3DPokeball size={44} className="animate-spin" />
          </div>
        </div>
      </motion.div>

      {/* 1. Real 3D Pokéball Throw Arc */}
      <motion.div
        initial={{ x: "-30vw", y: "20vh", rotate: 0, scale: 0.6, opacity: 0 }}
        animate={{
          x: ["-30vw", "0vw"],
          y: ["20vh", "-10vh", "0vh"],
          rotate: [0, 720, 1080],
          scale: [0.6, 1.8, 1],
          opacity: [0, 1, 1, 0],
        }}
        transition={{ delay: 0.6, duration: 0.6, times: [0, 0.2, 0.85, 1], ease: "easeOut" }}
        className="absolute z-50 flex h-20 w-20 items-center justify-center"
      >
        <Real3DPokeball size={64} />
      </motion.div>

      {/* 2. Open Pokéball Flash Explosion at Center */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 2.8, 0], opacity: [0, 1, 0] }}
        transition={{ delay: 1.15, duration: 0.5 }}
        className="absolute z-50 h-44 w-44 rounded-full"
        style={{
          background: `radial-gradient(circle, #ffffff 0%, ${battleEffect.hex} 65%, transparent 100%)`,
          boxShadow: `0 0 120px ${battleEffect.hex}`,
        }}
      />

      {/* 3. Emerging Pokémon Sprite in Center Section */}
      <motion.div
        initial={{ scale: 0, opacity: 0, y: 40 }}
        animate={{ scale: [0, 1.6, 1.3], opacity: [0, 1, 1, 0], y: [40, -16, 0] }}
        transition={{ delay: 1.2, duration: 1.45, times: [0, 0.35, 0.75, 1] }}
        className="relative z-50 flex flex-col items-center justify-center"
      >
        <img
          src={battleEffect.sprite}
          alt={battleEffect.pokemon}
          className="h-44 w-44 object-contain image-rendering-pixelated filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.9)]"
        />
        {/* Shockwave Ring */}
        <motion.div
          initial={{ scale: 0.2, opacity: 1 }}
          animate={{ scale: 2.8, opacity: 0 }}
          transition={{ delay: 1.25, duration: 0.75 }}
          className="absolute h-52 w-52 rounded-full border-4"
          style={{ borderColor: battleEffect.hex }}
        />
      </motion.div>

      {/* 4. GBA Battle Status Message Banner */}
      <motion.div
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: [90, 0, 0, 90], opacity: [0, 1, 1, 0] }}
        transition={{ delay: 1.1, duration: 1.5, times: [0, 0.25, 0.8, 1] }}
        className="absolute bottom-8 z-[105] flex items-center gap-4 rounded-xl border-4 bg-background/95 px-8 py-4 shadow-[8px_8px_0px_rgba(0,0,0,0.85)] backdrop-blur-2xl font-mono"
        style={{ borderColor: battleEffect.hex }}
      >
        <Real3DPokeball size={36} />
        <div className="flex flex-col">
          <span className="font-mono text-lg font-extrabold uppercase tracking-wider text-foreground">
            <span style={{ color: battleEffect.hex }}>{battleEffect.pokemon.toUpperCase()}</span>! I CHOOSE YOU!
          </span>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

function PokeButton({
  hex,
  active,
  label,
  pokemon,
  sprite,
  onClick,
  isThemeToggle = false,
  children,
}: {
  hex: string;
  active: boolean;
  label: string;
  pokemon?: string;
  sprite?: string;
  onClick: () => void;
  isThemeToggle?: boolean;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hover, setHover] = useState(false);

  // magnetic pull
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };
  const onLeave = () => {
    setHover(false);
    if (ref.current) ref.current.style.transform = "";
  };

  const ambient = `radial-gradient(circle at 50% 50%, ${hex}66, transparent 75%)`;
  const isRevealed = active || hover;

  if (isThemeToggle) {
    return (
      <div className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-2 rounded-full transition-opacity duration-500"
          style={{ background: ambient, opacity: hover ? 0.8 : 0.45, filter: "blur(6px)" }}
        />
        <button
          ref={ref}
          aria-label={label}
          onClick={onClick}
          onMouseMove={onMove}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={onLeave}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 overflow-hidden"
          style={{
            borderColor: hover ? hex : `${hex}99`,
            background: `radial-gradient(circle at 50% 40%, ${hex}28, color-mix(in oklab, var(--background) 65%, transparent))`,
            boxShadow: hover
              ? `inset 0 0 10px ${hex}44, 0 4px 14px -6px ${hex}66`
              : `inset 0 0 6px ${hex}22`,
            color: "var(--foreground)",
          }}
          title={label}
        >
          {sprite ? (
            <div className="flex h-full w-full items-center justify-center p-0.5">
              <motion.img
                key={pokemon}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                src={sprite}
                alt={pokemon}
                className="max-h-8 max-w-8 object-contain object-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] image-rendering-pixelated"
              />
            </div>
          ) : (
            children
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* ambient glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-2 rounded-full transition-opacity duration-500"
        style={{
          background: ambient,
          opacity: isRevealed ? 0.85 : 0.25,
          filter: "blur(8px)",
        }}
      />
      {/* pulse ring when active */}
      {active && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full animate-poke-ring"
          style={{ boxShadow: `0 0 0 2px ${hex}` }}
        />
      )}

      <button
        ref={ref}
        aria-label={`${pokemon || label} Theme`}
        aria-pressed={active}
        onClick={onClick}
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={onLeave}
        className={`relative flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 ease-out overflow-hidden ${
          active ? "animate-poke-breath" : ""
        }`}
        style={{
          borderColor: active ? hex : hover ? `${hex}aa` : "color-mix(in oklab, var(--foreground) 14%, transparent)",
          background: active
            ? `radial-gradient(circle at 50% 40%, ${hex}33, color-mix(in oklab, var(--background) 75%, transparent))`
            : hover
              ? `radial-gradient(circle at 50% 40%, ${hex}22, color-mix(in oklab, var(--background) 65%, transparent))`
              : "color-mix(in oklab, var(--background) 55%, transparent)",
          boxShadow: active
            ? `inset 0 0 12px ${hex}55, 0 6px 20px -6px ${hex}80`
            : hover
              ? `inset 0 0 10px ${hex}33, 0 4px 14px -6px ${hex}55`
              : `inset 0 0 6px ${hex}18`,
          color: isRevealed ? hex : "var(--foreground)",
        }}
      >
        {isRevealed && sprite && pokemon ? (
          <div className="flex h-full w-full items-center justify-center p-1">
            <motion.img
              key={pokemon}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              src={sprite}
              alt={pokemon}
              className="max-h-7 max-w-7 object-contain object-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] image-rendering-pixelated"
            />
          </div>
        ) : (
          <PokeballIcon size={18} color={hex} />
        )}
      </button>
    </div>
  );
}

function PokemonCompanionWidget() {
  const { accent, setAccent } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [cheering, setCheering] = useState(false);

  const activePoke = POKE_TYPES.find((t) => t.key === accent) || POKE_TYPES[0];

  const handleSparkle = () => {
    setCheering(true);
    setTimeout(() => setCheering(false), 1200);
  };

  return (
    <aside aria-label="Pokémon Security Partner" className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 font-mono">
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 16 }}
            className="relative flex items-center gap-3.5 rounded-lg border-2 bg-background/95 p-3 shadow-[6px_6px_0px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all"
            style={{
              borderColor: activePoke.hex,
            }}
          >
            {/* GBA Vintage Pixel Sprite Button */}
            <button
              onClick={handleSparkle}
              title={`Click ${activePoke.pokemon} to cheer!`}
              className="relative group flex h-14 w-14 items-center justify-center rounded border bg-surface-1/80 p-1 transition-transform hover:scale-105 active:scale-95"
              style={{ borderColor: `${activePoke.hex}88` }}
            >
              <motion.img
                key={activePoke.key}
                src={activePoke.sprite}
                alt={activePoke.pokemon}
                animate={cheering ? { y: [-6, 0, -6], rotate: [0, -8, 8, 0] } : { y: [0, -2, 0] }}
                transition={{ duration: cheering ? 0.35 : 1.8, repeat: cheering ? 3 : Infinity }}
                className="h-12 w-12 object-contain image-rendering-pixelated filter drop-shadow-[2px_2px_0px_rgba(0,0,0,0.7)]"
              />
              <span
                className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded text-[9px] font-bold text-background shadow"
                style={{ background: activePoke.hex }}
              >
                ★
              </span>
            </button>

            {/* FireRed GBA Status Box */}
            <div className="flex flex-col pr-1 min-w-[150px]">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-foreground">
                  {activePoke.pokemon}
                </span>
                <span className="font-mono text-[10px] font-bold text-emerald-400">
                  :L100
                </span>
              </div>

              {/* GBA HP Bar */}
              <div className="mt-1 flex items-center gap-1.5">
                <span className="font-mono text-[9px] font-bold text-muted-foreground">HP</span>
                <div className="h-2 flex-1 rounded-sm border border-foreground/30 bg-muted/60 p-0.5">
                  <div className="h-full w-full rounded-xs bg-emerald-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]" />
                </div>
              </div>

              <span className="font-mono text-[9.5px] text-muted-foreground mt-1 tracking-tight">
                {activePoke.ability}
              </span>

              {/* Pokéball Switcher */}
              <div className="mt-2 flex items-center gap-1.5">
                {POKE_TYPES.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setAccent(t.key)}
                    title={`Switch partner to ${t.pokemon} (${t.label})`}
                    className={`h-3 w-3 rounded-full transition-all ${
                      accent === t.key ? "scale-125 ring-2 ring-foreground" : "opacity-40 hover:opacity-100"
                    }`}
                    style={{ background: t.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Minimize button */}
            <button
              onClick={() => setCollapsed(true)}
              className="ml-0.5 text-muted-foreground transition-colors hover:text-foreground p-1 text-xs"
              title="Minimize GBA Companion"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Icon when collapsed */}
      {collapsed && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setCollapsed(false)}
          className="group flex h-12 w-12 items-center justify-center rounded-lg border-2 bg-background/95 shadow-[4px_4px_0px_rgba(0,0,0,0.6)] transition-transform hover:scale-110"
          style={{ borderColor: activePoke.hex }}
          title={`Summon ${activePoke.pokemon}`}
        >
          <img
            src={activePoke.sprite}
            alt={activePoke.pokemon}
            className="h-9 w-9 object-contain image-rendering-pixelated filter drop-shadow-[2px_2px_0px_rgba(0,0,0,0.6)]"
          />
        </motion.button>
      )}
    </aside>
  );
}

/* -------------------- POKÉMON ICONS (custom SVG) -------------------- */

function FireIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c1.2 3 4.5 4.2 4.5 8.5a4.5 4.5 0 1 1-9 0c0-1.6.7-2.6 1.7-3.4-.1 1.4.7 2.2 1.5 2.2 1 0 1.4-.9 1-2C11.2 6.6 11 4.8 12 3z"
        fill="currentColor" opacity="0.95"/>
    </svg>
  );
}
function GrassIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c5 2 8 5.5 8 10 0 4.5-3.6 8-8 8s-8-3.5-8-8c0-1.6.4-3 1.1-4.2C7.2 10.6 9.4 11 12 11c0-3 0-6 0-8z"
        fill="currentColor" opacity="0.95"/>
      <path d="M12 21V11" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2"/>
    </svg>
  );
}
function WaterIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.5c-4 5.5-6.5 9-6.5 12a6.5 6.5 0 0 0 13 0c0-3-2.5-6.5-6.5-12z"
        fill="currentColor" opacity="0.95"/>
    </svg>
  );
}
function DarkIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.95"/>
      <path d="M14.5 4.5a7.5 7.5 0 0 0 0 15 8 8 0 0 1 0-15z" fill="rgba(255,255,255,0.18)"/>
    </svg>
  );
}
function ElectricIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinejoin="round">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" fill="currentColor" opacity="0.95"/>
    </svg>
  );
}
function PsychicIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  );
}
function DragonIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18C4 16 3 13 4 10C5 7 8 5 12 5C16 5 19 7 20 10C21 13 20 16 18 18" />
      <path d="M12 5V21" />
      <path d="M8 12L12 8L16 12" />
    </svg>
  );
}
function PokeSunIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>
    </svg>
  );
}
function PokeMoonIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>
    </svg>
  );
}

/* -------------------- BACKGROUND -------------------- */

function CyberBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(600px 400px at 80% 30%, color-mix(in oklab, var(--accent) 18%, transparent), transparent 60%)",
        }}
      />
      <div className="noise-overlay" />
    </div>
  );
}

/* -------------------- SOCIAL RAIL -------------------- */

function SocialRail() {
  const items = [
    { icon: Github, href: CONTACT.github, label: "GitHub" },
    { icon: Linkedin, href: CONTACT.linkedin, label: "LinkedIn" },
    { icon: Mail, href: CONTACT.gmail, label: "Email" },
  ];
  return (
    <div className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-5 2xl:flex">
      {items.map((it) => (
        <a
          key={it.label}
          href={it.href}
          target="_blank"
          rel="noreferrer"
          aria-label={it.label}
          className="group rounded-lg p-2 text-muted-foreground transition-all hover:bg-accent/10 hover:text-accent hover:scale-110"
        >
          <it.icon size={18} strokeWidth={1.5} />
        </a>
      ))}
      <div className="mt-2 h-20 w-px bg-border" />
    </div>
  );
}

/* -------------------- 3D TILT WRAPPER -------------------- */

function Tilt3D({
  children,
  className,
  intensity = 10,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 200, damping: 20 });
  const ry = useSpring(0, { stiffness: 200, damping: 20 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * intensity * 2);
        rx.set(-py * intensity * 2);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------- HERO -------------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 22]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden pt-24 pb-20 max-w-full"
      style={{ perspective: "1400px" }}
    >
      <CyberBackdrop />

      <motion.div
        style={{ y, rotateX, scale, opacity, transformStyle: "preserve-3d", transformOrigin: "50% 100%" }}
        className="relative mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-6 pt-8 md:px-10 lg:px-12 2xl:pl-28 2xl:pr-12 lg:grid-cols-[1.15fr_1fr] lg:pt-12 overflow-hidden"
      >
        <div className="flex flex-col justify-center min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground"
          >
            <span className="h-px w-10" style={{ background: "var(--accent)" }} />
            <span className="text-accent">I'm Felix Royson</span>
          </motion.div>

          <h1 className="font-display text-[12vw] leading-[0.92] font-bold tracking-[-0.04em] md:text-[7.5vw] lg:text-[5.2vw] xl:text-[5.5vw] 2xl:text-[6vw] max-w-full overflow-hidden break-words">
            <SplitLine delay={0.1}>CYBERSECURITY</SplitLine>
            <br />
            <SplitLine delay={0.25}>ENGINEER.</SplitLine>
            <br />
            <span className="text-accent">
              <SplitLine delay={0.4}>RESEARCHER.</SplitLine>
            </span>
            <br />
            <SplitLine delay={0.55}>BUILDER.</SplitLine>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="mt-8 flex flex-col gap-6"
          >
            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
              M.Tech CSE student specialising in cybersecurity — building SOC
              dashboards, pentest platforms, and Android security frameworks.
              Currently exploring cloud and network security.
            </p>
            <div className="flex flex-wrap items-center gap-5 pt-1">
              <MagneticButton>
                <a
                  href="#work"
                  className="group inline-flex items-center gap-3 rounded-full border-2 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.25em] transition-all hover:glow-accent"
                  style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
                >
                  Explore My Work
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
              </MagneticButton>
              <a
                href={CONTACT.resume}
                download
                className="group inline-flex items-center gap-2 border-b pb-1 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors hover:text-accent"
                style={{ borderColor: "var(--accent)" }}
              >
                Download CV
                <Download size={13} />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="relative flex items-center justify-center" style={{ perspective: "1200px" }}>
          <PortraitFrame />
        </div>
      </motion.div>

      <div className="pointer-events-none select-none relative bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </div>
    </section>
  );
}

function SplitLine({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden align-top">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function PortraitFrame() {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 120, damping: 18 });
  const ry = useSpring(0, { stiffness: 120, damping: 18 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * 14);
        rx.set(-py * 14);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
      }}
      className="relative aspect-[4/5] w-full max-w-[520px]"
    >
      {/* Radar rings — behind the portrait */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ transform: "translateZ(-40px)" }}
      >
        <div
          className="animate-radar-spin absolute h-[108%] w-[108%] rounded-full border"
          style={{ borderColor: "color-mix(in oklab, var(--accent) 22%, transparent)" }}
        />
        <div
          className="absolute h-[86%] w-[86%] rounded-full border"
          style={{ borderColor: "color-mix(in oklab, var(--accent) 30%, transparent)" }}
        />
      </div>

      {/* Framed portrait — clean editorial card, works in both modes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transform: "translateZ(60px)" }}
        className="relative h-full w-full overflow-hidden rounded-md"
      >
        {/* Accent halo — sits BEHIND the image, no odd blend on light bg */}
        <div
          aria-hidden
          className="absolute -inset-8 -z-10 rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--accent) 45%, transparent), transparent 75%)",
          }}
        />

        {/* Portrait card */}
        <div
          className="relative h-full w-full overflow-hidden rounded-md border"
          style={{
            borderColor: "var(--hairline)",
            background: "var(--surface-1)",
          }}
        >
          <img
            src={portrait}
            alt="Felix Royson"
            width={1024}
            height={1280}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover"
            style={{ filter: "contrast(1.05) saturate(0.9)" }}
          />
          {/* Bottom gradient — readable in both modes */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/3"
            style={{
              background:
                "linear-gradient(to top, color-mix(in oklab, var(--background) 92%, transparent), transparent)",
            }}
          />
          {/* Subtle accent tint */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-25"
            style={{
              background:
                "linear-gradient(135deg, transparent 55%, color-mix(in oklab, var(--accent) 55%, transparent))",
              mixBlendMode: "screen",
            }}
          />
          {/* Caption */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/80">
            <span>FR · 2026</span>
            <span className="text-accent">// analyst</span>
          </div>
        </div>
      </motion.div>

      {/* Corner ticks */}
      {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((p) => (
        <span
          key={p}
          className={`absolute ${p} h-4 w-4`}
          style={{
            borderColor: "var(--accent)",
            borderStyle: "solid",
            borderTopWidth: p.includes("top") ? 2 : 0,
            borderBottomWidth: p.includes("bottom") ? 2 : 0,
            borderLeftWidth: p.includes("left") ? 2 : 0,
            borderRightWidth: p.includes("right") ? 2 : 0,
            transform: "translateZ(80px)",
          }}
        />
      ))}
    </motion.div>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translate(0,0)";
      }}
      className="inline-block transition-transform duration-300 ease-out"
    >
      {children}
    </div>
  );
}

/* -------------------- SECTION HEADER -------------------- */

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-16 flex items-end justify-between border-b border-border pb-4">
      <div className="flex items-baseline gap-6">
        <span className="font-display text-4xl font-bold text-accent md:text-5xl">
          {number}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          {title}
        </span>
      </div>
      <span className="h-px w-16 bg-accent" />
    </div>
  );
}

/* -------------------- SCROLL-3D SECTION WRAPPER -------------------- */

function Scroll3DSection({
  children,
  id,
  className,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [12, 0, 0, -8]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.4]);

  return (
    <section
      id={id}
      ref={ref}
      className={`relative px-6 py-32 md:px-10 lg:pl-24 lg:pr-12 ${className ?? ""}`}
      style={{ perspective: "1600px" }}
    >
      <motion.div
        style={{
          rotateX,
          y,
          opacity,
          transformStyle: "preserve-3d",
          transformOrigin: "50% 50%",
        }}
        className="mx-auto max-w-[1600px]"
      >
        {children}
      </motion.div>
    </section>
  );
}

/* -------------------- ABOUT -------------------- */

function About() {
  const skills = [
    "Vulnerability Assessment",
    "OWASP Top 10",
    "Web App Security",
    "Nmap",
    "Burp Suite",
    "Wireshark",
    "Metasploit",
    "TCP/IP",
    "DNS",
    "Python",
    "Linux",
    "Git & GitHub",
  ];
  return (
    <Scroll3DSection id="about">
      <SectionLabel number="01" title="Who I Am" />

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            I don't just <br />
            <span className="italic font-light">code.</span> I engineer{" "}
            <span className="text-accent">trust.</span>
          </h2>
          <p className="mt-10 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Computer Science Engineering student at Erode Sengunthar Engineering
            College (Integrated M.Tech, CGPA 8.18), specialising in
            cybersecurity. Experienced in security operations dashboards,
            vulnerability assessment, and web application security. Currently
            exploring cloud security, network security, and mobile threat
            monitoring.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 text-sm text-muted-foreground sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <MapPin size={14} className="text-accent" />
              {CONTACT.location}
            </div>
            <div className="flex items-center gap-3">
              <Mail size={14} className="text-accent" />
              {CONTACT.email}
            </div>
          </div>

        </div>

        <div className="space-y-6">
          {[
            { n: "01", t: "Cybersecurity" },
            { n: "02", t: "Cloud Security" },
            { n: "03", t: "Android Security" },
            { n: "04", t: "Threat Research" },
            { n: "05", t: "Web App Security" },
          ].map((f) => (
            <div
              key={f.n}
              className="group flex items-center justify-between border-b border-border py-4 transition-colors hover:border-accent"
            >
              <div className="flex items-center gap-6">
                <span className="font-mono text-xs text-accent">{f.n}</span>
                <span className="font-display text-xl tracking-tight md:text-2xl">
                  {f.t}
                </span>
              </div>
              <ArrowUpRight
                size={18}
                className="text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
              />
            </div>
          ))}
        </div>
      </div>
    </Scroll3DSection>
  );
}

/* -------------------- WORK -------------------- */

const PROJECTS = [
  {
    name: "SOC-X",
    tag: "Security Ops Center",
    period: "Jul 2025 — Aug 2025",
    desc: "A security operations web dashboard that ingests events from a Flask API and surfaces them as alerts and incidents. Analyses events for threat level and runs SOAR-style responses — playbook execution, brute-force blocking, vulnerability scanning, and malware quarantine.",
    stack: ["Flask", "SIEM", "SOAR", "Python"],
    href: "https://github.com/felixroyson/soc-command-center",
  },
  {
    name: "PUP",
    tag: "Pentest Unified Platform",
    period: "Oct 2025 — Dec 2025",
    desc: "A simulation-based SOC and penetration testing dashboard demonstrating security analysis workflows. Visualises simulated packet traffic, vulnerability insights, and attack surface mapping to teach defensive monitoring techniques.",
    stack: ["Python", "Pentest", "Simulation"],
    href: "https://github.com/felixroyson/pup",
  },
  {
    name: "F.A.S.A",
    tag: "File Automation & Security",
    period: "Feb 2026 — Apr 2026",
    desc: "A secure file analysis and automation platform that monitors and organises system files. Automated scanning, structured categorisation, and an interactive web interface for analysing file metadata and system storage patterns — built with a modular, security-focused architecture.",
    stack: ["Python", "Automation", "Web"],
    href: "https://github.com/felixroyson/trusty-file-protector",
  },
  {
    name: "S.H.I.E.L.D.",
    tag: "Trusted Handover Framework",
    period: "Jun 2026 —",
    desc: "A privacy-preserving Android cybersecurity framework addressing the Trusted Handover Problem — delegated access control, OTP-based authorization, device monitoring, risk assessment, and tamper-evident audit logging for smartphone repair scenarios.",
    stack: ["Android", "Privacy", "Cryptography"],
    href: CONTACT.github,
  },
];

function ProjectCard({ p, i }: { p: (typeof PROJECTS)[number]; i: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rx = useSpring(0, { stiffness: 220, damping: 22 });
  const ry = useSpring(0, { stiffness: 220, damping: 22 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const rafRef = useRef<number | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const r = el.getBoundingClientRect();
      const px = (clientX - r.left) / r.width - 0.5;
      const py = (clientY - r.top) / r.height - 0.5;
      ry.set(px * 8);
      rx.set(-py * 8);
      gx.set(((clientX - r.left) / r.width) * 100);
      gy.set(((clientY - r.top) / r.height) * 100);
    });
  };
  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const glow = useTransform(
    [gx, gy],
    ([x, y]) =>
      `radial-gradient(400px circle at ${x}% ${y}%, color-mix(in oklab, var(--accent) 18%, transparent), transparent 60%)`,
  );

  return (
    <motion.a
      ref={ref}
      href={p.href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
      className="group relative flex flex-col justify-between overflow-hidden bg-background p-10 transition-colors duration-500 hover:bg-[var(--surface-1)]"
    >
      {/* Pointer-tracking glow */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glow as unknown as string }}
      />

      <div className="relative flex items-start justify-between" style={{ transform: "translateZ(30px)" }}>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
            0{i + 1} — {p.tag}
          </span>
          <span className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground">
            {p.period}
          </span>
        </div>
        <ArrowUpRight
          size={20}
          className="text-muted-foreground transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
        />
      </div>

      <div
        className="relative mt-20 transition-transform duration-500 ease-out"
        style={{ transform: "translateZ(50px)" }}
      >
        <h3 className="font-display text-5xl font-bold leading-none tracking-tight md:text-7xl">
          {p.name}
        </h3>
        <p className="mt-6 max-w-md text-sm text-muted-foreground md:text-base">
          {p.desc}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <span
        className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 ease-out group-hover:w-full"
        style={{ background: "var(--accent)" }}
      />
    </motion.a>
  );
}

function Work() {
  return (
    <section id="work" className="relative px-6 py-32 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel number="02" title="Featured Work" />

        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}


/* -------------------- RESEARCH & CERTIFICATIONS -------------------- */

const RESEARCH = [
  {
    name: "SecureVault",
    status: "Research",
    desc: "A research initiative into hardened, privacy-preserving secret storage — exploring key derivation, tamper-evident vault design, and secure recovery flows for personal and organisational data.",
  },
];

const ONGOING = [
  {
    name: "A.E.G.I.E.S",
    status: "Ongoing",
    desc: "A personal safety and monitoring companion app — real-time alerts, trusted contact escalation, and privacy-first location signals designed for high-risk everyday scenarios.",
  },
  {
    name: "Wild Guard",
    status: "Ongoing",
    desc: "An early-warning platform for human-wildlife conflict — combining sensor data, ML classification, and community alerts to protect both people and wildlife in rural corridors.",
  },
];

const CERTIFICATIONS = [
  {
    venue: "Google · Coursera",
    title: "Google Cybersecurity Professional Certificate",
    year: "Ongoing",
  },
  {
    venue: "Infosys Springboard",
    title: "Cybersecurity Fundamentals",
    year: "2025",
  },
  {
    venue: "Infosys Springboard",
    title: "Introduction to Python",
    year: "2024",
  },
  {
    venue: "HACKZILLA 2k25 · KPRIET",
    title: "Best Innovative Idea Award — Modus Mapping",
    year: "2025",
  },
  {
    venue: "VYASA 2K26 · ESEC",
    title: "2nd Prize — Inter College Event",
    year: "2026",
  },
];

function ResearchCard({
  item,
  i,
}: {
  item: { name: string; status: string; desc: string };
  i: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden border border-border p-8 transition-all duration-500 hover:border-accent hover:-translate-y-1"
    >
      <div className="flex items-center justify-between">
        <span
          className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]"
          style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
        >
          {item.status}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          0{i + 1}
        </span>
      </div>
      <h3 className="mt-16 font-display text-3xl font-bold leading-tight">
        {item.name}
      </h3>
      <p className="mt-4 text-sm text-muted-foreground">{item.desc}</p>
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: "var(--accent)" }}
      />
    </motion.div>
  );
}

function Research() {
  return (
    <Scroll3DSection id="research">
      <SectionLabel number="03" title="Research" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {RESEARCH.map((r, i) => (
          <ResearchCard key={r.name} item={r} i={i} />
        ))}
      </div>

      <div className="mt-24">
        <div className="mb-8 flex items-baseline gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Ongoing Projects
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {ONGOING.map((r, i) => (
            <ResearchCard key={r.name} item={r} i={i} />
          ))}
        </div>
      </div>

      <div className="mt-24">
        <div className="mb-8 flex items-baseline gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Certifications & Achievements
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="divide-y divide-border">
          {CERTIFICATIONS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 py-6 transition-colors hover:text-accent"
            >

              <span className="font-mono text-xs text-accent">{p.year}</span>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {p.venue}
                </div>
                <div className="mt-1 font-display text-lg tracking-tight md:text-xl">
                  {p.title}
                </div>
              </div>
              <ArrowUpRight
                size={18}
                className="text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </Scroll3DSection>
  );
}

/* -------------------- JOURNEY -------------------- */

const TIMELINE = [
  {
    year: "2022",
    items: [
      "Started Integrated M.Tech in CSE at Erode Sengunthar Engineering College",
    ],
  },
  {
    year: "2025",
    items: [
      "SOC-X — Security Operations Dashboard",
      "PUP — Pentest Unified Platform",
      "HACKZILLA 2k25 — Best Innovative Idea Award",
      "BitNBuild'25 State Round — Finalist",
    ],
  },
  {
    year: "2026",
    items: [
      "F.A.S.A — File Automation & Security Assistance",
      "S.H.I.E.L.D. — Trusted Handover Framework",
      "VYASA 2K26 — 2nd Prize (Inter College)",
    ],
  },
  {
    year: "2027",
    items: ["Graduating M.Tech · Cybersecurity focus"],
  },
];

function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="journey"
      ref={ref}
      className="relative px-6 py-32 md:px-10"
      style={{ perspective: "1600px" }}
    >
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel number="04" title="The Journey" />

        <div className="relative mx-auto max-w-4xl pl-12 md:pl-24">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-10" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 top-0 w-px md:left-10"
          >
            <div className="h-full w-full" style={{ background: "var(--accent)" }} />
          </motion.div>

          {TIMELINE.map((block) => (
            <div key={block.year} className="mb-16" style={{ transformStyle: "preserve-3d" }}>
              <div className="relative mb-8">
                <span
                  className="absolute -left-12 top-2 h-3 w-3 rounded-full ring-4 md:-left-24"
                  style={{
                    background: "var(--accent)",
                    boxShadow: "0 0 0 6px var(--background)",
                  }}
                />
                <motion.h3
                  initial={{ opacity: 0, rotateX: 40, y: 30 }}
                  whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  style={{ transformOrigin: "50% 0%" }}
                  className="font-display text-6xl font-bold tracking-tight text-accent md:text-8xl"
                >
                  {block.year}
                </motion.h3>
              </div>

              <div className="space-y-6">
                {block.items.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 40, rotateY: 15 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.6 }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="group relative"
                  >
                    <span className="absolute -left-11 top-3 h-px w-6 bg-border transition-colors group-hover:bg-accent md:-left-[5.5rem] md:w-14" />
                    <div className="flex items-baseline justify-between border-b border-border py-3 transition-colors group-hover:border-accent">
                      <span className="font-display text-lg tracking-tight md:text-2xl">
                        {item}
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- STATS -------------------- */

const STATS = [
  { n: 4, suffix: "+", label: "Security Projects" },
  { n: 3, suffix: "", label: "Certifications" },
  { n: 2, suffix: "+", label: "Hackathon Wins" },
  { n: 8.18, suffix: "", label: "CGPA · M.Tech CSE" },
  { n: 4, suffix: "+", label: "Years Exploring Security" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    const isFloat = to % 1 !== 0;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(isFloat ? Number((eased * to).toFixed(2)) : Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

function Stats() {
  return (
    <section className="relative border-y border-border px-6 py-20 md:px-10">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-10 md:grid-cols-5">
        {STATS.map((s) => (
          <div key={s.label} className="text-center md:text-left">
            <div className="font-display text-5xl font-bold tracking-tight text-accent md:text-6xl">
              <Counter to={s.n} suffix={s.suffix} />
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- CONTACT -------------------- */

function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden px-6 py-32 md:px-10"
      style={{ perspective: "1400px" }}
    >
      <CyberBackdrop />
      <motion.div
        style={{ rotateX, y, transformOrigin: "50% 0%" }}
        className="relative mx-auto max-w-[1600px]"
      >
        <SectionLabel number="05" title="Let's Connect" />

        <h2 className="font-display text-[13vw] font-bold leading-[0.9] tracking-[-0.04em] md:text-[9vw]">
          LET'S BUILD <br />
          THE NEXT <br />
          GENERATION <br />
          OF <span className="text-accent italic font-light">security.</span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-md text-base text-muted-foreground">
            Open to research collaborations, security engineering roles, and
            audacious ideas. Reach me at{" "}
            <a
              href={CONTACT.gmail}
              target="_blank"
              rel="noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              {CONTACT.email}
            </a>
            .
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Email", icon: Mail, href: CONTACT.gmail, external: true },
              { label: "GitHub", icon: Github, href: CONTACT.github, external: true },
              { label: "LinkedIn", icon: Linkedin, href: CONTACT.linkedin, external: true },
              { label: "Resume", icon: Download, href: CONTACT.resume, external: false },
            ].map((b) => (
              <a
                key={b.label}
                href={b.href}
                {...(b.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : { download: true })}
                className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] transition-all hover:border-accent hover:text-accent"
              >
                <b.icon size={14} />
                {b.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-24 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground md:flex-row md:items-center">
          <span>© 2026 Felix Royson A — All Rights Reserved</span>
          <span>Built with intent · Thoothukudi, India</span>
        </div>
      </motion.div>
    </section>
  );
}

/* -------------------- CURSOR GLOW -------------------- */

function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);
  const bg = useTransform([x, y], ([cx, cy]) =>
    `radial-gradient(300px circle at ${cx}px ${cy}px, color-mix(in oklab, var(--accent) 10%, transparent), transparent 70%)`,
  );
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
      style={{ background: bg as unknown as string }}
    />
  );
}

/* -------------------- SCROLL PROGRESS BAR -------------------- */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left"
      style={{ scaleX, background: "var(--accent)" }}
    />
  );
}

/* -------------------- TECH STACK MARQUEE -------------------- */

type Logo = { name: string; slug: string; darkInvert?: boolean };

const STACK_ROW_1: Logo[] = [
  { name: "Linux", slug: "linux" },
  { name: "Python", slug: "python" },
  { name: "React", slug: "react" },
  { name: "Next.js", slug: "nextdotjs", darkInvert: true },
  { name: "TypeScript", slug: "typescript" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Docker", slug: "docker" },
  { name: "AWS", slug: "amazonwebservices", darkInvert: true },
  { name: "Firebase", slug: "firebase" },
  { name: "Supabase", slug: "supabase" },
  { name: "Git", slug: "git" },
  { name: "GitHub", slug: "github", darkInvert: true },
];

const STACK_ROW_2: Logo[] = [
  { name: "MySQL", slug: "mysql" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Nmap", slug: "nmap", darkInvert: true },
  { name: "Burp Suite", slug: "burpsuite" },
  { name: "Wireshark", slug: "wireshark" },
  { name: "Metasploit", slug: "metasploit" },
  { name: "OWASP", slug: "owasp" },
  { name: "Android Studio", slug: "androidstudio" },
  { name: "Framer Motion", slug: "framer", darkInvert: true },
  { name: "GSAP", slug: "greensock" },
  { name: "Figma", slug: "figma" },
];

type ActiveLogoCtx = {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
};
const ActiveLogoContext = React.createContext<ActiveLogoCtx>({
  activeId: null,
  setActiveId: () => {},
});

function LogoItem({ logo }: { logo: Logo }) {
  const tipId = React.useId();
  const { activeId, setActiveId } = React.useContext(ActiveLogoContext);
  const open = activeId === tipId;
  const longPressTimer = useRef<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") {
      // Long-press / tap toggle for touch
      longPressTimer.current = window.setTimeout(() => {
        setActiveId(open ? null : tipId);
      }, 180);
    }
  };
  const clearLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  return (
    <div className="group/logo relative flex shrink-0 flex-col items-center justify-center px-8 py-4 sm:px-12 md:px-16">
      {/* Accent glow on hover */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-x-4 top-2 h-14 rounded-full blur-2xl transition-opacity duration-500 ${
          open ? "opacity-70" : "opacity-0"
        }`}
        style={{ background: "color-mix(in oklab, var(--accent) 50%, transparent)" }}
      />
      <button
        type="button"
        aria-label={logo.name}
        aria-describedby={tipId}
        aria-expanded={open}
        onMouseEnter={() => setActiveId(tipId)}
        onMouseLeave={() => setActiveId(null)}
        onFocus={() => setActiveId(tipId)}
        onBlur={() => setActiveId(null)}
        onPointerDown={handlePointerDown}
        onPointerUp={clearLongPress}
        onPointerCancel={clearLongPress}
        onPointerLeave={clearLongPress}
        className="relative rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <img
          src={`https://cdn.simpleicons.org/${logo.slug}`}
          alt=""
          loading="lazy"
          decoding="async"
          width={48}
          height={48}
          data-dark-invert={logo.darkInvert ? "true" : undefined}
          className="logo-mono relative h-8 w-8 select-none sm:h-10 sm:w-10 md:h-12 md:w-12"
          draggable={false}
          onError={(e) => {
            const el = e.currentTarget;
            const parent = el.parentElement;
            if (!parent) return;
            el.remove();
            const span = document.createElement("span");
            span.textContent = logo.name;
            span.className =
              "font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground";
            parent.appendChild(span);
          }}
        />
      </button>

      {/* Brand-name pill below — spring slide/fade, single active at a time */}
      <AnimatePresence>
        {open && (
          <motion.span
            id={tipId}
            role="tooltip"
            key="tip"
            initial={{ opacity: 0, y: -6, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 500,
                damping: 28,
                mass: 0.6,
                delay: 0.04,
              },
            }}
            exit={{
              opacity: 0,
              y: -4,
              scale: 0.92,
              transition: { duration: 0.15, ease: "easeOut" },
            }}
            className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2"
          >
            <span
              className="relative block whitespace-nowrap rounded-full border border-accent/50 bg-background/90 px-3 py-1.5 font-mono text-[11px] tracking-wide backdrop-blur-xl"
              style={{
                color: "var(--accent)",
                boxShadow:
                  "0 0 0 1px color-mix(in oklab, var(--accent) 35%, transparent), 0 12px 40px -12px color-mix(in oklab, var(--accent) 70%, transparent), inset 0 0 20px -8px color-mix(in oklab, var(--accent) 40%, transparent)",
              }}
            >
              {logo.name}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

function MarqueeRow({
  logos,
  reverse,
  paused,
  reducedMotion,
}: {
  logos: Logo[];
  reverse?: boolean;
  paused: boolean;
  reducedMotion: boolean;
}) {
  if (reducedMotion) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2">
        {logos.map((l) => (
          <LogoItem key={l.slug} logo={l} />
        ))}
      </div>
    );
  }
  const track = [...logos, ...logos];
  return (
    <div className="group/row relative overflow-visible [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex w-max ${
          reverse ? "animate-marquee-reverse-slow" : "animate-marquee-slow"
        } group-hover/row:[animation-play-state:paused] group-focus-within/row:[animation-play-state:paused]`}
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {track.map((l, i) => (
          <LogoItem key={`${l.slug}-${i}`} logo={l} />
        ))}
      </div>
    </div>
  );
}


function TechStack() {
  const [tabHidden, setTabHidden] = useState(false);
  const [offscreen, setOffscreen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setOffscreen(!entry.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Dismiss active tooltip on outside tap (mobile)
  useEffect(() => {
    if (!activeId) return;
    const onDocPointer = (e: PointerEvent) => {
      const el = sectionRef.current;
      if (el && !el.contains(e.target as Node)) setActiveId(null);
    };
    document.addEventListener("pointerdown", onDocPointer);
    return () => document.removeEventListener("pointerdown", onDocPointer);
  }, [activeId]);

  const paused = tabHidden || offscreen || activeId !== null;

  return (
    <ActiveLogoContext.Provider value={{ activeId, setActiveId }}>
      <section
        id="stack"
        className="relative px-6 py-32 md:px-10"
        aria-labelledby="stack-title"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg opacity-30" />

        <div ref={sectionRef} className="relative mx-auto max-w-[1600px]">
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              06 — Toolkit
            </span>
            <h2
              id="stack-title"
              className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl"
            >
              Stack &amp; <span className="text-accent italic font-light">Tools</span>
            </h2>
            <p className="mt-5 max-w-xl text-sm text-muted-foreground md:text-base">
              Technologies, frameworks, security tools and platforms I use to
              build secure systems.
            </p>
            {reducedMotion && (
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Reduced motion — static layout
              </p>
            )}
          </div>

          <div className="space-y-10">
            <MarqueeRow logos={STACK_ROW_1} paused={paused} reducedMotion={reducedMotion} />
            <MarqueeRow logos={STACK_ROW_2} reverse paused={paused} reducedMotion={reducedMotion} />
          </div>
        </div>
      </section>
    </ActiveLogoContext.Provider>
  );
}


/* -------------------- CYBER PENTEST MOUSE TRAIL -------------------- */

type TrailParticle = {
  id: number;
  x: number;
  y: number;
  size: number;
  type: "dot" | "plus" | "ring";
  angle: number;
};

type ClickRipple = {
  id: number;
  x: number;
  y: number;
};

function CyberMouseTrail() {
  const [particles, setParticles] = useState<TrailParticle[]>([]);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  const lastTime = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime.current < 35) return;
      lastTime.current = now;

      const types: ("dot" | "plus" | "ring")[] = ["dot", "dot", "plus", "ring"];
      const type = types[Math.floor(Math.random() * types.length)];
      const size = Math.random() * 8 + 4;
      const angle = Math.random() * 360;

      const newParticle: TrailParticle = {
        id: now + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size,
        type,
        angle,
      };

      setParticles((prev) => [...prev.slice(-15), newParticle]);
    };

    const handleClick = (e: MouseEvent) => {
      const newRipple: ClickRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-4), newRipple]);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 450);
    return () => clearTimeout(timer);
  }, [particles]);

  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timer);
  }, [ripples]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden hidden md:block">
      {/* Click Cyber Target Lock-on Ripples */}
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          initial={{ scale: 0.2, opacity: 0.9 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed"
          style={{
            left: r.x,
            top: r.y,
            borderColor: "var(--accent)",
            boxShadow: "0 0 15px var(--accent)",
          }}
        />
      ))}

      {/* Cyber Particle Sparks */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ scale: 1, opacity: 0.85, rotate: p.angle }}
          animate={{ scale: 0, opacity: 0, y: -14, rotate: p.angle + 45 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-mono font-bold text-[10px]"
          style={{
            left: p.x,
            top: p.y,
            color: "var(--accent)",
          }}
        >
          {p.type === "plus" ? (
            <span>+</span>
          ) : p.type === "ring" ? (
            <span
              className="h-2 w-2 rounded-full border"
              style={{ borderColor: "var(--accent)", boxShadow: "0 0 6px var(--accent)" }}
            />
          ) : (
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* -------------------- PAGE -------------------- */

function HomePage() {
  return (
    <main className="relative overflow-x-hidden">
      <ScrollProgress />
      <Header />
      <SocialRail />
      <CursorGlow />
      <CyberMouseTrail />
      <Hero />
      <About />
      <Work />
      <Research />
      <Journey />
      <TechStack />
      <Stats />
      <Contact />
    </main>
  );
}

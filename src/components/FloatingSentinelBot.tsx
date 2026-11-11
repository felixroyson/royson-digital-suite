import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";

/* -------------------- NEMO: THE KAWAII CYBER COMPANION -------------------- */

export function FloatingSentinelBot() {
  const botRef = useRef<HTMLDivElement>(null);

  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; type: "heart" | "star" }[]>([]);

  // Raw mouse coordinates normalized to [-1, 1] relative to Nemo
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for lively physics
  const smoothX = useSpring(mouseX, { stiffness: 160, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 160, damping: 18 });

  // 3D Head rotation transforms
  const rotateY = useTransform(smoothX, [-1, 1], [-26, 26]);
  const rotateX = useTransform(smoothY, [-1, 1], [20, -20]);
  const headTiltZ = useTransform(smoothX, [-1, 1], [-6, 6]);

  // Parallax offsets for face & eyes
  const faceX = useTransform(smoothX, [-1, 1], [-16, 16]);
  const faceY = useTransform(smoothY, [-1, 1], [-12, 12]);
  const pupilX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const pupilY = useTransform(smoothY, [-1, 1], [-8, 8]);

  // Floating hands subtle sway
  const handLeftY = useTransform(smoothY, [-1, 1], [6, -6]);
  const handRightY = useTransform(smoothY, [-1, 1], [-6, 6]);

  // Antenna spring wiggle
  const antennaWiggle = useTransform(smoothX, [-1, 1], [-15, 15]);

  // Natural blinking interval
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 130);
    }, 3600);
    return () => clearInterval(interval);
  }, []);

  // Global mouse tracking across the entire screen
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!botRef.current) return;
      const rect = botRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (window.innerWidth / 2)));
      const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (window.innerHeight / 2)));

      mouseX.set(normX);
      mouseY.set(normY);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [mouseX, mouseY]);

  // Click reaction: joyful bounce, blushing cheeks, floating hearts & stars
  const handleNemoClick = () => {
    setIsClicked(true);
    setClickCount((prev) => prev + 1);
    setTimeout(() => setIsClicked(false), 900);

    const baseId = Date.now();
    const newSparkles = [
      { id: baseId + 1, x: (Math.random() - 0.5) * 50, y: -20, type: "heart" as const },
      { id: baseId + 2, x: (Math.random() - 0.5) * 60, y: -45, type: "star" as const },
      { id: baseId + 3, x: (Math.random() - 0.5) * 40, y: -30, type: "heart" as const },
    ];
    setSparkles((prev) => [...prev, ...newSparkles]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !newSparkles.some((ns) => ns.id === s.id)));
    }, 1400);
  };

  return (
    <aside
      aria-label="Nemo the Cute Cyber Companion"
      className="fixed bottom-4 right-4 z-50 select-none pointer-events-auto font-mono"
    >
      <motion.div
        ref={botRef}
        drag
        dragMomentum={false}
        dragElastic={0.08}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleNemoClick}
        title="Hi! I'm Nemo! I follow your cursor! Click to pet me or drag me around!"
        className="relative flex h-24 w-24 sm:h-28 sm:w-28 cursor-grab items-center justify-center active:cursor-grabbing"
        style={{ perspective: 1000 }}
      >
        {/* Cute Name Badge Tag floating above Nemo */}
        <AnimatePresence>
          {(isHovered || isClicked) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 4 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none absolute -top-2 z-30 flex items-center gap-1 rounded-full border border-accent/50 bg-[#0c1220]/95 px-2.5 py-0.5 shadow-lg backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-display font-extrabold text-[10px] tracking-widest text-accent uppercase">
                NEMO
              </span>
              <span className="text-[9px] text-pink-400">♥</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Hearts & Stars Particle Burst */}
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ y: 10, opacity: 1, scale: 0.5 }}
            animate={{ y: s.y - 50, opacity: 0, scale: 1.4 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ x: s.x }}
            className="pointer-events-none absolute top-0 z-30 filter drop-shadow-[0_2px_8px_rgba(244,63,94,0.7)]"
          >
            {s.type === "heart" ? (
              <Heart size={16} fill="#f43f5e" className="text-rose-500" />
            ) : (
              <Star size={14} fill="#fbbf24" className="text-amber-400" />
            )}
          </motion.div>
        ))}

        {/* 3D Floating Head Container with mouse tracking */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            rotateZ: headTiltZ,
            transformStyle: "preserve-3d",
          }}
          animate={{
            y: isClicked ? [0, -12, 0] : isHovered ? [0, -5, 0] : [0, -6, 0],
          }}
          transition={{
            y: {
              duration: isClicked ? 0.42 : 3,
              repeat: isClicked ? 2 : Infinity,
              ease: "easeInOut",
            },
          }}
          className="relative flex h-full w-full items-center justify-center"
        >
          {/* Floating Left Hand / Paw (Bouncy Mitt) */}
          <motion.div
            style={{ y: handLeftY }}
            animate={{
              y: isHovered || isClicked ? [-4, 4, -4] : [0, 5, 0],
              rotate: isHovered || isClicked ? [-8, 12, -8] : 0,
            }}
            transition={{
              y: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute left-0.5 top-12 sm:top-14 z-10 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full border border-accent/60 bg-gradient-to-br from-[#24334a] to-[#0d1420] shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          >
            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
          </motion.div>

          {/* Floating Right Hand / Paw (Waving Paw on Hover/Click 👋) */}
          <motion.div
            style={{ y: handRightY }}
            animate={{
              y: isHovered || isClicked ? [-6, 2, -6] : [0, -5, 0],
              rotate: isHovered || isClicked ? [0, 28, -12, 28, 0] : 0,
            }}
            transition={{
              y: { duration: isHovered || isClicked ? 1 : 2.4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: isHovered || isClicked ? 0.7 : 0, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute right-0.5 top-12 sm:top-14 z-10 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full border border-accent/60 bg-gradient-to-br from-[#24334a] to-[#0d1420] shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          >
            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
          </motion.div>

          {/* SVG Nemo Robotic Body Canvas */}
          <svg
            viewBox="0 0 240 240"
            className="h-full w-full overflow-visible filter drop-shadow-[0_16px_35px_rgba(0,0,0,0.7)]"
          >
            <defs>
              {/* Glossy Metallic Chibi Helmet Gradient */}
              <linearGradient id="nemoHelmetGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2c3c54" />
                <stop offset="40%" stopColor="#192333" />
                <stop offset="85%" stopColor="#0e1522" />
                <stop offset="100%" stopColor="#080c14" />
              </linearGradient>

              {/* Deep OLED Visor Screen Gradient */}
              <linearGradient id="nemoVisorGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#050a14" />
                <stop offset="100%" stopColor="#020408" />
              </linearGradient>

              {/* Kawaii Eyes Neon Glow Filter */}
              <filter id="nemoNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Top Springy Antenna with Wiggle & Heart/Beacon Tip */}
            <motion.g style={{ rotate: antennaWiggle, transformOrigin: "120px 40px" }}>
              {/* Flexible Antenna Stalk */}
              <path
                d="M 120 40 Q 118 25 120 14"
                stroke="var(--accent)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              {/* Glowing Heart / Beacon Tip */}
              <circle
                cx="120"
                cy="11"
                r="7.5"
                fill="var(--accent)"
                className="animate-pulse"
                filter="url(#nemoNeonGlow)"
              />
              <circle
                cx="118"
                cy="9"
                r="2"
                fill="#ffffff"
              />
            </motion.g>

            {/* Left Chibi Ear Pod with Accent Ring */}
            <rect
              x="14"
              y="92"
              width="16"
              height="40"
              rx="8"
              fill="#1a2538"
              stroke="var(--accent)"
              strokeWidth="2.5"
            />
            <circle cx="22" cy="112" r="3.5" fill="var(--accent)" />

            {/* Right Chibi Ear Pod with Accent Ring */}
            <rect
              x="210"
              y="92"
              width="16"
              height="40"
              rx="8"
              fill="#1a2538"
              stroke="var(--accent)"
              strokeWidth="2.5"
            />
            <circle cx="218" cy="112" r="3.5" fill="var(--accent)" />

            {/* Main Chibi Rounded Helmet (Baby-Bot Curvature) */}
            <rect
              x="28"
              y="36"
              width="184"
              height="154"
              rx="68"
              fill="url(#nemoHelmetGrad)"
              stroke="rgba(255,255,255,0.24)"
              strokeWidth="2"
            />

            {/* Inner Curved OLED Visor Screen */}
            <rect
              x="44"
              y="56"
              width="152"
              height="114"
              rx="48"
              fill="url(#nemoVisorGrad)"
              stroke="var(--accent)"
              strokeWidth="2.5"
            />

            {/* Glass Curved Specular Sheen Arc */}
            <path
              d="M 58 68 Q 120 58 182 68 Q 152 78 58 78 Z"
              fill="rgba(255, 255, 255, 0.16)"
            />

            {/* Dynamic Parallax Face Group that follows cursor */}
            <motion.g
              style={{
                x: faceX,
                y: faceY,
              }}
            >
              {/* Cute Blushing Cheeks (Always cute, extra glowing pink on hover/click!) */}
              <ellipse
                cx="76"
                cy="140"
                rx="12"
                ry="6"
                fill="#f43f5e"
                opacity={isHovered || isClicked ? 0.95 : 0.7}
              />
              <ellipse
                cx="164"
                cy="140"
                rx="12"
                ry="6"
                fill="#f43f5e"
                opacity={isHovered || isClicked ? 0.95 : 0.7}
              />

              {/* Cute Smile Mouth (appears when hovered or clicked!) */}
              {(isHovered || isClicked) && (
                <path
                  d="M 112 136 Q 120 144 128 136"
                  stroke="var(--accent)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#nemoNeonGlow)"
                />
              )}

              {/* EYE RENDERING LOGIC */}

              {/* State A: Happy Arched Smiling Eyes (^ ^) on hover or click */}
              {isHovered || isClicked ? (
                <>
                  <path
                    d="M 80 120 Q 98 94 116 120"
                    stroke="var(--accent)"
                    strokeWidth="7"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#nemoNeonGlow)"
                  />
                  <path
                    d="M 124 120 Q 142 94 160 120"
                    stroke="var(--accent)"
                    strokeWidth="7"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#nemoNeonGlow)"
                  />
                </>
              ) : (
                /* State B: Big Kawaii Anime Eyes with Dual Specular Sparkles & Mouse Tracking */
                <g
                  style={{
                    transformOrigin: "120px 114px",
                    transform: isBlinking ? "scaleY(0.06)" : "scaleY(1)",
                    transition: "transform 0.12s ease-in-out",
                  }}
                >
                  {/* Left Big Eye Socket */}
                  <rect
                    x="82"
                    y="92"
                    width="30"
                    height="40"
                    rx="15"
                    fill="var(--accent)"
                    filter="url(#nemoNeonGlow)"
                  />
                  {/* Right Big Eye Socket */}
                  <rect
                    x="128"
                    y="92"
                    width="30"
                    height="40"
                    rx="15"
                    fill="var(--accent)"
                    filter="url(#nemoNeonGlow)"
                  />

                  {/* Pupil Sparkles tracking cursor */}
                  <motion.g style={{ x: pupilX, y: pupilY }}>
                    {/* Primary Big Sparkle Glints (Top-Right of Eye) */}
                    <circle cx="98" cy="108" r="6" fill="#ffffff" />
                    <circle cx="144" cy="108" r="6" fill="#ffffff" />

                    {/* Secondary Tiny Kawaii Sparkle Dots (Bottom-Left) */}
                    <circle cx="92" cy="118" r="2.5" fill="#ffffff" opacity="0.85" />
                    <circle cx="138" cy="118" r="2.5" fill="#ffffff" opacity="0.85" />
                  </motion.g>
                </g>
              )}
            </motion.g>
          </svg>
        </motion.div>
      </motion.div>
    </aside>
  );
}

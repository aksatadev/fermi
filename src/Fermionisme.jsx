import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────
   THEME TOKENS
   CSS custom properties injected on the root wrapper.
   All child styles use var(--token) references.
───────────────────────────────────────────────────────────────── */
const THEMES = {
  dark: {
    "--bg-solid": "#080807",
    "--bg-gradient": "linear-gradient(160deg, #0C0B09 0%, #080807 45%, #090B0E 100%)",
    "--text-primary": "#F0EBE0",
    "--text-secondary": "rgba(240,235,224,0.65)",
    "--text-muted": "rgba(240,235,224,0.45)",
    "--text-faint": "rgba(240,235,224,0.2)",
    "--text-card-title": "#D8D0C0",
    "--text-card-title-hover": "#F8F3EA",
    "--text-card-subtitle": "rgba(255,255,255,0.3)",
    "--text-card-subtitle-hover": "rgba(255,255,255,0.5)",
    "--accent": "#C8A96E",
    "--accent-rgb": "200,169,110",
    "--accent-muted": "rgba(200,169,110,0.7)",
    "--accent-subtle": "rgba(200,169,110,0.2)",
    "--accent-border": "rgba(200,169,110,0.5)",
    "--accent-faint": "rgba(200,169,110,0.04)",
    "--card-bg": "rgba(255,255,255,0.02)",
    "--card-border": "rgba(255,255,255,0.07)",
    "--footer-border": "rgba(255,255,255,0.05)",
    "--social-border": "rgba(255,255,255,0.07)",
    "--social-color": "rgba(240,235,224,0.35)",
    "--toggle-bg": "rgba(255,255,255,0.06)",
    "--toggle-border": "rgba(255,255,255,0.1)",
    "--toggle-color": "rgba(240,235,224,0.5)",
    "--glow": "radial-gradient(ellipse at center, rgba(200,169,110,0.05) 0%, transparent 65%)",
    "--scrollbar-thumb": "rgba(200,169,110,0.2)",
    "--selection-bg": "rgba(200,169,110,0.25)",
    "--selection-color": "#F8F3EA",
    "--particle-rgb": "200,190,170",
    "--line-rgb": "200,180,140",
    "--divider-gradient":
      "linear-gradient(90deg, transparent, rgba(200,169,110,0.4), transparent)",
    "--eyebrow-line": "rgba(200,169,110,0.5)",
    "--scroll-line":
      "linear-gradient(to bottom, rgba(200,169,110,0), rgba(200,169,110,1))",
  },
  light: {
    "--bg-solid": "#F5F0E8",
    "--bg-gradient": "linear-gradient(160deg, #FAF7F2 0%, #F5F0E8 45%, #EDE8DE 100%)",
    "--text-primary": "#1A1612",
    "--text-secondary": "rgba(26,22,18,0.75)",
    "--text-muted": "rgba(26,22,18,0.55)",
    "--text-faint": "rgba(26,22,18,0.2)",
    "--text-card-title": "#2C2620",
    "--text-card-title-hover": "#100E0B",
    "--text-card-subtitle": "rgba(26,22,18,0.45)",
    "--text-card-subtitle-hover": "rgba(26,22,18,0.65)",
    "--accent": "#8B5C1E",
    "--accent-rgb": "139,92,30",
    "--accent-muted": "rgba(139,92,30,0.8)",
    "--accent-subtle": "rgba(139,92,30,0.18)",
    "--accent-border": "rgba(139,92,30,0.45)",
    "--accent-faint": "rgba(139,92,30,0.05)",
    "--card-bg": "rgba(255,255,255,0.5)",
    "--card-border": "rgba(0,0,0,0.08)",
    "--footer-border": "rgba(0,0,0,0.07)",
    "--social-border": "rgba(0,0,0,0.1)",
    "--social-color": "rgba(26,22,18,0.4)",
    "--toggle-bg": "rgba(0,0,0,0.04)",
    "--toggle-border": "rgba(0,0,0,0.1)",
    "--toggle-color": "rgba(26,22,18,0.55)",
    "--glow": "radial-gradient(ellipse at center, rgba(139,92,30,0.06) 0%, transparent 65%)",
    "--scrollbar-thumb": "rgba(139,92,30,0.25)",
    "--selection-bg": "rgba(139,92,30,0.2)",
    "--selection-color": "#1A1612",
    "--particle-rgb": "100,75,40",
    "--line-rgb": "120,88,42",
    "--divider-gradient":
      "linear-gradient(90deg, transparent, rgba(139,92,30,0.4), transparent)",
    "--eyebrow-line": "rgba(139,92,30,0.45)",
    "--scroll-line":
      "linear-gradient(to bottom, rgba(139,92,30,0), rgba(139,92,30,0.8))",
  },
};

/* ─────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────── */
const DOORS = [
  {
    id: "identity",
    title: "Identity",
    subtitle: "Who I am and why this exists",
    href: "/about",
    roman: "I",
    accent: "#C8A96E",
  },
  {
    id: "thoughts",
    title: "Thoughts",
    subtitle: "Ideas, reflections, and perspectives",
    href: "https://blog.fermionisme.org",
    roman: "II",
    accent: "#7FA9C8",
  },
  {
    id: "works",
    title: "Works",
    subtitle: "Things I build from ideas into reality",
    href: "https://studio.fermionisme.org",
    roman: "III",
    accent: "#A8C87F",
  },
  {
    id: "contact",
    title: "Get in Touch",
    subtitle: "Let's connect, collaborate, or talk",
    href: "/contact",
    roman: "IV",
    accent: "#C87FA8",
  },
];

const SOCIALS = [
  {
    name: "Telegram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────────────────────────
   PARTICLE CANVAS
   Receives particleRgb & lineRgb from parent so it reacts to theme.
───────────────────────────────────────────────────────────────── */
function ParticleCanvas({ particleRgb, lineRgb }) {
  const canvasRef = useRef(null);
  const colorsRef = useRef({ particleRgb, lineRgb });

  useEffect(() => {
    colorsRef.current = { particleRgb, lineRgb };
  }, [particleRgb, lineRgb]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W, H;
    const particles = [];
    const COUNT = 60;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;
        this.r = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.4 + 0.1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colorsRef.current.particleRgb}, ${this.alpha})`;
        ctx.fill();
      }
    }

    resize();
    for (let i = 0; i < COUNT; i++) particles.push(new Particle());

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${colorsRef.current.lineRgb}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => { p.update(); p.draw(); });
      drawLines();
      animId = requestAnimationFrame(loop);
    }

    loop();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.55,
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────
   THEME TOGGLE BUTTON
───────────────────────────────────────────────────────────────── */
function ThemeToggle({ theme, onToggle }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        position: "fixed",
        top: "1.5rem",
        right: "1.75rem",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        borderRadius: "4px",
        border: `1px solid ${hovered ? "var(--accent-border)" : "var(--toggle-border)"}`,
        background: hovered ? "var(--accent-faint)" : "var(--toggle-bg)",
        color: hovered ? "var(--accent)" : "var(--toggle-color)",
        cursor: "pointer",
        transition: "all 0.25s ease",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      {theme === "dark" ? (
        /* Sun icon */
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        /* Moon icon */
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   DOOR CARD
───────────────────────────────────────────────────────────────── */
function DoorCard({ door, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={door.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        position: "relative",
        textDecoration: "none",
        padding: "2.25rem 2rem",
        borderRadius: "4px",
        border: hovered
          ? `1px solid ${door.accent}55`
          : "1px solid var(--card-border)",
        background: hovered
          ? `linear-gradient(135deg, rgba(var(--accent-rgb-raw, 200,169,110),0.06) 0%, var(--card-bg) 100%)`
          : "var(--card-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transform: hovered
          ? "translateY(-6px) scale(1.01)"
          : "translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.18), 0 0 0 1px ${door.accent}22, inset 0 1px 0 rgba(255,255,255,0.06)`
          : "0 4px 20px rgba(0,0,0,0.08)",
        transition: "all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
        cursor: "pointer",
        animationDelay: `${index * 0.12 + 0.8}s`,
        animation: "fadeSlideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
      }}
    >
      {/* Accent glow on hover */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "4px",
            background: `radial-gradient(ellipse at 50% 0%, ${door.accent}12 0%, transparent 65%)`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Roman numeral */}
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "0.75rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: door.accent,
          opacity: hovered ? 1 : 0.5,
          marginBottom: "0.85rem",
          transition: "opacity 0.3s ease",
        }}
      >
        {door.roman}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(1.9rem, 3.5vw, 2.6rem)",
          fontWeight: 400,
          letterSpacing: "0.04em",
          color: hovered
            ? "var(--text-card-title-hover)"
            : "var(--text-card-title)",
          margin: "0 0 0.6rem 0",
          lineHeight: 1.0,
          textTransform: "uppercase",
          transition: "color 0.3s ease",
        }}
      >
        {door.title}
      </h3>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.78rem",
          fontWeight: 400,
          letterSpacing: "0.01em",
          color: hovered
            ? "var(--text-card-subtitle-hover)"
            : "var(--text-card-subtitle)",
          margin: 0,
          lineHeight: 1.55,
          transition: "color 0.3s ease",
        }}
      >
        {door.subtitle}
      </p>

      {/* Arrow */}
      <div
        style={{
          position: "absolute",
          bottom: "1.75rem",
          right: "1.75rem",
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          border: `1px solid ${hovered ? door.accent + "80" : "var(--card-border)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: hovered ? "translateX(3px)" : "translateX(0)",
          transition: "all 0.35s ease",
          color: hovered ? door.accent : "var(--text-card-subtitle)",
        }}
      >
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path
            d="M1 6h10M7 2l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────────
   LOGO COMPONENT
   Switches between logo-dark and logo-light based on theme.
   In dark mode → use logo-dark.png (light-colored logo on dark bg)
   In light mode → use logo-light.png (dark-colored logo on light bg)
───────────────────────────────────────────────────────────────── */
function Logo({ theme, height = 36, style = {} }) {
  const src =
    theme === "dark" ? "/img/logo-dark.png" : "/img/logo-light.png";
  return (
    <img
      src={src}
      alt="Fermionisme"
      height={height}
      width={height} /* square logo */
      style={{
        height: `${height}px`,
        width: "auto",
        display: "block",
        objectFit: "contain",
        transition: "opacity 0.3s ease",
        ...style,
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────── */
export default function Fermionisme() {
  // Initialise theme from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    const stored = localStorage.getItem("fermionisme-theme");
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  });

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try { localStorage.setItem("fermionisme-theme", next); } catch (_) {}
  };

  const vars = THEMES[theme];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body, #root {
          height: 100%;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        ::selection {
          background: var(--selection-bg);
          color: var(--selection-color);
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb {
          background: var(--scrollbar-thumb);
          border-radius: 2px;
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes widthExpand {
          from { width: 0; }
          to   { width: 2.5rem; }
        }

        .hero-eyebrow  { animation: fadeInDown  0.8s cubic-bezier(0.16,1,0.3,1) 0.2s  both; }
        .hero-headline { animation: fadeSlideUp  1s   cubic-bezier(0.16,1,0.3,1) 0.38s both; }
        .hero-sub      { animation: fadeSlideUp  0.9s cubic-bezier(0.16,1,0.3,1) 0.52s both; }
        .hero-divider  { animation: widthExpand  0.9s cubic-bezier(0.16,1,0.3,1) 0.62s both; }
        .hero-cta      { animation: fadeSlideUp  0.8s cubic-bezier(0.16,1,0.3,1) 0.72s both; }
        .doors-section { animation: fadeIn        1s   ease                        0.65s both; }

        /* Ensure CTA hover resets cleanly */
        .hero-cta-link { transition: border-color 0.3s ease, color 0.3s ease, background 0.3s ease; }
      `}</style>

      {/* ── ROOT WRAPPER — injects all CSS variables ── */}
      <div
        style={{
          ...vars,
          minHeight: "100vh",
          background: "var(--bg-gradient)",
          color: "var(--text-primary)",
          position: "relative",
          overflowX: "hidden",
          transition: "background 0.4s ease, color 0.4s ease",
        }}
      >
        <ParticleCanvas
          particleRgb={vars["--particle-rgb"]}
          lineRgb={vars["--line-rgb"]}
        />

        {/* Theme toggle */}
        <ThemeToggle theme={theme} onToggle={toggleTheme} />

        {/* Ambient top glow */}
        <div
          style={{
            position: "fixed",
            top: "-15vh",
            left: "50%",
            transform: "translateX(-50%)",
            width: "70vw",
            height: "50vh",
            background: "var(--glow)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* ══════════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════════ */}
        <section
          style={{
            position: "relative",
            zIndex: 1,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem)",
            textAlign: "center",
          }}
        >
          {/* Eyebrow — logo image + wordmark */}
          <div
            className="hero-eyebrow"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "2.5rem",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "2rem",
                height: "1px",
                background: "var(--eyebrow-line)",
              }}
            />
            <Logo theme={theme} height={32} />
            <span
              style={{
                display: "inline-block",
                width: "2rem",
                height: "1px",
                background: "var(--eyebrow-line)",
              }}
            />
          </div>

          {/* Headline */}
          <h1
            className="hero-headline"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)",
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "var(--text-primary)",
              maxWidth: "820px",
              marginBottom: "1.75rem",
            }}
          >
            You are not just visiting a website.{" "}
            <span
              style={{
                color: "var(--text-secondary)",
              }}
            >
              You are entering a way of thinking.
            </span>
          </h1>

          {/* Divider */}
          <div
            className="hero-divider"
            style={{
              height: "1px",
              background: "var(--divider-gradient)",
              marginBottom: "1.75rem",
              width: "2.5rem",
            }}
          />

          {/* Sub-heading */}
          <p
            className="hero-sub"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(0.88rem, 2vw, 1.0rem)",
              fontWeight: 300,
              letterSpacing: "0.03em",
              color: "var(--text-muted)",
              maxWidth: "480px",
              lineHeight: 1.8,
              marginBottom: "3rem",
            }}
          >
            This is Fermionisme — where small things shape something greater.
          </p>

          {/* CTA */}
          <a
            className="hero-cta hero-cta-link"
            href="#doors"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--accent-muted)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.85rem 1.8rem",
              border: "1px solid var(--accent-subtle)",
              borderRadius: "2px",
              background: "transparent",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent-border)";
              e.currentTarget.style.color = "var(--accent)";
              e.currentTarget.style.background = "var(--accent-faint)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--accent-subtle)";
              e.currentTarget.style.color = "var(--accent-muted)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Choose your door
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path
                d="M1 5h12M9 1l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          {/* Scroll indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "2.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.4rem",
              opacity: 0.3,
              animation: "fadeIn 1.5s ease 1.5s both",
            }}
          >
            <div
              style={{
                width: "1px",
                height: "2.5rem",
                background: "var(--scroll-line)",
              }}
            />
          </div>
        </section>

        {/* ══════════════════════════════════════════
            DOORS SECTION
        ══════════════════════════════════════════ */}
        <section
          id="doors"
          className="doors-section"
          style={{
            position: "relative",
            zIndex: 1,
            padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "1.25rem",
              marginBottom: "4rem",
            }}
          >
            {DOORS.map((door, i) => (
              <DoorCard key={door.id} door={door} index={i} />
            ))}
          </div>

          {/* Micro copy */}
          <div
            style={{
              textAlign: "center",
              animation: `fadeIn 0.8s ease ${DOORS.length * 0.12 + 1.2}s both`,
            }}
          >
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--text-faint)",
                letterSpacing: "0.04em",
              }}
            >
              Not every door is meant for everyone.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════ */}
        <footer
          style={{
            position: "relative",
            zIndex: 1,
            borderTop: "1px solid var(--footer-border)",
            padding:
              "clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 6vw, 6rem)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}
        >
          {/* Logo + tagline */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <Logo theme={theme} height={30} />
            <div>
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.1rem",
                  letterSpacing: "0.1em",
                  color: "var(--text-secondary)",
                  lineHeight: 1,
                  marginBottom: "0.2rem",
                }}
              >
                Fermionisme
              </div>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 300,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--accent-muted)",
                  opacity: 0.6,
                }}
              >
                Fermion is me.
              </div>
            </div>
          </div>

          {/* Social icons */}
          <div
            style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
          >
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                title={s.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  borderRadius: "2px",
                  border: "1px solid var(--social-border)",
                  color: "var(--social-color)",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-border)";
                  e.currentTarget.style.color = "var(--accent)";
                  e.currentTarget.style.background = "var(--accent-faint)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--social-border)";
                  e.currentTarget.style.color = "var(--social-color)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}

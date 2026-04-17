import { useState } from "react";
import { THEMES, ParticleCanvas, ThemeToggle, Logo, SOCIALS, GLOBAL_STYLES, PageFooter, navigate } from "./shared.jsx";

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

/* ─────────────────────────────────────────────────────────────────
   DOOR CARD
───────────────────────────────────────────────────────────────── */
function DoorCard({ door, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={door.href}
      onClick={(e) => { if (door.href.startsWith("/")) { e.preventDefault(); navigate(door.href); } }}
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
          ? `linear-gradient(135deg, rgba(var(--accent-rgb),0.06) 0%, var(--card-bg) 100%)`
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
   MAIN COMPONENT
───────────────────────────────────────────────────────────────── */
export default function Fermionisme({ theme, toggleTheme }) {
  const vars = THEMES[theme];

  return (
    <>
      <style>{GLOBAL_STYLES}</style>

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

        <PageFooter theme={theme} />
      </div>
    </>
  );
}

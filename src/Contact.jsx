import { useState } from "react";
import {
  THEMES, ParticleCanvas, PageNav, PageFooter,
  GLOBAL_STYLES,
} from "./shared.jsx";

/* ─────────────────────────────────────────────────────────────────
   CONTACT DATA with large icons and full info
───────────────────────────────────────────────────────────────── */
const CONTACTS = [
  {
    platform: "Instagram",
    handle: "@fermionisme",
    desc: "Cerita harian, kutipan, dan potongan pemikiran.",
    href: "https://instagram.com/fermionisme",
    accent: "#C8A96E",
    roman: "I",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    platform: "Telegram",
    handle: "t.me/fermionis",
    desc: "Kanal utama untuk diskusi, pemikiran, dan update.",
    href: "https://t.me/fermionis",
    accent: "#7FA9C8",
    roman: "II",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    platform: "GitHub",
    handle: "aksatadev",
    desc: "Repositori kode, eksperimen, dan proyek terbuka.",
    href: "https://github.com/aksatadev",
    accent: "#A8C87F",
    roman: "III",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    platform: "WhatsApp",
    handle: "+62 821 5456 3810",
    desc: "Untuk percakapan langsung dan kolaborasi.",
    href: "https://wa.me/6282154563810",
    accent: "#C87FA8",
    roman: "IV",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────────────────────────
   CONTACT CARD
───────────────────────────────────────────────────────────────── */
function ContactCard({ c, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={c.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        position: "relative",
        textDecoration: "none",
        padding: "2.25rem 2rem",
        borderRadius: "4px",
        border: hovered ? `1px solid ${c.accent}66` : "1px solid var(--card-border)",
        background: hovered
          ? `linear-gradient(135deg, ${hexToRgbaStr(c.accent, 0.07)} 0%, var(--card-bg) 100%)`
          : "var(--card-bg)",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        transform: hovered ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px ${c.accent}22`
          : "0 4px 20px rgba(0,0,0,0.06)",
        transition: "all 0.45s cubic-bezier(0.34,1.56,0.64,1)",
        cursor: "pointer",
        animation: `fadeSlideUp 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.12 + 0.5}s both`,
      }}
    >
      {/* Top glow on hover */}
      {hovered && (
        <div style={{
          position: "absolute", inset: 0, borderRadius: "4px",
          background: `radial-gradient(ellipse at 50% 0%, ${c.accent}14 0%, transparent 60%)`,
          pointerEvents: "none",
        }} />
      )}

      {/* Roman numeral */}
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.65rem",
        letterSpacing: "0.3em", textTransform: "uppercase",
        color: c.accent, opacity: hovered ? 1 : 0.45,
        marginBottom: "1rem", transition: "opacity 0.3s ease",
      }}>
        {c.roman}
      </div>

      {/* Icon + platform */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1rem" }}>
        <div style={{
          color: hovered ? c.accent : "var(--text-muted)",
          transition: "color 0.3s ease", flexShrink: 0,
        }}>
          {c.icon}
        </div>
        <h3 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          fontWeight: 400, letterSpacing: "0.05em", textTransform: "uppercase",
          color: hovered ? "var(--text-card-title-hover)" : "var(--text-card-title)",
          margin: 0, lineHeight: 1, transition: "color 0.3s ease",
        }}>
          {c.platform}
        </h3>
      </div>

      {/* Handle */}
      <div style={{
        fontFamily: "'Montserrat', sans-serif", fontSize: "0.78rem",
        fontWeight: 500, letterSpacing: "0.04em",
        color: hovered ? c.accent : "var(--text-secondary)",
        marginBottom: "0.6rem", transition: "color 0.3s ease",
      }}>
        {c.handle}
      </div>

      {/* Description */}
      <p style={{
        fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem",
        fontWeight: 300, lineHeight: 1.65,
        color: "var(--text-muted)", margin: 0,
      }}>
        {c.desc}
      </p>

      {/* Arrow */}
      <div style={{
        position: "absolute", bottom: "1.75rem", right: "1.75rem",
        width: "28px", height: "28px", borderRadius: "50%",
        border: `1px solid ${hovered ? c.accent + "80" : "var(--card-border)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transform: hovered ? "translateX(3px)" : "translateX(0)",
        transition: "all 0.35s ease",
        color: hovered ? c.accent : "var(--text-card-subtitle)",
      }}>
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </a>
  );
}

function hexToRgbaStr(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────── */
export default function Contact({ theme, toggleTheme }) {
  const vars = THEMES[theme];

  return (
    <>
      <style>{GLOBAL_STYLES}</style>

      <div style={{
        ...vars,
        minHeight: "100vh",
        background: "var(--bg-gradient)",
        color: "var(--text-primary)",
        position: "relative",
        overflowX: "hidden",
        transition: "background 0.4s ease, color 0.4s ease",
      }}>
        <ParticleCanvas particleRgb={vars["--particle-rgb"]} lineRgb={vars["--line-rgb"]} />

        <PageNav theme={theme} onToggle={toggleTheme} backLabel="Home" backHref="/" />

        {/* Ambient glow */}
        <div style={{
          position: "fixed", top: "-15vh", left: "50%",
          transform: "translateX(-50%)", width: "70vw", height: "50vh",
          background: "var(--glow)", pointerEvents: "none", zIndex: 0,
        }} />

        {/* ══ HERO ══ */}
        <section style={{
          position: "relative", zIndex: 1,
          padding: "clamp(7rem, 14vw, 11rem) clamp(1.5rem, 8vw, 8rem) clamp(3rem, 6vw, 5rem)",
          maxWidth: "1100px", margin: "0 auto",
          textAlign: "center",
        }}>
          {/* Eyebrow */}
          <div className="hero-eyebrow" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "1rem", marginBottom: "2rem",
          }}>
            <span style={{ display: "inline-block", width: "2rem", height: "1px", background: "var(--eyebrow-line)" }} />
            <span style={{
              fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem",
              fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase",
              color: "var(--accent-muted)",
            }}>Get in Touch · IV</span>
            <span style={{ display: "inline-block", width: "2rem", height: "1px", background: "var(--eyebrow-line)" }} />
          </div>

          {/* Headline */}
          <h1 className="hero-headline" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3.5rem, 9vw, 7rem)",
            fontWeight: 400, lineHeight: 1.0, letterSpacing: "0.03em",
            textTransform: "uppercase", color: "var(--text-primary)",
            marginBottom: "0",
          }}>
            Mari{" "}
            <span style={{ color: "var(--accent)", opacity: 0.9 }}>Terhubung.</span>
          </h1>

          {/* Divider */}
          <div className="hero-divider" style={{
            height: "1px", background: "var(--divider-gradient)",
            margin: "2.5rem auto", width: "2.5rem",
          }} />

          {/* Sub */}
          <p className="hero-sub" style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(0.88rem, 1.8vw, 1rem)",
            fontWeight: 300, lineHeight: 1.85, letterSpacing: "0.01em",
            color: "var(--text-muted)", maxWidth: "480px", margin: "0 auto",
          }}>
            Punya pertanyaan, ide kolaborasi, atau sekadar ingin berbicara?
            Pilih jalur yang paling nyaman.
          </p>
        </section>

        {/* ══ CONTACT CARDS ══ */}
        <section style={{
          position: "relative", zIndex: 1,
          padding: "clamp(1rem, 4vw, 3rem) clamp(1.5rem, 6vw, 6rem) clamp(4rem, 8vw, 7rem)",
          maxWidth: "1200px", margin: "0 auto",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: "1.25rem",
          }}>
            {CONTACTS.map((c, i) => (
              <ContactCard key={c.platform} c={c} index={i} />
            ))}
          </div>

          {/* Bottom note */}
          <div style={{
            textAlign: "center", marginTop: "4rem",
            animation: "fadeIn 0.8s ease 1.2s both",
          }}>
            <p style={{
              fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(0.82rem, 2vw, 0.9rem)",
              fontWeight: 300, fontStyle: "italic",
              color: "var(--text-faint)", letterSpacing: "0.04em",
            }}>
              Setiap percakapan adalah percikan gagasan baru.
            </p>
          </div>
        </section>

        <PageFooter theme={theme} />
      </div>
    </>
  );
}

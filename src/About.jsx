import { useState } from "react";
import {
  THEMES, ParticleCanvas, PageNav, PageFooter, Logo,
  GLOBAL_STYLES, navigate,
} from "./shared.jsx";

/* ─────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────── */
const PRINCIPLES = [
  {
    roman: "I",
    title: "Kesadaran Diri",
    body: "Memahami diri sendiri sebagai manusia yang hidup dalam sistem sosial, ekonomi, dan teknologi yang terus bergerak.",
    accent: "#C8A96E",
  },
  {
    roman: "II",
    title: "Refleksi & Keheningan",
    body: "Pemikiran lahir dari perenungan — sering kali dari kesunyian, pengalaman hidup, dan kegelisahan yang tidak bisa didiamkan.",
    accent: "#7FA9C8",
  },
  {
    roman: "III",
    title: "Kritik Sosial",
    body: "Realitas tidak selalu adil. Karena itu perlu dipahami, dipertanyakan, dan dikritik dengan kejujuran.",
    accent: "#A8C87F",
  },
  {
    roman: "IV",
    title: "Teknologi sebagai Alat",
    body: "Teknologi bukan tujuan, melainkan alat untuk membangun pengetahuan, komunitas, dan kemungkinan-kemungkinan baru.",
    accent: "#C87FA8",
  },
  {
    roman: "V",
    title: "Pengetahuan Terbuka",
    body: "Ide, tulisan, dan proyek sebaiknya bisa diakses dan dipelajari bersama — tanpa sekat yang tidak perlu.",
    accent: "#A8B8C8",
  },
];

const WORKS = [
  {
    label: "Tulisan",
    desc: "Esai, refleksi, puisi, dan catatan pemikiran yang lahir dari kegelisahan sehari-hari.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    label: "Proyek Digital",
    desc: "Website, aplikasi kecil, dan eksperimen teknologi yang menjawab pertanyaan nyata.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    label: "Arsip Gagasan",
    desc: "Kumpulan ide, konsep, dan catatan yang terus berkembang seiring waktu.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
];

const TOPICS = [
  "Eksistensi Manusia",
  "Kesunyian & Refleksi",
  "Kritik Kapitalisme",
  "Struktur Sosial",
  "Manusia & Teknologi",
  "Pengalaman Kerja",
  "Kebebasan Berpikir",
  "Realitas Kelas Pekerja",
];

/* ─────────────────────────────────────────────────────────────────
   PRINCIPLE CARD
───────────────────────────────────────────────────────────────── */
function PrincipleCard({ p, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "1.75rem",
        borderRadius: "4px",
        border: hovered ? `1px solid ${p.accent}55` : "1px solid var(--card-border)",
        background: hovered
          ? `linear-gradient(135deg, rgba(${hexToRgb(p.accent)},0.06) 0%, var(--card-bg) 100%)`
          : "var(--card-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        animation: `fadeSlideUp 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.1 + 0.4}s both`,
        cursor: "default",
      }}
    >
      {hovered && (
        <div style={{
          position: "absolute", inset: 0, borderRadius: "4px",
          background: `radial-gradient(ellipse at 50% 0%, ${p.accent}10 0%, transparent 65%)`,
          pointerEvents: "none",
        }} />
      )}
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.7rem",
        letterSpacing: "0.3em", color: p.accent,
        opacity: hovered ? 1 : 0.55, marginBottom: "0.75rem",
        transition: "opacity 0.3s ease",
      }}>
        {p.roman}
      </div>
      <h3 style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)",
        fontWeight: 400, letterSpacing: "0.05em", textTransform: "uppercase",
        color: hovered ? "var(--text-card-title-hover)" : "var(--text-card-title)",
        margin: "0 0 0.6rem 0", lineHeight: 1.1,
        transition: "color 0.3s ease",
      }}>
        {p.title}
      </h3>
      <p style={{
        fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem",
        fontWeight: 300, lineHeight: 1.7, color: "var(--text-muted)", margin: 0,
      }}>
        {p.body}
      </p>
    </div>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────── */
export default function About({ theme, toggleTheme }) {
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
        }}>
          {/* Eyebrow */}
          <div className="hero-eyebrow" style={{
            display: "flex", alignItems: "center", gap: "0.85rem",
            marginBottom: "2rem",
          }}>
            <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--eyebrow-line)" }} />
            <span style={{
              fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem",
              fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase",
              color: "var(--accent-muted)",
            }}>Identity · I</span>
          </div>

          {/* Main headline — two-line typographic statement */}
          <h1 className="hero-headline" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
            fontWeight: 400, lineHeight: 1.0, letterSpacing: "0.02em",
            textTransform: "uppercase", color: "var(--text-primary)",
            marginBottom: "0",
          }}>
            Ruang{" "}
            <span style={{ color: "var(--text-secondary)" }}>Pemikiran,</span>
            <br />
            <span style={{ color: "var(--accent)", opacity: 0.85 }}>Eksperimen</span>
            {" "}Ide.
          </h1>

          {/* Divider */}
          <div className="hero-divider" style={{
            height: "1px", background: "var(--divider-gradient)",
            margin: "2.5rem 0", width: "2.5rem",
          }} />

          {/* Lead paragraph */}
          <p className="hero-sub" style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(0.92rem, 1.8vw, 1.05rem)",
            fontWeight: 300, lineHeight: 1.85, letterSpacing: "0.01em",
            color: "var(--text-secondary)", maxWidth: "600px",
          }}>
            Fermionisme adalah ruang pemikiran, eksperimen ide, dan karya digital
            yang berangkat dari refleksi pribadi tentang kehidupan, teknologi,
            dan realitas sosial.
          </p>
        </section>

        {/* ══ WHAT IS FERMIONISME ══ */}
        <section style={{
          position: "relative", zIndex: 1,
          padding: "0 clamp(1.5rem, 8vw, 8rem) clamp(4rem, 8vw, 7rem)",
          maxWidth: "1100px", margin: "0 auto",
          animation: "fadeIn 1s ease 0.6s both",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
            gap: "3rem 6rem",
            alignItems: "start",
          }}>
            {/* Left: Description */}
            <div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.65rem",
                letterSpacing: "0.3em", textTransform: "uppercase",
                color: "var(--accent)", marginBottom: "1.25rem",
              }}>
                Apa Itu Fermionisme
              </div>
              <p style={{
                fontFamily: "'Montserrat', sans-serif", fontSize: "0.875rem",
                fontWeight: 300, lineHeight: 1.9, color: "var(--text-secondary)",
                marginBottom: "1.25rem",
              }}>
                Fermionisme bukan organisasi formal, melainkan arsip gagasan dan laboratorium
                pemikiran yang memadukan refleksi filosofis, kritik sosial, eksplorasi
                teknologi, serta karya tulisan dan proyek digital.
              </p>
              <p style={{
                fontFamily: "'Montserrat', sans-serif", fontSize: "0.875rem",
                fontWeight: 300, lineHeight: 1.9, color: "var(--text-muted)",
              }}>
                Fermionisme melihat dunia sebagai proses yang selalu bergerak —
                antara kesunyian pribadi, kerja sehari-hari, dan perubahan sosial.
              </p>
            </div>

            {/* Right: Nature / bukan */}
            <div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.65rem",
                letterSpacing: "0.3em", textTransform: "uppercase",
                color: "var(--accent)", marginBottom: "1.25rem",
              }}>
                Sifat Fermionisme
              </div>
              {["Bukan agama", "Bukan ideologi politik formal", "Bukan gerakan organisasi"].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "0.85rem",
                  marginBottom: "0.65rem",
                }}>
                  <span style={{
                    width: "6px", height: "1px", background: "var(--accent)",
                    flexShrink: 0, opacity: 0.6,
                    display: "block",
                  }} />
                  <span style={{
                    fontFamily: "'Montserrat', sans-serif", fontSize: "0.82rem",
                    fontWeight: 300, color: "var(--text-muted)",
                    textDecoration: "line-through", textDecorationColor: "var(--accent-subtle)",
                  }}>
                    {item}
                  </span>
                </div>
              ))}
              <div style={{
                marginTop: "1.5rem",
                padding: "1.1rem 1.25rem",
                borderLeft: "2px solid var(--accent)",
                background: "var(--accent-faint)",
                borderRadius: "0 4px 4px 0",
              }}>
                <p style={{
                  fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem",
                  fontWeight: 400, fontStyle: "italic",
                  lineHeight: 1.7, color: "var(--text-secondary)", margin: 0,
                }}>
                  Lebih tepat dipahami sebagai kerangka berpikir terbuka yang
                  terus berkembang seiring pengalaman hidup dan pembelajaran.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ PRINSIP DASAR ══ */}
        <section style={{
          position: "relative", zIndex: 1,
          padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 6vw, 6rem)",
          maxWidth: "1200px", margin: "0 auto",
        }}>
          {/* Section header */}
          <div style={{
            display: "flex", alignItems: "center", gap: "1.5rem",
            marginBottom: "2.5rem",
            animation: "fadeIn 0.8s ease 0.5s both",
          }}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.65rem",
              letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent)",
            }}>Prinsip Dasar</div>
            <div style={{ flex: 1, height: "1px", background: "var(--card-border)" }} />
          </div>

          {/* Principles grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            gap: "1rem",
          }}>
            {PRINCIPLES.map((p, i) => (
              <PrincipleCard key={p.roman} p={p} index={i} />
            ))}
          </div>
        </section>

        {/* ══ BENTUK KARYA ══ */}
        <section style={{
          position: "relative", zIndex: 1,
          padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 6vw, 6rem)",
          maxWidth: "1200px", margin: "0 auto",
          animation: "fadeIn 1s ease 0.8s both",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "1.5rem",
            marginBottom: "2.5rem",
          }}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.65rem",
              letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent)",
            }}>Bentuk Karya</div>
            <div style={{ flex: 1, height: "1px", background: "var(--card-border)" }} />
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: "1.25rem",
          }}>
            {WORKS.map((w, i) => (
              <WorkCard key={w.label} w={w} index={i} />
            ))}
          </div>
        </section>

        {/* ══ TOPIK ══ */}
        <section style={{
          position: "relative", zIndex: 1,
          padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 6vw, 6rem)",
          maxWidth: "1200px", margin: "0 auto",
          animation: "fadeIn 1s ease 1s both",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "1.5rem",
            marginBottom: "2.5rem",
          }}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.65rem",
              letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent)",
            }}>Topik yang Dibahas</div>
            <div style={{ flex: 1, height: "1px", background: "var(--card-border)" }} />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {TOPICS.map((topic, i) => (
              <TopicTag key={topic} label={topic} delay={i * 0.06} />
            ))}
          </div>
        </section>

        {/* ══ CTA — to contact ══ */}
        <section style={{
          position: "relative", zIndex: 1,
          padding: "clamp(2rem, 5vw, 4rem) clamp(1.5rem, 6vw, 6rem) clamp(4rem, 8vw, 7rem)",
          maxWidth: "1200px", margin: "0 auto", textAlign: "center",
          animation: "fadeIn 1s ease 1.2s both",
        }}>
          <div style={{ height: "1px", background: "var(--divider-gradient)", marginBottom: "3rem" }} />
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem",
            fontWeight: 300, letterSpacing: "0.04em", fontStyle: "italic",
            color: "var(--text-faint)", marginBottom: "1.75rem",
          }}>
            Ada sesuatu yang ingin disampaikan?
          </p>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); navigate("/contact"); }}
            style={{
              fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem",
              fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase",
              color: "var(--accent-muted)", textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: "0.75rem",
              padding: "0.85rem 1.8rem",
              border: "1px solid var(--accent-subtle)", borderRadius: "2px",
              background: "transparent", transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-border)"; e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.background = "var(--accent-faint)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--accent-subtle)"; e.currentTarget.style.color = "var(--accent-muted)"; e.currentTarget.style.background = "transparent"; }}
          >
            Hubungi Saya
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </section>

        <PageFooter theme={theme} />
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   WORK CARD
───────────────────────────────────────────────────────────────── */
function WorkCard({ w, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "1.75rem 1.5rem",
        borderRadius: "4px",
        border: hovered ? "1px solid var(--accent-border)" : "1px solid var(--card-border)",
        background: hovered ? "var(--accent-faint)" : "var(--card-bg)",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        transition: "all 0.35s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        animation: `fadeSlideUp 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.12 + 0.6}s both`,
        cursor: "default",
      }}
    >
      <div style={{
        color: hovered ? "var(--accent)" : "var(--text-muted)",
        marginBottom: "1rem", transition: "color 0.3s ease",
      }}>
        {w.icon}
      </div>
      <h3 style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
        fontWeight: 400, letterSpacing: "0.06em", textTransform: "uppercase",
        color: hovered ? "var(--text-card-title-hover)" : "var(--text-card-title)",
        margin: "0 0 0.5rem 0", lineHeight: 1.1,
        transition: "color 0.3s ease",
      }}>
        {w.label}
      </h3>
      <p style={{
        fontFamily: "'Montserrat', sans-serif", fontSize: "0.78rem",
        fontWeight: 300, lineHeight: 1.7, color: "var(--text-muted)", margin: 0,
      }}>
        {w.desc}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   TOPIC TAG
───────────────────────────────────────────────────────────────── */
function TopicTag({ label, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center",
        padding: "0.45rem 0.9rem",
        borderRadius: "2px",
        border: hovered ? "1px solid var(--accent-border)" : "1px solid var(--card-border)",
        background: hovered ? "var(--accent-faint)" : "var(--card-bg)",
        fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem",
        fontWeight: 400, letterSpacing: "0.08em",
        color: hovered ? "var(--accent)" : "var(--text-muted)",
        transition: "all 0.25s ease", cursor: "default",
        animation: `fadeIn 0.6s ease ${delay + 0.8}s both`,
      }}
    >
      {label}
    </span>
  );
}

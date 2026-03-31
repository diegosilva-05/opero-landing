import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   OPERO — Landing Page / One-Pager MVP Pilot
   ───────────────────────────────────────────── */

const WHATSAPP_NUMBER = "522221279566"; // Replace with real number
const WHATSAPP_MSG = encodeURIComponent(
  "Hola, me interesa el piloto gratuito de Opero para mi negocio."
);
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

// ── Intersection Observer Hook ──
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── Animated Section Wrapper ──
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView(0.12);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Counter Animation ──
function AnimCount({ end, suffix = "", prefix = "", duration = 2000 }) {
  const [val, setVal] = useState(0);
  const [ref, visible] = useInView(0.3);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = end / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= end) { setVal(end); clearInterval(id); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [visible, end, duration]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

// ── Styles ──
const t = {
  display: "'Instrument Serif', Georgia, serif",
  body: "'DM Sans', 'Helvetica Neue', sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
};

const c = {
  bg: "#FAFAF8",
  bgAlt: "#F3F1ED",
  bgDark: "#0C1017",
  bgDarkCard: "#151C28",
  surface: "#FFFFFF",
  text: "#1A1D23",
  textBody: "#3D424D",
  textMuted: "#7A8194",
  textLight: "#B0B8C9",
  accent: "#0066FF",
  accentSoft: "rgba(0,102,255,0.08)",
  accentBorder: "rgba(0,102,255,0.2)",
  green: "#00B67A",
  greenSoft: "rgba(0,182,122,0.1)",
  greenBorder: "rgba(0,182,122,0.25)",
  whatsapp: "#25D366",
  whatsappHover: "#1EBE5A",
  gold: "#E8A817",
  goldSoft: "rgba(232,168,23,0.1)",
  border: "#E8E6E1",
  borderLight: "#F0EDE8",
};

export default function OperoLanding() {
  const [formData, setFormData] = useState({ nombre: "", negocio: "", telefono: "", empleados: "", dolor: "" });
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const handleSubmit = () => {
    if (formData.nombre && formData.negocio && formData.telefono) {
      setSubmitted(true);
    }
  };

  return (
    <div style={{ fontFamily: t.body, color: c.text, background: c.bg, overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${c.accent}; color: white; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes slideIn { from { opacity:0; transform:translateX(-20px); } to { opacity:1; transform:translateX(0); } }
        .cta-main { transition: all 0.25s ease; }
        .cta-main:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,102,255,0.3); }
        .cta-wa { transition: all 0.25s ease; }
        .cta-wa:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(37,211,102,0.3); }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
        .nav-link { transition: color 0.2s; cursor: pointer; }
        .nav-link:hover { color: ${c.accent}; }
        input:focus, textarea:focus, select:focus { outline: none; border-color: ${c.accent}; box-shadow: 0 0 0 3px ${c.accentSoft}; }
        @media (max-width: 768px) {
          .hero-grid { flex-direction: column !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .pain-grid { grid-template-columns: 1fr !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════
          NAV
         ══════════════════════════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(250,250,248,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${c.borderLight}` : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: c.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 16, fontFamily: t.display }}>O</div>
            <span style={{ fontSize: 20, fontWeight: 700, color: c.text, letterSpacing: "-0.5px" }}>Opero</span>
          </a>
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <a href="#problema" className="nav-link" style={{ fontSize: 14, fontWeight: 500, color: c.textMuted, textDecoration: "none" }}>Problema</a>
            <a href="#solucion" className="nav-link" style={{ fontSize: 14, fontWeight: 500, color: c.textMuted, textDecoration: "none" }}>Solución</a>
            <a href="#como" className="nav-link" style={{ fontSize: 14, fontWeight: 500, color: c.textMuted, textDecoration: "none" }}>Cómo funciona</a>
            <a href="#piloto" className="nav-link" style={{ fontSize: 14, fontWeight: 500, color: c.textMuted, textDecoration: "none" }}>Piloto</a>
            <a href="#piloto" className="cta-main" style={{
              padding: "9px 20px", borderRadius: 8, background: c.accent, color: "white",
              fontSize: 14, fontWeight: 600, textDecoration: "none", border: "none",
            }}>Unirme al piloto</a>
          </div>
          <button onClick={() => setMobileMenu(!mobileMenu)} className="hide-desktop" style={{
            display: "none", background: "none", border: "none", cursor: "pointer", padding: 8,
            fontSize: 24, color: c.text,
          }}>☰</button>
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          HERO
         ══════════════════════════════════════════ */}
      <section style={{ paddingTop: 120, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        {/* Subtle gradient orb */}
        <div style={{
          position: "absolute", top: -200, right: -200, width: 600, height: 600,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(0,102,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -100, left: -150, width: 400, height: 400,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(0,182,122,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="hero-grid" style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 60 }}>
          <div style={{ flex: 1.1 }}>
            <Reveal>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, background: c.greenSoft, border: `1px solid ${c.greenBorder}`, marginBottom: 20 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: c.green, animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: c.green }}>Piloto gratuito — Solo 10 lugares</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 style={{
                fontFamily: t.display, fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400,
                lineHeight: 1.1, letterSpacing: "-1px", marginBottom: 20, color: c.text,
              }}>
                Tu negocio cobra,{" "}
                <span style={{ fontStyle: "italic", color: c.accent }}>factura</span> y opera
                <br />mientras tú descansas.
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p style={{ fontSize: 18, lineHeight: 1.7, color: c.textBody, maxWidth: 520, marginBottom: 32 }}>
                <strong>Opero</strong> es un agente de IA que automatiza la cobranza por WhatsApp, genera tu facturación CFDI y concilia tus cuentas bancarias. Como tener un director de finanzas que nunca duerme, por una fracción del costo.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
                <a href="#piloto" className="cta-main" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "14px 28px", borderRadius: 10, background: c.accent, color: "white",
                  fontSize: 16, fontWeight: 600, textDecoration: "none", border: "none", cursor: "pointer",
                }}>
                  Aplicar al piloto gratuito
                  <span style={{ fontSize: 18 }}>→</span>
                </a>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener" className="cta-wa" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "14px 28px", borderRadius: 10, background: c.whatsapp, color: "white",
                  fontSize: 16, fontWeight: 600, textDecoration: "none", border: "none", cursor: "pointer",
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Escríbenos
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, color: c.textMuted }}>✓ Sin costo durante el piloto</span>
                <span style={{ fontSize: 13, color: c.textMuted }}>✓ Setup en 24 horas</span>
                <span style={{ fontSize: 13, color: c.textMuted }}>✓ Sin tarjeta de crédito</span>
              </div>
            </Reveal>
          </div>

          {/* Hero Visual — Abstract Dashboard Preview */}
          <div className="hide-mobile" style={{ flex: 0.9 }}>
            <Reveal delay={0.3}>
              <div style={{
                background: c.bgDark, borderRadius: 16, padding: 24, position: "relative",
                boxShadow: "0 24px 80px rgba(0,0,0,0.15)",
              }}>
                {/* Mock top bar */}
                <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
                </div>

                {/* WhatsApp conversation mock */}
                <div style={{ background: "#0B141A", borderRadius: 12, padding: 16, marginBottom: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: c.whatsapp, marginBottom: 10, fontFamily: t.mono }}>
                    WhatsApp Business — Cobranza Automática
                  </div>
                  {[
                    { from: "bot", msg: "Buenos días, Don Carlos. Su factura #847 por $12,450 venció hace 3 días. ¿Desea pagar hoy?", time: "9:01 AM" },
                    { from: "user", msg: "Sí, mándame el link", time: "9:03 AM" },
                    { from: "bot", msg: "Listo. Aquí está su link de pago seguro: pay.opero.mx/f847 — Confirmamos automáticamente.", time: "9:03 AM" },
                  ].map((m, i) => (
                    <div key={i} style={{
                      display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start",
                      marginBottom: 8, animation: `slideIn 0.5s ease ${0.8 + i * 0.3}s both`,
                    }}>
                      <div style={{
                        maxWidth: "80%", padding: "8px 12px", borderRadius: 10,
                        background: m.from === "user" ? "#005C4B" : "#1F2C34",
                        fontSize: 12.5, color: "#E9EDEF", lineHeight: 1.5,
                      }}>
                        {m.msg}
                        <div style={{ fontSize: 10, color: "#8696A0", textAlign: "right", marginTop: 3 }}>{m.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mini stats */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  {[
                    { label: "Cobrado hoy", val: "$34,200", color: c.green },
                    { label: "Facturas emitidas", val: "12", color: c.accent },
                    { label: "Recuperación", val: "87%", color: c.gold },
                  ].map((s, i) => (
                    <div key={i} style={{ padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)" }}>
                      <div style={{ fontSize: 10, color: "#6B7B8D", marginBottom: 4, fontFamily: t.mono }}>{s.label}</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: s.color, fontFamily: t.mono }}>{s.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SOCIAL PROOF BAR
         ══════════════════════════════════════════ */}
      <section style={{ background: c.bgAlt, borderTop: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}`, padding: "24px 0" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 14 }}>Diseñado para negocios como el tuyo</p>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {[
              { num: 4.9, suffix: "M", label: "PYMEs en México" },
              { num: 77, suffix: "%", label: "no usan software de gestión" },
              { num: 40, suffix: "%+", label: "de cartera se vence >30 días" },
              { num: 24, suffix: "hrs", label: "para activar Opero" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 28, fontWeight: 700, fontFamily: t.display, color: c.text }}>
                  <AnimCount end={s.num} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 13, color: c.textMuted, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROBLEM
         ══════════════════════════════════════════ */}
      <section id="problema" style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
          <Reveal>
            <div style={{ maxWidth: 560, marginBottom: 48 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: c.accent, textTransform: "uppercase", letterSpacing: "1px", fontFamily: t.mono }}>El problema</span>
              <h2 style={{ fontFamily: t.display, fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, lineHeight: 1.15, marginTop: 8, letterSpacing: "-0.5px" }}>
                Tu negocio pierde dinero <span style={{ fontStyle: "italic" }}>cada día</span> que no cobra a tiempo.
              </h2>
            </div>
          </Reveal>

          <div className="pain-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              {
                icon: "📱",
                title: "Cobranza manual",
                desc: "Persigues clientes uno por uno en WhatsApp. Olvidas seguimientos. El dinero llega tarde o nunca.",
                stat: "40% de cartera vencida promedio",
              },
              {
                icon: "🧾",
                title: "Facturación caótica",
                desc: "Emitir CFDIs es lento y tedioso. Errores en datos fiscales causan re-trabajo. El SAT no perdona.",
                stat: "3 hrs/semana perdidas en facturas",
              },
              {
                icon: "📊",
                title: "Cero visibilidad",
                desc: "No sabes cuánto te deben, quién te pagó, ni cómo va tu flujo de efectivo. Decides a ciegas.",
                stat: "67% de PYMEs sin control de flujo",
              },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-hover" style={{
                  padding: 28, borderRadius: 12, background: c.surface,
                  border: `1px solid ${c.border}`, height: "100%",
                }}>
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{p.icon}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: c.text }}>{p.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: c.textBody, marginBottom: 14 }}>{p.desc}</p>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#D44638", padding: "6px 10px", borderRadius: 6, background: "rgba(212,70,56,0.08)", display: "inline-block" }}>
                    {p.stat}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SOLUTION
         ══════════════════════════════════════════ */}
      <section id="solucion" style={{ padding: "80px 0", background: c.bgAlt }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
          <Reveal>
            <div style={{ maxWidth: 580, margin: "0 auto 52px", textAlign: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: c.accent, textTransform: "uppercase", letterSpacing: "1px", fontFamily: t.mono }}>La solución</span>
              <h2 style={{ fontFamily: t.display, fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, lineHeight: 1.15, marginTop: 8, letterSpacing: "-0.5px" }}>
                Un agente de IA que <span style={{ fontStyle: "italic", color: c.accent }}>opera</span> tu negocio 24/7.
              </h2>
              <p style={{ fontSize: 16, color: c.textBody, lineHeight: 1.7, marginTop: 14 }}>
                Opero conecta tu WhatsApp, tu banco y el SAT en un solo sistema inteligente que cobra, factura y te da visibilidad total — sin que tú muevas un dedo.
              </p>
            </div>
          </Reveal>

          <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {[
              {
                icon: "💬",
                title: "Cobranza inteligente por WhatsApp",
                desc: "Opero envía recordatorios personalizados, negocia plazos, envía links de pago y confirma depósitos — todo automático y en lenguaje natural.",
                tag: "Recupera +35% de cartera",
                tagColor: c.green,
              },
              {
                icon: "🧾",
                title: "Facturación CFDI automática",
                desc: "Genera facturas electrónicas válidas ante el SAT con los datos correctos. Tus clientes reciben su CFDI al instante después de pagar.",
                tag: "Cumplimiento fiscal al 100%",
                tagColor: c.accent,
              },
              {
                icon: "🏦",
                title: "Conciliación bancaria en tiempo real",
                desc: "Conecta tu banco y Opero cruza pagos con facturas automáticamente. Sabes quién pagó y quién no, siempre actualizado.",
                tag: "Ahorra 5+ hrs/semana",
                tagColor: c.gold,
              },
              {
                icon: "📈",
                title: "Dashboard de flujo de efectivo",
                desc: "Visualiza tu situación financiera real: cuentas por cobrar, ingresos, proyecciones. Toma decisiones con datos, no con intuición.",
                tag: "Visibilidad total",
                tagColor: c.accent,
              },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="card-hover" style={{
                  padding: 28, borderRadius: 12, background: c.surface,
                  border: `1px solid ${c.border}`, display: "flex", gap: 18, height: "100%",
                }}>
                  <div style={{ fontSize: 28, flexShrink: 0, marginTop: 2 }}>{f.icon}</div>
                  <div>
                    <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 6, color: c.text }}>{f.title}</h3>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: c.textBody, marginBottom: 12 }}>{f.desc}</p>
                    <span style={{ fontSize: 12, fontWeight: 600, color: f.tagColor, padding: "4px 10px", borderRadius: 5, background: f.tagColor + "14" }}>
                      {f.tag}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS
         ══════════════════════════════════════════ */}
      <section id="como" style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
          <Reveal>
            <div style={{ maxWidth: 560, margin: "0 auto 52px", textAlign: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: c.accent, textTransform: "uppercase", letterSpacing: "1px", fontFamily: t.mono }}>Cómo funciona</span>
              <h2 style={{ fontFamily: t.display, fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, lineHeight: 1.15, marginTop: 8, letterSpacing: "-0.5px" }}>
                Actívalo en <span style={{ fontStyle: "italic" }}>3 pasos</span>.
              </h2>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, maxWidth: 860, margin: "0 auto" }} className="features-grid">
            {[
              { step: "01", title: "Conecta tu WhatsApp", desc: "Escanea un código QR y Opero se vincula a tu WhatsApp Business. Tus contactos no notan ningún cambio.", time: "5 minutos" },
              { step: "02", title: "Sube tu cartera", desc: "Comparte un Excel o foto de tus cuentas por cobrar. Opero estructura los datos y programa la cobranza.", time: "10 minutos" },
              { step: "03", title: "Opero trabaja por ti", desc: "El agente cobra, factura y concilia automáticamente. Tú solo revisas el dashboard y apruebas decisiones clave.", time: "Automático" },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div style={{ textAlign: "center", padding: "32px 24px" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 16, background: c.accentSoft,
                    border: `1.5px solid ${c.accentBorder}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 18px", fontFamily: t.mono, fontSize: 18, fontWeight: 600, color: c.accent,
                  }}>
                    {s.step}
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8, color: c.text }}>{s.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: c.textBody, marginBottom: 10 }}>{s.desc}</p>
                  <span style={{ fontSize: 12, fontFamily: t.mono, color: c.textMuted }}>⏱ {s.time}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PILOT CTA / FORM
         ══════════════════════════════════════════ */}
      <section id="piloto" style={{ padding: "80px 0", background: c.bgDark, color: "white" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
          <div className="hero-grid" style={{ display: "flex", gap: 60, alignItems: "flex-start" }}>
            {/* Left: value prop */}
            <div style={{ flex: 1 }}>
              <Reveal>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, background: "rgba(0,182,122,0.12)", border: "1px solid rgba(0,182,122,0.3)", marginBottom: 20 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: c.green, animation: "pulse 2s infinite" }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: c.green }}>Quedan pocos lugares</span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 style={{ fontFamily: t.display, fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.5px", marginBottom: 18, color: "white" }}>
                  Piloto gratuito para{" "}
                  <span style={{ fontStyle: "italic", color: c.green }}>10 negocios</span>{" "}
                  en Puebla.
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: c.textLight, marginBottom: 28, maxWidth: 480 }}>
                  Buscamos 10 negocios de 5-50 empleados para probar Opero sin costo durante 30 días. A cambio, solo pedimos tu retroalimentación honesta.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div style={{ marginBottom: 20 }}>
                  {[
                    "Cobranza automática por WhatsApp — activada en 24hrs",
                    "Sin costo por 30 días completos",
                    "Sin tarjeta de crédito ni compromiso",
                    "Soporte directo con el equipo fundador",
                    "Mantén todo lo cobrado — Opero no cobra comisión en el piloto",
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 14, color: c.textLight }}>
                      <span style={{ color: c.green, fontSize: 16, flexShrink: 0 }}>✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right: Form */}
            <div style={{ flex: 0.9, minWidth: 320 }}>
              <Reveal delay={0.2}>
                <div style={{
                  background: c.bgDarkCard, borderRadius: 16, padding: 32,
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                }}>
                  {!submitted ? (
                    <>
                      <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: "white" }}>Aplica al piloto</h3>
                      <p style={{ fontSize: 14, color: c.textLight, marginBottom: 24 }}>Te contactamos en menos de 24 horas.</p>

                      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        {[
                          { key: "nombre", label: "Tu nombre", placeholder: "Ej. Carlos Hernández", type: "text" },
                          { key: "negocio", label: "Nombre del negocio", placeholder: "Ej. Refaccionaria Don Carlos", type: "text" },
                          { key: "telefono", label: "WhatsApp", placeholder: "Ej. 222 123 4567", type: "tel" },
                        ].map((f) => (
                          <div key={f.key}>
                            <label style={{ fontSize: 13, fontWeight: 500, color: c.textLight, display: "block", marginBottom: 5 }}>{f.label}</label>
                            <input
                              type={f.type}
                              placeholder={f.placeholder}
                              value={formData[f.key]}
                              onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                              style={{
                                width: "100%", padding: "11px 14px", borderRadius: 8,
                                border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)",
                                color: "white", fontSize: 14, fontFamily: t.body,
                              }}
                            />
                          </div>
                        ))}

                        <div>
                          <label style={{ fontSize: 13, fontWeight: 500, color: c.textLight, display: "block", marginBottom: 5 }}>Número de empleados</label>
                          <select
                            value={formData.empleados}
                            onChange={(e) => setFormData({ ...formData, empleados: e.target.value })}
                            style={{
                              width: "100%", padding: "11px 14px", borderRadius: 8,
                              border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)",
                              color: formData.empleados ? "white" : "#7A8194", fontSize: 14, fontFamily: t.body,
                            }}
                          >
                            <option value="" style={{ background: c.bgDarkCard }}>Selecciona</option>
                            <option value="1-5" style={{ background: c.bgDarkCard }}>1–5</option>
                            <option value="6-15" style={{ background: c.bgDarkCard }}>6–15</option>
                            <option value="16-30" style={{ background: c.bgDarkCard }}>16–30</option>
                            <option value="31-50" style={{ background: c.bgDarkCard }}>31–50</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ fontSize: 13, fontWeight: 500, color: c.textLight, display: "block", marginBottom: 5 }}>¿Cuál es tu mayor dolor operativo?</label>
                          <textarea
                            placeholder="Ej. No puedo cobrar a tiempo, mis clientes me deben mucho..."
                            rows={3}
                            value={formData.dolor}
                            onChange={(e) => setFormData({ ...formData, dolor: e.target.value })}
                            style={{
                              width: "100%", padding: "11px 14px", borderRadius: 8,
                              border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)",
                              color: "white", fontSize: 14, fontFamily: t.body, resize: "vertical",
                            }}
                          />
                        </div>

                        <button
                          onClick={handleSubmit}
                          className="cta-main"
                          style={{
                            width: "100%", padding: "14px", borderRadius: 10,
                            background: c.accent, color: "white", border: "none",
                            fontSize: 16, fontWeight: 600, cursor: "pointer", marginTop: 4,
                          }}
                        >
                          Quiero entrar al piloto →
                        </button>

                        <p style={{ fontSize: 12, color: "#5A6A7A", textAlign: "center", marginTop: 4 }}>
                          Sin spam. Sin compromiso. Solo resultados.
                        </p>
                      </div>
                    </>
                  ) : (
                    <div style={{ textAlign: "center", padding: "20px 0" }}>
                      <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                      <h3 style={{ fontSize: 22, fontWeight: 700, color: "white", marginBottom: 8 }}>¡Solicitud recibida!</h3>
                      <p style={{ fontSize: 15, color: c.textLight, lineHeight: 1.7, marginBottom: 20 }}>
                        {formData.nombre}, te contactaremos por WhatsApp al <strong style={{ color: "white" }}>{formData.telefono}</strong> en menos de 24 horas para activar Opero en <strong style={{ color: "white" }}>{formData.negocio}</strong>.
                      </p>
                      <a href={WHATSAPP_LINK} target="_blank" rel="noopener" className="cta-wa" style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        padding: "12px 24px", borderRadius: 10, background: c.whatsapp, color: "white",
                        fontSize: 15, fontWeight: 600, textDecoration: "none",
                      }}>
                        O escríbenos ahora por WhatsApp
                      </a>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
         ══════════════════════════════════════════ */}
      <section style={{ padding: "72px 0" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px" }}>
          <Reveal>
            <h2 style={{ fontFamily: t.display, fontSize: 32, fontWeight: 400, textAlign: "center", marginBottom: 40, letterSpacing: "-0.5px" }}>
              Preguntas frecuentes
            </h2>
          </Reveal>
          {[
            { q: "¿Qué pasa después de los 30 días del piloto?", a: "Tú decides. Si Opero te generó valor, te ofreceremos un plan desde $499 MXN/mes. Si no, nos despedimos sin costo alguno. Sin letras chiquitas." },
            { q: "¿Opero reemplaza a mi contador?", a: "No. Opero automatiza la operación diaria (cobranza, facturación, conciliación), pero tu contador sigue siendo clave para declaraciones fiscales y estrategia. De hecho, a tu contador le va a encantar que todo esté más ordenado." },
            { q: "¿Mis clientes sabrán que es un robot?", a: "Los mensajes son personalizados y en lenguaje natural. Tus clientes sentirán que alguien de tu equipo los está contactando profesionalmente. Tú apruebas el tono y estilo de comunicación." },
            { q: "¿Es seguro conectar mi WhatsApp y banco?", a: "Sí. Usamos conexiones cifradas y no almacenamos credenciales bancarias. Solo leemos movimientos para conciliar; nunca movemos dinero. Cumplimos con la Ley Federal de Protección de Datos Personales." },
            { q: "¿Qué tipo de negocios se benefician más?", a: "Negocios que venden a crédito o con pagos diferidos: distribuidoras, refaccionarias, consultorios, despachos, talleres, restaurantes con servicio a empresas. Si tienes cuentas por cobrar, Opero es para ti." },
          ].map((faq, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <FaqItem q={faq.q} a={faq.a} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA
         ══════════════════════════════════════════ */}
      <section style={{ padding: "64px 0", background: c.bgAlt, borderTop: `1px solid ${c.border}` }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontFamily: t.display, fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.5px", marginBottom: 14 }}>
              Deja de perseguir pagos.<br />
              <span style={{ fontStyle: "italic", color: c.accent }}>Deja que Opero lo haga.</span>
            </h2>
            <p style={{ fontSize: 16, color: c.textBody, marginBottom: 24 }}>
              10 lugares disponibles para negocios en Puebla. Sin costo. Sin compromiso.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#piloto" className="cta-main" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 32px", borderRadius: 10, background: c.accent, color: "white",
                fontSize: 16, fontWeight: 600, textDecoration: "none",
              }}>
                Aplicar al piloto gratuito →
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener" className="cta-wa" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 28px", borderRadius: 10, background: c.whatsapp, color: "white",
                fontSize: 16, fontWeight: 600, textDecoration: "none",
              }}>
                💬 WhatsApp directo
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
         ══════════════════════════════════════════ */}
      <footer style={{ padding: "40px 0 32px", background: c.bgDark, color: c.textLight, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="footer-grid" style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: c.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 14, fontFamily: t.display }}>O</div>
              <span style={{ fontSize: 18, fontWeight: 700, color: "white" }}>Opero</span>
            </div>
            <p style={{ fontSize: 14, color: "#6B7B8D", lineHeight: 1.7, maxWidth: 340 }}>
              Agentes de IA que operan tu negocio: cobranza, facturación y conciliación automática para PYMEs mexicanas.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: "white", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.5px" }}>Producto</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a href="#solucion" style={{ fontSize: 14, color: "#6B7B8D", textDecoration: "none" }}>Funcionalidades</a>
              <a href="#como" style={{ fontSize: 14, color: "#6B7B8D", textDecoration: "none" }}>Cómo funciona</a>
              <a href="#piloto" style={{ fontSize: 14, color: "#6B7B8D", textDecoration: "none" }}>Piloto gratuito</a>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: "white", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.5px" }}>Contacto</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener" style={{ fontSize: 14, color: "#6B7B8D", textDecoration: "none" }}>WhatsApp</a>
              <span style={{ fontSize: 14, color: "#6B7B8D" }}>diegosilva200305@gmail.com</span>
              <span style={{ fontSize: 14, color: "#6B7B8D" }}>Puebla, México</span>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "24px 24px 0", borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 32 }}>
          <p style={{ fontSize: 12, color: "#4A5568" }}>© 2026 Opero. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

// ── FAQ Accordion Component ──
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #E8E6E1", overflow: "hidden" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", padding: "18px 0", background: "none", border: "none",
          cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
          textAlign: "left",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 500, color: "#1A1D23", paddingRight: 16 }}>{q}</span>
        <span style={{
          fontSize: 20, color: "#7A8194", transition: "transform 0.3s",
          transform: open ? "rotate(45deg)" : "rotate(0deg)", flexShrink: 0,
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? 300 : 0,
        opacity: open ? 1 : 0,
        transition: "max-height 0.4s ease, opacity 0.3s ease",
        overflow: "hidden",
      }}>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: "#3D424D", paddingBottom: 18 }}>{a}</p>
      </div>
    </div>
  );
}

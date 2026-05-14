/**
 * WeddingNav — Navegação sticky
 * Paleta: Off-white (#FAFAF7) + Dourado (#C9A84C / #9A7A20)
 */

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#inicio",    label: "Início" },
  { href: "#detalhes",  label: "Detalhes" },
  { href: "#confirmar", label: "Confirmar" },
];

export default function WeddingNav() {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
      style={{
        backdropFilter: "blur(16px)",
        background: "rgba(250,250,247,0.93)",
        borderBottom: "1px solid rgba(201,168,76,0.18)",
      }}
    >
      <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="font-display text-xl font-light gold-gradient-text">I & R</div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="font-label text-[0.58rem] tracking-[0.3em] uppercase text-[#8A7D68] hover:text-[#9A7A20] transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#confirmar")}
            className="btn-wedding-primary py-2 px-5 text-[0.58rem]"
          >
            RSVP
          </button>
        </div>

        <button className="md:hidden text-[#9A7A20]" onClick={() => setMobileOpen((o) => !o)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden px-6 py-4 space-y-3"
          style={{ background: "rgba(250,250,247,0.98)", borderTop: "1px solid rgba(201,168,76,0.15)" }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left font-label text-[0.62rem] tracking-[0.3em] uppercase text-[#8A7D68] hover:text-[#9A7A20] py-2 transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#confirmar")}
            className="btn-wedding-primary block text-center w-full py-3"
          >
            Confirmar Presença
          </button>
        </div>
      )}
    </nav>
  );
}

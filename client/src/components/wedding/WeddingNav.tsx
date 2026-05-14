/**
 * WeddingNav — Navegação sticky elegante e discreta
 * Design: Aparece após scroll, fundo fosco creme, links em Cinzel
 */

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#detalhes", label: "Detalhes" },
  { href: "#confirmar", label: "Confirmar" },
];

export default function WeddingNav() {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 nav-sticky transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo / Monogram */}
        <div className="font-display text-xl font-light gold-gradient-text">
          I & R
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="font-label text-[0.6rem] tracking-[0.3em] uppercase text-[oklch(0.55_0.04_65)] hover:text-[oklch(0.62_0.1_75)] transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
          <a
            href="#confirmar"
            onClick={(e) => { e.preventDefault(); handleNavClick("#confirmar"); }}
            className="btn-wedding-primary py-2 px-5 text-[0.6rem]"
          >
            RSVP
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[oklch(0.62_0.1_75)]"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[oklch(0.97_0.02_85/0.98)] border-t border-[oklch(0.72_0.1_80/0.2)] px-6 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left font-label text-[0.65rem] tracking-[0.3em] uppercase text-[oklch(0.55_0.04_65)] hover:text-[oklch(0.62_0.1_75)] py-2 transition-colors"
            >
              {link.label}
            </button>
          ))}
          <a
            href="#confirmar"
            onClick={(e) => { e.preventDefault(); handleNavClick("#confirmar"); }}
            className="btn-wedding-primary block text-center py-3"
          >
            Confirmar Presença
          </a>
        </div>
      )}
    </nav>
  );
}

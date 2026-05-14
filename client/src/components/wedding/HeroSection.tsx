/**
 * HeroSection — Abertura dramática do convite com animação de envelope
 * Design: Fundo floral bokeh, monograma central, animação de entrada suave
 */

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348239620/KirE3dTZFbG3AbQWJYn9MY/wedding-hero-bg-576CMBupKZqgZJjX27TPkD.webp";
const FLORAL_ORNAMENT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348239620/KirE3dTZFbG3AbQWJYn9MY/wedding-floral-ornament-cnMzDwJtgYJsGoFoy7GVaj.webp";

interface HeroSectionProps {
  onEnter: () => void;
}

export default function HeroSection({ onEnter }: HeroSectionProps) {
  const [opened, setOpened] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);

  const handleOpen = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setOpened(true);
      onEnter();
      setTimeout(() => setShowScrollHint(true), 1500);
    }, 600);
  };

  useEffect(() => {
    // Auto-hint after 3s
    const timer = setTimeout(() => {
      if (!opened) {
        const hint = document.getElementById("open-hint");
        if (hint) hint.classList.add("animate-pulse");
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [opened]);

  if (opened) {
    return (
      <section
        id="inicio"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[oklch(0.97_0.02_85/0.55)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.97_0.02_85/0.3)] via-transparent to-[oklch(0.97_0.02_85/0.7)]" />

        <div className="relative z-10 text-center px-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          {/* Floral top ornament */}
          <div className="flex justify-center mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
            <img src={FLORAL_ORNAMENT} alt="Ornamento floral" className="w-72 md:w-96 opacity-80" />
          </div>

          {/* Pre-title */}
          <p
            className="font-label text-[0.65rem] tracking-[0.4em] uppercase text-[oklch(0.62_0.1_75)] mb-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            Convidam para o seu
          </p>

          {/* Monogram */}
          <div
            className="font-display text-[5rem] md:text-[8rem] leading-none font-light text-[oklch(0.62_0.1_75)] mb-2 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            I <span className="text-[oklch(0.45_0.05_60)] text-[3rem] md:text-[5rem]">&</span> R
          </div>

          {/* Names */}
          <h1
            className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-[oklch(0.25_0.04_55)] mb-3 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
          >
            Isabella <span className="italic font-extralight">&</span> Rafael
          </h1>

          {/* Subtitle */}
          <p
            className="font-label text-[0.65rem] tracking-[0.35em] uppercase text-[oklch(0.55_0.04_65)] mb-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
          >
            Casamento
          </p>

          {/* Date */}
          <div
            className="flex items-center justify-center gap-6 mb-10 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[oklch(0.72_0.1_80)]" />
            <p className="font-heading text-xl md:text-2xl text-[oklch(0.45_0.05_60)] italic">
              14 de Setembro de 2025
            </p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[oklch(0.72_0.1_80)]" />
          </div>

          {/* Venue */}
          <p
            className="font-body text-base md:text-lg text-[oklch(0.55_0.04_65)] mb-12 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}
          >
            Palácio das Rosas · São Paulo, Brasil
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up"
            style={{ animationDelay: "1.0s", animationFillMode: "forwards" }}
          >
            <a href="#confirmar" className="btn-wedding-primary relative z-10">
              Confirmar Presença
            </a>
            <a href="#detalhes" className="btn-wedding-outline">
              Ver Detalhes
            </a>
          </div>
        </div>

        {/* Floral bottom ornament */}
        <div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "1.1s", animationFillMode: "forwards" }}
        >
          <img src={FLORAL_ORNAMENT} alt="" className="w-64 md:w-80 opacity-60 rotate-180" />
        </div>

        {/* Scroll hint */}
        {showScrollHint && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="font-label text-[0.6rem] tracking-[0.3em] uppercase text-[oklch(0.62_0.1_75)]">Rolar</span>
            <ChevronDown size={16} className="text-[oklch(0.62_0.1_75)]" />
          </div>
        )}
      </section>
    );
  }

  // Closed envelope / invitation cover
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${HERO_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[oklch(0.25_0.04_55/0.5)]" />

      <div className={`relative z-10 text-center px-6 transition-all duration-600 ${animating ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}>
        {/* Envelope card */}
        <div className="max-w-sm mx-auto gold-border-card rounded-sm p-10 shadow-2xl"
          style={{ boxShadow: "0 25px 80px oklch(0.25 0.04 55 / 0.5), 0 0 0 1px oklch(0.72 0.1 80 / 0.3)" }}
        >
          <div className="flex justify-center mb-6">
            <img src={FLORAL_ORNAMENT} alt="" className="w-48 opacity-70" />
          </div>

          <p className="font-label text-[0.6rem] tracking-[0.4em] uppercase text-[oklch(0.62_0.1_75)] mb-4">
            Você está convidado
          </p>

          <div className="font-display text-6xl font-light gold-gradient-text mb-3">
            I & R
          </div>

          <h2 className="font-display text-2xl font-light text-[oklch(0.25_0.04_55)] mb-1">
            Isabella & Rafael
          </h2>

          <p className="font-body text-sm text-[oklch(0.55_0.04_65)] italic mb-8">
            14 · IX · 2025
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.1_80)] to-transparent mb-8" />

          <button
            id="open-hint"
            onClick={handleOpen}
            className="btn-wedding-primary w-full"
            disabled={animating}
          >
            {animating ? "Abrindo..." : "Abrir Convite"}
          </button>

          <p className="font-body text-xs text-[oklch(0.65_0.04_65)] mt-4 italic">
            Toque para revelar o convite
          </p>
        </div>
      </div>
    </section>
  );
}

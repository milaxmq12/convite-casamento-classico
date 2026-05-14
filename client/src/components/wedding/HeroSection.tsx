/**
 * HeroSection — Abertura do convite com animação de envelope
 * Paleta: Off-white puro (#FAFAF7 / #FFFFFF) + Dourado (#C9A84C / #9A7A20)
 * Botão de música visível após abrir o convite
 */

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Music, Pause, Play } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348239620/KirE3dTZFbG3AbQWJYn9MY/wedding-hero-bg-576CMBupKZqgZJjX27TPkD.webp";
const FLORAL_ORNAMENT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348239620/KirE3dTZFbG3AbQWJYn9MY/wedding-floral-ornament-cnMzDwJtgYJsGoFoy7GVaj.webp";

interface HeroSectionProps {
  onEnter: () => void;
}

export default function HeroSection({ onEnter }: HeroSectionProps) {
  const [opened, setOpened] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpen = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setOpened(true);
      onEnter();
      // Try to play music automatically
      tryPlayMusic();
      setTimeout(() => setShowScrollHint(true), 1800);
    }, 600);
  };

  const tryPlayMusic = () => {
    // Find the global audio element managed by MusicPlayer and trigger it
    // We dispatch a custom event that MusicPlayer listens to
    window.dispatchEvent(new CustomEvent("wedding-music-play"));
  };

  const toggleHeroMusic = () => {
    window.dispatchEvent(new CustomEvent(musicPlaying ? "wedding-music-pause" : "wedding-music-play"));
    setMusicPlaying((p) => !p);
  };

  // Listen for external music state changes
  useEffect(() => {
    const onPlay = () => setMusicPlaying(true);
    const onPause = () => setMusicPlaying(false);
    window.addEventListener("wedding-music-playing", onPlay);
    window.addEventListener("wedding-music-paused", onPause);
    return () => {
      window.removeEventListener("wedding-music-playing", onPlay);
      window.removeEventListener("wedding-music-paused", onPause);
    };
  }, []);

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
        {/* Overlays */}
        <div className="absolute inset-0 bg-[rgba(250,250,247,0.52)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(250,250,247,0.25)] via-transparent to-[rgba(250,250,247,0.65)]" />

        <div className="relative z-10 text-center px-6">
          {/* Floral top */}
          <div
            className="flex justify-center mb-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            <img src={FLORAL_ORNAMENT} alt="" className="w-72 md:w-96 opacity-85" />
          </div>

          {/* Pre-title */}
          <p
            className="font-label text-[0.62rem] tracking-[0.42em] uppercase text-[#9A7A20] mb-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            Convidam para o seu
          </p>

          {/* Monogram */}
          <div
            className="font-display text-[5.5rem] md:text-[8.5rem] leading-none font-light gold-gradient-text mb-2 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            I <span className="text-[#C9A84C] text-[3.5rem] md:text-[5.5rem]">&</span> R
          </div>

          {/* Names */}
          <h1
            className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-[#2C2416] mb-3 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
          >
            Isabella <span className="italic font-extralight">&</span> Rafael
          </h1>

          {/* Subtitle label */}
          <p
            className="font-label text-[0.62rem] tracking-[0.38em] uppercase text-[#8A7D68] mb-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
          >
            Casamento
          </p>

          {/* Date */}
          <div
            className="flex items-center justify-center gap-6 mb-10 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A84C]" />
            <p className="font-heading text-xl md:text-2xl text-[#5A4E38] italic">
              14 de Setembro de 2025
            </p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A84C]" />
          </div>

          {/* Venue */}
          <p
            className="font-body text-base md:text-lg text-[#8A7D68] mb-10 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}
          >
            Palácio das Rosas · São Paulo, Brasil
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "1.0s", animationFillMode: "forwards" }}
          >
            <a href="#confirmar" className="btn-wedding-primary">
              Confirmar Presença
            </a>
            <a href="#detalhes" className="btn-wedding-outline">
              Ver Detalhes
            </a>
          </div>

          {/* Music button — visible inside the invitation */}
          <div
            className="flex justify-center opacity-0 animate-fade-in-up"
            style={{ animationDelay: "1.15s", animationFillMode: "forwards" }}
          >
            <button
              onClick={toggleHeroMusic}
              className="inline-flex items-center gap-2 border border-[rgba(201,168,76,0.5)] bg-[rgba(255,255,255,0.7)] backdrop-blur-sm px-5 py-2.5 rounded-sm text-[#9A7A20] hover:bg-[rgba(201,168,76,0.12)] hover:border-[#C9A84C] transition-all duration-300"
            >
              {musicPlaying ? <Pause size={13} /> : <Play size={13} />}
              <span className="font-label text-[0.58rem] tracking-[0.25em] uppercase">
                {musicPlaying ? "Pausar Música" : "Tocar Música"}
              </span>
              {musicPlaying && (
                <span className="flex gap-0.5 items-end h-3">
                  {[1, 2, 3].map((b) => (
                    <span
                      key={b}
                      className="w-0.5 bg-[#C9A84C] rounded-full inline-block"
                      style={{
                        height: "100%",
                        animation: `sound-bar ${0.4 + b * 0.1}s ease-in-out infinite alternate`,
                        animationDelay: `${b * 0.1}s`,
                      }}
                    />
                  ))}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Floral bottom */}
        <div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "1.1s", animationFillMode: "forwards" }}
        >
          <img src={FLORAL_ORNAMENT} alt="" className="w-64 md:w-80 opacity-55 rotate-180" />
        </div>

        {/* Scroll hint */}
        {showScrollHint && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="font-label text-[0.58rem] tracking-[0.3em] uppercase text-[#C9A84C]">Rolar</span>
            <ChevronDown size={16} className="text-[#C9A84C]" />
          </div>
        )}
      </section>
    );
  }

  // ── Closed envelope / invitation cover ──
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${HERO_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[rgba(44,36,22,0.48)]" />

      <div
        className={`relative z-10 text-center px-6 transition-all duration-500 ${
          animating ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <div
          className="max-w-sm mx-auto rounded-sm p-10 shadow-2xl"
          style={{
            background: "rgba(255,255,255,0.97)",
            border: "1px solid rgba(201,168,76,0.4)",
            boxShadow: "0 30px 90px rgba(44,36,22,0.5), 0 0 0 1px rgba(201,168,76,0.25)",
          }}
        >
          <div className="flex justify-center mb-6">
            <img src={FLORAL_ORNAMENT} alt="" className="w-48 opacity-75" />
          </div>

          <p className="font-label text-[0.58rem] tracking-[0.42em] uppercase text-[#9A7A20] mb-4">
            Você está convidado
          </p>

          <div className="font-display text-6xl font-light gold-gradient-text mb-3">
            I & R
          </div>

          <h2 className="font-display text-2xl font-light text-[#2C2416] mb-1">
            Isabella & Rafael
          </h2>

          <p className="font-body text-sm text-[#8A7D68] italic mb-8">
            14 · IX · 2025
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mb-8" />

          <button
            onClick={handleOpen}
            disabled={animating}
            className="btn-wedding-primary w-full"
          >
            {animating ? "Abrindo..." : "Abrir Convite"}
          </button>

          <p className="font-body text-xs text-[#8A7D68] mt-4 italic">
            Toque para revelar o convite
          </p>
        </div>
      </div>
    </section>
  );
}

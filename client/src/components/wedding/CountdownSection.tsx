/**
 * CountdownSection — Contador regressivo elegante para o dia do casamento
 * Design: Números grandes em Cormorant Garamond, fundo creme com bordas douradas
 */

import { useState, useEffect } from "react";

const WEDDING_DATE = new Date("2025-09-14T17:00:00");

function getTimeLeft() {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

interface CountdownUnit {
  value: number;
  label: string;
}

function CountdownCard({ value, label }: CountdownUnit) {
  const [prev, setPrev] = useState(value);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    if (value !== prev) {
      setAnimKey((k) => k + 1);
      setPrev(value);
    }
  }, [value, prev]);

  return (
    <div className="flex flex-col items-center">
      <div
        className="gold-border-card rounded-sm w-20 h-20 md:w-28 md:h-28 flex items-center justify-center relative overflow-hidden"
        style={{ boxShadow: "0 4px 20px oklch(0.72 0.1 80 / 0.15)" }}
      >
        <span
          key={animKey}
          className="font-display text-4xl md:text-5xl font-light text-[oklch(0.25_0.04_55)]"
          style={{
            animation: "count-flip 0.4s cubic-bezier(0.23, 1, 0.32, 1) forwards",
          }}
        >
          {String(value).padStart(2, "0")}
        </span>
        {/* Gold corner accents */}
        <span className="absolute top-1 left-1 w-3 h-3 border-t border-l border-[oklch(0.72_0.1_80)]" />
        <span className="absolute top-1 right-1 w-3 h-3 border-t border-r border-[oklch(0.72_0.1_80)]" />
        <span className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-[oklch(0.72_0.1_80)]" />
        <span className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-[oklch(0.72_0.1_80)]" />
      </div>
      <p className="font-label text-[0.6rem] tracking-[0.3em] uppercase text-[oklch(0.62_0.1_75)] mt-3">
        {label}
      </p>
    </div>
  );
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isPast = WEDDING_DATE.getTime() < Date.now();

  return (
    <section className="py-20 md:py-28 bg-[oklch(0.93_0.03_85)]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="reveal">
          <p className="font-label text-[0.6rem] tracking-[0.4em] uppercase text-[oklch(0.62_0.1_75)] mb-4">
            {isPast ? "O grande dia chegou" : "Faltam apenas"}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-light text-[oklch(0.25_0.04_55)] mb-3 italic">
            {isPast ? "Hoje é o nosso dia" : "Para o nosso grande dia"}
          </h2>
          <div className="ornament-divider mb-10">
            <span className="font-display text-xl text-[oklch(0.72_0.1_80)]">✦</span>
          </div>
        </div>

        {!isPast && (
          <div className="reveal delay-200 flex items-start justify-center gap-4 md:gap-8">
            <CountdownCard value={timeLeft.days} label="Dias" />
            <div className="font-display text-3xl md:text-4xl text-[oklch(0.72_0.1_80)] mt-6 md:mt-8 font-light">:</div>
            <CountdownCard value={timeLeft.hours} label="Horas" />
            <div className="font-display text-3xl md:text-4xl text-[oklch(0.72_0.1_80)] mt-6 md:mt-8 font-light">:</div>
            <CountdownCard value={timeLeft.minutes} label="Minutos" />
            <div className="font-display text-3xl md:text-4xl text-[oklch(0.72_0.1_80)] mt-6 md:mt-8 font-light">:</div>
            <CountdownCard value={timeLeft.seconds} label="Segundos" />
          </div>
        )}

        {isPast && (
          <div className="reveal delay-200">
            <p className="font-display text-5xl md:text-7xl font-light italic text-[oklch(0.62_0.1_75)]">
              14 · IX · 2025
            </p>
          </div>
        )}

        <div className="reveal delay-300 mt-12">
          <p className="font-body text-base md:text-lg text-[oklch(0.55_0.04_65)] italic">
            "O amor é paciente, o amor é bondoso. Ele não inveja, não se vangloria, não se orgulha."
          </p>
          <p className="font-label text-[0.6rem] tracking-[0.25em] uppercase text-[oklch(0.72_0.1_80)] mt-2">
            — 1 Coríntios 13:4
          </p>
        </div>
      </div>
    </section>
  );
}

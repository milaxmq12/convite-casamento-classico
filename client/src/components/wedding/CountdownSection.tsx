/**
 * CountdownSection — Contador regressivo para o casamento
 * Paleta: Off-white (#F5F5F0) + Dourado (#C9A84C / #9A7A20)
 */

import { useState, useEffect } from "react";

const WEDDING_DATE = new Date("2025-09-14T17:00:00");

function getTimeLeft() {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function CountdownCard({ value, label }: { value: number; label: string }) {
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
        className="rounded-sm w-20 h-20 md:w-28 md:h-28 flex items-center justify-center relative overflow-hidden"
        style={{
          background: "#FFFFFF",
          border: "1px solid rgba(201,168,76,0.35)",
          boxShadow: "0 4px 20px rgba(201,168,76,0.12)",
        }}
      >
        <span
          key={animKey}
          className="font-display text-4xl md:text-5xl font-light text-[#2C2416]"
          style={{ animation: "count-flip 0.4s cubic-bezier(0.23,1,0.32,1) forwards" }}
        >
          {String(value).padStart(2, "0")}
        </span>
        <span className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-[#C9A84C]" />
        <span className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-[#C9A84C]" />
        <span className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-[#C9A84C]" />
        <span className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-[#C9A84C]" />
      </div>
      <p className="font-label text-[0.58rem] tracking-[0.3em] uppercase text-[#9A7A20] mt-3">
        {label}
      </p>
    </div>
  );
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const isPast = WEDDING_DATE.getTime() < Date.now();

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 md:py-28" style={{ background: "#F5F5F0" }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="reveal">
          <p className="font-label text-[0.58rem] tracking-[0.42em] uppercase text-[#9A7A20] mb-4">
            {isPast ? "O grande dia chegou" : "Faltam apenas"}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-light text-[#2C2416] mb-3 italic">
            {isPast ? "Hoje é o nosso dia" : "Para o nosso grande dia"}
          </h2>
          <div className="ornament-divider mb-10">
            <span className="font-display text-xl text-[#C9A84C]">✦</span>
          </div>
        </div>

        {!isPast && (
          <div className="reveal delay-200 flex items-start justify-center gap-4 md:gap-8">
            <CountdownCard value={timeLeft.days}    label="Dias" />
            <div className="font-display text-3xl md:text-4xl text-[#C9A84C] mt-6 md:mt-8 font-light">:</div>
            <CountdownCard value={timeLeft.hours}   label="Horas" />
            <div className="font-display text-3xl md:text-4xl text-[#C9A84C] mt-6 md:mt-8 font-light">:</div>
            <CountdownCard value={timeLeft.minutes} label="Minutos" />
            <div className="font-display text-3xl md:text-4xl text-[#C9A84C] mt-6 md:mt-8 font-light">:</div>
            <CountdownCard value={timeLeft.seconds} label="Segundos" />
          </div>
        )}

        {isPast && (
          <div className="reveal delay-200">
            <p className="font-display text-5xl md:text-7xl font-light italic text-[#9A7A20]">
              14 · IX · 2025
            </p>
          </div>
        )}

        <div className="reveal delay-300 mt-12">
          <p className="font-body text-base md:text-lg text-[#8A7D68] italic">
            "O amor é paciente, o amor é bondoso. Ele não inveja, não se vangloria, não se orgulha."
          </p>
          <p className="font-label text-[0.58rem] tracking-[0.25em] uppercase text-[#C9A84C] mt-2">
            — 1 Coríntios 13:4
          </p>
        </div>
      </div>
    </section>
  );
}

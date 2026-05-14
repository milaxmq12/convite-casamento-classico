/**
 * EventDetailsSection — Cerimônia e Recepção
 * Paleta: Fundo escuro (foto do salão) + cards off-white/dourado
 */

import { MapPin, Calendar, Utensils, Music, Camera } from "lucide-react";

const VENUE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348239620/KirE3dTZFbG3AbQWJYn9MY/wedding-venue-bg-kZM7zm8CvmL9vi8GpVBYqA.webp";

function EventCard({
  icon, title, subtitle, details, delay = "0ms",
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  details: { label: string; value: string }[];
  delay?: string;
}) {
  return (
    <div
      className="reveal rounded-sm p-8 md:p-10 relative"
      style={{
        transitionDelay: delay,
        background: "rgba(255,255,255,0.96)",
        border: "1px solid rgba(201,168,76,0.35)",
        boxShadow: "0 4px 30px rgba(201,168,76,0.1)",
      }}
    >
      <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#C9A84C]" />
      <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#C9A84C]" />
      <span className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#C9A84C]" />
      <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#C9A84C]" />

      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[rgba(201,168,76,0.4)] text-[#9A7A20] mb-4">
          {icon}
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-light text-[#2C2416] italic">{title}</h3>
        <p className="font-label text-[0.58rem] tracking-[0.3em] uppercase text-[#C9A84C] mt-1">{subtitle}</p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.4)] to-transparent mb-6" />

      <div className="space-y-4">
        {details.map((d, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="font-label text-[0.52rem] tracking-[0.2em] uppercase text-[#C9A84C] pt-1 min-w-[60px]">
              {d.label}
            </span>
            <span className="font-body text-sm md:text-base text-[#5A4E38] leading-snug">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EventDetailsSection() {
  return (
    <section id="detalhes" className="relative py-20 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: `url(${VENUE_BG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="absolute inset-0 bg-[rgba(20,14,6,0.82)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="font-label text-[0.58rem] tracking-[0.42em] uppercase text-[#E8D08A] mb-3">
            Programação
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-[#FAFAF7] italic mb-4">
            O Grande Dia
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#C9A84C]" />
            <span className="font-display text-xl text-[#C9A84C]">✦</span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#C9A84C]" />
          </div>
        </div>

        {/* Date highlight */}
        <div className="reveal delay-100 text-center mb-12">
          <div className="inline-block px-10 py-4 rounded-sm" style={{ border: "1px solid rgba(201,168,76,0.4)" }}>
            <p className="font-display text-3xl md:text-4xl font-light text-[#FAFAF7] italic">
              Domingo, 14 de Setembro de 2025
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <EventCard
            icon={<Calendar size={20} />}
            title="Cerimônia"
            subtitle="Religiosa"
            delay="100ms"
            details={[
              { label: "Horário",  value: "17h00" },
              { label: "Local",    value: "Igreja Nossa Senhora das Graças" },
              { label: "Endereço", value: "Rua das Flores, 240 — Jardins, São Paulo" },
              { label: "Duração",  value: "Aproximadamente 1 hora" },
            ]}
          />
          <EventCard
            icon={<Utensils size={20} />}
            title="Recepção"
            subtitle="Jantar & Festa"
            delay="200ms"
            details={[
              { label: "Horário",    value: "19h30" },
              { label: "Local",      value: "Palácio das Rosas — Salão Imperial" },
              { label: "Endereço",   value: "Av. Paulista, 1500 — Bela Vista, São Paulo" },
              { label: "Dress Code", value: "Black Tie" },
            ]}
          />
        </div>

        {/* Timeline */}
        <div
          className="reveal delay-300 rounded-sm p-8 md:p-10"
          style={{ background: "rgba(255,255,255,0.96)", border: "1px solid rgba(201,168,76,0.35)" }}
        >
          <h3 className="font-display text-2xl font-light text-[#2C2416] italic text-center mb-8">
            Programação da Noite
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { time: "17h00", label: "Cerimônia", icon: <Calendar size={16} /> },
              { time: "19h30", label: "Coquetel",  icon: <Music size={16} /> },
              { time: "20h30", label: "Jantar",    icon: <Utensils size={16} /> },
              { time: "22h00", label: "Festa",     icon: <Camera size={16} /> },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full border border-[rgba(201,168,76,0.5)] flex items-center justify-center text-[#9A7A20]">
                  {item.icon}
                </div>
                <p className="font-display text-xl font-light text-[#2C2416]">{item.time}</p>
                <p className="font-label text-[0.52rem] tracking-[0.25em] uppercase text-[#8A7D68]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Map link */}
        <div className="reveal delay-400 text-center mt-8">
          <a
            href="https://maps.google.com/?q=Palácio+das+Rosas+São+Paulo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-label text-[0.62rem] tracking-[0.2em] uppercase text-[#E8D08A] border border-[rgba(201,168,76,0.45)] px-6 py-3 rounded-sm hover:bg-[rgba(201,168,76,0.12)] transition-all duration-300"
          >
            <MapPin size={14} />
            Ver no Mapa
          </a>
        </div>
      </div>
    </section>
  );
}

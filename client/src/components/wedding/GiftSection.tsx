/**
 * GiftSection — Lista de presentes e contribuição para lua de mel
 * Design: Cards com ícones, fundo creme, bordas douradas
 */

import { Gift, Heart, Plane, Home } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface GiftOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  onAction: () => void;
  delay?: string;
}

function GiftOption({ icon, title, description, action, onAction, delay = "0ms" }: GiftOptionProps) {
  return (
    <div
      className="reveal gold-border-card rounded-sm p-7 text-center group hover:shadow-lg transition-all duration-300"
      style={{ transitionDelay: delay }}
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[oklch(0.72_0.1_80/0.3)] text-[oklch(0.62_0.1_75)] mb-5 group-hover:border-[oklch(0.72_0.1_80)] transition-colors duration-300">
        {icon}
      </div>
      <h3 className="font-display text-xl font-light text-[oklch(0.25_0.04_55)] italic mb-2">{title}</h3>
      <p className="font-body text-sm text-[oklch(0.55_0.04_65)] leading-relaxed mb-6">{description}</p>
      <button
        onClick={onAction}
        className="btn-wedding-outline text-xs w-full"
      >
        {action}
      </button>
    </div>
  );
}

export default function GiftSection() {
  const handleGiftClick = (type: string) => {
    toast.success(`Redirecionando para ${type}...`, {
      description: "Obrigado pela sua generosidade!",
      style: {
        fontFamily: "'EB Garamond', serif",
        background: "oklch(0.99 0.01 85)",
        border: "1px solid oklch(0.72 0.1 80 / 0.4)",
        color: "oklch(0.25 0.04 55)",
      },
    });
  };

  return (
    <section className="py-20 md:py-32 bg-[oklch(0.97_0.02_85)]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="font-label text-[0.6rem] tracking-[0.4em] uppercase text-[oklch(0.62_0.1_75)] mb-3">
            Presentes
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-[oklch(0.25_0.04_55)] italic mb-4">
            Lista de Presentes
          </h2>
          <div className="ornament-divider mb-6">
            <span className="font-display text-xl text-[oklch(0.72_0.1_80)]">✦</span>
          </div>
          <p className="font-body text-base md:text-lg text-[oklch(0.55_0.04_65)] max-w-xl mx-auto italic">
            "A sua presença já é o maior presente. Mas se desejar nos presentear, 
            preparamos algumas opções com muito carinho."
          </p>
        </div>

        {/* Gift options */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <GiftOption
            icon={<Home size={22} />}
            title="Nosso Lar"
            description="Contribua para a decoração e mobília do nosso novo lar."
            action="Contribuir"
            onAction={() => handleGiftClick("lista de casa")}
            delay="0ms"
          />
          <GiftOption
            icon={<Plane size={22} />}
            title="Lua de Mel"
            description="Ajude-nos a realizar o sonho da nossa viagem para a Toscana."
            action="Presentear"
            onAction={() => handleGiftClick("fundo lua de mel")}
            delay="100ms"
          />
          <GiftOption
            icon={<Gift size={22} />}
            title="Lista Oficial"
            description="Acesse nossa lista completa na loja parceira com itens selecionados."
            action="Ver Lista"
            onAction={() => handleGiftClick("lista oficial")}
            delay="200ms"
          />
          <GiftOption
            icon={<Heart size={22} />}
            title="Pix"
            description="Prefere praticidade? Faça uma contribuição via Pix."
            action="Copiar Chave"
            onAction={() => {
              navigator.clipboard?.writeText("casamento@isabellaerafael.com.br");
              toast.success("Chave Pix copiada!", {
                description: "casamento@isabellaerafael.com.br",
                style: {
                  fontFamily: "'EB Garamond', serif",
                  background: "oklch(0.99 0.01 85)",
                  border: "1px solid oklch(0.72 0.1 80 / 0.4)",
                  color: "oklch(0.25 0.04 55)",
                },
              });
            }}
            delay="300ms"
          />
        </div>
      </div>
    </section>
  );
}

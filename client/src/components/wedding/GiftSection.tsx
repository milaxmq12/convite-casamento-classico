/**
 * GiftSection — Lista de presentes
 * Paleta: Off-white (#FAFAF7) + Dourado (#C9A84C / #9A7A20)
 */

import { Gift, Heart, Plane, Home } from "lucide-react";
import { toast } from "sonner";

function GiftOption({
  icon, title, description, action, onAction, delay = "0ms",
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  onAction: () => void;
  delay?: string;
}) {
  return (
    <div
      className="reveal group rounded-sm p-7 text-center hover:shadow-lg transition-all duration-300"
      style={{
        transitionDelay: delay,
        background: "#FFFFFF",
        border: "1px solid rgba(201,168,76,0.3)",
        boxShadow: "0 2px 16px rgba(201,168,76,0.07)",
      }}
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[rgba(201,168,76,0.3)] text-[#9A7A20] mb-5 group-hover:border-[#C9A84C] transition-colors duration-300">
        {icon}
      </div>
      <h3 className="font-display text-xl font-light text-[#2C2416] italic mb-2">{title}</h3>
      <p className="font-body text-sm text-[#8A7D68] leading-relaxed mb-6">{description}</p>
      <button onClick={onAction} className="btn-wedding-outline text-xs w-full">
        {action}
      </button>
    </div>
  );
}

const toastStyle = {
  fontFamily: "'EB Garamond', serif",
  background: "#FFFFFF",
  border: "1px solid rgba(201,168,76,0.4)",
  color: "#2C2416",
  borderRadius: "2px",
};

export default function GiftSection() {
  return (
    <section className="py-20 md:py-32" style={{ background: "#FAFAF7" }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <p className="font-label text-[0.58rem] tracking-[0.42em] uppercase text-[#9A7A20] mb-3">
            Presentes
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-[#2C2416] italic mb-4">
            Lista de Presentes
          </h2>
          <div className="ornament-divider mb-6">
            <span className="font-display text-xl text-[#C9A84C]">✦</span>
          </div>
          <p className="font-body text-base md:text-lg text-[#8A7D68] max-w-xl mx-auto italic">
            "A sua presença já é o maior presente. Mas se desejar nos presentear,
            preparamos algumas opções com muito carinho."
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <GiftOption
            icon={<Home size={22} />}
            title="Nosso Lar"
            description="Contribua para a decoração e mobília do nosso novo lar."
            action="Contribuir"
            onAction={() => toast.success("Redirecionando para lista de casa...", { description: "Obrigado pela sua generosidade!", style: toastStyle })}
            delay="0ms"
          />
          <GiftOption
            icon={<Plane size={22} />}
            title="Lua de Mel"
            description="Ajude-nos a realizar o sonho da nossa viagem para a Toscana."
            action="Presentear"
            onAction={() => toast.success("Redirecionando para fundo lua de mel...", { description: "Obrigado pela sua generosidade!", style: toastStyle })}
            delay="100ms"
          />
          <GiftOption
            icon={<Gift size={22} />}
            title="Lista Oficial"
            description="Acesse nossa lista completa na loja parceira com itens selecionados."
            action="Ver Lista"
            onAction={() => toast.success("Redirecionando para lista oficial...", { description: "Obrigado pela sua generosidade!", style: toastStyle })}
            delay="200ms"
          />
          <GiftOption
            icon={<Heart size={22} />}
            title="Pix"
            description="Prefere praticidade? Faça uma contribuição via Pix."
            action="Copiar Chave"
            onAction={() => {
              navigator.clipboard?.writeText("casamento@isabellaerafael.com.br");
              toast.success("Chave Pix copiada!", { description: "casamento@isabellaerafael.com.br", style: toastStyle });
            }}
            delay="300ms"
          />
        </div>
      </div>
    </section>
  );
}

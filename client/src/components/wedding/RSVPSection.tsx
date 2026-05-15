/**
 * RSVPSection — Confirmação de presença com persistência via tRPC
 * Paleta: Off-white (#F5F5F0) + Dourado (#C9A84C / #9A7A20)
 */

import { useState } from "react";
import { CheckCircle, Users, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const FLORAL_ORNAMENT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348239620/KirE3dTZFbG3AbQWJYn9MY/wedding-floral-ornament-cnMzDwJtgYJsGoFoy7GVaj.webp";

interface FormData {
  name: string;
  email: string;
  attendance: "yes" | "no" | "";
  guests: string;
  dietary: string;
  message: string;
}

const toastStyle = {
  fontFamily: "'EB Garamond', serif",
  background: "#FFFFFF",
  border: "1px solid rgba(201,168,76,0.4)",
  color: "#2C2416",
  borderRadius: "2px",
};

export default function RSVPSection() {
  const [form, setForm] = useState<FormData>({
    name: "", email: "", attendance: "", guests: "1", dietary: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Gera link do WhatsApp com mensagem pré-preenchida
  const buildWhatsAppLink = () => {
    const phone = "5511998395463";
    const attendance = form.attendance === "yes" ? "confirmar presença" : "informar que não poderei comparecer";
    const guests = form.attendance === "yes" ? ` Virei acompanhado(a) de ${parseInt(form.guests, 10)} pessoa(s) no total.` : "";
    const dietary = form.dietary ? ` Restrição alimentar: ${form.dietary}.` : "";
    const msg = `Olá! Sou ${form.name} e gostaria de ${attendance} no casamento de Isabella & Rafael no dia 14/09/2025.${guests}${dietary}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  };

  const submitMutation = trpc.rsvp.submit.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: (err) => {
      toast.error("Erro ao enviar confirmação. Tente novamente.", {
        description: err.message,
        style: toastStyle,
      });
    },
  });

  const handleChange = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.attendance) {
      toast.error("Por favor, preencha todos os campos obrigatórios.", { style: toastStyle });
      return;
    }
    submitMutation.mutate({
      name:       form.name,
      email:      form.email,
      attendance: form.attendance as "yes" | "no",
      guests:     parseInt(form.guests, 10),
      dietary:    form.dietary || undefined,
      message:    form.message || undefined,
    });
  };

  const inputClass = `
    w-full rounded-sm px-4 py-3 font-body text-sm text-[#2C2416]
    placeholder:text-[#8A7D68] placeholder:italic
    focus:outline-none transition-all duration-200
    focus:border-[#C9A84C] focus:ring-1 focus:ring-[rgba(201,168,76,0.3)]
  `;
  const inputStyle = { background: "#FFFFFF", border: "1px solid #E0D9C8" };
  const labelClass = "font-label text-[0.58rem] tracking-[0.25em] uppercase text-[#9A7A20] block mb-2";

  return (
    <section id="confirmar" className="py-20 md:py-32" style={{ background: "#F5F5F0" }}>
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12 reveal">
          <p className="font-label text-[0.58rem] tracking-[0.42em] uppercase text-[#9A7A20] mb-3">
            RSVP
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-[#2C2416] italic mb-4">
            Confirmar Presença
          </h2>
          <div className="ornament-divider mb-6">
            <span className="font-display text-xl text-[#C9A84C]">✦</span>
          </div>
          <p className="font-body text-base text-[#8A7D68] italic">
            Confirme sua presença até{" "}
            <strong className="not-italic font-medium text-[#5A4E38]">31 de Agosto de 2025</strong>
          </p>
        </div>

        {submitted ? (
          <div
            className="rounded-sm p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ background: "#FFFFFF", border: "1px solid rgba(201,168,76,0.35)" }}
          >
            <div className="flex justify-center mb-6">
              <img src={FLORAL_ORNAMENT} alt="" className="w-48 opacity-55" />
            </div>
            <CheckCircle size={40} className="mx-auto text-[#9A7A20] mb-4" />
            <h3 className="font-display text-3xl font-light text-[#2C2416] italic mb-3">
              {form.attendance === "yes" ? "Até breve!" : "Sentiremos sua falta"}
            </h3>
            <p className="font-body text-base text-[#8A7D68] leading-relaxed">
              {form.attendance === "yes"
                ? `Obrigado, ${form.name}! Sua presença foi confirmada. Mal podemos esperar para celebrar com você.`
                : `Obrigado por nos avisar, ${form.name}. Estaremos pensando em você neste dia especial.`}
            </p>

            {/* Botão WhatsApp */}
            <div className="mt-8">
              <p className="font-body text-sm text-[#8A7D68] italic mb-4">
                Para finalizar, envie sua confirmação diretamente pelo WhatsApp:
              </p>
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-sm font-label text-[0.65rem] tracking-[0.25em] uppercase text-white transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
                style={{ background: "#25D366" }}
              >
                <MessageCircle size={18} />
                Enviar pelo WhatsApp
              </a>
              <p className="font-body text-xs text-[#B0A490] italic mt-3">
                Uma mensagem já estará pré-preenchida com seus dados.
              </p>
            </div>

            <div className="mt-8 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.4)] to-transparent" />
            <p className="font-body text-sm text-[#8A7D68] italic mt-6">Isabella & Rafael</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="reveal rounded-sm p-8 md:p-12 space-y-6"
            style={{ background: "#FFFFFF", border: "1px solid rgba(201,168,76,0.3)" }}
          >
            <div>
              <label className={labelClass}>Nome Completo *</label>
              <input
                type="text"
                className={inputClass}
                style={inputStyle}
                placeholder="Seu nome completo"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>

            <div>
              <label className={labelClass}>E-mail *</label>
              <input
                type="email"
                className={inputClass}
                style={inputStyle}
                placeholder="seu@email.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Você irá comparecer? *</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: "yes", label: "Com prazer!" },
                  { val: "no",  label: "Infelizmente não" },
                ].map(({ val, label }) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleChange("attendance", val)}
                    className="py-3 px-4 rounded-sm border font-label text-[0.58rem] tracking-[0.2em] uppercase transition-all duration-200"
                    style={{
                      background: form.attendance === val
                        ? val === "yes" ? "#C9A84C" : "#5A4E38"
                        : "transparent",
                      borderColor: form.attendance === val
                        ? val === "yes" ? "#9A7A20" : "#5A4E38"
                        : "#E0D9C8",
                      color: form.attendance === val ? "#FFFFFF" : "#8A7D68",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {form.attendance === "yes" && (
              <>
                <div>
                  <label className={labelClass}>
                    <Users size={10} className="inline mr-1" />
                    Número de pessoas (incluindo você)
                  </label>
                  <select
                    className={inputClass}
                    style={inputStyle}
                    value={form.guests}
                    onChange={(e) => handleChange("guests", e.target.value)}
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={String(n)}>
                        {n} {n === 1 ? "pessoa" : "pessoas"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Restrições Alimentares</label>
                  <input
                    type="text"
                    className={inputClass}
                    style={inputStyle}
                    placeholder="Vegetariano, sem glúten, alergias... (opcional)"
                    value={form.dietary}
                    onChange={(e) => handleChange("dietary", e.target.value)}
                  />
                </div>
              </>
            )}

            <div>
              <label className={labelClass}>Mensagem para os Noivos</label>
              <textarea
                className={`${inputClass} resize-none`}
                style={inputStyle}
                rows={4}
                placeholder="Deixe uma mensagem especial para Isabella e Rafael... (opcional)"
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={submitMutation.isPending}
              className="btn-wedding-primary w-full flex items-center justify-center gap-2"
            >
              {submitMutation.isPending ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-[rgba(255,255,255,0.3)] border-t-white rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                "Confirmar Presença"
              )}
            </button>

            <p className="font-body text-xs text-[#8A7D68] text-center italic">
              * Campos obrigatórios. Prazo: 31 de Agosto de 2025.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

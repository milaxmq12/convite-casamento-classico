/**
 * RSVPSection — Formulário de confirmação de presença
 * Design: Formulário em pergaminho com campos elegantes, validação suave
 */

import { useState } from "react";
import { CheckCircle, Users } from "lucide-react";
import { toast } from "sonner";

const FLORAL_ORNAMENT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348239620/KirE3dTZFbG3AbQWJYn9MY/wedding-floral-ornament-cnMzDwJtgYJsGoFoy7GVaj.webp";

interface FormData {
  name: string;
  email: string;
  attendance: "yes" | "no" | "";
  guests: string;
  dietary: string;
  message: string;
}

export default function RSVPSection() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    attendance: "",
    guests: "1",
    dietary: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.attendance) {
      toast.error("Por favor, preencha todos os campos obrigatórios.", {
        style: {
          fontFamily: "'EB Garamond', serif",
          background: "oklch(0.99 0.01 85)",
          border: "1px solid oklch(0.577 0.245 27.325 / 0.4)",
          color: "oklch(0.25 0.04 55)",
        },
      });
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const inputClass = `
    w-full bg-[oklch(0.99_0.01_85)] border border-[oklch(0.85_0.05_80)] 
    rounded-sm px-4 py-3 font-body text-sm text-[oklch(0.25_0.04_55)] 
    placeholder:text-[oklch(0.65_0.03_65)] placeholder:italic
    focus:outline-none focus:border-[oklch(0.72_0.1_80)] focus:ring-1 focus:ring-[oklch(0.72_0.1_80/0.3)]
    transition-all duration-200
  `;

  const labelClass = "font-label text-[0.6rem] tracking-[0.25em] uppercase text-[oklch(0.62_0.1_75)] block mb-2";

  return (
    <section id="confirmar" className="py-20 md:py-32 bg-[oklch(0.93_0.03_85)]">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <p className="font-label text-[0.6rem] tracking-[0.4em] uppercase text-[oklch(0.62_0.1_75)] mb-3">
            RSVP
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-[oklch(0.25_0.04_55)] italic mb-4">
            Confirmar Presença
          </h2>
          <div className="ornament-divider mb-6">
            <span className="font-display text-xl text-[oklch(0.72_0.1_80)]">✦</span>
          </div>
          <p className="font-body text-base text-[oklch(0.55_0.04_65)] italic">
            Confirme sua presença até <strong className="not-italic font-medium text-[oklch(0.45_0.05_60)]">31 de Agosto de 2025</strong>
          </p>
        </div>

        {submitted ? (
          /* Success state */
          <div className="reveal gold-border-card rounded-sm p-12 text-center">
            <div className="flex justify-center mb-6">
              <img src={FLORAL_ORNAMENT} alt="" className="w-48 opacity-60" />
            </div>
            <CheckCircle size={40} className="mx-auto text-[oklch(0.62_0.1_75)] mb-4" />
            <h3 className="font-display text-3xl font-light text-[oklch(0.25_0.04_55)] italic mb-3">
              {form.attendance === "yes" ? "Até breve!" : "Sentiremos sua falta"}
            </h3>
            <p className="font-body text-base text-[oklch(0.55_0.04_65)] leading-relaxed">
              {form.attendance === "yes"
                ? `Obrigado, ${form.name}! Sua presença foi confirmada. Mal podemos esperar para celebrar com você.`
                : `Obrigado por nos avisar, ${form.name}. Estaremos pensando em você neste dia especial.`}
            </p>
            <div className="mt-8 h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.1_80/0.4)] to-transparent" />
            <p className="font-body text-sm text-[oklch(0.65_0.04_65)] italic mt-6">
              Isabella & Rafael
            </p>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="reveal gold-border-card rounded-sm p-8 md:p-12 space-y-6">
            {/* Name */}
            <div>
              <label className={labelClass}>Nome Completo *</label>
              <input
                type="text"
                className={inputClass}
                placeholder="Seu nome completo"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className={labelClass}>E-mail *</label>
              <input
                type="email"
                className={inputClass}
                placeholder="seu@email.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>

            {/* Attendance */}
            <div>
              <label className={labelClass}>Você irá comparecer? *</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleChange("attendance", "yes")}
                  className={`py-3 px-4 rounded-sm border font-label text-[0.6rem] tracking-[0.2em] uppercase transition-all duration-200 ${
                    form.attendance === "yes"
                      ? "bg-[oklch(0.72_0.1_80)] border-[oklch(0.72_0.1_80)] text-[oklch(0.99_0.01_85)]"
                      : "bg-transparent border-[oklch(0.85_0.05_80)] text-[oklch(0.55_0.04_65)] hover:border-[oklch(0.72_0.1_80)] hover:text-[oklch(0.62_0.1_75)]"
                  }`}
                >
                  Com prazer!
                </button>
                <button
                  type="button"
                  onClick={() => handleChange("attendance", "no")}
                  className={`py-3 px-4 rounded-sm border font-label text-[0.6rem] tracking-[0.2em] uppercase transition-all duration-200 ${
                    form.attendance === "no"
                      ? "bg-[oklch(0.45_0.05_60)] border-[oklch(0.45_0.05_60)] text-[oklch(0.99_0.01_85)]"
                      : "bg-transparent border-[oklch(0.85_0.05_80)] text-[oklch(0.55_0.04_65)] hover:border-[oklch(0.45_0.05_60)] hover:text-[oklch(0.45_0.05_60)]"
                  }`}
                >
                  Infelizmente não
                </button>
              </div>
            </div>

            {form.attendance === "yes" && (
              <>
                {/* Number of guests */}
                <div>
                  <label className={labelClass}>
                    <Users size={10} className="inline mr-1" />
                    Número de acompanhantes (incluindo você)
                  </label>
                  <select
                    className={inputClass}
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

                {/* Dietary restrictions */}
                <div>
                  <label className={labelClass}>Restrições Alimentares</label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="Vegetariano, sem glúten, alergias... (opcional)"
                    value={form.dietary}
                    onChange={(e) => handleChange("dietary", e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Message */}
            <div>
              <label className={labelClass}>Mensagem para os Noivos</label>
              <textarea
                className={`${inputClass} resize-none`}
                rows={4}
                placeholder="Deixe uma mensagem especial para Isabella e Rafael... (opcional)"
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-wedding-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-[oklch(0.99_0.01_85/0.3)] border-t-[oklch(0.99_0.01_85)] rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                "Confirmar Presença"
              )}
            </button>

            <p className="font-body text-xs text-[oklch(0.65_0.04_65)] text-center italic">
              * Campos obrigatórios. Prazo: 31 de Agosto de 2025.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

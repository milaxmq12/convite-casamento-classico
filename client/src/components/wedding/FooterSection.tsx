/**
 * FooterSection — Rodapé elegante com informações finais
 * Design: Fundo escuro, texto dourado, ornamentos florais
 */

const FLORAL_ORNAMENT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348239620/KirE3dTZFbG3AbQWJYn9MY/wedding-floral-ornament-cnMzDwJtgYJsGoFoy7GVaj.webp";

export default function FooterSection() {
  return (
    <footer className="bg-[oklch(0.18_0.03_55)] py-16 md:py-20">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Floral ornament */}
        <div className="flex justify-center mb-8">
          <img src={FLORAL_ORNAMENT} alt="" className="w-48 opacity-40" style={{ filter: "brightness(1.5) sepia(0.3)" }} />
        </div>

        {/* Monogram */}
        <div className="font-display text-6xl md:text-7xl font-light gold-gradient-text mb-4">
          I & R
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-light text-[oklch(0.88_0.03_85)] italic mb-2">
          Isabella & Rafael
        </h2>

        <p className="font-label text-[0.6rem] tracking-[0.4em] uppercase text-[oklch(0.62_0.1_75)] mb-8">
          14 · IX · 2025
        </p>

        <div className="h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.1_80/0.4)] to-transparent mb-8" />

        {/* Quote */}
        <p className="font-display text-lg md:text-xl font-light italic text-[oklch(0.75_0.03_85)] mb-2">
          "Onde você for, eu irei; onde você pousar, eu pousar."
        </p>
        <p className="font-label text-[0.55rem] tracking-[0.25em] uppercase text-[oklch(0.62_0.1_75)] mb-10">
          — Rute 1:16
        </p>

        {/* Contact */}
        <div className="space-y-2 mb-10">
          <p className="font-body text-sm text-[oklch(0.65_0.04_65)]">
            Dúvidas? Entre em contato com os padrinhos:
          </p>
          <p className="font-body text-sm text-[oklch(0.75_0.03_85)]">
            <a href="mailto:padrinhos@isabellaerafael.com.br" className="hover:text-[oklch(0.82_0.08_88)] transition-colors">
              padrinhos@isabellaerafael.com.br
            </a>
          </p>
          <p className="font-body text-sm text-[oklch(0.75_0.03_85)]">
            <a href="tel:+5511999999999" className="hover:text-[oklch(0.82_0.08_88)] transition-colors">
              (11) 99999-9999
            </a>
          </p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.1_80/0.2)] to-transparent mb-6" />

        <p className="font-body text-xs text-[oklch(0.45_0.03_65)] italic">
          Com amor, Isabella Monteiro & Rafael Carvalho · São Paulo, 2025
        </p>
      </div>
    </footer>
  );
}

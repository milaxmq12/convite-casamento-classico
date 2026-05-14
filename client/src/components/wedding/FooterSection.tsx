/**
 * FooterSection — Rodapé elegante
 * Paleta: Fundo escuro quente + Dourado (#C9A84C / #E8D08A)
 */

const FLORAL_ORNAMENT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348239620/KirE3dTZFbG3AbQWJYn9MY/wedding-floral-ornament-cnMzDwJtgYJsGoFoy7GVaj.webp";

export default function FooterSection() {
  return (
    <footer style={{ background: "#1A1208" }} className="py-16 md:py-20">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-8">
          <img
            src={FLORAL_ORNAMENT}
            alt=""
            className="w-48 opacity-35"
            style={{ filter: "brightness(1.6) sepia(0.4)" }}
          />
        </div>

        <div className="font-display text-6xl md:text-7xl font-light gold-gradient-text mb-4">
          I & R
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-light text-[#F5F0E8] italic mb-2">
          Isabella & Rafael
        </h2>

        <p className="font-label text-[0.58rem] tracking-[0.42em] uppercase text-[#C9A84C] mb-8">
          14 · IX · 2025
        </p>

        <div className="h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.4)] to-transparent mb-8" />

        <p className="font-display text-lg md:text-xl font-light italic text-[#C8BFA8] mb-2">
          "Onde você for, eu irei; onde você pousar, eu pousar."
        </p>
        <p className="font-label text-[0.52rem] tracking-[0.25em] uppercase text-[#C9A84C] mb-10">
          — Rute 1:16
        </p>

        <div className="space-y-2 mb-10">
          <p className="font-body text-sm text-[#8A7D68]">
            Dúvidas? Entre em contato com os padrinhos:
          </p>
          <p className="font-body text-sm text-[#C8BFA8]">
            <a href="mailto:padrinhos@isabellaerafael.com.br" className="hover:text-[#E8D08A] transition-colors">
              padrinhos@isabellaerafael.com.br
            </a>
          </p>
          <p className="font-body text-sm text-[#C8BFA8]">
            <a href="tel:+5511999999999" className="hover:text-[#E8D08A] transition-colors">
              (11) 99999-9999
            </a>
          </p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.2)] to-transparent mb-6" />

        <p className="font-body text-xs text-[#5A4E38] italic">
          Com amor, Isabella Monteiro & Rafael Carvalho · São Paulo, 2025
        </p>
      </div>
    </footer>
  );
}

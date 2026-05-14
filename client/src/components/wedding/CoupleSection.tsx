/**
 * CoupleSection — História do casal
 * Paleta: Off-white (#FAFAF7) + Dourado (#C9A84C / #9A7A20)
 * Sem profissões; ornamento floral centralizado
 */

const COUPLE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348239620/KirE3dTZFbG3AbQWJYn9MY/wedding-couple-silhouette-LoqA3x7NKWfYpFqQGpP92s.webp";
const FLORAL_ORNAMENT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348239620/KirE3dTZFbG3AbQWJYn9MY/wedding-floral-ornament-cnMzDwJtgYJsGoFoy7GVaj.webp";

export default function CoupleSection() {
  return (
    <section className="py-20 md:py-32" style={{ background: "#FAFAF7" }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <p className="font-label text-[0.58rem] tracking-[0.42em] uppercase text-[#9A7A20] mb-3">
            Nossa História
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-[#2C2416] italic mb-4">
            Isabella & Rafael
          </h2>
          <div className="ornament-divider">
            <span className="font-display text-xl text-[#C9A84C]">✦</span>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Image */}
          <div className="reveal delay-100">
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-sm"
                style={{ border: "1px solid rgba(201,168,76,0.3)", transform: "rotate(1.5deg)" }}
              />
              <img
                src={COUPLE_IMG}
                alt="Isabella e Rafael"
                className="w-full max-w-sm mx-auto rounded-sm relative z-10"
                style={{ boxShadow: "0 20px 60px rgba(44,36,22,0.22)" }}
              />
              <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C9A84C] z-20" />
              <span className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#C9A84C] z-20" />
              <span className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#C9A84C] z-20" />
              <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C9A84C] z-20" />
            </div>
          </div>

          {/* Text */}
          <div className="reveal delay-200 space-y-6">
            <div>
              <h3 className="font-display text-3xl md:text-4xl font-light text-[#2C2416] italic mb-4">
                Uma história de amor
              </h3>
              <p className="font-body text-base md:text-lg text-[#5A4E38] leading-relaxed">
                Tudo começou numa tarde de outono de 2019, numa pequena livraria no centro de São Paulo.
                Isabella procurava um livro de poesia; Rafael, perdido entre as prateleiras, pediu ajuda.
                Naquele encontro fortuito, nasceu algo que nenhum dos dois soube nomear imediatamente —
                mas que o tempo revelou ser amor.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-[#C9A84C] to-transparent opacity-40" />

            <p className="font-body text-base md:text-lg text-[#5A4E38] leading-relaxed">
              Após seis anos de cumplicidade, aventuras e crescimento mútuo, Rafael pediu Isabella
              em casamento ao pôr do sol na Praia de Trindade — com um anel que pertenceu à avó dele
              e um buquê de rosas brancas colhidas no jardim da família.
            </p>

            <div className="h-px bg-gradient-to-r from-[#C9A84C] to-transparent opacity-40" />

            {/* Names only — no professions */}
            <div className="flex gap-8 items-center">
              <p className="font-display text-3xl font-light gold-gradient-text">Isabella</p>
              <div className="w-px h-8 bg-[rgba(201,168,76,0.3)]" />
              <p className="font-display text-3xl font-light gold-gradient-text">Rafael</p>
            </div>
          </div>
        </div>

        {/* Floral ornament — centered below the grid */}
        <div className="reveal delay-300 flex justify-center mt-14">
          <img src={FLORAL_ORNAMENT} alt="" className="w-56 md:w-72 opacity-45" />
        </div>

      </div>
    </section>
  );
}

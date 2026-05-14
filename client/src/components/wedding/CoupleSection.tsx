/**
 * CoupleSection — História do casal com imagem artística e texto elegante
 * Design: Assimétrico, imagem à esquerda, texto à direita, ornamentos dourados
 */

const COUPLE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348239620/KirE3dTZFbG3AbQWJYn9MY/wedding-couple-silhouette-LoqA3x7NKWfYpFqQGpP92s.webp";
const FLORAL_ORNAMENT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348239620/KirE3dTZFbG3AbQWJYn9MY/wedding-floral-ornament-cnMzDwJtgYJsGoFoy7GVaj.webp";

export default function CoupleSection() {
  return (
    <section className="py-20 md:py-32 bg-[oklch(0.97_0.02_85)]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <p className="font-label text-[0.6rem] tracking-[0.4em] uppercase text-[oklch(0.62_0.1_75)] mb-3">
            Nossa História
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-[oklch(0.25_0.04_55)] italic mb-4">
            Isabella & Rafael
          </h2>
          <div className="ornament-divider">
            <span className="font-display text-xl text-[oklch(0.72_0.1_80)]">✦</span>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <div className="reveal delay-100">
            <div className="relative">
              <div
                className="absolute -inset-3 border border-[oklch(0.72_0.1_80/0.3)] rounded-sm"
                style={{ transform: "rotate(1.5deg)" }}
              />
              <img
                src={COUPLE_IMG}
                alt="Isabella e Rafael"
                className="w-full max-w-sm mx-auto rounded-sm shadow-2xl relative z-10"
                style={{ boxShadow: "0 20px 60px oklch(0.25 0.04 55 / 0.25)" }}
              />
              {/* Gold corner accents on image */}
              <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[oklch(0.72_0.1_80)] z-20" />
              <span className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[oklch(0.72_0.1_80)] z-20" />
              <span className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[oklch(0.72_0.1_80)] z-20" />
              <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[oklch(0.72_0.1_80)] z-20" />
            </div>
          </div>

          {/* Text */}
          <div className="reveal delay-200">
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-3xl md:text-4xl font-light text-[oklch(0.25_0.04_55)] italic mb-4">
                  Uma história de amor
                </h3>
                <p className="font-body text-base md:text-lg text-[oklch(0.45_0.05_60)] leading-relaxed">
                  Tudo começou numa tarde de outono de 2019, numa pequena livraria no centro de São Paulo. 
                  Isabella procurava um livro de poesia; Rafael, perdido entre as prateleiras, pediu ajuda. 
                  Naquele encontro fortuito, nasceu algo que nenhum dos dois soube nomear imediatamente — 
                  mas que o tempo revelou ser amor.
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-[oklch(0.72_0.1_80/0.5)] to-transparent" />

              <div>
                <p className="font-body text-base md:text-lg text-[oklch(0.45_0.05_60)] leading-relaxed">
                  Após seis anos de cumplicidade, aventuras e crescimento mútuo, Rafael pediu Isabella 
                  em casamento ao pôr do sol na Praia de Trindade — com um anel que pertenceu à avó dele 
                  e um buquê de rosas brancas colhidas no jardim da família.
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-[oklch(0.72_0.1_80/0.5)] to-transparent" />

              <div className="flex gap-8">
                <div>
                  <p className="font-display text-3xl font-light gold-gradient-text">Isabella</p>
                  <p className="font-body text-sm text-[oklch(0.55_0.04_65)] italic mt-1">Arquiteta & Apaixonada por Arte</p>
                </div>
                <div className="w-px bg-[oklch(0.72_0.1_80/0.3)]" />
                <div>
                  <p className="font-display text-3xl font-light gold-gradient-text">Rafael</p>
                  <p className="font-body text-sm text-[oklch(0.55_0.04_65)] italic mt-1">Médico & Amante da Música</p>
                </div>
              </div>

              <div className="pt-2">
                <img src={FLORAL_ORNAMENT} alt="" className="w-48 opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

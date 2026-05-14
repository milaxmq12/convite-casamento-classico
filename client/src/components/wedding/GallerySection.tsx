/**
 * GallerySection — Galeria de fotos do casal com layout elegante
 * Design: Grid assimétrico, hover com overlay dourado, lightbox simples
 */

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Using Unsplash for gallery images (romantic/wedding theme)
const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    alt: "Casal ao pôr do sol",
    aspect: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
    alt: "Alianças de casamento",
    aspect: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    alt: "Buquê de noiva",
    aspect: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80",
    alt: "Cerimônia ao ar livre",
    aspect: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
    alt: "Noivos dançando",
    aspect: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1525772764200-be829a350797?w=800&q=80",
    alt: "Decoração da mesa",
    aspect: "square",
  },
];

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prevImage = () => setLightbox((i) => (i !== null ? (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null));
  const nextImage = () => setLightbox((i) => (i !== null ? (i + 1) % GALLERY_IMAGES.length : null));

  return (
    <section className="py-20 md:py-32 bg-[oklch(0.93_0.03_85)]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="font-label text-[0.6rem] tracking-[0.4em] uppercase text-[oklch(0.62_0.1_75)] mb-3">
            Memórias
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-[oklch(0.25_0.04_55)] italic mb-4">
            Nossa Galeria
          </h2>
          <div className="ornament-divider">
            <span className="font-display text-xl text-[oklch(0.72_0.1_80)]">✦</span>
          </div>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              className={`reveal group relative overflow-hidden rounded-sm cursor-pointer ${
                img.aspect === "landscape" ? "col-span-2" : ""
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
              onClick={() => openLightbox(i)}
            >
              <div className={`w-full ${img.aspect === "portrait" ? "aspect-[3/4]" : img.aspect === "landscape" ? "aspect-[16/7]" : "aspect-square"}`}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[oklch(0.25_0.04_55/0)] group-hover:bg-[oklch(0.25_0.04_55/0.35)] transition-all duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-[oklch(0.97_0.02_85/0.6)] px-4 py-2">
                  <span className="font-label text-[0.55rem] tracking-[0.3em] uppercase text-[oklch(0.97_0.02_85)]">
                    Ver
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-[oklch(0.1_0.02_55/0.95)] flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-[oklch(0.97_0.02_85)] hover:text-[oklch(0.82_0.08_88)] transition-colors"
            onClick={closeLightbox}
          >
            <X size={28} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[oklch(0.97_0.02_85)] hover:text-[oklch(0.82_0.08_88)] transition-colors"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <ChevronLeft size={36} />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[oklch(0.97_0.02_85)] hover:text-[oklch(0.82_0.08_88)] transition-colors"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <ChevronRight size={36} />
          </button>
          <img
            src={GALLERY_IMAGES[lightbox].src.replace("w=800", "w=1200")}
            alt={GALLERY_IMAGES[lightbox].alt}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-body text-sm text-[oklch(0.75_0.02_85)] italic">
            {lightbox + 1} / {GALLERY_IMAGES.length} — {GALLERY_IMAGES[lightbox].alt}
          </p>
        </div>
      )}
    </section>
  );
}

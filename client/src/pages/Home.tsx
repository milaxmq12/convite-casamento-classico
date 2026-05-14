/**
 * DESIGN SYSTEM: Romantismo Clássico Europeu
 * Paleta: Creme envelhecido, Dourado, Champanhe, Marrom quente
 * Tipografia: Cormorant Garamond (display) + Playfair Display (heading) + Cinzel (label) + EB Garamond (body)
 * Layout: Rolagem vertical única, simulando desdobramento de convite físico
 */

import { useEffect, useRef, useState } from "react";
import HeroSection from "@/components/wedding/HeroSection";
import CountdownSection from "@/components/wedding/CountdownSection";
import CoupleSection from "@/components/wedding/CoupleSection";
import EventDetailsSection from "@/components/wedding/EventDetailsSection";
import GallerySection from "@/components/wedding/GallerySection";
import RSVPSection from "@/components/wedding/RSVPSection";
import MusicPlayer from "@/components/wedding/MusicPlayer";
import PetalEffect from "@/components/wedding/PetalEffect";
import WeddingNav from "@/components/wedding/WeddingNav";
import GiftSection from "@/components/wedding/GiftSection";
import FooterSection from "@/components/wedding/FooterSection";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Reveal on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [showContent]);

  useEffect(() => {
    // Re-observe after content loads
    if (showContent) {
      const timer = setTimeout(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("visible");
              }
            });
          },
          { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );
        const elements = document.querySelectorAll(".reveal");
        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showContent]);

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.02_85)] overflow-x-hidden">
      <PetalEffect />
      <WeddingNav />
      <MusicPlayer />

      <main>
        <HeroSection onEnter={() => setShowContent(true)} />
        {showContent && (
          <>
            <CountdownSection />
            <CoupleSection />
            <EventDetailsSection />
            <GallerySection />
            <GiftSection />
            <RSVPSection />
            <FooterSection />
          </>
        )}
      </main>
    </div>
  );
}

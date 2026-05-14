/**
 * DESIGN SYSTEM: Romantismo Clássico Europeu
 * Paleta: Off-white puro e Dourado
 * Tipografia: Cormorant Garamond (display) + Playfair Display (heading) + Cinzel (label) + EB Garamond (body)
 */

import { useEffect, useState } from "react";
import HeroSection from "@/components/wedding/HeroSection";
import CountdownSection from "@/components/wedding/CountdownSection";
import CoupleSection from "@/components/wedding/CoupleSection";
import EventDetailsSection from "@/components/wedding/EventDetailsSection";
import RSVPSection from "@/components/wedding/RSVPSection";
import MusicPlayer from "@/components/wedding/MusicPlayer";
import PetalEffect from "@/components/wedding/PetalEffect";
import WeddingNav from "@/components/wedding/WeddingNav";
import GiftSection from "@/components/wedding/GiftSection";
import FooterSection from "@/components/wedding/FooterSection";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
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
    if (showContent) {
      const timer = setTimeout(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) entry.target.classList.add("visible");
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
    <div className="min-h-screen bg-[#FAFAF7] overflow-x-hidden">
      <PetalEffect />
      <WeddingNav />
      <MusicPlayer autoPlay={showContent} />

      <main>
        <HeroSection onEnter={() => setShowContent(true)} />
        {showContent && (
          <>
            <CountdownSection />
            <CoupleSection />
            <EventDetailsSection />
            <GiftSection />
            <RSVPSection />
            <FooterSection />
          </>
        )}
      </main>
    </div>
  );
}

/**
 * PetalEffect — Pétalas caindo sutilmente na tela
 * Design: Animação CSS pura, pétalas em rosa pálido e branco
 */

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  rotation: number;
}

const PETAL_COLORS = [
  "oklch(0.92 0.04 0)",   // Rosa muito pálido
  "oklch(0.95 0.02 30)",  // Creme rosado
  "oklch(0.88 0.06 85)",  // Champanhe
  "oklch(0.97 0.01 85)",  // Branco creme
];

function generatePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 6 + Math.random() * 10,
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 15,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    rotation: Math.random() * 360,
  }));
}

export default function PetalEffect() {
  const [petals] = useState(() => generatePetals(12));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            top: "-20px",
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            animationName: "petal-fall",
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            opacity: 0,
          }}
        >
          {/* Petal SVG shape */}
          <svg
            viewBox="0 0 20 20"
            fill={petal.color}
            style={{
              filter: "drop-shadow(0 1px 2px oklch(0.72 0.1 80 / 0.2))",
              transform: `rotate(${petal.rotation}deg)`,
            }}
          >
            <ellipse cx="10" cy="10" rx="6" ry="9" />
          </svg>
        </div>
      ))}
    </div>
  );
}

/**
 * PetalEffect — Pétalas caindo sutilmente
 * Paleta: Off-white, creme e dourado pálido
 */

import { useState } from "react";

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
  "#F8F4EC",  // Off-white creme
  "#F5E9C0",  // Dourado pálido
  "#FAFAF7",  // Off-white puro
  "#EDE4D0",  // Creme suave
];

function generatePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 6 + Math.random() * 9,
    duration: 9 + Math.random() * 12,
    delay: Math.random() * 16,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    rotation: Math.random() * 360,
  }));
}

export default function PetalEffect() {
  const [petals] = useState(() => generatePetals(10));

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
          <svg
            viewBox="0 0 20 20"
            fill={petal.color}
            style={{
              filter: "drop-shadow(0 1px 2px rgba(201,168,76,0.18))",
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

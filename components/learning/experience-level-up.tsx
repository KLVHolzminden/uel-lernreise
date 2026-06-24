"use client";

import { useMemo } from "react";
import { Sparkles } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { ExperienceStage } from "@/lib/types";

type ExperienceLevelUpProps = {
  stage: ExperienceStage;
  profileText: string;
  onClose: () => void;
};

const particleCounts: Record<ExperienceStage["effectStrength"], number> = {
  small: 10,
  medium: 18,
  large: 26,
  final: 38,
};

const particlePalette = ["#f0c74c", "#6eb36e", "#d65a4a", "#5d8fd6"];

export function ExperienceLevelUp({ stage, profileText, onClose }: ExperienceLevelUpProps) {
  const prefersReducedMotion = useReducedMotion();
  const particles = useMemo(() => {
    if (prefersReducedMotion) {
      return [] as Array<{
        id: string;
        color: string;
        left: number;
        delay: number;
        duration: number;
        size: number;
        rotate: number;
      }>;
    }

    const count = particleCounts[stage.effectStrength];
    return Array.from({ length: count }, (_, index) => ({
      id: `${stage.id}-${index}`,
      color: particlePalette[index % particlePalette.length],
      left: 8 + ((index * 91) % 84),
      delay: (index % 7) * 0.06,
      duration: 1.9 + (index % 5) * 0.14,
      size: 8 + (index % 4) * 3,
      rotate: (index * 39) % 180,
    }));
  }, [prefersReducedMotion, stage.effectStrength, stage.id]);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/60 px-4 py-6 backdrop-blur-[6px]">
      <div className="experience-overlay-glow pointer-events-none absolute inset-0" aria-hidden="true" />

      {particles.map((particle) => (
        <span
          key={particle.id}
          aria-hidden="true"
          className="experience-confetti pointer-events-none fixed rounded-sm"
          style={{
            left: `${particle.left}%`,
            top: "14%",
            width: `${particle.size}px`,
            height: `${Math.max(8, particle.size * 1.5)}px`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            transform: `rotate(${particle.rotate}deg)`,
          }}
        />
      ))}

      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-[34px] border border-white/70 bg-white px-6 py-7 text-center shadow-[0_36px_100px_rgba(17,32,51,0.34)] ring-1 ring-white md:px-8 md:py-9">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#fff6d7_0%,#eef8ea_55%,#fff0ea_100%)] text-pine shadow-sm">
          <Sparkles className="h-6 w-6" />
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-pine">
          Neue Erfahrungsstufe erreicht
        </p>
        <h2 className="mt-3 font-display text-3xl leading-tight text-ink md:text-4xl">
          {stage.name}
        </h2>
        <p className="mx-auto mt-4 max-w-[34rem] text-base leading-7 text-slate">
          {profileText}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-pine"
        >
          Weiterlernen
        </button>
      </div>
    </div>
  );
}

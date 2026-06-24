"use client";

import { Sparkles } from "lucide-react";
import { ExperienceProgress } from "@/lib/types";
import { cn } from "@/lib/utils";

type ExperienceStatusProps = {
  experience: ExperienceProgress;
  className?: string;
  tone?: "light" | "dark";
  compact?: boolean;
  showProfileLabel?: boolean;
  showProfileText?: boolean;
};

export function ExperienceStatus({
  experience,
  className,
  tone = "light",
  compact = false,
  showProfileLabel = !compact,
  showProfileText = false,
}: ExperienceStatusProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "rounded-[24px] border px-4 py-3",
        isDark
          ? "border-white/12 bg-white/8 text-white"
          : "border-white/70 bg-white/78 text-ink shadow-sm backdrop-blur",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "text-[11px] font-semibold uppercase tracking-[0.18em]",
              isDark ? "text-white/64" : "text-slate",
            )}
          >
            Erfahrungsstufe
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Sparkles className={cn("h-4 w-4 shrink-0", isDark ? "text-[#f7d86f]" : "text-pine")} />
            <p className={cn("font-semibold", compact ? "text-sm" : "text-base")}>
              {experience.currentStage.name}
            </p>
            {showProfileLabel ? (
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-[11px] font-semibold",
                  isDark ? "bg-white/10 text-white/88" : "bg-sand text-slate",
                )}
              >
                Profil: {experience.profileLabel}
              </span>
            ) : null}
          </div>
          <p className={cn("mt-2 text-xs leading-5", isDark ? "text-white/76" : "text-slate")}>
            {experience.nextStage
              ? `Auf dem Weg zu ${experience.nextStage.name}`
              : "Profil vollständig geschärft"}
          </p>
          {showProfileText ? (
            <p className={cn("mt-3 text-sm leading-6", isDark ? "text-white/88" : "text-ink/86")}>
              {experience.profileText}
            </p>
          ) : null}
        </div>
      </div>

      <div className={cn("mt-3 h-2.5 overflow-hidden rounded-full", isDark ? "bg-white/12" : "bg-ink/8")}>
        <div
          className="experience-stage-glow h-full rounded-full bg-[linear-gradient(90deg,#f0c74c_0%,#72b36a_52%,#d65a4a_100%)] transition-[width] duration-500 ease-out"
          style={{ width: `${Math.round(experience.stageProgress * 100)}%` }}
        />
      </div>
    </div>
  );
}

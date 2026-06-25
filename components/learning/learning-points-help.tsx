"use client";

import { useState } from "react";
import { HelpCircle } from "lucide-react";
import { FocusDialog } from "@/components/learning/focus-dialog";
import { PointsAward } from "@/lib/types";
import { cn, toGermanDisplayText } from "@/lib/utils";

type LearningPointsHelpProps = {
  awardedPointIds: string[];
  onAwardPoints: (awards: PointsAward[]) => void;
  className?: string;
};

const helpText =
  "Der Pflichtfortschritt zählt nur die regulären Aufgaben. Freiwillige Vertiefungen bleiben freiwillig und blockieren den Lernweg nicht. Die drei Balken für Lachen, Lernen und Leisten zeigen getrennt davon dein inhaltliches Profil. Aus denselben vorhandenen Punkten entsteht zusätzlich oben deine Erfahrungsstufe. Jede Aufgabe stärkt ihren Hauptbereich mit +2 und weitere Wirkungsbereiche mit je +1, sobald du sie erfolgreich speicherst.";

export function LearningPointsHelp({
  awardedPointIds: _awardedPointIds,
  onAwardPoints: _onAwardPoints,
  className,
}: LearningPointsHelpProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          "inline-flex items-center gap-2 text-sm font-medium text-pine transition hover:text-ink",
          className,
        )}
      >
        <HelpCircle className="h-4 w-4" />
        Wie funktionieren Fortschritt und Profil?
      </button>

      <FocusDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        eyebrow="Lernreise"
        title="Wie funktionieren Fortschritt und Profil?"
        maxWidth="lg"
        footer={
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex min-h-14 items-center rounded-full bg-ink px-7 py-3 text-lg font-semibold text-white transition hover:bg-pine"
            >
              Verstanden
            </button>
          </div>
        }
      >
        <p className="max-w-[70ch] text-lg leading-[1.6] text-slate">
          {toGermanDisplayText(helpText)}
        </p>
      </FocusDialog>
    </>
  );
}


"use client";

import { ArrowRight, RotateCcw } from "lucide-react";
import { Chapter } from "@/lib/types";
import { toGermanDisplayText } from "@/lib/utils";

type ChapterSummaryCardProps = {
  chapter: Chapter;
  onContinue: () => void;
  onReviewChapter: () => void;
};

const chapterHintMap: Partial<Record<string, string>> = {
  "in-die-rolle-finden":
    "Wenn du merkst, dass dir diese Rolle liegt, kann die ÜL-C Ausbildung dein nächster Schritt sein.",
  "herausforderungen-passend-gestalten":
    "Dein ÜL-Kompass nimmt Form an. Nach dem Lernweg kannst du daraus einen echten Ausbildungsweg machen.",
};

export function ChapterSummaryCard({
  chapter,
  onContinue,
  onReviewChapter,
}: ChapterSummaryCardProps) {
  const ctaHint = chapterHintMap[chapter.id] ?? null;

  return (
    <section className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-soft backdrop-blur md:p-8">
      <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pine">
            Kapitel abgeschlossen
          </p>
          <h2 className="font-display text-4xl leading-tight text-ink">
            {toGermanDisplayText(chapter.title)}
          </h2>
          <p className="text-lg leading-8 text-slate">{toGermanDisplayText(chapter.description)}</p>

          <div className="rounded-[24px] border border-[#e6ebef] bg-[#f8fafb] p-5">
            <p className="text-sm leading-7 text-slate">{toGermanDisplayText(chapter.objective)}</p>
          </div>

          {ctaHint ? (
            <div className="rounded-[24px] border border-[#f1d77a] bg-[#fff8dd] p-5">
              <p className="text-sm leading-7 text-ink">{toGermanDisplayText(ctaHint)}</p>
            </div>
          ) : null}
        </div>

        <div className="space-y-4 rounded-[28px] bg-ink p-6 text-white shadow-card">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            Nächster Schritt
          </p>
          <div className="space-y-3 text-sm leading-6 text-white/88">
            <p>Du kannst direkt mit dem nächsten Abschnitt weitermachen.</p>
            <p>Oder du springst noch einmal zurück, wenn du ein Kapitel bewusst wiederholen möchtest.</p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={onContinue}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:bg-sand"
            >
              Weiter
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onReviewChapter}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              <RotateCcw className="h-4 w-4" />
              Kapitel erneut ansehen
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}



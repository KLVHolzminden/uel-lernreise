"use client";

import { ArrowRight, Plus } from "lucide-react";
import { Chapter, Scene } from "@/lib/types";
import { toGermanDisplayText } from "@/lib/utils";

type OptionalOfferCardProps = {
  chapter: Chapter | null;
  regularScene: Scene;
  optionalScene: Scene;
  completionNotice?: string | null;
  onContinue: () => void;
  onStartOptional: () => void;
};

export function OptionalOfferCard({
  chapter,
  regularScene,
  optionalScene,
  completionNotice,
  onContinue,
  onStartOptional,
}: OptionalOfferCardProps) {
  return (
    <section className="rounded-[32px] border border-white/70 bg-white/92 p-6 shadow-soft backdrop-blur md:p-8">
      <div className="grid gap-6 md:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pine">
            Aufgabe abgeschlossen
          </p>
          <h2 className="font-display text-4xl leading-tight text-ink">
            {toGermanDisplayText(regularScene.title)}
          </h2>
          {chapter ? (
            <p className="text-sm leading-6 text-slate">{toGermanDisplayText(chapter.title)}</p>
          ) : null}

          {completionNotice ? (
            <div className="rounded-3xl border border-[#b9d6b1] bg-[#eef8ea] p-4 text-sm leading-6 text-ink">
              {completionNotice}
            </div>
          ) : null}

          <div className="rounded-3xl border border-mist bg-sand/30 p-5">
            <p className="text-sm leading-7 text-slate">
              Zu dieser regulären Aufgabe passt eine freiwillige Vertiefung. Du kannst direkt im
              Lernweg weitermachen oder die Zusatzaufgabe jetzt mitnehmen. Wenn du sie überspringst,
              bleibt sie später in der Kapitelübersicht erreichbar.
            </p>
          </div>
        </div>

        <div className="space-y-4 rounded-[28px] bg-ink p-6 text-white shadow-card">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              Freiwillige Vertiefung
            </p>
            <p className="mt-3 text-2xl font-semibold">{toGermanDisplayText(optionalScene.title)}</p>
            <p className="mt-2 text-sm leading-6 text-white/82">
              Zusatzaufgabe zum Vertiefen. Sie blockiert den regulären Lernweg nicht.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={onContinue}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:bg-sand"
            >
              Weiter zur nächsten Aufgabe
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onStartOptional}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              <Plus className="h-4 w-4" />
              Freiwillige Vertiefung starten
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

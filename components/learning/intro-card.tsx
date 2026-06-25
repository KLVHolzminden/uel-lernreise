"use client";

import { ArrowRight } from "lucide-react";
import { Insight, IntroScene, PointsAward } from "@/lib/types";
import { SceneShell } from "@/components/learning/scene-shell";
import { getSceneActionAwards, getSceneCoreAward } from "@/lib/progress";
import { toGermanDisplayText } from "@/lib/utils";

type IntroCardProps = {
  scene: IntroScene;
  openedInsightIds: string[];
  awardedPointIds: string[];
  onAwardPoints: (awards: PointsAward[]) => void;
  onOpenInsight: (insight: Insight) => void;
  contextRail?: React.ReactNode;
  nextRail?: React.ReactNode;
  footerBar?: React.ReactNode;
  onOpenNotebook?: () => void;
  onOpenStatus?: () => void;
  onComplete: () => void;
};

export function IntroCard({
  scene,
  openedInsightIds,
  awardedPointIds,
  onAwardPoints,
  onOpenInsight,
  contextRail,
  nextRail,
  footerBar,
  onOpenNotebook,
  onOpenStatus,
  onComplete,
}: IntroCardProps) {
  const actionAwards = getSceneActionAwards(scene);
  const coreAward = getSceneCoreAward(scene);

  return (
    <SceneShell
      {...scene}
      insights={scene.insights}
      openedInsightIds={openedInsightIds}
      onOpenInsight={onOpenInsight}
      learningPoints={coreAward.total}
      contextAward={actionAwards.context}
      metaAward={actionAwards.meta}
      recallAward={actionAwards.recall}
      awardedPointIds={awardedPointIds}
      onAwardPoints={onAwardPoints}
      contextRail={contextRail}
      nextRail={nextRail}
      footerBar={footerBar}
      onOpenNotebook={onOpenNotebook}
      onOpenStatus={onOpenStatus}
    >
      {scene.highlights?.length ? (
        <div className="rounded-[30px] border border-mist bg-sand/30 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">
            Kurzüberblick
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {scene.highlights.map((highlight) => (
              <div
                key={highlight}
                className="rounded-[24px] border border-white/70 bg-white/82 p-4 text-sm leading-6 text-ink"
              >
                <div className="flex gap-3">
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-pine" />
                  <span>{toGermanDisplayText(highlight)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3 pt-2">
        {scene.id === "c1-intro" && onOpenStatus ? (
          <button
            type="button"
            onClick={onOpenStatus}
            className="min-h-12 rounded-full border border-mist bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-pine hover:text-pine"
          >
            ÜL-Kompass
          </button>
        ) : null}
        <button
          type="button"
          onClick={onComplete}
          className="min-h-12 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-pine"
        >
          Aufgabe abschließen
        </button>
      </div>
    </SceneShell>
  );
}


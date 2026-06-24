"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Insight, PointsAward, ScenarioScene } from "@/lib/types";
import { getSceneActionAwards, getSceneCoreAward } from "@/lib/progress";
import { cn, toGermanDisplayText } from "@/lib/utils";
import { SceneShell } from "@/components/learning/scene-shell";

type ScenarioCardProps = {
  scene: ScenarioScene;
  savedAnswer?: string;
  openedInsightIds: string[];
  awardedPointIds: string[];
  onAwardPoints: (awards: PointsAward[]) => void;
  onOpenInsight: (insight: Insight) => void;
  contextRail?: React.ReactNode;
  nextRail?: React.ReactNode;
  footerBar?: React.ReactNode;
  onOpenNotebook?: () => void;
  onOpenStatus?: () => void;
  onComplete: (answer: string) => void;
};

export function ScenarioCard({
  scene,
  savedAnswer,
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
}: ScenarioCardProps) {
  const [selected, setSelected] = useState<string>(savedAnswer ?? "");
  const active = scene.options.find((option) => option.id === selected);
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
      <div className="grid gap-4">
        {scene.options.map((option) => {
          const isSelected = selected === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelected(option.id)}
              className={cn(
                "min-h-16 rounded-3xl border px-6 py-5 text-left transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pine/25",
                isSelected
                  ? "border-pine bg-pine/6 shadow-sm"
                  : "border-mist bg-sand/30 hover:border-sky hover:bg-sky/20",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <p className="max-w-[70ch] text-lg leading-[1.55] text-ink">{toGermanDisplayText(option.label)}</p>
                {isSelected ? <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-pine" /> : null}
              </div>
            </button>
          );
        })}
      </div>

      {active ? (
        <div className="rounded-3xl border border-pine/15 bg-pine/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pine">Feedback</p>
          <p className="mt-2 max-w-[70ch] text-lg leading-[1.55] text-ink">
            {toGermanDisplayText(active.insight)}
          </p>
        </div>
      ) : null}

      <div className="pt-2">
        <button
          type="button"
          disabled={!selected}
          onClick={() => onComplete(selected)}
          className="min-h-14 rounded-full bg-ink px-7 py-3 text-lg font-semibold text-white transition hover:bg-pine disabled:cursor-not-allowed disabled:bg-slate/40"
        >
          Antwort sichern
        </button>
      </div>
    </SceneShell>
  );
}

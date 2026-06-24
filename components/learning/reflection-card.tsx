"use client";

import { useState } from "react";
import { Insight, PointsAward, ReflectionScene } from "@/lib/types";
import { getSceneActionAwards, getSceneCoreAward } from "@/lib/progress";
import { SceneShell } from "@/components/learning/scene-shell";
import { toGermanDisplayText } from "@/lib/utils";

type ReflectionCardProps = {
  scene: ReflectionScene;
  savedReflections: Record<string, string>;
  openedInsightIds: string[];
  awardedPointIds: string[];
  onAwardPoints: (awards: PointsAward[]) => void;
  onOpenInsight: (insight: Insight) => void;
  contextRail?: React.ReactNode;
  nextRail?: React.ReactNode;
  footerBar?: React.ReactNode;
  onOpenNotebook?: () => void;
  onOpenStatus?: () => void;
  onComplete: (answer: Record<string, string>) => void;
};

export function ReflectionCard({
  scene,
  savedReflections,
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
}: ReflectionCardProps) {
  const actionAwards = getSceneActionAwards(scene);
  const coreAward = getSceneCoreAward(scene);
  const [values, setValues] = useState<Record<string, string>>(
    scene.prompts.reduce<Record<string, string>>((accumulator, prompt) => {
      accumulator[prompt.id] = savedReflections[prompt.id] ?? "";
      return accumulator;
    }, {}),
  );

  const canSave = Object.values(values).some((value) => value.trim().length > 0);

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
        {scene.prompts.map((prompt) => (
          <label key={prompt.id} className="grid gap-2">
            <span className="text-lg font-semibold text-ink">
              {toGermanDisplayText(prompt.label)}
            </span>
            <textarea
              value={values[prompt.id] ?? ""}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  [prompt.id]: event.target.value,
                }))
              }
              rows={4}
              placeholder={toGermanDisplayText(prompt.placeholder)}
              className="min-h-[190px] rounded-3xl border border-mist bg-sand/30 px-5 py-4 text-lg leading-[1.55] text-ink outline-none transition focus:border-pine focus:ring-4 focus:ring-pine/15"
            />
          </label>
        ))}
      </div>

      <div className="pt-2">
        <button
          type="button"
          disabled={!canSave}
          onClick={() => onComplete(values)}
          className="min-h-14 rounded-full bg-ink px-7 py-3 text-lg font-semibold text-white transition hover:bg-pine disabled:cursor-not-allowed disabled:bg-slate/40"
        >
          Reflexion festhalten
        </button>
      </div>
    </SceneShell>
  );
}

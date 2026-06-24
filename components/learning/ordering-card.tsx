"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Insight, OrderingScene, PointsAward } from "@/lib/types";
import { getSceneActionAwards, getSceneCoreAward } from "@/lib/progress";
import { SceneShell } from "@/components/learning/scene-shell";
import { toGermanDisplayText } from "@/lib/utils";

type OrderingCardProps = {
  scene: OrderingScene;
  savedAnswer?: string[];
  openedInsightIds: string[];
  awardedPointIds: string[];
  onAwardPoints: (awards: PointsAward[]) => void;
  onOpenInsight: (insight: Insight) => void;
  contextRail?: React.ReactNode;
  nextRail?: React.ReactNode;
  footerBar?: React.ReactNode;
  onOpenNotebook?: () => void;
  onOpenStatus?: () => void;
  onComplete: (answer: string[]) => void;
};

export function OrderingCard({
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
}: OrderingCardProps) {
  const actionAwards = getSceneActionAwards(scene);
  const coreAward = getSceneCoreAward(scene);
  const initialSteps = useMemo(() => {
    if (!savedAnswer?.length) return scene.steps;
    return savedAnswer
      .map((id) => scene.steps.find((step) => step.id === id))
      .filter(Boolean) as OrderingScene["steps"];
  }, [savedAnswer, scene.steps]);

  const [steps, setSteps] = useState(initialSteps);

  const orderIds = steps.map((step) => step.id);
  const isCorrect = JSON.stringify(orderIds) === JSON.stringify(scene.correctOrder);

  function move(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= steps.length) return;
    const cloned = [...steps];
    const temp = cloned[index];
    cloned[index] = cloned[nextIndex];
    cloned[nextIndex] = temp;
    setSteps(cloned);
  }

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
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex items-center justify-between gap-5 rounded-3xl border border-mist bg-sand/35 px-6 py-5"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-lg font-semibold text-ink shadow-sm">
                {index + 1}
              </div>
              <p className="max-w-[70ch] text-lg leading-[1.55] text-ink">{toGermanDisplayText(step.label)}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => move(index, -1)}
                aria-label={`${toGermanDisplayText(step.label)} nach oben verschieben`}
                className="min-h-12 min-w-12 rounded-full border border-mist bg-white p-3 text-slate transition hover:border-pine hover:text-pine"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                aria-label={`${toGermanDisplayText(step.label)} nach unten verschieben`}
                className="min-h-12 min-w-12 rounded-full border border-mist bg-white p-3 text-slate transition hover:border-pine hover:text-pine"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-pine/15 bg-pine/5 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pine">Feedback</p>
        <p className="mt-2 max-w-[70ch] text-lg leading-[1.55] text-ink">
          {toGermanDisplayText(isCorrect ? scene.feedback.success : scene.feedback.gentle)}
        </p>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={() => onComplete(orderIds)}
          className="min-h-14 rounded-full bg-ink px-7 py-3 text-lg font-semibold text-white transition hover:bg-pine"
        >
          Reihenfolge speichern
        </button>
      </div>
    </SceneShell>
  );
}

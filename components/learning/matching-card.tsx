"use client";

import { useMemo, useState } from "react";
import { Insight, MatchingScene, PointsAward } from "@/lib/types";
import { getSceneActionAwards, getSceneCoreAward } from "@/lib/progress";
import { SceneShell } from "@/components/learning/scene-shell";
import { toGermanDisplayText } from "@/lib/utils";

type MatchingCardProps = {
  scene: MatchingScene;
  savedAnswer?: Record<string, string>;
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

export function MatchingCard({
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
}: MatchingCardProps) {
  const [assignments, setAssignments] = useState<Record<string, string>>(savedAnswer ?? {});
  const actionAwards = getSceneActionAwards(scene);
  const coreAward = getSceneCoreAward(scene);

  const complete = useMemo(
    () => scene.pairs.every((pair) => assignments[pair.id]),
    [assignments, scene.pairs],
  );

  const score = useMemo(() => {
    return scene.pairs.filter((pair) => assignments[pair.id] === scene.answers[pair.id]).length;
  }, [assignments, scene.answers, scene.pairs]);

  const message =
    score === scene.pairs.length ? scene.feedback.success : scene.feedback.gentle;

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
        {scene.pairs.map((pair) => (
          <div
            key={pair.id}
            className="grid gap-4 rounded-3xl border border-mist bg-sand/35 p-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.42fr)] lg:items-center"
          >
            <p className="max-w-[70ch] text-lg leading-[1.55] text-ink">{toGermanDisplayText(pair.label)}</p>
            <select
              value={assignments[pair.id] ?? ""}
              onChange={(event) =>
                setAssignments((current) => ({
                  ...current,
                  [pair.id]: event.target.value,
                }))
              }
              className="min-h-14 rounded-2xl border border-mist bg-white px-4 py-3 text-lg text-ink outline-none transition focus:border-pine focus:ring-4 focus:ring-pine/15"
            >
              <option value="">Bitte zuordnen</option>
              {scene.targets.map((target) => (
                <option key={target.id} value={target.id}>
                  {toGermanDisplayText(target.label)}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-sky bg-sky/35 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">Orientierung</p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {scene.targets.map((target) => (
            <div key={target.id} className="rounded-2xl bg-white/75 p-4">
              <p className="font-semibold text-ink">{toGermanDisplayText(target.label)}</p>
              {target.description ? (
                <p className="mt-1 text-sm leading-6 text-slate">
                  {toGermanDisplayText(target.description)}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {complete ? (
        <div className="rounded-3xl border border-pine/15 bg-pine/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pine">Feedback</p>
          <p className="mt-2 max-w-[70ch] text-lg leading-[1.55] text-ink">{toGermanDisplayText(message)}</p>
        </div>
      ) : null}

      <div className="pt-2">
        <button
          type="button"
          disabled={!complete}
          onClick={() => onComplete(assignments)}
          className="min-h-14 rounded-full bg-ink px-7 py-3 text-lg font-semibold text-white transition hover:bg-pine disabled:cursor-not-allowed disabled:bg-slate/40"
        >
          Zuordnung speichern
        </button>
      </div>
    </SceneShell>
  );
}

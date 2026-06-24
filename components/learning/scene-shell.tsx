"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpenText,
  Clock3,
  Compass,
  Lightbulb,
  Trophy,
} from "lucide-react";
import { Badge } from "@/components/learning/badge";
import { FocusDialog } from "@/components/learning/focus-dialog";
import { SceneInsights } from "@/components/learning/scene-insights";
import { ChapterAccent, DimensionId, Insight, PointsAward, RecallHint } from "@/lib/types";
import { cn, toGermanDisplayText } from "@/lib/utils";

type SceneShellProps = {
  eyebrow?: string;
  title: string;
  prompt: string;
  context?: string;
  takeaway?: string;
  transferQuestion?: string;
  estimatedMinutes?: number;
  accent?: ChapterAccent;
  taskTypeLabel?: string;
  primaryDimension?: DimensionId;
  learningPoints?: number;
  optional?: boolean;
  recallHint?: RecallHint;
  contextAward?: PointsAward | null;
  metaAward?: PointsAward | null;
  recallAward?: PointsAward | null;
  insights?: Insight[];
  openedInsightIds?: string[];
  onOpenInsight?: (insight: Insight) => void;
  awardedPointIds?: string[];
  onAwardPoints?: (awards: PointsAward[]) => void;
  contextRail?: React.ReactNode;
  nextRail?: React.ReactNode;
  footerBar?: React.ReactNode;
  onOpenNotebook?: () => void;
  onOpenStatus?: () => void;
  children: React.ReactNode;
};

const dimensionAccent: Record<DimensionId, ChapterAccent> = {
  lachen: "yellow",
  lernen: "green",
  leisten: "red",
};

const dimensionPanelClasses: Record<DimensionId, string> = {
  lachen: "border-[#f1d77a] bg-[#fff8dd]",
  lernen: "border-[#b9d6b1] bg-[#eef8ea]",
  leisten: "border-[#f0b2a3] bg-[#fff1ec]",
};

const dimensionLabel: Record<DimensionId, string> = {
  lachen: "Lachen",
  lernen: "Lernen",
  leisten: "Leisten",
};

type LocalLayerId = "why" | "insights" | "next";
type QuickAction = {
  id: LocalLayerId | "notebook" | "status";
  label: string;
  meta: string | null;
  icon: typeof Lightbulb;
  onClick: () => void;
};

export function SceneShell({
  eyebrow,
  title,
  prompt,
  context,
  takeaway,
  transferQuestion,
  estimatedMinutes,
  accent = "blue",
  taskTypeLabel,
  primaryDimension,
  learningPoints: _learningPoints,
  optional,
  recallHint,
  contextAward: _contextAward,
  metaAward: _metaAward,
  recallAward: _recallAward,
  insights = [],
  openedInsightIds = [],
  onOpenInsight,
  awardedPointIds: _awardedPointIds = [],
  onAwardPoints: _onAwardPoints,
  contextRail,
  nextRail,
  footerBar,
  onOpenNotebook,
  onOpenStatus,
  children,
}: SceneShellProps) {
  const [activeLayer, setActiveLayer] = useState<LocalLayerId | null>(null);
  const headerAccent = primaryDimension ? dimensionAccent[primaryDimension] : accent;
  const discoveredInsights = useMemo(
    () => insights.filter((insight) => openedInsightIds.includes(insight.id)).length,
    [insights, openedInsightIds],
  );
  const hasWhyLayer = Boolean(context || takeaway || transferQuestion || recallHint || contextRail);
  const hasInsightLayer = Boolean(insights.length && onOpenInsight);
  const hasNextLayer = Boolean(nextRail);

  const quickActions: QuickAction[] = [];

  if (hasWhyLayer) {
    quickActions.push({
      id: "why",
      label: "Warum",
      meta: null,
      icon: Lightbulb,
      onClick: () => setActiveLayer("why"),
    });
  }

  if (hasInsightLayer) {
    quickActions.push({
      id: "insights",
      label: "Impulse",
      meta: `${discoveredInsights}/${insights.length}`,
      icon: Compass,
      onClick: () => setActiveLayer("insights"),
    });
  }

  if (onOpenNotebook) {
    quickActions.push({
      id: "notebook",
      label: "Notiz",
      meta: null,
      icon: BookOpenText,
      onClick: onOpenNotebook,
    });
  }

  if (onOpenStatus) {
    quickActions.push({
      id: "status",
      label: "Status",
      meta: null,
      icon: Trophy,
      onClick: onOpenStatus,
    });
  }

  if (hasNextLayer) {
    quickActions.push({
      id: "next",
      label: "Danach",
      meta: null,
      icon: ArrowRight,
      onClick: () => setActiveLayer("next"),
    });
  }

  return (
    <motion.section
      key={title}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="learning-scene relative overflow-hidden rounded-[36px] border border-white/70 bg-white/95 p-5 shadow-soft backdrop-blur md:p-7 xl:p-9"
    >
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_108px] xl:items-start xl:gap-6">
        <div className="min-w-0 space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {eyebrow ? <Badge tone={headerAccent}>{toGermanDisplayText(eyebrow)}</Badge> : null}
              {taskTypeLabel ? <Badge tone="blue">{toGermanDisplayText(taskTypeLabel)}</Badge> : null}
              {primaryDimension ? (
                <Badge tone={dimensionAccent[primaryDimension]}>
                  {dimensionLabel[primaryDimension]}
                </Badge>
              ) : null}
              {optional ? <Badge tone="blue">Freiwillige Vertiefung</Badge> : null}
            </div>

            {estimatedMinutes ? (
              <div className="inline-flex items-center gap-2 rounded-full bg-sand px-3 py-1.5 text-sm text-slate/90">
                <Clock3 className="h-4 w-4" />
                <span>{estimatedMinutes} Min.</span>
              </div>
            ) : null}
          </div>

          <div className="max-w-[64rem] space-y-3">
            <h2 className="max-w-[22ch] font-display text-[2.35rem] leading-[1.06] text-ink [text-wrap:balance] md:text-[2.65rem] xl:text-[2.85rem]">
              {toGermanDisplayText(title)}
            </h2>
            <p className="max-w-[70ch] text-xl leading-[1.55] text-ink/92">
              {toGermanDisplayText(prompt)}
            </p>
          </div>

          <div className="min-w-0">{children}</div>
        </div>

        {quickActions.length ? (
          <aside className="min-w-0 xl:sticky xl:top-24">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 xl:grid-cols-1">
              {quickActions.map((action) => {
                const Icon = action.icon;
                const isActive = activeLayer === action.id;

                return (
                  <button
                    key={action.id}
                    type="button"
                    onClick={action.onClick}
                    className={cn(
                      "flex min-h-[76px] items-center justify-center gap-2 rounded-[22px] border border-white/75 bg-sand/45 px-3 py-3 text-left transition hover:border-pine hover:bg-white hover:shadow-sm xl:flex-col xl:gap-1 xl:px-2 xl:text-center",
                      isActive && "border-pine bg-white shadow-[0_14px_34px_rgba(17,32,51,0.16)] ring-2 ring-pine/18",
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-ink" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-5 text-ink xl:text-[0.82rem]">
                        {action.label}
                      </p>
                      {action.meta ? (
                        <p className="text-xs text-slate xl:mt-0.5">{action.meta}</p>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>
        ) : null}
      </div>

      {footerBar ? <div className="mt-6">{footerBar}</div> : null}

      <FocusDialog
        open={activeLayer !== null}
        onClose={() => setActiveLayer(null)}
        eyebrow={
          activeLayer === "why"
            ? "Warum und Kontext"
            : activeLayer === "insights"
              ? "Praxisimpulse"
              : "Danach"
        }
        title={
          activeLayer === "why"
            ? "Warum ist das wichtig?"
            : activeLayer === "insights"
              ? "Impulse zur Aufgabe"
              : "Wie geht es weiter?"
        }
        maxWidth={activeLayer === "next" ? "lg" : "xl"}
      >
                {activeLayer === "why" ? (
                  <div className="space-y-5">
                    {context ? (
                      <div className="rounded-3xl border border-mist bg-white p-5 text-lg leading-[1.55] text-ink/82 shadow-sm">
                        {toGermanDisplayText(context)}
                      </div>
                    ) : null}

                    {recallHint ? (
                      <div className={cn("rounded-3xl border p-4 shadow-sm", dimensionPanelClasses[recallHint.dimension])}>
                        <div className="flex gap-3">
                          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-ink/70" />
                          <p className="text-lg leading-[1.55] text-ink">
                            {toGermanDisplayText(recallHint.text)}
                          </p>
                        </div>
                      </div>
                    ) : null}

                    {takeaway || transferQuestion ? (
                      <div className="grid gap-4 md:grid-cols-2">
                        {takeaway ? (
                          <div className="rounded-3xl border border-pine/20 bg-pine/6 p-4 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pine">
                              Merksatz
                            </p>
                            <p className="mt-2 text-lg leading-[1.55] text-ink">
                              {toGermanDisplayText(takeaway)}
                            </p>
                          </div>
                        ) : null}

                        {transferQuestion ? (
                          <div className="rounded-3xl border border-ember/20 bg-ember/6 p-4 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">
                              Transfer
                            </p>
                            <div className="mt-2 flex gap-3 text-lg leading-[1.55] text-ink">
                              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-ember" />
                              <p>{toGermanDisplayText(transferQuestion)}</p>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    {contextRail}
                  </div>
                ) : null}

                {activeLayer === "insights" ? (
                  hasInsightLayer ? (
                    <SceneInsights
                      insights={insights}
                      openedInsightIds={openedInsightIds}
                      onOpenInsight={onOpenInsight!}
                    />
                  ) : (
                    <div className="rounded-3xl border border-mist bg-white p-5 text-lg leading-[1.55] text-ink/82 shadow-sm">
                      Zu dieser Aufgabe sind aktuell keine Praxisimpulse hinterlegt.
                    </div>
                  )
                ) : null}

                {activeLayer === "next" ? (
                  nextRail ?? (
                    <div className="rounded-3xl border border-mist bg-white p-5 text-lg leading-[1.55] text-ink/82 shadow-sm">
                      Nach dieser Aufgabe folgt der nächste Schritt deiner Lernreise.
                    </div>
                  )
                ) : null}
      </FocusDialog>
    </motion.section>
  );
}


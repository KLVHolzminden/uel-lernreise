"use client";

import { useMemo, useState } from "react";
import { Compass, Search, Lightbulb } from "lucide-react";
import { FocusDialog } from "@/components/learning/focus-dialog";
import { Insight } from "@/lib/types";
import { cn, toGermanDisplayText } from "@/lib/utils";

type SceneInsightsProps = {
  insights: Insight[];
  openedInsightIds: string[];
  onOpenInsight: (insight: Insight) => void;
};

const categoryMeta = {
  praxis: {
    icon: Compass,
    badge: "Praxisimpuls",
  },
  didaktik: {
    icon: Lightbulb,
    badge: "Didaktik",
  },
  organisation: {
    icon: Search,
    badge: "Organisation",
  },
} as const;

export function SceneInsights({
  insights,
  openedInsightIds,
  onOpenInsight,
}: SceneInsightsProps) {
  const [activeInsightId, setActiveInsightId] = useState<string | null>(null);
  const [freshInsightId, setFreshInsightId] = useState<string | null>(null);
  const [freshBonus, setFreshBonus] = useState(false);

  const activeInsight = useMemo(
    () => insights.find((insight) => insight.id === activeInsightId) ?? null,
    [activeInsightId, insights],
  );
  const discoveredCount = useMemo(
    () => insights.filter((insight) => openedInsightIds.includes(insight.id)).length,
    [insights, openedInsightIds],
  );

  if (!insights.length) return null;

  function openInsight(insight: Insight) {
    const alreadyOpened = openedInsightIds.includes(insight.id);
    const nextOpenedIds = alreadyOpened ? openedInsightIds : [...openedInsightIds, insight.id];
    const completesSet = !alreadyOpened && insights.every((entry) => nextOpenedIds.includes(entry.id));

    if (!alreadyOpened) {
      onOpenInsight(insight);
    }

    setFreshInsightId(alreadyOpened ? null : insight.id);
    setFreshBonus(completesSet);
    setActiveInsightId(insight.id);
  }

  function closeInsight() {
    setActiveInsightId(null);
    setFreshInsightId(null);
    setFreshBonus(false);
  }

  return (
    <div className="space-y-4 rounded-[28px] border border-mist bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xl font-semibold text-ink">Mehr erfahren</p>
          <p className="mt-1 text-base text-ink/70">
            {discoveredCount} von {insights.length} Praxisimpulsen entdeckt
          </p>
        </div>
      </div>

      <div className="grid gap-2">
        {insights.map((insight) => {
          const meta = categoryMeta[insight.category];
          const Icon = meta.icon;
          const discovered = openedInsightIds.includes(insight.id);

          return (
            <button
              key={insight.id}
              type="button"
              onClick={() => openInsight(insight)}
              className="flex min-h-16 items-center justify-between gap-4 rounded-3xl border border-mist bg-white px-5 py-4 text-left shadow-sm transition hover:border-pine hover:bg-pine/5 hover:shadow-[0_12px_30px_rgba(17,32,51,0.12)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pine/25"
            >
              <div className="min-w-0">
                <p className="text-lg font-semibold leading-7 text-ink [overflow-wrap:anywhere]">{toGermanDisplayText(insight.triggerLabel)}</p>
                <p className="mt-1 text-base text-ink/65">{toGermanDisplayText(meta.badge)}</p>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] shadow-sm",
                  discovered ? "bg-[#e8f1eb] text-ink ring-1 ring-[#b9d6b1]" : "bg-ink text-white",
                )}
              >
                {discovered ? "gelesen" : "+1"}
              </span>
            </button>
          );
        })}
      </div>

      <FocusDialog
        open={Boolean(activeInsight)}
        onClose={closeInsight}
        eyebrow={activeInsight ? toGermanDisplayText(categoryMeta[activeInsight.category].badge) : "Praxisimpuls"}
        title={activeInsight ? toGermanDisplayText(activeInsight.title) : "Praxisimpuls"}
        maxWidth="xl"
        footer={
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeInsight}
              className="inline-flex min-h-14 items-center rounded-full bg-ink px-7 py-3 text-lg font-semibold text-white transition hover:bg-pine focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pine/30"
            >
              Schließen
            </button>
          </div>
        }
      >
        {activeInsight ? (
          <div className="space-y-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-sand px-4 py-2 text-base font-semibold uppercase tracking-[0.12em] text-slate">
                  {(() => {
                    const Icon = categoryMeta[activeInsight.category].icon;
                    return <Icon className="h-3.5 w-3.5" />;
                  })()}
                  {toGermanDisplayText(categoryMeta[activeInsight.category].badge)}
                </span>

              {freshInsightId === activeInsight.id ? (
                <div className="rounded-2xl border border-[#b9d6b1] bg-[#eef8ea] px-5 py-4 text-lg font-medium text-ink shadow-sm">
                  Praxisimpuls entdeckt: +1
                </div>
              ) : openedInsightIds.includes(activeInsight.id) ? (
                <div className="rounded-2xl border border-mist bg-white px-5 py-4 text-lg text-ink/72 shadow-sm">
                  Bereits entdeckt.
                </div>
              ) : null}

              {freshBonus ? (
                <div className="rounded-2xl border border-[#f1d77a] bg-[#fff8dd] px-5 py-4 text-lg font-medium text-ink shadow-sm">
                  Alle drei Praxisimpulse dieser Aufgabe entdeckt: +1 Bonus
                </div>
              ) : null}

              <p className="max-w-[70ch] text-lg leading-[1.6] text-ink">{toGermanDisplayText(activeInsight.content)}</p>
          </div>
        ) : null}
      </FocusDialog>
    </div>
  );
}


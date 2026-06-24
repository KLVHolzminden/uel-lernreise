"use client";

import { Compass, Lightbulb, Search } from "lucide-react";

type InsightCounterProps = {
  discovered: number;
  total: number;
  points?: number;
  compact?: boolean;
};

export function InsightCounter({
  discovered,
  total,
  points,
  compact = false,
}: InsightCounterProps) {
  return (
    <div
      className={
        compact
          ? "inline-flex items-center gap-2 rounded-full border border-[#dbe4ea] bg-[#f6fafc] px-3 py-1.5 text-sm text-slate"
          : "rounded-[22px] border border-[#dbe4ea] bg-[#f6fafc] px-4 py-4"
      }
    >
      <div className="flex items-center gap-2">
        <Lightbulb className="h-4 w-4 text-[#496a8e]" />
        <span className="font-semibold text-ink">
          {discovered} von {total} Insights entdeckt
        </span>
      </div>
      {points !== undefined ? (
        <div className="flex items-center gap-2 text-slate">
          {compact ? <span className="text-slate">•</span> : null}
          <Compass className="h-4 w-4 text-[#739183]" />
          <span>{points} Punkte</span>
        </div>
      ) : null}
      {!compact && total > discovered ? (
        <div className="mt-3 flex items-center gap-2 text-sm text-slate">
          <Search className="h-4 w-4 text-[#8aa1b5]" />
          <span>Einige Einblicke warten noch auf dich.</span>
        </div>
      ) : null}
    </div>
  );
}

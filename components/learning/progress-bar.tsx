import { DimensionId } from "@/lib/types";

type ProgressBarProps = {
  value: number;
  label: string;
  dimension?: DimensionId;
};

const progressStyles: Record<DimensionId, string> = {
  lachen: "from-[#f3c63b] to-[#f6de7a]",
  lernen: "from-[#4f8b4f] to-[#85b96d]",
  leisten: "from-[#d6543d] to-[#f08b67]",
};

export function ProgressBar({ value, label, dimension }: ProgressBarProps) {
  const percentage = Math.max(0, Math.min(100, Math.round(value * 100)));
  const barClass = dimension
    ? progressStyles[dimension]
    : "from-pine to-moss";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3 text-[0.92rem] text-slate">
        <span className="font-semibold text-ink">{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/80 shadow-inner">
        <div
          className={`h-full rounded-full bg-gradient-to-r transition-all duration-500 ${barClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

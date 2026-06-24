import { cn } from "@/lib/utils";
import { ChapterAccent } from "@/lib/types";

type BadgeProps = {
  children: React.ReactNode;
  tone?: ChapterAccent;
};

export function Badge({ children, tone = "blue" }: BadgeProps) {
  const tones: Record<ChapterAccent, string> = {
    blue: "bg-sky/70 text-ink",
    yellow: "bg-[#f7e39b] text-[#6b5200]",
    green: "bg-[#d8ead2] text-[#275c32]",
    red: "bg-[#f4d0c7] text-[#8c3523]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

import { cn, clamp } from "@/lib/utils";

export function Progress({ value, className }: { value: number; className?: string }) {
  const safeValue = clamp(value);
  return (
    <div className={cn("h-2.5 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 transition-all"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}

import { TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { DashboardStat } from "@/types";

export function StatCard({ stat }: { stat: DashboardStat }) {
  return (
    <Card className="neon-border p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
          <p className="mt-2 text-3xl font-black tracking-tight">{stat.value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{stat.helper}</p>
        </div>
        <span className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
          <TrendingUp className="size-5" />
        </span>
      </div>
      <p className="mt-4 text-xs font-semibold text-emerald-300">{stat.trend}</p>
    </Card>
  );
}

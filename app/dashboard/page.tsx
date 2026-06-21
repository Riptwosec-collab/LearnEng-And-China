import { AppShell } from "@/components/layout/app-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { PathCard } from "@/components/dashboard/path-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { dailyMissions, dashboardStats } from "@/lib/data/dashboard";
import { learningPaths } from "@/lib/data/learning-paths";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge variant="success">Streak 14 วัน · XP 8,420</Badge>
          <h1 className="mt-3 text-3xl font-black tracking-tight lg:text-5xl">วันนี้เรียนอะไรดี?</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">ระบบแนะนำจาก progress, คำที่ต้องทบทวน และจุดอ่อนล่าสุดของคุณ</p>
        </div>
        <Button>เริ่ม Daily Mission</Button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-black">Learning Paths</h2>
            <Button variant="ghost">ดูทั้งหมด</Button>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {learningPaths.map((path) => <PathCard key={path.id} path={path} />)}
          </div>
        </div>

        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="text-2xl font-black">Skill Radar</h2>
            <div className="mt-5 space-y-4">
              {[
                ["Vocabulary", 68],
                ["Speaking", 76],
                ["Listening", 54],
                ["Reading", 61],
                ["Writing", 47]
              ].map(([label, value]) => (
                <div key={label as string}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{label}</span>
                    <span className="text-muted-foreground">{value}%</span>
                  </div>
                  <Progress value={value as number} />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-2xl font-black">Daily Missions</h2>
            <div className="mt-4 space-y-3">
              {dailyMissions.map((mission) => (
                <div key={mission.id} className="rounded-3xl border border-border bg-secondary/30 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold">{mission.title}</p>
                      <p className="text-sm text-muted-foreground">{mission.description}</p>
                    </div>
                    <Badge variant={mission.isDone ? "success" : "outline"}>{mission.xp} XP</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </AppShell>
  );
}

import Link from "next/link";
import { ArrowRight, CalendarDays, Flame, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PathCard } from "@/components/dashboard/path-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { RecommendedLessonCard } from "@/components/learning/recommended-lesson-card";
import { SkillScoreCard } from "@/components/learning/skill-score-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { dashboardStats, dailyMissions } from "@/lib/data/dashboard";
import { learningPaths } from "@/lib/data/learning-paths";
import { phase3Dashboard } from "@/lib/data/phase3-learning";

export default function DashboardPage() {
  const recommendedPaths = learningPaths.slice(0, 4);
  const { learnerSnapshot, skillMetrics, weeklyLearningPlan, recommendedLessons, categoryCoverage } = phase3Dashboard;

  return (
    <AppShell>
      <div className="mb-8 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="relative overflow-hidden p-6">
          <div className="absolute -right-20 -top-20 size-56 rounded-full bg-cyan-400/20 blur-3xl" />
          <Badge variant="success"><Flame className="size-3" /> Streak {learnerSnapshot.streak} วัน · XP {learnerSnapshot.xp.toLocaleString()}</Badge>
          <h1 className="mt-4 text-3xl font-black tracking-tight lg:text-5xl">วันนี้เรียนอะไรดี?</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">ระบบแนะนำจาก progress, คำที่ต้องทบทวน, skill score และบทเรียนที่ควรเรียนต่อเพื่อขยับจาก {learnerSnapshot.level}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild><Link href="/learn">เริ่ม Daily Mission <ArrowRight className="size-4" /></Link></Button>
            <Button asChild variant="glass"><Link href="/review">ทบทวน {learnerSnapshot.reviewDue} คำ</Link></Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Today Goal</p>
              <h2 className="mt-1 text-2xl font-black">{learnerSnapshot.todayGoal}</h2>
            </div>
            <span className="rounded-2xl bg-violet-400/10 p-3 text-violet-300"><Sparkles className="size-5" /></span>
          </div>
          <div className="mt-5 space-y-3">
            {learnerSnapshot.weakPoints.map((point) => <Badge key={point} variant="outline">{point}</Badge>)}
          </div>
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm text-muted-foreground"><span>Goal completion</span><span>68%</span></div>
            <Progress value={68} />
          </div>
        </Card>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black">Continue Learning</h2>
              <p className="text-sm text-muted-foreground">เส้นทางที่ระบบแนะนำจาก Phase 3 progress model</p>
            </div>
            <Button asChild variant="ghost"><Link href="/paths">ดูทั้งหมด</Link></Button>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {recommendedPaths.map((path) => <PathCard key={path.id} path={path} />)}
          </div>
        </div>

        <div className="space-y-4">
          <RecommendedLessonCard lesson={recommendedLessons[0]} />
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black">Weekly Plan</h2>
              <CalendarDays className="size-5 text-cyan-300" />
            </div>
            <div className="mt-5 grid grid-cols-7 gap-2">
              {weeklyLearningPlan.map((day) => (
                <div key={day.day} className="rounded-2xl border border-border bg-secondary/30 p-2 text-center">
                  <div className="mx-auto flex h-20 items-end justify-center rounded-xl bg-background/30 p-1">
                    <span className="w-full rounded-lg bg-cyan-300/60" style={{ height: `${Math.max(18, day.minutes * 3)}%` }} />
                  </div>
                  <p className="mt-2 text-xs font-bold">{day.day}</p>
                  <p className="text-[10px] text-muted-foreground">{day.xp} XP</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4">
          <h2 className="text-2xl font-black">Skill Score</h2>
          <p className="text-sm text-muted-foreground">วัดผล Vocabulary, Speaking, Listening, Reading, Writing และ Grammar</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skillMetrics.map((metric) => <SkillScoreCard key={metric.skill} metric={metric} />)}
        </div>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
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

        <Card className="p-5">
          <h2 className="text-2xl font-black">Category Coverage</h2>
          <p className="mt-2 text-sm text-muted-foreground">หมวดที่เชื่อม vocabulary + lesson + progress</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {categoryCoverage.slice(0, 6).map((category) => (
              <div key={category.id} className="rounded-3xl border border-border bg-secondary/30 p-4">
                <div className="flex items-center justify-between"><span className="font-bold">{category.icon} {category.nameTh}</span><span className="text-sm text-muted-foreground">{category.progress}%</span></div>
                <Progress value={category.progress} className="mt-3" />
                <p className="mt-2 text-xs text-muted-foreground">{category.words} words · {category.lessonCount} lessons</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </AppShell>
  );
}

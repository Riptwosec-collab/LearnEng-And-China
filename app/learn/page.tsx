import Link from "next/link";
import { ArrowRight, BookOpen, Brain, Headphones, Mic2, PenLine } from "lucide-react";
import { PathCard } from "@/components/dashboard/path-card";
import { RecommendedLessonCard } from "@/components/learning/recommended-lesson-card";
import { SkillScoreCard } from "@/components/learning/skill-score-card";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { learningPathSeeds } from "@/lib/data/phase2-dataset";
import { getPathsBySection, learningHubSections, phase3Dashboard } from "@/lib/data/phase3-learning";

const quickSkills = [
  { title: "Vocabulary", href: "/vocabulary", icon: Brain, helper: "10K system + SRS" },
  { title: "Speaking", href: "/speaking", icon: Mic2, helper: "record + roleplay" },
  { title: "Listening", href: "/listening", icon: Headphones, helper: "dictation + transcript" },
  { title: "Reading", href: "/reading", icon: BookOpen, helper: "bilingual passage" },
  { title: "Writing", href: "/writing", icon: PenLine, helper: "AI correction" }
];

export default function LearnPage() {
  const recommendedLessons = phase3Dashboard.recommendedLessons;
  const skillMetrics = phase3Dashboard.skillMetrics.slice(0, 3);

  return (
    <AppShell>
      <PageHeader eyebrow="Learn Hub" title="ศูนย์รวมการเรียนทุกสกิล" description="Phase 3 ทำให้หน้า Learn เป็นศูนย์กลางจริง: เลือก path, ต่อ lesson ล่าสุด, ดู skill gap และเข้า lab ได้ไว" />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {quickSkills.map((skill) => {
          const Icon = skill.icon;
          return (
            <Link key={skill.title} href={skill.href as never}>
              <Card className="group h-full p-5 transition hover:-translate-y-1 hover:border-cyan-300/50">
                <span className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300 inline-flex"><Icon className="size-5" /></span>
                <h3 className="mt-4 text-xl font-black">{skill.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{skill.helper}</p>
              </Card>
            </Link>
          );
        })}
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Card className="p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Badge variant="success">Recommended Flow</Badge>
              <h2 className="mt-3 text-2xl font-black">เรียนต่อวันนี้</h2>
              <p className="text-sm text-muted-foreground">บทเรียนที่ระบบเลือกจาก progress + weak points</p>
            </div>
            <Button asChild variant="glass"><Link href="/paths">ดู learning paths <ArrowRight className="size-4" /></Link></Button>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {recommendedLessons.slice(0, 2).map((lesson) => <RecommendedLessonCard key={lesson.id} lesson={lesson} />)}
          </div>
        </Card>

        <div className="grid gap-4">
          {skillMetrics.map((metric) => <SkillScoreCard key={metric.skill} metric={metric} />)}
        </div>
      </section>

      <section className="mt-8 space-y-8">
        {learningHubSections.map((section) => {
          const paths = getPathsBySection(section.id) as typeof learningPathSeeds;
          return (
            <div key={section.id}>
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-black">{section.title}</h2>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </div>
                <Badge variant="outline">{paths.length} paths</Badge>
              </div>
              <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {paths.map((path) => path ? <PathCard key={path.id} path={path} /> : null)}
              </div>
            </div>
          );
        })}
      </section>
    </AppShell>
  );
}

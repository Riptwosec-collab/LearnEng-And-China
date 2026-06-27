import { ClipboardCheck, Flame, Languages, Trophy } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getTestCenterSummary, getTests } from "@/lib/data/test-center";

const typeLabels: Record<string, string> = {
  placement: "Placement Test",
  lesson_quiz: "Lesson Quiz",
  unit_test: "Unit Test",
  skill_test: "Skill Test",
  cefr_mock: "CEFR Mock",
  daily_challenge: "Daily Challenge",
  review_test: "Review Test",
  weakness_test: "Weakness Test"
};

export default function TestsPage() {
  const tests = getTests();
  const englishTests = tests.filter((test) => test.language === "english");
  const chineseTests = tests.filter((test) => test.language === "chinese");
  const summary = getTestCenterSummary();

  return (
    <AppShell>
      <PageHeader
        eyebrow="Test Center"
        title="แบบทดสอบ / Tests"
        description="วัดระดับก่อนเรียน ทำ Daily Challenge และเก็บข้อผิดพลาดเข้าระบบ Review ได้ใน Phase ถัดไป"
      />

      <div className="space-y-8">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card className="p-5">
            <span className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
              <ClipboardCheck className="size-5" />
            </span>
            <p className="mt-4 text-sm text-muted-foreground">Published tests</p>
            <p className="mt-1 text-3xl font-black">{summary.totalTests}</p>
          </Card>
          <Card className="p-5">
            <span className="rounded-2xl bg-violet-400/10 p-3 text-violet-300">
              <Languages className="size-5" />
            </span>
            <p className="mt-4 text-sm text-muted-foreground">English questions</p>
            <p className="mt-1 text-3xl font-black">{summary.englishQuestions}</p>
          </Card>
          <Card className="p-5">
            <span className="rounded-2xl bg-amber-400/10 p-3 text-amber-300">
              <Trophy className="size-5" />
            </span>
            <p className="mt-4 text-sm text-muted-foreground">Chinese safe seed</p>
            <p className="mt-1 text-3xl font-black">{summary.chineseQuestions}</p>
          </Card>
          <Card className="p-5">
            <span className="rounded-2xl bg-emerald-400/10 p-3 text-emerald-300">
              <Flame className="size-5" />
            </span>
            <p className="mt-4 text-sm text-muted-foreground">Skills covered</p>
            <p className="mt-1 text-3xl font-black">{summary.skillsCovered.length}</p>
          </Card>
        </section>

        <Card className="overflow-hidden p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Badge variant="success">Recommended first</Badge>
              <h2 className="mt-3 text-2xl font-black">เริ่มด้วย English Placement Test</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                วัดระดับ CEFR, สรุป skill score, weakness tags และสร้าง study plan ภาษาไทย 7 วันแรก
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-secondary/30 px-4 py-3 text-sm text-muted-foreground">
              API preview: <code className="text-cyan-300">GET /api/tests/start?testId=placement-english-core</code>
            </div>
          </div>
          <div className="mt-5">
            <div className="mb-2 flex justify-between text-sm text-muted-foreground">
              <span>Phase 1 readiness</span>
              <span>35%</span>
            </div>
            <Progress value={35} />
          </div>
        </Card>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black">English tests</h2>
              <p className="text-sm text-muted-foreground">เน้นระบบทดสอบอังกฤษก่อน แล้วคง test seed ภาษาจีนไว้ไม่ให้ flow เดิมพัง</p>
            </div>
            <Badge variant="outline">{englishTests.length} tests</Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {englishTests.map((test) => (
              <Card key={test.id} className="p-5">
                <div className="flex flex-wrap gap-2">
                  <Badge>{typeLabels[test.type] ?? test.type}</Badge>
                  <Badge variant="outline">{test.level ?? "Adaptive"}</Badge>
                  <Badge variant="outline">{test.xpReward} XP</Badge>
                </div>
                <h3 className="mt-4 text-xl font-black">{test.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{test.descriptionTh}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {test.sections.map((section) => (
                    <Badge key={section.id} variant="outline">
                      {section.title}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  ~{test.estimatedMinutes} นาที · {test.questionIds.length} questions
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-black">Chinese compatibility</h2>
            <Badge variant="outline">{chineseTests.length} starter</Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {chineseTests.map((test) => (
              <Card key={test.id} className="p-5">
                <Badge>{test.language}</Badge>
                <h3 className="mt-4 text-xl font-black">{test.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{test.descriptionTh}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

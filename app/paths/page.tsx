import { Filter, Globe2 } from "lucide-react";
import { PathCard } from "@/components/dashboard/path-card";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { learningPaths } from "@/lib/data/learning-paths";
import { pathSummaries } from "@/lib/data/phase3-learning";

const levels = ["A1", "A2", "B1", "B2", "C1"];
const languages = ["english", "chinese", "mixed"];

export default function PathsPage() {
  const activePaths = learningPaths.filter((path) => !path.isLocked);
  const englishCount = learningPaths.filter((path) => path.language === "english").length;
  const chineseCount = learningPaths.filter((path) => path.language === "chinese").length;
  const averageProgress = Math.round(pathSummaries.reduce((sum, item) => sum + item.progress, 0) / Math.max(1, pathSummaries.length));

  return (
    <AppShell>
      <PageHeader eyebrow="Learning Paths" title="เส้นทางเรียนหลัก" description="เลือกเป้าหมายเรียนตามชีวิตจริง: Daily Life, Travel, Work, School, Conversation, Vocabulary 10K, Grammar และ AI Roleplay" />

      <section className="mb-8 grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <Globe2 className="size-5 text-cyan-300" />
          <p className="mt-4 text-3xl font-black">{activePaths.length}</p>
          <p className="text-sm text-muted-foreground">เปิดเรียนได้ตอนนี้</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Languages</p>
          <p className="mt-4 text-3xl font-black">EN {englishCount} · ZH {chineseCount}</p>
          <p className="text-sm text-muted-foreground">อังกฤษและจีนกลาง</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Average progress</p>
          <p className="mt-4 text-3xl font-black">{averageProgress}%</p>
          <Progress value={averageProgress} className="mt-3" />
        </Card>
      </section>

      <Card className="mb-6 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 text-sm font-bold"><Filter className="size-4" /> Filters mock</span>
          {languages.map((item) => <Badge key={item} variant="outline">{item}</Badge>)}
          {levels.map((item) => <Badge key={item} variant="outline">{item}</Badge>)}
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {learningPaths.map((path) => <PathCard key={path.id} path={path} />)}
      </div>
    </AppShell>
  );
}

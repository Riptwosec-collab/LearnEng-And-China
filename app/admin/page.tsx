import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { adminModules, adminSummary } from "@/lib/data/phase8-admin";

export default function AdminPage() {
  const stats = [
    ["Vocabulary", adminSummary.vocabularyTotal],
    ["Categories", adminSummary.categoryTotal],
    ["Paths", adminSummary.learningPathTotal],
    ["Draft lessons", adminSummary.draftLessons]
  ];

  return (
    <AppShell>
      <PageHeader eyebrow="Phase 8 Admin CMS" title="ระบบหลังบ้านจัดการคอนเทนต์" description="จัดการคำศัพท์ บทเรียน และการนำเข้าข้อมูล ก่อนเชื่อม Supabase role จริง" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value]) => (
          <Card key={label} className="p-5">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-black">{value}</p>
          </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminModules.map((item) => (
          <Link key={item.id} href={item.href}>
            <Card className="h-full p-5 transition hover:-translate-y-1 hover:border-cyan-300/50">
              <h2 className="text-xl font-black">{item.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}

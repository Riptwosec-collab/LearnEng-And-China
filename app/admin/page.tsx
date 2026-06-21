import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";

const adminLinks = [
  { href: "/admin/vocabulary", title: "Vocabulary CMS", body: "เพิ่ม/แก้ไขคำศัพท์ อังกฤษ-จีน" },
  { href: "/admin/lessons", title: "Lesson CMS", body: "จัดการบทเรียน lesson steps และ exercises" },
  { href: "/admin/import", title: "CSV/JSON Import", body: "นำเข้าคำศัพท์จำนวนมาก 10,000+ คำ" }
];

export default function AdminPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Admin CMS" title="ระบบหลังบ้านสำหรับจัดการคอนเทนต์" description="Phase 8 จะต่อ CRUD, CSV import, validation และ role-based access control" />
      <div className="grid gap-4 md:grid-cols-3">
        {adminLinks.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="p-5 transition hover:-translate-y-1 hover:border-cyan-300/50">
              <h2 className="text-xl font-black">{item.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </Card>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}

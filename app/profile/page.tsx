import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Profile" title="โปรไฟล์ผู้เรียน" description="เป้าหมาย ภาษา ระดับปัจจุบัน streak badge และ daily goal" />
      <Card className="p-6"><h2 className="text-2xl font-black">Demo Learner</h2><p className="mt-2 text-muted-foreground">Goal: ใช้ภาษาอังกฤษและจีนในชีวิตประจำวันและทำงาน</p></Card>
    </AppShell>
  );
}

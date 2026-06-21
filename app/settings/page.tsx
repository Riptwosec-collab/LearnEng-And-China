import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Settings" title="ตั้งค่าการเรียน" description="ภาษาเป้าหมาย theme, daily goal, reminder และ AI preferences" />
      <Card className="p-6">Dark/Light mode อยู่ที่ปุ่มมุมขวาบนของ Topbar</Card>
    </AppShell>
  );
}

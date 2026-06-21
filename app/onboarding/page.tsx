import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function OnboardingPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Onboarding" title="ตั้งค่าเป้าหมายก่อนเริ่มเรียน" description="เลือกภาษา เป้าหมาย และระดับเริ่มต้น เพื่อแนะนำ path ที่เหมาะสม" />
      <Card className="p-6"><Button>เลือก English + Chinese</Button></Card>
    </AppShell>
  );
}

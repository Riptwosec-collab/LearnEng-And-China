import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { deploymentSteps, envChecklist, performanceBudget, securityChecklist } from "@/lib/data/phase10-production";
import { launchChecklist } from "@/lib/data/phase12-launch";

export default function AdminSystemPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Phase 10-12" title="Production Console" description="Check env, security, performance, deployment and launch readiness." />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="text-xl font-black">Environment</h2>
          <div className="mt-4 space-y-3">{envChecklist.map((item) => <p key={item.key} className="text-sm"><b>{item.key}</b> - {item.purpose}</p>)}</div>
        </Card>
        <Card className="p-5">
          <h2 className="text-xl font-black">Security</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">{securityChecklist.map((item) => <li key={item}>- {item}</li>)}</ul>
        </Card>
        <Card className="p-5">
          <h2 className="text-xl font-black">Performance Budget</h2>
          <div className="mt-4 space-y-3">{performanceBudget.map((item) => <p key={item.metric} className="text-sm"><b>{item.metric}</b>: {item.target}</p>)}</div>
        </Card>
        <Card className="p-5">
          <h2 className="text-xl font-black">Launch Checklist</h2>
          <div className="mt-4 space-y-3">{launchChecklist.map((item) => <p key={item.id} className="text-sm"><b>{item.title}</b> - {item.status}</p>)}</div>
        </Card>
      </div>
      <Card className="mt-4 p-5">
        <h2 className="text-xl font-black">Deployment Steps</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">{deploymentSteps.map((step) => <li key={step}>{step}</li>)}</ol>
      </Card>
    </AppShell>
  );
}

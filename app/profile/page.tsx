import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { achievements, learnerProfile } from "@/lib/data/phase11-user-progress";

export default function ProfilePage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Profile" title="Learner profile" description="Goal, levels, streak and badges." />
      <Card className="p-6">
        <h2 className="text-3xl font-black">{learnerProfile.name}</h2>
        <p className="mt-2 text-muted-foreground">{learnerProfile.mainGoal}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-white/5 p-4">English<br /><b>{learnerProfile.englishLevel}</b></div>
          <div className="rounded-2xl bg-white/5 p-4">Chinese<br /><b>{learnerProfile.chineseLevel}</b></div>
          <div className="rounded-2xl bg-white/5 p-4">Goal<br /><b>{learnerProfile.dailyGoal} min</b></div>
          <div className="rounded-2xl bg-white/5 p-4">Streak<br /><b>{learnerProfile.streak} days</b></div>
        </div>
      </Card>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {achievements.map((badge) => <Card key={badge.id} className="p-5"><h3 className="font-black">{badge.title}</h3><p className="mt-2 text-sm text-muted-foreground">{badge.description}</p></Card>)}
      </div>
    </AppShell>
  );
}

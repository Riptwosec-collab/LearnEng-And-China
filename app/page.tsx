"use client";
import Link from "next/link";
import { ArrowRight, Globe, Sparkles, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUiLanguage } from "@/lib/ui-language";

const categories = [
  "🍜 ร้านอาหาร", "✈️ การเดินทาง", "🏥 โรงพยาบาล",
  "💼 ที่ทำงาน", "🏫 โรงเรียน", "🛒 ช้อปปิ้ง",
  "🚨 ฉุกเฉิน", "🏨 โรงแรม", "📞 บทสนทนา"
];

export default function HomePage() {
  const { t } = useUiLanguage();
  return (
    <main className="min-h-dvh bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="text-center">
          <Badge className="mb-6">{t("landingBadge")}</Badge>
          <h1 className="mx-auto max-w-3xl text-5xl font-black leading-tight tracking-tight sm:text-6xl">
            {t("landingHeadline")}{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
              LinguaQuest AI
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">{t("landingDesc")}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/dashboard">{t("landingCtaStart")} <ArrowRight className="size-4" /></Link>
            </Button>
            <Button asChild variant="glass" size="lg">
              <Link href="/placement-test">{t("landingCtaPlacement")}</Link>
            </Button>
          </div>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-3">
          <Card className="p-6">
            <Sparkles className="size-8 text-cyan-300" />
            <h3 className="mt-4 text-xl font-black">{t("heroF1Title")}</h3>
            <p className="mt-2 text-muted-foreground">{t("heroF1Body")}</p>
          </Card>
          <Card className="p-6">
            <Zap className="size-8 text-violet-300" />
            <h3 className="mt-4 text-xl font-black">{t("heroF2Title")}</h3>
            <p className="mt-2 text-muted-foreground">{t("heroF2Body")}</p>
          </Card>
          <Card className="p-6">
            <Globe className="size-8 text-emerald-300" />
            <h3 className="mt-4 text-xl font-black">{t("heroF3Title")}</h3>
            <p className="mt-2 text-muted-foreground">{t("heroF3Body")}</p>
          </Card>
        </div>

        <div className="mt-20 text-center">
          <Badge variant="outline" className="mb-4">{t("landingCategoriesBadge")}</Badge>
          <h2 className="text-3xl font-black">{t("landingCategoriesTitle")}</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {categories.map((c) => (
              <span key={c} className="rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm font-medium">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { useUiLanguage } from "@/lib/ui-language";

export default function SettingsPage() {
  const { t } = useUiLanguage();
  return (
    <AppShell>
      <PageHeader eyebrow={t("settingsEyebrow")} title={t("settingsTitle")} description={t("settingsDesc")} />
      <Card className="p-6 space-y-3">
        <p className="text-muted-foreground">{t("settingsThemeNote")}</p>
        <p className="text-muted-foreground">{t("settingsLangNote")}</p>
      </Card>
    </AppShell>
  );
}

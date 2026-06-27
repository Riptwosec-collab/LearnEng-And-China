"use client";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { mainNav } from "@/lib/navigation";
import { useUiLanguage } from "@/lib/ui-language";
import { cn } from "@/lib/utils";

export function Sidebar({ className }: { className?: string }) {
  const { t } = useUiLanguage();
  return (
    <aside className={cn("hidden h-dvh w-72 shrink-0 border-r border-border/60 bg-background/40 p-4 backdrop-blur-xl lg:block", className)}>
      <Link href="/dashboard" className="mb-8 flex items-center gap-3 rounded-3xl p-3">
        <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 to-violet-400 text-slate-950 shadow-lg shadow-cyan-500/20">
          <Sparkles className="size-5" />
        </span>
        <span>
          <span className="block text-lg font-black tracking-tight">LinguaQuest</span>
          <span className="block text-xs text-muted-foreground">{t("appSubtitle")}</span>
        </span>
      </Link>
      <nav className="space-y-1">
        {mainNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-secondary/70 hover:text-foreground"
          >
            <item.icon className="size-4" />
            {t(item.labelKey)}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

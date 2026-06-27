"use client";

import { Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUiLanguage } from "@/lib/ui-language";

export function Topbar() {
  const { theme, setTheme } = useTheme();
  const { lang, toggle, t } = useUiLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 px-4 py-3 backdrop-blur-xl lg:px-8">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder={t("search")} className="pl-11" />
        </div>

        {/* Language toggle */}
        <Button
          variant="glass"
          size="sm"
          onClick={toggle}
          aria-label="Toggle UI language"
          className="min-w-[4rem] font-bold tracking-wide"
        >
          {lang === "th" ? "🇹🇭 TH" : "🇬🇧 EN"}
        </Button>

        {/* Dark / Light toggle */}
        <Button
          variant="glass"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>
    </header>
  );
}

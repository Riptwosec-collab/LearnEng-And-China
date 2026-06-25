import Link from "next/link";
import { Bot, Home, Mic, Repeat2, ScrollText } from "lucide-react";

const mobileNav = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/vocabulary", label: "Words", icon: ScrollText },
  { href: "/speaking", label: "Speak", icon: Mic },
  { href: "/review", label: "Review", icon: Repeat2 },
  { href: "/ai-tutor", label: "Tutor", icon: Bot }
] as const;

export function BottomNav() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-5 rounded-[1.7rem] border border-border bg-background/80 p-2 shadow-2xl backdrop-blur-xl lg:hidden">
      {mobileNav.map((item) => (
        <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground">
          <item.icon className="size-5" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

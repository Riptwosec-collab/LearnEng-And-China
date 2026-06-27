import type React from "react";
import { BookOpen, Bot, Gauge, Headphones, Home, Mic, PenLine, Repeat2, ScrollText, Settings, User } from "lucide-react";
import type { TranslationKey } from "@/lib/ui-language";

export const mainNav: { href: string; labelKey: TranslationKey; icon: React.ElementType }[] = [
  { href: "/dashboard",  labelKey: "navHome",       icon: Home },
  { href: "/learn",      labelKey: "navLearn",       icon: BookOpen },
  { href: "/vocabulary", labelKey: "navVocabulary",  icon: ScrollText },
  { href: "/speaking",   labelKey: "navSpeaking",    icon: Mic },
  { href: "/listening",  labelKey: "navListening",   icon: Headphones },
  { href: "/reading",    labelKey: "navReading",     icon: BookOpen },
  { href: "/writing",    labelKey: "navWriting",     icon: PenLine },
  { href: "/ai-tutor",   labelKey: "navAiTutor",     icon: Bot },
  { href: "/review",     labelKey: "navReview",      icon: Repeat2 },
  { href: "/progress",   labelKey: "navProgress",    icon: Gauge },
  { href: "/profile",    labelKey: "navProfile",     icon: User },
  { href: "/settings",   labelKey: "navSettings",    icon: Settings },
];

export const mobileNav: { href: string; labelKey: TranslationKey; icon: React.ElementType }[] = [
  { href: "/dashboard",  labelKey: "mobileHome",   icon: Home },
  { href: "/vocabulary", labelKey: "mobileWords",  icon: ScrollText },
  { href: "/speaking",   labelKey: "mobileSpeak",  icon: Mic },
  { href: "/review",     labelKey: "mobileReview", icon: Repeat2 },
  { href: "/ai-tutor",   labelKey: "mobileTutor",  icon: Bot },
];

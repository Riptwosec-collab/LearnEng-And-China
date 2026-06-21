import { BookOpen, Bot, Gauge, Headphones, Home, Mic, PenLine, Repeat2, ScrollText, Settings, User, Volume2 } from "lucide-react";

export const mainNav = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/vocabulary", label: "Vocabulary", icon: ScrollText },
  { href: "/speaking", label: "Speaking", icon: Mic },
  { href: "/listening", label: "Listening", icon: Headphones },
  { href: "/reading", label: "Reading", icon: BookOpen },
  { href: "/writing", label: "Writing", icon: PenLine },
  { href: "/ai-tutor", label: "AI Tutor", icon: Bot },
  { href: "/review", label: "Review", icon: Repeat2 },
  { href: "/progress", label: "Progress", icon: Gauge },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/listening", label: "Audio", icon: Volume2 }
];

"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type UiLang = "th" | "en";

const STORAGE_KEY = "linguaquest:ui-lang";

// ─── Translations ─────────────────────────────────────────────────────────────
const translations = {
  th: {
    // Nav
    home: "หน้าหลัก",
    learn: "เรียน",
    vocabulary: "คำศัพท์",
    speaking: "พูด",
    listening: "ฟัง",
    reading: "อ่าน",
    writing: "เขียน",
    aiTutor: "AI Tutor",
    review: "ทบทวน",
    progress: "ความก้าวหน้า",
    profile: "โปรไฟล์",
    settings: "ตั้งค่า",
    // Common UI
    start: "เริ่มเรียน",
    continue: "เรียนต่อ",
    completed: "เสร็จแล้ว",
    loading: "กำลังโหลด...",
    error: "เกิดข้อผิดพลาด",
    refresh: "รีเฟรช",
    search: "ค้นหาคำศัพท์ บทเรียน grammar หรือถาม AI...",
    lessons: "บทเรียน",
    words: "คำศัพท์",
    score: "คะแนน",
    level: "ระดับ",
    // Dashboard
    todayGoal: "เป้าหมายวันนี้",
    streak: "streak วัน",
    xp: "XP",
    // Placement
    startPlacement: "เริ่มวัดระดับ",
    // Auth
    login: "เข้าสู่ระบบ",
    logout: "ออกจากระบบ",
    register: "สมัครสมาชิก",
  },
  en: {
    // Nav
    home: "Home",
    learn: "Learn",
    vocabulary: "Vocabulary",
    speaking: "Speaking",
    listening: "Listening",
    reading: "Reading",
    writing: "Writing",
    aiTutor: "AI Tutor",
    review: "Review",
    progress: "Progress",
    profile: "Profile",
    settings: "Settings",
    // Common UI
    start: "Start lesson",
    continue: "Continue",
    completed: "Completed",
    loading: "Loading...",
    error: "Something went wrong",
    refresh: "Refresh",
    search: "Search vocabulary, lessons, grammar or ask AI...",
    lessons: "Lessons",
    words: "Words",
    score: "Score",
    level: "Level",
    // Dashboard
    todayGoal: "Today's goal",
    streak: "day streak",
    xp: "XP",
    // Placement
    startPlacement: "Take placement test",
    // Auth
    login: "Log in",
    logout: "Log out",
    register: "Sign up",
  },
} as const;

export type TranslationKey = keyof typeof translations.th;

// ─── Context ──────────────────────────────────────────────────────────────────
type UiLanguageContextValue = {
  lang: UiLang;
  setLang: (lang: UiLang) => void;
  toggle: () => void;
  t: (key: TranslationKey) => string;
};

const UiLanguageContext = createContext<UiLanguageContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function UiLanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<UiLang>("th");

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "th" || saved === "en") setLangState(saved);
  }, []);

  const setLang = useCallback((next: UiLang) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "th" ? "en" : "th");
  }, [lang, setLang]);

  const t = useCallback(
    (key: TranslationKey): string => translations[lang][key],
    [lang]
  );

  return (
    <UiLanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </UiLanguageContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useUiLanguage() {
  const ctx = useContext(UiLanguageContext);
  if (!ctx) throw new Error("useUiLanguage must be used inside UiLanguageProvider");
  return ctx;
}

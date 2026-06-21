import type { DailyMission, DashboardStat } from "@/types";

export const dashboardStats: DashboardStat[] = [
  { label: "จำคำศัพท์แล้ว", value: "1,248", helper: "English 830 · Chinese 418", trend: "+42 สัปดาห์นี้" },
  { label: "ต้องทบทวนวันนี้", value: "38", helper: "SRS queue พร้อมฝึก", trend: "ใช้เวลา ~12 นาที" },
  { label: "Speaking Score", value: "76", helper: "Pronunciation + Fluency", trend: "+6 จากรอบก่อน" },
  { label: "Streak", value: "14 วัน", helper: "เป้าหมาย 30 คำ/วัน", trend: "อีก 3 วันปลด Badge" }
];

export const dailyMissions: DailyMission[] = [
  {
    id: "m1",
    title: "จำศัพท์ร้านอาหาร 10 คำ",
    description: "ฝึกคำศัพท์ + ฟังเสียง + mini quiz",
    xp: 40,
    skill: "vocabulary",
    isDone: false
  },
  {
    id: "m2",
    title: "พูด Roleplay สั่งกาแฟ 1 นาที",
    description: "AI จะให้คะแนน pronunciation และ confidence",
    xp: 60,
    skill: "speaking",
    isDone: false
  },
  {
    id: "m3",
    title: "อ่านบทความสั้น A2",
    description: "ไฮไลต์คำศัพท์และตอบ comprehension quiz",
    xp: 50,
    skill: "reading",
    isDone: true
  }
];

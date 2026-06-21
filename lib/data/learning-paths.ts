import type { LearningPath } from "@/types";

export const learningPaths: LearningPath[] = [
  {
    id: "daily-life-english",
    title: "Daily Life English",
    description: "ใช้ภาษาอังกฤษในบ้าน ร้านอาหาร เดินทาง และสถานการณ์จริง",
    language: "english",
    level: "A1",
    lessonCount: 42,
    estimatedTime: "8 weeks",
    skillFocus: ["vocabulary", "speaking", "listening"],
    progress: 34,
    isLocked: false,
    recommendedNextLesson: "Ordering coffee naturally"
  },
  {
    id: "daily-life-chinese",
    title: "Daily Life Chinese",
    description: "จีนกลางพื้นฐานพร้อม pinyin คำอ่านไทย และ tone practice",
    language: "chinese",
    level: "A1",
    lessonCount: 40,
    estimatedTime: "8 weeks",
    skillFocus: ["vocabulary", "speaking", "listening"],
    progress: 18,
    isLocked: false,
    recommendedNextLesson: "Asking price at a market"
  },
  {
    id: "work-english",
    title: "Work English",
    description: "อีเมล ประชุม โทรศัพท์ และประโยคทำงานแบบมืออาชีพ",
    language: "english",
    level: "B1",
    lessonCount: 36,
    estimatedTime: "10 weeks",
    skillFocus: ["speaking", "writing", "grammar"],
    progress: 12,
    isLocked: false,
    recommendedNextLesson: "Short status update in meetings"
  },
  {
    id: "travel-chinese",
    title: "Travel Chinese",
    description: "สนามบิน โรงแรม แท็กซี่ ถามทาง และเหตุฉุกเฉิน",
    language: "chinese",
    level: "A2",
    lessonCount: 32,
    estimatedTime: "6 weeks",
    skillFocus: ["speaking", "listening", "reading"],
    progress: 0,
    isLocked: false,
    recommendedNextLesson: "Taxi destination roleplay"
  }
];

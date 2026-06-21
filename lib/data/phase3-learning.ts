import { categorySeeds, learningPathSeeds, lessonSeeds, lessonStepSeeds, vocabularySeeds } from "./phase2-dataset";
import type { Skill } from "@/types";

export const skillMetrics = [
  { skill: "vocabulary" as Skill, label: "Vocabulary", score: 72, target: 85, helper: "จำได้ 1,248 คำ · วันนี้ควรทบทวน 38 คำ" },
  { skill: "speaking" as Skill, label: "Speaking", score: 64, target: 80, helper: "ออกเสียงดีขึ้น แต่ยังติด rhythm และ confidence" },
  { skill: "listening" as Skill, label: "Listening", score: 58, target: 78, helper: "ควรฝึก dictation และเปิด transcript หลังตอบแล้ว" },
  { skill: "reading" as Skill, label: "Reading", score: 69, target: 82, helper: "อ่าน A2 ได้ดี กำลังเริ่ม B1" },
  { skill: "writing" as Skill, label: "Writing", score: 53, target: 75, helper: "จุดอ่อนคือ tense, word order และ natural tone" },
  { skill: "grammar" as Skill, label: "Grammar", score: 61, target: 80, helper: "ควรทบทวน present simple, modal verbs และ word order" }
];

const weeklyLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const weeklyLearningPlan = weeklyLabels.map((day, index) => ({
  day,
  xp: [120, 80, 160, 90, 130, 60, 110][index],
  minutes: [18, 12, 24, 15, 20, 10, 16][index],
  completed: index < 4
}));

export const learnerSnapshot = {
  name: "Mek",
  level: "A2 → B1",
  todayGoal: "30 words + 1 speaking roleplay",
  xp: 8420,
  streak: 14,
  wordsRemembered: 1248,
  reviewDue: 38,
  recommendedPathId: "daily-life-english",
  weakPoints: ["Listening speed", "Writing word order", "Chinese tone 3", "Modal verbs"]
};

export function getLessonsForPath(pathId: string) {
  return lessonSeeds
    .filter((lesson) => lesson.pathId === pathId)
    .sort((a, b) => a.order - b.order)
    .map((lesson, index) => {
      const steps = lessonStepSeeds.filter((step) => step.lessonId === lesson.id).sort((a, b) => a.order - b.order);
      const status = index < 2 ? "completed" : index === 2 ? "in_progress" : index < 8 ? "ready" : "locked";
      const progress = status === "completed" ? 100 : status === "in_progress" ? 55 : 0;
      return {
        ...lesson,
        steps,
        status,
        progress,
        xpReward: 45 + (index % 4) * 10,
        isRecommended: index === 2
      };
    });
}

export function getLessonById(id: string) {
  const lesson = lessonSeeds.find((item) => item.id === id);
  if (!lesson) return null;
  const lessonsInPath = getLessonsForPath(lesson.pathId);
  return lessonsInPath.find((item) => item.id === id) ?? null;
}

export function getPathSummary(pathId: string) {
  const lessons = getLessonsForPath(pathId);
  const nextLesson = lessons.find((lesson) => lesson.status === "in_progress") ?? lessons.find((lesson) => lesson.status === "ready") ?? lessons[0];
  const completedLessons = lessons.filter((lesson) => lesson.status === "completed").length;
  const activeLessons = lessons.filter((lesson) => lesson.status === "in_progress" || lesson.status === "ready").length;
  return {
    pathId,
    completedLessons,
    activeLessons,
    totalLessons: lessons.length,
    progress: lessons.length ? Math.round((completedLessons / lessons.length) * 100) : 0,
    nextLessonId: nextLesson?.id ?? "",
    nextLessonTitle: nextLesson?.title ?? "ยังไม่มีบทเรียน",
    estimatedMinsToday: nextLesson?.estimatedMins ?? 10
  };
}

export const pathSummaries = learningPathSeeds.map((path) => getPathSummary(path.id));

export function getRecommendedLessons(limit = 6) {
  return learningPathSeeds
    .flatMap((path) => getLessonsForPath(path.id).map((lesson) => ({ ...lesson, pathTitle: path.title, pathLanguage: path.language })))
    .filter((lesson) => lesson.status !== "locked")
    .sort((a, b) => Number(b.isRecommended) - Number(a.isRecommended) || b.progress - a.progress)
    .slice(0, limit);
}

export const learningHubSections = [
  {
    id: "daily-life",
    title: "ใช้จริงในชีวิตประจำวัน",
    description: "บ้าน ร้านอาหาร เดินทาง ซื้อของ โทรศัพท์ และปัญหาจริง",
    pathIds: ["daily-life-english", "daily-life-chinese", "travel-english", "travel-chinese", "emergency-communication"]
  },
  {
    id: "work-school",
    title: "เรียนและทำงาน",
    description: "อีเมล ประชุม โทรศัพท์ สมัครงาน สัมภาษณ์ และมหาลัย",
    pathIds: ["work-english", "work-chinese", "school-university", "interview-mode"]
  },
  {
    id: "skill-labs",
    title: "Skill Labs",
    description: "ฝึกแยกสกิล Vocabulary, Grammar, Reading, Listening, Writing, Speaking",
    pathIds: ["vocabulary-10k", "grammar-in-use", "reading-lab", "listening-lab", "writing-lab", "speaking-lab"]
  }
];

export function getPathsBySection(sectionId: string) {
  const section = learningHubSections.find((item) => item.id === sectionId);
  if (!section) return [];
  return section.pathIds.map((pathId) => learningPathSeeds.find((path) => path.id === pathId)).filter(Boolean);
}

export function getCategoryCoverage(limit = 12) {
  return categorySeeds.slice(0, limit).map((category, index) => {
    const words = vocabularySeeds.filter((word) => word.categoryId === category.id || word.category === category.id).length;
    return {
      ...category,
      words,
      lessonCount: lessonSeeds.filter((lesson) => lesson.categoryId === category.id).length,
      progress: [82, 68, 55, 40, 72, 20, 35, 60, 48, 74, 28, 44][index % 12]
    };
  });
}

export const phase3Dashboard = {
  learnerSnapshot,
  skillMetrics,
  weeklyLearningPlan,
  pathSummaries,
  recommendedLessons: getRecommendedLessons(5),
  categoryCoverage: getCategoryCoverage(10)
};

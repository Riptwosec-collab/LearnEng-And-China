export const onboardingGoals = [
  { id: "daily-life", title: "ใช้ในชีวิตประจำวัน", recommendedLevel: "A1" },
  { id: "travel", title: "เดินทางและท่องเที่ยว", recommendedLevel: "A2" },
  { id: "work", title: "ทำงาน ประชุม อีเมล", recommendedLevel: "B1" },
  { id: "exam", title: "เตรียมสอบ", recommendedLevel: "B1" },
  { id: "conversation", title: "คุยกับต่างชาติ", recommendedLevel: "A2" }
];

export const placementQuestions = [
  { id: "vocab-1", skill: "vocabulary", level: "A1", prompt: "Choose the Thai meaning of appointment.", answer: "การนัดหมาย" },
  { id: "grammar-1", skill: "grammar", level: "A2", prompt: "Choose the correct daily routine sentence.", answer: "I go to work at 8." },
  { id: "reading-1", skill: "reading", level: "B1", prompt: "Find the main idea from a short work email.", answer: "Meeting time changed." },
  { id: "listening-1", skill: "listening", level: "A2", prompt: "Listen and choose the destination.", answer: "airport" },
  { id: "speaking-1", skill: "speaking", level: "A1", prompt: "Say: I would like a coffee.", answer: "speech-score" }
];

export const learnerProfile = {
  name: "Demo Learner",
  thaiName: "ผู้เรียนตัวอย่าง",
  mainGoal: "สื่อสารอังกฤษและจีนในชีวิตจริง",
  englishLevel: "A2",
  chineseLevel: "A1",
  xp: 4820,
  streak: 18,
  dailyGoal: 30,
  wordsRemembered: 436,
  wordsDueToday: 42
};

export const achievements = [
  { id: "first-100", title: "First 100 Words", description: "Remembered 100 words.", unlocked: true },
  { id: "seven-day", title: "7-Day Streak", description: "Practiced for seven days.", unlocked: true },
  { id: "speaker", title: "Brave Speaker", description: "Completed 10 speaking sessions.", unlocked: false },
  { id: "reader", title: "Reading Starter", description: "Finished 20 reading passages.", unlocked: false }
];

export const progressHeatmap = Array.from({ length: 28 }, (_, index) => ({
  day: index + 1,
  xp: 20 + ((index * 17) % 90),
  reviews: 3 + (index % 9)
}));

export const recentMistakes = [
  { skill: "speaking", item: "reservation", note: "Stress second syllable more clearly." },
  { skill: "writing", item: "appointment email", note: "Use a clearer subject line." },
  { skill: "grammar", item: "Present simple", note: "Remember s/es with he or she." }
];

export function recommendPlacementLevel(score: number) {
  if (score >= 85) return "B2";
  if (score >= 70) return "B1";
  if (score >= 50) return "A2";
  return "A1";
}

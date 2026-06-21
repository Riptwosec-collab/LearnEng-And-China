import { readingPassages, writingPrompts } from "./phase2-dataset";

export const readingLabItems = readingPassages.map((item, index) => ({
  ...item,
  readingTimeMinutes: 3 + (index % 6),
  keyVocabulary: ["reservation", "ticket", "schedule", "medicine", "transfer"].slice(0, 3 + (index % 3)),
  summaryTh: "บทอ่านนี้ฝึกจับใจความ สถานการณ์จริง และคำศัพท์ที่ใช้บ่อยในชีวิตประจำวัน",
  comprehensionQuestions: [
    { question: "What is the main idea?", answer: "Daily-life communication" },
    { question: "Which word is useful in this situation?", answer: "The highlighted vocabulary" },
  ],
  bilingualSentences: [
    { target: item.content.split(".")[0] || item.title, th: "แปลไทยทีละประโยคสำหรับผู้เรียนไทย" },
  ],
}));

export const writingLabPrompts = writingPrompts.map((item, index) => ({
  ...item,
  estimatedMinutes: 5 + (index % 6),
  scoreRubric: ["grammar", "vocabulary", "clarity", "naturalness", "structure", "tone"],
  sampleAnswer: index % 2 === 0 ? "Hi, I would like to reschedule our meeting to Friday afternoon. Please let me know if that works for you." : "Today I practiced new words and listened to a short conversation. I want to speak more naturally tomorrow.",
  tipsTh: ["เขียนประโยคสั้นก่อน", "ใช้คำเชื่อมง่าย ๆ", "ตรวจ tense และ tone ก่อนส่ง"],
}));

export const writingCorrectionMock = {
  before: "I want change meeting to tomorrow because I busy today.",
  after: "I would like to reschedule the meeting for tomorrow because I am busy today.",
  scores: { grammar: 72, vocabulary: 76, clarity: 80, naturalness: 74, structure: 78, tone: 82 },
  explanationTh: "ประโยคเดิมเข้าใจได้ แต่ควรใช้ reschedule และเติม am เพื่อให้ grammar ถูกต้อง รวมถึงใช้ would like เพื่อให้สุภาพขึ้น",
  suggestedVocabulary: ["reschedule", "available", "confirm", "convenient"],
};

export function getReadingPassage(id: string) {
  return readingLabItems.find((item) => item.id === id) ?? null;
}

export function getWritingPrompt(id: string) {
  return writingLabPrompts.find((item) => item.id === id) ?? null;
}

export function scoreWritingPreview(text: string) {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const base = Math.min(88, 55 + wordCount * 2);
  return {
    wordCount,
    correctedText: text.trim() ? text.trim().replace(/\bi want\b/i, "I would like to") : writingCorrectionMock.after,
    scores: {
      grammar: base,
      vocabulary: Math.min(92, base + 3),
      clarity: Math.min(94, base + 5),
      naturalness: Math.max(50, base - 2),
      structure: Math.min(90, base + 1),
      tone: Math.min(95, base + 4),
    },
    explanationTh: "นี่เป็น mock correction สำหรับ Phase 6 ก่อนต่อ OpenAI API จริงใน production",
    suggestedVocabulary: writingCorrectionMock.suggestedVocabulary,
  };
}

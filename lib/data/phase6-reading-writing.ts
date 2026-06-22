import { readingPassageSeeds, writingPromptSeeds } from "./phase2-dataset";

export const readingLabItems = readingPassageSeeds.map((item, index) => ({
  ...item,
  readingTimeMinutes: 3 + (index % 6),
  keyVocabulary: ["reservation", "ticket", "schedule", "medicine", "transfer"].slice(0, 3 + (index % 3)),
  summaryTh: item.summaryTh ?? "Reading practice for daily communication.",
  comprehensionQuestions: [
    { question: "What is the main idea?", answer: "Daily-life communication" },
    { question: "Which word is useful in this situation?", answer: "The highlighted vocabulary" },
  ],
  bilingualSentences: [
    { target: item.passage.split(".")[0] || item.title, th: item.translationTh },
  ],
}));

export const writingLabPrompts = writingPromptSeeds.map((item, index) => ({
  ...item,
  estimatedMinutes: 5 + (index % 6),
  scoreRubric: ["grammar", "vocabulary", "clarity", "naturalness", "structure", "tone"],
  sampleAnswer: index % 2 === 0 ? "Hi, I would like to reschedule our meeting to Friday afternoon. Please let me know if that works for you." : "Today I practiced new words and listened to a short conversation. I want to speak more naturally tomorrow.",
  tipsTh: ["write short sentences first", "use simple connectors", "check tense and tone"],
}));

export const writingCorrectionMock = {
  before: "I want change meeting to tomorrow because I busy today.",
  after: "I would like to reschedule the meeting for tomorrow because I am busy today.",
  scores: { grammar: 72, vocabulary: 76, clarity: 80, naturalness: 74, structure: 78, tone: 82 },
  explanationTh: "Use reschedule, add am, and choose would like for a polite tone.",
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
    explanationTh: "Mock correction for Phase 6 before connecting OpenAI.",
    suggestedVocabulary: writingCorrectionMock.suggestedVocabulary,
  };
}

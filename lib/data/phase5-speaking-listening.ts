import { listeningItems, speakingScenarios } from "./phase2-dataset";

export const speakingSessionMock = {
  id: "session-restaurant-a2",
  scenarioId: "scenario-restaurant-1",
  targetSentence: "I'd like an iced latte and a sandwich, please.",
  userTranscript: "I like iced latte and sandwich please",
  scores: { pronunciation: 78, fluency: 74, confidence: 82, accuracy: 76 },
  mispronouncedWords: ["I'd", "sandwich"],
  feedbackTh: "พูดเข้าใจได้ดี แต่ควรเติม I'd like เพื่อให้สุภาพและออกเสียง sandwich ให้ชัดขึ้น",
  retrySentence: "I'd like an iced latte and a sandwich, please.",
};

export const waveformBars = [28, 42, 66, 44, 82, 58, 74, 38, 62, 88, 50, 70, 46, 76, 54, 40];

export const roleplayScenarios = speakingScenarios.map((item, index) => ({
  ...item,
  level: ["A1", "A2", "B1", "B2"][index % 4],
  estimatedMinutes: 3 + (index % 5),
  turns: 6 + (index % 6),
  openingLine: index % 2 === 0 ? "Hello, how can I help you today?" : "Hi, what would you like to do?",
  successCriteria: ["ตอบเป็นประโยคเต็ม", "ใช้คำสุภาพ", "ถามกลับได้อย่างน้อย 1 คำถาม"],
}));

export const listeningPracticeItems = listeningItems.map((item, index) => ({
  ...item,
  accent: ["US", "UK", "Thai-friendly English", "Mandarin Standard"][index % 4],
  speedOptions: [0.75, 1, 1.25],
  transcriptVisible: index % 3 === 0,
  comprehensionQuestion: "What is the main purpose of this audio?",
  choices: ["Ask for help", "Order food", "Confirm information", "Describe a daily routine"],
  answer: ["Ask for help", "Order food", "Confirm information", "Describe a daily routine"][index % 4],
  dictationPrompt: "Write the sentence you hear, then compare with the transcript.",
}));

export function getSpeakingScenario(id: string) {
  return roleplayScenarios.find((item) => item.id === id) ?? null;
}

export function scoreSpeakingTranscript(target: string, transcript: string) {
  const targetWords = target.toLowerCase().replace(/[^a-z\u4e00-\u9fff\s]/gi, "").split(/\s+/).filter(Boolean);
  const spokenWords = transcript.toLowerCase().replace(/[^a-z\u4e00-\u9fff\s]/gi, "").split(/\s+/).filter(Boolean);
  const matched = targetWords.filter((word) => spokenWords.includes(word)).length;
  const accuracy = targetWords.length ? Math.round((matched / targetWords.length) * 100) : 0;
  const missingWords = targetWords.filter((word) => !spokenWords.includes(word));
  return {
    pronunciation: Math.max(45, accuracy - 4),
    fluency: Math.min(95, 60 + spokenWords.length * 3),
    confidence: Math.min(96, 70 + Math.max(0, spokenWords.length - missingWords.length) * 2),
    accuracy,
    missingWords,
    feedbackTh: missingWords.length ? `ควรฝึกคำว่า ${missingWords.slice(0, 4).join(", ")} เพิ่ม` : "พูดได้ใกล้เคียงประโยคต้นฉบับมาก",
  };
}

export function getListeningById(id: string) {
  return listeningPracticeItems.find((item) => item.id === id) ?? null;
}

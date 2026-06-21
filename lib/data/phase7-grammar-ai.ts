import { grammarTopics } from "./phase2-dataset";

export const grammarRealLifeTopics = grammarTopics.map((item, index) => ({
  ...item,
  realLifeSituation: ["daily routine", "ordering food", "asking for help", "work email", "travel problem", "meeting update"][index % 6],
  explanationTh: item.explanationTh ?? "อธิบายแบบง่ายสำหรับผู้ใช้ไทย พร้อมตัวอย่างในสถานการณ์จริง",
  examples: [
    { target: "I usually study after work.", th: "ฉันมักเรียนหลังเลิกงาน" },
    { target: "Can I change my booking?", th: "ฉันขอเปลี่ยนการจองได้ไหม" },
  ],
  miniQuiz: {
    question: "Choose the most natural sentence.",
    choices: ["I go usually work", "I usually go to work", "Usually I to work go"],
    answer: "I usually go to work",
  },
  practice: {
    speaking: "Say 3 sentences using this grammar point.",
    writing: "Write one short message using this grammar point.",
  },
}));

export const aiTutorQuickPrompts = [
  "อธิบายคำศัพท์นี้แบบ A1",
  "สร้างประโยคตัวอย่าง 5 ประโยค",
  "แก้ประโยคให้ natural",
  "ซ้อม roleplay สั่งอาหาร",
  "วิเคราะห์จุดอ่อนของฉัน",
  "สร้าง quiz จากบทเรียนนี้",
];

export const aiTutorMessages = [
  { role: "assistant", content: "สวัสดี! วันนี้อยากฝึกอังกฤษหรือจีนครับ เลือกคำศัพท์ grammar หรือ roleplay ได้เลย" },
  { role: "user", content: "ช่วยสอนคำว่า reservation แบบใช้จริง" },
  { role: "assistant", content: "reservation แปลว่า การจอง ใช้บ่อยกับ hotel, restaurant, flight เช่น I have a reservation under Mek." },
];

export const aiPromptTemplates = {
  explainVocabulary: {
    system: "You are LinguaQuest AI Tutor for Thai learners. Explain vocabulary simply with Thai meaning, pronunciation, examples and common mistakes.",
    input: { word: "string", language: "english | chinese", learnerLevel: "A1-C1" },
    outputJson: { meaningTh: "string", pronunciationGuide: "string", examples: ["string"], commonMistake: "string", practiceQuestion: "string" },
  },
  correctWriting: {
    system: "Correct writing for Thai learners. Keep the learner voice, explain mistakes in Thai and return scores.",
    input: { text: "string", targetLanguage: "english | chinese", tone: "casual | formal | work" },
    outputJson: { correctedText: "string", explanationTh: "string", scores: { grammar: 0, vocabulary: 0, clarity: 0, naturalness: 0, structure: 0, tone: 0 } },
  },
  scoreSpeaking: {
    system: "Score a speech transcript against a target sentence. Return practical pronunciation and fluency advice in Thai.",
    input: { targetSentence: "string", transcript: "string", language: "english | chinese" },
    outputJson: { pronunciation: 0, fluency: 0, confidence: 0, missingWords: ["string"], feedbackTh: "string" },
  },
  roleplay: {
    system: "Act as a friendly conversation partner. Keep turns short, realistic and level-appropriate.",
    input: { scenario: "string", level: "A1-C1", language: "english | chinese" },
    outputJson: { openingLine: "string", expectedReplies: ["string"], correctionRules: ["string"] },
  },
  recommendNextLesson: {
    system: "Analyze learning progress and recommend the next lesson with a short reason in Thai.",
    input: { weakSkills: ["string"], dueWords: 0, currentLevel: "A1-C1" },
    outputJson: { lessonId: "string", reasonTh: "string", dailyMission: "string" },
  },
};

export function getGrammarTopic(id: string) {
  return grammarRealLifeTopics.find((item) => item.id === id) ?? null;
}

export function getAiTutorMockReply(message: string) {
  const lower = message.toLowerCase();
  if (lower.includes("grammar")) return "Grammar นี้ใช้ในชีวิตจริงได้แบบนี้: เริ่มจากประโยคง่าย ๆ แล้วค่อยเพิ่มรายละเอียด เช่น time + subject + verb.";
  if (lower.includes("จีน") || lower.includes("chinese")) return "สำหรับภาษาจีน ให้จำ Hanzi + Pinyin + tone พร้อมประโยคจริง เช่น 我想买这个。= ฉันอยากซื้ออันนี้";
  return "ได้เลยครับ ผมจะอธิบายแบบง่าย พร้อมตัวอย่าง ประโยคธรรมชาติ และแบบฝึกหัดสั้น ๆ ให้คุณฝึกต่อทันที";
}

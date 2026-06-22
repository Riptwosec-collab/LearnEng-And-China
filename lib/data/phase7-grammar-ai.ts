import { grammarTopicSeeds } from "./phase2-dataset";

export const grammarRealLifeTopics = grammarTopicSeeds.map((item, index) => ({
  ...item,
  realLifeSituation: ["daily routine", "ordering food", "asking for help", "work email", "travel problem", "meeting update"][index % 6],
  explanationTh: item.explanationTh ?? "Simple explanation with real-life examples.",
  examples: item.examples?.length ? item.examples : [
    { target: "I usually study after work.", th: "I study after work." },
    { target: "Can I change my booking?", th: "Ask to change a booking." },
  ],
  miniQuiz: item.miniQuiz ?? {
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
  "Explain this word at A1 level",
  "Generate 5 example sentences",
  "Make my sentence more natural",
  "Start a food ordering roleplay",
  "Analyze my weak points",
  "Create a quiz from this lesson",
];

export const aiTutorMessages = [
  { role: "assistant", content: "Hi, choose English or Mandarin and tell me what you want to practice." },
  { role: "user", content: "Teach me reservation in real life." },
  { role: "assistant", content: "Reservation means a booking. Example: I have a reservation under Mek." },
];

export const aiPromptTemplates = {
  explainVocabulary: {
    system: "You are LinguaQuest AI Tutor for Thai learners. Explain vocabulary simply with meaning, pronunciation, examples and common mistakes.",
    input: { word: "string", language: "english | chinese", learnerLevel: "A1-C1" },
    outputJson: { meaningTh: "string", pronunciationGuide: "string", examples: ["string"], commonMistake: "string", practiceQuestion: "string" },
  },
  correctWriting: {
    system: "Correct writing for Thai learners. Keep the learner voice, explain mistakes and return scores.",
    input: { text: "string", targetLanguage: "english | chinese", tone: "casual | formal | work" },
    outputJson: { correctedText: "string", explanationTh: "string", scores: { grammar: 0, vocabulary: 0, clarity: 0, naturalness: 0, structure: 0, tone: 0 } },
  },
  scoreSpeaking: {
    system: "Score a speech transcript against a target sentence. Return practical advice.",
    input: { targetSentence: "string", transcript: "string", language: "english | chinese" },
    outputJson: { pronunciation: 0, fluency: 0, confidence: 0, missingWords: ["string"], feedbackTh: "string" },
  },
  roleplay: {
    system: "Act as a friendly conversation partner. Keep turns short, realistic and level-appropriate.",
    input: { scenario: "string", level: "A1-C1", language: "english | chinese" },
    outputJson: { openingLine: "string", expectedReplies: ["string"], correctionRules: ["string"] },
  },
  recommendNextLesson: {
    system: "Analyze learning progress and recommend the next lesson with a short reason.",
    input: { weakSkills: ["string"], dueWords: 0, currentLevel: "A1-C1" },
    outputJson: { lessonId: "string", reasonTh: "string", dailyMission: "string" },
  },
};

export function getGrammarTopic(id: string) {
  return grammarRealLifeTopics.find((item) => item.id === id) ?? null;
}

export function getAiTutorMockReply(message: string) {
  const lower = message.toLowerCase();
  if (lower.includes("grammar")) return "Use the grammar in a short real-life sentence first, then add detail.";
  if (lower.includes("chinese") || lower.includes("mandarin")) return "For Mandarin, learn Hanzi, Pinyin and tone together with one daily sentence.";
  return "I can explain, correct, quiz or roleplay. Tell me your level and goal.";
}

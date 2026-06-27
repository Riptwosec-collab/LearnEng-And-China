import type { CefrLevel, QuestionBankItem, Skill, TargetLanguage, TestDefinition, TestResult, TestSubmissionAnswer, TestType } from "@/types";

const createdAt = "2026-06-27T00:00:00.000Z";
const skillOrder: Skill[] = ["vocabulary", "grammar", "reading", "listening", "speaking", "writing", "pronunciation", "conversation"];
const cefrOrder: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1"];

export const questionBank: QuestionBankItem[] = [
  {
    id: "qb-en-a1-vocab-reservation",
    language: "english",
    level: "A1",
    skill: "vocabulary",
    category: "restaurant",
    type: "multiple_choice",
    question: "What does 'reservation' mean in a restaurant context?",
    choices: ["การจอง", "ใบเสร็จ", "เมนู", "ส่วนลด"],
    answer: "การจอง",
    explanationTh: "reservation แปลว่า การจอง เช่น จองโต๊ะ จองห้องพัก หรือจองตั๋ว",
    difficulty: "easy",
    tags: ["restaurant", "daily-life", "booking"],
    sourceLessonId: "daily-life-english-restaurant-1",
    isPublished: true,
    createdAt
  },
  {
    id: "qb-en-a1-grammar-be-verb",
    language: "english",
    level: "A1",
    skill: "grammar",
    category: "daily-life",
    type: "fill_blank",
    question: "Fill in the blank: She ___ a student.",
    answer: "is",
    explanationTh: "ประธาน She ใช้ be verb เป็น is: She is a student.",
    difficulty: "easy",
    tags: ["be-verb", "a1", "thai-learner-mistake"],
    sourceLessonId: "daily-life-english-intro-1",
    isPublished: true,
    createdAt
  },
  {
    id: "qb-en-a2-reading-airport",
    language: "english",
    level: "A2",
    skill: "reading",
    category: "airport",
    type: "multiple_choice",
    question: "Read: 'The gate has changed from B4 to C2. Boarding starts at 18:20.' Where should the passenger go?",
    choices: ["Gate B4", "Gate C2", "Check-in counter", "Baggage claim"],
    answer: "Gate C2",
    explanationTh: "ข้อความบอกว่า gate changed from B4 to C2 แปลว่าต้องไปประตู C2",
    difficulty: "medium",
    tags: ["airport", "travel-problem", "reading-detail"],
    sourceLessonId: "travel-english-airport-1",
    isPublished: true,
    createdAt
  },
  {
    id: "qb-en-b1-writing-ticket-update",
    language: "english",
    level: "B1",
    skill: "writing",
    category: "it-support",
    type: "writing",
    question: "Write a short ticket update telling the user that the technical issue is being checked by the support team.",
    answer: "We are checking the issue with the support team and will update you as soon as possible.",
    explanationTh: "Ticket update ที่ดีควรสั้น ชัด สุภาพ และบอกสถานะปัจจุบัน",
    difficulty: "medium",
    tags: ["it-support", "ticket-update", "work-english"],
    sourceLessonId: "it-support-english-update-1",
    isPublished: true,
    createdAt
  },
  {
    id: "qb-en-b1-grammar-present-perfect",
    language: "english",
    level: "B1",
    skill: "grammar",
    category: "work",
    type: "multiple_choice",
    question: "Choose the best sentence for an unfinished task.",
    choices: ["I checked it yesterday.", "I have checked it and I am still monitoring it.", "I check it tomorrow.", "I checking it now."],
    answer: "I have checked it and I am still monitoring it.",
    explanationTh: "present perfect ใช้เชื่อมอดีตกับปัจจุบัน เช่น ตรวจแล้วและยังติดตามต่อ",
    difficulty: "medium",
    tags: ["present-perfect", "work-update", "thai-learner-mistake"],
    sourceLessonId: "work-english-status-update-1",
    isPublished: true,
    createdAt
  },
  {
    id: "qb-zh-a1-vocab-nihao",
    language: "chinese",
    level: "A1",
    skill: "vocabulary",
    category: "daily-life",
    type: "multiple_choice",
    question: "你好 means what in Thai?",
    choices: ["สวัสดี", "ขอบคุณ", "ขอโทษ", "ลาก่อน"],
    answer: "สวัสดี",
    explanationTh: "你好 (nǐ hǎo) แปลว่า สวัสดี ใช้ทักทายทั่วไป",
    difficulty: "easy",
    tags: ["chinese", "greeting", "hsk1"],
    sourceLessonId: "daily-life-chinese-greeting-1",
    isPublished: true,
    createdAt
  }
];

export const testDefinitions: TestDefinition[] = [
  {
    id: "placement-english-core",
    title: "English Placement Test",
    descriptionTh: "วัดระดับเริ่มต้น A1-C1 ด้วย Vocabulary, Grammar, Reading, Speaking และ Writing พร้อมคำแนะนำภาษาไทย",
    language: "english",
    type: "placement",
    estimatedMinutes: 20,
    xpReward: 80,
    sections: [
      { id: "vocab", title: "Vocabulary", skill: "vocabulary", questionCount: 1, instructionsTh: "เลือกคำตอบที่ถูกที่สุด" },
      { id: "grammar", title: "Grammar", skill: "grammar", questionCount: 2, instructionsTh: "ตอบ grammar ที่เหมาะกับบริบท" },
      { id: "reading", title: "Reading", skill: "reading", questionCount: 1, instructionsTh: "อ่านสถานการณ์สั้นแล้วตอบ" },
      { id: "writing", title: "Writing", skill: "writing", questionCount: 1, instructionsTh: "เขียนคำตอบสั้นตามโจทย์" }
    ],
    questionIds: ["qb-en-a1-vocab-reservation", "qb-en-a1-grammar-be-verb", "qb-en-b1-grammar-present-perfect", "qb-en-a2-reading-airport", "qb-en-b1-writing-ticket-update"],
    tags: ["placement", "english", "cefr"],
    isPublished: true
  },
  {
    id: "daily-challenge-english-work",
    title: "Daily Challenge: Work English",
    descriptionTh: "โจทย์สั้นประจำวันสำหรับภาษาอังกฤษในงานจริง ได้ XP และเก็บจุดอ่อนไปทบทวน",
    language: "english",
    type: "daily_challenge",
    level: "B1",
    estimatedMinutes: 8,
    xpReward: 20,
    sections: [
      { id: "grammar", title: "Mini Grammar", skill: "grammar", questionCount: 1, instructionsTh: "ทบทวน pattern ที่ใช้รายงานสถานะ" },
      { id: "writing", title: "Mini Writing", skill: "writing", questionCount: 1, instructionsTh: "เขียน update ให้สั้นและสุภาพ" }
    ],
    questionIds: ["qb-en-b1-grammar-present-perfect", "qb-en-b1-writing-ticket-update"],
    tags: ["daily-challenge", "work-english", "xp"],
    isPublished: true
  },
  {
    id: "placement-chinese-safe",
    title: "Chinese Placement Test Starter",
    descriptionTh: "ชุดทดสอบภาษาจีนแบบ starter เพื่อรักษา flow จีนเดิมและต่อยอดใน Phase ถัดไป",
    language: "chinese",
    type: "placement",
    estimatedMinutes: 8,
    xpReward: 40,
    sections: [{ id: "vocab", title: "HSK Starter Vocabulary", skill: "vocabulary", questionCount: 1, instructionsTh: "เลือกความหมายไทยของคำจีน" }],
    questionIds: ["qb-zh-a1-vocab-nihao"],
    tags: ["chinese", "placement", "safe-existing-language"],
    isPublished: true
  }
];

export function getTests(filters: { language?: TargetLanguage; type?: TestType; level?: CefrLevel } = {}) {
  return testDefinitions.filter((test) => {
    if (!test.isPublished) return false;
    if (filters.language && test.language !== filters.language) return false;
    if (filters.type && test.type !== filters.type) return false;
    if (filters.level && test.level && test.level !== filters.level) return false;
    return true;
  });
}

export function getTestById(testId: string) {
  return testDefinitions.find((test) => test.id === testId && test.isPublished) ?? null;
}

export function getQuestionById(questionId: string) {
  return questionBank.find((question) => question.id === questionId && question.isPublished !== false) ?? null;
}

export function getQuestionsForTest(testId: string) {
  const test = getTestById(testId);
  if (!test) return [];
  return test.questionIds.map(getQuestionById).filter((question): question is QuestionBankItem => Boolean(question));
}

function normalizeAnswer(answer: string | string[]) {
  const text = Array.isArray(answer) ? answer.join(" ") : answer;
  return text.toLowerCase().replace(/[.,!?]/g, "").replace(/\s+/g, " ").trim();
}

function isAnswerCorrect(expected: string | string[], actual: string | string[]) {
  const expectedText = normalizeAnswer(expected);
  const actualText = normalizeAnswer(actual);
  if (!actualText) return false;
  if (expectedText === actualText) return true;
  if (expectedText.length >= 24 && actualText.length >= 12) return expectedText.includes(actualText) || actualText.includes(expectedText.slice(0, 24));
  return false;
}

function emptySkillScores() {
  return skillOrder.reduce<Record<Skill, number>>((acc, skill) => {
    acc[skill] = 0;
    return acc;
  }, {} as Record<Skill, number>);
}

export function recommendCefrLevel(percent: number): CefrLevel {
  if (percent >= 86) return "C1";
  if (percent >= 72) return "B2";
  if (percent >= 56) return "B1";
  if (percent >= 36) return "A2";
  return "A1";
}

export function scoreTestSubmission(input: { testId: string; answers: TestSubmissionAnswer[]; now?: Date }): TestResult {
  const test = getTestById(input.testId);
  const questions = getQuestionsForTest(input.testId);
  const answerMap = new Map(input.answers.map((answer) => [answer.questionId, answer.answer]));

  if (!test) throw new Error(`Test not found: ${input.testId}`);

  const results = questions.map((question) => {
    const userAnswer = answerMap.get(question.id) ?? "";
    return {
      questionId: question.id,
      isCorrect: isAnswerCorrect(question.answer, userAnswer),
      expectedAnswer: question.answer,
      userAnswer,
      explanationTh: question.explanationTh,
      skill: question.skill,
      tags: question.tags
    };
  });

  const total = results.length;
  const score = results.filter((item) => item.isCorrect).length;
  const percent = total ? Math.round((score / total) * 100) : 0;
  const skillScores = emptySkillScores();

  for (const skill of skillOrder) {
    const skillResults = results.filter((item) => item.skill === skill);
    skillScores[skill] = skillResults.length ? Math.round((skillResults.filter((item) => item.isCorrect).length / skillResults.length) * 100) : 0;
  }

  const weaknessTags = Array.from(new Set(results.filter((item) => !item.isCorrect).flatMap((item) => item.tags))).slice(0, 8);
  const recommendedLevel = test.type === "placement" ? recommendCefrLevel(percent) : test.level;

  return {
    id: `result-${test.id}-${input.now?.getTime() ?? Date.now()}`,
    testId: test.id,
    score,
    total,
    percent,
    passed: percent >= 70,
    recommendedLevel,
    skillScores,
    weaknessTags,
    recommendedReview: results.filter((item) => !item.isCorrect).map((item) => item.questionId),
    studyPlanTh: buildStudyPlanTh(recommendedLevel ?? "A1", weaknessTags, test.language),
    results,
    createdAt: (input.now ?? new Date()).toISOString()
  };
}

export function buildStudyPlanTh(level: CefrLevel, weaknessTags: string[], language: TargetLanguage) {
  const languageLabel = language === "english" ? "อังกฤษ" : "จีน";
  const levelIndex = cefrOrder.indexOf(level);
  const nextLevel = cefrOrder[Math.min(levelIndex + 1, cefrOrder.length - 1)];
  const weakPoint = weaknessTags[0] ?? "คำศัพท์และ grammar พื้นฐาน";

  return [
    `วันแรก: ทบทวน${languageLabel}ระดับ ${level} โดยเริ่มจาก ${weakPoint}`,
    "วันที่ 2-3: ทำ Lesson Quiz แล้วกดดูคำอธิบายภาษาไทยทุกข้อที่ผิด",
    "วันที่ 4-5: ฝึก Listening + Speaking แบบสั้น พร้อมบันทึกคำที่ออกเสียงผิด",
    "วันที่ 6: ทำ Review Test จากข้อผิดพลาด และเก็บเข้าคิว SRS",
    `วันที่ 7: ลอง Mock Test ระดับ ${nextLevel} เพื่อเช็กความพร้อมขั้นถัดไป`
  ];
}

export function getTestCenterSummary() {
  const publishedTests = getTests();
  return {
    totalTests: publishedTests.length,
    englishQuestions: questionBank.filter((question) => question.language === "english" && question.isPublished !== false).length,
    chineseQuestions: questionBank.filter((question) => question.language === "chinese" && question.isPublished !== false).length,
    testTypes: Array.from(new Set(publishedTests.map((test) => test.type))),
    skillsCovered: skillOrder.filter((skill) => questionBank.some((question) => question.skill === skill))
  };
}

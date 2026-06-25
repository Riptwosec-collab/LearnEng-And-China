import { categorySeeds, learningPathSeeds, vocabularySeeds } from "./phase2-dataset";

export const adminSummary = {
  vocabularyTotal: vocabularySeeds.length,
  categoryTotal: categorySeeds.length,
  learningPathTotal: learningPathSeeds.length,
  pendingImports: 3,
  draftLessons: 12,
  publishedLessons: 30,
  lastImport: "2026-06-22"
};

export const adminModules = [
  { id: "vocabulary", title: "Vocabulary CMS", href: "/admin/vocabulary", description: "Edit words, examples, quiz fields and review metadata." },
  { id: "lessons", title: "Lesson CMS", href: "/admin/lessons", description: "Manage lessons, steps, exercises and daily missions." },
  { id: "import", title: "Import Center", href: "/admin/import", description: "Preview CSV or JSON rows before saving to database." },
  { id: "system", title: "Production Console", href: "/admin/system", description: "Check environment, security, PWA and launch readiness." }
] as const;

export const vocabularyDrafts = vocabularySeeds.slice(0, 12).map((word, index) => ({
  ...word,
  cmsStatus: index < 7 ? "published" : index < 10 ? "review" : "draft",
  reviewerNote: index % 2 === 0 ? "Ready for publish." : "Needs example check."
}));

export const lessonDrafts = learningPathSeeds.slice(0, 10).map((path, index) => ({
  id: `lesson-draft-${index + 1}`,
  pathId: path.id,
  title: `${path.title} practical lesson ${index + 1}`,
  level: path.level,
  status: index < 5 ? "published" : index < 8 ? "review" : "draft",
  steps: 9,
  exercises: 4,
  quizQuestions: 6
}));

export const importPreviewRows = [
  { row: 1, language: "english", word: "appointment", thai_meaning: "การนัดหมาย", cefr_level: "A2", category: "hospital", status: "valid" },
  { row: 2, language: "chinese", word: "机场", pinyin: "ji chang", thai_meaning: "สนามบิน", cefr_level: "A2", hsk_level: 2, category: "airport", status: "valid" },
  { row: 3, language: "english", word: "receipt", thai_meaning: "ใบเสร็จ", cefr_level: "A1", category: "shopping", status: "valid" }
];

export function summarizeImportRows(rows: Array<Record<string, unknown>>) {
  return {
    totalRows: rows.length,
    validRows: rows.filter((row) => row.word || row.chinese_hanzi).length,
    missingMeaningRows: rows.filter((row) => !row.thai_meaning).length
  };
}

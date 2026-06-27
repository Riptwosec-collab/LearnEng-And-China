export type TargetLanguage = "english" | "chinese";
export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1";
export type Skill = "vocabulary" | "speaking" | "listening" | "reading" | "writing" | "grammar" | "pronunciation" | "conversation";
export type WordProgressStatus = "new" | "learning" | "remembered" | "review" | "difficult" | "mastered";
export type PartOfSpeech = "noun" | "verb" | "adjective" | "adverb" | "phrase" | "preposition" | "conjunction" | "pronoun" | "interjection";

export type QuestionType = "multiple_choice" | "fill_blank" | "dictation" | "speaking" | "writing" | "matching" | "ordering" | "translation";
export type TestType = "placement" | "lesson_quiz" | "unit_test" | "skill_test" | "cefr_mock" | "daily_challenge" | "review_test" | "weakness_test";
export type DifficultyBand = "easy" | "medium" | "hard";

export interface Category {
  id: string;
  slug?: string;
  nameTh: string;
  nameEn: string;
  icon: string;
  description: string;
  order?: number;
  isDailyLife?: boolean;
  parentId?: string | null;
}

export interface VocabularyItem {
  id: string;
  language: TargetLanguage;
  languageId?: string;
  word: string;
  chineseHanzi?: string;
  pinyin?: string;
  ipa?: string;
  thaiPronunciation: string;
  thaiMeaning: string;
  partOfSpeech: PartOfSpeech;
  cefrLevel: CefrLevel;
  hskLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  category: string;
  categoryId?: string;
  subcategory?: string;
  exampleSentence: string;
  exampleTranslationTh: string;
  dailyLifeSentence: string;
  formalSentence?: string;
  casualSentence?: string;
  synonym?: string;
  antonym?: string;
  collocation?: string;
  commonMistake?: string;
  miniQuizQuestion?: string;
  miniQuizChoices?: string[];
  miniQuizAnswer?: string;
  ttsText?: string;
  audioUrl?: string;
  difficultyScore: number;
  frequencyScore: number;
  tags: string[];
  source?: string;
  isPublished?: boolean;
  progressStatus?: WordProgressStatus;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  language: TargetLanguage | "mixed";
  level: CefrLevel;
  lessonCount: number;
  estimatedTime: string;
  skillFocus: Skill[];
  progress: number;
  isLocked: boolean;
  recommendedNextLesson: string;
  order?: number;
  isPublished?: boolean;
}

export interface DashboardStat {
  label: string;
  value: string;
  helper: string;
  trend: string;
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  xp: number;
  skill: Skill;
  isDone: boolean;
}

export interface QuestionBankItem {
  id: string;
  language: TargetLanguage;
  level: CefrLevel;
  skill: Skill;
  category: string;
  type: QuestionType;
  question: string;
  choices?: string[];
  answer: string | string[];
  explanationTh: string;
  difficulty: DifficultyBand;
  tags: string[];
  sourceLessonId?: string;
  isPublished?: boolean;
  createdAt: string;
}

export interface TestSection {
  id: string;
  title: string;
  skill: Skill;
  questionCount: number;
  instructionsTh: string;
}

export interface TestDefinition {
  id: string;
  title: string;
  descriptionTh: string;
  language: TargetLanguage;
  type: TestType;
  level?: CefrLevel;
  estimatedMinutes: number;
  xpReward: number;
  sections: TestSection[];
  questionIds: string[];
  tags: string[];
  isPublished: boolean;
}

export interface TestSubmissionAnswer {
  questionId: string;
  answer: string | string[];
}

export interface ScoredQuestionResult {
  questionId: string;
  isCorrect: boolean;
  expectedAnswer: string | string[];
  userAnswer: string | string[];
  explanationTh: string;
  skill: Skill;
  tags: string[];
}

export interface TestResult {
  id: string;
  testId: string;
  score: number;
  total: number;
  percent: number;
  passed: boolean;
  recommendedLevel?: CefrLevel;
  skillScores: Record<Skill, number>;
  weaknessTags: string[];
  recommendedReview: string[];
  studyPlanTh: string[];
  results: ScoredQuestionResult[];
  createdAt: string;
}

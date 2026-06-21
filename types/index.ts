export type TargetLanguage = "english" | "chinese";
export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1";
export type Skill = "vocabulary" | "speaking" | "listening" | "reading" | "writing" | "grammar";
export type WordProgressStatus = "new" | "learning" | "remembered" | "review" | "difficult" | "mastered";

export interface Category {
  id: string;
  nameTh: string;
  nameEn: string;
  icon: string;
  description: string;
}

export interface VocabularyItem {
  id: string;
  language: TargetLanguage;
  word: string;
  chineseHanzi?: string;
  pinyin?: string;
  ipa?: string;
  thaiPronunciation: string;
  thaiMeaning: string;
  partOfSpeech: "noun" | "verb" | "adjective" | "adverb" | "phrase";
  cefrLevel: CefrLevel;
  hskLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  category: string;
  exampleSentence: string;
  exampleTranslationTh: string;
  dailyLifeSentence: string;
  difficultyScore: number;
  frequencyScore: number;
  tags: string[];
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

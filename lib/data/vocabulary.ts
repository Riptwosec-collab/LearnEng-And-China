import type { VocabularyItem } from "@/types";
import enData from "./vocabulary-en-5000.json";
import zhData from "./vocabulary-zh-5000.json";

import { chineseVocabulary100, englishVocabulary100, vocabularySeeds } from "./phase2-dataset";

export const englishVocabulary5000: VocabularyItem[] = enData as VocabularyItem[];
export const chineseVocabulary5000: VocabularyItem[] = zhData as VocabularyItem[];
export const vocabularySamples: VocabularyItem[] = [
  ...englishVocabulary5000,
  ...chineseVocabulary5000
];

export { chineseVocabulary100, englishVocabulary100, vocabularySeeds };

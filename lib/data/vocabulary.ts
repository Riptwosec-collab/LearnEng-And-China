import type { VocabularyItem } from "@/types";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const enData = require("./vocabulary-en-5000.json") as VocabularyItem[];
// eslint-disable-next-line @typescript-eslint/no-require-imports
const zhData = require("./vocabulary-zh-5000.json") as VocabularyItem[];

import { chineseVocabulary100, englishVocabulary100, vocabularySeeds } from "./phase2-dataset";

export const englishVocabulary5000: VocabularyItem[] = enData;
export const chineseVocabulary5000: VocabularyItem[] = zhData;
export const vocabularySamples: VocabularyItem[] = [...enData, ...zhData];

export { chineseVocabulary100, englishVocabulary100, vocabularySeeds };

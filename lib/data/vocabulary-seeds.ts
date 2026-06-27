import { vocabularySeeds as baseVocabularySeeds } from "./phase2-dataset";
import { englishVocabulary600, englishVocabulary600Summary } from "./vocabulary-english-600-pack";
import { chineseVocabulary600, chineseVocabulary600Summary } from "./vocabulary-chinese-600-pack";
import type { VocabularyItem } from "@/types";

function dedupeVocabulary(rows: VocabularyItem[]) {
  const seen = new Set<string>();
  return rows.filter((row) => {
    const key = `${row.language}:${row.word}:${row.categoryId ?? row.category}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export const generatedVocabulary1200 = [...englishVocabulary600, ...chineseVocabulary600];
export const vocabularySeeds = dedupeVocabulary([...baseVocabularySeeds, ...generatedVocabulary1200]);

export const generatedVocabularySummary = {
  totalGenerated: generatedVocabulary1200.length,
  english: englishVocabulary600Summary,
  chinese: chineseVocabulary600Summary,
  allVocabularyCount: vocabularySeeds.length,
  latestSources: ["generated_english_600", "generated_chinese_600"]
};

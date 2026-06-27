import { categorySeeds } from "../lib/data/phase2-dataset";
import { englishVocabulary600 } from "../lib/data/vocabulary-english-600-pack";
import { chineseVocabulary600 } from "../lib/data/vocabulary-chinese-600-pack";
import type { VocabularyItem } from "../types";

const validCefr = new Set(["A1", "A2", "B1", "B2", "C1"]);
const validHsk = new Set([1, 2, 3, 4, 5]);
const validCategories = new Set(categorySeeds.map((category) => category.id));

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

function countBy<T extends string | number | undefined>(rows: VocabularyItem[], selector: (row: VocabularyItem) => T) {
  return rows.reduce<Record<string, number>>((acc, row) => {
    const key = String(selector(row));
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
}

function validateRequiredFields(rows: VocabularyItem[]) {
  const idSet = new Set<string>();
  const uniqueWordSet = new Set<string>();

  for (const row of rows) {
    assert(!idSet.has(row.id), `Duplicate id: ${row.id}`);
    idSet.add(row.id);

    const uniqueKey = `${row.language}:${row.word}:${row.categoryId ?? row.category}`;
    assert(!uniqueWordSet.has(uniqueKey), `Duplicate language+word+categoryId: ${uniqueKey}`);
    uniqueWordSet.add(uniqueKey);

    assert(validCategories.has(row.categoryId ?? row.category), `Invalid categoryId: ${row.id} ${row.categoryId ?? row.category}`);
    assert(validCefr.has(row.cefrLevel), `Invalid CEFR: ${row.id} ${row.cefrLevel}`);
    assert(Boolean(row.word), `Missing word: ${row.id}`);
    assert(Boolean(row.thaiPronunciation), `Missing thaiPronunciation: ${row.id}`);
    assert(Boolean(row.thaiMeaning), `Missing thaiMeaning: ${row.id}`);
    assert(Boolean(row.partOfSpeech), `Missing partOfSpeech: ${row.id}`);
    assert(Boolean(row.exampleSentence), `Missing exampleSentence: ${row.id}`);
    assert(Boolean(row.exampleTranslationTh), `Missing exampleTranslationTh: ${row.id}`);
    assert(Boolean(row.dailyLifeSentence), `Missing dailyLifeSentence: ${row.id}`);
    assert(Boolean(row.collocation), `Missing collocation: ${row.id}`);
    assert(Boolean(row.commonMistake), `Missing commonMistake: ${row.id}`);
    assert(Boolean(row.miniQuizQuestion), `Missing miniQuizQuestion: ${row.id}`);
    assert(Array.isArray(row.miniQuizChoices) && row.miniQuizChoices.length >= 4, `Invalid miniQuizChoices: ${row.id}`);
    assert(Boolean(row.miniQuizAnswer), `Missing miniQuizAnswer: ${row.id}`);
    assert(Array.isArray(row.tags) && row.tags.length >= 3, `Invalid tags: ${row.id}`);
    assert(Boolean(row.source), `Missing source: ${row.id}`);
  }
}

function validateEnglish() {
  assert(englishVocabulary600.length === 600, `English generated pack must be 600, got ${englishVocabulary600.length}`);
  validateRequiredFields(englishVocabulary600);

  const levelCounts = countBy(englishVocabulary600, (row) => row.cefrLevel);
  assert(levelCounts.A1 === 150, `English A1 must be 150, got ${levelCounts.A1}`);
  assert(levelCounts.A2 === 150, `English A2 must be 150, got ${levelCounts.A2}`);
  assert(levelCounts.B1 === 120, `English B1 must be 120, got ${levelCounts.B1}`);
  assert(levelCounts.B2 === 100, `English B2 must be 100, got ${levelCounts.B2}`);
  assert(levelCounts.C1 === 80, `English C1 must be 80, got ${levelCounts.C1}`);

  for (const row of englishVocabulary600) {
    assert(row.language === "english", `English pack contains non-English row: ${row.id}`);
    assert(Boolean(row.ipa), `English row missing IPA: ${row.id}`);
    assert(row.hskLevel === undefined, `English row must not have HSK: ${row.id}`);
  }

  const itNetworkCount = englishVocabulary600.filter((row) => row.tags.includes("it-support") || row.tags.includes("network-engineer")).length;
  const businessCount = englishVocabulary600.filter((row) => row.tags.includes("business-english") || row.tags.includes("work-english")).length;
  const travelCount = englishVocabulary600.filter((row) => row.tags.includes("travel-english")).length;
  const dailyLifeCount = englishVocabulary600.filter((row) => !row.tags.includes("business-english") && !row.tags.includes("network-engineer")).length;

  assert(itNetworkCount >= 50, `IT / Network English must be at least 50, got ${itNetworkCount}`);
  assert(businessCount >= 50, `Business / Work English must be at least 50, got ${businessCount}`);
  assert(travelCount >= 50, `Travel English must be at least 50, got ${travelCount}`);
  assert(dailyLifeCount >= 200, `Daily Life English must be at least 200, got ${dailyLifeCount}`);

  return { levelCounts, itNetworkCount, businessCount, travelCount, dailyLifeCount };
}

function validateChinese() {
  assert(chineseVocabulary600.length === 600, `Chinese generated pack must be 600, got ${chineseVocabulary600.length}`);
  validateRequiredFields(chineseVocabulary600);

  const hskCounts = countBy(chineseVocabulary600, (row) => row.hskLevel);
  assert(hskCounts[1] === 150, `Chinese HSK1 must be 150, got ${hskCounts[1]}`);
  assert(hskCounts[2] === 150, `Chinese HSK2 must be 150, got ${hskCounts[2]}`);
  assert(hskCounts[3] === 120, `Chinese HSK3 must be 120, got ${hskCounts[3]}`);
  assert(hskCounts[4] === 100, `Chinese HSK4 must be 100, got ${hskCounts[4]}`);
  assert(hskCounts[5] === 80, `Chinese HSK5 must be 80, got ${hskCounts[5]}`);

  for (const row of chineseVocabulary600) {
    assert(row.language === "chinese", `Chinese pack contains non-Chinese row: ${row.id}`);
    assert(Boolean(row.chineseHanzi), `Chinese row missing Hanzi: ${row.id}`);
    assert(Boolean(row.pinyin), `Chinese row missing pinyin: ${row.id}`);
    assert(validHsk.has(row.hskLevel), `Chinese row has invalid HSK: ${row.id}`);
    assert(row.cefrLevel === (row.hskLevel === 1 ? "A1" : row.hskLevel === 2 ? "A2" : row.hskLevel === 3 ? "B1" : row.hskLevel === 4 ? "B2" : "C1"), `Chinese row has invalid CEFR/HSK mapping: ${row.id}`);
  }

  return { hskCounts };
}

function main() {
  const english = validateEnglish();
  const chinese = validateChinese();
  const total = englishVocabulary600.length + chineseVocabulary600.length;
  assert(total === 1200, `Total generated vocabulary must be 1200, got ${total}`);

  console.log("Vocabulary 600 validation passed");
  console.log(JSON.stringify({ english, chinese, total }, null, 2));
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}

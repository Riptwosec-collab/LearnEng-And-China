/**
 * validate-vocabulary-600.ts
 * Validates the seed vocabulary rows (English + Chinese) before build.
 *
 * Key fix: row.hskLevel is `number | undefined` (Int? in Prisma schema /
 * undefined on English rows), so we guard with `!= null` before Set.has().
 */

import { vocabularySeeds } from "../lib/data/phase2-dataset";

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(`Validation failed: ${message}`);
}

const validLanguages = new Set(["english", "chinese"]);
const validCefr     = new Set(["A1", "A2", "B1", "B2", "C1"]);
const validPos      = new Set([
  "noun", "verb", "adjective", "adverb", "phrase",
  "preposition", "conjunction", "pronoun", "interjection",
]);
const validHsk = new Set([1, 2, 3, 4, 5, 6]);

function validateRow(row: (typeof vocabularySeeds)[number], index: number) {
  assert(validLanguages.has(row.language),       `Row ${index} (${row.id}) invalid language: ${row.language}`);
  assert(Boolean(row.id),                         `Row ${index} missing id`);
  assert(Boolean(row.word),                       `Row ${index} (${row.id}) missing word`);
  assert(Boolean(row.thaiMeaning),                `Row ${index} (${row.id}) missing thaiMeaning`);
  assert(Boolean(row.thaiPronunciation),          `Row ${index} (${row.id}) missing thaiPronunciation`);
  assert(validCefr.has(row.cefrLevel),            `Row ${index} (${row.id}) invalid cefrLevel: ${row.cefrLevel}`);
  assert(validPos.has(row.partOfSpeech),          `Row ${index} (${row.id}) invalid partOfSpeech: ${row.partOfSpeech}`);
  assert(Boolean(row.exampleSentence),            `Row ${index} (${row.id}) missing exampleSentence`);
  assert(Boolean(row.exampleTranslationTh),       `Row ${index} (${row.id}) missing exampleTranslationTh`);
  assert(Boolean(row.dailyLifeSentence),          `Row ${index} (${row.id}) missing dailyLifeSentence`);

  if (row.language === "chinese") {
    assert(Boolean(row.chineseHanzi), `Chinese row missing Hanzi: ${row.id}`);
    assert(Boolean(row.pinyin),       `Chinese row missing pinyin: ${row.id}`);
    // hskLevel is `number | undefined`; guard before Set.has() (fixes TS2345).
    assert(
      row.hskLevel != null && validHsk.has(row.hskLevel),
      `Chinese row has invalid HSK: ${row.id} (got ${String(row.hskLevel)})`,
    );
  }
}

function main() {
  const rows = vocabularySeeds;
  let errors = 0;

  for (let i = 0; i < rows.length; i++) {
    try {
      validateRow(rows[i], i);
    } catch (err) {
      console.error((err as Error).message);
      errors++;
    }
  }

  const english = rows.filter((r) => r.language === "english").length;
  const chinese = rows.filter((r) => r.language === "chinese").length;
  console.log(`Validated ${rows.length} rows  (${english} EN + ${chinese} ZH)`);

  if (errors > 0) {
    console.error(`${errors} validation error(s). Fix seed data before build.`);
    process.exit(1);
  }

  console.log("All vocabulary rows valid");
}

main();

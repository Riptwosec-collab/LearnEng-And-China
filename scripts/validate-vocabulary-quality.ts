import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { VocabularyItem } from "../types";

function readVocabulary(fileName: string): VocabularyItem[] {
  const filePath = join(process.cwd(), "lib", "data", fileName);
  return JSON.parse(readFileSync(filePath, "utf8")) as VocabularyItem[];
}

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function hasHanDigitSuffix(value: unknown) {
  return typeof value === "string" && /\p{Script=Han}\d+$/u.test(value);
}

function validateRows(rows: VocabularyItem[]) {
  const uniqueKeys = new Set<string>();

  rows.forEach((row, index) => {
    assert(Boolean(row.id), `Row ${index} is missing id`);
    assert(Boolean(row.word), `Row ${row.id} is missing word`);
    assert(Boolean(row.thaiMeaning), `Row ${row.id} is missing thaiMeaning`);
    assert(Boolean(row.categoryId), `Row ${row.id} is missing categoryId`);

    const uniqueKey = `${row.language}|${row.word}|${row.categoryId}`;
    assert(!uniqueKeys.has(uniqueKey), `Duplicate vocabulary key: ${uniqueKey}`);
    uniqueKeys.add(uniqueKey);

    if (row.language === "chinese") {
      assert(Boolean(row.chineseHanzi), `Chinese row ${row.id} is missing chineseHanzi`);
      assert(Boolean(row.pinyin), `Chinese row ${row.id} is missing pinyin`);
      assert(!hasHanDigitSuffix(row.word), `Chinese row ${row.id} has numeric Han suffix in word`);
      assert(
        !hasHanDigitSuffix(row.chineseHanzi),
        `Chinese row ${row.id} has numeric Han suffix in chineseHanzi`
      );
      assert(!hasHanDigitSuffix(row.ttsText), `Chinese row ${row.id} has numeric Han suffix in ttsText`);
    }

    if (row.miniQuizChoices && row.miniQuizChoices.length > 0) {
      assert(
        new Set(row.miniQuizChoices).size === row.miniQuizChoices.length,
        `Row ${row.id} has duplicate miniQuizChoices`
      );
    }
  });
}

function main() {
  const rows = [
    ...readVocabulary("vocabulary-en-5000.json"),
    ...readVocabulary("vocabulary-zh-5000.json")
  ];

  validateRows(rows);
  console.log(`Validated vocabulary quality for ${rows.length} rows`);
}

main();

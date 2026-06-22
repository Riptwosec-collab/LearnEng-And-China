import { prisma } from "../lib/db/prisma";
import { generateExpandedVocabulary } from "../lib/data/phase18-vocabulary-expansion";

async function main() {
  const target = Number(process.env.EXPANDED_VOCAB_PER_LANGUAGE ?? 500);
  const rows = generateExpandedVocabulary(target);
  const categories = await prisma.category.findMany({ select: { id: true, slug: true } });
  const languages = await prisma.language.findMany({ select: { id: true, code: true } });
  const categoryBySlug = new Map(categories.map((item) => [item.slug, item.id]));
  const languageByCode = new Map(languages.map((item) => [item.code, item.id]));

  let upserted = 0;
  for (const row of rows) {
    const languageId = languageByCode.get(row.language);
    const categoryId = categoryBySlug.get(row.categorySlug) ?? categories[0]?.id;
    if (!languageId || !categoryId) continue;

    await prisma.vocabulary.upsert({
      where: { language_word_categoryId: { language: row.language, word: row.word, categoryId } },
      update: {
        thaiMeaning: row.thaiMeaning,
        exampleSentence: row.exampleSentence,
        exampleTranslationTh: row.exampleTranslationTh,
        tags: row.tags,
        source: "phase18_expansion"
      },
      create: {
        id: row.id,
        language: row.language,
        languageId,
        word: row.word,
        chineseHanzi: row.chineseHanzi,
        pinyin: row.pinyin,
        ipa: row.language === "english" ? "/demo/" : undefined,
        thaiPronunciation: row.thaiPronunciation,
        thaiMeaning: row.thaiMeaning,
        partOfSpeech: row.partOfSpeech,
        cefrLevel: row.cefrLevel,
        hskLevel: row.language === "chinese" ? 1 + (upserted % 6) : undefined,
        categoryId,
        exampleSentence: row.exampleSentence,
        exampleTranslationTh: row.exampleTranslationTh,
        dailyLifeSentence: row.exampleSentence,
        formalSentence: row.exampleSentence,
        casualSentence: row.exampleSentence,
        miniQuizQuestion: `What does ${row.word} mean?`,
        miniQuizChoices: [row.thaiMeaning, "ไม่ใช่คำตอบนี้", "คำตอบอื่น", "ยังไม่แน่ใจ"],
        miniQuizAnswer: row.thaiMeaning,
        ttsText: row.chineseHanzi ?? row.word,
        difficultyScore: 30 + (upserted % 60),
        frequencyScore: 40 + (upserted % 50),
        tags: row.tags,
        source: "phase18_expansion"
      }
    });
    upserted += 1;
  }

  console.log(`Expanded vocabulary upserted: ${upserted}`);
}

main().finally(async () => prisma.$disconnect());

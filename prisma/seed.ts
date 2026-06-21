import { PrismaClient } from "@prisma/client";
import { categorySeeds, languageSeeds, learningPathSeeds, vocabularySeeds } from "../lib/data/phase2-dataset";

const prisma = new PrismaClient();

async function main() {
  for (const item of languageSeeds) {
    await prisma.language.upsert({ where: { id: item.id }, update: item, create: item });
  }

  for (const item of categorySeeds) {
    await prisma.category.upsert({ where: { id: item.id }, update: item, create: item });
  }

  for (const item of learningPathSeeds) {
    const data = {
      id: item.id,
      title: item.title,
      description: item.description,
      language: item.language === "mixed" ? null : item.language,
      languageId: item.language === "mixed" ? null : `lang-${item.language}`,
      level: item.level,
      lessonCount: item.lessonCount,
      estimatedTime: item.estimatedTime,
      skillFocus: item.skillFocus,
      order: item.order ?? 0,
      isPublished: true
    };
    await prisma.learningPath.upsert({ where: { id: item.id }, update: data as any, create: data as any });
  }

  for (const item of vocabularySeeds) {
    const data = {
      id: item.id,
      language: item.language,
      languageId: item.languageId ?? `lang-${item.language}`,
      word: item.word,
      chineseHanzi: item.chineseHanzi,
      pinyin: item.pinyin,
      ipa: item.ipa,
      thaiPronunciation: item.thaiPronunciation,
      thaiMeaning: item.thaiMeaning,
      partOfSpeech: item.partOfSpeech,
      cefrLevel: item.cefrLevel,
      hskLevel: item.hskLevel,
      categoryId: item.categoryId ?? item.category,
      exampleSentence: item.exampleSentence,
      exampleTranslationTh: item.exampleTranslationTh,
      dailyLifeSentence: item.dailyLifeSentence,
      difficultyScore: item.difficultyScore,
      frequencyScore: item.frequencyScore,
      tags: item.tags
    };
    await prisma.vocabulary.upsert({ where: { id: item.id }, update: data as any, create: data as any });
  }

  console.log("Phase 2 seed complete");
}

main().finally(() => prisma.$disconnect());

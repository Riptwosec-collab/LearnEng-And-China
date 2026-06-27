import { Prisma, PrismaClient } from "@prisma/client";
import { categorySeeds, languageSeeds, learningPathSeeds } from "../lib/data/phase2-dataset";
import { vocabularySeeds } from "../lib/data/vocabulary-seeds";

const prisma = new PrismaClient();

async function main() {
  for (const item of languageSeeds) {
    await prisma.language.upsert({ where: { id: item.id }, update: item, create: item });
  }

  for (const item of categorySeeds) {
    const data: Prisma.CategoryUncheckedCreateInput = {
      id: item.id,
      slug: item.slug ?? item.id,
      nameTh: item.nameTh,
      nameEn: item.nameEn,
      icon: item.icon,
      description: item.description,
      order: item.order ?? 0,
      isDailyLife: item.isDailyLife ?? true
    };

    if (item.parentId) {
      data.parentId = item.parentId;
    }

    await prisma.category.upsert({
      where: { id: item.id },
      update: data,
      create: data
    });
  }

  for (const item of learningPathSeeds) {
    const data: Prisma.LearningPathUncheckedCreateInput = {
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

    await prisma.learningPath.upsert({
      where: { id: item.id },
      update: data,
      create: data
    });
  }

  for (const item of vocabularySeeds) {
    const data: Prisma.VocabularyUncheckedCreateInput = {
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
      subcategory: item.subcategory,
      exampleSentence: item.exampleSentence,
      exampleTranslationTh: item.exampleTranslationTh,
      dailyLifeSentence: item.dailyLifeSentence,
      formalSentence: item.formalSentence,
      casualSentence: item.casualSentence,
      synonym: item.synonym,
      antonym: item.antonym,
      collocation: item.collocation,
      commonMistake: item.commonMistake,
      miniQuizQuestion: item.miniQuizQuestion,
      miniQuizChoices: item.miniQuizChoices ?? [],
      miniQuizAnswer: item.miniQuizAnswer,
      ttsText: item.ttsText,
      audioUrl: item.audioUrl,
      difficultyScore: item.difficultyScore,
      frequencyScore: item.frequencyScore,
      tags: item.tags,
      source: item.source ?? "phase2_seed",
      isPublished: item.isPublished ?? true
    };

    await prisma.vocabulary.upsert({
      where: { language_word_categoryId: { language: item.language, word: item.word, categoryId: item.categoryId ?? item.category } },
      update: data,
      create: data
    });
  }

  console.log(`Vocabulary seed complete: ${vocabularySeeds.length} rows`);
}

main().finally(() => prisma.$disconnect());

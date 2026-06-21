import { PrismaClient } from "@prisma/client";
import { categories } from "../lib/data/categories";
import { learningPaths } from "../lib/data/learning-paths";
import { vocabularySamples } from "../lib/data/vocabulary";

const prisma = new PrismaClient();

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: category,
      create: category
    });
  }

  for (const path of learningPaths) {
    await prisma.learningPath.upsert({
      where: { id: path.id },
      update: {
        title: path.title,
        description: path.description,
        language: path.language === "mixed" ? null : path.language,
        level: path.level,
        lessonCount: path.lessonCount,
        estimatedTime: path.estimatedTime,
        skillFocus: path.skillFocus,
        isPublished: true
      },
      create: {
        id: path.id,
        title: path.title,
        description: path.description,
        language: path.language === "mixed" ? null : path.language,
        level: path.level,
        lessonCount: path.lessonCount,
        estimatedTime: path.estimatedTime,
        skillFocus: path.skillFocus,
        isPublished: true
      }
    });
  }

  for (const word of vocabularySamples) {
    await prisma.vocabulary.upsert({
      where: {
        language_word_categoryId: {
          language: word.language,
          word: word.word,
          categoryId: word.category
        }
      },
      update: {
        language: word.language,
        word: word.word,
        chineseHanzi: word.chineseHanzi,
        pinyin: word.pinyin,
        ipa: word.ipa,
        thaiPronunciation: word.thaiPronunciation,
        thaiMeaning: word.thaiMeaning,
        partOfSpeech: word.partOfSpeech,
        cefrLevel: word.cefrLevel,
        hskLevel: word.hskLevel,
        categoryId: word.category,
        exampleSentence: word.exampleSentence,
        exampleTranslationTh: word.exampleTranslationTh,
        dailyLifeSentence: word.dailyLifeSentence,
        difficultyScore: word.difficultyScore,
        frequencyScore: word.frequencyScore,
        tags: word.tags
      },
      create: {
        language: word.language,
        word: word.word,
        chineseHanzi: word.chineseHanzi,
        pinyin: word.pinyin,
        ipa: word.ipa,
        thaiPronunciation: word.thaiPronunciation,
        thaiMeaning: word.thaiMeaning,
        partOfSpeech: word.partOfSpeech,
        cefrLevel: word.cefrLevel,
        hskLevel: word.hskLevel,
        categoryId: word.category,
        exampleSentence: word.exampleSentence,
        exampleTranslationTh: word.exampleTranslationTh,
        dailyLifeSentence: word.dailyLifeSentence,
        difficultyScore: word.difficultyScore,
        frequencyScore: word.frequencyScore,
        tags: word.tags
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "TargetLanguage" AS ENUM ('english', 'chinese');

-- CreateEnum
CREATE TYPE "CefrLevel" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1');

-- CreateEnum
CREATE TYPE "PartOfSpeech" AS ENUM ('noun', 'verb', 'adjective', 'adverb', 'phrase', 'preposition', 'conjunction', 'pronoun', 'interjection');

-- CreateEnum
CREATE TYPE "WordProgressStatus" AS ENUM ('new', 'learning', 'remembered', 'review', 'difficult', 'mastered');

-- CreateEnum
CREATE TYPE "SkillType" AS ENUM ('vocabulary', 'speaking', 'listening', 'reading', 'writing', 'grammar', 'pronunciation', 'conversation');

-- CreateEnum
CREATE TYPE "LessonStepType" AS ENUM ('vocabulary', 'dialogue', 'listening', 'speaking', 'reading', 'writing', 'grammar', 'quiz', 'mission');

-- CreateEnum
CREATE TYPE "ExerciseType" AS ENUM ('multiple_choice', 'fill_blank', 'dictation', 'speaking', 'writing', 'matching', 'ordering', 'translation');

-- CreateEnum
CREATE TYPE "LessonProgressStatus" AS ENUM ('not_started', 'in_progress', 'completed');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('learner', 'admin');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "authUserId" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "displayName" TEXT,
    "nativeLanguage" TEXT NOT NULL DEFAULT 'th',
    "currentEnglishLevel" "CefrLevel" NOT NULL DEFAULT 'A1',
    "currentChineseLevel" "CefrLevel" NOT NULL DEFAULT 'A1',
    "learningGoals" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "dailyGoalWords" INTEGER NOT NULL DEFAULT 30,
    "dailyGoalMinutes" INTEGER NOT NULL DEFAULT 15,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "role" "UserRole" NOT NULL DEFAULT 'learner',
    "streakCount" INTEGER NOT NULL DEFAULT 0,
    "timezone" TEXT NOT NULL DEFAULT 'Asia/Bangkok',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "languages" (
    "id" TEXT NOT NULL,
    "code" "TargetLanguage" NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameTh" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nameTh" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isDailyLife" BOOLEAN NOT NULL DEFAULT true,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vocabulary" (
    "id" TEXT NOT NULL,
    "language" "TargetLanguage" NOT NULL,
    "languageId" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "chineseHanzi" TEXT,
    "pinyin" TEXT,
    "ipa" TEXT,
    "thaiPronunciation" TEXT NOT NULL,
    "thaiMeaning" TEXT NOT NULL,
    "partOfSpeech" "PartOfSpeech" NOT NULL,
    "cefrLevel" "CefrLevel" NOT NULL,
    "hskLevel" INTEGER,
    "categoryId" TEXT NOT NULL,
    "subcategory" TEXT,
    "exampleSentence" TEXT NOT NULL,
    "exampleTranslationTh" TEXT NOT NULL,
    "dailyLifeSentence" TEXT NOT NULL,
    "formalSentence" TEXT,
    "casualSentence" TEXT,
    "synonym" TEXT,
    "antonym" TEXT,
    "collocation" TEXT,
    "commonMistake" TEXT,
    "miniQuizQuestion" TEXT,
    "miniQuizChoices" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "miniQuizAnswer" TEXT,
    "ttsText" TEXT,
    "audioUrl" TEXT,
    "difficultyScore" INTEGER NOT NULL DEFAULT 50,
    "frequencyScore" INTEGER NOT NULL DEFAULT 50,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "source" TEXT NOT NULL DEFAULT 'original_mock',
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vocabulary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vocabulary_examples" (
    "id" TEXT NOT NULL,
    "vocabularyId" TEXT NOT NULL,
    "sentence" TEXT NOT NULL,
    "translationTh" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "tone" TEXT NOT NULL DEFAULT 'daily',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vocabulary_examples_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_vocabulary_progress" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "vocabularyId" TEXT NOT NULL,
    "status" "WordProgressStatus" NOT NULL DEFAULT 'new',
    "easeFactor" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    "intervalDays" INTEGER NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "correctCount" INTEGER NOT NULL DEFAULT 0,
    "wrongCount" INTEGER NOT NULL DEFAULT 0,
    "pronunciationMistakes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "writingMistakes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "lastReviewedAt" TIMESTAMP(3),
    "nextReviewAt" TIMESTAMP(3),
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_vocabulary_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_paths" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "languageId" TEXT,
    "language" "TargetLanguage",
    "level" "CefrLevel" NOT NULL,
    "lessonCount" INTEGER NOT NULL DEFAULT 0,
    "estimatedTime" TEXT NOT NULL,
    "skillFocus" "SkillType"[] DEFAULT ARRAY[]::"SkillType"[],
    "order" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "learning_paths_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessons" (
    "id" TEXT NOT NULL,
    "pathId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "language" "TargetLanguage" NOT NULL,
    "categoryId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" "CefrLevel" NOT NULL,
    "order" INTEGER NOT NULL,
    "estimatedMins" INTEGER NOT NULL DEFAULT 12,
    "objectives" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "recommendedNextId" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lesson_steps" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "type" "LessonStepType" NOT NULL,
    "title" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lesson_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercises" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "type" "ExerciseType" NOT NULL,
    "prompt" TEXT NOT NULL,
    "instruction" TEXT NOT NULL,
    "answer" JSONB,
    "metadata" JSONB,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_questions" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT,
    "exerciseId" TEXT,
    "skill" "SkillType" NOT NULL,
    "question" TEXT NOT NULL,
    "choices" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "answer" TEXT NOT NULL,
    "explanationTh" TEXT NOT NULL,
    "level" "CefrLevel" NOT NULL,
    "language" "TargetLanguage",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quiz_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reading_passages" (
    "id" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "language" "TargetLanguage" NOT NULL,
    "categoryId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "level" "CefrLevel" NOT NULL,
    "passage" TEXT NOT NULL,
    "translationTh" TEXT NOT NULL,
    "summaryTh" TEXT NOT NULL,
    "keyVocabulary" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "questions" JSONB NOT NULL,
    "estimatedMins" INTEGER NOT NULL DEFAULT 8,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reading_passages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listening_items" (
    "id" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "language" "TargetLanguage" NOT NULL,
    "categoryId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "level" "CefrLevel" NOT NULL,
    "transcript" TEXT NOT NULL,
    "translationTh" TEXT NOT NULL,
    "audioUrl" TEXT,
    "speedOptions" DOUBLE PRECISION[] DEFAULT ARRAY[0.75, 1, 1.25]::DOUBLE PRECISION[],
    "accent" TEXT NOT NULL DEFAULT 'neutral',
    "questions" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listening_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "speaking_scenarios" (
    "id" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "language" "TargetLanguage" NOT NULL,
    "categoryId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "level" "CefrLevel" NOT NULL,
    "roleUser" TEXT NOT NULL,
    "roleAi" TEXT NOT NULL,
    "situationTh" TEXT NOT NULL,
    "openingLine" TEXT NOT NULL,
    "targetPhrases" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "scoringRubric" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "speaking_scenarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "speaking_sessions" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "scenarioId" TEXT NOT NULL,
    "transcript" TEXT NOT NULL,
    "expectedText" TEXT,
    "pronunciationScore" INTEGER NOT NULL DEFAULT 0,
    "fluencyScore" INTEGER NOT NULL DEFAULT 0,
    "confidenceScore" INTEGER NOT NULL DEFAULT 0,
    "feedbackTh" TEXT NOT NULL,
    "mispronouncedWords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "speaking_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "writing_prompts" (
    "id" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "language" "TargetLanguage" NOT NULL,
    "categoryId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "level" "CefrLevel" NOT NULL,
    "promptTh" TEXT NOT NULL,
    "promptTarget" TEXT,
    "writingType" TEXT NOT NULL,
    "suggestedWords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "rubric" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "writing_prompts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "writing_submissions" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "promptId" TEXT NOT NULL,
    "originalText" TEXT NOT NULL,
    "correctedText" TEXT,
    "feedbackTh" TEXT,
    "grammarScore" INTEGER NOT NULL DEFAULT 0,
    "vocabularyScore" INTEGER NOT NULL DEFAULT 0,
    "clarityScore" INTEGER NOT NULL DEFAULT 0,
    "naturalnessScore" INTEGER NOT NULL DEFAULT 0,
    "structureScore" INTEGER NOT NULL DEFAULT 0,
    "toneScore" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "writing_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grammar_topics" (
    "id" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "language" "TargetLanguage" NOT NULL,
    "categoryId" TEXT,
    "title" TEXT NOT NULL,
    "level" "CefrLevel" NOT NULL,
    "explanationTh" TEXT NOT NULL,
    "pattern" TEXT NOT NULL,
    "examples" JSONB NOT NULL,
    "realLifeScenario" TEXT NOT NULL,
    "miniQuiz" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "grammar_topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review_queue" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "vocabularyId" TEXT NOT NULL,
    "dueAt" TIMESTAMP(3) NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 50,
    "reason" TEXT NOT NULL DEFAULT 'spaced_repetition',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_queue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievements" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "xpReward" INTEGER NOT NULL DEFAULT 0,
    "condition" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_achievements" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "unlockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "streaks" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "studyMinutes" INTEGER NOT NULL DEFAULT 0,
    "wordsReviewed" INTEGER NOT NULL DEFAULT 0,
    "lessonsDone" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "streaks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_tutor_messages" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_tutor_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "placement_test_results" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "language" "TargetLanguage" NOT NULL,
    "goal" TEXT NOT NULL,
    "vocabularyScore" INTEGER NOT NULL,
    "grammarScore" INTEGER NOT NULL,
    "readingScore" INTEGER NOT NULL,
    "listeningScore" INTEGER NOT NULL,
    "speakingScore" INTEGER NOT NULL,
    "recommendedLevel" "CefrLevel" NOT NULL,
    "recommendedPathId" TEXT,
    "weaknessTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "placement_test_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_missions" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "skill" "SkillType" NOT NULL,
    "xpReward" INTEGER NOT NULL DEFAULT 20,
    "targetCount" INTEGER NOT NULL DEFAULT 1,
    "completedCount" INTEGER NOT NULL DEFAULT 0,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "daily_missions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_lesson_progress" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "status" "LessonProgressStatus" NOT NULL DEFAULT 'not_started',
    "score" INTEGER NOT NULL DEFAULT 0,
    "stepsCompleted" INTEGER NOT NULL DEFAULT 0,
    "totalSteps" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_lesson_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_authUserId_key" ON "users"("authUserId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_userId_key" ON "user_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "languages_code_key" ON "languages"("code");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE INDEX "categories_parentId_idx" ON "categories"("parentId");

-- CreateIndex
CREATE INDEX "vocabulary_language_cefrLevel_idx" ON "vocabulary"("language", "cefrLevel");

-- CreateIndex
CREATE INDEX "vocabulary_categoryId_idx" ON "vocabulary"("categoryId");

-- CreateIndex
CREATE INDEX "vocabulary_word_idx" ON "vocabulary"("word");

-- CreateIndex
CREATE UNIQUE INDEX "vocabulary_language_word_categoryId_key" ON "vocabulary"("language", "word", "categoryId");

-- CreateIndex
CREATE INDEX "vocabulary_examples_vocabularyId_idx" ON "vocabulary_examples"("vocabularyId");

-- CreateIndex
CREATE INDEX "user_vocabulary_progress_nextReviewAt_idx" ON "user_vocabulary_progress"("nextReviewAt");

-- CreateIndex
CREATE UNIQUE INDEX "user_vocabulary_progress_userProfileId_vocabularyId_key" ON "user_vocabulary_progress"("userProfileId", "vocabularyId");

-- CreateIndex
CREATE INDEX "learning_paths_language_level_idx" ON "learning_paths"("language", "level");

-- CreateIndex
CREATE INDEX "lessons_pathId_order_idx" ON "lessons"("pathId", "order");

-- CreateIndex
CREATE INDEX "lessons_language_level_idx" ON "lessons"("language", "level");

-- CreateIndex
CREATE INDEX "lesson_steps_lessonId_order_idx" ON "lesson_steps"("lessonId", "order");

-- CreateIndex
CREATE INDEX "exercises_lessonId_idx" ON "exercises"("lessonId");

-- CreateIndex
CREATE INDEX "quiz_questions_lessonId_idx" ON "quiz_questions"("lessonId");

-- CreateIndex
CREATE INDEX "quiz_questions_skill_level_idx" ON "quiz_questions"("skill", "level");

-- CreateIndex
CREATE INDEX "reading_passages_language_level_idx" ON "reading_passages"("language", "level");

-- CreateIndex
CREATE INDEX "listening_items_language_level_idx" ON "listening_items"("language", "level");

-- CreateIndex
CREATE INDEX "speaking_scenarios_language_level_idx" ON "speaking_scenarios"("language", "level");

-- CreateIndex
CREATE INDEX "speaking_sessions_userProfileId_createdAt_idx" ON "speaking_sessions"("userProfileId", "createdAt");

-- CreateIndex
CREATE INDEX "writing_prompts_language_level_idx" ON "writing_prompts"("language", "level");

-- CreateIndex
CREATE INDEX "writing_submissions_userProfileId_createdAt_idx" ON "writing_submissions"("userProfileId", "createdAt");

-- CreateIndex
CREATE INDEX "grammar_topics_language_level_idx" ON "grammar_topics"("language", "level");

-- CreateIndex
CREATE INDEX "review_queue_userProfileId_dueAt_idx" ON "review_queue"("userProfileId", "dueAt");

-- CreateIndex
CREATE INDEX "user_achievements_userProfileId_idx" ON "user_achievements"("userProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "user_achievements_userProfileId_achievementId_key" ON "user_achievements"("userProfileId", "achievementId");

-- CreateIndex
CREATE UNIQUE INDEX "streaks_userProfileId_date_key" ON "streaks"("userProfileId", "date");

-- CreateIndex
CREATE INDEX "ai_tutor_messages_userProfileId_createdAt_idx" ON "ai_tutor_messages"("userProfileId", "createdAt");

-- CreateIndex
CREATE INDEX "placement_test_results_userProfileId_language_idx" ON "placement_test_results"("userProfileId", "language");

-- CreateIndex
CREATE INDEX "daily_missions_userProfileId_date_idx" ON "daily_missions"("userProfileId", "date");

-- CreateIndex
CREATE INDEX "user_lesson_progress_userProfileId_status_idx" ON "user_lesson_progress"("userProfileId", "status");

-- CreateIndex
CREATE INDEX "user_lesson_progress_lessonId_idx" ON "user_lesson_progress"("lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "user_lesson_progress_userProfileId_lessonId_key" ON "user_lesson_progress"("userProfileId", "lessonId");

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vocabulary" ADD CONSTRAINT "vocabulary_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vocabulary" ADD CONSTRAINT "vocabulary_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vocabulary_examples" ADD CONSTRAINT "vocabulary_examples_vocabularyId_fkey" FOREIGN KEY ("vocabularyId") REFERENCES "vocabulary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_vocabulary_progress" ADD CONSTRAINT "user_vocabulary_progress_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "user_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_vocabulary_progress" ADD CONSTRAINT "user_vocabulary_progress_vocabularyId_fkey" FOREIGN KEY ("vocabularyId") REFERENCES "vocabulary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_paths" ADD CONSTRAINT "learning_paths_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_pathId_fkey" FOREIGN KEY ("pathId") REFERENCES "learning_paths"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_steps" ADD CONSTRAINT "lesson_steps_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_questions" ADD CONSTRAINT "quiz_questions_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_questions" ADD CONSTRAINT "quiz_questions_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_passages" ADD CONSTRAINT "reading_passages_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_passages" ADD CONSTRAINT "reading_passages_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listening_items" ADD CONSTRAINT "listening_items_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listening_items" ADD CONSTRAINT "listening_items_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "speaking_scenarios" ADD CONSTRAINT "speaking_scenarios_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "speaking_scenarios" ADD CONSTRAINT "speaking_scenarios_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "speaking_sessions" ADD CONSTRAINT "speaking_sessions_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "user_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "speaking_sessions" ADD CONSTRAINT "speaking_sessions_scenarioId_fkey" FOREIGN KEY ("scenarioId") REFERENCES "speaking_scenarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "writing_prompts" ADD CONSTRAINT "writing_prompts_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "writing_prompts" ADD CONSTRAINT "writing_prompts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "writing_submissions" ADD CONSTRAINT "writing_submissions_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "user_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "writing_submissions" ADD CONSTRAINT "writing_submissions_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "writing_prompts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grammar_topics" ADD CONSTRAINT "grammar_topics_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grammar_topics" ADD CONSTRAINT "grammar_topics_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_queue" ADD CONSTRAINT "review_queue_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "user_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_queue" ADD CONSTRAINT "review_queue_vocabularyId_fkey" FOREIGN KEY ("vocabularyId") REFERENCES "vocabulary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "user_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "achievements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "streaks" ADD CONSTRAINT "streaks_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "user_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_tutor_messages" ADD CONSTRAINT "ai_tutor_messages_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "user_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placement_test_results" ADD CONSTRAINT "placement_test_results_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "user_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placement_test_results" ADD CONSTRAINT "placement_test_results_recommendedPathId_fkey" FOREIGN KEY ("recommendedPathId") REFERENCES "learning_paths"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_missions" ADD CONSTRAINT "daily_missions_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "user_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_lesson_progress" ADD CONSTRAINT "user_lesson_progress_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "user_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_lesson_progress" ADD CONSTRAINT "user_lesson_progress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

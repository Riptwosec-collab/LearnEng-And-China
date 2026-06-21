# Phase 2: Database & Mock Data

Phase 2 turns LinguaQuest AI from a UI scaffold into a database-ready learning platform.

## Added

- Expanded Prisma PostgreSQL schema for the main app tables.
- Mock dataset generator in `lib/data/phase2-dataset.ts`.
- 2 target languages: English and Mandarin Chinese.
- 41 daily-life categories.
- 100 generated English vocabulary records.
- 100 generated Chinese vocabulary records with Hanzi, Pinyin, Thai pronunciation, CEFR and HSK mapping.
- 18 learning paths.
- 30 lessons.
- 270 lesson steps.
- 30 exercises.
- 120 quiz questions.
- 20 speaking scenarios.
- 20 reading passages.
- 20 listening items.
- 20 writing prompts.
- 30 grammar topics.
- Achievement and daily mission templates.
- Spaced repetition helper.
- Import validation schema and import preview API.

## Commands

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:push
npm run seed
npm run dev
```

## API routes

- `GET /api/content-categories`
- `GET /api/learning-paths`
- `GET /api/lessons`
- `GET /api/vocabulary`
- `GET /api/dashboard/stats`
- `GET /api/review/daily`
- `GET /api/admin/import`
- `POST /api/admin/import`

## Notes

The current seed script imports the core database data first: languages, categories, learning paths and vocabulary. The generated Phase 2 dataset also contains lessons, quiz, speaking, reading, listening, writing and grammar mock content so later phases can connect those tables without redesigning the data layer.

# LinguaQuest AI

เว็บแอพเรียนภาษาอังกฤษและภาษาจีนกลางสำหรับผู้ใช้ไทย ตั้งแต่ A1-C1 พร้อมโครงสร้างต่อยอดเป็นระบบจริง: Vocabulary 10K, Speaking, Listening, Reading, Writing, Grammar, AI Tutor, Review, Dashboard, Admin CMS และ CSV/JSON Import

## Phase Status

### Phase 1: Project Setup

- Next.js + TypeScript + App Router
- Tailwind CSS
- Reusable UI components inspired by shadcn/ui
- Framer Motion
- Supabase SSR scaffold
- Prisma + PostgreSQL scaffold
- PWA manifest
- Landing, dashboard, vocabulary, speaking, listening, reading, writing, AI Tutor, review and admin pages

### Phase 2: Database & Mock Data

- Expanded Prisma PostgreSQL schema for the full learning system.
- Generated mock dataset in `lib/data/phase2-dataset.ts`.
- 2 languages: English and Mandarin Chinese.
- 41 daily-life categories.
- 100 English vocabulary records.
- 100 Chinese vocabulary records with Hanzi, Pinyin, Thai pronunciation, CEFR and HSK mapping.
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
- Import validation schema and preview API.

## Run

```bash
npm install
cp .env.example .env
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Database Setup

Set `DATABASE_URL` and `DIRECT_URL` in `.env`, then run:

```bash
npm run prisma:generate
npm run prisma:push
npm run seed
```

## Important Pages

- `/`
- `/auth/login`
- `/auth/register`
- `/onboarding`
- `/placement-test`
- `/dashboard`
- `/learn`
- `/paths`
- `/paths/[id]`
- `/lessons/[id]`
- `/vocabulary`
- `/vocabulary/[id]`
- `/review`
- `/flashcards`
- `/speaking`
- `/speaking/roleplay`
- `/listening`
- `/reading`
- `/writing`
- `/grammar`
- `/ai-tutor`
- `/progress`
- `/profile`
- `/settings`
- `/admin`
- `/admin/vocabulary`
- `/admin/lessons`
- `/admin/import`

## Phase 2 API Routes

- `GET /api/content-categories`
- `GET /api/learning-paths`
- `GET /api/lessons`
- `GET /api/vocabulary`
- `GET /api/dashboard/stats`
- `GET /api/review/daily`
- `GET /api/admin/import`
- `POST /api/admin/import`

## Phase 2 Docs

See `docs/PHASE2_DATABASE_AND_MOCK_DATA.md`.

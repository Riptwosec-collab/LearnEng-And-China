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

### Phase 3: Dashboard & Learning Path

- Upgraded `/dashboard` into a real learning analytics dashboard.
- Added progress cards, recommended lesson, skill score, weekly plan and category coverage.
- Upgraded `/learn` into a learning hub with quick skill labs and grouped learning sections.
- Upgraded `/paths` with path stats, language counts, average progress and filter chips.
- Upgraded `/paths/[id]` with path summary, real lesson list, timeline and category coverage.
- Upgraded `/lessons/[id]` with lesson step flow, objectives, vocabulary preview and quiz preview.
- Added Phase 3 data helper in `lib/data/phase3-learning.ts`.
- Added reusable learning components in `components/learning/*`.
- Added API routes for dashboard learning summary, path detail and lesson detail.

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

## API Routes

### Phase 2

- `GET /api/content-categories`
- `GET /api/learning-paths`
- `GET /api/lessons`
- `GET /api/vocabulary`
- `GET /api/dashboard/stats`
- `GET /api/review/daily`
- `GET /api/admin/import`
- `POST /api/admin/import`

### Phase 3

- `GET /api/dashboard/learning-summary`
- `GET /api/paths/[id]`
- `GET /api/lessons/[id]`

## Docs

- `docs/PHASE2_DATABASE_AND_MOCK_DATA.md`
- `docs/PHASE3_DASHBOARD_AND_LEARNING_PATH.md`

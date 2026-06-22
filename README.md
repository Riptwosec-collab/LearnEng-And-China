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
- 18 learning paths, 30 lessons, 270 lesson steps, 120 quiz questions and skill-lab content.
- Import validation schema and preview API.

### Phase 3: Dashboard & Learning Path

- Upgraded `/dashboard` into a real learning analytics dashboard.
- Added progress cards, recommended lesson, skill score, weekly plan and category coverage.
- Upgraded `/learn`, `/paths`, `/paths/[id]` and `/lessons/[id]`.
- Added reusable learning components in `components/learning/*`.

### Phase 4: Vocabulary 10K System

- Added `lib/data/phase4-vocabulary.ts`.
- Upgraded `/vocabulary`, `/vocabulary/[id]`, `/review` and `/flashcards`.
- Added search/filter helper, word detail, learner word progress, flashcard decks and daily review queue.
- Added review preview logic for easy/good/hard/again.
- Added vocabulary and review API routes.

### Phase 5: Speaking & Listening

- Added `lib/data/phase5-speaking-listening.ts`.
- Upgraded `/speaking`, `/speaking/roleplay` and `/listening`.
- Added recording UI model, waveform mock, transcript scoring, roleplay scenarios, listening items, speed controls and quiz data.
- Added speaking/listening API routes.

### Phase 6: Reading & Writing

- Added `lib/data/phase6-reading-writing.ts`.
- Upgraded `/reading` and `/writing`.
- Added reading passage model, bilingual sentence model, key vocabulary, reading quiz, writing prompts, correction mock and score rubric.
- Added reading/writing API routes.

### Phase 7: Grammar & AI Tutor

- Added `lib/data/phase7-grammar-ai.ts`.
- Upgraded `/grammar` and `/ai-tutor`.
- Added grammar-in-real-life topics, mini quiz, speaking/writing practice, AI tutor quick prompts and OpenAI-ready prompt templates.
- Added AI Tutor chat API mock.

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

### Phase 4-7

- `GET /api/vocabulary/search`
- `GET /api/vocabulary/[id]`
- `GET /api/vocabulary/[id]/review-preview`
- `GET /api/review/queue`
- `GET /api/speaking/scenarios`
- `POST /api/speaking/score`
- `GET /api/listening/items`
- `GET /api/reading/passages`
- `GET /api/writing/prompts`
- `POST /api/writing/correct`
- `GET /api/grammar/topics`
- `GET /api/ai-tutor/chat`
- `POST /api/ai-tutor/chat`

## Docs

- `docs/PHASE2_DATABASE_AND_MOCK_DATA.md`
- `docs/PHASE3_DASHBOARD_AND_LEARNING_PATH.md`
- `docs/PHASE4_TO_7_SKILL_SYSTEMS.md`

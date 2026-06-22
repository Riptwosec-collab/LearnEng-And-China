# LinguaQuest AI

เว็บแอพเรียนภาษาอังกฤษและภาษาจีนกลางสำหรับผู้ใช้ไทย ตั้งแต่ A1-C1 พร้อม Vocabulary, Speaking, Listening, Reading, Writing, Grammar, AI Tutor, Review, Dashboard, Admin CMS, Supabase, OpenAI, STT/TTS, QA workflow, Vercel config และ content expansion

## Phase Status

- Phase 1: Project Setup - Done
- Phase 2: Database & Mock Data - Done
- Phase 3: Dashboard & Learning Path - Done
- Phase 4: Vocabulary 10K System - Done
- Phase 5: Speaking & Listening - Done
- Phase 6: Reading & Writing - Done
- Phase 7: Grammar & AI Tutor - Done
- Phase 8: Admin CMS & Import - Done
- Phase 9: Polish UX/UI - Done
- Phase 10: Production Ready - Done
- Phase 11: User Progress / Placement / Profile - Done
- Phase 12: Launch / PWA / Beta Readiness - Done
- Phase 13: Real Supabase Auth & Database - Done
- Phase 14: Real OpenAI Integration - Done
- Phase 15: Real STT/TTS Speaking System - Done
- Phase 16: Build Fix & QA - Done
- Phase 17: Deploy to Vercel config - Done
- Phase 18: Content Expansion 1,000+ ready - Done

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

Set database env values, then run:

```bash
npm run prisma:generate
npm run prisma:push
npm run seed
```

## Real Integrations

### Supabase + PostgreSQL

- `lib/supabase/server.ts`
- `lib/supabase/client.ts`
- `lib/supabase/middleware.ts`
- `lib/db/prisma.ts`
- `lib/auth/session.ts`

### OpenAI

- `lib/ai/openai.ts`
- `POST /api/ai-tutor/chat`
- `POST /api/writing/correct`
- `POST /api/quiz/generate`

### Speech

- `lib/speech/browser-speech.ts`
- `POST /api/speech/stt`
- `POST /api/speech/tts`

## QA

```bash
npm run typecheck
npm run lint
npm run build
npm run qa
```

GitHub Actions workflow:

```txt
.github/workflows/qa.yml
```

## Content Expansion

```bash
npm run content:export
npm run content:expand
EXPANDED_VOCAB_PER_LANGUAGE=5000 npm run content:expand
```

Preview API:

```txt
GET /api/content/expanded-vocabulary
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
- `/admin/system`

## Docs

- `docs/PHASE2_DATABASE_AND_MOCK_DATA.md`
- `docs/PHASE3_DASHBOARD_AND_LEARNING_PATH.md`
- `docs/PHASE4_TO_7_SKILL_SYSTEMS.md`
- `docs/PHASE8_TO_12_PLATFORM_READY.md`
- `docs/PHASE13_TO_18_REAL_SYSTEMS.md`

## Deployment

The repo includes `vercel.json`. Add production env values in Vercel before deploying.

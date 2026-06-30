# LinguaQuest AI

[![QA](https://github.com/Riptwosec-collab/LearnEng-And-China/actions/workflows/qa.yml/badge.svg)](https://github.com/Riptwosec-collab/LearnEng-And-China/actions/workflows/qa.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20-339933)](./package.json)

เว็บแอปเรียนภาษาอังกฤษและภาษาจีนกลางสำหรับผู้ใช้ไทย ตั้งแต่ระดับ A1-C1 พร้อม Vocabulary, Speaking, Listening, Reading, Writing, Grammar, AI Tutor, Review, Dashboard, Admin CMS, Supabase, AI provider adapter, STT/TTS, QA workflow, Vercel config และ content expansion

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
- Phase 14: Real AI Integration - Done
- Phase 15: Real STT/TTS Speaking System - Done
- Phase 16: Build Fix & QA - Done
- Phase 17: Vercel deploy config - Done
- Phase 18: Content Expansion 1,000+ / 10,000+ ready - Done

## Run

```bash
npm ci
cp .env.example .env
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Production Setup

After filling real environment values, run:

```bash
npm run env:check
npm run prisma:generate
npm run prisma:migrate:deploy
npm run seed
npm run content:expand
npm run qa
```

Or run the combined setup command:

```bash
npm run setup:production
```

## Database Setup

For local prototyping (no migration history, fastest iteration):

```bash
npm run prisma:generate
npm run prisma:push
npm run seed
```

For real schema changes that should be tracked and deployable, create a
migration instead:

```bash
npm run prisma:migrate:dev -- --name <short_description>
```

In production/CI, apply already-committed migrations with:

```bash
npm run prisma:migrate:deploy
```

`prisma db push` does not create migration files - it's fine for quick local
experiments, but production schema changes should go through
`prisma migrate dev` / `prisma migrate deploy` so they're versioned and
reversible.

See:

```txt
docs/SUPABASE_PRODUCTION_SETUP.md
```

## Real Integrations

### Supabase + PostgreSQL

- `lib/supabase/server.ts`
- `lib/supabase/client.ts`
- `lib/supabase/middleware.ts`
- `lib/db/prisma.ts`
- `lib/auth/session.ts`

### AI Provider Adapter

- `lib/ai/openai.ts`
- Supports `openai`, `openrouter`, and `gemini` through `AI_PROVIDER`
- `POST /api/ai-tutor/chat`
- `POST /api/writing/correct`
- `POST /api/quiz/generate`

All AI and speech endpoints are protected by a basic per-IP rate limiter
(`lib/rate-limit.ts`) to avoid runaway API costs from abuse. It's in-memory
and per-instance - for multi-instance production deployments, swap it for a
shared store (e.g. `@upstash/ratelimit`).

See:

```txt
docs/AI_PROVIDER_SETUP.md
```

### Speech

- `lib/speech/browser-speech.ts`
- `POST /api/speech/stt`
- `POST /api/speech/tts`

## QA

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm run qa
npm run smoke
```

Unit tests live next to the code they cover (`lib/**/*.test.ts`), run with
[Vitest](https://vitest.dev). See `lib/data/srs.test.ts` for an example
covering the spaced-repetition scheduler.

GitHub Actions workflow:

```txt
.github/workflows/qa.yml
```

## Content Expansion

```bash
npm run content:export
npm run content:expand
npm run content:10k
```

Preview API:

```txt
GET /api/content/expanded-vocabulary
```

## Deployment

See:

```txt
docs/DEPLOYMENT_RUNBOOK.md
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

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup, the local QA checklist,
and the database migration workflow.

## Security

See [SECURITY.md](./SECURITY.md) for how to report a vulnerability.

## License

[MIT](./LICENSE)

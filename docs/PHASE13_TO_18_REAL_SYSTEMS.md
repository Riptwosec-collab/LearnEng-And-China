# Phase 13-18: Real Systems, QA, Deploy, Content Expansion

Status: code pushed to `main`.

## Phase 13: Real Supabase Auth & Database

Added runtime Prisma helper, Supabase session middleware, auth callback, authenticated profile API, DB-backed vocabulary API and vocabulary progress persistence.

Files:

- `lib/db/prisma.ts`
- `lib/auth/session.ts`
- `lib/supabase/middleware.ts`
- `middleware.ts`
- `app/auth/callback/route.ts`
- `app/api/auth/profile/route.ts`
- `app/api/db/vocabulary/route.ts`
- `app/api/db/vocabulary/progress/route.ts`

## Phase 14: Real OpenAI Integration

Added OpenAI Responses API wrapper with mock fallback, then connected AI Tutor, writing correction and quiz generation.

Files:

- `lib/ai/openai.ts`
- `app/api/ai-tutor/chat/route.ts`
- `app/api/writing/correct/route.ts`
- `app/api/quiz/generate/route.ts`

## Phase 15: Real STT/TTS Speaking System

Added browser speech helper, server STT endpoint and server TTS endpoint. Mock mode stays available for local development.

Files:

- `lib/speech/browser-speech.ts`
- `app/api/speech/stt/route.ts`
- `app/api/speech/tts/route.ts`

## Phase 16: Build Fix & QA

Added QA scripts and GitHub Actions workflow for typecheck, lint and build.

Files:

- `package.json`
- `.github/workflows/qa.yml`

Commands:

```bash
npm run typecheck
npm run lint
npm run build
npm run qa
```

## Phase 17: Deploy to Vercel

Added Vercel config. Real production deployment still needs project env values in Vercel.

Files:

- `vercel.json`

Required env values:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `DATABASE_URL`
- `DIRECT_URL`
- `OPENAI_API_KEY`

## Phase 18: Content Expansion

Added scalable vocabulary expansion generator for 1,000 rows and scripts that can scale toward 10,000+ rows by changing `EXPANDED_VOCAB_PER_LANGUAGE`.

Files:

- `lib/data/phase18-vocabulary-expansion.ts`
- `scripts/expand-vocabulary.ts`
- `scripts/export-vocabulary-json.ts`
- `app/api/content/expanded-vocabulary/route.ts`

Commands:

```bash
npm run content:export
npm run content:expand
EXPANDED_VOCAB_PER_LANGUAGE=5000 npm run content:expand
```

## Notes

- Production OpenAI calls are enabled when `OPENAI_API_KEY` exists and `NEXT_PUBLIC_ENABLE_MOCK_AI=false`.
- Production speech calls are enabled when `OPENAI_API_KEY` exists and `NEXT_PUBLIC_ENABLE_MOCK_SPEECH=false`.
- Database APIs fallback to mock data when database access is unavailable.

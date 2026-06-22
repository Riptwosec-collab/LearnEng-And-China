# Phase 13-18 Real Integration Summary

## Phase 13

Supabase Auth and Prisma database bridge were added. The app can now read the logged-in user, create a learner profile, and query vocabulary/progress from PostgreSQL with mock fallback.

## Phase 14

OpenAI-ready AI routes were added for tutor chat, writing correction, and quiz generation. Mock fallback remains available when live AI is not configured.

## Phase 15

Browser speech utilities were added for text-to-speech support. Server-side audio upload can be added after deployment settings are finalized.

## Phase 16

QA scripts and GitHub Actions checks were added for type checking and linting.

## Phase 17

Vercel deployment configuration is present in `vercel.json`.

## Phase 18

Vocabulary expansion tooling was added. Use `content:export` to generate a 1,000-row file and `content:expand` to upsert generated vocabulary into the database. Increasing the per-language count to 5,000 creates 10,000 total rows.

# Phase 4-7: Skill Systems

This phase upgrades LinguaQuest AI from a learning-path scaffold into a usable skill practice app.

## Phase 4: Vocabulary 10K System

Added:

- `lib/data/phase4-vocabulary.ts`
- Vocabulary search/filter helper.
- Learner word progress model.
- Daily review queue.
- Flashcard deck model.
- Review preview for `again`, `hard`, `good`, `easy`.
- Upgraded `/vocabulary`, `/vocabulary/[id]`, `/review`, `/flashcards`.

API routes:

```txt
GET /api/vocabulary/search
GET /api/vocabulary/[id]
GET /api/vocabulary/[id]/review-preview
GET /api/review/queue
```

## Phase 5: Speaking & Listening

Added:

- `lib/data/phase5-speaking-listening.ts`
- Speaking session mock.
- Waveform bars.
- Transcript scoring helper.
- Roleplay scenario model.
- Listening item model with speed options and quiz data.
- Upgraded `/speaking`, `/speaking/roleplay`, `/listening`.

API routes:

```txt
GET /api/speaking/scenarios
POST /api/speaking/score
GET /api/listening/items
```

## Phase 6: Reading & Writing

Added:

- `lib/data/phase6-reading-writing.ts`
- Reading lab model.
- Bilingual sentence model.
- Key vocabulary and reading questions.
- Writing prompt model.
- Writing correction mock and score rubric.
- Upgraded `/reading`, `/writing`.

API routes:

```txt
GET /api/reading/passages
GET /api/writing/prompts
POST /api/writing/correct
```

## Phase 7: Grammar & AI Tutor

Added:

- `lib/data/phase7-grammar-ai.ts`
- Grammar in real life model.
- Mini quiz and practice tasks.
- AI Tutor quick prompts.
- Prompt templates for OpenAI JSON outputs.
- Upgraded `/grammar`, `/ai-tutor`.

API routes:

```txt
GET /api/grammar/topics
GET /api/ai-tutor/chat
POST /api/ai-tutor/chat
```

## Current limitations

- Speech recording is still UI/mock scoring. Connect Web Speech API or external STT in production.
- TTS buttons are UI-ready but do not play real audio yet.
- AI Tutor and writing correction use mock replies until `OPENAI_API_KEY` is connected.
- SRS progress is deterministic mock data until Supabase user progress is connected.

## Next phase

Phase 8 should build Admin CMS and Import:

- Admin vocabulary CRUD.
- Lesson CRUD.
- CSV/JSON import page.
- Import validation result table.
- Supabase protected admin routes.

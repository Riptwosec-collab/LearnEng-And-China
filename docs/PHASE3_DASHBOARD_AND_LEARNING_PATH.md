# Phase 3: Dashboard & Learning Path

Phase 3 turns the Phase 1-2 scaffolding into a usable learning experience. The dashboard, learn hub, learning paths and lesson detail pages now read from the Phase 2 dataset and Phase 3 progress helper.

## What changed

### Dashboard

- Real learning analytics layout.
- Summary cards remain connected to `lib/data/dashboard.ts`.
- New learning model from `lib/data/phase3-learning.ts`.
- Recommended lesson card.
- Skill score cards for Vocabulary, Speaking, Listening, Reading, Writing and Grammar.
- Weekly learning plan visualization.
- Category coverage cards.
- Daily missions section.

### Learn Hub

- Quick skill lab entry cards.
- AI recommended lessons.
- Grouped learning sections:
  - Daily life and travel.
  - Work and school.
  - Skill labs.

### Learning Paths

- `/paths` now shows overview stats, language counts, average progress and filter chips.
- `/paths/[id]` now shows path progress, lesson list, timeline and category coverage.

### Lessons

- `/lessons/[id]` now shows a full lesson flow:
  - Vocabulary
  - Dialogue
  - Listening
  - Speaking
  - Reading
  - Writing
  - Grammar
  - Quiz
  - Daily mission

## New files

```txt
lib/data/phase3-learning.ts
components/learning/skill-score-card.tsx
components/learning/lesson-card.tsx
components/learning/path-progress-panel.tsx
components/learning/lesson-timeline.tsx
components/learning/recommended-lesson-card.tsx
app/api/dashboard/learning-summary/route.ts
app/api/paths/[id]/route.ts
app/api/lessons/[id]/route.ts
```

## Updated files

```txt
app/dashboard/page.tsx
app/learn/page.tsx
app/paths/page.tsx
app/paths/[id]/page.tsx
app/lessons/[id]/page.tsx
README.md
```

## API routes

```txt
GET /api/dashboard/learning-summary
GET /api/paths/[id]
GET /api/lessons/[id]
```

## Data source

Phase 3 currently uses deterministic mock progress generated from Phase 2 dataset:

- `learningPathSeeds`
- `lessonSeeds`
- `lessonStepSeeds`
- `vocabularySeeds`
- `categorySeeds`

This keeps the UI usable before Supabase user progress is connected.

## Next step

Phase 4 should turn Vocabulary 10K into a real learning system:

- Search and filter vocabulary.
- Word detail page.
- Flashcards.
- Spaced repetition queue.
- User word progress actions.
- Favorite words.
- AI sentence generator button.

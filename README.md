# LinguaQuest AI — Phase 1 Project Setup

เว็บแอพเรียนภาษาอังกฤษและภาษาจีนกลางสำหรับผู้ใช้ไทย ตั้งแต่ A1-C1 พร้อมโครงสร้างต่อยอดเป็นระบบจริง: Vocabulary 10K, Speaking, Listening, Reading, Writing, Grammar, AI Tutor, Review, Dashboard, Admin CMS และ CSV/JSON Import

## Tech Stack

- Next.js + TypeScript + App Router
- Tailwind CSS v4 style
- Reusable UI components inspired by shadcn/ui
- Framer Motion
- Supabase SSR client scaffold
- Prisma + PostgreSQL schema scaffold
- PWA manifest
- Mock data พร้อมต่อ database ใน Phase 2

## Run

```bash
npm install
cp .env.example .env
npm run dev
```

เปิดเว็บที่:

```bash
http://localhost:3000
```

## Database Setup for Phase 2

ตั้งค่า `DATABASE_URL` และ `DIRECT_URL` ใน `.env` แล้วรัน:

```bash
npm run prisma:generate
npm run prisma:push
npm run seed
```

## Important Routes

- `/` Landing page
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

## Created Structure

```txt
app/
  api/health/route.ts
  api/vocabulary/route.ts
  auth/login/page.tsx
  auth/register/page.tsx
  dashboard/page.tsx
  vocabulary/page.tsx
  speaking/page.tsx
  listening/page.tsx
  reading/page.tsx
  writing/page.tsx
  ai-tutor/page.tsx
  review/page.tsx
  admin/*
components/
  ui/*
  layout/*
  dashboard/*
  vocabulary/*
lib/
  data/*
  supabase/*
  ai/prompt-templates.ts
prisma/
  schema.prisma
  seed.ts
data/
  vocabulary-template.csv
```

## Phase 1 Done

- Project config
- Theme + global CSS
- Dark/light mode
- Sidebar + mobile bottom nav
- Landing page
- Auth UI scaffold
- Dashboard with stats, progress, missions
- Learning path cards
- Vocabulary mock system
- Speaking/listening/reading/writing UI scaffold
- AI Tutor scaffold
- Review flashcard scaffold
- Admin CMS scaffold
- Prisma schema scaffold
- Seed data scaffold
- CSV import template
- API mock routes

## Next Phase

Phase 2 ควรทำ Database & Mock Data เต็มระบบ:

1. ขยาย Prisma schema ให้ครบทุก table
2. สร้าง English vocab sample 100 คำ
3. สร้าง Chinese vocab sample 100 คำ
4. สร้าง lessons 30 บท
5. สร้าง quiz 100 ข้อ
6. ต่อ Supabase Auth จริง
7. ต่อ Prisma query จากหน้า vocabulary/dashboard

# Phase 1 — English Lesson + Test Center Upgrade

วันที่เริ่ม: 2026-06-27
Branch: `phase1-english-test-center`

## เป้าหมาย Phase 1

เริ่มจากฐานที่ปลอดภัยก่อน เพื่อคง logic เดิมของ LinguaQuest AI และไม่ทำให้ภาษาจีนที่มีอยู่พัง

- เพิ่ม type สำหรับ Question Bank, Test Center, Test Result
- เพิ่ม mock data ที่สมจริงพอสำหรับต่อ database จริง
- เพิ่มหน้า `/tests`
- เพิ่ม API เริ่มทำข้อสอบและส่งคำตอบ
- เพิ่ม AI endpoint สำหรับอธิบายคำตอบผิดและสร้างแบบฝึกเพิ่ม
- เพิ่ม unit test สำหรับ quiz scoring และ CEFR recommendation

## ของเดิมที่ตรวจพบ

โปรเจกต์มีโครงหลักพร้อมแล้ว:

- Next.js App Router + TypeScript
- Prisma schema มี enum ภาษาอังกฤษ/จีน, CEFR, skill, exercise type
- มี Vocabulary, Lesson, LessonStep, Exercise, QuizQuestion, ReviewQueue, PlacementTestResult, DailyMission
- มีหน้า `/learn`, `/lessons/[id]`, `/dashboard`, `/review`, `/ai-tutor`, `/admin`
- มี mock seed ใน `lib/data/phase2-dataset.ts`
- มี SRS helper และ unit test แล้ว
- มี QA script: `npm run qa`

## ไฟล์ที่เพิ่ม/แก้ใน Phase 1

### แก้

- `types/index.ts`
  - เพิ่ม `QuestionType`
  - เพิ่ม `TestType`
  - เพิ่ม `DifficultyBand`
  - เพิ่ม `QuestionBankItem`
  - เพิ่ม `TestDefinition`
  - เพิ่ม `TestSubmissionAnswer`
  - เพิ่ม `TestResult`

- `lib/navigation.ts`
  - เพิ่มเมนู `Tests` ไปที่ `/tests`

### เพิ่ม

- `lib/data/test-center.ts`
  - mock question bank ภาษาอังกฤษ
  - starter question ภาษาจีนเพื่อรักษา compatibility
  - test definitions: English Placement, Daily Challenge, Chinese starter
  - helper: `getTests`, `getTestById`, `getQuestionsForTest`
  - scoring: `scoreTestSubmission`
  - CEFR: `recommendCefrLevel`
  - study plan: `buildStudyPlanTh`

- `app/tests/page.tsx`
  - หน้า Test Center แบบ card-based UI
  - แยก English tests และ Chinese compatibility
  - แสดง published tests, question coverage, skills covered

- `app/api/tests/start/route.ts`
  - `GET /api/tests/start?testId=placement-english-core`
  - `POST /api/tests/start`
  - คืนโจทย์โดยไม่ส่งเฉลยกลับไป frontend

- `app/api/tests/submit/route.ts`
  - `POST /api/tests/submit`
  - คำนวณ score, skill breakdown, weakness tags, recommended level, study plan

- `app/api/tests/result/[id]/route.ts`
  - placeholder สำหรับ Phase 2 ที่จะ persist result ลง Prisma/Supabase

- `app/api/quiz/submit/route.ts`
  - endpoint กลางสำหรับ lesson quiz submission
  - คืน `reviewQuestionIds` สำหรับต่อ Review Queue

- `app/api/ai/explain-answer/route.ts`
  - AI Tutor อธิบายคำตอบผิดเป็นภาษาไทยแบบสั้น
  - มี fallback ถ้ายังไม่เปิด AI provider

- `app/api/ai/generate-practice/route.ts`
  - สร้างแบบฝึกเพิ่มจาก weakness tags
  - มี fallback mock

- `lib/data/test-center.test.ts`
  - test published English/Chinese seed
  - test question loading
  - test scoring
  - test CEFR recommendation
  - test dashboard coverage summary

## Phase 2 ที่ควรทำต่อ

1. เพิ่ม Prisma models แบบ backward compatible
   - `QuestionBank`
   - `TestDefinition`
   - `TestAttempt`
   - `TestAnswer`
   - `LessonProgress`
   - `UserAchievement`

2. เชื่อม `/api/tests/submit` กับ database จริง
   - บันทึก attempt
   - บันทึก wrong questions
   - เพิ่มเข้า Review Queue
   - update XP / streak / badge

3. อัปเกรด `/lessons/[id]`
   - lesson stepper แบบเต็ม
   - Lesson Overview, Warm-up, Vocabulary, Grammar, Dialogue, Listening, Speaking, Reading, Writing, Quiz, Result
   - auto save progress ผ่าน API แทน localStorage อย่างเดียว

4. เพิ่ม Admin Question Bank
   - CRUD questions
   - import CSV/JSON
   - filter level/skill/category
   - publish/unpublish

5. เพิ่ม content IT / Network English แบบเต็ม
   - Helpdesk English
   - Network Engineer English
   - Incident Report English
   - Meeting English for IT

## QA ที่ต้องรันหลัง pull branch

```bash
npm install
npm run typecheck
npm run lint
npm run test
npm run build
npm run qa
```

หมายเหตุ: Phase 1 นี้ยังไม่แก้ Prisma schema เพื่อหลีกเลี่ยงความเสี่ยง data เดิมหาย และเพื่อให้เริ่มจาก data/type/API layer ก่อน

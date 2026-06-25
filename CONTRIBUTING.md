# Contributing to LinguaQuest AI

ขอบคุณที่สนใจช่วยพัฒนาโปรเจกต์นี้! เอกสารนี้สรุปขั้นตอนเบื้องต้นสำหรับการ contribute

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

ดูรายละเอียดการตั้งค่าฉบับเต็มได้ใน [README.md](./README.md)

## Before opening a pull request

Run the full QA pipeline locally and make sure it's green:

```bash
npm run qa
# = typecheck + lint + test + build
```

Individually:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

If you add new business logic in `lib/`, please add or update unit tests under the matching `*.test.ts` file.

## Database changes

This project uses Prisma migrations for schema changes (`prisma/migrations`).

- Local prototyping only: `npm run prisma:push`
- Real schema changes: `npm run prisma:migrate:dev -- --name <short_description>`
- Deploying to production: `npm run prisma:migrate:deploy`

Please commit generated migration SQL files together with schema changes.

## Commit / PR style

- Keep commits focused.
- Describe why a change is needed, not just what changed.
- Link any related issue in the PR description.
- CI (`.github/workflows/qa.yml`) must pass before merge.

## Reporting bugs / suggesting features

Please open a GitHub Issue with expected behavior, actual behavior, and steps to reproduce.

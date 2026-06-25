# Security Policy

## Supported versions

This project tracks a single `main` branch. Only the latest commit on `main` receives security fixes.

## Reporting a vulnerability

Please do not open a public issue for sensitive security reports.

Instead:

1. Email the maintainer directly with a description, impact, steps to reproduce, and relevant logs or screenshots.
2. Allow a reasonable amount of time for a fix before any public disclosure.

## Scope notes specific to this project

- AI and speech endpoints call paid third-party AI providers. They are protected by a basic per-IP rate limiter (`lib/rate-limit.ts`), but that limiter is in-memory and per-instance. For multi-instance production deployments, replace it with a shared store such as Upstash Redis.
- Environment variables: never commit `.env` or real API keys. Use `.env.example` as the template and `npm run env:check` to validate your local setup.
- Database: production schema changes should go through Prisma migrations (`npm run prisma:migrate:deploy`), not `prisma db push`, so changes are auditable and reversible.

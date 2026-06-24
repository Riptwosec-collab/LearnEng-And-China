# Deployment Runbook

## Local readiness

```bash
npm install
cp .env.example .env
npm run env:check
npm run prisma:generate
npm run prisma:push
npm run seed
npm run content:expand
npm run qa
```

For a larger vocabulary dataset:

```bash
npm run content:10k
```

## Vercel readiness

1. Import the GitHub repository into Vercel.
2. Keep the framework preset as Next.js.
3. Copy production environment values from your real providers into Vercel project settings.
4. Deploy after the environment check passes locally.
5. Test the deployment with:

```bash
SMOKE_TEST_URL=https://your-app.vercel.app npm run smoke
```

## Manual pages to test

- Login and register
- Dashboard
- Vocabulary search and detail
- Review and flashcards
- Speaking and roleplay
- Listening
- Reading
- Writing
- Grammar
- AI Tutor
- Admin overview
- Admin vocabulary
- Admin lessons
- Admin import

## Notes

The codebase now has production setup scripts, but real account creation, real environment values, and custom domain ownership must be completed in your own provider dashboards.

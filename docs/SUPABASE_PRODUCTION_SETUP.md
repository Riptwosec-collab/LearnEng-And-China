# Supabase Production Setup

This project already contains Prisma models, Supabase SSR clients, auth callback routes, and DB-backed API routes. This guide covers the manual setup that still requires your own Supabase account values.

## 1. Create project

1. Open Supabase Dashboard.
2. Create a new project.
3. Choose the closest region to users, for example Singapore for Thailand.
4. Wait until the database is ready.

## 2. Copy values

Add these values to `.env` locally and to Vercel Environment Variables later.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
DATABASE_URL=
DIRECT_URL=
```

Use the pooled connection string for `DATABASE_URL` and the direct connection string for `DIRECT_URL`.

## 3. Configure Auth URLs

In Supabase Authentication settings, add:

```txt
http://localhost:3000/auth/callback
https://your-vercel-domain.vercel.app/auth/callback
```

Set the site URL to your production domain after Vercel deployment.

## 4. Push schema and seed data

```bash
npm run env:check
npm run prisma:generate
npm run prisma:push
npm run seed
```

## 5. Expand vocabulary

Default expansion creates 1,000 rows total, 500 English and 500 Chinese.

```bash
npm run content:expand
```

For 10,000+ rows total:

```bash
EXPANDED_VOCAB_PER_LANGUAGE=5000 npm run content:expand
```

## 6. Verify

```bash
npm run qa
npm run smoke
```

Then open these pages:

- `/auth/login`
- `/dashboard`
- `/vocabulary`
- `/speaking`
- `/ai-tutor`
- `/admin`

## 7. Notes

- Do not commit real environment values.
- Keep service role values only in server environments.
- Use mock mode during development if AI or speech keys are not ready.

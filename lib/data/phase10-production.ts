export const envChecklist = [
  { key: "DATABASE_URL", required: true, purpose: "Database connection" },
  { key: "DIRECT_URL", required: true, purpose: "Migration connection" },
  { key: "NEXT_PUBLIC_SUPABASE_URL", required: true, purpose: "Supabase client" },
  { key: "NEXT_PUBLIC_SUPABASE_ANON_KEY", required: true, purpose: "Supabase public key" },
  { key: "OPENAI_API_KEY", required: false, purpose: "AI features" },
  { key: "NEXT_PUBLIC_APP_URL", required: false, purpose: "App URL" }
];

export const securityChecklist = [
  "Protect admin routes with session and role checks.",
  "Validate import rows before saving.",
  "Use server routes for privileged actions.",
  "Add rate limits for AI and import endpoints.",
  "Store progress by user id.",
  "Keep audit logs for admin actions."
];

export const performanceBudget = [
  { metric: "FCP", target: "under 1.8s" },
  { metric: "LCP", target: "under 2.5s" },
  { metric: "Mock API", target: "under 200ms" },
  { metric: "Vocabulary page", target: "paginate after 50 rows" }
];

export const deploymentSteps = [
  "Create Supabase project.",
  "Run prisma generate and prisma push.",
  "Seed content.",
  "Add environment variables in hosting.",
  "Deploy main branch.",
  "Test PWA install on mobile."
];

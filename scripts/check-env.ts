type EnvRule = {
  name: string;
  requiredWhen?: () => boolean;
  hint: string;
};

const provider = (process.env.AI_PROVIDER ?? "openai").toLowerCase();
const mockAi = process.env.NEXT_PUBLIC_ENABLE_MOCK_AI !== "false";
const mockSpeech = process.env.NEXT_PUBLIC_ENABLE_MOCK_SPEECH !== "false";
const production = process.env.NODE_ENV === "production";

const rules: EnvRule[] = [
  {
    name: "NEXT_PUBLIC_SUPABASE_URL",
    hint: "Supabase project URL from Project Settings > API."
  },
  {
    name: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    hint: "Supabase anon public key from Project Settings > API."
  },
  {
    name: "DATABASE_URL",
    hint: "Supabase pooled PostgreSQL connection string for Prisma."
  },
  {
    name: "DIRECT_URL",
    hint: "Supabase direct PostgreSQL connection string for migrations/db push."
  },
  {
    name: "OPENAI_API_KEY",
    requiredWhen: () => provider === "openai" && !mockAi,
    hint: "Required when AI_PROVIDER=openai and mock AI is disabled."
  },
  {
    name: "OPENROUTER_API_KEY",
    requiredWhen: () => provider === "openrouter" && !mockAi,
    hint: "Required when AI_PROVIDER=openrouter and mock AI is disabled."
  },
  {
    name: "GEMINI_API_KEY",
    requiredWhen: () => provider === "gemini" && !mockAi,
    hint: "Required when AI_PROVIDER=gemini and mock AI is disabled."
  },
  {
    name: "GROQ_API_KEY",
    requiredWhen: () => provider === "groq" && !mockAi,
    hint: "Required when AI_PROVIDER=groq and mock AI is disabled."
  },
  {
    name: "OPENAI_API_KEY",
    requiredWhen: () => provider !== "groq" && !mockSpeech,
    hint: "Required when mock speech is disabled and AI_PROVIDER is not groq."
  },
  {
    name: "GROQ_API_KEY",
    requiredWhen: () => provider === "groq" && !mockSpeech,
    hint: "Required when AI_PROVIDER=groq and mock speech is disabled."
  },
  {
    name: "UPSTASH_REDIS_REST_URL",
    requiredWhen: () => production,
    hint: "Required in production so rate limits are shared across serverless instances."
  },
  {
    name: "UPSTASH_REDIS_REST_TOKEN",
    requiredWhen: () => production,
    hint: "Required in production so rate limits are shared across serverless instances."
  }
];

const missing = rules.filter((rule) => {
  const isRequired = rule.requiredWhen ? rule.requiredWhen() : true;
  return isRequired && !process.env[rule.name];
});

console.log("LinguaQuest production environment check");
console.log(`AI provider: ${provider}`);
console.log(`Mock AI: ${mockAi ? "on" : "off"}`);
console.log(`Mock speech: ${mockSpeech ? "on" : "off"}`);
console.log(`Production mode: ${production ? "yes" : "no"}`);

if (missing.length > 0) {
  console.error("\nMissing required environment values:");
  for (const item of missing) {
    console.error(`- ${item.name}: ${item.hint}`);
  }
  process.exit(1);
}

console.log("\nEnvironment looks ready for database setup and QA.");

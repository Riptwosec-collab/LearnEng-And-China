import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  DATABASE_URL: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  NEXT_PUBLIC_ENABLE_MOCK_AI: z.string().default("true"),
  NEXT_PUBLIC_ENABLE_MOCK_SPEECH: z.string().default("true")
});

export const env = envSchema.parse(process.env);
export const isMockAiEnabled = env.NEXT_PUBLIC_ENABLE_MOCK_AI === "true";

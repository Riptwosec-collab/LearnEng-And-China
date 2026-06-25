# AI Provider Setup

LinguaQuest AI supports multiple text AI providers through one wrapper.

## Option A: Groq

Use this when you want a fast free-tier-friendly provider for AI Tutor, Writing Correction, Quiz Generator, STT and TTS.

```env
AI_PROVIDER=groq
AI_TEXT_MODEL=llama-3.1-8b-instant
GROQ_API_KEY=replace_me
GROQ_TEXT_MODEL=llama-3.1-8b-instant
GROQ_STT_MODEL=whisper-large-v3-turbo
GROQ_TTS_MODEL=playai-tts
GROQ_TTS_VOICE=Fritz-PlayAI
NEXT_PUBLIC_ENABLE_MOCK_AI=false
NEXT_PUBLIC_ENABLE_MOCK_SPEECH=false
```

## Option B: OpenRouter

Use this when you want one key that can route to many models.

```env
AI_PROVIDER=openrouter
AI_TEXT_MODEL=google/gemini-flash-1.5
OPENROUTER_API_KEY=replace_me
OPENROUTER_TEXT_MODEL=google/gemini-flash-1.5
NEXT_PUBLIC_ENABLE_MOCK_AI=false
```

## Option C: Gemini

Use this when you want Google Gemini directly.

```env
AI_PROVIDER=gemini
AI_TEXT_MODEL=gemini-1.5-flash
GEMINI_API_KEY=replace_me
GEMINI_TEXT_MODEL=gemini-1.5-flash
NEXT_PUBLIC_ENABLE_MOCK_AI=false
```

## Option D: OpenAI

Use this when you want the original OpenAI setup.

```env
AI_PROVIDER=openai
AI_TEXT_MODEL=gpt-4.1-mini
OPENAI_API_KEY=replace_me
OPENAI_TEXT_MODEL=gpt-4.1-mini
NEXT_PUBLIC_ENABLE_MOCK_AI=false
```

## Notes

- Do not commit real provider keys into GitHub.
- Add real values only in local `.env` or Vercel Environment Variables.
- AI Tutor, Writing Correction, and Quiz Generator use the same provider wrapper.
- Speech STT/TTS can use Groq when `AI_PROVIDER=groq`, otherwise it falls back to OpenAI speech endpoints.

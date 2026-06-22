import OpenAI from "openai";

export function hasOpenAiKey() {
  return Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "YOUR_OPENAI_API_KEY");
}

export function getOpenAiClient() {
  if (!hasOpenAiKey()) return null;
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export function getTextModel() {
  return process.env.OPENAI_TEXT_MODEL || "gpt-4.1-mini";
}

export function getSpeechModel() {
  return process.env.OPENAI_SPEECH_MODEL || "gpt-4o-mini-tts";
}

export function getTranscribeModel() {
  return process.env.OPENAI_TRANSCRIBE_MODEL || "gpt-4o-mini-transcribe";
}

export function safeJsonParse<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

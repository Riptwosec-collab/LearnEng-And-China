export const vocabularyImportColumns = [
  "language",
  "word",
  "chinese_hanzi",
  "pinyin",
  "ipa",
  "thai_pronunciation",
  "thai_meaning",
  "part_of_speech",
  "cefr_level",
  "hsk_level",
  "category",
  "subcategory",
  "example_sentence",
  "example_translation_th",
  "daily_life_sentence",
  "formal_sentence",
  "casual_sentence",
  "synonym",
  "antonym",
  "collocation",
  "common_mistake",
  "mini_quiz_question",
  "mini_quiz_choices",
  "mini_quiz_answer",
  "tts_text",
  "audio_url",
  "difficulty_score",
  "frequency_score",
  "tags"
] as const;

export function validateVocabularyRow(row: Record<string, unknown>) {
  const required = ["language", "word", "thai_pronunciation", "thai_meaning", "part_of_speech", "cefr_level", "category", "example_sentence", "example_translation_th", "daily_life_sentence"];
  const missing = required.filter((key) => !row[key]);
  const language = String(row.language ?? "");
  const cefr = String(row.cefr_level ?? "");
  return {
    ok: missing.length === 0 && ["english", "chinese"].includes(language) && ["A1", "A2", "B1", "B2", "C1"].includes(cefr),
    missing,
    errors: [
      ...(!["english", "chinese"].includes(language) ? ["language must be english or chinese"] : []),
      ...(!["A1", "A2", "B1", "B2", "C1"].includes(cefr) ? ["cefr_level must be A1, A2, B1, B2 or C1"] : [])
    ]
  };
}

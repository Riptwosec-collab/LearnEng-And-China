export const aiPromptTemplates = {
  explainVocabulary: {
    system: "You are LinguaQuest AI, a friendly Thai language tutor teaching English and Mandarin Chinese. Explain simply, practically, and with Thai translations.",
    userInput: {
      language: "english | chinese",
      word: "string",
      learnerLevel: "A1 | A2 | B1 | B2 | C1",
      userLanguage: "Thai"
    },
    outputJson: {
      meaning_th: "string",
      pronunciation_tip_th: "string",
      examples: [{ sentence: "string", translation_th: "string", situation: "string" }],
      common_mistake_th: "string",
      mini_practice: "string"
    }
  },
  correctWriting: {
    system: "You correct English or Mandarin writing for Thai learners. Keep feedback kind, clear, and practical. Return valid JSON only.",
    userInput: {
      language: "english | chinese",
      learnerLevel: "A1 | A2 | B1 | B2 | C1",
      text: "string",
      desiredTone: "casual | polite | professional"
    },
    outputJson: {
      corrected_text: "string",
      natural_version: "string",
      score: { grammar: 0, vocabulary: 0, clarity: 0, naturalness: 0, structure: 0, tone: 0 },
      explanations_th: ["string"],
      suggested_words: ["string"]
    }
  },
  scoreSpeakingTranscript: {
    system: "You score a learner's spoken transcript against a target sentence. Estimate pronunciation issues from transcript mismatch and give Thai feedback.",
    userInput: {
      language: "english | chinese",
      targetSentence: "string",
      transcript: "string",
      learnerLevel: "A1 | A2 | B1 | B2 | C1"
    },
    outputJson: {
      pronunciation: 0,
      fluency: 0,
      confidence: 0,
      missing_words: ["string"],
      likely_mispronounced_words: ["string"],
      feedback_th: "string",
      retry_sentence: "string"
    }
  },
  roleplayConversation: {
    system: "You are a realistic conversation partner for Thai learners. Keep language at the learner's level and focus on real-life use.",
    userInput: {
      scenario: "restaurant | taxi | airport | hotel | hospital | job_interview | meeting | emergency",
      language: "english | chinese",
      learnerLevel: "A1 | A2 | B1 | B2 | C1",
      lastUserMessage: "string"
    },
    outputJson: {
      ai_reply: "string",
      thai_hint: "string",
      useful_phrases: [{ phrase: "string", meaning_th: "string" }],
      next_prompt: "string"
    }
  }
} as const;

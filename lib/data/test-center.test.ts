import { describe, expect, it } from "vitest";
import { getQuestionsForTest, getTestCenterSummary, getTests, recommendCefrLevel, scoreTestSubmission } from "@/lib/data/test-center";

describe("test center data", () => {
  it("keeps English tests and a Chinese starter test published", () => {
    const tests = getTests();

    expect(tests.some((test) => test.language === "english")).toBe(true);
    expect(tests.some((test) => test.language === "chinese")).toBe(true);
  });

  it("starts a placement test with published questions", () => {
    const questions = getQuestionsForTest("placement-english-core");

    expect(questions.length).toBeGreaterThan(0);
    expect(questions.every((question) => question.isPublished !== false)).toBe(true);
  });

  it("scores exact answers and returns skill breakdown", () => {
    const result = scoreTestSubmission({
      testId: "placement-english-core",
      now: new Date("2026-06-27T00:00:00.000Z"),
      answers: [
        { questionId: "qb-en-a1-vocab-reservation", answer: "การจอง" },
        { questionId: "qb-en-a1-grammar-be-verb", answer: "is" }
      ]
    });

    expect(result.score).toBeGreaterThanOrEqual(2);
    expect(result.total).toBeGreaterThan(result.score);
    expect(result.skillScores.vocabulary).toBe(100);
    expect(result.weaknessTags.length).toBeGreaterThan(0);
  });

  it("recommends CEFR level from placement percent", () => {
    expect(recommendCefrLevel(20)).toBe("A1");
    expect(recommendCefrLevel(40)).toBe("A2");
    expect(recommendCefrLevel(60)).toBe("B1");
    expect(recommendCefrLevel(76)).toBe("B2");
    expect(recommendCefrLevel(90)).toBe("C1");
  });

  it("summarizes question coverage for dashboard cards", () => {
    const summary = getTestCenterSummary();

    expect(summary.totalTests).toBeGreaterThan(0);
    expect(summary.englishQuestions).toBeGreaterThan(0);
    expect(summary.chineseQuestions).toBeGreaterThan(0);
    expect(summary.skillsCovered).toContain("grammar");
  });
});

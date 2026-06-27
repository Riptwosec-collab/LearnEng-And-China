import type { CefrLevel, VocabularyItem } from "@/types";
import { englishVocabulary600 as baseEnglishVocabulary } from "./vocabulary-english-600";

const extraWorkTerms: Array<[word: string, thaiMeaning: string]> = [
  ["job application", "ใบสมัครงาน"],
  ["cover letter", "จดหมายสมัครงาน"],
  ["resume summary", "สรุปประวัติในเรซูเม่"],
  ["interview question", "คำถามสัมภาษณ์"],
  ["salary expectation", "เงินเดือนที่คาดหวัง"],
  ["notice period", "ระยะเวลาแจ้งลาออก"],
  ["reference check", "การตรวจสอบบุคคลอ้างอิง"],
  ["trial period", "ช่วงทดลองงาน"],
  ["job offer", "ข้อเสนองาน"],
  ["career goal", "เป้าหมายอาชีพ"],
  ["technical interview", "สัมภาษณ์ด้านเทคนิค"],
  ["HR screening", "การคัดกรองโดย HR"],
  ["portfolio link", "ลิงก์พอร์ตโฟลิโอ"],
  ["work experience", "ประสบการณ์ทำงาน"],
  ["onboarding checklist", "เช็กลิสต์เริ่มงาน"]
];

function levelAt(index: number): CefrLevel {
  if (index < 150) return "A1";
  if (index < 300) return "A2";
  if (index < 420) return "B1";
  if (index < 520) return "B2";
  return "C1";
}

const supplement: VocabularyItem[] = extraWorkTerms.map(([word, thaiMeaning], index) => {
  const absoluteIndex = baseEnglishVocabulary.length + index;
  const level = levelAt(absoluteIndex);
  const id = `eng-${level.toLowerCase()}-work-${String(absoluteIndex + 1).padStart(3, "0")}`;

  return {
    id,
    language: "english",
    languageId: "lang-english",
    word,
    ipa: `/ˈ${word.replace(/[^a-zA-Z]+/g, ".").replace(/^\.|\.$/g, "")}/`,
    thaiPronunciation: `อ่านว่า ${word}`,
    thaiMeaning,
    partOfSpeech: "noun",
    cefrLevel: level,
    category: "work",
    categoryId: "work",
    subcategory: "job application and interview",
    exampleSentence: `I prepared my ${word} before the interview.`,
    exampleTranslationTh: `ฉันเตรียม${thaiMeaning}ก่อนการสัมภาษณ์`,
    dailyLifeSentence: `Can you help me review my ${word}?`,
    formalSentence: `Could you please review my ${word} before I submit it?`,
    casualSentence: `Can you check my ${word}?`,
    collocation: `${word} review, ${word} update, ${word} checklist`,
    commonMistake: `อย่าใช้ ${word} แทนคำสมัครงานทุกคำ ให้ดูว่าเป็นเอกสาร ขั้นตอน หรือคำถามสัมภาษณ์`,
    miniQuizQuestion: `What does '${word}' mean?`,
    miniQuizChoices: [thaiMeaning, "ห้องประชุม", "ค่าโดยสาร", "เครื่องมือครัว"],
    miniQuizAnswer: thaiMeaning,
    ttsText: word,
    difficultyScore: 35 + (index % 30),
    frequencyScore: 80 - (index % 20),
    tags: ["work", "job-application", "interview", "business-english", "work-english", level, "generated-600"],
    source: "generated_english_600",
    isPublished: true
  };
});

export const englishVocabulary600: VocabularyItem[] = [...baseEnglishVocabulary, ...supplement].slice(0, 600);

export const englishVocabulary600Summary = {
  source: "generated_english_600",
  count: englishVocabulary600.length,
  englishBaseCount: baseEnglishVocabulary.length,
  supplementCount: supplement.length,
  itNetworkCount: englishVocabulary600.filter((word) => word.tags.includes("it-support") || word.tags.includes("network-engineer")).length,
  businessCount: englishVocabulary600.filter((word) => word.tags.includes("business-english") || word.tags.includes("work-english")).length,
  travelCount: englishVocabulary600.filter((word) => word.tags.includes("travel-english")).length,
  dailyLifeCount: englishVocabulary600.filter((word) => !word.tags.includes("business-english") && !word.tags.includes("network-engineer")).length
};

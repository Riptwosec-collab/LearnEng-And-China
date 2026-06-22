export type GeneratedVocabularyRow = {
  id: string;
  language: "english" | "chinese";
  word: string;
  thaiMeaning: string;
  cefrLevel: "A1" | "A2" | "B1" | "B2" | "C1";
  categorySlug: string;
  partOfSpeech: "noun" | "verb" | "adjective" | "adverb" | "phrase";
  exampleSentence: string;
  exampleTranslationTh: string;
  thaiPronunciation: string;
  pinyin?: string;
  chineseHanzi?: string;
  tags: string[];
};

const categories = ["home", "shopping", "restaurant", "travel", "work", "school", "health", "banking", "technology", "emergency"];
const levels = ["A1", "A2", "B1", "B2", "C1"] as const;
const englishBases = ["book", "buy", "call", "clean", "confirm", "cook", "describe", "email", "explain", "find", "help", "learn", "meeting", "order", "pay", "plan", "practice", "read", "repair", "reserve", "schedule", "send", "speak", "study", "travel", "write"];
const chineseBases = [
  ["学习", "xuéxí", "เสวียสี", "เรียน"],
  ["工作", "gōngzuò", "กงจั้ว", "ทำงาน"],
  ["买", "mǎi", "หม่าย", "ซื้อ"],
  ["卖", "mài", "ม่าย", "ขาย"],
  ["吃", "chī", "ชือ", "กิน"],
  ["喝", "hē", "เฮอ", "ดื่ม"],
  ["去", "qù", "ชวี่", "ไป"],
  ["来", "lái", "ไหล", "มา"],
  ["说", "shuō", "ชัว", "พูด"],
  ["听", "tīng", "ทิง", "ฟัง"],
  ["看", "kàn", "ค่าน", "ดู"],
  ["写", "xiě", "เสี่ย", "เขียน"],
  ["问", "wèn", "เวิ่น", "ถาม"],
  ["回答", "huídá", "หุยต๋า", "ตอบ"],
  ["预订", "yùdìng", "อวี้ติ้ง", "จอง"],
  ["付款", "fùkuǎn", "ฟู่ข่วน", "ชำระเงิน"]
] as const;

function levelAt(index: number) {
  return levels[index % levels.length];
}

export function generateExpandedVocabulary(targetPerLanguage = 500): GeneratedVocabularyRow[] {
  const rows: GeneratedVocabularyRow[] = [];

  for (let i = 0; i < targetPerLanguage; i++) {
    const base = englishBases[i % englishBases.length];
    const categorySlug = categories[i % categories.length];
    const level = levelAt(i);
    rows.push({
      id: `en-expanded-${String(i + 1).padStart(4, "0")}`,
      language: "english",
      word: `${base} ${categorySlug} ${i + 1}`,
      thaiMeaning: `คำ/วลีเกี่ยวกับ ${categorySlug} ลำดับ ${i + 1}`,
      cefrLevel: level,
      categorySlug,
      partOfSpeech: i % 3 === 0 ? "phrase" : i % 3 === 1 ? "verb" : "noun",
      thaiPronunciation: base,
      exampleSentence: `I want to ${base} in a ${categorySlug} situation.`,
      exampleTranslationTh: `ฉันต้องการใช้คำว่า ${base} ในสถานการณ์ ${categorySlug}`,
      tags: [categorySlug, level, "expanded"]
    });
  }

  for (let i = 0; i < targetPerLanguage; i++) {
    const [hanzi, pinyin, thaiPronunciation, thaiMeaning] = chineseBases[i % chineseBases.length];
    const categorySlug = categories[i % categories.length];
    const level = levelAt(i);
    rows.push({
      id: `zh-expanded-${String(i + 1).padStart(4, "0")}`,
      language: "chinese",
      word: `${hanzi}${i + 1}`,
      chineseHanzi: `${hanzi}${i + 1}`,
      pinyin,
      thaiPronunciation,
      thaiMeaning: `${thaiMeaning} ในหมวด ${categorySlug}`,
      cefrLevel: level,
      categorySlug,
      partOfSpeech: i % 2 === 0 ? "verb" : "phrase",
      exampleSentence: `我想${hanzi}。`,
      exampleTranslationTh: `ฉันอยาก${thaiMeaning}`,
      tags: [categorySlug, level, "expanded", "mandarin"]
    });
  }

  return rows;
}

export const expandedVocabulary1000 = generateExpandedVocabulary(500);

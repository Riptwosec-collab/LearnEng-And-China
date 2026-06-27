import type { CefrLevel, VocabularyItem } from "@/types";
import { chineseVocabulary600 as baseChineseVocabulary } from "./vocabulary-chinese-600";

const supplementTerms: Array<[hanzi: string, pinyin: string, thaiPronunciation: string, thaiMeaning: string, categoryId: string, subcategory: string]> = [
  ["旅游计划", "lǚ yóu jì huà", "หลวี่ โหยว จี้ ฮว่า", "แผนท่องเที่ยว", "tourism", "advanced travel"],
  ["工作流程", "gōng zuò liú chéng", "กง จั้ว หลิว เฉิง", "ขั้นตอนการทำงาน", "work", "workplace Chinese"],
  ["会议记录", "huì yì jì lù", "ฮุ่ย อี้ จี้ ลู่", "บันทึกการประชุม", "meeting", "meeting Chinese"],
  ["客户需求", "kè hù xū qiú", "เค่อ ฮู่ ซวี ฉิว", "ความต้องการลูกค้า", "work", "business Chinese"],
  ["系统设置", "xì tǒng shè zhì", "ซี่ ถ่ง เซ่อ จื้อ", "การตั้งค่าระบบ", "computer", "IT Chinese"],
  ["网络故障", "wǎng luò gù zhàng", "หวั่ง ลั่ว กู้ จ้าง", "เหตุขัดข้องของเครือข่าย", "internet", "IT Chinese"],
  ["安全检查", "ān quán jiǎn chá", "อัน เฉวียน เจี่ยน ฉา", "การตรวจสอบความปลอดภัย", "airport", "travel Chinese"],
  ["酒店预订", "jiǔ diàn yù dìng", "จิ่ว เตี้ยน ยวี่ ติ้ง", "การจองโรงแรม", "hotel", "travel Chinese"],
  ["紧急联系", "jǐn jí lián xì", "จิ่น จี๋ เหลียน ซี่", "การติดต่อฉุกเฉิน", "emergency", "emergency Chinese"],
  ["银行转账", "yín háng zhuǎn zhàng", "หยิน หาง จ่วน จ้าง", "การโอนเงินธนาคาร", "money-transfer", "banking Chinese"],
  ["药品说明", "yào pǐn shuō míng", "เย่า ผิ่น ซัว หมิง", "คำอธิบายยา", "pharmacy", "health Chinese"],
  ["医院预约", "yī yuàn yù yuē", "อี เยวี่ยน ยวี่ เยว", "การนัดหมายโรงพยาบาล", "hospital", "health Chinese"],
  ["订单确认", "dìng dān què rèn", "ติ้ง ตาน เชวี่ย เริ่น", "การยืนยันคำสั่งซื้อ", "shopping", "shopping Chinese"],
  ["付款证明", "fù kuǎn zhèng míng", "ฟู่ ข่วน เจิ้ง หมิง", "หลักฐานการชำระเงิน", "bill-payment", "payment Chinese"],
  ["电脑维修", "diàn nǎo wéi xiū", "เตี้ยน หน่าว เหวย ซิว", "การซ่อมคอมพิวเตอร์", "computer", "IT Chinese"],
  ["软件更新", "ruǎn jiàn gēng xīn", "หร่วน เจี้ยน เกิง ซิน", "การอัปเดตซอฟต์แวร์", "computer", "IT Chinese"],
  ["客户回复", "kè hù huí fù", "เค่อ ฮู่ หุย ฟู่", "การตอบกลับลูกค้า", "email", "work Chinese"],
  ["项目进度", "xiàng mù jìn dù", "เซี่ยง มู่ จิ้น ตู้", "ความคืบหน้าโครงการ", "work", "work Chinese"]
];

const supplement: VocabularyItem[] = supplementTerms.map(([hanzi, pinyin, thaiPronunciation, thaiMeaning, categoryId, subcategory], index) => {
  const absoluteIndex = baseChineseVocabulary.length + index;
  const cefrLevel: CefrLevel = "C1";
  const id = `zh-hsk5-${categoryId}-${String(absoluteIndex + 1).padStart(3, "0")}`;

  return {
    id,
    language: "chinese",
    languageId: "lang-chinese",
    word: hanzi,
    chineseHanzi: hanzi,
    pinyin,
    thaiPronunciation,
    thaiMeaning,
    partOfSpeech: "noun",
    cefrLevel,
    hskLevel: 5,
    category: categoryId,
    categoryId,
    subcategory,
    exampleSentence: `我需要确认${hanzi}。`,
    exampleTranslationTh: `ฉันต้องยืนยัน${thaiMeaning}`,
    dailyLifeSentence: `请帮我看一下${hanzi}。`,
    formalSentence: `请问，您可以帮我确认${hanzi}吗？`,
    casualSentence: `这个${hanzi}可以吗？`,
    synonym: undefined,
    antonym: undefined,
    collocation: `确认${hanzi}, 处理${hanzi}, 需要${hanzi}`,
    commonMistake: `${hanzi} เป็นวลีจีนระดับสูงกว่า HSK พื้นฐาน ผู้เรียนไทยควรจำเป็นวลีทั้งก้อน ไม่ควรแปลทีละตัวแบบตรงตัว`,
    miniQuizQuestion: `คำว่า ${hanzi} แปลว่าอะไร?`,
    miniQuizChoices: [thaiMeaning, "โรงเรียน", "รถแท็กซี่", "กาแฟ"],
    miniQuizAnswer: thaiMeaning,
    ttsText: hanzi,
    audioUrl: undefined,
    difficultyScore: 70 + (index % 20),
    frequencyScore: 70 - (index % 15),
    tags: ["chinese", "HSK5", cefrLevel, categoryId, "generated-600", "work-chinese", "travel-chinese"],
    source: "generated_chinese_600",
    isPublished: true
  };
});

export const chineseVocabulary600: VocabularyItem[] = [...baseChineseVocabulary, ...supplement].slice(0, 600);

export const chineseVocabulary600Summary = {
  source: "generated_chinese_600",
  count: chineseVocabulary600.length,
  baseCount: baseChineseVocabulary.length,
  supplementCount: supplement.length,
  hsk1: chineseVocabulary600.filter((word) => word.hskLevel === 1).length,
  hsk2: chineseVocabulary600.filter((word) => word.hskLevel === 2).length,
  hsk3: chineseVocabulary600.filter((word) => word.hskLevel === 3).length,
  hsk4: chineseVocabulary600.filter((word) => word.hskLevel === 4).length,
  hsk5: chineseVocabulary600.filter((word) => word.hskLevel === 5).length,
  categories: Array.from(new Set(chineseVocabulary600.map((word) => word.categoryId ?? word.category)))
};

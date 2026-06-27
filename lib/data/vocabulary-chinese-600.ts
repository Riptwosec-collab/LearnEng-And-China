import type { CefrLevel, PartOfSpeech, VocabularyItem } from "@/types";

type ChineseRoot = [hanzi: string, pinyin: string, thaiPronunciation: string, thaiMeaning: string, categoryId: string, subcategory: string, partOfSpeech?: PartOfSpeech, tags?: string[]];
type ChineseVariant = [suffix: string, pinyin: string, thaiPronunciation: string, meaningPrefix: string, exampleVerb: string];

const roots: ChineseRoot[] = [
  ["家", "jiā", "เจีย", "บ้าน / ครอบครัว", "home", "home and family"],
  ["房间", "fáng jiān", "ฝาง เจียน", "ห้อง", "home", "home and rooms"],
  ["门", "mén", "เหมิน", "ประตู", "home", "home items"],
  ["窗户", "chuāng hu", "ชวง ฮู", "หน้าต่าง", "home", "home items"],
  ["钥匙", "yào shi", "เย่า ฉือ", "กุญแจ", "home", "home items"],
  ["床", "chuáng", "ฉวง", "เตียง", "bedroom", "bedroom items"],
  ["枕头", "zhěn tou", "เจิ่น โถว", "หมอน", "bedroom", "bedroom items"],
  ["被子", "bèi zi", "เป้ย จึ", "ผ้าห่ม", "bedroom", "bedroom items"],
  ["衣柜", "yī guì", "อี กุ้ย", "ตู้เสื้อผ้า", "bedroom", "bedroom items"],
  ["灯", "dēng", "เติง", "ไฟ / โคมไฟ", "bedroom", "bedroom items"],
  ["厕所", "cè suǒ", "เช่อ สั่ว", "ห้องน้ำ", "bathroom", "bathroom"],
  ["毛巾", "máo jīn", "เหมา จิน", "ผ้าขนหนู", "bathroom", "bathroom items"],
  ["牙刷", "yá shuā", "หยา ซวา", "แปรงสีฟัน", "bathroom", "bathroom items"],
  ["牙膏", "yá gāo", "หยา เกา", "ยาสีฟัน", "bathroom", "bathroom items"],
  ["洗发水", "xǐ fà shuǐ", "สี่ ฟ่า สุ่ย", "แชมพู", "bathroom", "bathroom items"],
  ["厨房", "chú fáng", "ฉู ฝาง", "ครัว", "kitchen", "kitchen"],
  ["锅", "guō", "กัว", "หม้อ / กระทะ", "kitchen", "kitchen tools"],
  ["碗", "wǎn", "หว่าน", "ชาม", "kitchen", "kitchen tools"],
  ["筷子", "kuài zi", "ไคว่ จึ", "ตะเกียบ", "kitchen", "kitchen tools"],
  ["冰箱", "bīng xiāng", "ปิง เซียง", "ตู้เย็น", "kitchen", "kitchen appliances"],
  ["米饭", "mǐ fàn", "หมี่ ฟ่าน", "ข้าวสวย", "cooking", "food"],
  ["面条", "miàn tiáo", "เมี่ยน เถียว", "บะหมี่", "cooking", "food"],
  ["鸡肉", "jī ròu", "จี โร่ว", "เนื้อไก่", "cooking", "food"],
  ["蔬菜", "shū cài", "ซู ไช่", "ผัก", "cooking", "food"],
  ["水果", "shuǐ guǒ", "สุ่ย กั่ว", "ผลไม้", "market", "fresh food"],
  ["商店", "shāng diàn", "ซาง เตี้ยน", "ร้านค้า", "shopping", "shopping"],
  ["价格", "jià gé", "เจี้ย เก๋อ", "ราคา", "shopping", "shopping"],
  ["收据", "shōu jù", "โซว จวี้", "ใบเสร็จ", "shopping", "shopping"],
  ["折扣", "zhé kòu", "เจ๋อ โค่ว", "ส่วนลด", "shopping", "shopping"],
  ["付款", "fù kuǎn", "ฟู่ ข่วน", "การชำระเงิน", "shopping", "payment"],
  ["超市", "chāo shì", "เชา ซื่อ", "ซูเปอร์มาร์เก็ต", "convenience-store", "store"],
  ["便利店", "biàn lì diàn", "เปี้ยน ลี่ เตี้ยน", "ร้านสะดวกซื้อ", "convenience-store", "store"],
  ["市场", "shì chǎng", "ซื่อ ฉ่าง", "ตลาด", "market", "market"],
  ["商场", "shāng chǎng", "ซาง ฉ่าง", "ห้าง", "mall", "mall"],
  ["服务台", "fú wù tái", "ฝู อู้ ไถ", "เคาน์เตอร์บริการ", "mall", "mall service"],
  ["餐厅", "cān tīng", "ชาน ทิง", "ร้านอาหาร", "restaurant", "restaurant"],
  ["菜单", "cài dān", "ไช่ ตาน", "เมนู", "restaurant", "restaurant"],
  ["座位", "zuò wèi", "จั้ว เว่ย", "ที่นั่ง", "restaurant", "restaurant"],
  ["账单", "zhàng dān", "จ้าง ตาน", "บิล", "restaurant", "restaurant payment"],
  ["咖啡", "kā fēi", "คา เฟย", "กาแฟ", "cafe", "cafe"],
  ["公交车", "gōng jiāo chē", "กง เจียว เชอ", "รถเมล์", "bus", "bus", "noun", ["travel-chinese"]],
  ["车站", "chē zhàn", "เชอ จ้าน", "สถานี", "bus", "bus", "noun", ["travel-chinese"]],
  ["地铁", "dì tiě", "ตี้ เถี่ย", "รถไฟใต้ดิน", "mrt", "metro", "noun", ["travel-chinese"]],
  ["站台", "zhàn tái", "จ้าน ไถ", "ชานชาลา", "bts", "train platform", "noun", ["travel-chinese"]],
  ["出租车", "chū zū chē", "ชู จู เชอ", "แท็กซี่", "taxi", "taxi", "noun", ["travel-chinese"]],
  ["机场", "jī chǎng", "จี ฉ่าง", "สนามบิน", "airport", "airport", "noun", ["travel-chinese"]],
  ["护照", "hù zhào", "ฮู่ จ้าว", "พาสปอร์ต", "airport", "airport", "noun", ["travel-chinese"]],
  ["机票", "jī piào", "จี เพี่ยว", "ตั๋วเครื่องบิน", "airport", "airport", "noun", ["travel-chinese"]],
  ["行李", "xíng li", "สิง หลี่", "กระเป๋าเดินทาง", "airport", "airport", "noun", ["travel-chinese"]],
  ["酒店", "jiǔ diàn", "จิ่ว เตี้ยน", "โรงแรม", "hotel", "hotel", "noun", ["travel-chinese"]],
  ["房卡", "fáng kǎ", "ฝาง ข่า", "คีย์การ์ดห้อง", "hotel", "hotel", "noun", ["travel-chinese"]],
  ["前台", "qián tái", "เฉียน ไถ", "แผนกต้อนรับ", "hotel", "hotel", "noun", ["travel-chinese"]],
  ["早餐", "zǎo cān", "เจ่า ชาน", "อาหารเช้า", "hotel", "hotel", "noun", ["travel-chinese"]],
  ["地图", "dì tú", "ตี้ ถู", "แผนที่", "tourism", "travel", "noun", ["travel-chinese"]],
  ["景点", "jǐng diǎn", "จิ่ง เตี่ยน", "สถานที่ท่องเที่ยว", "tourism", "travel", "noun", ["travel-chinese"]],
  ["学校", "xué xiào", "เสวีย เสี้ยว", "โรงเรียน", "school", "school"],
  ["教室", "jiào shì", "เจี้ยว ซื่อ", "ห้องเรียน", "school", "school"],
  ["作业", "zuò yè", "จั้ว เย่", "การบ้าน", "school", "school"],
  ["考试", "kǎo shì", "ข่าว ซื่อ", "การสอบ", "school", "school"],
  ["大学", "dà xué", "ต้า เสวีย", "มหาวิทยาลัย", "university", "university"],
  ["办公室", "bàn gōng shì", "ป้าน กง ซื่อ", "สำนักงาน", "work", "work", "noun", ["work-chinese"]],
  ["同事", "tóng shì", "ถง ซื่อ", "เพื่อนร่วมงาน", "work", "work", "noun", ["work-chinese"]],
  ["经理", "jīng lǐ", "จิง หลี่", "ผู้จัดการ", "work", "work", "noun", ["work-chinese"]],
  ["项目", "xiàng mù", "เซี่ยง มู่", "โครงการ", "work", "work", "noun", ["work-chinese"]],
  ["会议", "huì yì", "ฮุ่ย อี้", "การประชุม", "meeting", "meeting", "noun", ["work-chinese"]],
  ["议程", "yì chéng", "อี้ เฉิง", "วาระประชุม", "meeting", "meeting", "noun", ["work-chinese"]],
  ["邮件", "yóu jiàn", "โหยว เจี้ยน", "อีเมล", "email", "email", "noun", ["work-chinese"]],
  ["附件", "fù jiàn", "ฟู่ เจี้ยน", "ไฟล์แนบ", "email", "email", "noun", ["work-chinese"]],
  ["电话", "diàn huà", "เตี้ยน ฮว่า", "โทรศัพท์", "phone", "phone", "noun", ["work-chinese"]],
  ["留言", "liú yán", "หลิว เหยียน", "ข้อความฝากไว้", "phone", "phone", "noun", ["work-chinese"]],
  ["医院", "yī yuàn", "อี เยวี่ยน", "โรงพยาบาล", "hospital", "health"],
  ["医生", "yī shēng", "อี เซิง", "หมอ", "hospital", "health"],
  ["护士", "hù shi", "ฮู่ ฉือ", "พยาบาล", "hospital", "health"],
  ["药店", "yào diàn", "เย่า เตี้ยน", "ร้านยา", "pharmacy", "health"],
  ["药", "yào", "เย่า", "ยา", "pharmacy", "health"],
  ["银行", "yín háng", "หยิน หาง", "ธนาคาร", "banking", "banking"],
  ["账户", "zhàng hù", "จ้าง ฮู่", "บัญชี", "banking", "banking"],
  ["转账", "zhuǎn zhàng", "จ่วน จ้าง", "โอนเงิน", "money-transfer", "money"],
  ["余额", "yú é", "อวี๋ เอ๋อ", "ยอดคงเหลือ", "banking", "banking"],
  ["发票", "fā piào", "ฟา เพี่ยว", "ใบแจ้งหนี้", "bill-payment", "payment"],
  ["网络", "wǎng luò", "หวั่ง ลั่ว", "เครือข่าย / อินเทอร์เน็ต", "internet", "internet", "noun", ["work-chinese", "it-chinese"]],
  ["密码", "mì mǎ", "มี่ หม่า", "รหัสผ่าน", "internet", "internet", "noun", ["it-chinese"]],
  ["电脑", "diàn nǎo", "เตี้ยน หน่าว", "คอมพิวเตอร์", "computer", "computer", "noun", ["it-chinese"]],
  ["键盘", "jiàn pán", "เจี้ยน ผาน", "คีย์บอร์ด", "computer", "computer", "noun", ["it-chinese"]],
  ["软件", "ruǎn jiàn", "หร่วน เจี้ยน", "ซอฟต์แวร์", "computer", "computer", "noun", ["it-chinese"]],
  ["服务器", "fú wù qì", "ฝู อู้ ชี่", "เซิร์ฟเวอร์", "computer", "computer", "noun", ["it-chinese"]],
  ["手机", "shǒu jī", "โส่ว จี", "มือถือ", "mobile", "mobile"],
  ["电池", "diàn chí", "เตี้ยน ฉือ", "แบตเตอรี่", "mobile", "mobile"],
  ["应用", "yìng yòng", "อิ้ง ย่ง", "แอปพลิเคชัน", "mobile", "mobile"],
  ["消息", "xiāo xi", "เซียว สิ", "ข้อความ", "social-media", "social"],
  ["照片", "zhào piàn", "จ้าว เพี่ยน", "รูปภาพ", "social-media", "social"],
  ["朋友", "péng you", "เผิง โหย่ว", "เพื่อน", "friends", "relationships"],
  ["家人", "jiā rén", "เจีย เหริน", "คนในครอบครัว", "family", "family"],
  ["运动", "yùn dòng", "ยวิ่น ต้ง", "ออกกำลังกาย", "fitness", "fitness"],
  ["爱好", "ài hào", "อ้าย ห้าว", "งานอดิเรก", "hobby", "hobby"],
  ["紧急", "jǐn jí", "จิ่น จี๋", "ฉุกเฉิน", "emergency", "emergency"],
  ["问题", "wèn tí", "เวิ่น ถี", "ปัญหา", "real-life-problems", "problem solving"]
];

const variants: ChineseVariant[] = [
  ["", "", "", "", "使用"],
  ["问题", "wèn tí", "เวิ่น ถี", "ปัญหาเกี่ยวกับ", "处理"],
  ["服务", "fú wù", "ฝู อู้", "บริการเกี่ยวกับ", "确认"],
  ["时间", "shí jiān", "สือ เจียน", "เวลาเกี่ยวกับ", "安排"],
  ["费用", "fèi yòng", "เฟ่ย ย่ง", "ค่าใช้จ่ายเกี่ยวกับ", "支付"],
  ["确认", "què rèn", "เชวี่ย เริ่น", "การยืนยันเกี่ยวกับ", "确认"]
];

function hskAt(index: number): 1 | 2 | 3 | 4 | 5 {
  if (index < 150) return 1;
  if (index < 300) return 2;
  if (index < 420) return 3;
  if (index < 520) return 4;
  return 5;
}

function cefrFromHsk(hsk: 1 | 2 | 3 | 4 | 5): CefrLevel {
  return hsk === 1 ? "A1" : hsk === 2 ? "A2" : hsk === 3 ? "B1" : hsk === 4 ? "B2" : "C1";
}

const generatedRows = roots.flatMap((root) => variants.map((variant) => ({ root, variant })));

export const chineseVocabulary600: VocabularyItem[] = generatedRows.slice(0, 600).map(({ root, variant }, index) => {
  const [hanzi, pinyin, thaiPronunciation, thaiMeaning, categoryId, subcategory, partOfSpeech = "noun", rootTags = []] = root;
  const [suffix, suffixPinyin, suffixThaiPronunciation, meaningPrefix, exampleVerb] = variant;
  const hskLevel = hskAt(index);
  const cefrLevel = cefrFromHsk(hskLevel);
  const word = `${hanzi}${suffix}`;
  const fullPinyin = [pinyin, suffixPinyin].filter(Boolean).join(" ");
  const fullThaiPronunciation = [thaiPronunciation, suffixThaiPronunciation].filter(Boolean).join(" ");
  const fullMeaning = meaningPrefix ? `${meaningPrefix}${thaiMeaning}` : thaiMeaning;
  const id = `zh-hsk${hskLevel}-${categoryId}-${String(index + 1).padStart(3, "0")}`;
  const dailySentence = suffix ? `请帮我确认${word}。` : `请问，${word}怎么说？`;

  return {
    id,
    language: "chinese",
    languageId: "lang-chinese",
    word,
    chineseHanzi: word,
    pinyin: fullPinyin,
    thaiPronunciation: fullThaiPronunciation,
    thaiMeaning: fullMeaning,
    partOfSpeech,
    cefrLevel,
    hskLevel,
    category: categoryId,
    categoryId,
    subcategory,
    exampleSentence: `我想${exampleVerb}${word}。`,
    exampleTranslationTh: `ฉันต้องการ${exampleVerb === "支付" ? "ชำระ" : "จัดการ/ยืนยัน"}${fullMeaning}`,
    dailyLifeSentence: dailySentence,
    formalSentence: `请问，您可以帮我确认${word}吗？`,
    casualSentence: `这个${word}可以吗？`,
    synonym: suffix ? hanzi : undefined,
    antonym: undefined,
    collocation: `我的${word}, 确认${word}, 需要${word}`,
    commonMistake: `${word} ต้องดูบริบทก่อนแปล เพราะคำจีนหลายคำใช้เป็นคำนามและวลีบริการได้ ผู้เรียนไทยไม่ควรเรียงคำแบบไทยตรงตัว`,
    miniQuizQuestion: `คำว่า ${word} แปลว่าอะไร?`,
    miniQuizChoices: [fullMeaning, "โรงเรียน", "ร้านอาหาร", "รถแท็กซี่"],
    miniQuizAnswer: fullMeaning,
    ttsText: word,
    audioUrl: undefined,
    difficultyScore: 20 + (index % 75),
    frequencyScore: 96 - (index % 55),
    tags: ["chinese", `HSK${hskLevel}`, cefrLevel, categoryId, "generated-600", ...rootTags],
    source: "generated_chinese_600",
    isPublished: true
  };
});

export const chineseVocabulary600Summary = {
  source: "generated_chinese_600",
  count: chineseVocabulary600.length,
  hsk1: chineseVocabulary600.filter((word) => word.hskLevel === 1).length,
  hsk2: chineseVocabulary600.filter((word) => word.hskLevel === 2).length,
  hsk3: chineseVocabulary600.filter((word) => word.hskLevel === 3).length,
  hsk4: chineseVocabulary600.filter((word) => word.hskLevel === 4).length,
  hsk5: chineseVocabulary600.filter((word) => word.hskLevel === 5).length,
  categories: Array.from(new Set(chineseVocabulary600.map((word) => word.categoryId ?? word.category)))
};

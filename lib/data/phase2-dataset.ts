import type { Category, LearningPath, PartOfSpeech, Skill, VocabularyItem } from "@/types";

export const languageSeeds = [
  { id: "lang-english", code: "english", nameEn: "English", nameTh: "ภาษาอังกฤษ", description: "English for Thai learners from A1 to C1" },
  { id: "lang-chinese", code: "chinese", nameEn: "Mandarin Chinese", nameTh: "ภาษาจีนกลาง", description: "Mandarin with Hanzi, Pinyin, Thai pronunciation and tone practice" }
] as const;

const categoryRows = [
  ["home", "บ้าน", "Home", "🏠", "คำศัพท์และประโยคในบ้าน"],
  ["bedroom", "ห้องนอน", "Bedroom", "🛏️", "สิ่งของและกิจวัตรในห้องนอน"],
  ["bathroom", "ห้องน้ำ", "Bathroom", "🚿", "ของใช้และสถานการณ์ในห้องน้ำ"],
  ["kitchen", "ครัว", "Kitchen", "🍳", "อุปกรณ์ครัวและอาหาร"],
  ["cooking", "การทำอาหาร", "Cooking", "🥘", "ขั้นตอนทำอาหารและรสชาติ"],
  ["shopping", "ซื้อของ", "Shopping", "🛒", "ถามราคา จ่ายเงิน คืนสินค้า"],
  ["convenience-store", "ร้านสะดวกซื้อ", "Convenience Store", "🏪", "ซื้อของใกล้บ้าน"],
  ["market", "ตลาด", "Market", "🥬", "ซื้ออาหารสด ต่อราคา"],
  ["mall", "ห้าง", "Mall", "🏬", "ซื้อสินค้า โปรโมชัน ไซซ์"],
  ["restaurant", "ร้านอาหาร", "Restaurant", "🍽️", "จองโต๊ะ สั่งอาหาร จ่ายเงิน"],
  ["cafe", "คาเฟ่", "Cafe", "☕", "สั่งเครื่องดื่มและขนม"],
  ["travel", "เดินทาง", "Travel", "🧭", "การเดินทางทั่วไป"],
  ["bus", "รถเมล์", "Bus", "🚌", "ถามสายรถและป้ายรถเมล์"],
  ["bts", "BTS", "BTS Skytrain", "🚆", "เดินทางด้วย BTS"],
  ["mrt", "MRT", "MRT Subway", "🚇", "เดินทางด้วย MRT"],
  ["taxi", "แท็กซี่", "Taxi", "🚕", "บอกปลายทางและค่าโดยสาร"],
  ["airport", "สนามบิน", "Airport", "✈️", "เช็กอิน ตม. โหลดกระเป๋า"],
  ["hotel", "โรงแรม", "Hotel", "🏨", "จองห้อง เช็กอิน แจ้งปัญหา"],
  ["school", "โรงเรียน", "School", "🏫", "ชีวิตในโรงเรียน"],
  ["university", "มหาลัย", "University", "🎓", "เรียน งานกลุ่ม สอบ"],
  ["work", "ที่ทำงาน", "Work", "💼", "งานทั่วไปในออฟฟิศ"],
  ["meeting", "ประชุม", "Meeting", "🧑‍💼", "ประชุม รายงาน ถามความเห็น"],
  ["email", "อีเมล", "Email", "✉️", "เขียนและตอบอีเมล"],
  ["phone", "โทรศัพท์", "Phone Call", "☎️", "โทรศัพท์งานและชีวิตประจำวัน"],
  ["hospital", "โรงพยาบาล", "Hospital", "🏥", "บอกอาการ นัดหมอ"],
  ["pharmacy", "ร้านยา", "Pharmacy", "💊", "ซื้อยาและถามวิธีใช้"],
  ["fitness", "ออกกำลังกาย", "Fitness", "🏋️", "ยิม กีฬา สุขภาพ"],
  ["banking", "ธนาคาร", "Banking", "🏦", "เปิดบัญชี ฝากถอน"],
  ["money-transfer", "โอนเงิน", "Money Transfer", "💸", "โอนเงินและยืนยันยอด"],
  ["bill-payment", "ชำระบิล", "Bill Payment", "🧾", "จ่ายบิลและค่าบริการ"],
  ["internet", "อินเทอร์เน็ต", "Internet", "🌐", "ปัญหาเน็ตและแพ็กเกจ"],
  ["mobile", "มือถือ", "Mobile Phone", "📱", "มือถือ ซิม แอป"],
  ["computer", "คอมพิวเตอร์", "Computer", "💻", "คอมพิวเตอร์และซอฟต์แวร์"],
  ["social-media", "โซเชียล", "Social Media", "💬", "โพสต์ แชท คอมเมนต์"],
  ["relationships", "ความสัมพันธ์", "Relationships", "🤝", "คุยกับคนรู้จัก"],
  ["family", "ครอบครัว", "Family", "👨‍👩‍👧", "คนในครอบครัวและกิจกรรม"],
  ["friends", "เพื่อน", "Friends", "🧑‍🤝‍🧑", "นัดเจอและคุยกับเพื่อน"],
  ["hobby", "งานอดิเรก", "Hobbies", "🎮", "กิจกรรมยามว่าง"],
  ["tourism", "ท่องเที่ยว", "Tourism", "🧳", "เที่ยว ถามทาง จองกิจกรรม"],
  ["emergency", "ฉุกเฉิน", "Emergency", "🆘", "ขอความช่วยเหลือเร่งด่วน"],
  ["real-life-problems", "ปัญหาในชีวิตจริง", "Real-life Problems", "🛠️", "แจ้งปัญหา แก้สถานการณ์จริง"]
] as const;

export const categorySeeds: Category[] = categoryRows.map(([id, nameTh, nameEn, icon, description], index) => ({ id, slug: id, nameTh, nameEn, icon, description, order: index + 1, isDailyLife: true }));

const pathRows = [
  ["daily-life-english", "Daily Life English", "ใช้ภาษาอังกฤษในชีวิตประจำวัน", "english", "A1", 42, "8 weeks", ["vocabulary", "speaking", "listening"]],
  ["daily-life-chinese", "Daily Life Chinese", "จีนกลางพื้นฐานพร้อม pinyin และคำอ่านไทย", "chinese", "A1", 40, "8 weeks", ["vocabulary", "speaking", "listening"]],
  ["travel-english", "Travel English", "สนามบิน โรงแรม แท็กซี่ ถามทาง", "english", "A2", 36, "6 weeks", ["speaking", "listening", "reading"]],
  ["travel-chinese", "Travel Chinese", "จีนสำหรับท่องเที่ยวและสถานการณ์จริง", "chinese", "A2", 34, "6 weeks", ["speaking", "listening", "reading"]],
  ["work-english", "Work English", "อีเมล ประชุม โทรศัพท์ และงาน", "english", "B1", 36, "10 weeks", ["speaking", "writing", "grammar"]],
  ["work-chinese", "Work Chinese", "ภาษาจีนสำหรับงานและประชุม", "chinese", "B1", 32, "10 weeks", ["speaking", "writing", "grammar"]],
  ["school-university", "School & University", "เรียน งานกลุ่ม สอบ", "english", "A2", 30, "7 weeks", ["reading", "writing", "vocabulary"]],
  ["conversation-booster", "Conversation Booster", "เพิ่มความมั่นใจการสนทนา", "english", "B1", 28, "6 weeks", ["conversation", "pronunciation", "speaking"]],
  ["vocabulary-10k", "Vocabulary 10K", "ระบบคำศัพท์ใหญ่พร้อม SRS", "english", "A1", 100, "ongoing", ["vocabulary"]],
  ["grammar-in-use", "Grammar in Use", "Grammar ผูกกับสถานการณ์จริง", "english", "A2", 45, "9 weeks", ["grammar", "writing", "speaking"]],
  ["reading-lab", "Reading Lab", "อ่านบทความสั้นและข่าวง่าย", "english", "A2", 40, "8 weeks", ["reading", "vocabulary"]],
  ["listening-lab", "Listening Lab", "ฟังบทสนทนา dictation และ quiz", "english", "A1", 40, "8 weeks", ["listening", "vocabulary"]],
  ["writing-lab", "Writing Lab", "เขียน diary email chat caption", "english", "B1", 35, "8 weeks", ["writing", "grammar"]],
  ["speaking-lab", "Speaking Lab", "ฝึกพูด อัดเสียง roleplay", "english", "A1", 45, "8 weeks", ["speaking", "pronunciation"]],
  ["interview-mode", "Interview Mode", "เตรียมสัมภาษณ์งาน", "english", "B2", 24, "5 weeks", ["speaking", "writing"]],
  ["exam-mode", "Exam Mode", "ข้อสอบ mock grammar reading listening", "english", "B1", 30, "6 weeks", ["reading", "listening", "grammar"]],
  ["emergency-communication", "Emergency Communication", "ประโยคจำเป็นเมื่อฉุกเฉิน", "english", "A2", 20, "3 weeks", ["speaking", "listening"]],
  ["ai-roleplay-mode", "AI Roleplay Mode", "ซ้อมคุยกับ AI ในสถานการณ์จริง", "english", "A1", 60, "ongoing", ["conversation", "speaking"]]
] as const;

export const learningPathSeeds: LearningPath[] = pathRows.map(([id, title, description, language, level, lessonCount, estimatedTime, skillFocus], index) => ({
  id, title, description, language, level, lessonCount, estimatedTime, skillFocus: [...skillFocus] as Skill[], progress: index < 6 ? [34, 18, 9, 0, 12, 0][index] : 0, isLocked: false, recommendedNextLesson: "เริ่มบทเรียนถัดไป", order: index + 1, isPublished: true
}));

const englishWords = ["address", "blanket", "toothbrush", "stove", "boil", "receipt", "cashier", "discount", "size", "reservation", "latte", "ticket", "bus stop", "platform", "station", "destination", "passport", "booking", "classroom", "assignment", "deadline", "agenda", "attachment", "voicemail", "appointment", "medicine", "workout", "account", "transfer", "bill", "connection", "battery", "keyboard", "comment", "neighbor", "parents", "hang out", "photography", "itinerary", "emergency", "complaint"] as const;
const englishMeanings = ["ที่อยู่", "ผ้าห่ม", "แปรงสีฟัน", "เตา", "ต้ม", "ใบเสร็จ", "แคชเชียร์", "ส่วนลด", "ขนาด", "การจอง", "ลาเต้", "ตั๋ว", "ป้ายรถเมล์", "ชานชาลา", "สถานี", "ปลายทาง", "หนังสือเดินทาง", "การจอง", "ห้องเรียน", "งานที่ได้รับมอบหมาย", "กำหนดส่ง", "วาระประชุม", "ไฟล์แนบ", "ข้อความเสียง", "นัดหมาย", "ยา", "ออกกำลังกาย", "บัญชี", "โอนเงิน", "บิล", "การเชื่อมต่อ", "แบตเตอรี่", "แป้นพิมพ์", "ความคิดเห็น", "เพื่อนบ้าน", "พ่อแม่", "ไปเที่ยว/ใช้เวลาด้วยกัน", "การถ่ายภาพ", "แผนการเดินทาง", "เหตุฉุกเฉิน", "การร้องเรียน"] as const;
const chineseWords = ["地址", "被子", "牙刷", "厨房", "煮", "收据", "收银员", "便宜", "大小", "订位", "拿铁", "票", "公交站", "站台", "车站", "目的地", "护照", "预订", "教室", "作业", "截止日期", "议程", "附件", "留言", "预约", "药", "锻炼", "账户", "转账", "账单", "网络", "电池", "键盘", "评论", "邻居", "父母", "朋友", "摄影", "行程", "紧急", "投诉"] as const;
const pinyinRows = ["dì zhǐ", "bèi zi", "yá shuā", "chú fáng", "zhǔ", "shōu jù", "shōu yín yuán", "pián yi", "dà xiǎo", "dìng wèi", "ná tiě", "piào", "gōng jiāo zhàn", "zhàn tái", "chē zhàn", "mù dì dì", "hù zhào", "yù dìng", "jiào shì", "zuò yè", "jié zhǐ rì qī", "yì chéng", "fù jiàn", "liú yán", "yù yuē", "yào", "duàn liàn", "zhàng hù", "zhuǎn zhàng", "zhàng dān", "wǎng luò", "diàn chí", "jiàn pán", "píng lùn", "lín jū", "fù mǔ", "péng you", "shè yǐng", "xíng chéng", "jǐn jí", "tóu sù"] as const;
const thaiPronRows = ["ตี้ จื่อ", "เป้ย จึ", "หยา ซวา", "ฉู ฝาง", "จู่", "โซว จวี้", "โซว หยิน หยวน", "เผียน อี", "ต้า เสี่ยว", "ติ้ง เว่ย", "หนา เถี่ย", "เพี่ยว", "กง เจียว จ้าน", "จ้าน ไถ", "เชอ จ้าน", "มู่ ตี้ ตี้", "ฮู่ จ้าว", "ยวี่ ติ้ง", "เจี้ยว ซื่อ", "จั้ว เย่", "เจี๋ย จื่อ รื่อ ชี", "อี้ เฉิง", "ฟู่ เจี้ยน", "หลิว เหยียน", "ยวี่ เยว", "เย่า", "ต้วน เลี่ยน", "จ้าง ฮู่", "จ่วน จ้าง", "จ้าง ตาน", "หวั่ง ลั่ว", "เตี้ยน ฉือ", "เจี้ยน ผาน", "ผิง ลุ่น", "หลิน จวี", "ฟู่ หมู่", "เผิง โหย่ว", "เซ่อ อิ่ง", "สิง เฉิง", "จิ่น จี๋", "โถว ซู่"] as const;

function categoryAt(index: number) { return categorySeeds[index % categorySeeds.length].id; }
function levelAt(index: number) { return ["A1", "A2", "B1", "B2", "C1"][index % 5] as VocabularyItem["cefrLevel"]; }
function posAt(index: number) { return ["noun", "verb", "adjective", "phrase"][index % 4] as PartOfSpeech; }

export const englishVocabulary100: VocabularyItem[] = Array.from({ length: 100 }, (_, index) => {
  const base = index % englishWords.length;
  const round = Math.floor(index / englishWords.length) + 1;
  const word = round === 1 ? englishWords[base] : `${englishWords[base]} ${round}`;
  const meaning = round === 1 ? englishMeanings[base] : `${englishMeanings[base]} ชุด ${round}`;
  return {
    id: `en-${String(index + 1).padStart(3, "0")}`, language: "english", languageId: "lang-english", word, ipa: `/${word}/`, thaiPronunciation: word, thaiMeaning: meaning, partOfSpeech: posAt(index), cefrLevel: levelAt(index), category: categoryAt(index), categoryId: categoryAt(index), subcategory: "daily life", exampleSentence: `I need to use ${word} in this situation.`, exampleTranslationTh: `ฉันต้องใช้คำว่า ${meaning} ในสถานการณ์นี้`, dailyLifeSentence: `Can you help me with the ${word}?`, formalSentence: `Could you please assist me with the ${word}?`, casualSentence: `Can you help with the ${word}?`, collocation: `daily ${word}`, commonMistake: "อย่าแปลตรงตัวจากภาษาไทย ให้ดูบริบทของประโยค", miniQuizQuestion: `What does '${word}' mean in Thai?`, miniQuizChoices: [meaning, "สวัสดี", "ขอบคุณ", "เดินทาง"], miniQuizAnswer: meaning, ttsText: word, difficultyScore: 20 + (index % 70), frequencyScore: 95 - (index % 55), tags: [categoryAt(index), levelAt(index).toLowerCase(), "english"], progressStatus: "new"
  };
});

export const chineseVocabulary100: VocabularyItem[] = Array.from({ length: 100 }, (_, index) => {
  const base = index % chineseWords.length;
  const round = Math.floor(index / chineseWords.length) + 1;
  const hanzi = round === 1 ? chineseWords[base] : `${chineseWords[base]}${round}`;
  const meaning = round === 1 ? englishMeanings[base] : `${englishMeanings[base]} ชุด ${round}`;
  const hsk = Math.min(6, Math.max(1, Math.ceil((index % 30) / 5))) as 1 | 2 | 3 | 4 | 5 | 6;
  return {
    id: `zh-${String(index + 1).padStart(3, "0")}`, language: "chinese", languageId: "lang-chinese", word: hanzi, chineseHanzi: hanzi, pinyin: pinyinRows[base], thaiPronunciation: thaiPronRows[base], thaiMeaning: meaning, partOfSpeech: posAt(index), cefrLevel: levelAt(index), hskLevel: hsk, category: categoryAt(index), categoryId: categoryAt(index), subcategory: "daily life", exampleSentence: `我想练习“${hanzi}”这个词。`, exampleTranslationTh: `ฉันอยากฝึกคำว่า ${meaning}`, dailyLifeSentence: `请问，${hanzi}怎么说？`, formalSentence: `请您帮我确认${hanzi}。`, casualSentence: `这个${hanzi}可以吗？`, collocation: `常用${hanzi}`, commonMistake: "ระวังวรรณยุกต์และลำดับคำในภาษาจีน", miniQuizQuestion: `'${hanzi}' แปลว่าอะไร?`, miniQuizChoices: [meaning, "สวัสดี", "ขอบคุณ", "เดินทาง"], miniQuizAnswer: meaning, ttsText: hanzi, difficultyScore: 25 + (index % 65), frequencyScore: 96 - (index % 50), tags: [categoryAt(index), `hsk-${hsk}`, "chinese"], progressStatus: "new"
  };
});

export const vocabularySeeds = [...englishVocabulary100, ...chineseVocabulary100];

export const lessonSeeds = Array.from({ length: 30 }, (_, index) => {
  const path = learningPathSeeds[index % learningPathSeeds.length];
  const language = path.language === "mixed" ? (index % 2 === 0 ? "english" : "chinese") : path.language;
  return { id: `lesson-${String(index + 1).padStart(3, "0")}`, pathId: path.id, language, languageId: `lang-${language}`, categoryId: categoryAt(index), title: `${path.title} Lesson ${index + 1}`, description: `ฝึก ${categoryAt(index)} ด้วย vocabulary, dialogue, listening, speaking, reading, writing และ quiz`, level: path.level, order: index + 1, estimatedMins: 10 + (index % 10), objectives: ["จำคำศัพท์หลัก", "ใช้ประโยคในสถานการณ์จริง", "ทำ mini quiz ให้ผ่าน"], isPublished: true };
});

const stepTypes = ["vocabulary", "dialogue", "listening", "speaking", "reading", "writing", "grammar", "quiz", "mission"] as const;
export const lessonStepSeeds = lessonSeeds.flatMap((lesson, lessonIndex) => stepTypes.map((type, stepIndex) => ({ id: `step-${String(lessonIndex + 1).padStart(3, "0")}-${stepIndex + 1}`, lessonId: lesson.id, type, title: type, order: stepIndex + 1, content: { instructionTh: `ทำกิจกรรม ${type}`, estimatedMinutes: 2 + (stepIndex % 3) } })));
export const exerciseSeeds = lessonSeeds.map((lesson, index) => ({ id: `exercise-${String(index + 1).padStart(3, "0")}`, lessonId: lesson.id, type: "multiple_choice", prompt: "เลือกคำตอบที่ถูกต้อง", instruction: "อ่านโจทย์แล้วเลือกคำแปลที่เหมาะสม", answer: { correct: "A" }, metadata: { source: "phase2_mock" }, order: 1 }));
export const quizQuestionSeeds = lessonSeeds.flatMap((lesson, lessonIndex) => ["vocabulary", "grammar", "reading", "listening"].map((skill, qIndex) => ({ id: `quiz-${String(lessonIndex + 1).padStart(3, "0")}-${qIndex + 1}`, lessonId: lesson.id, exerciseId: `exercise-${String(lessonIndex + 1).padStart(3, "0")}`, skill, question: `ข้อ ${qIndex + 1}: เลือกคำตอบที่เหมาะกับสถานการณ์ ${lesson.categoryId}`, choices: ["A", "B", "C", "D"], answer: "A", explanationTh: "คำตอบ A เหมาะกับบริบทที่สุด", level: lesson.level, language: lesson.language })));

const scenarioTitles = ["สั่งอาหาร", "ซื้อของในร้านสะดวกซื้อ", "ขึ้นแท็กซี่", "ถามทาง", "Check-in โรงแรม", "สนามบิน", "โรงพยาบาล", "ร้านยา", "สมัครงาน", "สัมภาษณ์งาน", "ประชุม", "โทรศัพท์เรื่องงาน", "คุยกับเพื่อนต่างชาติ", "ขอความช่วยเหลือฉุกเฉิน", "ต่อราคาในตลาด", "สั่งกาแฟ", "แจ้งปัญหาอินเทอร์เน็ต", "ถามทาง BTS", "จ่ายบิล", "เปิดบัญชีธนาคาร"] as const;
export const speakingScenarioSeeds = scenarioTitles.map((title, index) => { const language = index % 2 === 0 ? "english" : "chinese"; return { id: `speak-${String(index + 1).padStart(3, "0")}`, language, languageId: `lang-${language}`, categoryId: categoryAt(index + 8), title, level: ["A1", "A2", "B1", "B2"][index % 4], roleUser: "ผู้เรียน", roleAi: "คู่สนทนา AI", situationTh: `Roleplay: ${title}`, openingLine: language === "english" ? "Hello, how can I help you?" : "你好，需要帮忙吗？", targetPhrases: language === "english" ? ["please", "could you", "thank you"] : ["请", "谢谢", "可以"], scoringRubric: { pronunciation: 30, fluency: 30, confidence: 20, taskCompletion: 20 } }; });
export const readingPassageSeeds = Array.from({ length: 20 }, (_, index) => { const language = index % 2 === 0 ? "english" : "chinese"; return { id: `reading-${String(index + 1).padStart(3, "0")}`, language, languageId: `lang-${language}`, categoryId: categoryAt(index), title: `Reading ${index + 1}`, level: levelAt(index), passage: language === "english" ? "A short original passage for daily communication practice." : "这是一篇用于日常交流练习的短文。", translationTh: "บทอ่านสั้นสำหรับฝึกสื่อสารในชีวิตประจำวัน", summaryTh: "ฝึกจับใจความและคำศัพท์สำคัญ", keyVocabulary: [categoryAt(index), "daily", "practice"], questions: [{ q: "ใจความหลักคืออะไร", a: "ฝึกสื่อสารในชีวิตจริง" }], estimatedMins: 8 }; });
export const listeningItemSeeds = Array.from({ length: 20 }, (_, index) => { const language = index % 2 === 0 ? "english" : "chinese"; return { id: `listening-${String(index + 1).padStart(3, "0")}`, language, languageId: `lang-${language}`, categoryId: categoryAt(index), title: `Listening ${index + 1}`, level: levelAt(index), transcript: language === "english" ? "Could you say that again, please?" : "请你再说一遍，好吗？", translationTh: "ช่วยพูดอีกครั้งได้ไหม", audioUrl: "", speedOptions: [0.75, 1, 1.25], accent: language === "english" ? "US" : "Mandarin", questions: [{ q: "ผู้พูดต้องการอะไร", a: "ให้พูดซ้ำ" }] }; });
export const writingPromptSeeds = Array.from({ length: 20 }, (_, index) => { const language = index % 2 === 0 ? "english" : "chinese"; return { id: `writing-${String(index + 1).padStart(3, "0")}`, language, languageId: `lang-${language}`, categoryId: categoryAt(index), title: `Writing ${index + 1}`, level: levelAt(index), promptTh: `เขียน 3-5 ประโยคเกี่ยวกับ ${categoryAt(index)}`, promptTarget: language === "english" ? "Write a short message." : "写一段短消息。", writingType: ["diary", "email", "chat", "caption", "paragraph"][index % 5], suggestedWords: [categoryAt(index), "please", "thank you"], rubric: { grammar: 20, vocabulary: 20, clarity: 20, naturalness: 20, structure: 20 } }; });

const grammarRows = ["Present Simple", "Present Continuous", "Past Simple", "Future", "Modal verbs", "Prepositions", "Question forms", "Comparatives", "Conditionals", "Passive voice", "Present Perfect", "Articles", "是 / 不是", "有 / 没有", "在", "想 / 要", "会 / 能 / 可以", "了", "过", "吧 / 呢 / 吗", "measure words", "word order", "time + subject + verb pattern", "把", "比", "因为...所以", "虽然...但是", "正在", "de particles", "result complements"] as const;
export const grammarTopicSeeds = grammarRows.map((title, index) => { const language = index < 12 ? "english" : "chinese"; return { id: `grammar-${String(index + 1).padStart(3, "0")}`, language, languageId: `lang-${language}`, categoryId: categoryAt(index), title, level: levelAt(index), explanationTh: `อธิบาย ${title} แบบผูกกับสถานการณ์จริง`, pattern: `${title} pattern`, examples: [{ target: "Example sentence", th: "ประโยคตัวอย่าง" }], realLifeScenario: categoryAt(index), miniQuiz: { question: "เลือกประโยคที่ถูกต้อง", choices: ["A", "B", "C"], answer: "A" } }; });

export const achievementSeeds = [
  { id: "first-10-words", title: "First 10 Words", description: "จำคำศัพท์ครบ 10 คำแรก", icon: "🌱", xpReward: 50, condition: { wordsMastered: 10 } },
  { id: "seven-day-streak", title: "7-Day Streak", description: "เรียนต่อเนื่อง 7 วัน", icon: "🔥", xpReward: 120, condition: { streak: 7 } },
  { id: "first-roleplay", title: "First Roleplay", description: "ฝึกพูด roleplay ครั้งแรก", icon: "🎙️", xpReward: 80, condition: { speakingSessions: 1 } }
] as const;
export const dailyMissionTemplates = [
  { title: "ทบทวนคำศัพท์ 10 คำ", description: "ทำ flashcard easy/good/hard/again", skill: "vocabulary", xpReward: 30, targetCount: 10 },
  { title: "พูด 1 นาที", description: "อัดเสียงประโยคสั้นแล้วดู feedback", skill: "speaking", xpReward: 40, targetCount: 1 },
  { title: "ฟังบทสนทนา 1 เรื่อง", description: "ฟังแล้วตอบ comprehension quiz", skill: "listening", xpReward: 35, targetCount: 1 },
  { title: "เขียน 3 ประโยค", description: "ใช้คำศัพท์ใหม่แต่งประโยค", skill: "writing", xpReward: 35, targetCount: 1 }
] as const;
export const phase2DatasetSummary = { languages: languageSeeds.length, categories: categorySeeds.length, englishVocabulary: englishVocabulary100.length, chineseVocabulary: chineseVocabulary100.length, learningPaths: learningPathSeeds.length, lessons: lessonSeeds.length, lessonSteps: lessonStepSeeds.length, exercises: exerciseSeeds.length, quizQuestions: quizQuestionSeeds.length, speakingScenarios: speakingScenarioSeeds.length, readingPassages: readingPassageSeeds.length, listeningItems: listeningItemSeeds.length, writingPrompts: writingPromptSeeds.length, grammarTopics: grammarTopicSeeds.length, achievements: achievementSeeds.length };

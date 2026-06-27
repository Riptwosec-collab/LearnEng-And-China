import type { CefrLevel, PartOfSpeech, VocabularyItem } from "@/types";

type EnglishPack = {
  categoryId: string;
  subcategory: string;
  partOfSpeech?: PartOfSpeech;
  tags?: string[];
  terms: Array<[word: string, thaiMeaning: string, synonym?: string, antonym?: string]>;
};

const levelBuckets: Array<{ level: CefrLevel; count: number }> = [
  { level: "A1", count: 150 },
  { level: "A2", count: 150 },
  { level: "B1", count: 120 },
  { level: "B2", count: 100 },
  { level: "C1", count: 80 }
];

const packs: EnglishPack[] = [
  { categoryId: "home", subcategory: "home basics", terms: [["front door", "ประตูหน้า"], ["living room", "ห้องนั่งเล่น"], ["sofa cushion", "เบาะโซฟา"], ["ceiling fan", "พัดลมเพดาน"], ["light switch", "สวิตช์ไฟ"], ["power outlet", "ปลั๊กไฟ"], ["shoe rack", "ชั้นวางรองเท้า"], ["doorbell", "กริ่งประตู"], ["curtain rail", "รางผ้าม่าน"], ["floor mat", "พรมเช็ดเท้า"], ["laundry basket", "ตะกร้าซักผ้า"], ["storage box", "กล่องเก็บของ"], ["trash bag", "ถุงขยะ"], ["cleaning cloth", "ผ้าเช็ดทำความสะอาด"], ["window lock", "กลอนหน้าต่าง"]] },
  { categoryId: "bedroom", subcategory: "bedroom items", terms: [["pillowcase", "ปลอกหมอน"], ["bed sheet", "ผ้าปูที่นอน"], ["duvet cover", "ปลอกผ้านวม"], ["bedside table", "โต๊ะข้างเตียง"], ["reading lamp", "โคมไฟอ่านหนังสือ"], ["alarm clock", "นาฬิกาปลุก"], ["wardrobe door", "ประตูตู้เสื้อผ้า"], ["clothes hanger", "ไม้แขวนเสื้อ"], ["makeup mirror", "กระจกแต่งหน้า"], ["mattress topper", "แผ่นรองที่นอน"], ["drawer handle", "ที่จับลิ้นชัก"], ["sleep mask", "ผ้าปิดตานอน"], ["blanket cover", "ปลอกผ้าห่ม"], ["bed frame", "โครงเตียง"], ["nightstand", "โต๊ะข้างเตียง"]] },
  { categoryId: "bathroom", subcategory: "bathroom items", terms: [["bath towel", "ผ้าเช็ดตัว"], ["hand towel", "ผ้าเช็ดมือ"], ["soap dispenser", "ขวดกดสบู่"], ["shower gel", "เจลอาบน้ำ"], ["toothpaste tube", "หลอดยาสีฟัน"], ["toilet paper", "กระดาษชำระ"], ["bath mat", "พรมห้องน้ำ"], ["shower curtain", "ม่านอาบน้ำ"], ["sink faucet", "ก๊อกอ่างล้างหน้า"], ["drain cover", "ฝาปิดท่อระบายน้ำ"], ["razor blade", "ใบมีดโกน"], ["cotton swab", "สำลีก้าน"], ["mouthwash", "น้ำยาบ้วนปาก"], ["hair dryer", "ไดร์เป่าผม"], ["toilet brush", "แปรงขัดโถส้วม"]] },
  { categoryId: "kitchen", subcategory: "kitchen tools", terms: [["cutting board", "เขียง"], ["kitchen knife", "มีดทำครัว"], ["rice cooker", "หม้อหุงข้าว"], ["frying pan", "กระทะทอด"], ["saucepan", "หม้อด้าม"], ["ladle", "ทัพพี"], ["spatula", "ตะหลิว"], ["dish rack", "ชั้นวางจาน"], ["dish soap", "น้ำยาล้างจาน"], ["measuring cup", "ถ้วยตวง"], ["mixing bowl", "ชามผสม"], ["can opener", "ที่เปิดกระป๋อง"], ["kettle", "กาต้มน้ำ"], ["freezer drawer", "ลิ้นชักช่องแช่แข็ง"], ["garbage bin", "ถังขยะ"]] },
  { categoryId: "cooking", subcategory: "cooking actions", partOfSpeech: "verb", terms: [["slice", "หั่นเป็นแผ่น"], ["dice", "หั่นเต๋า"], ["stir", "คน"], ["steam", "นึ่ง"], ["grill", "ย่าง"], ["bake", "อบ"], ["season", "ปรุงรส"], ["marinate", "หมัก"], ["simmer", "เคี่ยวไฟอ่อน"], ["drain", "สะเด็ดน้ำ"], ["peel", "ปอกเปลือก"], ["whisk", "ตีด้วยตะกร้อมือ"], ["knead", "นวดแป้ง"], ["sprinkle", "โรย"], ["reheat", "อุ่นซ้ำ"]] },
  { categoryId: "shopping", subcategory: "shopping phrases", terms: [["price tag", "ป้ายราคา"], ["shopping cart", "รถเข็นสินค้า"], ["checkout counter", "เคาน์เตอร์จ่ายเงิน"], ["refund policy", "นโยบายคืนเงิน"], ["discount code", "โค้ดส่วนลด"], ["payment method", "วิธีชำระเงิน"], ["cash payment", "การจ่ายเงินสด"], ["credit card", "บัตรเครดิต"], ["receipt number", "เลขที่ใบเสร็จ"], ["return request", "คำขอคืนสินค้า"], ["exchange item", "สินค้าเปลี่ยนคืน"], ["product warranty", "การรับประกันสินค้า"], ["size chart", "ตารางไซซ์"], ["fitting room", "ห้องลองเสื้อ"], ["out of stock", "สินค้าหมด"]] },
  { categoryId: "convenience-store", subcategory: "convenience store", terms: [["ready meal", "อาหารพร้อมทาน"], ["bottled water", "น้ำดื่มขวด"], ["snack aisle", "แถวขนม"], ["top-up card", "บัตรเติมเงิน"], ["plastic spoon", "ช้อนพลาสติก"], ["straw", "หลอดดูด"], ["microwave service", "บริการอุ่นไมโครเวฟ"], ["cashier queue", "คิวแคชเชียร์"], ["member point", "คะแนนสมาชิก"], ["promotion shelf", "ชั้นโปรโมชัน"], ["parcel drop-off", "จุดฝากพัสดุ"], ["prepaid SIM", "ซิมเติมเงิน"], ["frozen meal", "อาหารแช่แข็ง"], ["instant noodles", "บะหมี่กึ่งสำเร็จรูป"], ["delivery pickup", "จุดรับเดลิเวอรี"]] },
  { categoryId: "market", subcategory: "fresh market", terms: [["fresh vegetables", "ผักสด"], ["seafood stall", "แผงอาหารทะเล"], ["fruit vendor", "คนขายผลไม้"], ["price per kilo", "ราคาต่อกิโล"], ["plastic bag", "ถุงพลาสติก"], ["cash change", "เงินทอน"], ["morning market", "ตลาดเช้า"], ["wet market", "ตลาดสด"], ["bargain price", "ต่อราคา"], ["ripe mango", "มะม่วงสุก"], ["fresh herbs", "สมุนไพรสด"], ["meat counter", "แผงเนื้อ"], ["digital scale", "ตาชั่งดิจิทัล"], ["market basket", "ตะกร้าตลาด"], ["vendor stall", "แผงขายของ"]] },
  { categoryId: "mall", subcategory: "mall services", terms: [["information desk", "โต๊ะประชาสัมพันธ์"], ["department store", "ห้างสรรพสินค้า"], ["food court", "ศูนย์อาหาร"], ["parking ticket", "บัตรจอดรถ"], ["escalator", "บันไดเลื่อน"], ["elevator lobby", "โถงลิฟต์"], ["sale event", "งานลดราคา"], ["customer service", "บริการลูกค้า"], ["lost and found", "แผนกของหาย"], ["cinema ticket", "ตั๋วหนัง"], ["gift voucher", "บัตรกำนัล"], ["brand outlet", "ร้านเอาต์เล็ต"], ["rest area", "พื้นที่พักผ่อน"], ["directory map", "แผนที่ร้านค้า"], ["parking floor", "ชั้นจอดรถ"]] },
  { categoryId: "restaurant", subcategory: "restaurant service", terms: [["table reservation", "การจองโต๊ะ"], ["menu item", "รายการอาหาร"], ["set menu", "เมนูชุด"], ["side dish", "เครื่องเคียง"], ["service charge", "ค่าบริการ"], ["takeaway box", "กล่องใส่กลับบ้าน"], ["spicy level", "ระดับความเผ็ด"], ["allergy note", "หมายเหตุเรื่องแพ้อาหาร"], ["bill folder", "แฟ้มบิล"], ["waiting list", "รายชื่อรอคิว"], ["special request", "คำขอพิเศษ"], ["daily special", "เมนูพิเศษประจำวัน"], ["starter dish", "อาหารเรียกน้ำย่อย"], ["main course", "อาหารจานหลัก"], ["dessert menu", "เมนูของหวาน"]] },
  { categoryId: "cafe", subcategory: "cafe orders", terms: [["iced latte", "ลาเต้เย็น"], ["hot americano", "อเมริกาโนร้อน"], ["coffee bean", "เมล็ดกาแฟ"], ["oat milk", "นมโอ๊ต"], ["sugar syrup", "ไซรัปน้ำตาล"], ["takeaway cup", "แก้วกลับบ้าน"], ["window seat", "ที่นั่งริมหน้าต่าง"], ["charging outlet", "ปลั๊กชาร์จ"], ["cake slice", "เค้กหนึ่งชิ้น"], ["loyalty stamp", "แสตมป์สะสม"], ["barista", "บาริสต้า"], ["coffee grinder", "เครื่องบดกาแฟ"], ["quiet corner", "มุมเงียบ"], ["drink size", "ขนาดเครื่องดื่ม"], ["whipped cream", "วิปครีม"]] },
  { categoryId: "bus", subcategory: "bus travel", tags: ["travel-english"], terms: [["bus route", "เส้นทางรถเมล์"], ["bus fare", "ค่าโดยสารรถเมล์"], ["bus stop sign", "ป้ายรถเมล์"], ["last stop", "ป้ายสุดท้าย"], ["rush hour", "ชั่วโมงเร่งด่วน"], ["bus conductor", "กระเป๋ารถเมล์"], ["standing passenger", "ผู้โดยสารยืน"], ["transfer point", "จุดเปลี่ยนรถ"], ["arrival time", "เวลามาถึง"], ["bus lane", "ช่องทางรถเมล์"], ["night bus", "รถเมล์กลางคืน"], ["air-conditioned bus", "รถเมล์ปรับอากาศ"], ["route number", "หมายเลขสายรถ"], ["one-way fare", "ค่าโดยสารเที่ยวเดียว"], ["bus terminal", "สถานีขนส่ง"]] },
  { categoryId: "bts", subcategory: "BTS travel", tags: ["travel-english"], terms: [["skytrain platform", "ชานชาลารถไฟฟ้า"], ["fare gate", "ประตูกั้นค่าโดยสาร"], ["stored value card", "บัตรเติมเงิน"], ["single journey ticket", "บัตรโดยสารเที่ยวเดียว"], ["train direction", "ทิศทางรถไฟ"], ["interchange station", "สถานีเปลี่ยนสาย"], ["exit number", "หมายเลขทางออก"], ["escalator queue", "คิวบันไดเลื่อน"], ["priority seat", "ที่นั่งสำรอง"], ["announcement", "ประกาศ"], ["train delay", "รถไฟล่าช้า"], ["ticket machine", "เครื่องขายบัตร"], ["platform screen door", "ประตูกั้นชานชาลา"], ["station map", "แผนที่สถานี"], ["peak hour", "ช่วงคนแน่น"]] },
  { categoryId: "mrt", subcategory: "MRT travel", tags: ["travel-english"], terms: [["subway line", "สายรถไฟใต้ดิน"], ["token ticket", "เหรียญโดยสาร"], ["underground station", "สถานีใต้ดิน"], ["security check", "จุดตรวจความปลอดภัย"], ["train carriage", "ตู้โดยสาร"], ["platform level", "ชั้นชานชาลา"], ["exit gate", "ประตูทางออก"], ["route map", "แผนที่เส้นทาง"], ["service disruption", "การหยุดชะงักของบริการ"], ["last train", "รถไฟเที่ยวสุดท้าย"], ["first train", "รถไฟเที่ยวแรก"], ["ticket office", "ห้องจำหน่ายตั๋ว"], ["lost card", "บัตรหาย"], ["fare adjustment", "ปรับค่าโดยสาร"], ["station staff", "เจ้าหน้าที่สถานี"]] },
  { categoryId: "taxi", subcategory: "taxi phrases", tags: ["travel-english"], terms: [["taxi meter", "มิเตอร์แท็กซี่"], ["destination address", "ที่อยู่ปลายทาง"], ["toll fee", "ค่าทางด่วน"], ["traffic jam", "รถติด"], ["drop-off point", "จุดลงรถ"], ["pickup location", "จุดรับผู้โดยสาร"], ["driver rating", "คะแนนคนขับ"], ["ride receipt", "ใบเสร็จการเดินทาง"], ["cash fare", "ค่าโดยสารเงินสด"], ["route suggestion", "คำแนะนำเส้นทาง"], ["turn left", "เลี้ยวซ้าย"], ["turn right", "เลี้ยวขวา"], ["go straight", "ตรงไป"], ["nearby landmark", "จุดสังเกตใกล้เคียง"], ["ride cancellation", "การยกเลิกการเดินทาง"]] },
  { categoryId: "airport", subcategory: "airport travel", tags: ["travel-english"], terms: [["boarding pass", "บอร์ดดิ้งพาส"], ["check-in counter", "เคาน์เตอร์เช็กอิน"], ["baggage allowance", "น้ำหนักกระเป๋าที่อนุญาต"], ["departure gate", "ประตูขึ้นเครื่อง"], ["arrival hall", "โถงผู้โดยสารขาเข้า"], ["immigration officer", "เจ้าหน้าที่ตรวจคนเข้าเมือง"], ["customs form", "แบบฟอร์มศุลกากร"], ["security tray", "ถาดตรวจความปลอดภัย"], ["flight delay", "เที่ยวบินล่าช้า"], ["connecting flight", "เที่ยวบินต่อเครื่อง"], ["lost luggage", "กระเป๋าหาย"], ["airport lounge", "ห้องรับรองสนามบิน"], ["duty-free shop", "ร้านค้าปลอดภาษี"], ["passport control", "ด่านตรวจหนังสือเดินทาง"], ["boarding time", "เวลาขึ้นเครื่อง"]] },
  { categoryId: "hotel", subcategory: "hotel stay", tags: ["travel-english"], terms: [["front desk", "แผนกต้อนรับ"], ["room key", "กุญแจห้อง"], ["early check-in", "เช็กอินก่อนเวลา"], ["late check-out", "เช็กเอาต์ล่าช้า"], ["room service", "บริการรูมเซอร์วิส"], ["housekeeping", "แม่บ้านโรงแรม"], ["extra towel", "ผ้าเช็ดตัวเพิ่ม"], ["wake-up call", "บริการปลุก"], ["deposit fee", "ค่ามัดจำ"], ["booking confirmation", "การยืนยันการจอง"], ["non-smoking room", "ห้องปลอดบุหรี่"], ["city view", "วิวเมือง"], ["breakfast buffet", "บุฟเฟต์อาหารเช้า"], ["air conditioner", "เครื่องปรับอากาศ"], ["maintenance request", "คำขอซ่อมบำรุง"]] },
  { categoryId: "school", subcategory: "school life", terms: [["class schedule", "ตารางเรียน"], ["homework task", "การบ้าน"], ["school uniform", "ชุดนักเรียน"], ["teacher comment", "ความเห็นครู"], ["classroom rule", "กฎในห้องเรียน"], ["group project", "งานกลุ่ม"], ["exam paper", "ข้อสอบ"], ["report card", "สมุดรายงานผล"], ["library card", "บัตรห้องสมุด"], ["science lab", "ห้องแล็บวิทยาศาสตร์"], ["sports day", "วันกีฬา"], ["school bus", "รถโรงเรียน"], ["attendance record", "บันทึกการเข้าเรียน"], ["student desk", "โต๊ะนักเรียน"], ["whiteboard marker", "ปากกาไวท์บอร์ด"]] },
  { categoryId: "university", subcategory: "university life", terms: [["lecture hall", "ห้องบรรยาย"], ["course registration", "การลงทะเบียนเรียน"], ["credit hour", "หน่วยกิต"], ["assignment deadline", "กำหนดส่งงาน"], ["academic advisor", "อาจารย์ที่ปรึกษา"], ["student ID", "รหัสนักศึกษา"], ["campus map", "แผนที่มหาวิทยาลัย"], ["research topic", "หัวข้อวิจัย"], ["presentation slide", "สไลด์นำเสนอ"], ["lab report", "รายงานแล็บ"], ["online class", "คลาสออนไลน์"], ["tuition fee", "ค่าเล่าเรียน"], ["semester break", "ปิดเทอม"], ["graduation ceremony", "พิธีรับปริญญา"], ["internship placement", "สถานที่ฝึกงาน"]] },
  { categoryId: "work", subcategory: "work and business", tags: ["business-english", "work-english"], terms: [["work schedule", "ตารางงาน"], ["task owner", "เจ้าของงาน"], ["project timeline", "ไทม์ไลน์โครงการ"], ["status update", "การอัปเดตสถานะ"], ["approval request", "คำขออนุมัติ"], ["workload", "ปริมาณงาน"], ["handover note", "โน้ตส่งต่องาน"], ["performance review", "การประเมินผลงาน"], ["team alignment", "การปรับความเข้าใจในทีม"], ["action item", "รายการงานที่ต้องทำ"], ["follow-up task", "งานติดตามผล"], ["business requirement", "ความต้องการทางธุรกิจ"], ["work permit", "ใบอนุญาตทำงาน"], ["office policy", "นโยบายสำนักงาน"], ["time sheet", "ใบบันทึกเวลา"]] },
  { categoryId: "meeting", subcategory: "meeting English", tags: ["business-english", "work-english"], terms: [["meeting agenda", "วาระการประชุม"], ["meeting minutes", "บันทึกการประชุม"], ["decision point", "ประเด็นตัดสินใจ"], ["discussion topic", "หัวข้ออภิปราย"], ["stakeholder", "ผู้มีส่วนเกี่ยวข้อง"], ["deadline extension", "การขยายกำหนดส่ง"], ["risk item", "รายการความเสี่ยง"], ["next step", "ขั้นตอนถัดไป"], ["meeting recap", "สรุปการประชุม"], ["attendance list", "รายชื่อผู้เข้าร่วม"], ["screen sharing", "การแชร์หน้าจอ"], ["conference room", "ห้องประชุม"], ["meeting host", "ผู้จัดประชุม"], ["mute button", "ปุ่มปิดเสียง"], ["follow-up meeting", "ประชุมติดตามผล"]] },
  { categoryId: "email", subcategory: "email and ticket writing", tags: ["business-english", "it-support", "work-english"], terms: [["email subject", "หัวข้ออีเมล"], ["reply deadline", "กำหนดตอบกลับ"], ["attachment file", "ไฟล์แนบ"], ["email thread", "เธรดอีเมล"], ["ticket update", "อัปเดตทิกเก็ต"], ["access request", "คำขอสิทธิ์เข้าใช้งาน"], ["password reset", "การรีเซ็ตรหัสผ่าน"], ["server alert", "การแจ้งเตือนเซิร์ฟเวอร์"], ["VPN update", "อัปเดต VPN"], ["escalation note", "โน้ตส่งต่อเคส"], ["incident summary", "สรุปเหตุการณ์"], ["customer reply", "การตอบกลับลูกค้า"], ["polite reminder", "การเตือนอย่างสุภาพ"], ["closing line", "ประโยคปิดท้าย"], ["email signature", "ลายเซ็นอีเมล"]] },
  { categoryId: "phone", subcategory: "phone calls", tags: ["business-english", "it-support"], terms: [["missed call", "สายที่ไม่ได้รับ"], ["call back", "โทรกลับ"], ["voice message", "ข้อความเสียง"], ["extension number", "เบอร์ต่อ"], ["conference call", "ประชุมทางโทรศัพท์"], ["call quality", "คุณภาพสาย"], ["background noise", "เสียงรบกวนพื้นหลัง"], ["hold time", "เวลารอสาย"], ["support hotline", "สายด่วนซัพพอร์ต"], ["caller ID", "หมายเลขผู้โทร"], ["call transfer", "การโอนสาย"], ["call recording", "การบันทึกเสียงโทรศัพท์"], ["phone etiquette", "มารยาทการโทร"], ["signal issue", "ปัญหาสัญญาณ"], ["urgent call", "สายด่วนเร่งด่วน"]] },
  { categoryId: "hospital", subcategory: "hospital visit", terms: [["medical appointment", "นัดหมายแพทย์"], ["patient form", "แบบฟอร์มผู้ป่วย"], ["waiting area", "พื้นที่รอ"], ["blood pressure", "ความดันโลหิต"], ["medical record", "ประวัติการรักษา"], ["insurance card", "บัตรประกัน"], ["doctor note", "ใบรับรองแพทย์"], ["follow-up visit", "นัดติดตามผล"], ["emergency room", "ห้องฉุกเฉิน"], ["lab result", "ผลแล็บ"], ["prescription", "ใบสั่งยา"], ["hospital bill", "บิลโรงพยาบาล"], ["symptom checklist", "รายการตรวจอาการ"], ["nurse station", "เคาน์เตอร์พยาบาล"], ["treatment plan", "แผนการรักษา"]] },
  { categoryId: "pharmacy", subcategory: "pharmacy", terms: [["pain reliever", "ยาแก้ปวด"], ["cough syrup", "ยาแก้ไอชนิดน้ำ"], ["allergy tablet", "ยาแก้แพ้"], ["eye drops", "ยาหยอดตา"], ["bandage", "ผ้าพันแผล"], ["first-aid kit", "ชุดปฐมพยาบาล"], ["dosage label", "ฉลากขนาดยา"], ["side effect", "ผลข้างเคียง"], ["medicine schedule", "ตารางกินยา"], ["pharmacist", "เภสัชกร"], ["expiry date", "วันหมดอายุ"], ["antiseptic spray", "สเปรย์ฆ่าเชื้อ"], ["cold medicine", "ยาแก้หวัด"], ["stomach medicine", "ยาแก้ปวดท้อง"], ["skin cream", "ครีมทาผิว"]] },
  { categoryId: "fitness", subcategory: "fitness", terms: [["warm-up set", "เซตวอร์มอัป"], ["treadmill", "ลู่วิ่ง"], ["dumbbell rack", "ชั้นดัมเบล"], ["workout plan", "แผนออกกำลังกาย"], ["stretching mat", "เสื่อยืดกล้ามเนื้อ"], ["heart rate", "อัตราการเต้นหัวใจ"], ["personal trainer", "เทรนเนอร์ส่วนตัว"], ["rest day", "วันพัก"], ["strength training", "การฝึกความแข็งแรง"], ["cardio session", "เซสชันคาร์ดิโอ"], ["fitness goal", "เป้าหมายฟิตเนส"], ["water bottle", "ขวดน้ำ"], ["gym locker", "ล็อกเกอร์ยิม"], ["exercise form", "ท่าทางออกกำลังกาย"], ["cool-down", "การคูลดาวน์"]] },
  { categoryId: "banking", subcategory: "banking", terms: [["bank account", "บัญชีธนาคาร"], ["account balance", "ยอดเงินคงเหลือ"], ["debit card", "บัตรเดบิต"], ["bank statement", "รายการเดินบัญชี"], ["service fee", "ค่าธรรมเนียมบริการ"], ["ATM withdrawal", "การถอนเงินตู้ ATM"], ["deposit slip", "ใบนำฝาก"], ["loan application", "คำขอสินเชื่อ"], ["interest rate", "อัตราดอกเบี้ย"], ["exchange rate", "อัตราแลกเปลี่ยน"], ["branch number", "หมายเลขสาขา"], ["account holder", "เจ้าของบัญชี"], ["bank transfer", "การโอนผ่านธนาคาร"], ["mobile banking", "โมบายแบงก์กิ้ง"], ["transaction limit", "วงเงินทำรายการ"]] },
  { categoryId: "money-transfer", subcategory: "money transfer", terms: [["transfer amount", "จำนวนเงินโอน"], ["recipient name", "ชื่อผู้รับเงิน"], ["account number", "เลขบัญชี"], ["transfer slip", "สลิปโอนเงิน"], ["reference number", "เลขอ้างอิง"], ["same-bank transfer", "โอนในธนาคารเดียวกัน"], ["interbank transfer", "โอนต่างธนาคาร"], ["transfer fee", "ค่าธรรมเนียมโอน"], ["scheduled transfer", "โอนเงินล่วงหน้า"], ["failed transfer", "การโอนล้มเหลว"], ["confirmation screen", "หน้าจอยืนยัน"], ["QR payment", "การจ่ายด้วยคิวอาร์"], ["wallet balance", "ยอดเงินในวอลเล็ต"], ["transfer history", "ประวัติการโอน"], ["payment proof", "หลักฐานการชำระเงิน"]] },
  { categoryId: "bill-payment", subcategory: "bill payment", terms: [["electricity bill", "บิลค่าไฟ"], ["water bill", "บิลค่าน้ำ"], ["internet bill", "บิลค่าอินเทอร์เน็ต"], ["phone bill", "บิลค่าโทรศัพท์"], ["due date", "วันครบกำหนด"], ["late fee", "ค่าปรับล่าช้า"], ["billing cycle", "รอบบิล"], ["payment channel", "ช่องทางชำระเงิน"], ["auto payment", "การชำระอัตโนมัติ"], ["bill reminder", "การเตือนจ่ายบิล"], ["invoice number", "เลขใบแจ้งหนี้"], ["monthly charge", "ค่าบริการรายเดือน"], ["outstanding balance", "ยอดค้างชำระ"], ["payment receipt", "ใบเสร็จชำระเงิน"], ["service package", "แพ็กเกจบริการ"]] },
  { categoryId: "internet", subcategory: "internet and network", tags: ["it-support", "network-engineer"], terms: [["internet connection", "การเชื่อมต่ออินเทอร์เน็ต"], ["Wi-Fi password", "รหัสผ่านไวไฟ"], ["router reboot", "การรีบูตเราเตอร์"], ["signal strength", "ความแรงสัญญาณ"], ["network outage", "เครือข่ายล่ม"], ["DNS setting", "การตั้งค่า DNS"], ["default gateway", "เกตเวย์เริ่มต้น"], ["IP address", "ที่อยู่ไอพี"], ["packet loss", "แพ็กเก็ตสูญหาย"], ["latency spike", "ค่า latency พุ่ง"], ["bandwidth limit", "ขีดจำกัดแบนด์วิดท์"], ["VPN tunnel", "อุโมงค์ VPN"], ["firewall rule", "กฎไฟร์วอลล์"], ["DHCP lease", "สัญญาเช่า DHCP"], ["subnet mask", "ซับเน็ตมาสก์"]] },
  { categoryId: "mobile", subcategory: "mobile phone", terms: [["phone screen", "หน้าจอโทรศัพท์"], ["battery health", "สุขภาพแบตเตอรี่"], ["SIM tray", "ถาดซิม"], ["mobile data", "ดาต้ามือถือ"], ["app permission", "สิทธิ์แอป"], ["push notification", "การแจ้งเตือนพุช"], ["storage space", "พื้นที่จัดเก็บ"], ["screen lock", "ล็อกหน้าจอ"], ["face unlock", "ปลดล็อกด้วยใบหน้า"], ["charging cable", "สายชาร์จ"], ["camera lens", "เลนส์กล้อง"], ["software update", "อัปเดตซอฟต์แวร์"], ["call history", "ประวัติการโทร"], ["contact list", "รายชื่อผู้ติดต่อ"], ["data roaming", "โรมมิ่งข้อมูล"]] },
  { categoryId: "computer", subcategory: "computer and IT support", tags: ["it-support", "network-engineer"], terms: [["laptop charger", "ที่ชาร์จแล็ปท็อป"], ["keyboard shortcut", "คีย์ลัด"], ["system update", "อัปเดตระบบ"], ["login error", "ข้อผิดพลาดการเข้าสู่ระบบ"], ["user account", "บัญชีผู้ใช้"], ["admin permission", "สิทธิ์ผู้ดูแลระบบ"], ["software license", "ไลเซนส์ซอฟต์แวร์"], ["remote session", "เซสชันรีโมต"], ["device inventory", "รายการอุปกรณ์"], ["endpoint alert", "การแจ้งเตือน endpoint"], ["switch port", "พอร์ตสวิตช์"], ["VLAN tag", "แท็ก VLAN"], ["MAC address", "หมายเลข MAC"], ["RADIUS server", "เซิร์ฟเวอร์ RADIUS"], ["configuration backup", "การสำรองคอนฟิก"]] },
  { categoryId: "social-media", subcategory: "social media", terms: [["profile picture", "รูปโปรไฟล์"], ["status update", "อัปเดตสถานะ"], ["comment section", "ช่องคอมเมนต์"], ["direct message", "ข้อความส่วนตัว"], ["privacy setting", "การตั้งค่าความเป็นส่วนตัว"], ["share button", "ปุ่มแชร์"], ["story highlight", "ไฮไลต์สตอรี่"], ["follower count", "จำนวนผู้ติดตาม"], ["content caption", "แคปชันคอนเทนต์"], ["notification badge", "ป้ายแจ้งเตือน"], ["blocked account", "บัญชีที่ถูกบล็อก"], ["tagged photo", "รูปที่ถูกแท็ก"], ["live stream", "ไลฟ์สตรีม"], ["post reach", "จำนวนคนเห็นโพสต์"], ["engagement rate", "อัตราการมีส่วนร่วม"]] },
  { categoryId: "family", subcategory: "family", terms: [["older brother", "พี่ชาย"], ["younger sister", "น้องสาว"], ["grandmother", "คุณยาย/คุณย่า"], ["grandfather", "คุณตา/คุณปู่"], ["cousin", "ลูกพี่ลูกน้อง"], ["relative", "ญาติ"], ["family dinner", "มื้อค่ำครอบครัว"], ["household chore", "งานบ้าน"], ["birthday plan", "แผนวันเกิด"], ["family photo", "รูปครอบครัว"], ["parent meeting", "การประชุมผู้ปกครอง"], ["family rule", "กฎครอบครัว"], ["shared expense", "ค่าใช้จ่ายร่วม"], ["caregiver", "ผู้ดูแล"], ["family trip", "ทริปครอบครัว"]] },
  { categoryId: "friends", subcategory: "friends", terms: [["close friend", "เพื่อนสนิท"], ["classmate", "เพื่อนร่วมชั้น"], ["teammate", "เพื่อนร่วมทีม"], ["hangout plan", "แผนนัดเจอ"], ["group chat", "แชตกลุ่ม"], ["inside joke", "มุกในกลุ่ม"], ["movie night", "คืนดูหนัง"], ["birthday surprise", "เซอร์ไพรส์วันเกิด"], ["shared ride", "นั่งรถร่วมกัน"], ["weekend plan", "แผนวันหยุด"], ["favorite place", "สถานที่โปรด"], ["quick call", "โทรคุยสั้น ๆ"], ["friendly advice", "คำแนะนำแบบเพื่อน"], ["team game", "เกมทีม"], ["coffee meetup", "นัดกาแฟ"]] },
  { categoryId: "hobby", subcategory: "hobbies", terms: [["photo walk", "เดินถ่ายรูป"], ["guitar practice", "ฝึกกีตาร์"], ["board game", "บอร์ดเกม"], ["online game", "เกมออนไลน์"], ["book club", "ชมรมหนังสือ"], ["movie review", "รีวิวหนัง"], ["drawing tablet", "แท็บเล็ตวาดรูป"], ["craft project", "งานฝีมือ"], ["travel vlog", "วิดีโอบล็อกท่องเที่ยว"], ["music playlist", "เพลย์ลิสต์เพลง"], ["collectible item", "ของสะสม"], ["weekend hobby", "งานอดิเรกวันหยุด"], ["learning goal", "เป้าหมายการเรียนรู้"], ["practice routine", "กิจวัตรฝึกซ้อม"], ["creative idea", "ไอเดียสร้างสรรค์"]] },
  { categoryId: "tourism", subcategory: "tourism", tags: ["travel-english"], terms: [["tour guide", "ไกด์นำเที่ยว"], ["tour package", "แพ็กเกจทัวร์"], ["travel itinerary", "แผนการเดินทาง"], ["local attraction", "สถานที่ท่องเที่ยวท้องถิ่น"], ["entrance fee", "ค่าเข้าชม"], ["souvenir shop", "ร้านของฝาก"], ["scenic view", "วิวสวย"], ["walking tour", "ทัวร์เดินชมเมือง"], ["day trip", "ทริปวันเดียว"], ["travel insurance", "ประกันเดินทาง"], ["tourist map", "แผนที่นักท่องเที่ยว"], ["cultural site", "สถานที่ทางวัฒนธรรม"], ["photo spot", "จุดถ่ายรูป"], ["local guide", "ไกด์ท้องถิ่น"], ["travel budget", "งบท่องเที่ยว"]] },
  { categoryId: "emergency", subcategory: "emergency", terms: [["emergency exit", "ทางออกฉุกเฉิน"], ["first responder", "ผู้ตอบสนองเหตุฉุกเฉิน"], ["fire alarm", "สัญญาณเตือนไฟไหม้"], ["power outage", "ไฟดับ"], ["medical help", "ความช่วยเหลือทางแพทย์"], ["urgent request", "คำขอเร่งด่วน"], ["safe area", "พื้นที่ปลอดภัย"], ["evacuation route", "เส้นทางอพยพ"], ["police report", "ใบแจ้งความ"], ["lost passport", "พาสปอร์ตหาย"], ["emergency contact", "ผู้ติดต่อฉุกเฉิน"], ["warning sign", "ป้ายเตือน"], ["accident scene", "ที่เกิดอุบัติเหตุ"], ["help desk", "จุดช่วยเหลือ"], ["urgent notice", "ประกาศเร่งด่วน"]] },
  { categoryId: "real-life-problems", subcategory: "real life problem solving", tags: ["it-support", "network-engineer"], terms: [["broken charger", "ที่ชาร์จเสีย"], ["missing receipt", "ใบเสร็จหาย"], ["wrong order", "ออเดอร์ผิด"], ["late delivery", "จัดส่งล่าช้า"], ["blocked account", "บัญชีถูกบล็อก"], ["duplicate payment", "จ่ายเงินซ้ำ"], ["network loop", "ลูปเครือข่าย"], ["duplicate IP", "ไอพีซ้ำ"], ["gateway conflict", "เกตเวย์ชนกัน"], ["access denied", "ถูกปฏิเสธสิทธิ์"], ["printer jam", "เครื่องพิมพ์ติด"], ["slow Wi-Fi", "ไวไฟช้า"], ["expired password", "รหัสผ่านหมดอายุ"], ["broken link", "ลิงก์เสีย"], ["service outage", "บริการขัดข้อง"]] }
];

function levelAt(index: number): CefrLevel {
  let cursor = 0;
  for (const bucket of levelBuckets) {
    cursor += bucket.count;
    if (index < cursor) return bucket.level;
  }
  return "C1";
}

function slugText(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function thaiPronunciation(word: string) {
  return `อ่านว่า ${word}`;
}

function ipaFor(word: string) {
  return `/ˈ${word.replace(/[^a-zA-Z]+/g, ".").replace(/^\.|\.$/g, "")}/`;
}

function partOfSpeechFor(pack: EnglishPack, word: string): PartOfSpeech {
  if (pack.partOfSpeech) return pack.partOfSpeech;
  return /^(turn|go|slice|dice|stir|steam|grill|bake|season|marinate|simmer|drain|peel|whisk|knead|sprinkle|reheat)/i.test(word) ? "verb" : "noun";
}

const flatTerms = packs.flatMap((pack) => pack.terms.map((term) => ({ pack, term })));

export const englishVocabulary600: VocabularyItem[] = flatTerms.slice(0, 600).map(({ pack, term }, index) => {
  const [word, thaiMeaning, synonym, antonym] = term;
  const level = levelAt(index);
  const categoryLabel = pack.categoryId.replace(/-/g, " ");
  const id = `eng-${level.toLowerCase()}-${pack.categoryId}-${String(index + 1).padStart(3, "0")}`;
  const quizDistractors = ["เอกสาร", "สถานี", "การประชุม", "อุปกรณ์"].filter((choice) => choice !== thaiMeaning).slice(0, 3);

  return {
    id,
    language: "english",
    languageId: "lang-english",
    word,
    ipa: ipaFor(word),
    thaiPronunciation: thaiPronunciation(word),
    thaiMeaning,
    partOfSpeech: partOfSpeechFor(pack, word),
    cefrLevel: level,
    category: pack.categoryId,
    categoryId: pack.categoryId,
    subcategory: pack.subcategory,
    exampleSentence: `I need to use the ${word} in a ${categoryLabel} situation.`,
    exampleTranslationTh: `ฉันต้องใช้คำว่า ${thaiMeaning} ในสถานการณ์${categoryLabel}`,
    dailyLifeSentence: `Can you help me with the ${word}, please?`,
    formalSentence: `Could you please assist me with the ${word}?`,
    casualSentence: `Can you help with the ${word}?`,
    synonym,
    antonym,
    collocation: `${word} issue, ${word} request, ${word} update`,
    commonMistake: `อย่าแปล ${word} ตรงตัวทุกครั้ง ให้ดูบริบทว่าใช้กับ ${categoryLabel} หรือสถานการณ์งานจริง`,
    miniQuizQuestion: `What does '${word}' mean?`,
    miniQuizChoices: [thaiMeaning, ...quizDistractors],
    miniQuizAnswer: thaiMeaning,
    ttsText: word,
    audioUrl: undefined,
    difficultyScore: 20 + (index % 70),
    frequencyScore: 95 - (index % 55),
    tags: [pack.categoryId, level, "english", "generated-600", ...(pack.tags ?? [])],
    source: "generated_english_600",
    isPublished: true
  };
});

export const englishVocabulary600Summary = {
  source: "generated_english_600",
  count: englishVocabulary600.length,
  levels: levelBuckets,
  categories: Array.from(new Set(englishVocabulary600.map((word) => word.categoryId ?? word.category))),
  itNetworkCount: englishVocabulary600.filter((word) => word.tags.includes("it-support") || word.tags.includes("network-engineer")).length,
  businessCount: englishVocabulary600.filter((word) => word.tags.includes("business-english") || word.tags.includes("work-english")).length,
  travelCount: englishVocabulary600.filter((word) => word.tags.includes("travel-english")).length,
  dailyLifeCount: englishVocabulary600.filter((word) => word.tags.includes("english") && !word.tags.includes("business-english")).length
};

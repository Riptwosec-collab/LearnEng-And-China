"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Headphones, Loader2, Mic2, PenLine, Volume2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type LessonStep = {
  id: string;
  order?: number;
  type?: string;
  title?: string;
  content?: { instructionTh?: string; estimatedMinutes?: number; [key: string]: unknown };
};

type Lesson = {
  id: string;
  title?: string;
  description?: string;
  language?: string;
  level?: string;
  pathId?: string;
  categoryId?: string;
  xpReward?: number;
  estimatedMins?: number;
  objectives?: string[];
  steps?: LessonStep[];
};

type VocabularyItem = {
  id: string;
  word?: string;
  chineseHanzi?: string;
  pinyin?: string;
  ipa?: string;
  thaiPronunciation?: string;
  thaiMeaning?: string;
  exampleSentence?: string;
  exampleTranslationTh?: string;
  collocation?: string;
  commonMistake?: string;
  miniQuizQuestion?: string;
  miniQuizChoices?: string[];
  miniQuizAnswer?: string;
};

type LessonPayload = {
  lesson?: Lesson;
  path?: { title?: string };
  category?: { icon?: string; nameTh?: string; nameEn?: string };
  vocabulary?: VocabularyItem[];
};

type SavedLessonProgress = { completedSteps: string[]; completed: boolean; updatedAt: string };

const allProgressKey = "linguaquest:lesson-progress";

function readAllProgress(): Record<string, SavedLessonProgress> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(allProgressKey) ?? "{}") as Record<string, SavedLessonProgress>;
  } catch {
    return {};
  }
}

function writeLessonProgress(lessonId: string, value: SavedLessonProgress) {
  const all = readAllProgress();
  all[lessonId] = value;
  localStorage.setItem(allProgressKey, JSON.stringify(all));
}

function speak(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis || !text) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = /[\u4e00-\u9fff]/.test(text) ? "zh-CN" : "en-US";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function wordLabel(word?: VocabularyItem) {
  return word?.chineseHanzi ?? word?.word ?? "practice";
}

function getCoreWords(words: VocabularyItem[]) {
  return words.length > 0 ? words.slice(0, 6) : [];
}

function sentenceFor(language?: string, words: VocabularyItem[] = [], categoryTh = "ชีวิตจริง") {
  const first = wordLabel(words[0]);
  if (language === "chinese") return `请问，${first}怎么说？`;
  return `Can you help me with the ${first} in this ${categoryTh} situation?`;
}

function StepContent({ step, lesson, data }: { step: LessonStep; lesson: Lesson; data: LessonPayload }) {
  const words = getCoreWords(data.vocabulary ?? []);
  const categoryTh = data.category?.nameTh ?? lesson.categoryId ?? "ชีวิตจริง";
  const categoryEn = data.category?.nameEn ?? lesson.categoryId ?? "daily life";
  const sampleSentence = sentenceFor(lesson.language, words, categoryTh);

  switch (step.type) {
    case "vocabulary":
      return <VocabularyStep words={words} />;
    case "dialogue":
      return <DialogueStep language={lesson.language} categoryTh={categoryTh} words={words} />;
    case "listening":
      return <ListeningStep language={lesson.language} categoryTh={categoryTh} transcript={sampleSentence} />;
    case "speaking":
      return <SpeakingStep language={lesson.language} categoryTh={categoryTh} words={words} />;
    case "reading":
      return <ReadingStep language={lesson.language} categoryTh={categoryTh} categoryEn={categoryEn} words={words} />;
    case "writing":
      return <WritingStep language={lesson.language} categoryTh={categoryTh} words={words} />;
    case "grammar":
      return <GrammarStep language={lesson.language} words={words} />;
    case "quiz":
      return <QuizStep words={words} />;
    case "mission":
      return <MissionStep lesson={lesson} />;
    default:
      return <p className="text-sm leading-6 text-muted-foreground">{step.content?.instructionTh ?? "อ่านเนื้อหา ทำแบบฝึก และกดบันทึกเมื่อเสร็จ"}</p>;
  }
}

function VocabularyStep({ words }: { words: VocabularyItem[] }) {
  if (words.length === 0) {
    return <p className="text-sm text-muted-foreground">ยังไม่มีคำศัพท์ใน seed นี้ ระบบพร้อมต่อ database จริงใน Phase ถัดไป</p>;
  }

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {words.slice(0, 4).map((word) => {
        const label = wordLabel(word);
        return (
          <div key={word.id} className="rounded-2xl border border-border bg-background/40 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-black">{label}</p>
                <p className="text-sm text-cyan-300">{word.pinyin ?? word.ipa ?? word.thaiPronunciation}</p>
                <p className="mt-1 text-sm text-muted-foreground">{word.thaiMeaning}</p>
              </div>
              <Button size="icon" variant="ghost" onClick={() => speak(label)}>
                <Volume2 className="size-4" />
              </Button>
            </div>
            <div className="mt-3 rounded-xl bg-secondary/40 p-3 text-sm leading-6">
              <p className="font-semibold">Example</p>
              <p>{word.exampleSentence}</p>
              <p className="text-muted-foreground">{word.exampleTranslationTh}</p>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Collocation: {word.collocation ?? `daily ${label}`}</p>
            <p className="mt-1 text-xs text-amber-300">Mistake: {word.commonMistake ?? "อย่าแปลตรงตัว ให้ดูบริบทของประโยค"}</p>
          </div>
        );
      })}
    </div>
  );
}

function DialogueStep({ language, categoryTh, words }: { language?: string; categoryTh: string; words: VocabularyItem[] }) {
  const first = wordLabel(words[0]);
  const second = wordLabel(words[1]);
  const lines = language === "chinese"
    ? [
        ["A", `你好，我想问一下${first}。`, `สวัสดี ฉันอยากถามเรื่อง ${words[0]?.thaiMeaning ?? first}`],
        ["B", `可以。你需要${second}吗？`, `ได้ คุณต้องการ ${words[1]?.thaiMeaning ?? second} ไหม`],
        ["A", "谢谢，请你帮我确认一下。", "ขอบคุณ ช่วยยืนยันให้หน่อย"]
      ]
    : [
        ["A", `Hi, I need help with the ${first}.`, `สวัสดี ฉันต้องการความช่วยเหลือเรื่อง ${words[0]?.thaiMeaning ?? first}`],
        ["B", `Sure. Do you also need the ${second}?`, `ได้เลย คุณต้องการ ${words[1]?.thaiMeaning ?? second} ด้วยไหม`],
        ["A", `Yes, please. This is for a ${categoryTh} situation.`, `ใช่ รบกวนด้วย อันนี้ใช้ในสถานการณ์${categoryTh}`]
      ];

  return (
    <div className="space-y-3">
      {lines.map(([speaker, line, translation]) => (
        <div key={`${speaker}-${line}`} className="rounded-2xl bg-secondary/40 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Badge variant="outline">Speaker {speaker}</Badge>
              <p className="mt-2 text-lg font-bold">{line}</p>
              <p className="mt-1 text-sm text-muted-foreground">{translation}</p>
            </div>
            <Button size="icon" variant="ghost" onClick={() => speak(line)}>
              <Volume2 className="size-4" />
            </Button>
          </div>
        </div>
      ))}
      <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm leading-6">
        <p className="font-bold text-cyan-200">Roleplay task</p>
        <p>สลับบท A/B แล้วลองพูดเอง 2 รอบ รอบแรกอ่านตาม รอบที่สองเปลี่ยนคำศัพท์เป็นคำอื่นในบทนี้</p>
      </div>
    </div>
  );
}

function ListeningStep({ language, categoryTh, transcript }: { language?: string; categoryTh: string; transcript: string }) {
  const dictation = language === "chinese" ? "ฟังแล้วพิมพ์ pinyin หรือ hanzi ที่ได้ยิน" : "ฟังแล้วพิมพ์ประโยคภาษาอังกฤษที่ได้ยิน";

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-background/40 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Badge variant="outline"><Headphones className="mr-1 size-3" /> Listening</Badge>
            <h4 className="mt-2 font-black">Transcript: {categoryTh}</h4>
          </div>
          <Button variant="glass" onClick={() => speak(transcript)}>
            <Volume2 className="size-4" /> Play TTS
          </Button>
        </div>
        <p className="mt-4 rounded-xl bg-secondary/40 p-3 text-lg font-semibold">{transcript}</p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {["0.75x", "1x", "1.25x"].map((speed) => <Badge key={speed} variant="outline">Speed {speed}</Badge>)}
      </div>
      <div className="rounded-2xl bg-secondary/40 p-4 text-sm leading-6">
        <p className="font-bold">Dictation</p>
        <p>{dictation}</p>
        <p className="mt-2 text-muted-foreground">คำตอบจะเชื่อมกับ STT/TTS จริงใน Phase ถัดไป ตอนนี้ใช้ TTS browser ช่วยฝึกฟังได้ก่อน</p>
      </div>
    </div>
  );
}

function SpeakingStep({ language, categoryTh, words }: { language?: string; categoryTh: string; words: VocabularyItem[] }) {
  const target = language === "chinese"
    ? `请帮我确认${wordLabel(words[0])}。`
    : `Could you please help me with the ${wordLabel(words[0])}?`;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-background/40 p-4">
        <Badge variant="outline"><Mic2 className="mr-1 size-3" /> Speaking target</Badge>
        <p className="mt-3 text-2xl font-black">{target}</p>
        <p className="mt-2 text-sm text-muted-foreground">สถานการณ์: {categoryTh} · ฟัง 1 รอบ แล้วพูดตาม 3 รอบ</p>
        <Button className="mt-4" variant="glass" onClick={() => speak(target)}>
          <Volume2 className="size-4" /> ฟังประโยคเป้าหมาย
        </Button>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl bg-secondary/40 p-4"><p className="font-bold">Pronunciation</p><p className="text-sm text-muted-foreground">ออกเสียงคำหลักให้ชัด</p></div>
        <div className="rounded-2xl bg-secondary/40 p-4"><p className="font-bold">Fluency</p><p className="text-sm text-muted-foreground">พูดต่อเนื่อง ไม่หยุดนาน</p></div>
        <div className="rounded-2xl bg-secondary/40 p-4"><p className="font-bold">Confidence</p><p className="text-sm text-muted-foreground">น้ำเสียงมั่นใจ สุภาพ</p></div>
      </div>
    </div>
  );
}

function ReadingStep({ language, categoryTh, categoryEn, words }: { language?: string; categoryTh: string; categoryEn: string; words: VocabularyItem[] }) {
  const first = wordLabel(words[0]);
  const second = wordLabel(words[1]);
  const passage = language === "chinese"
    ? `今天我在${categoryTh}练习中文。我会用${first}和${second}。我先听句子，然后再回答问题。`
    : `Today I am practicing English for ${categoryEn}. I need to use ${first} and ${second}. First, I read the situation. Then, I answer short questions and save new words for review.`;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-secondary/40 p-4 leading-7">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">graded passage</p>
        <p className="mt-2 text-lg font-semibold">{passage}</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-border p-4">
          <p className="font-bold">Summary ภาษาไทย</p>
          <p className="mt-2 text-sm text-muted-foreground">ผู้เรียนกำลังฝึกภาษาในสถานการณ์{categoryTh} โดยใช้คำศัพท์หลักและตอบคำถามสั้น ๆ</p>
        </div>
        <div className="rounded-2xl border border-border p-4">
          <p className="font-bold">Comprehension</p>
          <p className="mt-2 text-sm text-muted-foreground">คำถาม: บทอ่านนี้เกี่ยวกับสถานการณ์อะไร?</p>
        </div>
      </div>
    </div>
  );
}

function WritingStep({ language, categoryTh, words }: { language?: string; categoryTh: string; words: VocabularyItem[] }) {
  const prompt = language === "chinese"
    ? `เขียน 2 ประโยคภาษาจีนเกี่ยวกับ ${categoryTh} โดยใช้คำว่า ${wordLabel(words[0])}`
    : `Write 3 short sentences about ${categoryTh}. Use the word "${wordLabel(words[0])}" and one polite request.`;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-background/40 p-4">
        <Badge variant="outline"><PenLine className="mr-1 size-3" /> Writing prompt</Badge>
        <p className="mt-3 text-lg font-bold">{prompt}</p>
      </div>
      <div className="rounded-2xl bg-secondary/40 p-4 text-sm leading-6">
        <p className="font-bold">Structure guide</p>
        <ol className="mt-2 list-inside list-decimal space-y-1 text-muted-foreground">
          <li>เริ่มจากประโยคบอกสถานการณ์</li>
          <li>ใส่คำศัพท์หลักจากบทเรียน</li>
          <li>จบด้วยประโยคสุภาพหรือคำขอบคุณ</li>
        </ol>
      </div>
    </div>
  );
}

function GrammarStep({ language, words }: { language?: string; words: VocabularyItem[] }) {
  const first = wordLabel(words[0]);
  const pattern = language === "chinese" ? "Subject + 要 / 想 + Object" : "Could you please + verb + object?";
  const example = language === "chinese" ? `我想要${first}。` : `Could you please help me with the ${first}?`;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-background/40 p-4">
        <p className="text-sm text-muted-foreground">Grammar in Context</p>
        <h4 className="mt-1 text-xl font-black">Pattern: {pattern}</h4>
        <p className="mt-3 rounded-xl bg-secondary/40 p-3 text-lg font-semibold">{example}</p>
      </div>
      <div className="rounded-2xl bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
        <p className="font-bold">ข้อผิดพลาดที่พบบ่อย</p>
        <p>คนไทยมักแปลตรงตัวเกินไป ให้จำเป็น pattern แล้วเปลี่ยน object ตามสถานการณ์แทน</p>
      </div>
    </div>
  );
}

function QuizStep({ words }: { words: VocabularyItem[] }) {
  const quizWords = words.slice(0, 3);

  return (
    <div className="space-y-3">
      {quizWords.map((word, index) => (
        <div key={word.id} className="rounded-2xl border border-border bg-background/40 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Question {index + 1}</p>
          <p className="mt-2 font-bold">{word.miniQuizQuestion ?? `What does "${wordLabel(word)}" mean?`}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(word.miniQuizChoices ?? [word.thaiMeaning ?? "คำตอบ", "สวัสดี", "ขอบคุณ", "เดินทาง"]).map((choice) => <Badge key={choice} variant="outline">{choice}</Badge>)}
          </div>
          <p className="mt-3 text-sm text-cyan-300">เฉลย: {word.miniQuizAnswer ?? word.thaiMeaning}</p>
        </div>
      ))}
    </div>
  );
}

function MissionStep({ lesson }: { lesson: Lesson }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {(lesson.objectives ?? ["จำคำศัพท์หลัก", "พูดประโยคเป้าหมาย", "ทำ quiz ให้ผ่าน"]).map((objective, index) => (
        <div key={objective} className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
          <Badge variant="outline">Mission {index + 1}</Badge>
          <p className="mt-2 font-bold">{objective}</p>
        </div>
      ))}
    </div>
  );
}

export function LessonRunner({ lessonId }: { lessonId: string }) {
  const [data, setData] = useState<LessonPayload | null>(null);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function loadLesson() {
      setStatus("loading");
      try {
        const response = await fetch(`/api/lessons/${lessonId}`, { cache: "no-store" });
        const payload = (await response.json()) as { data?: LessonPayload };
        setData(payload.data ?? null);
        setCompletedSteps(readAllProgress()[lessonId]?.completedSteps ?? []);
        setStatus(response.ok ? "ready" : "not_found");
      } catch {
        setStatus("error");
      }
    }
    void loadLesson();
  }, [lessonId]);

  const lesson = data?.lesson;
  const steps = useMemo(() => lesson?.steps ?? [], [lesson]);
  const percent = steps.length ? Math.round((completedSteps.length / steps.length) * 100) : 0;

  function saveSteps(nextSteps: string[]) {
    setCompletedSteps(nextSteps);
    writeLessonProgress(lessonId, { completedSteps: nextSteps, completed: steps.length > 0 && nextSteps.length >= steps.length, updatedAt: new Date().toISOString() });
  }

  function completeStep(stepId: string) {
    if (!completedSteps.includes(stepId)) saveSteps([...completedSteps, stepId]);
  }

  function completeLesson() {
    saveSteps(steps.map((step) => step.id));
  }

  if (status === "loading") {
    return <Card className="p-6"><div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="size-4 animate-spin" /> Loading lesson...</div></Card>;
  }

  if (!lesson) {
    return <Card className="p-6"><h2 className="text-xl font-black">Lesson not found</h2><Button className="mt-4" asChild><Link href="/learn">กลับหน้า Learn</Link></Button></Card>;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.75fr]">
      <Card className="p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge>{lesson.language}</Badge>
              <Badge variant="outline">{lesson.level}</Badge>
              <Badge variant="outline">{data?.category?.icon} {data?.category?.nameTh}</Badge>
              <Badge variant="outline">{lesson.xpReward ?? 0} XP</Badge>
            </div>
            <h2 className="mt-4 text-3xl font-black">{lesson.title}</h2>
            <p className="mt-2 text-muted-foreground">{lesson.description}</p>
          </div>
          <Button asChild variant="glass"><Link href="/learn">กลับไป Learn</Link></Button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-secondary/40 p-4"><p className="text-sm text-muted-foreground">Level</p><p className="mt-1 text-xl font-black">{lesson.level}</p></div>
          <div className="rounded-2xl bg-secondary/40 p-4"><p className="text-sm text-muted-foreground">Estimated</p><p className="mt-1 text-xl font-black">{lesson.estimatedMins ?? 12} นาที</p></div>
          <div className="rounded-2xl bg-secondary/40 p-4"><p className="text-sm text-muted-foreground">Skill focus</p><p className="mt-1 text-xl font-black">Mixed</p></div>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex justify-between text-sm text-muted-foreground"><span>Lesson progress</span><span>{percent}%</span></div>
          <Progress value={percent} />
        </div>

        <div className="mt-6 space-y-5">
          {steps.map((step) => {
            const done = completedSteps.includes(step.id);
            return (
              <section key={step.id} className={`rounded-3xl border p-5 ${done ? "border-cyan-300/40 bg-cyan-300/10" : "border-border bg-secondary/30"}`}>
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300"><CheckCircle2 className="size-5" /></span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Step {step.order ?? ""} · {step.type}</p>
                      <h3 className="mt-1 text-xl font-black capitalize">{step.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">~{step.content?.estimatedMinutes ?? 3} นาที</p>
                    </div>
                  </div>
                  <Button size="sm" variant={done ? "glass" : "default"} onClick={() => completeStep(step.id)} disabled={done}>{done ? "Done" : "Mark complete"}</Button>
                </div>
                <StepContent step={step} lesson={lesson} data={data ?? {}} />
              </section>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={completeLesson}>Complete lesson</Button>
          <Button variant="outline" asChild><Link href="/review">ไปทบทวน</Link></Button>
          <Button variant="outline" asChild><Link href="/ai-tutor">ถาม AI Tutor</Link></Button>
        </div>
      </Card>

      <div className="space-y-6">
        <Card className="p-5">
          <h3 className="text-xl font-black">คำศัพท์ในบทนี้</h3>
          <div className="mt-4 space-y-3">
            {(data?.vocabulary ?? []).slice(0, 8).map((word) => {
              const display = wordLabel(word);
              return (
                <div key={word.id} className="rounded-2xl bg-secondary/40 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div><p className="font-bold">{display}</p><p className="text-sm text-cyan-300">{word.pinyin ?? word.ipa}</p><p className="text-sm text-muted-foreground">{word.thaiMeaning}</p></div>
                    <Button size="icon" variant="ghost" onClick={() => speak(display)}><Volume2 className="size-4" /></Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-xl font-black">Next actions</h3>
          <div className="mt-4 grid gap-3">
            <Button asChild variant="outline"><Link href="/tests">ทำแบบทดสอบ</Link></Button>
            <Button asChild variant="outline"><Link href="/writing">ฝึก Writing</Link></Button>
            <Button asChild variant="outline"><Link href="/speaking">ฝึก Speaking</Link></Button>
            <Button asChild variant="outline"><Link href="/progress">ดู Progress</Link></Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

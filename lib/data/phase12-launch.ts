export const launchChecklist = [
  { id: "pwa", title: "PWA install test", owner: "frontend", status: "ready" },
  { id: "auth", title: "Supabase auth smoke test", owner: "backend", status: "pending-env" },
  { id: "db", title: "Database seed test", owner: "backend", status: "pending-env" },
  { id: "ai", title: "OpenAI tutor key test", owner: "ai", status: "pending-key" },
  { id: "content", title: "Content review for Thai learners", owner: "content", status: "ready" },
  { id: "analytics", title: "Product analytics events", owner: "product", status: "planned" }
];

export const betaCohorts = [
  { id: "students", title: "นักเรียนและนักศึกษา", size: 30, focus: "daily practice and vocabulary" },
  { id: "workers", title: "วัยทำงาน", size: 30, focus: "email, meeting and interview" },
  { id: "travelers", title: "สายเที่ยว", size: 20, focus: "airport, hotel, taxi and emergency" }
];

export const feedbackBoard = [
  { id: "fb-1", area: "speaking", question: "Was the pronunciation feedback easy to understand?" },
  { id: "fb-2", area: "review", question: "Did daily review feel too easy or too hard?" },
  { id: "fb-3", area: "ai-tutor", question: "Did the tutor explain in Thai clearly?" }
];

export const releaseRoadmap = [
  { version: "0.8", name: "Admin Beta", scope: "CMS, import and full mock dataset" },
  { version: "0.9", name: "Learner Beta", scope: "Placement, progress, PWA and feedback" },
  { version: "1.0", name: "Public Launch", scope: "Supabase auth, production DB and AI keys" }
];

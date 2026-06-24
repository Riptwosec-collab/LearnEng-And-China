const baseUrl = process.env.SMOKE_TEST_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

const pages = [
  "/",
  "/auth/login",
  "/auth/register",
  "/dashboard",
  "/vocabulary",
  "/speaking",
  "/ai-tutor",
  "/admin"
];

const apis = [
  "/api/health",
  "/api/content-categories",
  "/api/db/vocabulary",
  "/api/content/expanded-vocabulary",
  "/api/production/checklist"
];

async function check(path: string) {
  const url = new URL(path, baseUrl).toString();
  const response = await fetch(url, { redirect: "manual" });
  const ok = response.status >= 200 && response.status < 400;
  console.log(`${ok ? "OK" : "FAIL"} ${response.status} ${path}`);
  if (!ok) throw new Error(`${path} returned ${response.status}`);
}

async function main() {
  console.log(`Smoke testing ${baseUrl}`);
  for (const path of [...pages, ...apis]) {
    await check(path);
  }
  console.log("Smoke test passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

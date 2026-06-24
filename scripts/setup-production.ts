import { spawnSync } from "node:child_process";

function run(command: string, args: string[]) {
  console.log(`\n> ${command} ${args.join(" ")}`);
  const result = spawnSync(command, args, { stdio: "inherit", shell: process.platform === "win32" });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log("LinguaQuest production setup runner");
console.log("This script checks env, syncs Prisma schema, seeds base data, expands vocabulary, and runs QA.");

run("npm", ["run", "env:check"]);
run("npm", ["run", "prisma:generate"]);
run("npm", ["run", "prisma:push"]);
run("npm", ["run", "seed"]);
run("npm", ["run", "content:expand"]);
run("npm", ["run", "qa"]);

console.log("\nProduction setup finished. You can deploy to Vercel after adding the same env values there.");

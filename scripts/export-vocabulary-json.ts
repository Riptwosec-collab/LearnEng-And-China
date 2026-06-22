import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { expandedVocabulary1000 } from "../lib/data/phase18-vocabulary-expansion";

async function main() {
  const outputDir = join(process.cwd(), "data", "generated");
  await mkdir(outputDir, { recursive: true });
  await writeFile(join(outputDir, "vocabulary-1000.json"), JSON.stringify(expandedVocabulary1000, null, 2));
  await writeFile(join(outputDir, "vocabulary-summary.json"), JSON.stringify({ count: expandedVocabulary1000.length, generatedAt: new Date().toISOString() }, null, 2));
  console.log(`Exported ${expandedVocabulary1000.length} generated vocabulary rows.`);
}

main();

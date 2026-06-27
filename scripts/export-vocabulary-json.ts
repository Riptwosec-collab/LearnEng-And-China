import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { expandedVocabulary1000 } from "../lib/data/phase18-vocabulary-expansion";
import { chineseVocabulary600 } from "../lib/data/vocabulary-chinese-600-pack";
import { englishVocabulary600 } from "../lib/data/vocabulary-english-600-pack";
import { generatedVocabulary1200, generatedVocabularySummary } from "../lib/data/vocabulary-seeds";

async function main() {
  const outputDir = join(process.cwd(), "data", "generated");
  await mkdir(outputDir, { recursive: true });

  await writeFile(join(outputDir, "vocabulary-1000.json"), JSON.stringify(expandedVocabulary1000, null, 2));
  await writeFile(join(outputDir, "vocabulary-english-600.json"), JSON.stringify(englishVocabulary600, null, 2));
  await writeFile(join(outputDir, "vocabulary-chinese-600.json"), JSON.stringify(chineseVocabulary600, null, 2));
  await writeFile(join(outputDir, "vocabulary-generated-1200.json"), JSON.stringify(generatedVocabulary1200, null, 2));
  await writeFile(join(outputDir, "vocabulary-summary.json"), JSON.stringify(generatedVocabularySummary, null, 2));

  console.log("Vocabulary export complete");
}

main();

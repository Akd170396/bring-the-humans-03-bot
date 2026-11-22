// bring-the-humans-03 entry program.
// Copies VIDEO.json from the bot directory into the output directory.
// Node 22, standard library only. No network, no wall clock.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Fail loudly if VIDEO.json is not the expected shape, before copying.
const parsed: unknown = JSON.parse(readFileSync(join(botDir, "VIDEO.json"), "utf8"));
if (
  typeof parsed !== "object" ||
  parsed === null ||
  typeof (parsed as { url?: unknown }).url !== "string"
) {
  throw new Error("VIDEO.json must be an object with a string url");
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(join(botDir, "VIDEO.json"), join(outputDir, "VIDEO.json"));

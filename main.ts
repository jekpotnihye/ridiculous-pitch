import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One sentence, at most 200 characters. The odd thing being sold, who
// pays, and why the business holds together all live inside this line:
// rented neighbours make a street feel loved, and that feeling is what
// buyers pay a premium for, through the estate agent.
const PITCH =
  "We rent out friendly neighbours to wave, chat and walk dogs past house viewings, and estate agents pay per viewing because buyers offer more for a street that already feels like home.";

const MAX_CHARACTERS = 200;

function characterCount(text: string): number {
  return Array.from(text).length;
}

function isOneSentence(text: string): boolean {
  const trimmed = text.trim();
  if (trimmed.length === 0 || !trimmed.endsWith(".")) {
    return false;
  }
  const body = trimmed.slice(0, -1);
  return !body.includes(".") && !body.includes("!") && !body.includes("?");
}

function resolveOutputDir(): string {
  // The grader mounts the writable output directory at /output and sets
  // MAKEFUN_OUTPUT_DIR to it; honour the variable first, then the mount.
  const fromEnv = (process.env.MAKEFUN_OUTPUT_DIR || "").trim();
  return fromEnv.length > 0 ? fromEnv : "/output";
}

function main(): void {
  const pitch = PITCH.trim();
  const length = characterCount(pitch);
  if (length < 1 || length > MAX_CHARACTERS) {
    throw new Error(`Pitch must be 1 to ${MAX_CHARACTERS} characters, got ${length}.`);
  }
  if (!isOneSentence(pitch)) {
    throw new Error("Pitch must be exactly one sentence.");
  }
  if (/[\r\n]/.test(pitch)) {
    throw new Error("Pitch must be a single line of text.");
  }
  const outputDir = resolveOutputDir();
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), pitch, "utf8");
  console.log(`Wrote entry.txt (${length} characters).`);
}

main();

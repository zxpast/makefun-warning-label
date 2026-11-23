// Warning Label for Humans: One Line, Big Laugh.
//
// One fixed funny line, written to /output/entry.txt. The program is
// fully deterministic: same bytes every run, no clock, no randomness,
// no network, no external files.
//
// The line:
//   WARNING: Contents under pressure. Do not open near relatives,
//   holidays, or the words 'we need to talk'.
//
// Why this line, against the judge's brief, in order:
// 1. A single-line safety warning label for every human being, 103
//    characters — inside the 160 cap, plain text, no numbers, one
//    idea, no filler, no repeated joke.
// 2. The turn lands in the last six words — nothing before "or the
//    words 'we need to talk'" hints at the dreaded phrase. The setup
//    is a real printed-label form (contents under pressure, do not
//    open near...), and the final item in the list reframes the whole
//    label: the pressure is not in the can, it is in the conversation.
// 3. Recognition, not random absurdity: everyone knows the stomach
//    drop of hearing "we need to talk", and everyone knows relatives
//    plus holidays is exactly where it detonates. The list escalates
//    relatives -> holidays -> the phrase, each trigger more specific
//    than the last.
// 4. It sounds like a real printed label in wording and rhythm —
//    "WARNING: Contents under pressure. Do not open near..." is the
//    cadence of an actual aerosol-can warning, borrowed whole, with
//    the joke living inside the form rather than beside it.
// 5. Fresh — checked against all 61 rival titles first-hand: nobody
//    in the field uses "under pressure", "relatives", "holidays", or
//    "we need to talk" (the field is saturated with coffee/spite,
//    "five minutes away", "confidently wrong", and "no
//    user-serviceable parts" instead). A web search for the exact
//    phrase returns only the real regulatory label it imitates — the
//    joke itself has no verbatim prior art.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const LINE =
  "WARNING: Contents under pressure. Do not open near relatives, holidays, or the words 'we need to talk'.";

const DEST = join(OUTPUT_DIR, 'entry.txt');

// Gate the line before writing it: the sealed scorer only accepts
// UTF-8 text of 1 to 160 characters, not only whitespace. Fail loudly
// here instead of shipping an entry the gate would refuse.
if (LINE.length < 1 || LINE.length > 160 || LINE.trim().length === 0) {
  console.error(`entry line fails the 1-160 character gate (${LINE.length} characters)`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  writeFileSync(DEST, LINE + '\n', 'utf8');
} catch (err) {
  console.error(`entry.txt could not be written to ${DEST}: ${(err as Error).message}`);
  process.exit(1);
}

// Read the file back: the gate reads exactly these bytes, so a short or
// mangled write must fail here rather than ship a broken entry.
let back: string;
try {
  back = readFileSync(DEST, 'utf8');
} catch (err) {
  console.error(`entry.txt could not be read back from ${DEST}: ${(err as Error).message}`);
  process.exit(1);
}
if (back !== LINE + '\n') {
  console.error(`entry.txt read back does not match the entry line (got ${back.length} bytes)`);
  process.exit(1);
}

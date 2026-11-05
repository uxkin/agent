import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

const color = stdout.isTTY && !process.env.NO_COLOR;
const wrap = (open, close) => (text) => (color ? `\x1b[${open}m${text}\x1b[${close}m` : String(text));

export const bold = wrap(1, 22);
export const dim = wrap(2, 22);
export const green = wrap(32, 39);
export const red = wrap(31, 39);
export const purple = wrap(35, 39);

export const ok = (text) => console.log(`${green("✓")} ${text}`);
export const skip = (text) => console.log(`${dim("–")} ${text}`);
export const fail = (text) => console.error(`${red("✗")} ${text}`);

export class UserError extends Error {}

export async function confirm(question, { defaultYes = true } = {}) {
  // Nobody to ask (a script or an AI agent): change nothing. --yes and --force say yes up front.
  if (!stdin.isTTY) return false;
  const rl = readline.createInterface({ input: stdin, output: stdout });
  try {
    const answer = (await rl.question(`${question} ${dim(defaultYes ? "(Y/n)" : "(y/N)")} `)).trim().toLowerCase();
    if (!answer) return defaultYes;
    return answer === "y" || answer === "yes";
  } finally {
    rl.close();
  }
}

export function truncate(text, max) {
  const clean = String(text ?? "").replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean;
}

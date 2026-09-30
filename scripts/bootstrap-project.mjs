#!/usr/bin/env node
import { copyFile, lstat, mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const addonsRoot = resolve(scriptDir, "..");
const projectRoot = resolve(process.argv[2] ?? process.cwd());
const contractsDir = join(projectRoot, "docs", "contracts");
const metaSource = join(addonsRoot, "docs", "contracts", "meta-contract.md");
const metaTarget = join(contractsDir, "meta-contract.md");
const agentsTemplate = join(addonsRoot, "templates", "AGENTS.md");
const agentsTarget = join(projectRoot, "AGENTS.md");
const blockStart = "<!-- BEGIN ad-pi-addons contract workflow -->";
const blockEnd = "<!-- END ad-pi-addons contract workflow -->";

for (const path of [
  join(projectRoot, "docs"),
  contractsDir,
  join(contractsDir, "features"),
  join(contractsDir, "surfaces"),
]) {
  try {
    if ((await lstat(path)).isSymbolicLink()) throw new Error(`Refusing to scaffold through symlinked project path: ${path}`);
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
}
await mkdir(join(contractsDir, "features"), { recursive: true });
await mkdir(join(contractsDir, "surfaces"), { recursive: true });

let metaInfo;
try {
  metaInfo = await lstat(metaTarget);
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}
if (metaInfo?.isSymbolicLink()) {
  console.warn(`Meta-contract is a symlink; preserved without following: ${metaTarget}`);
} else if (metaInfo) {
  const [existing, bundled] = await Promise.all([readFile(metaTarget), readFile(metaSource)]);
  if (!existing.equals(bundled)) console.warn(`Existing meta-contract differs; preserved without changes: ${metaTarget}`);
} else {
  await copyFile(metaSource, metaTarget);
  console.log(`Copied meta-contract: ${metaTarget}`);
}

const template = await readFile(agentsTemplate, "utf8");
const start = template.indexOf(blockStart);
const end = template.indexOf(blockEnd);
if (start < 0 || end < start) throw new Error("AGENTS template is missing contract workflow markers");
const workflowBlock = template.slice(start, end + blockEnd.length);

let agentsInfo;
try {
  agentsInfo = await lstat(agentsTarget);
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}
if (agentsInfo?.isSymbolicLink()) {
  console.warn(`AGENTS.md is a symlink; preserved without following: ${agentsTarget}`);
} else if (agentsInfo) {
  let existing = await readFile(agentsTarget, "utf8");
  const hasStart = existing.includes(blockStart);
  const hasEnd = existing.includes(blockEnd);
  if (hasStart !== hasEnd) {
    console.warn(`AGENTS.md has incomplete contract workflow markers; preserved without changes: ${agentsTarget}`);
  } else if (!hasStart) {
    existing = `${existing.trimEnd()}\n\n${workflowBlock}\n`;
    await writeFile(agentsTarget, existing, "utf8");
    console.log(`Added contract workflow to existing AGENTS.md: ${agentsTarget}`);
  } else {
    console.log(`Contract workflow already present: ${agentsTarget}`);
  }
} else {
  await copyFile(agentsTemplate, agentsTarget);
  console.log(`Created AGENTS.md from template: ${agentsTarget}`);
}

console.log(`Project contract paths ready: ${contractsDir}`);

import assert from "node:assert/strict";
import { lstat, mkdir, mkdtemp, readFile, rm, stat, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const script = fileURLToPath(new URL("./bootstrap-project.mjs", import.meta.url));
const repoRoot = fileURLToPath(new URL("../", import.meta.url));

async function fixture(run) {
  const root = await mkdtemp(join(tmpdir(), "ad-pi-project-"));
  try {
    await run(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

function bootstrap(root) {
  const result = spawnSync(process.execPath, [script, root], { cwd: repoRoot, encoding: "utf8" });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  return result;
}

test("project bootstrap creates contract paths, meta-contract, and template AGENTS", async () => fixture(async (root) => {
  const result = bootstrap(root);
  const [meta, agents] = await Promise.all([
    readFile(join(root, "docs/contracts/meta-contract.md"), "utf8"),
    readFile(join(root, "AGENTS.md"), "utf8"),
  ]);
  assert.match(meta, /What a contract describes/);
  assert.match(meta, /mark the feature contract complete for final verification, then delete the temporary feature-contract file/);
  assert.equal((await stat(join(root, "docs/contracts/features"))).isDirectory(), true);
  assert.equal((await stat(join(root, "docs/contracts/surfaces"))).isDirectory(), true);
  assert.match(agents, /BEGIN ad-pi-addons contract workflow/);
  assert.match(agents, /Project-specific commands and conventions/);
  assert.match(agents, /Use available subagent roles only when configured/);
  assert.match(agents, /If roles or skills are unavailable, work directly/);
  assert.match(agents, /mark the feature contract complete for final verification, then delete the temporary feature-contract file/);
  assert.match(agents, /Feature contracts are temporary task artifacts and must not remain after verified completion/);
  assert.match(agents, /End every task with a concise user-facing report/);
  assert.match(agents, /this rule requires no installed skills/);
  assert.doesNotMatch(agents, /pi-subagents|prepare-project skill/i);
  assert.ok(result.stdout.includes("Project contract paths ready"));
}));

test("project bootstrap preserves existing AGENTS and differing meta-contract, and is idempotent", async () => fixture(async (root) => {
  await mkdir(join(root, "docs/contracts"), { recursive: true });
  const originalAgents = "# Existing project rules\n\nKeep this guidance.\n";
  const originalMeta = "# Project-specific contract policy\nDo not replace me.\n";
  await writeFile(join(root, "AGENTS.md"), originalAgents);
  await writeFile(join(root, "docs/contracts/meta-contract.md"), originalMeta);

  const first = bootstrap(root);
  assert.match(first.stderr, /Existing meta-contract differs; preserved/);
  const changedAgents = await readFile(join(root, "AGENTS.md"), "utf8");
  assert.ok(changedAgents.startsWith(originalAgents.trimEnd()));
  assert.match(changedAgents, /BEGIN ad-pi-addons contract workflow/);
  assert.equal(await readFile(join(root, "docs/contracts/meta-contract.md"), "utf8"), originalMeta);

  bootstrap(root);
  assert.equal(await readFile(join(root, "AGENTS.md"), "utf8"), changedAgents);
}));

test("project bootstrap refuses symlinked contract directories", async () => fixture(async (root) => {
  const outside = join(root, "external-docs");
  await mkdir(outside);
  await symlink(outside, join(root, "docs"));
  const result = spawnSync(process.execPath, [script, root], { cwd: repoRoot, encoding: "utf8" });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Refusing to scaffold through symlinked project path/);
  await assert.rejects(stat(join(outside, "contracts")), { code: "ENOENT" });
}));

test("project bootstrap preserves a dangling meta-contract symlink", async () => fixture(async (root) => {
  const target = join(root, "missing-external-contract.md");
  const meta = join(root, "docs/contracts/meta-contract.md");
  await mkdir(join(root, "docs/contracts"), { recursive: true });
  await symlink(target, meta);
  const result = bootstrap(root);
  assert.match(result.stderr, /Meta-contract is a symlink; preserved without following/);
  assert.equal((await lstat(meta)).isSymbolicLink(), true);
  await assert.rejects(readFile(target), { code: "ENOENT" });
}));

test("project bootstrap does not follow an AGENTS symlink outside the project", async () => fixture(async (root) => {
  const outside = join(root, "..", `external-agents-${process.pid}.md`);
  const original = "# External instructions\n";
  try {
    await writeFile(outside, original);
    await symlink(outside, join(root, "AGENTS.md"));
    const result = bootstrap(root);
    assert.match(result.stderr, /AGENTS.md is a symlink; preserved without following/);
    assert.equal(await readFile(outside, "utf8"), original);
  } finally {
    await rm(outside, { force: true });
  }
}));

test("project bootstrap does not rewrite AGENTS with incomplete workflow markers", async () => fixture(async (root) => {
  const partial = "# Existing\n<!-- BEGIN ad-pi-addons contract workflow -->\nmanual edit in progress\n";
  await writeFile(join(root, "AGENTS.md"), partial);
  const result = bootstrap(root);
  assert.match(result.stderr, /incomplete contract workflow markers; preserved/);
  assert.equal(await readFile(join(root, "AGENTS.md"), "utf8"), partial);
}));

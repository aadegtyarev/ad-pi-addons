import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const repoRoot = fileURLToPath(new URL("../", import.meta.url));

async function readRepoFile(path) {
  return readFile(join(repoRoot, path), "utf8");
}

test("catalog has one canonical pi-plugins package and no standalone extension records", async () => {
  const catalog = JSON.parse(await readRepoFile("catalog/addons.json"));
  const matches = catalog.packages.filter(({ id }) => id === "pi-plugins");
  assert.deepEqual(matches, [{ id: "pi-plugins", source: "git:github.com/aadegtyarev/pi-plugins", kind: "pi-package" }]);
  assert.equal(Object.hasOwn(catalog, "extensions"), false);
});

test("Pi package exposes both skills and bundles the documentation skill resources", async () => {
  const pkg = JSON.parse(await readRepoFile("package.json"));
  assert.deepEqual(pkg.pi.skills, ["./skills/prepare-project", "./skills/repo-docs"]);

  const docsSkill = await readRepoFile("skills/repo-docs/SKILL.md");
  assert.match(docsSkill, /^---\nname: repo-docs\n/m);
  assert.match(docsSkill, /^description: "[^"]+"$/m);
  assert.match(docsSkill, /references\/page-shapes\.md/);
  assert.match(docsSkill, /references\/diagrams\.md/);
  assert.match(docsSkill, /references\/anti-slop\.md/);
  assert.doesNotMatch(docsSkill, /\/home\/|\/mnt\//);
  for (const file of [
    "skills/repo-docs/references/page-shapes.md",
    "skills/repo-docs/references/diagrams.md",
    "skills/repo-docs/references/anti-slop.md",
    "skills/repo-docs/scripts/check_docs.py",
    "skills/repo-docs/LICENSE",
  ]) await readRepoFile(file);
});

test("prepare-project guards all legacy duplicate paths", async () => {
  const skill = await readRepoFile("skills/prepare-project/SKILL.md");
  for (const name of ["pi-ad-telegram", "pi-ad-session-usage", "pi-ad-hooks"]) {
    assert.ok(skill.includes(`~/.pi/agent/extensions/${name}`), `missing legacy path check for ${name}`);
  }
  assert.match(skill, /dangling symlink/);
  assert.match(skill, /Do not install `pi-plugins` until the user resolves\/approves the conflict/);
  assert.match(skill, /Never change user-global Pi settings or symlinks/);
});

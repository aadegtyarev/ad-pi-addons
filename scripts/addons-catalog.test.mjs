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

test("Pi package exposes only prepare-project and guards all legacy duplicate paths", async () => {
  const pkg = JSON.parse(await readRepoFile("package.json"));
  assert.deepEqual(pkg.pi.skills, ["./skills/prepare-project"]);

  const skill = await readRepoFile("skills/prepare-project/SKILL.md");
  for (const name of ["pi-ad-telegram", "pi-ad-session-usage", "pi-ad-hooks"]) {
    assert.ok(skill.includes(`~/.pi/agent/extensions/${name}`), `missing legacy path check for ${name}`);
  }
  assert.match(skill, /dangling symlink/);
  assert.match(skill, /Do not install `pi-plugins` until the user resolves\/approves the conflict/);
  assert.match(skill, /Never change user-global Pi settings or symlinks/);
});

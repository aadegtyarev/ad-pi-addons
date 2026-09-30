# Feature contract: ad-pi-addons repository bootstrap

- **Status:** complete
- **Approved:** 2026-09-29
- **Goal:** Create a private, MIT-licensed GitHub repository that distributes the user's Pi add-ons and provides a reusable project-preparation workflow.
- **Affected surfaces:** [Pi package distribution](../surfaces/pi-addon-distribution.md); [project preparation](../surfaces/project-preparation.md). These contracts are introduced by this feature.

## Expected behavior

1. Create `aadegtyarev/ad-pi-addons` as a private GitHub repository and push a verified initial commit.
2. Bundle the current tested `pi-ad-telegram` source, tests, and setup documentation without modifying the existing `pi-plugins` working tree.
3. Distribute a `prepare-project` Pi skill from the private Git package. The package must not auto-load the bundled Telegram extension: it lives outside Pi's conventional extension discovery path to avoid duplicate loading with an existing personal symlink.
4. Record the currently installed personal add-ons and pinned versions in a catalog. The project-preparation workflow checks `pi list`, installs only missing personal packages, and does not upgrade existing ones.
5. Install/link the bundled Telegram extension only when its personal extension path is absent. Never replace an existing file, directory, or symlink without user approval.
6. For a project, create `docs/contracts/features/` and `docs/contracts/surfaces/`, copy the meta-contract only when absent, and merge concise instructions into `AGENTS.md` without overwriting existing project guidance.
7. Provide a reusable meta-contract, `AGENTS.md` template, and clear setup/update instructions.

## Non-goals

- Publish the repository publicly or release the add-ons on npm.
- Automatically upgrade installed packages, replace existing extension installations, or modify project-local Pi settings.
- Store or distribute bot credentials.
- Rewrite existing project contracts or unrelated `AGENTS.md` instructions.

## Interfaces and constraints

- Repository: `github.com/aadegtyarev/ad-pi-addons`, private, MIT.
- Installable package source: `git:github.com/aadegtyarev/ad-pi-addons`.
- The package exposes the preparation skill only; the bundled Telegram extension is installed separately as a personal extension symlink if missing.
- Current package baseline includes this repository package `git:github.com/aadegtyarev/ad-pi-addons`, plus `pi-web-access@0.32.0`, `pi-subagents@0.32.0`, `pi-intercom@0.15.0`, `pi-prompt-template-model@0.12.3`, `@harms-haus/pi-cwd@1.0.0`, `@harms-haus/pi-processes@0.1.0`, `@harms-haus/pi-worktrees@1.0.0`, `@harms-haus/pi-lens@2.1.0`, plus `pi-ad-telegram`.

## Acceptance criteria

- The private remote exists and contains the verified initial commit; the Pi skill package is installed from that remote in personal settings.
- The package manifest selects the preparation skill without discovering `plugins/pi-ad-telegram` as an extension.
- Catalog entries match the installed baseline and Telegram extension source.
- The skill includes safe, repeatable behavior for missing packages, existing symlinks, existing contracts, and existing `AGENTS.md`.
- The bundled Telegram plugin passes its tests and typecheck from this repository.
- `scripts/bootstrap-project.test.mjs` verifies a fresh disposable project gets the contract paths/template and that existing AGENTS/meta-contract files are preserved, merged idempotently, and not overwritten on marker conflicts.
- Global orchestration instructions tell the orchestrator to save approved contracts before planning/implementation, and to pass them to planner, worker, and reviewer.

## Validation

- `npm test`
- `npm run typecheck`
- `git diff --check`
- Inspect the package resource manifest and verify no extension is auto-discovered.
- Validate private GitHub repository visibility and successful push without exposing credentials.
- `npm test` exercises project scaffolding against disposable fixtures with absent, existing, differing, and partially edited instruction/contract files.

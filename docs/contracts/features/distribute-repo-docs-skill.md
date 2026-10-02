# Feature contract: distribute the repository documentation skill

Status: approved

## Goal and user-visible behavior

Distribute a portable `repo-docs` Pi skill from the personal `ad-pi-addons` Git package so Pi can load documentation-writing guidance globally alongside `prepare-project`.

## Scenarios

- A user installs or updates the existing personal `ad-pi-addons` package and Pi discovers both `prepare-project` and `repo-docs`.
- The authoring skill can guide writing/reviewing repository documentation from its bundled references without relying on this repository's source tree or absolute local paths.
- Package tests catch an incorrect skill manifest or missing skill assets.

## Scope

- Add `skills/repo-docs/` with portable authoring instructions, references, `scripts/check_docs.py`, and attribution/license promoted from `pi-plugins/.agents/skills/repo-docs/` and grounded in the installed Claude Code `repo-docs` skill.
- Add `./skills/repo-docs` to the Pi package manifest while retaining `./skills/prepare-project`.
- Update `README.md`, `AGENTS.md`, `docs/contracts/surfaces/pi-addon-distribution.md`, and package tests to describe and enforce the two-skill package.
- Verify the existing user's personal install with `pi list` and a skill-discovery check after installing the approved feature ref. This explicitly authorizes using the current Git package identity; do not add a second package or edit unrelated global settings.

## Non-goals

- Do not change `prepare-project` behavior or the add-ons catalog.
- Do not migrate or install extension source code in `ad-pi-addons`.
- Do not make the repository public, merge a PR, or change the installed global package ref without reporting it.
- Do not copy `pi-plugins` project-specific facts into the global skill.

## Affected surface contracts

- `docs/contracts/surfaces/pi-addon-distribution.md`
- Related task-wide source of truth in the sibling repository: `/mnt/hdd/Develop/Hobby/pi-plugins/docs/contracts/features/concise-docs-and-global-authoring-skill.md`

## Constraints and interfaces

- Read `docs/contracts/meta-contract.md` and preserve its temporary feature-contract lifecycle.
- `package.json` currently identifies the package as `git:github.com/aadegtyarev/ad-pi-addons`; the Pi manifest currently exposes only `./skills/prepare-project`.
- Pi package resources are declared in the `pi.skills` array using paths relative to the package root. The package is already installed in the user's personal/global Pi scope.
- Work on topic branch `feat/repo-docs-skill`, preserve `main`, and deliver changes through a PR. Do not commit or push to `main`.
- Keep the skill's name, directory, and frontmatter aligned; preserve the upstream `repo-docs` attribution and MIT license.

## Acceptance criteria

- `skills/repo-docs/SKILL.md`, all referenced pages, the bundled checker, and license exist and are portable.
- The package manifest exposes exactly the intended skills, `prepare-project` and `repo-docs`; tests verify both entries and all bundled references.
- README and distribution contract accurately state that the Pi package exposes both skills; the preparation contract remains behaviorally accurate.
- `npm test` and `git diff --check` pass.
- The already-installed personal package loads from the approved feature ref, `pi list` confirms it, and Pi discovers `repo-docs` without an extra package entry.
- Read-only `gpt-6-luna` review uses the skill and reports no unresolved issues.

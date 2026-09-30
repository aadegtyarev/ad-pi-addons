# Surface contract: project preparation

## Boundary, consumers, and ownership

The `prepare-project` Pi skill prepares a new or existing project repository for the user's standard personal Pi add-ons and contract workflow. It is invoked by the orchestrator when the user asks to prepare a project/repository.

## Observable inputs, outputs, and flows

- Input: an existing/new project root and its current instructions/configuration.
- The skill inspects the project before editing and compares personal Pi package availability with `catalog/addons.json`. Without Pi skills, maintainers can run `scripts/bootstrap-project.mjs` directly to scaffold contract files and the standalone AGENTS instructions; this fallback does not install Pi packages or extensions.
- Missing catalog packages are installed at personal scope with their catalog source. Already configured package identities are left at their current versions; no upgrades occur.
- Before installing `pi-plugins`, the skill checks `~/.pi/agent/extensions/pi-ad-telegram`, `~/.pi/agent/extensions/pi-ad-session-usage`, and `~/.pi/agent/extensions/pi-ad-hooks`. Any existing file, directory, or symlink (including a dangling symlink) is preserved; report the conflict and ask the user before installing the package or migrating the standalone extension. Never change user-global Pi settings or symlinks.
- The project receives `docs/contracts/features/`, `docs/contracts/surfaces/`, and a copy of the meta-contract only if no project copy exists.
- `AGENTS.md` is created from the template and tailored to verified project conventions if absent. For an existing file, bootstrap adds the managed workflow block only when no such block exists; complete or partial existing blocks are preserved. The generated block directs nontrivial codebase or documentation reconnaissance to a bounded, read-only investigation by a suitable configured role, requesting source paths and concise evidence rather than whole-document dumps; trivial lookups stay direct, and the parent retains scope and synthesis. If no suitable role is available, work directly and report when an independent review cannot be obtained. It also requires a concise final user-facing report for every task, including changes, checks, and unresolved risks or blockers, and updating durable surface contracts before deleting completed temporary feature contracts. These instructions are self-contained and do not depend on Pi skills.
- The skill reports packages present/installed, files changed, checks run, and conflicts.

## Failure behavior and recovery

If an existing meta-contract differs, preserve it and ask before replacement/merge. If `AGENTS.md` cannot be merged safely, do not overwrite it. If any legacy standalone extension path conflicts with a `pi-plugins` resource, do not install the package; preserve the path, report its state, and request explicit approval before package installation or migration. Report package installation failures without claiming success.

## Security and data limits

- Install personal packages only; do not write project-local `.pi/settings.json` as part of this workflow.
- Do not print, copy, or commit secrets.
- Installing Pi packages can load executable code; use the pinned catalog sources and leave existing installations unchanged.

## Non-goals

- Rewriting project-specific instructions or existing contracts.
- Automatically changing package versions, migrating existing symlinks, or configuring credentials.

## Related contracts

- [Pi add-on distribution](pi-addon-distribution.md)

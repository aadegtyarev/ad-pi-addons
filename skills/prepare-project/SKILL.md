---
name: prepare-project
description: Prepare a repository for work with the user's standard Pi add-ons and contract workflow. Use when asked to prepare, initialize, or set up a project/repository for the user.
---

# Prepare a project repository

Use this workflow when the user asks to prepare an existing or new project repository. The add-ons package root is two directories above this skill directory. Read its `catalog/addons.json`, `docs/contracts/meta-contract.md`, and `templates/AGENTS.md` as the source of truth.

## 1. Inspect first

- Resolve the target repository root and inspect its `AGENTS.md`, README, project configuration, existing `.pi` settings, and `docs/` tree.
- Check Pi's personal packages with `pi list`; compare by package identity/name, not exact version. If an addon is already present, leave its version unchanged. Do not install/update over an existing package. Identify missing packages and install their catalog sources with `pi install <source>` (personal scope; do not use `--local`). Before installing missing `pi-plugins`, check the legacy standalone extension paths `~/.pi/agent/extensions/pi-ad-telegram`, `~/.pi/agent/extensions/pi-ad-session-usage`, and `~/.pi/agent/extensions/pi-ad-hooks`. Treat any existing file, directory, or symlink—including a dangling symlink—as a conflict. Preserve the path without modifying, deleting, or retargeting it; report which resource conflicts and ask the user before installing `pi-plugins` or migrating the standalone extension. Do not install `pi-plugins` until the user resolves/approves the conflict. Never change user-global Pi settings or symlinks.
- Do not print, copy, or store bot tokens, API keys, or other credentials in repository files.

## 2. Add contract structure and merge instructions safely

- Run `node <add-ons-package-root>/scripts/bootstrap-project.mjs <project-root>`. It creates `docs/contracts/features/` and `docs/contracts/surfaces/`, copies the meta-contract only if absent, and safely creates/merges the marked contract-workflow block in `AGENTS.md`.
- Inspect its output. If it reports a symlinked contract path/AGENTS file or that an existing meta-contract differs, preserve it and ask before replacing or merging. Never follow symlinks to rewrite external instructions/contracts or overwrite/delete existing project contracts.
- If the script finds malformed/partial workflow markers or another unclear conflict, inspect and ask rather than rewriting the file.
- After scaffolding, inspect the project and fill the AGENTS project-specific section with verified stack, paths, and validation commands. Keep it compact; detailed contract rules belong in `docs/contracts/meta-contract.md`.

## 3. Verify and report

- Re-read the changed files, verify existing files were preserved, and run relevant project checks if setup changes could affect them.
- Report packages already present/installed, the Telegram extension state, files created/updated, checks run, and any unresolved conflicts. Do not claim an installation succeeded unless `pi list` or equivalent confirms it.

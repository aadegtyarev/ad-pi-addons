# ad-pi-addons

Personal Pi add-ons and a reusable project-preparation workflow. This repository is intended to be private; MIT licensing describes the code's license and does not make the repository public.

## Install into Pi

Prerequisites: Pi, Git, and access to the private GitHub repository (SSH authentication is recommended).

```sh
pi install git:github.com/aadegtyarev/ad-pi-addons
```

The Pi package manifest intentionally installs **only** the `prepare-project` skill. The canonical source for the first-party extensions is [`pi-plugins`](https://github.com/aadegtyarev/pi-plugins), installed from the catalog as a personal Pi package.

After installing this package, ask the orchestrator to prepare a project. The skill compares personal Pi packages with `catalog/addons.json`, installs missing packages without changing existing package versions, creates the contract paths, copies the meta-contract when absent, and merges the compact process instructions into the project's `AGENTS.md`. Before installing `pi-plugins`, it checks the legacy standalone extension paths for `pi-ad-telegram`, `pi-ad-session-usage`, and `pi-ad-hooks`. If any file, directory, or symlink exists at one of those paths, the skill preserves it and asks before installing or migrating; it never changes user-global Pi settings or symlinks.

### Scaffold a project without Pi skills

With Node.js available and this repository cloned, the contract files and self-contained `AGENTS.md` guidance can be installed without any Pi skills:

```sh
node /path/to/ad-pi-addons/scripts/bootstrap-project.mjs /path/to/project
```

This scaffolds contract directories, copies the meta-contract only when absent, and safely adds the marked workflow block to `AGENTS.md`. It does not install Pi packages; use the preparation skill for the full add-on setup.

Update this package with:

```sh
pi update git:github.com/aadegtyarev/ad-pi-addons
```

## What's included

- `catalog/addons.json` — the desired personal Pi package sources, including canonical `pi-plugins`.
- `docs/contracts/meta-contract.md` — shared rules for feature and surface contracts.
- `templates/AGENTS.md` — compact project-level agent instructions.
- `skills/prepare-project/SKILL.md` — reusable workflow for preparing a repository.
- `scripts/bootstrap-project.mjs` — safe, idempotent scaffolding for contract directories and the marked `AGENTS.md` process block.

The package catalog reflects the user's installed personal add-ons as verified in `catalog/addons.json`. Edit it deliberately as the desired baseline changes. It does not include Pi's built-in capabilities.

The `pi-plugins` package provides the first-party Telegram bridge and other extensions. Review its [installation and configuration documentation](https://github.com/aadegtyarev/pi-plugins) before enabling extensions. Only use trusted Telegram user IDs: an extension runs with the Pi process's permissions.

## Validate

```sh
npm test
```

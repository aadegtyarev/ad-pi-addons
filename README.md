# ad-pi-addons

Personal Pi add-ons and a reusable project-preparation workflow. This repository is intended to be private; MIT licensing describes the code's license and does not make the repository public.

## Install into Pi

Prerequisites: Pi, Git, and access to the private GitHub repository (SSH authentication is recommended).

```sh
pi install git:github.com/aadegtyarev/ad-pi-addons
```

The Pi package manifest intentionally installs **only** the `prepare-project` skill. The Telegram extension is bundled under `plugins/`, outside Pi's conventional extension-discovery path, to avoid loading it twice when an existing user extension symlink points to another copy.

After installing the package, ask the orchestrator to prepare a project. The skill compares the personal Pi packages with `catalog/addons.json`, installs missing pinned packages, installs the Telegram extension only if it is missing, creates the contract paths, copies the meta-contract, and merges the compact process instructions into the project's `AGENTS.md`.

Update this package with:

```sh
pi update git:github.com/aadegtyarev/ad-pi-addons
```

## What's included

- `plugins/pi-ad-telegram/` — the Telegram bridge extension and tests.
- `catalog/addons.json` — pinned package sources and the personal extension installation target.
- `docs/contracts/meta-contract.md` — shared rules for feature and surface contracts.
- `templates/AGENTS.md` — compact project-level agent instructions.
- `skills/prepare-project/SKILL.md` — reusable workflow for preparing a repository.
- `scripts/bootstrap-project.mjs` — safe, idempotent scaffolding for contract directories and the marked `AGENTS.md` process block.

The package catalog reflects the user's installed personal add-ons at repository creation time. Edit it deliberately as the desired baseline changes. It does not include Pi's built-in capabilities.

## Install the bundled Telegram extension manually

If you already have a `pi-ad-telegram` extension in `~/.pi/agent/extensions/`, keep it; do not create a second copy. Otherwise, from a clone of this repository:

```sh
ln -s "$(pwd)/plugins/pi-ad-telegram" ~/.pi/agent/extensions/pi-ad-telegram
```

Configure the bot before use:

```sh
export PI_TELEGRAM_BOT_TOKEN='token-from-BotFather'
export PI_TELEGRAM_ALLOWED_USER_IDS='123456789'
pi --telegram
```

Or set `PI_TELEGRAM_ENABLED=1`. Only use trusted Telegram user IDs: the bot can run commands with the Pi process's permissions. See [`plugins/pi-ad-telegram/README.md`](plugins/pi-ad-telegram/README.md) for details.

## Validate

```sh
npm install
npm test
npm run typecheck
```

# ad-pi-addons

Personal Pi skills and a package catalog for preparing projects and writing reliable repository documentation.

## Install into Pi

Requirements: Pi, Git, and access to the private GitHub repository (SSH authentication is recommended).

```sh
pi install git:github.com/aadegtyarev/ad-pi-addons
```

The package exposes two personal skills: `prepare-project` and `repo-docs`. The first prepares repositories for the user's add-ons and contract workflow; the second helps write, shorten, and review repository docs. The catalog's canonical first-party extension package is [`pi-plugins`](https://github.com/aadegtyarev/pi-plugins).

`prepare-project` preserves existing package versions and files. Before installing `pi-plugins`, it checks for legacy standalone extension paths and asks before any conflicting install or migration. It does not change user-global settings or symlinks.

## Scaffold without Pi skills

With Node.js and a local clone, scaffold contract directories and safe `AGENTS.md` guidance without installing packages:

```sh
node /path/to/ad-pi-addons/scripts/bootstrap-project.mjs /path/to/project
```

## Package contents and checks

- `catalog/addons.json` — desired personal package sources.
- `skills/prepare-project/` — project setup workflow.
- `skills/repo-docs/` — portable docs-writing skill, references, and checker.
- `docs/contracts/meta-contract.md` and `templates/AGENTS.md` — contract and agent-guidance sources.

The catalog is the intended baseline, not a list of Pi's built-in capabilities. Review extension sources before enabling them; they run with the Pi process's permissions.

```sh
npm test
```

Use `pi update git:github.com/aadegtyarev/ad-pi-addons` to update an installed package.

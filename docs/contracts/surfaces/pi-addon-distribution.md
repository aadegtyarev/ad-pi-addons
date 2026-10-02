# Surface contract: Pi add-on distribution

## Boundary, consumers, and ownership

`ad-pi-addons` is the private Git repository and personal Pi package distributing project-preparation and repository-documentation skills plus a package catalog. Pi users install the package; `prepare-project` consumes its catalog and assets. The canonical source for first-party extensions is the separate `pi-plugins` Git package.

## Observable inputs, outputs, and flows

- Install the personal package with `pi install git:github.com/aadegtyarev/ad-pi-addons`.
- The Pi package exposes the `prepare-project` and `repo-docs` skills.
- The catalog records the desired personal Pi package sources. npm entries may pin versions; `pi-plugins` uses the Git source `git:github.com/aadegtyarev/pi-plugins`.
- The root Pi package manifest exposes both skills; it does not bundle extension source code.
- Before installing `pi-plugins`, the preparation skill checks legacy standalone extension paths for `pi-ad-telegram`, `pi-ad-session-usage`, and `pi-ad-hooks`. Any existing file, directory, or symlink is preserved and reported; the user is asked before package installation or migration.
- `prepare-project` scaffolds repository guidance; `repo-docs` bundles portable writing references and a documentation checker.
- README instructions describe package installation/update and local validation.

## Interfaces and compatibility

- Pi package install/update is through Pi's `git:` package source.
- `pi-plugins` is installed through Pi's `git:` package source and owns its four extension entry points.
- Existing legacy standalone extension paths are never replaced, removed, or retargeted automatically.

## Failure behavior and recovery

Private repository installation requires valid GitHub authentication. If package installation fails, report it and preserve current installations. If a legacy standalone extension path conflicts with a package resource, stop before installing `pi-plugins`, report the path, and ask the user how to proceed.

## Security and data limits

The repository contains no bot tokens or API credentials. Extensions from `pi-plugins` execute with the permissions of their Pi process; only trusted Telegram user IDs should be configured.

## Non-goals

- Public npm distribution or public repository access.
- Automatic package upgrades or replacement of existing extension paths.

## Related contracts

- [Project preparation](project-preparation.md)

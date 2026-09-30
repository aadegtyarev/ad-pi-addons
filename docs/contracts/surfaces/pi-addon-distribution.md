# Surface contract: Pi add-on distribution

## Boundary, consumers, and ownership

`ad-pi-addons` is the private Git repository and Pi package distributing personal add-on setup guidance, a package catalog, and the bundled Telegram extension. Pi users install the package; the project-preparation skill consumes its catalog and assets.

## Observable inputs, outputs, and flows

- Install the personal package with `pi install git:github.com/aadegtyarev/ad-pi-addons`.
- The Pi package exposes the `prepare-project` skill only.
- The catalog records the desired pinned sources for the personal npm Pi packages and the bundled Telegram extension.
- `plugins/pi-ad-telegram/` is deliberately outside Pi's conventional extension-discovery directories. The skill may link it into `~/.pi/agent/extensions/pi-ad-telegram` only when that path is absent.
- README instructions describe update, local testing, and Telegram setup.

## Interfaces and compatibility

- Pi package install/update is through Pi's `git:` package source.
- The Telegram extension requires Pi's host APIs and personal bot environment variables; it is not auto-loaded as part of the add-ons package.
- Existing legacy extension paths are not replaced automatically.

## Failure behavior and recovery

Private repository installation requires valid GitHub authentication. If package installation or extension linking fails, report it and preserve current installations; do not silently fall back to destructive migration.

## Security and data limits

The repository contains no bot tokens or API credentials. The bundled Telegram extension executes with the permissions of its Pi process; only trusted Telegram user IDs should be configured.

## Non-goals

- Public npm distribution or public repository access.
- Automatic package upgrades or replacement of existing extension paths.

## Related contracts

- [Project preparation](project-preparation.md)

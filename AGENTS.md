# Repository instructions

- Before planning or implementing a feature, read `docs/contracts/meta-contract.md`, agree on the contract, then save the approved feature contract under `docs/contracts/features/`.
- Identify and read affected `docs/contracts/surfaces/` contracts. Pass exact contract paths to planner, worker/coder, and reviewer; each must read them. If implementing directly, use the same contracts.
- If scope or a surface changes, pause and get approval. After validation, update affected surface contracts and mark the feature contract complete.
- The root Pi package intentionally exposes the `prepare-project` skill only. Keep `plugins/pi-ad-telegram/` outside Pi resource-discovery roots to avoid duplicate loading with personal extension installs.
- Do not replace a user's existing Pi package, extension path, project `AGENTS.md`, or contract without explicit approval.
- Use available subagent roles only when configured. If roles or skills are unavailable, work directly from the same contracts and checks, and state any unavailable independent review.

## Validation

- End every task with a concise user-facing report of what changed, checks and outcomes, and remaining risks or blockers. Do not finish with tool output alone or end silently; this rule requires no installed skills.
- `npm test`
- `npm run typecheck`
- `git diff --check`

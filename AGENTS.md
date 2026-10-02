# Repository instructions

- Before planning or implementing a feature, read `docs/contracts/meta-contract.md`, agree on the contract, then save the approved feature contract under `docs/contracts/features/`.
- Identify and read affected `docs/contracts/surfaces/` contracts. Pass exact contract paths to planner, worker/coder, and reviewer; each must read them. If implementing directly, use the same contracts.
- If scope or a surface changes, pause and get approval. After validation, update affected surface contracts, mark the feature contract complete for final verification, then delete the temporary feature-contract file as directed by the meta-contract.
- The root Pi package exposes `prepare-project` and the portable `repo-docs` skill. `pi-plugins` is the canonical package for first-party extension source; preserve legacy standalone extension paths and ask before installing if they can cause duplicate loading.
- Do not replace a user's existing Pi package, extension path, project `AGENTS.md`, or contract without explicit approval.
- Use available subagent roles only when configured. For nontrivial codebase or documentation reconnaissance, delegate bounded, read-only investigation when a suitable role is available; request relevant source paths and concise evidence, not whole-document dumps. Keep trivial lookups direct; the parent owns scope, decisions, synthesis, verification, and user communication. If no suitable role is available, work directly from the same contracts and checks, and state if independent review cannot be obtained. This does not require a named Pi skill.

## Validation

- End every task with a concise user-facing report of what changed, checks and outcomes, and remaining risks or blockers. Do not finish with tool output alone or end silently; this rule requires no installed skills.
- `npm test`
- `git diff --check`

# Project instructions

<!-- BEGIN ad-pi-addons contract workflow -->
## Contracts and feature work
- Read `docs/contracts/meta-contract.md` before implementing or reviewing a feature.
- Before implementation, agree on and save the approved feature contract under `docs/contracts/features/`; identify and read affected `docs/contracts/surfaces/` contracts.
- Give the exact contract paths to the planner, implementer, and reviewer. If working directly, use the same contracts as the source of truth.
- If implementation reveals a changed surface or acceptance scope, stop and get approval before proceeding. After verification, update affected surface contracts, mark the feature contract complete for final verification, then delete the temporary feature-contract file.
- Preserve existing instructions and surface contracts; never overwrite or delete them silently. Feature contracts are temporary task artifacts and must not remain after verified completion.
- Use available subagent roles only when configured. For nontrivial codebase or documentation reconnaissance, delegate bounded, read-only investigation to a suitable configured role when available; request relevant source paths and concise evidence, not whole-document dumps. Keep trivial lookups direct. The parent owns scope, decisions, synthesis, verification, and user communication. If no suitable role is available, work directly from the same contracts and checks, and state if independent review cannot be obtained. This rule does not require named Pi skills.
## Working principles
- Most result for least effort: first the 20% of the work that delivers 80% of the result; the rest only if it is still worth it.
- Make the simplest change that solves the task. Add an abstraction, layer, option or dependency only for real duplication now, a seam the task needs, or the contract; handle realistic failures and all outside input, not imaginary cases.
- Split a large request into small slices: each touches the fewest surfaces and the least code, gives a result the user can check, and ships as its own PR.
- Before designing a user-facing surface, offer to study how the best products solve it; do it only if the user agrees.
- Describe only the current state in code, comments and contracts: no history notes or kept-for-reference code. Comment only a short why.
- Run only the checks the change can affect; the full suite only for shared parts, before a release, or when the project requires it. Look at rendered UI at phone and desktop sizes.
- Reviews block only on reachable defects with real harm, unapproved scope, a weakened protection, or unjustified complexity.
- Delegate with at least medium reasoning effort, high for planning, review and architecture. With several models: plan on the strongest, implement on a cheaper capable one, review on a different one. If the project does not say which models to use, ask the user once (available, for what, which are expensive) and record the answer here.
- End every task with a concise user-facing report of what changed, checks and outcomes, and remaining risks or blockers. Do not finish with tool output alone or end silently; this rule requires no installed skills.
<!-- END ad-pi-addons contract workflow -->

## Project-specific commands and conventions
<!-- Fill these in after inspecting the repository. -->
- Stack and important paths:
- Tests / typecheck / build:
- Formatting and style:
- Project-specific constraints:

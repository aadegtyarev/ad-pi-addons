---
name: repo-docs
description: Write, rewrite, and review documentation shipped with code: READMEs, references, guides, skills, and contracts. Use when repository docs need clearer narrative, shorter task paths, accurate examples, navigation, or diagrams. Verify claims against source; preserve limitations, security notes, and interfaces.
---

# Repository documentation

Use this skill for documentation maintained with a codebase. It is not for office documents, public wikis, design plans for unimplemented features, comments, docstrings, commit messages, or PR descriptions.

## Workflow

1. **Read the implementation.** Check entry points, parsers, types, tests, and public APIs before relying on existing docs.
2. **Inventory pages and links.** Find maintained docs and search the whole repository before renaming or removing a page.
3. **Agree on scope.** Follow the repository's contract workflow. Do not plan or edit a feature until its contract is approved; identify the affected surface contracts.
4. **Write for a reader task.** Choose a tutorial, how-to, reference, explanation, or contributor guide. Outline the page before drafting; see `references/page-shapes.md`.
5. **Tell a clear story.** Lead readers from purpose to their next action. Keep a README an entry point, not a copy of every reference. Remove repetition, not necessary steps or context.
6. **Verify every claim.** Check commands, paths, defaults, limits, outputs, and errors against source or a real run. Never invent output or copy an old claim without rechecking it.
7. **Use diagrams selectively.** Diagram a real mechanism, sequence, branch, or lifecycle—not a list or page outline. See `references/diagrams.md`.
8. **Edit for plain language.** Read `references/anti-slop.md`. Keep caveats, security warnings, failure handling, and non-goals even when they complicate a sentence.
9. **Validate and review.** Run the repository's documentation check if it provides one. Otherwise run the bundled checker with Python 3.11+: `python3 <path-to-this-skill>/scripts/check_docs.py <repository-root>`. Review links, anchors, fences, diagrams, and the final diff; run relevant project checks.

## Hard rules

- Do not write documentation from documentation alone. Every user-visible fact must be grounded in current source or a verified run.
- Never quietly remove a limitation, security warning, compatibility note, privacy constraint, or known failure mode.
- Do not turn implementation details into guarantees unless the source and contract support them.
- Do not fabricate sample output or install commands shown in docs just to reproduce output without authorization.
- Do not multiply pages for symmetry. Link related reader tasks instead of repeating them.
- Follow project language, license, contribution, and publishing rules. Do not commit, push, publish, or alter user-global settings unless authorized.

## Choose a page form

| Reader needs | Page form | Keep out |
|---|---|---|
| Learn from zero | Tutorial: one verified path to a result | Branching catalogues |
| Complete a task | How-to: goal or symptom, then steps | Long design rationale |
| Look up a fact | Reference: complete tables and values | Extended narrative |
| Understand behavior | Explanation: mechanism, guarantees, trade-offs | Setup walkthroughs |
| Change code safely | Contributor guide: boundaries and checks | User setup instructions |

## README rule

Aim for 150 lines or fewer. Say what the project does, give the shortest safe first-use path, name critical prerequisites or risks, and point to the next page. Put the complete settings/command/event catalogue elsewhere.

## References

- `references/page-shapes.md` — outline pages by reader task.
- `references/diagrams.md` — decide when and how to diagram mechanisms.
- `references/anti-slop.md` — concise prose checks, including English and Russian examples.

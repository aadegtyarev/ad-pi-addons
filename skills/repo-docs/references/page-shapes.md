# Page shapes

Choose a page by the reader's task, not by a fixed file count. A small project often needs only an entry-point README and a few task-specific references.

| Reader's task | Page form | Keep out |
|---|---|---|
| Learn from zero | Tutorial: one verified route to a result | Branching catalogues |
| Complete a task | How-to: goal or symptom, then ordered steps | Long rationale and unrelated options |
| Look up a fact | Reference: complete tables and values | Advice mixed with exhaustive data |
| Understand behavior | Explanation: mechanism, constraints, and trade-offs | Copy-paste setup walkthroughs |
| Change the code safely | Contributor guide: ownership, invariants, and checks | User setup instructions |

Add a page when a section serves a different reader task or is hard to scan. Do not split pages for symmetry.

## README: the entry point

Aim for 150 lines or fewer. Include:

1. One sentence stating the user-visible result.
2. The shortest safe setup path and its prerequisites.
3. Critical security or compatibility warnings at the point of action.
4. Links to commands, settings, troubleshooting, or design details.
5. Contributor checks and license when relevant.

Keep long catalogues, complete settings lists, and internal rationale on their task-specific pages. State a short warning near the action and link to the full explanation.

## Tutorial

State the result first. Use one set of example names, verify each stage, and end with an observable outcome grounded in source or a real run. If the path branches repeatedly, make a how-to or reference instead.

## How-to

Name one task or symptom. Give ordered actions and their expected result. Troubleshooting starts with a recognizable symptom, then a safe diagnostic and fix.

## Reference

Use predictable headings and tables. State defaults, units, accepted values, and limits. Include the complete set when calling it complete; link upstream semantics when another project owns them.

## Explanation and contributor guide

Explain the flow before naming modules. State which guarantees come from this project and which come from a host, provider, or dependency. Use diagrams only for non-obvious direction, ordering, state, or data shape.

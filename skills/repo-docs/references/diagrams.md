# Diagrams in repository documentation

A diagram earns its place when it explains a mechanism more clearly than prose: who calls whom, event order, branching, retries, state changes, or data relationships. Do not draw a directory tree, page outline, or simple checklist. If the text already says everything, remove the diagram.

## Choose a Mermaid type

| Show | Mermaid type |
|---|---|
| Connections and direction | `flowchart LR` |
| Ordering, parallel work, retry, fallback | `sequenceDiagram`, with `alt` or `par` when useful |
| Lifecycle or state transition | `stateDiagram-v2` or `flowchart TD` with a back edge |
| Data relationships | `erDiagram` |

Label edges with actions, name participants by role, and include only paths supported by the implementation. Mark optional and failure paths. Never invent a sequence to make a diagram look complete.

## Validate

Keep colors optional and readable in light and dark themes. GitHub renders Mermaid inline. If using `linkStyle`, count edges in declaration order from zero; an invalid index can break rendering.

Run the repository's documentation checker, but do not treat it as a full Mermaid parser or a substitute for inspecting rendered output. Check a new or materially changed diagram in the target renderer when practical.

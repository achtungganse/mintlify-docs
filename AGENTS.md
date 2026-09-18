# Documentation project instructions

## About this project

- This is the eBanano user Help Center built on [Mintlify](https://mintlify.com).
- Pages are MDX files with YAML frontmatter.
- Configuration lives in `docs.json`.
- The approved Help Center information architecture and editorial rules live in [HELP_CENTER_ARCHITECTURE.md](HELP_CENTER_ARCHITECTURE.md).
- Before creating, deleting, merging, or substantially rewriting Help Center pages, read that document first.

## Product and audience

- eBanano sells travel eSIM packages.
- Help Center content is written for end users, not for backend developers or internal operators.
- Organize information around the user's current situation and desired outcome, not around internal services, API concepts, database entities, or implementation details.

## Core Help Center rules

- One user scenario should have one primary article whenever practical.
- One factual rule should have one canonical owner. Do not copy full explanations across multiple pages.
- Do not create a separate page for a step that belongs naturally inside a larger user scenario.
- Do not force the reader to open another article merely to complete one required action.
- Troubleshooting belongs close to the action that failed: payment problems with purchases, installation problems with installation, connectivity problems with travel connection.
- Article titles should describe the user's question or situation in plain language.
- A new page is justified only when it represents a standalone user intent with a complete outcome.
- Avoid generic mandatory "Related articles" sections. Link only when the next page is a logical continuation or contains genuinely separate reference material.
- If a short instruction must appear in several scenarios, prefer a reusable MDX fragment over maintaining divergent copies.

## Content types

Use the appropriate structure instead of forcing every article into the same template.

### Scenario article

Outcome → prerequisites → steps → branches when the result differs → success state → next action if needed.

### Troubleshooting article

Identify symptom → likely checks in safe order → branch by result → stop unhelpful repetition → support escalation with diagnostic context.

### Reference or policy article

Short answer → conditions → real cases → exceptions → available user action.

## Terminology and tone

- Russian canonical content uses informal singular `ты`, consistently.
- Prefer user language over technical terminology.
- Explain a technical term only when it helps the user decide or act.
- Do not invent product capabilities, support channels, response times, countries, provider behavior, refund guarantees, network guarantees, or payment behavior.
- When behavior depends on a specific eSIM package or provider, say so explicitly instead of presenting it as universal.

## Style preferences

- Use active voice and second person.
- Keep sentences concise; one idea per sentence where practical.
- Lead with the answer or action, not background theory.
- Use sentence case for headings.
- Bold exact UI labels when they are known.
- Use code formatting for technical values only when it improves clarity.
- Prefer concrete symptoms such as "Нет сети" or "Деньги списались, но eSIM нет" over abstract headings such as "Сетевые проблемы".

## Mintlify components

- `Steps`: sequential actions.
- `Tabs`: the same task on different device families or platforms.
- `Accordion`: secondary detail not required by every reader.
- `Warning`: risk of losing access, eSIM, money, or data.
- `Info` / `Note`: important context that is not an action.
- `Card` / `Columns`: meaningful routing only, not decorative footer content.

## Localization

- First stabilize the Russian information architecture and canonical content.
- Translate to English and Kazakh only after the Russian scenario is approved.
- Keep the same scenario boundaries across languages unless language-specific UX genuinely requires otherwise.

## Content boundaries

- Do not expose internal architecture, provider credentials, private API contracts, administrative procedures, or infrastructure details in the public Help Center.
- Do not turn internal implementation terminology into user-facing categories.

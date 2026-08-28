# Design languages

Design language variants captured from reference imagery. Each variant is fully isolated — its own folder, doc, review canvas, and Figma file. Variants are never merged or averaged.

| Name | Slug | Source | Status | Thesis |
|---|---|---|---|---|
| Aerosol HUD | [`aerosol-hud`](aerosol-hud/DESIGN.md) | [Pinterest pin 34691859628648051](https://uk.pinterest.com/pin/34691859628648051/) | [`built`](https://www.figma.com/design/6rriapZOP4JiQkZ3YhrbyN) | Pure-black interface built entirely from 1px outlines and technical furniture, into which hand-sprayed graffiti drops as the only organic element. |

## Status meanings

| Status | Means |
|---|---|
| `draft` | Captured from the image, not yet reviewed |
| `in review` | Review canvas built, awaiting designer feedback |
| `approved` | Designer approved this named variant — cleared to build |
| `built` | Figma component library exists (link in the row) |

## Relationship to this repo

These languages are **prototype explorations**. `fix-swiss` currently themes with daisyUI `coffee` (`app/globals.css`); nothing in this folder overrides it. Adopting a variant as the app's real theme is a separate migration conversation, not a side effect of capture.

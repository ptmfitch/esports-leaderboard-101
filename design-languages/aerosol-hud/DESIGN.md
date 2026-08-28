# Aerosol HUD

> One-sentence thesis: a pure-black interface built entirely from 1px outlines and technical furniture, into which hand-sprayed graffiti is dropped as the only organic element — the tension between the two is the whole system.

**Source:** `https://uk.pinterest.com/pin/34691859628648051/` → `https://i.pinimg.com/originals/33/d7/15/33d7151878caf9c76e2bccfb7f08deee.png` (1024×1536)
**Slug:** `aerosol-hud`
**Status:** approved (round 1)
**Target:** leaderboard product for an interstellar AI rap battle — a real, dense application UI, not a marketing page
**Palette method:** sampled via `sample-palette.sh` (ImageMagick quantization), then per-region crop histograms for the chroma-carrying areas, because whole-image quantization collapses the accents into their dark glow field

> **On the source.** The reference is a landing page for a fictional creator collective. What carries over is its *language* — the outline-only construction, the opacity ladder, the type pairing, the ornament vocabulary. Its *content* does not: none of its brand copy, naming, or subject matter appears here. Microcopy examples below are written for the target domain and are illustrative until real product copy exists.

## Creative north star

**"The wall and the readout."** Every piece of UI chrome is a machine-drawn hairline rectangle; every piece of expression is sprayed by hand on top of it. Nothing in between.

Atmosphere comes from two places only: the accent glow bleeding off artwork into the black, and the density of technical ornament (barcodes, crosshairs, corner brackets, identifiers) sitting quietly at the edges. It deliberately does **not** come from surfaces — there are no elevated panels, no gradients on chrome, no shadows. A card and the page it sits on are the identical black; only a line separates them.

For this product that framing has teeth: a battle leaderboard is a readout of machine-scored competition between performers. The system already wants to be half instrument, half graffiti.

## Color

| Role | Name | Hex | Use |
|---|---|---|---|
| Background | Asphalt | `#030202` | The entire page. 63.5% of sampled area. There is no second background. |
| Surface | Asphalt (same) | `#030202` | Cards, bands, and buttons share the page color. Separation is by line, never by fill. |
| Ink | Chalk | `#DFE1E1` | Headings and UI labels. Slightly cool, never pure `#FFFFFF`. |
| Muted ink | Chalk 74 | `#BDBEBE` | Body copy. |
| Metadata ink | Ash | `#5C5C5D` | Timestamps, identifiers, disabled. |
| Rule / border (neutral) | Hairline | `#272727` → `#161515` | Band dividers, the page frame, and dense-table row separation. |
| Accent | Spray Pink | `#F50C79` | Brand accent. Identity, primary action, active nav. |
| Accent | Acid Lime | `#9BCC07` | Co-equal brand accent. Alternate action, alternating index. |
| Accent variants | Pink @70% / @25% / @8% | `#AD0E54` / `#470424` / `#15030B` | Borders / glow bloom / atmospheric wash. Derived by opacity over Asphalt, not hand-picked. |
| Status | Signal Amber | `#F5A300` | The single sanctioned third hue. Status only — never brand, never decoration. `[extension]` |

**Color strategy: dual brand accent + one rationed status hue, all tints opacity-derived.** Two saturated brand hues at maximum chroma, one saturated status hue kept strictly out of the brand's hands, plus one near-black and one off-white. Every other value is one of those hues at reduced opacity over Asphalt — `#AD0E54` is Spray Pink at ~70%, `#470424` at ~25%. Sampling confirms the derivation: the whole-image quantizer found six magenta clusters all at hue 331–333° descending in lightness, which is what an opacity ladder looks like, not a hand-built palette.

### The status model `[extension — no status color exists in the reference]`

Brand accents cannot carry status here, because index alternation already spends pink and lime on rhythm — a lime border in a repeating set would be indistinguishable from a lime "success". So status gets its own hue, and only one:

| State | Treatment |
|---|---|
| Success / advancing | **No hue.** Chalk plate, neutral. Success is the absence of attention. |
| Attention / warning | Signal Amber 1px outline plate + amber label. |
| Danger / eliminated | Signal Amber plate **with a solid amber marker**. Fill is the system's only escalation, so it marks the only state that stops someone. |
| Neutral / pending | Ash metadata line, no plate. |

Warning and danger separate by fill versus outline rather than by hue, which reuses the fill-scarcity logic already in the system instead of importing a fourth color. Amber `#F5A300` (hue 40°) and Acid Lime `#9BCC07` (hue 74°) read as orange and yellow-green respectively — distinct, but see Open questions on non-color redundancy.

**Hard rules the palette implies:**

- **Fill scarcity.** One solid-accent fill per view — the primary conversion or the single danger marker, not both. Everything else that wants to be a button is an outline.
- **Alternation, not hierarchy — and only in small sets.** In a repeating set of 3–6 card-like items, the accent alternates by index (the reference runs its four cards pink · lime · pink · lime). It does **not** encode importance. See *At product density* for where alternation stops.
- **Chroma stays off body copy.** Accent is for display words, labels, borders, icons, and status. Paragraphs are always Chalk.
- **Amber is rationed.** Signal Amber appears only where a state needs reporting. An amber button, an amber heading, or an amber ornament is a bug.

**Explicitly out of bounds:** cyan and purple (the synthwave default this sits next to — the image is pointedly pink/lime); neon *glow* on text and borders (bloom lives on artwork only, chrome is crisp); dark grey card fills like `#111`; pure white `#FFFFFF`; any fourth hue whatsoever.

## Typography

| Role | Character | Spec |
|---|---|---|
| Display | Hand-sprayed brush tag — heavy, right-leaning, ragged edge, visible drips off descenders | Uppercase only. 96–140px in hero contexts. Never for more than one phrase. |
| Heading | Heavy condensed grotesque, machine-precise — the opposite of the display | Uppercase, ~+2% tracking, weight 700–800. 28–40px. |
| Body | Neutral humanist sans, regular | Sentence case, 15–16px, line-height ~1.6, measure capped ~48ch. |
| UI / labels | Condensed grotesque, small and wide | Uppercase, +8–12% tracking, 12–13px, weight 600. |
| Micro / metadata | Same condensed face or mono, letter-spaced to the point of texture | Uppercase, +14–20% tracking, 10–11px, Ash. |
| Numerals | Condensed grotesque, **tabular**, uppercase-height | Scores, ranks, timers. Tabular figures are mandatory anywhere numbers stack vertically. `[extension]` |

**Conventions the type carries:**

- **The single sprayed word.** A heading is condensed grotesque with exactly one word swapped into the brush display face and an accent color: `WHO'S GOT `**`BARS`** · `THE REIGNING `**`CHAMPION`**. One word, never two.
- **Bracketed eyebrows.** Every section opens with a wide-tracked accent label wrapped in glyphs: `+ STANDINGS +`, `+ ROUND 07 +`, `✦ NOW BATTLING`. The glyph is part of the label, not decoration beside it.
- **Full-stop triads.** Three words, each closed with a period, one of them in the alternate accent: `VERSE. VOLTAGE. VICTORY.`
- **Double-slash identifiers.** `BOUT // 042`, `CIPHER // 007` — entity, double slash, zero-padded index. Every bout, round, and contender plate carries one.

**Avoid:** rounded or geometric friendly sans (Poppins, Nunito) anywhere; script faces that are calligraphic rather than sprayed; the display face at small sizes or in sentence case; italic body copy; proportional figures in any ranked column.

## Layout & grid

- **Grid logic:** full-bleed horizontal bands stacked vertically; content sits in a centred column with ~6.5% side margin (68px of a 1024px render). Bands are the unit of composition — every section is a band, and every band is the same black.
- **What draws structure:** hairline rules and outlines, exclusively. Full-bleed `#272727` dividers between bands, a 1px neutral frame around the entire viewport, and 1px accent outlines around every interactive or content plate. Whitespace is generous but does no structural work on its own.
- **Column counts observed:** 4-up cards, 5-up pill row, 2-up split (~1:2). Even, symmetrical, centred — the layout is calm so the graffiti can be loud.
- **Ornament with purpose:** four-point sparkles `✦` and plus/crosshair `+` marking label ends and band centres; corner brackets on plates; barcode strips; a wireframe globe as a recurring background mark; vertical letter-spaced text running up the right edge of image plates.
- **Composition pattern of the reference:** left-aligned hero copy against a right-side full-bleed subject, with a vertical rail pinned to the right edge; centred section headings below the fold; the page closes on a full-bleed CTA band and a centred micro-copyright flanked by sparkles and hairlines running to both edges.

### At product density `[extension — the reference shows only a marketing page]`

A ranked table of fifty contenders is the screen this language was not designed for, and two rules break there. Both resolve inside the existing vocabulary rather than by adding to it:

- **The plate is the table, not the row.** One accent outline wraps the whole standings table; rows separate with `#161515` hairlines. Fifty outlined rows would read as a cage, and would spend the accent everywhere at once.
- **Alternation caps at six.** Index alternation applies to card-like sets of 3–6. In a long list, the accent marks position — leader, the viewer's own entry, the live bout — and everything else is neutral.
- **Ornament thins out as density rises.** Crosshairs and barcodes belong to hero bands, plates, and empty states. A dense table gets identifiers and nothing else.
- **Vertical rhythm halves.** The 8px scale holds, but dense rows sit at 2–3 steps where marketing bands sit at 6–12.

## Shape & material

- **Corner radius:** 4px. Small enough to read as square at a glance, present enough that nothing looks unstyled. One value everywhere — cards, buttons, plates, pills, inputs.
- **Border treatment:** 1px, always. Accent-tinted at ~70% opacity for anything interactive or containing content; neutral `#272727` for band dividers and the page frame, `#161515` for row separation inside a plate. There is no 2px border in the system except the active-nav underline.
- **Elevation model:** none. No shadows, no layered surfaces, no z-depth. What replaces it: the accent glow bloom radiating off artwork into the surrounding black, which is the only soft edge anywhere.
- **Texture:** spray splatter, drips, halftone, and film grain — confined entirely to artwork and display type. UI chrome is perfectly crisp. This split is the system's load-bearing rule.
- **Signature move:** **the outline plate** — a 1px accent rectangle whose interior is the same black as the page, decorated at its corners and edges with technical furniture (crosshair, barcode, vertical identifier). It is simultaneously the card, the button, the image frame, the rail, and the table.

## Components

- **Primary action** — outline plate, Spray Pink border and label, trailing glyph (`→`). Transparent interior, condensed uppercase +10% tracking. It is *this* system's button because the fill is missing: the accent describes the perimeter of the action rather than the action itself.
- **Secondary action** — identical geometry in Acid Lime with a different trailing glyph. Not visually subordinate — it sits at the same weight beside the primary, which is why alternation rather than hierarchy is the rule.
- **Terminal action** — the one solid Spray Pink fill in a view, black label, trailing glyph. Reserved for the single conversion moment. Its scarcity is what gives it force.
- **Input / field** — `[inferred]` 1px accent-at-40% border, transparent interior, Ash placeholder in wide-tracked uppercase, border rising to full accent on focus. Nothing in the image shows a field.
- **Card / panel** — outline plate, centred column: accent pictogram (~48px) → condensed uppercase Chalk title → two lines of Chalk-74 body. Border accent alternates by index across a set of 3–6.
- **Standings table** `[extension]` — one accent outline around the whole table; `#161515` row hairlines; tabular numerals right-aligned; rank in the display face only for position 1; the viewer's own row marked by a 2px left accent edge rather than a fill. Contender identity carries a `// 042`-style identifier in Ash.
- **Contender plate** `[extension]` — the reference's image plate applied to a performer: 1px accent frame, duotone grade, glow past the frame, corner crosshair, edge barcode, and a bottom-right identifier. This is where the graffiti half of the system lives in a product that is otherwise a readout.
- **Status marker** `[extension]` — Signal Amber outline for attention, solid amber marker for elimination, nothing at all for advancing. Always paired with a text label; never hue alone.
- **Icons** — solid accent silhouettes with one edge mutated by a spray drip or splatter. A tidy uniform-stroke set would be technically correct and completely wrong: the mutation is the brand appearing at 24px.
- **Navigation** — single row of condensed uppercase labels, Chalk inactive, Spray Pink with a 2px pink underline when active. Utility icons in Acid Lime. A vertical outline rail may pin to the viewport edge.

## Voice & motion

The register carried over from the reference is **collective, imperative, and declarative** — labels with swagger, body copy with warmth. What follows is that register written for this product; it replaces the reference's own copy entirely.

- **Microcopy:** `ENTER THE CIPHER` · `QUEUE FOR THE ROUND` · `DROP A VERSE` · `CLAIM THE CROWN` · `NOW BATTLING`. Verb-first, never "Submit" or "Learn more".
- **Body copy warmth:** the labels posture, the sentences do not. `Every contender gets the mic. The board decides who keeps it.` Without the warm register underneath, the swagger reads as noise.
- **Naming conventions:** entities are numbered like equipment — `BOUT // 042`, `ROUND // 07`, `CIPHER // 007`. Contenders carry a callsign and an origin, sat in wide-tracked Ash metadata beneath the display name.
- **Triads:** `VERSE. VOLTAGE. VICTORY.` — three words, three periods, one in the alternate accent.
- **Motion character:** `[inferred]` — chrome does not move. The plausible motion is spray-on: display-word drips settling, accent glow breathing behind artwork, and rank changes sliding rather than fading. 200–260ms fast-out/slow-in on chrome state changes; artwork slower and looping.

## Token starter

```css
:root {
  /* field */
  --asphalt:        #030202;

  /* ink */
  --chalk:          #DFE1E1;
  --chalk-74:       #BDBEBE;
  --ash:            #5C5C5D;

  /* brand accents */
  --spray-pink:     #F50C79;
  --acid-lime:      #9BCC07;

  /* status — rationed, never brand */
  --signal-amber:   #F5A300;

  /* derived: accent over asphalt at opacity */
  --border-pink:    rgb(245 12 121 / 0.70);
  --border-lime:    rgb(155 204 7 / 0.70);
  --border-amber:   rgb(245 163 0 / 0.70);
  --glow-pink:      rgb(245 12 121 / 0.25);
  --wash-pink:      rgb(245 12 121 / 0.08);

  /* neutral structure */
  --hairline:       #272727;  /* bands, page frame */
  --hairline-dim:   #161515;  /* rows inside a plate */

  /* shape */
  --radius:         4px;
  --border-width:   1px;

  /* spacing — 8px base; dense rows use 1–3, marketing bands 6–12 */
  --space-1: 8px;  --space-2: 16px; --space-3: 24px;
  --space-4: 32px; --space-6: 48px; --space-8: 64px; --space-12: 96px;

  /* type */
  --font-display:  /* sprayed brush tag — see Open questions */;
  --font-heading:  /* heavy condensed grotesque */;
  --font-body:     /* neutral humanist sans */;
  --tracking-label: 0.10em;
  --tracking-micro: 0.18em;
  --numerals:       tabular-nums;
}
```

## Do / Don't

**Do**

- Keep every container's interior at `--asphalt`; separate things with a 1px line, never a fill.
- Alternate pink and lime by index in repeating sets of 3–6; in long lists, use the accent to mark position only.
- Spend one solid-accent fill per view — the conversion or the danger marker, not both.
- Confine texture, drip, splatter, and glow to artwork and display type; keep all chrome crisp.
- Swap exactly one word of a heading into the display face and an accent color.
- Set every stacked number in tabular figures.

**Don't**

- Introduce a fourth hue, or use Signal Amber for anything that is not a state.
- Put a glow, shadow, or gradient on a button, card, input, or table.
- Outline every row of a dense table — the plate is the table, not the row.
- Set body copy in an accent color, or the display face below 40px.
- Use `#111`–`#1a1a1a` fills to separate content; that is the generic dark-theme move this system exists to avoid.
- Clean up the icons into a consistent stroke set — the drip is the identity.
- Communicate a state by hue alone.

## One-line brief

Aerosol HUD is a pure-black interface language for a dense competitive leaderboard, in which all structure is drawn with 1px lines — outline cards, outline buttons, outline plates, hairline band dividers, a hairline page frame — over a single background value `#030202` with no elevated surfaces anywhere; two co-equal brand accents, Spray Pink `#F50C79` and Acid Lime `#9BCC07`, alternate by index in small sets and mark position in long ones rather than encoding hierarchy, while a single rationed status hue, Signal Amber `#F5A300`, is the only color permitted to report state, using an outline for attention and a solid marker for elimination and no hue at all for success; every other tint in the system is one of those hues at reduced opacity over the field; type pairs a heavy condensed uppercase grotesque and mandatory tabular figures with a hand-sprayed brush tag used for exactly one word per heading, plus wide-tracked uppercase micro-labels wrapped in `+` and `✦` glyphs and `BOUT // 042` identifiers; texture, drips, splatter, and glow appear only on artwork and display lettering while every piece of chrome stays crisp at 4px radius; at density the accent outline wraps the table rather than each row, ornament thins to identifiers alone, and the recurring signature is the outline plate — a bordered rectangle the same black as the page, dressed at its corners with barcodes, crosshairs, and vertical identifiers.

## Open questions

- **Display typeface licensing.** The tag face is characterised, not identified — the reference is an AI-generated mockup, so the lettering may not correspond to a shipping font. A real candidate must be chosen and licensed before text styles ship.
- **Non-color status redundancy.** Signal Amber (hue 40°) and Acid Lime (hue 74°) are distinguishable but adjacent for deuteranopic viewers. The status model always pairs hue with a label, which should be sufficient — needs confirming against a real standings screen.
- **Accent contrast.** Spray Pink on Asphalt is ~5.3:1 (AA, not AAA); Acid Lime ~9.8:1; Signal Amber ~8.9:1. None passes as *small black text on an accent fill* — the filled terminal button and the danger marker need a minimum label size ruling.
- **Light mode.** The system is defined by a black field. A light variant would invert the outline-plate logic entirely; it may simply not exist.
- **Empty, loading, disabled states.** Unevidenced. Empty states are the natural home for the ornament vocabulary that density strips out.
- **Responsive behaviour.** The 4-up card row, the pinned vertical rail, and the standings table's metadata columns break first.
- **Contender artwork pipeline.** The contender plate assumes a duotone-graded portrait per performer. Where those images come from is unresolved.

## Decisions log

| Round | Change | Raised by | Rationale |
|---|---|---|---|
| 1 | Variant approved for Figma build | Peter | — |
| 1 | Removed all reference brand copy; voice rewritten for the interstellar AI rap battle domain | Peter | The reference's language carries over; its content does not. Microcopy, naming, and identifier examples now come from the product. |
| 1 | Added Signal Amber `#F5A300` as a single rationed status hue, status-only | Peter | Brand accents already spend pink and lime on index rhythm, so they cannot also carry state. Chose deliberate rule-breaking over hue collision. |
| 1 | Defined the status model: no hue for success, amber outline for attention, amber fill for danger | Agent | Follows from the amber ruling. Warning and danger separate by fill vs outline, reusing fill scarcity instead of importing a fourth color. |
| 1 | Added *At product density* rules — plate wraps the table not the row, alternation caps at six, ornament thins, rhythm halves | Agent | Consequence of retargeting from a marketing page to a dense leaderboard. Outline-only containment and index alternation both fail at fifty rows. |
| 1 | Added tabular numerals as a required type role | Agent | A leaderboard is mostly stacked numbers; proportional figures would break every ranked column. |
| Build | Display face shipped as `Display / Tag (PLACEHOLDER)` in Permanent Marker | Peter | Agreed stand-in until a real tag face is licensed. Named so nobody mistakes it for a decision. |
| Build | Leader rank set in the numeral face, not the display face | Agent | The placeholder tag face renders `1` as an ambiguous stroke. Ranks are data; they cannot be ambiguous. Emphasis moved to size and hue instead of a second typeface. |
| Build | Leader rank sits on the existing heading step (32px), not a new 40px size | Agent | 40px was off-scale. Snapping to the scale removed the special case and the last unstyled node in the file. |
| Build | Leader row is 67px against 64px for every other state | Agent | Hierarchy earned by space rather than decoration, consistent with the outline-only rule. |
| Build | Standings Table container stroke set to OUTSIDE | Agent | An inside stroke covered the Viewer row's 2px left edge — the one marker telling a contender where they are. A container must never occlude a row signal. |
| Build | Added `Label / Row` (16px condensed) for contender names | Agent | `Label / UI` at 12px is chrome; a contender name is content and was being under-set. |
| Build | No effect styles created | Agent | The language forbids glow, shadow, and gradient on chrome. An empty effect library makes that enforceable rather than aspirational. |

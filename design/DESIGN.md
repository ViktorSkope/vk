# VK — Style Reference
> A product design studio whose site reads like a calm editorial page interrupted by loud pixel art. A warm off-white canvas (`#f5f3f1`) holds cool blue-black ink (`#0f151d`). Headlines are set in a bookish serif and split into two tones: slate for the setup, ink for the payoff. The interface stays quiet and neutral, with rectangular soft-cornered buttons and no decoration, so that all the colour comes from the work: saturated pixel characters, pixel patterns and real product screens, shown in a tight mosaic of tiles.

**Theme:** light

**Basis:** Measured from the VK home page mockup and its image assets. The document structure began from an ElevenLabs reference, but its visual identity does not carry over (see "Changes from the starting template").

Each value below is marked **measured** (sampled from the mockup or assets) or **derived** (not visible in the mockup, chosen to fit the system; review these as real screens need them).

## Tokens — Colors

### Interface

| Name | Value | Token | Source | Role |
|---|---|---|---|---|
| primary | `#0f151d` | `--color-primary` | measured | Primary button fill |
| primary hover | `#262d37` | `--color-primary-hover` | derived | Primary button hover |
| ink | `#0f151d` | `--color-ink` | measured | Headline payoff, nav, button text |
| slate | `#828ca4` | `--color-slate` | measured | Headline setup. Large display text only |
| body | `#3d4552` | `--color-body` | derived | Running text |
| muted | `#5f6879` | `--color-muted` | derived | Captions, secondary small text |
| hairline | `#dedbd5` | `--color-hairline` | derived | Dividers |
| canvas | `#f5f3f1` | `--color-canvas` | measured | Page background |
| surface paper | `#ebe8e1` | `--color-surface-paper` | measured | Tiles and chips. Matches the background baked into the pixel art |
| surface card | `#ffffff` | `--color-surface-card` | measured | Cards on a dark frame |
| surface dark | `#0f151d` | `--color-surface-dark` | measured | Dark tile frame. Matches the background baked into the product shots |
| on primary | `#ffffff` | `--color-on-primary` | measured | Text on ink |

### Pixel palette

Accent colours live in the artwork. Use them in pixel art and avatars, and not for interface elements such as buttons, links or text.

| Name | Value | Token | Source |
|---|---|---|---|
| pixel red | `#fd2405` | `--color-pixel-red` | measured |
| pixel orange | `#fd8905` | `--color-pixel-orange` | measured |
| pixel amber | `#fca808` | `--color-pixel-amber` | measured |
| pixel yellow | `#fcca0b` | `--color-pixel-yellow` | measured |
| pixel coral | `#ff6272` | `--color-pixel-coral` | measured |
| pixel pink | `#ffa7ef` | `--color-pixel-pink` | measured |
| pixel green | `#0a8941` | `--color-pixel-green` | measured |
| pixel blue | `#3327e9` | `--color-pixel-blue` | measured |
| pixel charcoal | `#313131` | `--color-pixel-charcoal` | measured |
| pixel stone | `#a9a996` | `--color-pixel-stone` | measured |
| pixel sand | `#dadac3` | `--color-pixel-sand` | measured |

### Avatar backgrounds

| Name | Value | Token | Source |
|---|---|---|---|
| avatar blue | `#0984d8` | `--color-avatar-blue` | measured |
| avatar orange | `#f86f05` | `--color-avatar-orange` | measured |
| avatar green | `#088030` | `--color-avatar-green` | measured |

### Semantic

| Name | Value | Token | Source |
|---|---|---|---|
| error | `#d92a00` | `--color-semantic-error` | measured from the product imagery |
| success | `#0a8941` | `--color-semantic-success` | derived from pixel green |

## Tokens — Typography

Both families are the closest free matches found by comparing candidates against the mockup. They are not confirmed as the mockup's original fonts.

### 'Source Serif 4', Georgia, serif · `--font-display`
- **Weight:** 400
- **Optical sizing:** turn off with `font-optical-sizing: none`. The automatic display cut is much narrower and more contrasted than the mockup
- **Role:** Headlines only

### 'Work Sans', system-ui, sans-serif · `--font-ui`
- **Weights:** 400, 500
- **Role:** Navigation, buttons, body, captions

### Type Scale

| Role | Font | Size | Line Height | Letter Spacing | Source | Token |
|---|---|---|---|---|---|---|
| display-mega | display | 70px | 1.08 | 0 | measured | `--text-display-mega` |
| display-xl | display | 48px | 1.12 | 0 | derived | `--text-display-xl` |
| display-lg | display | 36px | 1.17 | 0 | derived | `--text-display-lg` |
| display-md | display | 32px | 1.2 | 0 | derived | `--text-display-md` |
| display-sm | display | 24px | 1.25 | 0 | derived | `--text-display-sm` |
| title-md | ui 500 | 20px | 1.35 | 0 | derived | `--text-title-md` |
| title-sm | ui 500 | 18px | 1.44 | 0 | derived | `--text-title-sm` |
| body-md | ui 400 | 16px | 1.5 | 0 | derived | `--text-body-md` |
| body-sm | ui 400 | 15px | 1.47 | 0 | derived | `--text-body-sm` |
| caption | ui 400 | 14px | 1.5 | 0 | derived | `--text-caption` |
| button | ui 400 | 15px | 1 | 0 | measured | `--text-button` |
| nav-link | ui 400 | 14px | 1.4 | 0 | measured | `--text-nav-link` |

### Two-tone headline

The hero headline is one sentence in two colours: the setup in `--color-slate`, the payoff in `--color-ink`. Slate on canvas is about 3:1 contrast, which is acceptable only at large display sizes.

## Tokens — Spacing & Shapes

**Density:** airy page rhythm around a tight image mosaic.

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| xxs | 4px | `--spacing-xxs` |
| xs | 8px | `--spacing-xs` |
| sm | 12px | `--spacing-sm` |
| base | 16px | `--spacing-base` |
| md | 20px | `--spacing-md` |
| lg | 24px | `--spacing-lg` |
| xl | 32px | `--spacing-xl` |
| xxl | 40px | `--spacing-xxl` |
| section | 144px | `--spacing-section` |

### Border Radius

| Name | Value | Token | Use |
|---|---|---|---|
| none | 0px | `--radius-none` | Pixel art edges |
| sm | 8px | `--radius-sm` | Nav button |
| md | 12px | `--radius-md` | Hero buttons, tiles, chips |
| full | 9999px | `--radius-full` | Avatars only |

Buttons are never pills.

### Layout

- **Max content width:** 1412px, centred
- **Nav height:** 88px, with 40px side margins
- **Hero:** centred text, with 123px between the nav and the headline, and 40px between headline and buttons
- **Hero to mosaic:** 144px
- **Tile gap:** 16px. The mockup uses about 16px between columns and 22px between rows; this system uses one value for both

## Components

### top nav
- **background:** transparent over `{colors.canvas}`
- **text:** `{colors.ink}`, `{typography.nav-link}`
- **layout:** logo left, links in the middle with 72px between them, button right, spaced evenly with `space-between`
- **height:** 88px

### button primary
- **background:** `{colors.primary}`, hover `{colors.primary-hover}`
- **text:** `{colors.on-primary}`, `{typography.button}`
- **rounded:** `{rounded.md}`
- **height:** 44px
- **padding:** 0 24px

### button primary small
- Same as button primary, for the nav
- **rounded:** `{rounded.sm}`
- **height:** 38px
- **padding:** 0 16px

### button outline
- **background:** transparent
- **border:** 1px solid `{colors.ink}`
- **text:** `{colors.ink}`, `{typography.button}`
- **rounded:** `{rounded.md}`
- **height:** 44px
- **padding:** 0 24px

### button row
- Buttons sit side by side, centred, with an 8px gap

### hero headline
- **typography:** `{typography.display-mega}`
- **max width:** about 820px, centred
- **colour:** two-tone, as described above

### avatar chip
- Sits inline at the end of a headline
- **background:** `{colors.surface-paper}`
- **rounded:** `{rounded.md}`
- **padding:** 4px
- **contents:** three 50px circular portraits on avatar blue, orange and green, with a 2px gap

### work mosaic
- Four image tiles in a 1412px grid, built from three columns in the ratio `575 : 539 : 266`
- **Left:** one tall tile spanning both rows
- **Top right:** a wide tile, then a square tile
- **Bottom right:** one wide tile spanning the middle and right columns
- **Row height:** about 265px each

### image tile
- **rounded:** `{rounded.md}`
- **overflow:** hidden, with no border or shadow
- **background:** matches the image's own background, so artwork blends into the tile

### Site components, beyond the mockup (derived)
These were designed to extend the home page style across the full site.

- **section heading:** `{typography.display-xl}`, two-tone. `{typography.display-lg}` on phones
- **interior page hero:** centred, `{typography.display-mega}`, two-tone. Legal pages and articles use `{typography.display-xl}`
- **feature tile:** `{colors.surface-paper}` fill, `{rounded.md}`, 32px padding, `{typography.display-md}` title
- **stat:** 1px `{colors.hairline}` top rule, `{typography.display-xl}` value, `{typography.caption}` label in `{colors.muted}`
- **process step:** 1px `{colors.ink}` top rule, numbered, `{typography.title-md}` title
- **testimonial:** `{colors.surface-paper}` fill, `{rounded.md}`, `{typography.display-lg}` quote
- **FAQ:** native disclosure rows split by `{colors.hairline}`, `{typography.title-sm}` question
- **CTA band:** `{colors.surface-dark}` fill, `{rounded.md}`, `{typography.display-xl}`, with white filled and white outline buttons
- **image placeholder:** `{colors.surface-paper}` fill or `{colors.surface-dark}` for dark images, `{rounded.md}`, caption text
- **text input:** `{colors.surface-card}` fill, 1px `{colors.hairline}` border, `{rounded.md}`, at least 44px tall. Errors use `{colors.semantic-error}`
- **cookie banner:** `{colors.surface-card}` fill, fixed to the lower right. Accept and Reject must have the same size and style
- **footer:** `{colors.canvas}` fill, 1px `{colors.hairline}` top rule, `{colors.body}` text, `{typography.body-sm}`

### Loading states (derived)
- **page navigation:** 2px `{colors.ink}` progress bar across the top of the window
- **image tiles:** `{colors.surface-paper}` pulse until the image loads, then a short fade in
- **lists:** `{colors.surface-paper}` skeleton shapes matching the content that is loading
- **buttons:** spinner beside the label with `aria-busy`, and the button keeps its size
- **motion:** pulses and the progress animation stop for people who prefer reduced motion

### Placeholder content
Anything in `[square brackets]` must be replaced before launch. Testimonials, client names and results stay bracketed until real ones exist, so nothing invented can go live.

## Imagery

The work provides all of the colour. There are three kinds of image.

### Pixel characters
Hard-edged pixel figures with simple white-and-charcoal eyes, on `{colors.surface-paper}`. Colour shifts across each figure in stepped bands, never smooth gradients. Scale with `image-rendering: pixelated` so edges stay crisp.

### Pixel patterns
Full-bleed repeating pixel motifs built from the VK arrow shape, using stone, sand, black and charcoal, with a diagonal run of hot orange-to-pink keys.

### Product screens
Real interfaces shown in context: on a dark `{colors.surface-dark}` frame or over a satellite photograph. The product UI inside an image keeps its own styling and does not need to follow these tokens.

## Do's and Don'ts

### Do
- Keep page surfaces on `--color-canvas`.
- Let imagery carry the colour.
- Split hero headlines into slate and ink.
- Match tile backgrounds to the image's own background.
- Mix pixel art and product screens in the mosaic.

### Don't
- Don't use pill buttons, gradient orbs or atmospheric gradients.
- Don't use pixel palette colours for interface elements.
- Don't use `--color-slate` for small text; use `--color-muted`.
- Don't add borders or shadows to image tiles.
- Don't smooth or blur pixel art.

## Responsive

The mockup is desktop only, so this section is derived.

- **Below 1492px:** content narrows with 40px side margins, and the mosaic scales proportionally.
- **Below 1024px:** headline drops to `display-xl`. The mosaic becomes two columns.
- **Below 760px:** headline drops to `display-lg`, side margins become 20px, buttons stay side by side where they fit, and the mosaic becomes one column.

## Changes from the starting template

| Area | Template | VK |
|---|---|---|
| Canvas | Neutral `#f5f5f5` | Warm `#f5f3f1` |
| Ink | Warm `#0c0a09` | Cool `#0f151d` |
| Display type | Licensed face, weight 300 | Source Serif 4, weight 400, two-tone |
| UI type | Inter | Work Sans |
| Buttons | Pills, 40px | Soft rectangles, 44px and 38px |
| Colour source | Pastel gradient orbs | Pixel art and product imagery |
| Card radius | 16 to 24px | 12px |
| Max width | 1200px | 1412px |
| Removed | Voice rows, waveform cards, pricing cards, testimonial cards | Not relevant to VK |

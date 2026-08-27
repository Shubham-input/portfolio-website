# Portfolio Website — Design & Build Spec

This file is the reference spec for building Shubham's personal portfolio
website. Stack: **plain HTML / CSS / JS** (no framework, no build step).
Layout patterns are adapted from a reference site (a Framer-built UX
portfolio); visual language and copy are original.

> **Before implementing any section, check `/reference-screenshots/`
> in this project for the actual design inspo images.** The tokens and
> component specs below were extracted from those screenshots, but the
> images themselves are the source of truth for spacing, proportions,
> and visual details this doc might not fully capture in words.
>
> - `hero section.png` — nav pill, hero headline, badges
> - `project-card2.png` — flagship card, blue theme (fintech investing app)
> - `project-card3.png` — flagship card, green theme (personal finance app)
> - `project-section.png` — "Selected Work" section header pattern +
>   a 3rd flagship card, pink/rose theme (corporate banking)
> - `side-projects.png` — "Weekend Experiments" grid pattern
> - `about-me.png` — About section: polaroid photo, bio, experience list
>
> When a spec in this file and the screenshots seem to disagree, defer
> to the screenshot and flag the discrepancy rather than silently
> picking one.

---

## 1. Project Goals

- Showcase 4 flagship builds + 10+ smaller full-stack-course projects
  without the page turning into an endless scroll of identical cards.
- Site is itself one of the 4 resume projects — the other three
  (BugHouse Reviews, Productivity Dashboard, Brain Teaser App) are
  **content shown on this site**, not separate deploys to link out to
  necessarily (link out once they're live, otherwise show as in-progress).
- Static content only — no routing, no backend, no build tooling.
  A vanilla `index.html` / `styles.css` / `script.js` is the whole app.

---

## 2. Page Structure (top to bottom)

1. **Nav** — sticky/floating pill nav
2. **Hero** — intro + role/location badges
3. **Flagship project cards** — under a "Selected Work"-style section
   header (see §4.3a), 2–3 large case-study blocks, one per major
   project, each with its own soft background tint
4. **Project grid ("Course Projects" / "Weekend Builds")** — under its
   own section header, compact repeatable cards for the smaller
   full-stack-course projects
5. **About** — bio + experience list + tool stack (see §4.5, spec'd
   from `about-me.png`)
6. **Footer** — not in the reference screenshots; design from scratch
   (see §7)

---

## 3. Design Tokens

### Colors

```css
:root {
  /* Base */
  --color-bg: #ffffff;
  --color-bg-alt: #fafafa; /* some sections (e.g. About) sit on this instead of pure white */
  --color-ink: #1b1b21; /* primary text */
  --color-ink-soft: #2a2d37; /* body paragraph text, slightly softer than --color-ink */
  --color-muted: #62636b; /* secondary text */
  --color-label: #666666; /* small uppercase labels (EXPERIENCE, category pills) */
  --color-border: #e7e7e9; /* card borders */

  /* Brand accent */
  --color-accent: #695df6;
  --color-accent-tint-bg: #f1f2fe;
  --color-accent-tint-border: #e4e6fd;
  --color-accent-tag: #6a5ddf;
  --color-sparkle: #8475f7; /* decoration sparkles + "//" code-comment text */

  /* Status tags — tied to STATUS TYPE, reused across every card regardless
     of that card's theme color. Confirmed: the same green "LIVE PROJECT"
     tag appears on both the blue-themed and pink-themed cards. */
  --color-status-live-bg: #efffe9;
  --color-status-live-text: #678644;
  --color-status-award-bg: #fdf5e1; /* e.g. "DESIGNATHON WINNER" */
  --color-status-award-text: #b79435;

  /* Per-project background tint — this part IS unique per flagship card */
  --color-theme1-bg: #eff5fe; /* pale blue — fintech/investing card */
  --color-theme2-bg: #f5fae3; /* pale lime — personal finance card */
  --color-theme3-bg: #f7ebeb; /* pale rose — corporate banking card */
  --color-theme3-accent: #6f2134; /* maroon, used inside that card's product mockup only */

  /* Script/handwritten accent — small "eyebrow" caption next to section
     titles, e.g. "The person behind the pixels", "my favorite projects ↓".
     Color changes per section; these two are the ones seen so far. */
  --color-script-about: #845eee;
  --color-script-work: #55b685;

  /* Small accents */
  --color-orange-dot: #f19a38;
  --color-logo-blue: #4a94ec;
}
```

**Correction from earlier draft:** status-tag colors are _not_ per-project
— they're per-status-type. Only the soft container background is unique
to each flagship card. Don't couple these two things when building the
component.

### Typography

```css
:root {
  --font-display:
    "Fraunces", "Instrument Serif", Georgia, serif; /* hero headline only */
  --font-heading:
    "Lora", "Source Serif 4", Georgia, serif; /* section titles, project titles — confirmed same font used for "About Me", "Selected Work", "Weekend Experiments", and project card headlines */
  --font-body: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono:
    "JetBrains Mono", "IBM Plex Mono", monospace; /* code-style path labels */
  --font-script:
    "Caveat", "Gochi Hand", cursive; /* small handwritten "eyebrow" captions next to section titles, e.g. "The person behind the pixels" */
}
```

Google Fonts import:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Lora:ital,wght@0,400..700;1,400..700&family=Inter:wght@400;500;600;700&family=Caveat:wght@500;600&family=JetBrains+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

Type scale (approx, desktop):
| Element | Font | Size | Weight |
|---|---|---|---|
| Hero headline | display | 64–80px | 400–500 |
| Section heading | heading | 40–48px | 500 |
| Script eyebrow caption | script | 22–26px | 500 |
| Project card title | heading | 28–32px | 500 |
| Body / description | body | 16–18px | 400 |
| Nav links / badges | body | 14–15px | 500 |
| Code path label | mono | 14px | 400 |
| Tech tags | body | 13px | 500 |

### Spacing & Shape

```css
:root {
  --radius-pill: 999px; /* nav, badges, tags, buttons */
  --radius-card: 24px; /* flagship project card containers */
  --radius-card-sm: 16px; /* grid cards */
  --space-section: 120px; /* vertical gap between major sections */
  --space-card-pad: 48px; /* inner padding of flagship cards */
}
```

---

## 4. Component Specs

### 4.1 Nav (pill, floating)

- Rounded full pill, white bg, subtle shadow, horizontally centered,
  ~24px from top of viewport.
- Left: wordmark/logo. Center: 2–3 text links. Right: one CTA pill
  button (accent-tinted bg, accent text) — e.g. "Resume" or "Contact"
  instead of "LinkedIn" if that fits better.
- Sticky on scroll.

### 4.2 Hero

- Two-line headline mixing display serif + a small circular
  photo/avatar inline mid-sentence + one phrase in `--color-accent`.
  Example pattern: `Hi, I'm [avatar] Shubham — I build things [accent: end to end].`
- One-line subhead in `--font-body`, `--color-muted`: role + what you
  study + what you're aiming at (e.g. "CS undergrad building full-stack
  projects for SWE internship recruiting").
- Two badge pills below: `[dot] Role/Status` and `[dot] Location`.
  Use `--color-accent` dot for role, `--color-orange-dot` for location.

### 4.3a Section header pattern

Confirmed reused across "Selected Work," "Weekend Experiments," and
implicitly "About Me" — title left-aligned, small colored script-font
aside right-aligned on the same baseline:

```html
<div class="section-header">
  <h2>Selected Work</h2>
  <span class="script-accent" style="color: var(--color-script-work)"
    >my favorite projects ↓</span
  >
</div>
```

The script accent's color changes per section (violet for About,
green for Selected Work) — pick a new color per section rather than
reusing one across the whole site.

### 4.3 Flagship project card

Structure (repeat per project, swap only the background tint):

```html
<section class="project-card" style="background: var(--color-theme1-bg)">
  <span class="status-tag status-tag--live"
    ><!-- always the same green, regardless of card theme -->
    ● LIVE PROJECT
  </span>
  <span class="category-pill">FULL STACK • CRUD APP • 0 TO 1</span>
  <h3>Short outcome-framed headline</h3>
  <p>
    2–3 sentence description — what problem it solves and for whom, not a
    feature dump.
  </p>
  <div class="project-visual"><!-- screenshot(s) or mockup --></div>
</section>
```

```css
.status-tag--live {
  background: var(--color-status-live-bg);
  color: var(--color-status-live-text);
}
.status-tag--award {
  background: var(--color-status-award-bg);
  color: var(--color-status-award-text);
}
```

- Card has a thin dashed outer border in a slightly darker shade of
  its own tint, containing a solid-white or tinted inner rounded panel.
- Sparkle decoration (`--color-sparkle`, a 4-point star) appears once
  per card in a corner — position varies (bottom-left on one card,
  top-right on another), so treat placement as "somewhere near a
  corner," not fixed.
- Map to your actual flagship projects (3 real reference themes exist
  now, so use these directly instead of inventing a 4th):
  - **BugHouse Reviews** → `--color-theme1-bg` (blue), status: LIVE or IN PROGRESS
  - **Productivity Dashboard** → `--color-theme3-bg` (rose)
  - **Brain Teaser App** → `--color-theme2-bg` (lime), since it's the
    intended resume star, consider an `--color-status-award-*` style
    tag instead of the plain live one — e.g. "FLAGSHIP PROJECT"

### 4.4 Project grid ("Course Projects")

Code-editor-styled cards, 2-column grid, for the 10+ smaller builds:

```html
<div class="grid-card">
  <div class="card-chrome">
    <span class="dot red"></span><span class="dot yellow"></span
    ><span class="dot green"></span>
    <span class="path">~/project-slug</span>
  </div>
  <p class="comment">// one-line tagline</p>
  <h4>Project Name</h4>
  <p class="desc">1–2 sentence description.</p>
  <div class="tags">
    <span class="tag">React</span>
    <span class="tag">Node</span>
  </div>
</div>
```

- `.card-chrome` dots are muted/pastel, not saturated traffic-light
  colors — red `#C67A6D`, yellow `#E3B666`, green `#90B881`.
- `.tags` use `--color-accent-tint-bg` / `--color-accent-tag` — same
  token across every grid card (unlike flagship cards, grid cards
  don't get individual themes; uniformity here signals "lower stakes,
  browsable set").
- Section title above the grid uses `--font-heading`, e.g.
  "Course Projects" with an optional small link top-right
  (e.g. "All repos →" linking to GitHub).

### 4.5 About section

Two-column layout, sits on `--color-bg-alt` (#FAFAFA) rather than pure
white — gives the page a subtle rhythm break from the sections above it.

**Left column:**

- A single photo styled as a taped-up polaroid: white polaroid border,
  a strip of "washi tape" (`#D6D1C5`, drawn with a few tiny doodled
  smiley faces) across the top at a slight angle, whole polaroid
  rotated a few degrees, soft drop shadow.
- Below it, "MY TOOL STACK" as a small uppercase label
  (`--color-label`), then a row of circular icon badges (tool logos —
  Figma, ChatGPT, Notion, Framer, etc.) each in its own white circle
  with a soft shadow.

**Right column:**

- Section header pattern from §4.3a: `<h2>About Me</h2>` + script
  accent (e.g. "The person behind the pixels") in `--color-script-about`.
- A `--font-heading` subheading stating the "from X to Y" narrative arc
  (e.g. "From Coursework → Full-Stack Engineer").
- 2 short body paragraphs in `--color-ink-soft`.
- "EXPERIENCE" uppercase label (`--color-label`), then a stacked list
  of entries, each: company name (muted), role (bold, ink), date range
  (muted, smaller), a `+` expand icon right-aligned, thin divider line
  below each entry. Style as a simple accordion — icon rotates/expands
  to show more detail on click, defaulting to collapsed.
- Adapt content to your background: tutoring at BugHouse, coursework,
  any part-time work — same "from X to Y" narrative structure, real
  content.

---

## 5. Content Checklist

Fill in real copy before shipping — don't ship placeholder text:

- [ ] Hero headline + subhead (name, role/student status, focus area)
- [ ] Role badge text (e.g. "CS Undergrad @ UTA" or "Tutor @ BugHouse")
- [ ] Location badge (Arlington/DFW)
- [ ] 3 flagship project write-ups (headline + description + status tag + screenshots) for BugHouse Reviews, Productivity Dashboard,
      Brain Teaser App
- [ ] 10+ grid entries, one per full-stack-course mini project, each
      with a real tech-tag list (not the reference site's AI-tool tags)
- [ ] About section: real photo, "from X to Y" narrative subheading,
      2 bio paragraphs, experience list (BugHouse tutoring + any other
      roles), tool stack icon row
- [ ] Footer: contact links (email, GitHub, LinkedIn, resume PDF link)

---

## 6. Build Notes (plain HTML/CSS/JS)

- **File structure:**
  ```
  /index.html
  /styles.css
  /script.js
  /images/
      hero-avatar.png
      bughouse-mockup-1.png
      ...
  ```
- **Avoid copy-paste drift in the grid:** define a JS array of project
  objects and one template-literal function to render `.grid-card`
  markup into the grid container. Flagship cards stay hand-written
  (they're few and each is visually unique).

  ```js
  const courseProjects = [
    {
      slug: "project-one",
      tagline: "one-line hook",
      name: "Project One",
      desc: "short description",
      tags: ["React", "Express"],
    },
    // ...
  ];

  function renderGridCard(p) {
    return `
      <div class="grid-card">
        <div class="card-chrome">
          <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
          <span class="path">~/${p.slug}</span>
        </div>
        <p class="comment">// ${p.tagline}</p>
        <h4>${p.name}</h4>
        <p class="desc">${p.desc}</p>
        <div class="tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
      </div>`;
  }

  document.querySelector("#project-grid").innerHTML = courseProjects
    .map(renderGridCard)
    .join("");
  ```

- **Responsive breakpoints:** stack the grid to 1 column and reduce
  flagship card padding under ~768px; badges/nav links can wrap or
  collapse into a simple menu under ~480px.
- **Accessibility:** real `<h1>`–`<h4>` hierarchy (not styled `<div>`s),
  `alt` text on every mockup image, sufficient contrast on
  `--color-muted` text against tinted backgrounds (check theme3/pink
  tint especially), visible focus states on nav links and tag pills.

---

## 7. Not Covered by Reference Screenshots

Every section now has a spec except:

- Footer / contact section
- Mobile nav behavior
- Any hover/transition states (reference is a static screenshot set,
  so no motion detail was extracted — keep transitions subtle: 150–200ms
  ease on hover states is consistent with this site's restrained style)

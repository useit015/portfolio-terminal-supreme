# Impeccable Design Context

## Design Context

### Users

**Who they are:** Multi-audience — non-technical recruiters, engineering leads, freelance clients, and peer developers all arrive via the same shared URL. The spread is wide: someone who has never opened a terminal sits alongside a senior engineer who has one open right now.

**Their context:** Most arrive cold from a link in a resume or LinkedIn message. They have 60–90 seconds of attention before deciding whether this person is worth a call.

**Job to be done:** Evaluate Oussama Nahiz as a senior full-stack engineer — confirm his skills, sense his taste, and decide whether to reach out. Secondary: developers and peers explore for the pleasure of it.

**The challenge:** Non-technical visitors may be confused by a terminal-first interface. The UX must reward exploration without punishing unfamiliarity — hint pills, `help` command, and friendly empty-state copy are load-bearing, not decorative.

---

### Brand Personality

**Three words:** Playful · Bold · Unexpected

**Voice:** Confident without being arrogant. Dry wit in easter eggs. Technically precise in skill listings. Warm in the `about` command. Never corporate, never generic.

**Tone:** Like a senior engineer who built their own tooling and is genuinely proud of it — but would never tell you to be impressed. You just are.

**Emotional goal for visitors:** *"This person pays attention to details others miss."* — Impressed by craft, not just output.

---

### Aesthetic Direction

**Visual tone:** Terminal emulator as editorial medium. The interface is the portfolio. Every pixel is intentional.

**References (implicit in the code):**
- Real terminal emulators (iTerm2, Alacritty, Warp) — the chrome, prompt structure, and keyboard behavior should feel native
- IBM Plex Mono as the sole typeface — monospace not as retro nostalgia but as a deliberate constraint that enforces visual rhythm
- The 6 theme presets demonstrate range; default (Espresso) signals warmth and approachability over stereotypical hacker green

**Anti-references — this should NEVER look like:**
- A Notion page or any flat/corporate minimalism: white background, generic sans-serif, card grids
- A Bootstrap or Tailwind UI template: predictable sections, generic hero/about/skills layout
- Over-animated "creative developer" portfolios: Three.js orbs, particle systems, cursor trails — spectacle over substance

**Theme:** Primarily dark with multi-theme support. Default Espresso (warm amber on dark brown) is the canonical first impression.

**Texture:** Scanline overlay and radial glow are ambient — they should read as polish, not kitsch. If they're distracting, they're too heavy.

---

### Design Principles

1. **Craft is the message.**
   Every detail — the custom scrollbar, scanline overlay, ASCII art header, window chrome dots — signals that this person sweats the small stuff. No detail is beneath attention. If something looks unfinished, it undermines the entire premise.

2. **The terminal is not a gimmick.**
   Interactions must behave like a real shell: arrow-key history, tab autocomplete, prompt format (`oussama@terminal:~/portfolio$`), and command output that respects monospace alignment. Anything that breaks the illusion breaks the trust.

3. **Surprise without confusion.**
   Easter eggs (`42`, `sudo hire-me`, `morocco`) and bold choices reward curious visitors. But the critical path — understanding who this person is and how to contact them — must always be one command away. Never let delight become a maze.

4. **Monospace as constraint, not compromise.**
   IBM Plex Mono at every size. Spacing grid in 6px increments. No sans-serif fallback for content. The constraint is the aesthetic — lean into it rather than working around it.

5. **Themes as personality expression.**
   Each preset is a mood, not just a palette swap. Espresso is warm and approachable. Blue Matrix is focused and electric. Gruvbox Dark is earthy and relaxed. When adding or modifying themes, preserve that distinctiveness — avoid making them feel interchangeable.

---

### Color System

All colors are managed via CSS custom properties in `app/globals.css` and defined per-theme in `app/content.ts` (themePresets array). The variable names are:

```
--color-brand-background    Base page/terminal background
--color-brand-foreground    Primary text color
--color-brand-panel         Terminal window surface
--color-brand-panel-edge    Border/divider color
--color-brand-panel-inset   Inset/shadow surface
--color-brand-accent        Primary accent (buttons, active states)
--color-brand-accent-soft   Softer accent variant
--color-brand-muted         Secondary/muted text
--color-brand-prompt-user   Username in prompt
--color-brand-prompt-host   Hostname in prompt
```

Never hardcode hex values in components — always use these tokens.

---

### Typography

- **Font:** IBM Plex Mono (Google Fonts), weights 400/500/600
- **Fallback stack:** `"SFMono-Regular", "SF Mono", Consolas, "Liberation Mono", Menlo, monospace`
- **Scale:** Tailwind defaults (`text-sm` on mobile, `text-base` on desktop)
- **Rule:** Monospace everywhere, no exceptions. No `font-sans` in content areas.

---

### Spacing & Layout

- **Grid unit:** 6px (Tailwind's `1.5` unit)
- **Terminal padding:** `px-3 py-4` mobile / `px-6 py-7` desktop
- **Component rounding:** `rounded` (4px) for hint pills; `rounded-full` for chrome dots
- **Borders:** 1px solid `--color-brand-panel-edge` throughout

---

### Animation

- **Fade-in:** 220ms ease-out with `translateY(-4px → 0)` — applied to command output
- **Scanline overlay:** 1px every 12px, `pointer-events-none`, fixed to terminal surface
- **Rule:** Animations serve orientation (fade-in shows new output appearing), never spectacle. Reduced-motion should suppress translateY but may keep opacity fade.

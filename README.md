# Homepage

Static personal site in HTML, CSS and JavaScript, with no framework and no build step.

Built as the final project of module A (WebDev Foundation) of the
"D3 ❤️ React" course by Yan Holtz, following the Anthemion v2.0 graphic charter
(`CANOPEE/2 CASQUETTES/Professionnel/createur-contenu/anthemion/identite-visuelle/`).

## Structure

```
index.html    single page: hero, about, what I do, background, projects, contact
styles.css    Anthemion tokens, dark theme by default, responsive layout
main.js       persisted theme, mobile menu, particle field, typewriter, scroll reveals
favicon.svg   monogram in the charter colours
```

## Inspirations

| Source | What comes from it |
|---|---|
| [ckntav.github.io](https://ckntav.github.io/) | fixed nav, light/dark toggle, particle field in the hero, typewriter, portfolio cards |
| [yan-holtz.com](https://www.yan-holtz.com/) | centred hero with a "Hello" chip, display headline, numbered 01/02/03 rows, background timeline, mono section labels |

## Charter applied

- Colours: Bleu Paon `#067790`, Teal Light `#0A9AB5`, Teal Pale `#E0F4F8`,
  Orange Brûlé `#C06A30`, Amber Soft `#E8A96A`, Ink Black `#1e1e2e`,
  Surface Dark `#262637`, Border Dark `#313244`, Slate `#64748B`, Slate Light `#94A3B8`,
  Snow `#FAFBFC`, White Smoke `#F5F5F5`.
- Typography: Geist Sans and Geist Mono (Google Fonts), headings at 700 with
  `letter-spacing: -0.025em`, labels uppercase at `0.1em`.
- Components: primary/outline buttons with 8px radius, primary and accent badges,
  14px cards with a teal glow on hover, 500ms fade-in and slide-up.
- Dark first: the dark theme is the default, the light theme is one click away
  and remembered in `localStorage`.

One value is absent from the charter: the light-mode border, derived from Slate
(`rgba(100, 116, 139, 0.25)`).

## Local preview

```bash
python3 -m http.server 8000
```

Then http://localhost:8000.

## Deployment

GitHub Pages, `main` branch, repository root: `Settings > Pages > Deploy from a branch`.

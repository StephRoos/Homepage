# Homepage

Site personnel statique, en HTML, CSS et JavaScript, sans framework ni build.

Réalisé comme projet final du module A (WebDev Foundation) du cours
« D3 ❤️ React » de Yan Holtz, dans la charte graphique Anthemion v2.0
(`CANOPEE/2 CASQUETTES/Professionnel/createur-contenu/anthemion/identite-visuelle/`).

## Structure

```
index.html    page unique : accueil, à propos, ce que je fais, parcours, projets, contact
styles.css    tokens Anthemion, thème sombre par défaut, mise en page responsive
main.js       thème persistant, menu mobile, réseau de particules, typewriter, révélations au scroll
favicon.svg   monogramme aux couleurs de la charte
```

## Inspirations

| Source | Ce qui en vient |
|---|---|
| [ckntav.github.io](https://ckntav.github.io/) | nav fixe, bascule clair/sombre, champ de particules dans le hero, typewriter, cartes de portfolio |
| [yan-holtz.com](https://www.yan-holtz.com/) | hero centré avec pastille « Bonjour », titre display, rangées numérotées 01/02/03, frise chronologique du parcours, libellés de section en mono |

## Charte appliquée

- Couleurs : Bleu Paon `#067790`, Teal Light `#0A9AB5`, Teal Pale `#E0F4F8`,
  Orange Brûlé `#C06A30`, Amber Soft `#E8A96A`, Ink Black `#1e1e2e`,
  Surface Dark `#262637`, Border Dark `#313244`, Slate `#64748B`, Slate Light `#94A3B8`,
  Snow `#FAFBFC`, White Smoke `#F5F5F5`.
- Typographie Geist Sans et Geist Mono (Google Fonts), titres en 700 avec
  `letter-spacing: -0.025em`, labels en majuscules `0.1em`.
- Composants : boutons primary/outline radius 8px, badges primary et accent,
  cards radius 14px avec glow teal au survol, fade-in + slide-up à 500 ms.
- Dark first : le mode sombre est le défaut, le mode clair est disponible
  via le bouton et mémorisé dans `localStorage`.

Une seule valeur n'existe pas dans la charte : la bordure en mode clair,
dérivée du Slate (`rgba(100, 116, 139, 0.25)`).

## Prévisualisation locale

```bash
python3 -m http.server 8000
```

Puis http://localhost:8000.

## Déploiement

GitHub Pages, branche `main`, racine du dépôt : `Settings > Pages > Deploy from a branch`.

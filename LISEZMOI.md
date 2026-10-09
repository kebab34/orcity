# Site Groupe Orcity

Site React (Next.js + Framer Motion), bilingue français / anglais, généré en pages statiques.

- Français : `/`
- Anglais : `/en/`
- Le bouton **FR / EN** du menu (et le lien en bas de page) bascule de l'un à l'autre.

## Lancer en local

```bash
npm install
npm run dev      # http://localhost:3000
```

## Modifier les contenus

Tout est dans **`lib/content.js`** : coordonnées, programmes, implantations, catalogues,
et tous les textes en `fr` et en `en`. Les lignes « À COMPLÉTER » sont provisoires
(nom de domaine, email, téléphone).

## Mettre en ligne

```bash
npm run build    # crée le dossier out/
```

Sur Vercel : importer le dossier, aucun réglage particulier.

## Globe (section International)

Les implantations et leurs coordonnées sont dans `sites` (`lib/content.js`) ; le globe se met à jour tout seul.

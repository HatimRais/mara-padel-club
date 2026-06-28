# MĀRA — Padel Social Club · Marrakech

Site vitrine haut de gamme pour MĀRA, un club social dont l'activité principale est le **padel**, complété par le bien-être, la table, un club enfants et des espaces affaires.

Refonte complète, pensée comme une expérience éditoriale : grande imagerie plein cadre, palette terre/sable/pierre inspirée de Marrakech, typographie sérif élégante (Cormorant Garamond + Jost), animations au défilement et réservation de court interactive.

## Structure

```
site/
├── index.html        Accueil (hero, univers, table, galerie, adhésion)
├── padel.html        Padel — courts, réservation, tarifs, académie
├── wellness.html     Mara Wellness — hammam, soins, piscines, salle de sport
├── gourmet.html      Mara Gourmet — restaurant, carte, privatisation
├── kids.html         Mara Kids — club enfants & famille
├── business.html     Mara Business — coworking, bureaux, séminaires
├── contact.html      Contact & conciergerie (formulaire + carte)
└── assets/
    ├── css/style.css Système de design complet (tokens, composants, responsive)
    ├── js/main.js    Navigation, reveals au scroll, widget de réservation
    └── images/       Visuels du club (renommés sémantiquement)
```

## Navigation

La barre de navigation reprend la structure demandée :
**Padel · Mara Wellness · Mara Gourmet · Mara Kids · Mara Business · Contact** + bouton *Réserver un court*.

## Lancer en local

Aucune dépendance ni build. Ouvrir `index.html` directement, ou servir le dossier :

```bash
# Python 3
python -m http.server 5500 --directory site
# puis ouvrir http://localhost:5500
```

## Notes

- 100 % statique (HTML/CSS/JS), facilement déployable (Netlify, Vercel, GitHub Pages, hébergement classique).
- Le widget de réservation et les formulaires sont des démos front-end : brancher une API / un système de paiement pour la production.
- Carte via OpenStreetMap (remplaçable par Google Maps avec une clé API).
- Accessibilité : navigation au clavier, `prefers-reduced-motion` respecté, textes alternatifs sur les images.
- Coordonnées et tarifs sont des valeurs d'exemple à confirmer avec le client.

# AideMoiAreconnaitre - Version finale

Assistant IA spécialisé dans l'identification de pièces d'or, utilisant la capacité Vision de Claude.

Ce projet fait partie du tutoriel YouTube **"Faire un chatbot IA avec Claude Code"**.

## Fonctionnalités

- Upload d'images de pièces d'or
- Identification automatique via Claude Vision
- Informations détaillées : titrage, poids, tirage, valeur indicative
- Rendu Markdown des réponses
- Streaming en temps réel

## Installation

1. Cloner le repository
2. Installer les dépendances :
```bash
npm install
```

3. Créer un fichier `.env.local` avec votre clé API Anthropic :
```
ANTHROPIC_API_KEY=votre_clé_api
```

4. Lancer le serveur de développement :
```bash
npm run dev
```

5. Ouvrir [http://localhost:3000](http://localhost:3000)

## Utilisation

1. Cliquer sur le bouton image pour sélectionner une photo de pièce d'or
2. Optionnellement ajouter une question ou description
3. Envoyer pour obtenir l'identification

## Informations fournies

Pour chaque pièce identifiée :
- **Identification** : Type, pays, dénomination, année
- **Caractéristiques** : Avers, revers, tranche
- **Titrage** : Pureté de l'or (ex: 900‰)
- **Poids** : Brut et or fin
- **Tirage** : Nombre de pièces frappées
- **Refrappe** : Indication si applicable
- **Cours légal** : Statut actuel
- **Authenticité** : Points à vérifier
- **Valeur indicative** : Fourchette de prix

## Stack technique

- **Next.js 16** - Framework React
- **Tailwind CSS** - Styling
- **Anthropic SDK** - API Claude avec Vision
- **react-markdown** - Rendu Markdown
- **shadcn/ui** - Composants UI

## Structure du projet

```
├── app/
│   ├── api/chat/route.ts    # API avec support Vision
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── chat/                # Composants du chat
│   └── ui/                  # Composants shadcn/ui
├── hooks/
│   └── use-chat.ts          # Hook avec support images
└── types/
    └── chat.ts              # Types avec MessageImage
```

## Voir aussi

- [Version de base](../chatbot-base) - Chatbot simple sans Vision

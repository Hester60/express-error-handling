# Comment automatiser la gestion des erreurs sur Express ?

J'ai créé ce repository pour un poste LinkedIn expliquant comment gérer les erreurs sur une application Express.

## Bénéfice d'un error handler
- Automatisation de la gestion des erreurs
- "Consistence" du format des erreurs
- Logging au même endroit

## Démarrer le projet

- Créer un fichier .env à la racine avec le contenu du fichier .env.example

``npm run dev``

## Générer une erreur
``http://localhost:3000/`` : passer le query param error avec la valeur 401, 404 ou 500 pour déclencher une erreur.

E.g. ``http://localhost:3000?error=404`` retournera une erreur 404 formattée.
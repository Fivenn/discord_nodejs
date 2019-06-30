# discord_nodejs
Bot Discord NodeJS

## Installation du projet du projet :
### Installation de la base de données
* Créer une nouvelle base de données nommée "bot_discord".
* Exécuter le contenu du fichier ./bdd/BDD.sql pour créer les différentes tables de la base. Ce fichier permet aussi de créer un utilisateur "bot_discord" et de lui donner les droits sur les tables de la base. Cela permet d'éviter d'utiliser l'utilisateur de base de postgres.
* Changer le port de connexion de votre serveur pour le 5555 (si vous rencontrez des problèmes d'identification après ce changement, laissez votre port de connexion par défaut et modifiez les URLs de connexion des fichiers __interface.js__ et __bot_discord.js__).

### Lancement du projet
* Lancez deux terminaux et exécutez le fichier bot_discord.js sur l'un et interface.js sur l'autre.
* Ajoutez notre bot à un serveur grâce à l'interface et administrez-le.
* Gérez votre serveur Discord grâce aux commandes du fichier bot_discord.js (!kick, !ban, !mute, !deaf).
* Signature d'une commande : !commande @member reason.

## Modules à prévoir :
* Express : Gestion des routes, EJS et Middleware
* Socket.io : Communication synchrone
* Body-parser : Gestion des formulaires web
* Discord-anti-spam : Gestion des spams
* Discord-oauth2 : Permet la connection à Discord
* Discord.js : Permet la gestion d'un bot Discord
* Ejs : Utilisation de templates
* Pg : Permet la connection à la base de données
* Websocket : Permet la connection à la gateway Discord

## Fichiers :
* connection_gateway.js : Fichier d'exemple de connection à la Gateway Discord avec Ping/Pong sans Discord.js
* bot_discord.js : Fichier centrale appelant les fonctions du bot
* bot_discord_function.js : Fichier contenant les fonctions de gestion du bot
* interface.js : Fichier de lancement et de gestion de l'interface web 
* views/configuration.ejs : Template de la page de configuration du serveur
* views/index.ejs : Template de la page de connexion

## Autre
* Le compte-rendu des parties 2 et 3, le modèle relationnel ainsi que le modèle entité-association de notre base de données se trouvent dans le dossier __docs__

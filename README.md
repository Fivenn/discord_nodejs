# discord_nodejs
Bot Discord NodeJS

## Lancement du projet :

* Créer la BDD en utilisant le fichier bdd/bdd.sql
* Modifier la configuration de la connexion a la BDD pour l'adapter à la votre dans interface.js et bot_discord_functions.js
* Lancez deux terminaux et exécutez le fichier bot_discord.js sur l'un et interface.js sur l'autre

## Modules à prévoir
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

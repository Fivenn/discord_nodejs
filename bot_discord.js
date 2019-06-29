let botFunctions = require('./bot_discord_function.js'); // Module contenant les fonctions que le bot utilise

//==============//
// Init discord //
//==============//
const Discord = require('discord.js'); // Utilisation du module Discord.js
const botDiscord = new Discord.Client(); // Initialisation d'un client Discord
const token = 'NTg4MzQzODQ2OTcxMTEzNDky.XQnw-g.5Fi-UQwvOhmIlrhwsd8P04oFdZ0'; // Token du bot
botDiscord.login(token); // Connexion et identification du bot 

//===================//
// Discord anti-spam //
//===================//
const antispam = require('discord-anti-spam'); // Module Discord anti-spam (ajouté par manque de temps)

//================//
// Bot management //
//================//

/* Quand le bot est connecté et identifié, l'API Discord nous renvoie un code "ready" */
botDiscord.on('ready', () => {
    console.log(`Logged in as ${botDiscord.user.tag}!`); // Affichage d'un texte dans la console pour confirmer la connexion à l'API

    /* Initialisation du module anti-spam avec les paramètres suivants */
    antispam(botDiscord, {
        warnBuffer:3, // Nombre de messages maximum autorisé à envoyer dans l'interval avant d'être alerté
        maxBuffer: 5, // Nombre de messages maximum autorisé à envoyer dans l'interval avant d'être banni
        interval: 2000, // La durée en ms permet aux utilisateurs d'envoyer le nombre maximum de messages (maxBuffer) avant d'être bannis
        warningMessage: "please stop spamming!", // Message d'alerte affiché à l'utilisateur lorsque le bot détecte du spam
        banMessage: "CHEEEEEEH", // Message de ban affiché lorsqu'un utilisateur à continué de spam après un message d'alerte
        maxDuplicatesWarning: 7, // Au bout de 7 spam dupliqué par une même personne, on envoie un message pour prévenoir celle-ci
        maxDuplicatesBan: 10, // Au bout de 10 spam dupliqué par une même personne, on ban celle-ci et envoie un message dans un channel
        deleteMessagesAfterBanForPastDays: 7, // Suppression des messages de spam d'une personne bannie datant d'au moins 7 jours
        exemptRoles: ["modo"], // Les rôles exemptés de l'anti-spam
        exemptUsers: [] // Les utilisateurs exemptés de l'anti-spam
    });
});

/* Quand le bot reçoit le mot clé "message" */
botDiscord.on('message', message => {
    if (!message.guild) return; // Si se n'est pas un message serveur, on ne fait rien

    /* Si le message commence par "!kick" alors on appelle la fonction kick() pour exclure une personne d'un serveur Discord */
    if (message.content.startsWith('!kick')) {
        botFunctions.kick(message);
    }

    /* Si le message commence par "!ban" alors on appelle la fonction ban() pour bannir une personne d'un serveur Discord */
    if (message.content.startsWith('!ban')) {
        botFunctions.ban(message);
    }

    /* Si le message commence par "!mute" alors on appelle la fonction ban() pour empêcher toute personne d'écrire dans un salon textuel ou de parler dans un salon vocal */
    if (message.content.startsWith('!mute')) {
        botFunctions.mute(message);
    }

    /* Si le message commence par "!deaf" alors on appelle la fonction deaf() pour empêcher toute personne de se connecter à un salon vocal */
    if (message.content.startsWith('!deaf')) {
        botFunctions.deaf(message);
    }

    botDiscord.emit('checkMessage', message);
});

/* Quand le bot reçoit le mot clé "guildCreate" */
botDiscord.on('guildCreate', () => {
    botFunctions.guildCreate(botDiscord); // Appel de la fonction "guildCreate"
});

/* Quand le bot reçoit le mot clé "guildDelete" */
botDiscord.on('guildDelete', (guild) => {
    console.log('ByeBye'); // Affichage dans le console d'un message de debug pour confirmer la bonne déconnexion */
});
//==============//
// Init discord //
//==============//
const Discord = require('discord.js');
const botDiscord = new Discord.Client();
const token = 'NTg4MzQzODQ2OTcxMTEzNDky.XQnw-g.5Fi-UQwvOhmIlrhwsd8P04oFdZ0';
botDiscord.login(token);

//===============//
// Init database //
//===============//
const { Client } = require('pg');
const connectionString = 'postgresql://bot_discord:bot_discord@localhost:5555/bot_discord';
const dbDiscord = new Client({
    connectionString: connectionString,
});
dbDiscord.connect();

//================//
// Bot management //
//================//
botDiscord.on('ready', () => {
    console.log(`Logged in as ${botDiscord.user.tag}!`);
});

botDiscord.on('message', message => {
    if(!message.guild) return;
    
    /* Si la commande commence par "!kick" alors éxécution du code dans la condition.
    * Commande sous la forme !kick @membername raison_kick
    */
    if(message.content.startsWith('!kick')) {
        const user = message.mentions.users.first(); // Récupération du nom de l'utilisateur à bannir
        const guild = message.guild; // Récupération du nom du serveur sur lequel on exécute la commande
        const regexCmd = /\s?([<0-9>])\s/; // Regex permettant de récupérer la raison du ban
        const resRegCmd = message.content.split(regexCmd); // On applique la regex sur le contenu de la commande

        /* Si on arrive à récupérer l'utilisateur Discord */
        if(user) {
            const member = message.guild.member(user);
            if(member) {
                /* Raison du kick à fournir au client Discord pour les logs */
                member.kick(`${resRegCmd[2]}`).then(() => {
                    message.reply(`Successfully kicked ${user.tag}`);
                }).catch(err => {
                    message.reply('I was unable to kick the member');
                    console.error(err);
                });
            } else {
                message.reply('That user isn\'t in this guild');
            }
        } else {
            message.reply('You didn\'t mention the user to kick');
        }
    }

    /* Si la commande commence par "!ban" alors exécution du code dans la condition.
    * Commande sous la forme : !ban @membername raison_ban 
    */
    if(message.content.startsWith('!ban')) {
        const user = message.mentions.users.first(); // Récupération du nom de l'utilisateur à bannir
        const guild = message.guild; // Récupération du nom du serveur sur lequel on exécute la commande
        const regexCmd = /\s?([<0-9>])\s/; // Regex permettant de récupérer la raison du ban
        const resRegCmd = message.content.split(regexCmd); // On applique la regex sur le contenu de la commande

        /* Si on arrive à récupérer l'utilisateur Discord */
        if(user) {
            const member = message.guild.member(user); // Récupération du membre en fonction de l'utilisateur récupéré
            /* Si on arrive à récupérer le membre du serveur Discord associé à l'utilisateur */
            if(member) {
                member.ban({
                    reason: `${resRegCmd[2]}`, // Raison du ban à fournir au client Discord`pour les logs
                }).then(() => {
                    /* Impossible d'envoyer un message privé à un utilisateur quand on le BAN (le bot doit avoir un serveur commun avec lui) */
                    // user.send(`You have been banned from the ${guild.name} server for the following reason: ${resRegCmd[2]}`);
                    var request = `insert into Sanction values (false, null, '${resRegCmd[2]}', 'BAN')`; // Insertion dans la table Sanction de l'atom et la raison du ban (ajout de la temporalité si assez de temps)
                    /* Éxécution de la requête sur la database bot_discord */
                    dbDiscord.query(request).then(res => {
                        console.log(res.rows[0]);
                    }).catch(e => console.error(e.stack));

                    /* Update du membre à bannir pour lui appliquer la sanction dans notre database */
                   request = `update estmembre
                   set sanction_raison = '${resRegCmd[2]}', sanction_atom = 'BAN'
                   from utilisateur, serveur
                   where utilisateur.id = estmembre.id_utilisateur and serveur.id = estmembre.id_serveur and utilisateur.pseudo = '${user.username}' and serveur.nom = '${guild.name}'`;
                    /* Éxécution de la requête sur la database bot_discord */
                   dbDiscord.query(request).then(res => {
                       console.log(res.rows[0]);
                   }).catch(e => console.error(e.stack));

                    message.reply(`Successfully banned ${user.tag}`);
                }).catch(err => {
                    message.reply('I was unable to ban the member');
                    console.error(err);
                });
            } else {
                message.reply('That user isn\'t in this guild!');
            }
        } else {
            message.reply('You didn\'t mention the user to ban!');
        }
    }
});


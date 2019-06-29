//===============//
// Init database //
//===============//
const {
    Client
} = require('pg');
const connectionString = 'postgresql://bot_discord:bot_discord@localhost:5555/bot_discord';
const dbDiscord = new Client({
    connectionString: connectionString,
});
dbDiscord.connect();

//===========//
// Functions //
//===========//
/* 
* Cette fonction permet de bannir une personne d'un serveur discord quand on réalise la commande "!ban".
* Elle permet aussi de pouvoir modifier notre base de données afin d'ajouter une nouvelle sanction (avec une éventuelle raison) et de l'appliquer à un membre.
* Exemple de commande : !ban @membre_discord_à_bannir raison
*/
function ban(message) {
    const user = message.mentions.users.first(); // Récupération du nom de l'utilisateur à bannir
    const guild = message.guild; // Récupération du nom du serveur sur lequel on exécute la commande
    const regexCmd = /\s?([<0-9>])\s/; // Regex permettant de récupérer la raison du ban
    const resRegCmd = message.content.split(regexCmd); // On applique la regex sur le contenu de la commande

    /* Si on arrive à récupérer l'utilisateur Discord */
    if (user) {
        const member = message.guild.member(user); // Récupération du membre en fonction de l'utilisateur récupéré
        /* Si on arrive à récupérer le membre du serveur Discord associé à l'utilisateur */
        if (member) {
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

/*
* Cette fonction permet d'expulser une personne d'un serveur discord quand on réalise la commande "!kick".
* Elle permet aussi de pouvoir modifier notre base de données afin d'ajouter une nouvelle sanction (avec une éventuelle raison) et de l'appliquer à un membre.
* Exemple de commande : !kick @membre_discord_à_bannir raison
*/
function kick(message) {
    const user = message.mentions.users.first(); // Récupération du nom de l'utilisateur à bannir
    const guild = message.guild; // Récupération du nom du serveur sur lequel on exécute la commande
    const regexCmd = /\s?([<0-9>])\s/; // Regex permettant de récupérer la raison du ban
    const resRegCmd = message.content.split(regexCmd); // On applique la regex sur le contenu de la commande

    /* Si on arrive à récupérer l'utilisateur Discord */
    if (user) {
        const member = message.guild.member(user); // Récupération du membre en fonction de l'utilisateur récupéré
        /* Si on arrive à récupérer le membre du serveur Discord associé à l'utilisateur */
        if (member) {
            /* Raison du kick à fournir au client Discord pour les logs */
            member.kick(`${resRegCmd[2]}`).then(() => {
                /* Impossible d'envoyer un message privé à un utilisateur quand on le BAN (le bot doit avoir un serveur commun avec lui) */
                // user.send(`You have been banned from the ${guild.name} server for the following reason: ${resRegCmd[2]}`);
                var request = `insert into Sanction values (false, null, '${resRegCmd[2]}', 'KICK')`; // Insertion dans la table Sanction de l'atom et la raison du ban (ajout de la temporalité si assez de temps)
                /* Éxécution de la requête sur la database bot_discord */
                dbDiscord.query(request).then(res => {
                    console.log(res.rows[0]);
                }).catch(e => console.error(e.stack));

                /* Update du membre à kick pour lui appliquer la sanction dans notre database */
                request = `update estmembre
                   set sanction_raison = '${resRegCmd[2]}', sanction_atom = 'KICK'
                   from utilisateur, serveur
                   where utilisateur.id = estmembre.id_utilisateur and serveur.id = estmembre.id_serveur and utilisateur.pseudo = '${user.username}' and serveur.nom = '${guild.name}'`;
                /* Éxécution de la requête sur la database bot_discord */
                dbDiscord.query(request).then(res => {
                    console.log(res.rows[0]);
                }).catch(e => console.error(e.stack));
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

/* 
* Cette fonction permet de mute une personne d'un serveur discord quand on réalise la commande "!mute".
* Elle permet aussi de pouvoir modifier notre base de données afin d'ajouter une nouvelle sanction (avec une éventuelle raison) et de l'appliquer à un membre.
* Exemple de commande : !mute @membre_discord_à_bannir raison
*/
async function mute(message) {
    const user = message.mentions.users.first(); // Récupération du nom de l'utilisateur à bannir
    const guild = message.guild; // Récupération du nom du serveur sur lequel on exécute la commande
    const regexCmd = /\s?([<0-9>])\s/; // Regex permettant de récupérer la raison du ban
    const resRegCmd = message.content.split(regexCmd); // On applique la regex sur le contenu de la commande

    /* Si on arrive à récupérer l'utilisateur Discord */
    if (user) {
        const member = message.guild.member(user); // Récupération du membre en fonction de l'utilisateur récupéré
        /* Si on arrive à récupérer le membre du serveur Discord associé à l'utilisateur */
        if (member) {
            let muterole = message.guild.roles.find(x => x.name === "muted"); // muterole contient l'éventuel rôle muted trouvé sur un serveur

            /* Si le rôle n'existe pas sur le serveur, on le créer */
            if (!muterole) {
                try {
                    /* Création d'un rôle muted avec les paramètres spécifiés ci-dessous */
                    muterole = await message.guild.createRole({
                        name: "muted", // Nom du rôle
                        color: "#FF0000", // Couleur du rôle (rouge ici)
                        permissions: [] // Les éventuels permissions du rôle. Ici nous n'en mettons pas car elles seront écrasées par les permissions des salons
                    })

                    /* Pour chaque channel présent sur notre serveur on applique le rôle muted et set up les permissions ci-dessous */
                    message.guild.channels.forEach(async channel => {
                        await channel.overwritePermissions(muterole, {
                            SEND_MESSAGES: false, // Impossibilité d'envoyer des messages dans les channels textuel
                            ADD_REACTIONS: false, // Impossibilité de réagir à des messages dans les channels textuel
                            SPEAK: false // Impossibilité de parler dans les channels textuel
                        });
                    });
                } catch (e) {
                    console.log(e.stack);
                    message.reply('impossible to create or assign the "muted" role');
                }
            }
            /* Ajout du rôle muted au membre à mute */
            await (member.addRole(muterole.id)).then(res => {
                var request = `insert into Sanction values (false, null, '${resRegCmd[2]}', 'MUTE')`; // Insertion dans la table Sanction de l'atom et la raison du ban (ajout de la temporalité si assez de temps)
                /* Éxécution de la requête sur la database bot_discord */
                dbDiscord.query(request).then(res => {
                    console.log(res.rows[0]);
                }).catch(e => console.error(e.stack));

                /* Update du membre à bannir pour lui appliquer la sanction dans notre database */
                request = `update estmembre
               set sanction_raison = '${resRegCmd[2]}', sanction_atom = 'MUTE'
               from utilisateur, serveur
               where utilisateur.id = estmembre.id_utilisateur and serveur.id = estmembre.id_serveur and utilisateur.pseudo = '${user.username}' and serveur.nom = '${guild.name}'`;
                /* Éxécution de la requête sur la database bot_discord */
                dbDiscord.query(request).then(res => {
                    console.log(res.rows[0]);
                }).catch(e => console.error(e.stack));

                message.reply(`Successfully mute ${user.tag}`);
            }).catch(err => {
                message.reply('I was unable to mute the member');
                console.error(err);
            })
        } else {
            message.reply('That user isn\'t in this guild');
        }
    } else {
        message.reply('You didn\'t mention the user to kick');
    }
}

/* 
* Cette fonction permet de deaf une personne d'un serveur discord quand on réalise la commande "!deaf".
* Elle permet aussi de pouvoir modifier notre base de données afin d'ajouter une nouvelle sanction (avec une éventuelle raison) et de l'appliquer à un membre.
* Exemple de commande : !mute @membre_discord_à_bannir raison
*/
async function deaf(message) {
    const user = message.mentions.users.first(); // Récupération du nom de l'utilisateur à bannir
    const guild = message.guild; // Récupération du nom du serveur sur lequel on exécute la commande
    const regexCmd = /\s?([<0-9>])\s/; // Regex permettant de récupérer la raison du ban
    const resRegCmd = message.content.split(regexCmd); // On applique la regex sur le contenu de la commande

    /* Si on arrive à récupérer l'utilisateur Discord */
    if (user) {
        const member = message.guild.member(user); // Récupération du membre en fonction de l'utilisateur récupéré
        /* Si on arrive à récupérer le membre du serveur Discord associé à l'utilisateur */
        if (member) {
            /* On vérifie si un éventuel rôle deafed existe sur le serveur */
            let deafrole = message.guild.roles.find(x => x.name === "deafed");

            /* Si le rôle n'existe pas sur le serveur, on le créer */
            if (!deafrole) {
                try {
                    /* Création du rôle deafed avec les paramètres ci-dessous */
                    deafrole = await message.guild.createRole({
                        name: "deafed", // Nom du rôle
                        color: "#FF0000", // Couleur du rôle (rouge)
                        permissions: [] // Les éventuels permissions du rôle. Ici nous n'en mettons pas car elles seront écrasées par les permissions des salons
                    })
                    /* Pour chaque channel présent sur notre serveur on applique le rôle muted et set up les permissions ci-dessous */
                    message.guild.channels.forEach(async channel => {
                        await channel.overwritePermissions(deafrole, {
                            CONNECT: false, // Impossibilité de se connecter sur un serveur vocal

                        });
                    });
                } catch (e) {
                    console.log(e.stack);
                    message.reply('impossible to create or assign the "deafed" role');
                }
            }
            await (member.addRole(deafrole.id)).then(res => {
                var request = `insert into Sanction values (false, null, '${resRegCmd[2]}', 'DEAF')`; // Insertion dans la table Sanction de l'atom et la raison du ban (ajout de la temporalité si assez de temps)
                /* Éxécution de la requête sur la database bot_discord */
                dbDiscord.query(request).then(res => {
                    console.log(res.rows[0]);
                }).catch(e => console.error(e.stack));

                /* Update du membre à bannir pour lui appliquer la sanction dans notre database */
                request = `update estmembre
               set sanction_raison = '${resRegCmd[2]}', sanction_atom = 'DEAF'
               from utilisateur, serveur
               where utilisateur.id = estmembre.id_utilisateur and serveur.id = estmembre.id_serveur and utilisateur.pseudo = '${user.username}' and serveur.nom = '${guild.name}'`;
                /* Éxécution de la requête sur la database bot_discord */
                dbDiscord.query(request).then(res => {
                    console.log(res.rows[0]);
                }).catch(e => console.error(e.stack));

                message.reply(`Successfully deaf ${user.tag}`);
            }).catch(err => {
                message.reply('I was unable to deaf the member');
                console.error(err);
            })
        } else {
            message.reply('That user isn\'t in this guild');
        }
    } else {
        message.reply('You didn\'t mention the user to kick');
    }
}

/* 
* Cette fonction permet de peuple la base de donnees lors de l'arrive du bot sur un serveur discord
*/
function guildCreate(botDiscord) {
    console.log('New guild joined');

    //Initialisation des variables
    var guild_list = [];
    var compteur = 0;
    var request = null;
    botDiscord.guilds.forEach(element => {
        guild_list.push(element).guild;
        compteur++;
    });

    const channel_list = guild_list[compteur - 1].channels;
    const roles_list = guild_list[compteur - 1].roles;
    const membre_list = guild_list[compteur - 1].members;
    const id_serveur = guild_list[compteur - 1].id;
    const nom_serveur = guild_list[compteur - 1].name;
    const capacite = 30;
    const id_createur = guild_list[compteur - 1].ownerID;

    var is_nitro = guild_list[compteur - 1].owner.client.premium;
    var pseudo = guild_list[compteur - 1].owner.user.username;
    var num_authent = guild_list[compteur - 1].owner.user.discriminator;

    //Generation du token aleatoire de connexion
    var token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    var test_serveur = null;
    var test_user = null;
    var test_role = null;
    var test_channel = null;
    var test_membre = null;
    var role_membre_pos = 0;
    var role_membre_nom = null;
    var list_role_membre = null;

    //Verification de la presence du serveur en BDD
    dbDiscord.query(`Select id from serveur where id='${id_serveur}'`).then(res => {
        test_serveur = res.rowCount

        if (test_serveur != 1) {
            //Si le serveur n'est pas present en BDD alors on l'insere
            request = `insert into serveur values('${guild_list[compteur-1].id}','${guild_list[compteur-1].name}','${token}',30,'${guild_list[compteur-1].ownerID}');`;
            dbDiscord.query(request, (err, res) => {
                if (err) {
                    console.log(err.stack)
                }
            })
            //Envoi du token de connexion au Owner du serveur
            botDiscord.users.get(botDiscord.guilds.get(guild_list[compteur - 1].id).ownerID).send("Votre token de connection : " + token);
        }
    }).catch(e => console.error(e.stack));

    //Reccuperation de chaque roles du serveur
    roles_list.forEach(element => {

        //Verification si le role n'est pas present en BDD
        dbDiscord.query(`Select nom,position from role where nom='${element.name}' and position='${element.position}'`).then(res => {
            test_role = res.rowCount

            if (test_role != 1) {
                //Si le role n'est pas present on l'insere en BDD
                request = `insert into role values('${element.name}','${element.color}','${element.position}');`;
                dbDiscord.query(request, (err, res) => {
                    if (err) {
                        console.log(err.stack)
                    }
                })
            }
        }).catch(e => console.error(e.stack));
    });

    //Reccuperation des membres du serveur
    membre_list.forEach(element => {

        //Verification que les utilisateurs ne soient pas present en BDD
        dbDiscord.query(`Select id from utilisateur where id='${element.user.id}'`).then(res => {
            test_user = res.rowCount

            if (test_user != 1) {
                //Si il n'est pas present on l'insere en verifiant bien que le statut premium soit definit ou non
                if (element.client.premium !== undefined) {
                    request = `insert into utilisateur values('${element.user.id}','${element.user.username}','${element.user.discriminator}','${element.client.premium}');`;
                } else {
                    request = `insert into utilisateur values('${element.user.id}','${element.user.username}','${element.user.discriminator}',false);`;
                }
                dbDiscord.query(request, (err, res) => {
                    if (err) {
                        console.log(err.stack)
                    }
                })
            }

        }).catch(e => console.error(e.stack));

        //Verification que le membre n'est pas deja present en BDD
        dbDiscord.query(`Select id_utilisateur from estMembre where id_utilisateur='${element.user.id}' and id_serveur= '${id_serveur}'`).then(res => {
            test_membre = res.rowCount

            if (test_membre != 1) {
                //Si le membre n'est pas present alors on reccupere ses informations
                list_role_membre = element.roles;

                //Reccuperation de son role le plus haut dans la hierarchie
                list_role_membre.forEach(element => {
                    if (element.position >= role_membre_pos) {
                        role_membre_pos = element.position;
                        role_membre_nom = element.name;
                    }
                })

                //Insertion du nouveau membre
                dbDiscord.query(`insert into estMembre values('${element.user.id}','${id_serveur}','${role_membre_pos}','${role_membre_nom}',null,null);`, (err, res) => {
                    if (err) {
                        console.log(err.stack)
                    }
                })
                //Reinitialisation des variables de role
                role_membre_pos = 0;
                role_membre_nom = null;
            }
        })
    });

    //Reccuperation des channels du serveur
    channel_list.forEach(element => {

        //Verification que le channel ne soit pas deja en BDD
        dbDiscord.query(`Select nom,type from salon where nom='${element.name}' and type='${element.type}'`).then(res => {
            test_channel = res.rowCount

            if (test_channel != 1) {
                //Si il n'est pas en BDD on l'insere
                request = `insert into salon values('${element.name}','${element.type}','${element.category}','${id_serveur}');`;
                dbDiscord.query(request, (err, res) => {
                    if (err) {
                        console.log(err.stack)
                    }
                })
            }
        }).catch(e => console.error(e.stack));
    });
}

//Export pour le fichier bot_discord.js
module.exports.ban = ban;
module.exports.kick = kick;
module.exports.mute = mute;
module.exports.deaf = deaf;
module.exports.guildCreate = guildCreate;
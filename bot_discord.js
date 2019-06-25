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

// D[particule](user, reason)
// D[particule](user, reason,channels)
// T[particule](user, duration, reason)
// T[particule](user, duration, reason,channels)

botDiscord.on('message', message => {
    if(!message.guild) return;
    
    if(message.content.startsWith('!kick')) {
        const user = message.mentions.users.first();
        if(user) {
            const member = message.guild.member(user);
            if(member) {
                member.kick('Optional reason that will display in the audit logs').then(() => {
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

    if(message.content.startsWith('!ban')) {
        const user = message.mentions.users.first();
        const guild = message.guild;
        if(user) {
            const member = message.guild.member(user);
            if(member) {
                member.ban({
                    reason: 'They were bad!',
                }).then(() => {
                    // insert into Sanction values (false, null, 'CHEH', 'BAN')
                    var regexCmd = /\s?([<0-9>])\s/;
                    var resRegCmd = message.content.split(regexCmd);
                    const request = `insert into Sanction values (false, null, '${resRegCmd[2]}', 'BAN')`;
                    dbDiscord.query(request).then(res => {
                        console.log(res.rows[0]);
                    }).catch(e => console.error(e.stack));
                    /* UPDATE update estmembre
                    *   set sanction_raison = 'CHEH', sanction_atom = 'BAN'
                    *   from utilisateur, serveur
                    *   where utilisateur.id = estmembre.id_utilisateur and serveur.id = estmembre.id_serveur and utilisateur.pseudo = '${user.username}' and serveur.nom = '${guild.name}'; */

                    message.reply(`Successfully banned ${user.tag}`);
                }).catch(err => {
                    message.reply('I was unable to ban the member');
                    console.error(err);
                    console.log(`${user.username}, ${guild.name}`);
                });
            } else {
                message.reply('That user isn\'t in this guild!');
            }
        } else {
            message.reply('You didn\'t mention the user to ban!');
        }
    }
});


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
        if(user) {
            const member = message.guild.member(user);
            if(member) {
                member.ban({
                    reason: 'They were bad!',
                }).then(() => {
                    //INSERT dans Sanction
                    // UPDATE dans Estmembre
                    message.reply(`Successfully banned ${user.tag}`);
                }).catch(err => {
                    message.reply('I was unable to ban the member');
                    console.error(err);
                });
            } else {
                message.reply('That user isn\'t in this guild!');
            }
        } else {
            message.reply('Uou didn\'t mention the user to ban!');
        }
    }
});

//   text = `SELECT * FROM estmembre join utilisateur on estmembre.id_utilisateur = utilisateur.id join serveur on estmembre.id_serveur = serveur.id where pseudo = 'Birlak' and serveur.nom = 'NodeJS'`;
//   dbDiscord.query(text).then(res => {
//       if(res.rows[0].role >= 3) {
//           console.log(res.rows);
//       }
//   }).catch(e => console.error(e.stack));


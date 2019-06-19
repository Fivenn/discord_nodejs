//=============
// Init discord
//=============
const Discord = require('discord.js');
const botDiscord = new Discord.Client();
const token = 'NTg4MzQzODQ2OTcxMTEzNDky.XQnw-g.5Fi-UQwvOhmIlrhwsd8P04oFdZ0';
botDiscord.login(token);

//==============
// Init database
//==============
const { Client } = require('pg');
const connectionString = 'postgresql://bot_discord:bot_discord@localhost:5555/bot_discord';
const dbDiscord = new Client({
    connectionString: connectionString,
});
dbDiscord.connect();

//===============
// Bot management
//===============
botDiscord.on('ready', () => {
    console.log(`Logged in as ${botDiscord.user.tag}!`);
});

botDiscord.on('guildMemberAdd', member => {
});

botDiscord.on('message', msg => {
    if(msg.content === '-ban') {
        const request = `select * from utilisateur, serveur, estmembre, role where pseudo = '${msg.member.user.username}' and id_utilisateur = utilisateur.id and serveur.nom = '${msg.guild.name}'`;
        dbDiscord.query(request).then(res => {
            if(res.rows[0].role < 3) {
                
            }
            console.log(res.rows);
        }).catch(e => console.error(e.stack));
    }
});



// const text = 'SELECT * FROM estmembre'

// dbDiscord.query(text)
//   .then(res => {
//     console.log(res.rows[0])
//   })
//   .catch(e => console.error(e.stack))
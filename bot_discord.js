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

// D[particule](user, reason)
// D[particule](user, reason,channels)
// T[particule](user, duration, reason)
// T[particule](user, duration, reason,channels)

botDiscord.on('message', msg => {
    if(msg.content === '-ban') {
        // Vérifier que la personne qui réalise la commande a assez de droits (position < 3)
        // Vérifier que la personne qui subit la commande a le role pour (position > 5)
        // Vérifier si la commande est définitive
        // Si conditions vérifiées alors on update la BDD
        // Prévenir dans l'auteur de la prise en compte de la commande
        // Prévenir la personne sanctionnée de la prise en compte de la commande

        // const request = `select * from utilisateur, serveur, estmembre, role where pseudo = '${msg.member.user.username}' and id_utilisateur = utilisateur.id and serveur.nom = '${msg.guild.name}'`;
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
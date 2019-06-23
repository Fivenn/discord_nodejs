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
    console.log('Connection');
});

botDiscord.on('guildCreate', () => {
    console.log('New guild joined');
    var guild_list = [];
    var compteur = 0;
    botDiscord.guilds.forEach(element => {
        guild_list.push(element).guild;
        compteur++;
    });

    const channel_list = guild_list[compteur-1].channels;
    //channel.name + channel.type a reccuperer lors de l'insertion BDD

    const roles_list = guild_list[compteur-1].roles;
    //Table role  : role.name + role.position + role.color
    
    const membre_list = guild_list[compteur-1].members;
    //Table estMembre : role.members 

    const id_serveur = guild_list[compteur-1].id;
    const nom_serveur = guild_list[compteur-1].name;
    const capacite = 30;
    const id_createur = guild_list[compteur-1].ownerID; 
    var is_nitro = guild_list[compteur-1].owner.client.premium;
    var pseudo = guild_list[compteur-1].owner.user.username;
    var num_authent = guild_list[compteur-1].owner.user.discriminator;

    console.log(is_nitro);
    console.log(num_authent);

    membre_list.forEach(element => {
        console.log(element.user.username);
    });

    roles_list.forEach(element => {
        console.log(element.name+"  "+element.position);
    });
    
    channel_list.forEach(element => {
        console.log(element.name+"  "+element.type);
    }); 

    console.log(pseudo);
    
    /*const request = 'insert into Serveur values('${msg.member.user.username}',null,IMR,30,4)';
        dbDiscord.query(request).then(res => {
            if(res.rows[0].role < 3) {
                
            }
            console.log(res.rows);
        }).catch(e => console.error(e.stack));*/
    botDiscord.users.get(botDiscord.guilds.get(guild_list[compteur-1].id).ownerID).send("Votre token de connection :");
});

botDiscord.on('guildDelete', () => {
    console.log('ByeBye');
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

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
const connectionString = 'postgresql://bot_discord:bot_discord@localhost:5432/Discord';
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
    var request = null;
    botDiscord.guilds.forEach(element => {
        guild_list.push(element).guild;
        compteur++;
    });

    const channel_list = guild_list[compteur-1].channels;

    const roles_list = guild_list[compteur-1].roles;
    
    const membre_list = guild_list[compteur-1].members;

    const id_serveur = guild_list[compteur-1].id;
    const nom_serveur = guild_list[compteur-1].name;
    const capacite = 30;
    const id_createur = guild_list[compteur-1].ownerID; 
    var is_nitro = guild_list[compteur-1].owner.client.premium;
    var pseudo = guild_list[compteur-1].owner.user.username;
    var num_authent = guild_list[compteur-1].owner.user.discriminator;
    var token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    var test_serveur = null;
    var test_user = null;
    var test_role = null;
    var test_channel = null;

    dbDiscord.query(`Select id from serveur where id='${id_serveur}'`).then(res => {
        test_serveur = res.rowCount

        if(test_serveur != 1) {
            request = `insert into serveur values('${guild_list[compteur-1].id}','${guild_list[compteur-1].name}','${token}',30,'${guild_list[compteur-1].ownerID}');`;
            dbDiscord.query(request, (err, res) => {
                if (err) {
                console.log(err.stack)
                }
            })
            botDiscord.users.get(botDiscord.guilds.get(guild_list[compteur-1].id).ownerID).send("Votre token de connection : "+token);
        }
    }).catch(e => console.error(e.stack));

    membre_list.forEach(element => {

        dbDiscord.query(`Select id from utilisateur where id='${element.user.id}'`).then(res => {
            test_user = res.rowCount

            if(test_user != 1) {
                if(element.client.premium !== undefined) {
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
    });

    roles_list.forEach(element => {
    
        dbDiscord.query(`Select nom,position from role where nom='${element.name}' and position='${element.position}'`).then(res => {
            test_role = res.rowCount
            console.log(test_role);
            if(test_role != 1) {
                request = `insert into role values('${element.name}','${element.color}','${element.position}');`;
                dbDiscord.query(request, (err, res) => {
                    if (err) {
                        console.log(err.stack)
                    }
                })
            }   
        }).catch(e => console.error(e.stack));
    });
    
    channel_list.forEach(element => {

        dbDiscord.query(`Select nom,type from salon where nom='${element.name}' and type='${element.type}'`).then(res => {
            test_channel = res.rowCount
            console.log(test_channel);
            if(test_channel != 1) {
                request = `insert into salon values('${element.name}','${element.type}','${element.category}','${id_serveur}');`;
                dbDiscord.query(request, (err, res) => {
                    if (err) {
                        console.log(err.stack)
                    }
                })
            }   
        }).catch(e => console.error(e.stack));
    });
});

botDiscord.on('guildDelete', () => {
    console.log('ByeBye');
});

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

var express = require('express');
var bodyParser = require("body-parser");
var DiscordOauth2 = require("discord-oauth2");
var oauth = new DiscordOauth2();
var app = express();
var port = 8080;

app.set('view engine','ejs');
app.use('/public',express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.render('index');
});
app.get('/creation-compte', function(req, res){
    res.render('creation-compte');
});
app.post('/submit-connection', (req, res) => {
    var token = req.body.token;
    request = `select id,nom from serveur where token='${req.body.token}'`;
    dbDiscord.query(request).then(retour => {
         if(retour.rowCount == 1) {
            botDiscord.guilds.forEach(element => {
                if(element.id == retour.rows[0].id) {
                    res.render('configuration',{"name":retour.rows[0].nom,"id":retour.rows[0].id,"roles":element.roles});
                }
            });
         } else {
            res.render('index');
        }
    }).catch(e => console.error(e.stack));
});
app.post('/configuration', (req, res) => {
    var i = 0;
    var mute = false;
    var kick = false;
    var deaf = true;
    var ban = true;

    botDiscord.guilds.forEach(element => {

        if(element.id == req.body.guild) {

            element.roles.forEach(role => {
            
                if(req.body.Kick !== undefined) {
                    while(req.body.Kick != role.name && i < 4) {
                        if(req.body.Kick[i] == role.name){
                            console.log("Kick : "+role.name);
                            kick = true;
                        }
                        i++;
                    } 
                    if(req.body.Kick == role.name) {
                        console.log("Kick : "+role.name);
                        kick = true;
                    }
                    i = 0;
                }

                 if(req.body.Mute !== undefined) {
                    while(req.body.Mute != role.name && i < 4) {
                        if(req.body.Mute[i] == role.name){
                            console.log("Mute : "+role.name);
                            mute = true;
                        }
                        i++;
                    } 
                    if(req.body.Mute == role.name) {
                        console.log("Mute : "+role.name);
                        mute = true;
                    }
                    i = 0;
                }

                if(req.body.Ban !== undefined) {
                    while(req.body.Ban != role.name && i < 4) {
                        if(req.body.Ban[i] == role.name){
                            console.log("Ban : "+role.name);
                            ban = true;
                        }
                        i++;
                    } 
                    if(req.body.Ban == role.name) {
                        console.log("Ban : "+role.name);
                        ban = true;

                    }
                    i = 0;
                }

                if(req.body.Deaf !== undefined) {
                        while(req.body.Deaf != role.name && i < 4) {
                            if(req.body.Deaf[i] == role.name){
                                console.log("Deaf : "+role.name);
                                deaf = true;
                            }
                            i++;
                        } 
                        if(req.body.Deaf == role.name) {
                            console.log("Deaf : "+role.name);
                            deaf = true;
                        }
                        i = 0;
                }
            });
        }
    });
});

app.post('/creationRole', function(req, res){
    var test = false;
    botDiscord.guilds.forEach(element => {
        if(element.id == req.body.guild) {
            element.roles.forEach(role => {
                if(role.name == req.body.roleName && role.position == req.body.rolePosition) {
                    test = true;
                }
                
            });
            if(!test) {
                element.createRole({
                    name: req.body.roleName,
                    color: req.body.roleColor,
                    position: req.body.rolePosition
                })
                    .then(role => console.log(`Created new role with name ${role.name} and color ${role.color}`))
                    .catch(console.error)
                
                    request = `insert into role values('${req.body.roleName}','${req.body.roleColor}','${req.body.rolePosition}')`;
                    dbDiscord.query(request, (err, res) => {
                        if (err) {
                            console.log(err.stack)
                        }
                    })
            }
            res.render('index');
        }
    });
});

app.post('/activation_log', function(req, res){
    var test = false;
    botDiscord.guilds.forEach(element => {
        if(element.id == req.body.guild) {
            element.channels.forEach(channel => {
                if(channel.name == "bot-logs") {
                    test = true;
                }
            });
            if(!test) {
                element.createChannel('bot-logs','text',null,null);
                request = `insert into salon values('bot-logs','text','texte','${req.body.guild}')`;
                dbDiscord.query(request, (err, res) => {
                    if (err) {
                        console.log(err.stack)
                    }
                })
            }
        }
    });
    res.render('index');
});

app.post('/desactivation_log', function(req, res){
    botDiscord.guilds.forEach(element => {
        if(element.id == req.body.guild) {
            element.channels.forEach(channel => {
                if(channel.name == "bot-logs") {
                    channel.delete();
                    request = `delete from salon where nom='bot-logs' and type='text' and id_serveur='${req.body.guild}'`;
                    dbDiscord.query(request, (err, res) => {
                        if (err) {
                            console.log(err.stack)
                        }
                    })
                }
            });
        }
    });
    res.render('index');
});

app.post('/creationCommande', function(req, res){
    var test = false;
    botDiscord.guilds.forEach(element => {
        if(element.id == req.body.guild) {
            request = `select * from commande where nom='${req.body.commandeName}' and atom='${req.body.commandeAtom}'`;
            dbDiscord.query(request).then(retour => {
                if(retour.rowCount == 0) {
                    request = `insert into commande values('${req.body.commandeName}','${req.body.commandeAtom}','${req.body.commandeSalonName}','${req.body.commandeSalonType}')`;
                    dbDiscord.query(request, (err, res) => {
                        if (err) {
                            console.log(err.stack);
                        }
                    });
                }
            });
            res.render('index');
        }
    });
});

app.listen(8080);

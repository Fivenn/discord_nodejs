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
const {
    Client
} = require('pg');
const connectionString = 'postgresql://bot_discord:bot_discord@localhost:5432/Discord';
const dbDiscord = new Client({
    connectionString: connectionString,
}); 
dbDiscord.connect();

//Reccuperation des packages
var express = require('express');
var bodyParser = require("body-parser");
var DiscordOauth2 = require("discord-oauth2");
var oauth = new DiscordOauth2();
var app = express();
var port = 8080;

//Mise en place de express avec definition du chemain public
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

//affichage de la page index lorsque l'on se connecte a la racine
app.get('/', function(req, res) {
    res.render('index');
});

//Lancement de la procedure de connection
app.post('/submit-connection', (req, res) => {

    var token = req.body.token; //Reccuperation du token rentree par l'utilisateur
    //Verification en BDD du token et reccuperation du serveur correspondant
    request = `select id,nom from serveur where token='${req.body.token}'`;
    dbDiscord.query(request).then(retour => {
        if (retour.rowCount == 1) {
            botDiscord.guilds.forEach(element => {
                if (element.id == retour.rows[0].id) {
                    //Si bon token, affichage de la page de configuration du bot avec passage d'arguments
                    res.render('configuration', {
                        "name": retour.rows[0].nom, //Passage du nom de serveur
                        "id": retour.rows[0].id, //Passage de l'id du serveur
                        "roles": element.roles //Passage de la liste des rôles
                    });
                }
            });
        } else {
            //Si mauvais token affichage de la page de connection
            res.render('index');
        }
    }).catch(e => console.error(e.stack));
});

//Lancement de l'attribution d'une commande a un role
app.post('/configuration', (req, res) => {

    //Reccuperation des informations du bon serveur
    botDiscord.guilds.forEach(element => {

        if (element.id == req.body.guild) {

            //Reccuperation de chaque role du serveur
            element.roles.forEach(role => {

                //Verification pour voir si le role rentre est correct
                if(role.name == req.body.roleName) {

                    //Verification en BDD si la commande existe
                    dbDiscord.query(`Select * from commande where nom='${req.body.commandeName}' and atom='${req.body.commandeAtom}'`).then(res => {
                        test_commande = res.rowCount;

                        if(test_commande >= 1) {
                            
                            //Si la commande existe, verification que l'attribution ne soit pas deja en BDD
                            dbDiscord.query(`Select * from attributionRole where position_role='${role.position}' and nom_role='${req.body.roleName}' and nom_commande='${req.body.commandeName}' and atom_commande='${req.body.commandeAtom}'`).then(test => {
                                if(test.rowCount == 0) {
                                    //Si l'attribution n'est pas deja en BDD alors on la met
                                    request = `insert into attributionRole values('${role.position}','${req.body.roleName}','${req.body.commandeName}','${req.body.commandeAtom}')`;
                                    dbDiscord.query(request, (err, res) => {
                                        if (err) {
                                            console.log(err.stack)
                                        }
                                    })
                                }
                            }).catch(e => console.error(e.stack));
                        }
                    }).catch(e => console.error(e.stack));
                }
            });
        }
    });
    //Affichage de la page de connection
    res.render('index');
});

//Lancement de la creation d'un role
app.post('/creationRole', function(req, res) {
    var test = false;

    //Reccuperation du bon serveur aupres de discord
    botDiscord.guilds.forEach(element => {

        if (element.id == req.body.guild) {

            //Verification si le role que l'on veut creer n'est pas deja present
            element.roles.forEach(role => {
                if (role.name == req.body.roleName && role.position == req.body.rolePosition) {
                    test = true;
                }

            });
            if (!test) {
                //Si le role n'existe pas on le cree sur le serveur
                element.createRole({
                        name: req.body.roleName,
                        color: req.body.roleColor,
                        position: req.body.rolePosition
                    })
                    .then(role => console.log(`Created new role with name ${role.name} and color ${role.color}`))
                    .catch(console.error)

                //Puis en le cree en BDD
                request = `insert into role values('${req.body.roleName}','${req.body.roleColor}','${req.body.rolePosition}')`;
                dbDiscord.query(request, (err, res) => {
                    if (err) {
                        console.log(err.stack)
                    }
                })
            }
            //Affichage de la page de connection
            res.render('index');
        }
    });
});

//Activation des logs
app.post('/activation_log', function(req, res) {
    var test = false;

    //Reccuperation du bon serveur
    botDiscord.guilds.forEach(element => {
        if (element.id == req.body.guild) {
            element.channels.forEach(channel => {

                //Verification si les logs sont deja actives
                if (channel.name == "bot-logs") {
                    test = true;
                }
            });

            if (!test) {

                //Si les logs ne sont pas actives on cree le channel dedies sur le serveur
                element.createChannel('bot-logs', 'text', null, null);
                request = `insert into salon values('bot-logs','text','texte','${req.body.guild}')`;

                //Puis creation en BDD
                dbDiscord.query(request, (err, res) => {
                    if (err) {
                        console.log(err.stack)
                    }
                })
            }
        }
    });
    //Affichage de la page de connection
    res.render('index');
});

//Desactivation des logs
app.post('/desactivation_log', function(req, res) {

    //Reccuperation du bon serveur
    botDiscord.guilds.forEach(element => {
        if (element.id == req.body.guild) {

            //Verification que le channel de log existe
            element.channels.forEach(channel => {
                if (channel.name == "bot-logs") {

                    //Si il existe on le supprime du serveur
                    channel.delete();
                    //Puis on le supprime de la BDD
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
    //Affichage de la page de connection
    res.render('index');
});

//Creation d'une commande
app.post('/creationCommande', function(req, res) {
    var test = false;

    //Reccuperation du bon serveur
    botDiscord.guilds.forEach(element => {
        if (element.id == req.body.guild) {

            //Verification que la commande n'existe pas deja en BDD
            request = `select * from commande where nom='${req.body.commandeName}' and atom='${req.body.commandeAtom}'`;
            dbDiscord.query(request).then(retour => {

                if (retour.rowCount == 0) {
                    //Si la commande n'existe pas on la cree en BDD
                    request = `insert into commande values('${req.body.commandeName}','${req.body.commandeAtom}','${req.body.commandeSalonName}','${req.body.commandeSalonType}')`;
                    dbDiscord.query(request, (err, res) => {
                        if (err) {
                            console.log(err.stack);
                        }
                    });
                }
            });
            //Affichage de la page de connection
            res.render('index');
        }
    });
});
//Specification du port de connection a la page web (localhost:8080)
app.listen(8080);

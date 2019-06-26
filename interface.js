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
            console.log(retour.rows[0].nom);
            res.render('configuration',{"name":retour.rows[0].id});
         } else {
             console.log("pas bon");
         }
    })
});
app.listen(8080);

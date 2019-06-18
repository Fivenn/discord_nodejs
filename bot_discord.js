const Discord = require('discord.js');
const client = new Discord.Client();

const token = "NTg4MzQzODQ2OTcxMTEzNDky.XQjF5A.WM3z7lrV6iacw7OWVUGyFb5-mZY";


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
    if(msg.content === '-keanu') {
        msg.reply("You're breathtaking!");
    }
    if(msg.content === '-ping') {
        msg.reply('Pong');
    }
});

client.login(token);
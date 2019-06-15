const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if(message.content == '-ping') {
        message.channel.send('pong');
    }

    if(message.content == '-keanureeves') {
        message.channel.send('YOU\'RE BREATHTAKING !');
    }
});

client.login('NTg4MzQzODQ2OTcxMTEzNDky.XQFILg.JBroGPXz-uKohK4Y6NncOG_wfd8');
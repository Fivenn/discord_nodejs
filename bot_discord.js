let botFunctions = require('./bot_discord_function.js');

//==============//
// Init discord //
//==============//
const Discord = require('discord.js');
const botDiscord = new Discord.Client();
const token = 'NTg4MzQzODQ2OTcxMTEzNDky.XQnw-g.5Fi-UQwvOhmIlrhwsd8P04oFdZ0';
botDiscord.login(token);

//================//
// Bot management //
//================//
botDiscord.on('ready', () => {
    console.log(`Logged in as ${botDiscord.user.tag}!`);
});

botDiscord.on('message', message => {
    if (!message.guild) return;

    if (message.content.startsWith('!kick')) {
        botFunctions.kick(message);
    }

    if (message.content.startsWith('!ban')) {
        botFunctions.ban(message);
    }

    if (message.content.startsWith('!mute')) {
        botFunctions.mute(message);
    }

    if (message.content.startsWith('!deaf')) {
        botFunctions.deaf(message);
    }
});

botDiscord.on('guildCreate', () => {
    botFunctions.guildCreate(botDiscord);
});

botDiscord.on('guildDelete', (guild) => {
    console.log('ByeBye');
});
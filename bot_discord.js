let botFunctions = require('./bot_discord_function.js');

//==============//
// Init discord //
//==============//
const Discord = require('discord.js');
const botDiscord = new Discord.Client();
const token = 'NTg4MzQzODQ2OTcxMTEzNDky.XQnw-g.5Fi-UQwvOhmIlrhwsd8P04oFdZ0';
botDiscord.login(token);

//===================//
// Discord anti-spam //
//===================//
const antispam = require('discord-anti-spam');

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

    botDiscord.emit('checkMessage', message);
});

botDiscord.on('guildCreate', () => {
    botFunctions.guildCreate(botDiscord);
});

botDiscord.on('guildDelete', (guild) => {
    console.log('ByeBye');
});

botDiscord.on('ready', () => {
    antispam(botDiscord, {
        warnBuffer:3,
        maxBuffer: 5,
        interval: 2000,
        warningMessage: "please stop spamming!",
        banMessage: "CHEEEEEEH",
        maxDuplicatesWarning: 7,
        maxDuplicatesBan: 10,
        deleteMessagesAfterBanForPastDays: 7,
        exemptRoles: ["modo"],
        exemptUsers: []
    });
});
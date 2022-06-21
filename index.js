// Import required Node Modules 
const Discord = require('discord.js');
require('dotenv').config()

// Setup Discord Intents
const client = new Discord.Client({
    messageCacheMaxSize: 500,
    fetchAllMembers: false,
    intents: [
        'GUILDS',
        'GUILD_MEMBERS',
        'GUILD_BANS',
        'GUILD_PRESENCES',
        'GUILD_MESSAGES',
        'GUILD_MESSAGE_REACTIONS',
        'DIRECT_MESSAGES',
        'DIRECT_MESSAGE_REACTIONS',
    ],
});

// Get Config File
client.config = require('./config');
client.emoji = require('./src/emoji');

const fs = require('fs');
const Enmap = require('enmap');

// Modules Load
fs.readdir('./src/modules/', (err, files) => {
    if (err) { return console.error(err); }
    files.forEach((file) => {
        require(`./src/modules/${file}`)(client);
    });
});

// Events Load
fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        const event = require(`./events/${file}`);
        let eventName = file.split('.')[0];
        client.on(eventName, event.bind(null, client));
    });
});

// Commands Load
client.commands = new Enmap();
client.aliases = new Enmap();

fs.readdir('./commands/', (err, folders) => {
    if (err) { return console.error(err); }

    for (let i = 0; i < folders.length; i++) {
        fs.readdir(`./commands/${folders[i]}/`, (error, files) => {
            if (error) { return console.error(error); }
            files.forEach((file) => {
                if (!file.endsWith('.js')) { return; }
                const props = require(`./commands/${folders[i]}/${file}`);
                const commandName = props.help.name;
                client.commands.set(commandName, props);

                if (props.conf.aliases) {
                    props.conf.aliases.forEach((alias) => {
                        client.aliases.set(alias, commandName);
                    });
                }
            });
        });
    }
});

client.levelCache = {};
for (let i = 0; i < client.config.permLevels.length; i++) {
    const thislvl = client.config.permLevels[i];
    client.levelCache[thislvl.name] = thislvl.level;
}

global.sentTrivia = new Set();

// Discord Login
client.login(process.env.TOKEN);
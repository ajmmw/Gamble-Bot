const fetch = require('node-fetch');
const Discord = require('discord.js');

exports.run = (client, message, args) => {
    fetch(`https://api.adviceslip.com/advice`)
        .then(res => res.json()).then(body => {
            return message.channel.send(`**ADVICE #${body.slip.id}**\n\`${body.slip.advice}\``);
        })
};

module.exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: 'User',
    cooldown: 10
};

module.exports.help = {
    name: 'advice',
    category: 'fun',
    description: 'Displays random advice for the user',
    usage: 'advice'
};
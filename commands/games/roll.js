module.exports.run = (client, message, args, level) => {
    const inputNumber = parseInt(args[0], 10);

    if (!inputNumber) {
        return client.error(message.channel, 'ERROR', `<@${message.author.id}> please provide a valid number for the max range!`);
    }

    const outputNumber = Math.ceil(Math.random() * inputNumber);

    return message.channel.send(`<@${message.author.id}> Rolls ${client.emoji.dice} **${outputNumber}** (1-${inputNumber})`);
};

module.exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: 'User',
    cooldown: 10
};

module.exports.help = {
    name: 'roll',
    category: 'fun',
    description: 'Rolls a random number between 1 and the number given',
    usage: 'roll <number>',
    details: '<number> => Any number you wish to be the max range'
};
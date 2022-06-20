module.exports.run = async(client, message, args) => {
    const m = await message.channel.send('Pinging the Client...');
    return m.edit(`Pong! Latency: **${m.createdTimestamp - message.createdTimestamp}ms** \nAPI Latency: **${Math.round(client.ws.ping)}ms**`);
};

module.exports.conf = {
    enabled: true,
    aliases: ['p'],
    permLevel: 'User',
    cooldown: 10
};

module.exports.help = {
    name: 'ping',
    category: 'system',
    description: 'Pings the client',
    usage: 'ping'
};
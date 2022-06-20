module.exports = (client) => {
    client.warn = (channel, wrn, msg) => {
        channel.send(`${client.emoji.warning} **${wrn}**\n${msg}`, { split: true });
    };
};
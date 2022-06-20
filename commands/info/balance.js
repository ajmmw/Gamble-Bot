exports.run = (client, message, args) => {
    switch (args[0]) {
        case 'reset':
            if (message.author.id !== message.guild.ownerId) return client.error(message.channel, 'ERROR', `<@${message.author.id}> only the guild owner can reset everyone.`);
            sql.prepare("DELETE FROM balance WHERE guild = ?;").run(message.guild.id);
            return client.success(message.channel, 'SUCCESS', `<@${message.author.id}> I've successfully reset everyones Wallet Balance.`);
            // Display Your Balance
        default:
            if (args.length === 0) {
                bal = client.getBal.get(message.author.id, message.guild.id);
                if (!bal) {
                    bal = {
                        id: `${message.guild.id}-${message.author.id}`,
                        user: message.author.id,
                        guild: message.guild.id,
                        balance: 0
                    }
                    client.setBal.run(bal);
                }
                return message.channel.send(`**${message.author.username}'s Balance**\nWallet: \`$${bal.balance}\``);
            }

            // See Tagged Users Bells
            member = message.mentions.members.first();
            if (member) {
                User = client.getBal.get(message.mentions.members.first().id, message.guild.id);
                if (!User) { return client.error(message.channel, 'ERROR', `<@${message.mentions.members.first().id}> has yet to be active in the server.`); }
                return message.channel.send(`**${member.username}'s Balance**\nWallet: \`${User.points}\``);
            }
            return client.error(message.channel, 'ERROR', `Could not find a member by that name!`);
    }
};

module.exports.conf = {
    enabled: true,
    aliases: ['bal'],
    permLevel: 'User',
    cooldown: 10
};

module.exports.help = {
    name: 'balance',
    category: 'misc',
    description: 'Shows your current Wallet Balance on the current server',
    usage: 'balance <@user>',
    details: "<@user> => Only necessary if you're getting the balance of another member."
};
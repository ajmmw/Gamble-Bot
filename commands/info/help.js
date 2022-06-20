exports.run = (client, message, [command], level) => {
    if (!command) {
        let commands = client.commands.filter((cmd) => client.levelCache[cmd.conf.permLevel] <= level);

        const commandNames = commands.keyArray();
        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

        let currentCategory = '';
        let output = `= Command List =\n\n[Use ${client.config.prefix}help <command name> for details]\n`;

        const sorted = commands.array().sort((p, c) => (p.help.category > c.help.category ? 1 :
            p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1));
        sorted.forEach((c) => {
            const cat = c.help.category.toProperCase();
            if (currentCategory !== cat) {
                output += `\u200b\n== ${cat} ==\n`;
                currentCategory = cat;
            }
            output += ` ${client.config.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
        });
        return message.channel.send('```asciidoc\n' + output + '```');
    } else if (client.commands.has(command) || client.aliases.has(command)) {
        const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

        let output = `= ${cmd.help.name.toProperCase()} = \n${cmd.help.description}\n\nUsage :: ${client.config.prefix}${cmd.help.usage}`;

        if (cmd.conf.aliases) {
            output += `\nAliases :: ${cmd.conf.aliases.join(', ')}`;
        }

        if (cmd.help.details) {
            output += `\nDetails :: ${cmd.help.details}`;
        }

        return message.channel.send('```asciidoc\n' + output + '```');
    } else {
        return client.error(message.channel, 'INVALID COMMAND', `All valid commands can be found by using \`${client.config.prefix}help\`!`);
    }
};

module.exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: 'User',
    cooldown: 10
};

module.exports.help = {
    name: 'help',
    category: 'info',
    description: 'Displays all commands available to you',
    usage: 'help <command>'
};
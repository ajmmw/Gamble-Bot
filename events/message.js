const Discord = require('discord.js');
const cooldowns = new Discord.Collection();

module.exports = async(client, message) => {
    if (!message.guild || message.author.bot) return;
    if (!message.channel.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])) return;

    // Bot is Mentioned
    if (message.mentions.has(client.user)) {
        if (message.mentions.everyone) return;
        return message.reply(`Hey there! My prefix is \`${client.config.prefix}\`. Use the \`${client.config.prefix}help\` command to find out more about me!`);
    }

    // Start Command Lookup
    const level = client.permLevel(message);
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (!cmd) return;

    // Check If Commands Disabled
    if (cmd.conf.enabled === false) {
        if (level[1] < 10) {
            return client.warn(
                message.channel, 'COMMAND DISABLED', `This command is currently disabled. Please visit the Support Server for more information by typing \`;info\``);
        }
    }

    // Check Perm Level
    if (level[1] < client.levelCache[cmd.conf.permLevel]) {
        return client.error(
            message.channel, 'INVALID PERMISSIONS', `You do not currently have the proper permssions to run this command!\n**Current Level:** \`${level[0]}: Level ${level[1]}\`\n**Level Required:** \`${cmd.conf.permLevel}: Level ${client.levelCache[cmd.conf.permLevel]}\``);
    }

    if (!cooldowns.has(cmd.help.name)) {
        cooldowns.set(cmd.help.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(cmd.help.name);
    const cooldownAmount = (cmd.conf.cooldown || 0) * 1000;

    if (timestamps.has(message.author.id)) {
        if (level[1] < 2) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                let timeLeft = (expirationTime - now) / 1000;
                let time = 'second(s)';
                if (cmd.conf.cooldown > 60) {
                    timeLeft = (expirationTime - now) / 60000;
                    time = 'minute(s)';
                }
                const warns = [`Woah There Bucko!`, `I'm Not Ready For This Speed!`, `Too Fast!`, `Ok Sonic`, 'VROOOM!', ];
                const index = Math.floor(Math.random() * warns.length);
                return client.warn(
                    message.channel, warns[index], `Please wait **${timeLeft.toFixed(2)} more ${time}** before reusing the \`${cmd.help.name}\` command!`);
            }
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    // if (message.channel.permissionsFor(message.guild.me).has(['MANAGE_MESSAGES'])) message.delete();
    cmd.run(client, message, args, level[1], Discord);
};
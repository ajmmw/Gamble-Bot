const fs = require('fs');
const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let rawdata = fs.readFileSync('package.json');
    let obj = JSON.parse(rawdata);

    function uptime(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString();
        const min = Math.floor((ms / (1000 * 60)) % 60).toString();
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 24).toString();
        const days = Math.floor(ms / (1000 * 60 * 60 * 24)).toString();
        return `${days.padStart(1, '0')}Days ${hrs.padStart(2, '0')}:${min.padStart(2, '0')}:${sec.padStart(2, '0')}`;
    }

    const embed = new Discord.MessageEmbed()
        .setAuthor({ name: client.user.username })
        .setThumbnail(client.user.displayAvatarURL())
        .addField(`Versions`, `\`\`\`js\nBot: ${obj.version}\nDiscord.js: ${obj.dependencies['discord.js']}\nNode.js: ${process.versions.node}\`\`\``)
        .addField(`Uptime`, `${uptime(client.uptime)}`)
        .addField(`Links`, `[Invite](https://discord.com/api/oauth2/authorize?client_id=956881685969006593&permissions=137439341632&scope=bot) | [Support Server](https://discord.gg/UyQR5m6ACR) | [Fund](https://github.com/sponsors/pnkllr)`)
        .setFooter({ text: `${client.config.prefix}invite to add Blathers to your server`, iconURL: client.user.displayAvatarURL() })
        .setColor(0xff0092);
    return message.channel.send({ embeds: [embed] });

};

module.exports.conf = {
    enabled: true,
    aliases: ['ver'],
    permLevel: 'User',
    cooldown: 10
};

module.exports.help = {
    name: 'info',
    category: 'system',
    description: 'Shows information about the bot.',
    usage: 'info'
};
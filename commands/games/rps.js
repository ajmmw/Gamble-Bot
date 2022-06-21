exports.run = (client, message, args) => {
        switch (args[0]) {
            case 'rock':
            case 'paper':
            case 'scissors':
            case 'lizard':
            case 'spock':
                let bal;
                bal = client.getBal.get(message.author.id, message.guild.id);
                if (!bal) {
                    bal = {
                        id: `${message.guild.id}-${message.author.id}`,
                        user: message.author.id,
                        guild: message.guild.id,
                        name: message.author.username,
                        balance: 0
                    };
                }

                const acceptedReplies = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
                const random = Math.floor((Math.random() * acceptedReplies.length));
                const botReply = acceptedReplies[random];

                const userReply = args[0];

                if (botReply === userReply) return message.channel.send(`➖ **TIE**\nWe both threw \`${client.emoji[`${botReply}`]}\` and tied!`);

            if (userReply === 'rock') {
                if (botReply === 'paper') {
                    client.error(message.channel, 'YOU LOST', `\`${client.emoji.paper} covers ${client.emoji.rock}\n-10 $$$\``);
                    if (bal.balance < 10) { bal.balance = 0; } else { bal.balance -= 10; }
                } else if (botReply === 'spock') {
                    client.error(message.channel, 'YOU LOST', `\`${client.emoji.spock} vaporises ${client.emoji.rock}\n-10 $$$\``);
                    if (bal.balance < 10) { bal.balance = 0; } else { bal.balance -= 10; }
                } else if (botReply === 'scissors') {
                    client.success(message.channel, 'YOU WON', `\`${client.emoji.rock} crushes ${client.emoji.scissors}\n+10 $$$\``);
                    bal.balance += 10;
                } else {
                    client.success(message.channel, 'YOU WON', `\`${client.emoji.rock} crushes ${client.emoji.lizard}\n+10 $$$\``);
                    bal.balance += 10;
                }
            } else if (userReply === 'paper') {
                if (botReply === 'scissors') {
                    client.error(message.channel, 'YOU LOST', `\`${client.emoji.scissors} cuts ${client.emoji.paper}\n-10 $$$\``);
                    if (bal.balance < 10) { bal.balance = 0; } else { bal.balance -= 10; }
                } else if (botReply === 'lizard') {
                    client.error(message.channel, 'YOU LOST', `\`${client.emoji.lizard} eats ${client.emoji.paper}\n-10 $$$\``);
                    if (bal.balance < 10) { bal.balance = 0; } else { bal.balance -= 10; }
                } else if (botReply === 'rock') {
                    client.success(message.channel, 'YOU WON', `\`${client.emoji.paper} covers ${client.emoji.rock}\n+10 $$$\``);
                    bal.balance += 10;
                } else {
                    client.success(message.channel, 'YOU WON', `\`${client.emoji.paper} disproves ${client.emoji.spock}\n+10 $$$\``);
                    bal.balance += 10;
                }
            } else if (userReply === 'scissors') {
                if (botReply === 'rock') {
                    client.error(message.channel, 'YOU LOST', `\`${client.emoji.rock} crushes ${client.emoji.scissors}\n-10 $$$\``);
                    if (bal.balance < 10) { bal.balance = 0; } else { bal.balance -= 10; }
                } else if (botReply === 'spock') {
                    client.error(message.channel, 'YOU LOST', `\`${client.emoji.spock} smashes ${client.emoji.scissors}\n-10 $$$\``);
                    if (bal.balance < 10) { bal.balance = 0; } else { bal.balance -= 10; }
                } else if (botReply === 'paper') {
                    client.success(message.channel, 'YOU WON', `\`${client.emoji.scissors} cuts ${client.emoji.paper}\n+10 $$$\``);
                    bal.balance += 10;
                } else {
                    client.success(message.channel, 'YOU WON', `\`${client.emoji.scissors} decapitate ${client.emoji.lizard}\n+10 $$$\``);
                    bal.balance += 10;
                }
            } else if (userReply === 'lizard') {
                if (botReply === 'rock') {
                    client.error(message.channel, 'YOU LOST', `\`${client.emoji.rock} crushes ${client.emoji.lizard}\n-10 $$$\``);
                    if (bal.balance < 10) { bal.balance = 0; } else { bal.balance -= 10; }
                } else if (botReply === 'scissors') {
                    client.error(message.channel, 'YOU LOST', `\`${client.emoji.scissors} decapitates ${client.emoji.lizard}\n-10 $$$\``);
                    if (bal.balance < 10) { bal.balance = 0; } else { bal.balance -= 10; }
                } else if (botReply === 'paper') {
                    client.success(message.channel, 'YOU WON', `\`${client.emoji.lizard} eats ${client.emoji.paper}\n+10 $$$\``);
                    bal.balance += 10;
                } else {
                    client.success(message.channel, 'YOU WON', `\`${client.emoji.lizard} poisons ${client.emoji.spock}\n+10 $$$\``);
                    bal.balance += 10;
                }
            } else if (userReply === 'spock') {
                if (botReply === 'paper') {
                    client.error(message.channel, 'YOU LOST', `\`${client.emoji.paper} disproves ${client.emoji.spock}\n-10 $$$\``);
                    if (bal.balance < 10) { bal.balance = 0; }
                } else if (botReply === 'lizard') {
                    client.error(message.channel, 'YOU LOST', `\`${client.emoji.lizard} poisons ${client.emoji.spock}\n-10 $$$\``);
                    if (bal.balance < 10) { bal.balance = 0; }
                } else if (botReply === 'rock') {
                    client.success(message.channel, 'YOU WON', `\`${client.emoji.spock} vaporises ${client.emoji.rock}\n+10 $$$\``);
                    bal.balance += 10;
                } else {
                    client.success(message.channel, 'YOU WON', `\`${client.emoji.spock} smashes ${client.emoji.scissors}\n+10 $$$\``);
                    bal.balance += 10;
                }
            }
            return client.setBal.run(bal);

        default:
            return client.error(message.channel, 'ERROR', `<@${message.author.id}> please pick either \`rock | paper | scissors | lizard | spock\``);
    }
};

module.exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: 'User',
    cooldown: 10
};

module.exports.help = {
    name: 'rps',
    category: 'fun',
    description: 'Plays rock paper scissors',
    usage: 'rps <rock|paper|scissors|lizard|spock>',
    details: '<rock|paper|scissors|lizard|spock> => Rock beats Scissors, Scissors beats Paper, Paper beats Rock. Etc...'
};
module.exports = (client) => {
    //React Prompt
    client.reactPrompt = async(message, question, opt) => {
        if (!opt) {
            const confirm = await message.channel.send(question);
            await confirm.react(client.emoji.checkMark);
            await confirm.react(client.emoji.redX);

            const filter = (reaction, user) => [client.emoji.checkMark, client.emoji.redX].includes(reaction.emoji.name) &&
                user.id === message.author.id;

            let decision = false;
            await confirm.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
                .then((collected) => {
                    const reaction = collected.first();

                    if (reaction.emoji.name === client.emoji.checkMark) {
                        decision = true;
                    }
                })
                .catch(() => {
                    console.log('React Prompt timed out.');
                });
            await confirm.delete();
            return decision;
        }
        let counter = 0x1F1E6;
        let body = question;
        opt.slice(0, 20).forEach((option) => {
            body += `\n${String.fromCodePoint(counter)} : \`${option}\``;
            counter += 1;
        });
        const confirm = await message.channel.send(body);
        counter = 0x1F1E6;
        const emojiList = [];
        await client.asyncForEach(opt.slice(0, 20), async() => {
            emojiList.push(String.fromCodePoint(counter));
            await confirm.react(String.fromCodePoint(counter));
            counter += 1;
        });
        const filter = (reaction, user) => emojiList.includes(reaction.emoji.name) &&
            user.id === message.author.id;

        let decision = '';
        await confirm.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
            .then((collected) => {
                const reaction = collected.first();

                decision = opt[reaction.emoji.toString().codePointAt(0) - 0x1F1E6];
            })
            .catch(() => {
                console.log('React Prompt timed out.');
            });
        await confirm.delete();
        return decision;
    };

    // Status Messages
    client.success = (channel, suc, msg) => {
        channel.send(`${client.emoji.success} **${suc}**\n${msg}`);
    };

    client.error = (channel, err, msg) => {
        channel.send(`${client.emoji.error} **${err}**\n${msg}`);
    };

    client.warn = (channel, warn, msg) => {
        channel.send(`${client.emoji.warning} **${warn}**\n${msg}`);
    };

    // Perm Levels
    client.permLevel = (message) => {
        let permName = 'User';
        let permlvl = 0;
        const permOrder = client.config.permLevels.slice(0)
            .sort((p, c) => (p.level < c.level ? 1 : -1));

        while (permOrder.length) {
            const currentlvl = permOrder.shift();

            if (currentlvl.check(client, message)) {
                permName = currentlvl.name;
                permlvl = currentlvl.level;
                break;
            }
        }
        return [permName, permlvl];
    };

    // Random Color
    client.getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '0x';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    Object.defineProperty(String.prototype, 'toProperCase', {
        value() {
            return this.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        },
    });
};
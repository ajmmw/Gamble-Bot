const config = {
    prefix: '.',

    // API Lists
    giphyAPI: "ZD6DSPZaxZ4lmEJIOBrtChEs22QSJDzi",

    // Bot Perms and Stuff
    ownerID: '147866541088571393',
    adminRole: '902559028616519691',
    supporterRole: '976099528342110228',

    permLevels: [{
            level: 0,
            name: 'User',
            check: () => true,
        },
        {
            level: 2,
            name: 'Supporter',
            check: (client, message) => {
                if (message.guild) {
                    const supporterRoleObj = message.guild.roles.cache.get(config.supporterRole);
                    if (supporterRoleObj && message.member.roles.cache.has(supporterRoleObj.id)) { return true; }
                }
                return false;
            },
        },
        {
            level: 4,
            name: 'Mod',
            check: (client, message) => {
                if (message.guild) {
                    const modRoleObj = message.guild.roles.cache.get(config.modRole);
                    if (modRoleObj && message.member.roles.cache.has(modRoleObj.id)) { return true; }
                }
                return false;
            },
        },
        {
            level: 5,
            name: 'Admin',
            check: (client, message) => {
                if (message.guild) {
                    const adminRoleObj = message.guild.roles.cache.get(config.adminRole);
                    if ((adminRoleObj && message.member.roles.cache.has(adminRoleObj.id)) || message.member.permissions.has('ADMINISTRATOR')) { return true; }
                }
                return false;
            },
        },
        {
            level: 10,
            name: 'Bot Owner',
            check: (client, message) => config.ownerID === message.author.id,
        }
    ]
};

module.exports = config;
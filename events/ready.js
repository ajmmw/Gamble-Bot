global.SQLite = require("better-sqlite3");
global.sql = new SQLite("./balance.sqlite");

module.exports = (client) => {
    console.log("Casinos Open");

    // Create Table if doesnt exist
    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'balance';").get();
    if (!table['count(*)']) {
        sql.prepare("CREATE TABLE balance (id TEXT PRIMARY KEY, user TEXT, guild TEXT, balance INTEGER);").run();
        sql.prepare("CREATE UNIQUE INDEX idx_balance_id ON balance (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }

    // Prepair SQL queries
    client.getBal = sql.prepare("SELECT * FROM balance WHERE user = ? AND guild = ?");
    client.setBal = sql.prepare("INSERT OR REPLACE INTO balance (id, user, guild, balance) VALUES (@id, @user, @guild, @balance);");

    // Status Update
    setInterval(() => {
        activitiesList = [];
        index = Math.floor(Math.random() * activitiesList.length);
        client.user.setActivity(activitiesList[index]);
    }, 30000);
}
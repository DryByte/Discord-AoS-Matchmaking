const { DISCORD_TOKEN } = require("../config.json");

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
    intents: [GatewayIntentBits.Guilds,
              GatewayIntentBits.GuildMessages,
              GatewayIntentBits.MessageContent],
    presence: {
        status: "idle",
        activities: [{name: "Ace of Spades"}]
    }
});

const dbClass = require("./managers/DatabaseManager.js");
const db = new dbClass();

client.once("ready", () => {
    console.log("[DISCORD] Bot online!");
    const PlayersTable = require("./db/tables/Players.js");
    let pt = new PlayersTable(db);
    pt.initTable();
    pt.newRow({
        name: "cRaudio666",
        discord_id: 69,
        kills: 8,
        deaths: 4
    });
    pt.newRow({
        name: "fds",
    });
    pt.newRow({});
    pt.newRow({
        kills: 0,
    });
    pt.newRow({
        name: "zé ramalho",
        discord_id: 24
    });

});

client.login(DISCORD_TOKEN);
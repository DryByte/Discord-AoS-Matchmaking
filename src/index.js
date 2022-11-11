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

//const dbClass = require("./managers/DatabaseManager.js");
//const db = new dbClass();

const GMC = require("./managers/GameManager.js");
const GM = new GMC();

client.once("ready", () => {
    console.log("[DISCORD] Bot online!");
    GM.newServer();
});

client.login(DISCORD_TOKEN);
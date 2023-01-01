const { DISCORD_TOKEN, CMD_PREFIX } = require("../config.json");
const { GatewayIntentBits } = require("discord.js");
const Bot = require("./bot.js");

const client = new Bot({
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

client.once("ready", () => {
    console.log("[DISCORD] Bot online!");
});

client.on("messageCreate", msg => {
    if (msg.content.toLowerCase().startsWith(CMD_PREFIX.toLowerCase()))
        client.CommandManager.onCommand(msg);
});

client.login(DISCORD_TOKEN);
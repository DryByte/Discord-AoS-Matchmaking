const { Client } = require("discord.js");
const GameManager = require("./managers/GameManager.js");
const CommandManager = require("./managers/CommandManager.js");
const QueueManager = require("./managers/QueueManager.js");

class Bot extends Client {
    constructor(options) {
        super(options);

        this.GameManager = new GameManager();
        this.CommandManager = new CommandManager(this);
        this.QueueManager = new QueueManager(this);
    }

    async readyToStart(queue) {
        let msg = `Match **${queue.name}** is ready to start, players:\n`;

        for (let playerId of queue.players) {
            let user = await this.users.fetch(playerId);
            msg+=`- ${user.username}\n`;
        }

        msg += "\nWaiting for an available server...";
        for (let channelId of queue.channels) {
            let channel = await this.channels.fetch(channelId);
            channel.send(msg);
        }

        let server = await this.GameManager.searchFreeServer();
        this.GameManager.newServer(queue.name, queue.players, server);

        await server.waitReadyJoin()

        for (let channelId of queue.channels) {
            let channel = await this.channels.fetch(channelId);
            channel.send("Server found! Check your DM!");
        }

        for (let playerId of queue.players) {
            let user = await this.users.fetch(playerId);
            let dm = await user.createDM();

            let aostvId = server.proxy.AoSTV.client.localPlayerId;
            let password = server.serverConfig.passwords[playerId][0];
            dm.send(`Server ip: **127.0.0.1:${server.port}**\nWhen you join type: **/pm #${aostvId} ${password}**`);
        }
    }
}

module.exports = Bot;
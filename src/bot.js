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
}

module.exports = Bot;
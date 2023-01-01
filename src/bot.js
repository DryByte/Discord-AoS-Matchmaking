const { Client } = require("discord.js");
const GameManager = require("./managers/GameManager.js");
const CommandManager = require("./managers/CommandManager.js");

class Bot extends Client {
	constructor(options) {
		super(options);

		this.GameManager = new GameManager();
		this.CommandManager = new CommandManager(this);
	}
}

module.exports = Bot;
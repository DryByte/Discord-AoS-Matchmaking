class ScriptBase {
	constructor(client) {
		this.client = client;
	}

	onPlayerJoin() {}
	onPlayerLeft() {}
	onKill() {}
	onReadyToStart() {}
}

module.exports = ScriptBase;
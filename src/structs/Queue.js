class Queue {
	constructor(name, max_players) {
		this.name = name;
		this.players = [];
		this.max_players = max_players;
	}

	addPlayer(playerId) {
		if (this.players.length >= this.max_players)
			return false;

		this.players.push(playerId);
	}

	removePlayer(playerId) {
		let index = this.players.indexOf(playerId);
		this.players.splice(index, 1);
	}
}

module.exports = Queue;
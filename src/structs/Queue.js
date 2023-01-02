class Queue {
	constructor(name, max_players) {
		this.name = name;
		this.players = [];
		this.max_players = max_players;
	}

	addPlayer(player) {
		if (this.players.length >= this.max_players)
			return false;

		this.players.push(player);
	}

	removePlayer(player) {
		let index = this.players.indexOf(player);
		this.players.splice(index, 1);
	}
}

module.exports = Queue;
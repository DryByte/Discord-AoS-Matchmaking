class Queue {
	constructor(name, max_players) {
		this.name = name;
		this.players = [];
		this.channels = []; // maybe we need to find a better way
		this.max_players = max_players;
	}

	addChannel(channelId) {
		if (this.channels.includes(channelId))
			return true;

		this.channels.push(channelId);
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

	isFull() {
		return this.players.length>=this.max_players;
	}
}

module.exports = Queue;
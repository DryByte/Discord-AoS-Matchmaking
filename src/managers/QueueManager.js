const { SERVER_TYPES } = require("../../config.json");
const Queue = require("../structs/Queue.js");

class QueueManager {
	constructor(client) {
		this.client = client;

		this.queues = {};
		this.initQueues();
	}

	addPlayer(queue, playerId, channelId) {
		if (!(queue in this.queues))
			return false;

		this.queues[queue].addChannel(channelId);
		this.queues[queue].addPlayer(playerId);

		if (this.queues[queue].isFull()) {
			this.client.readyToStart(this.queues[queue]);
		}
	}

	removePlayer(queue, playerId) {
		if (!(queue in this.queues))
			return false;

		this.queues[queue].removePlayer(playerId);
	}

	getAvailableQueues() {
		let queues = {};
		for (let queue in this.queues) {
			let queueClass = this.queues[queue];

			if (queueClass.players.length<queueClass.max_players) {
				queues[queue] = queueClass;
			}
		}

		return queues;
	}

	createQueue(name) {
		if (!SERVER_TYPES[name])
			return null;

		if (name in this.queues)
			return null;

		let queue = new Queue(name, SERVER_TYPES[name].max_players);
		this.queues[name] = queue;

		return queue;
	}

	initQueues() {
		for (let server in SERVER_TYPES) {
			this.createQueue(server);
		}
	}
}

module.exports = QueueManager;
class Command {
    constructor(client) {
        this.client = client;

        this.name = "join";
        this.description = "Join in a queue for match.";
    }

    exec(args) {
        if (!args[0]) {
            let queues = this.client.QueueManager.getAvailableQueues();
            let msg = "**Available queues:**\n";

            let msgArray = [];
            for (let queue in queues) {
                queue = queues[queue];
                msgArray.push(`${queue.name} (${queue.players.length}/${queue.max_players})`);
            }

            return msg+msgArray.join(", ");
        }
    }
}

module.exports = Command;
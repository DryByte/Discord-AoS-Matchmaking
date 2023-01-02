class Command {
    constructor(client) {
        this.client = client;

        this.name = "leave";
        this.description = "Leave from the current queue.";
    }

    exec(msgClass, args) {
        let queues = this.client.QueueManager.getAvailableQueues();

        let queueClass = null;
        for (let queue in queues) {
            queue = queues[queue];
            if (queue.players.includes(msgClass.author.id)) {
                queue.removePlayer(msgClass.author.id);
                queueClass = queue;

                break;
            }
        }

        if (!queueClass)
            return "You did not joined to any queue. Join with !join";

        return `You got removed from **${queueClass.name}** (${queueClass.players.length}/${queueClass.max_players})`
    }
}

module.exports = Command;
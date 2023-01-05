class Command {
    constructor(client) {
        this.client = client;

        this.name = "join";
        this.description = "Join in a queue for match.";
    }

    exec(msgClass, args) {
        let queues = this.client.QueueManager.getAvailableQueues();

        if (!args[0] || !(args[0] in queues)) {
            let msg = "**Available queues:**\n";

            let msgArray = [];
            for (let queue in queues) {
                queue = queues[queue];
                msgArray.push(`${queue.name} (${queue.players.length}/${queue.max_players})`);
            }

            return msg+msgArray.join(", ");
        }

        let alreadyInQueue = false;
        for (let queue in queues) {
            queue = queues[queue];
            if (queue.players.includes(msgClass.author.id)) {
                alreadyInQueue = true;
                break;
            }
        }

        if (alreadyInQueue)
            return "You are already in a Queue, use !leave";

        this.client.QueueManager.addPlayer(args[0], msgClass.author.id, msgClass.channel.id);

        return `Joined to queue **${args[0]}** (${queues[args[0]].players.length}/${queues[args[0]].max_players})`;
    }
}

module.exports = Command;
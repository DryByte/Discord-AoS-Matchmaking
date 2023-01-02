class Command {
    constructor(client) {
        this.client = client;

        this.name = "help";
        this.description = "Show all commands.";
    }

    exec(msgClass, args) {
        let cmdList = this.client.CommandManager.commands;
        let msg = "";

        for (let cmd in cmdList) {
            let desc = cmdList[cmd].description;
            msg += `${cmd} - ${desc}`;
        }

        return msg;
    }
}

module.exports = Command;
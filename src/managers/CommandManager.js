const { CMD_PREFIX } = require("../../config.json");
const { EmbedBuilder } = require("discord.js");
const fs = require("fs");

class CommandManager {
    constructor(client) {
        this.client = client;
        this.commands = {};

        this.loadCommands();
    }

    loadCommands() {
        fs.readdir("./src/commands", (err, files) => {
            if (err) {
                console.log("ERROR LOADING COMMANDS: ",err);
                return;
            }

            for (let cmdFile of files) {
                let cmd = require(`../commands/${cmdFile}`);
                let CmdClass = new cmd(this.client);

                this.commands[CmdClass.name] = CmdClass;
            }
        });
    }

    sendMsg(msgC, msg) {
        if (typeof msg == "string") {
            msgC.reply(msg);
        } else if (msg instanceof EmbedBuilder) {
            msgC.reply({embeds: [msg]});
        }
    }

    onCommand(msgC) {
        let msg = msgC.content.toLowerCase();
        let args = msg.split(" ");
        let cmdName = args.shift().replace(CMD_PREFIX, "");

        if (!this.commands[cmdName])
            return;

        let res = this.commands[cmdName].exec(msgC, args);

        if (!res)
            return;

        if (typeof res.then == "function") {
            msgC.channel.send("_Loading infos..._").then(loadingMsg => {
                res.then(msg => {
                    loadingMsg.delete();
                    this.sendMsg(msgC, msg);
                });
            }).catch(e => {
                console.log("Error sending loading message:",e);
            });
        } else {
            this.sendMsg(msgC, res);
        }
    }
}

module.exports = CommandManager;
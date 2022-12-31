const ScriptBase = require("./ScriptBase.js");

class CTF extends ScriptBase {
    constructor(client) {
        super(client);
    }

    // Events
    onPlayerJoin(fields) {
        this.onReadyToStart();
    }

    onServerFull() {}

    onReadyToStart() {
        this.client.sendMessage("/resetgame", 0);
        this.client.sendMessage("-- Match started! Good luck!", 0);
    }

    onCapture() {}
}

module.exports = CTF;
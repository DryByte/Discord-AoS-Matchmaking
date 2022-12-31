const ScriptBase = require("./ScriptBase.js");

class CTF extends ScriptBase {
    constructor(client) {
        super(client);
    }

    // Events
    onPlayerJoin(fields) {
        //this.onReadyToStart();
    }

    onStart() {
        this.client.sendMessage("/resetgame", 0);
        this.client.sendMessage("-- Match started! Good luck!", 0);
    }
}

module.exports = CTF;
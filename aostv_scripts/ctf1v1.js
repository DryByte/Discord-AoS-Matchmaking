const ScriptBase = require("./ScriptBase.js");

class CTF extends ScriptBase {
    constructor(client) {
        super(client);
    }

    // Events
    onPlayerJoin(fields) {
        //this.onReadyToStart();
    }

    onStart() {}
}

module.exports = CTF;
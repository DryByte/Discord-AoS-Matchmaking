class ScriptBase {
    constructor(client) {
        this.client = client;
    }

    onPlayerJoin() {}
    onPlayerLeft() {}
    onStart() {}

    onCapture() {}
    onKill() {}
}

module.exports = ScriptBase;
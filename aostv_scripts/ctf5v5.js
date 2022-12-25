class CTF {
    constructor(client) {
        this.client = client;
    }

    // Events
    onPlayerJoin(fields) {
        this.onReadyToStart();
    }

    onPlayerLeave() {}

    onServerFull() {}

    onReadyToStart() {
        this.client.sendMessage("/resetgame", 0);
        this.client.sendMessage("-- Match started! Good luck!", 0);
    }

    onCapture() {}
}

module.exports = CTF;
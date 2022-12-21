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
        console.log("hey")
        console.log(this.client.sendMessage)
        this.client.sendMessage("/reset", 0);
        this.client.sendMessage("/say Match started! Good luck!", 0);
    }

    onCapture() {}
}

module.exports = CTF;
const AoS = require("aos.js");

class AoSTV {
    constructor(proxy) {
        this.client = new AoS.Client({name: "AoSTV"});
        this.proxy = proxy;
        this.gameMode;
    }

    stateDataHandler(data) {
        let password = this.proxy.server.passwords.admin[0];

        this.client.joinGame({team: -1});
        this.client.sendMessage(`/login ${password}`, 1);
    }

    connect(ip, port) {
        this.client.on("StateData", this.stateDataHandler.bind(this));
        this.client.on("rawPacket", this.proxy.packetHandler.bind(this.proxy));

        this.client.on("PlayerJoin", this.gameMode.onPlayerJoin.bind(this.gameMode));
        this.client.on("PlayerLeft", this.gameMode.onPlayerLeft.bind(this.gameMode));
        this.client.on("KillAction", this.gameMode.onKill.bind(this.gameMode));

        this.client.connect(`${ip}:${port}`);
    }
}

module.exports = AoSTV;
const AoS = require("aos.js");

class AoSTV {
    constructor(proxy) {
        this.client = new AoS.Client({name: "AoSTV"});
        this.proxy = proxy;
    }

    stateDataHandler(data) {
        this.client.joinGame({team: -1});
    }

    connect(ip, port) {
        this.client.on("StateData", this.stateDataHandler.bind(this));
        this.client.on("rawPacket", this.proxy.packetHandler.bind(this.proxy));
        this.client.connect(`${ip}:${port}`);
    }
}

module.exports = AoSTV;
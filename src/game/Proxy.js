const ProxyBase = require("./ProxyBase.js");
const Master = require("./Master.js");
const AoSTV = require("./AoSTV.js");

class Proxy extends ProxyBase {
    constructor(port) {
        super();
        this.port = port;

        this.infos = {
            name: "PROXY INSTANCE",
            map: "PROXY",
            game: "PROXY"
        };

        this.master = new Master(this);
        this.AoSTV = new AoSTV(this);

        this.master.connectMaster();
        this.createProxy();
    }

    setName(name) {
        this.infos.name = name;
    }

    setMap(mapName) {
        this.infos.map = mapName;
    }

    setGame(game) {
        this.infos.game = game;
    }
}

module.exports = Proxy;
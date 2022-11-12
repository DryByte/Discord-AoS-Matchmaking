const Master = require("./Master.js");

class Proxy extends Master {
    constructor(port) {
        super();
        this.port = port;

        this.infos = {
            name: "PROXY INSTANCE",
            map: "PROXY",
            game: "PROXY"
        };

        this.connectMaster();
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
const servers = require("../../servers.json");
const Server = require("../game/Server.js");
const MAX_FIND_PORT_ATTEMPTS = 35;

class GameManager {
    constructor(){
        this.instances = {};

        for (let serverInfo of servers) {
            this.instances[serverInfo.identifier] = new Server(serverInfo.identifier,
                                                               serverInfo.port_range,
                                                               serverInfo.proxy_port);
            this.instances[serverInfo.identifier].startProxy();
        }
    }

    findFreePort(port_range) {
        let usedPorts = [];

        for (let server in this.instances) {
            usedPorts.push(server.port);
        }

        let freePort = 0;
        let attempt = 0;

        while (!freePort && attempt<MAX_FIND_PORT_ATTEMPTS) {
            attempt+=1;
            let randomPort = Math.floor(Math.random()*
                             (port_range[1]-port_range[0])+port_range[0]);

            if (usedPorts.includes(randomPort))
                continue;

            freePort = randomPort;
        }

        if (!freePort)
            return false;

        return freePort;
    }

    findFreeServer() {
        let freeServer;
        for (let server in this.instances) {
            if (!this.instances[server].running) {
                freeServer = this.instances[server];
                break;
            }
        }

        if (!freeServer)
            return false;

        return freeServer;
    }

    newServer() {
        let server = this.findFreeServer();
        if (!server)
            return false

        let port = this.findFreePort(server.port_range);
        if (!port)
            return false;

        let GamemodeScript = require(`../../aostv_scripts/ctf1v1.js`);
        console.log(port);
        server.port = port;
        server.startServer("ctf1v1");
        server.proxy.AoSTV.gameMode = new GamemodeScript(server.proxy.AoSTV.client);
        server.proxy.AoSTV.connect("127.0.0.1", port);
    }
}

module.exports = GameManager;
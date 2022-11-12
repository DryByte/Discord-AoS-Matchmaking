const Proxy = require("./Proxy.js");
const { spawn } = require("child_process");
const { accessSync, mkdirSync, constants } = require("fs");

class Server {
    constructor(name, port_range, proxy_port) {
        this.identifier = name;
        this.proxy_port = proxy_port;
        this.port_range = port_range;
        this.running = false;

        // this info is useless since every time a game ends/starts
        // port will change
        this.port = 0;

        this.server;
        this.proxy;
    }

    startProxy() {
        //this.proxy = new Proxy(this.proxy_port);
    }

    createServerFolder() {
        try {
            accessSync(`./servers/${this.identifier}`, constants.R_OK | constants.W_OK);
            return true;

        } catch(e) {
            if (e.code == "ENOENT"){
                let serverPath = `${__dirname}/../../servers/${this.identifier}`;

                mkdirSync(`./servers/${this.identifier}`);
                spawn(`piqueserver`, ["--copy-config", "-d",serverPath]);
                return true;
            }

            return false;
        }
    }

    startServer() {
        let stats = this.createServerFolder();
        if (!stats) {
            console.log(`Can't start server ${this.identifier}.`);
            return false;
        }
    }
}

module.exports = Server;
const Proxy = require("./Proxy.js");
const { spawn } = require("child_process");
const { access, accessSync, mkdirSync, constants, copyFileSync } = require("fs");
const { SERVER_TYPES } = require("../../config.json");

class Server {
    constructor(name, port_range, proxy_port) {
        this.identifier = name;
        this.proxy_port = proxy_port;
        this.port_range = port_range;
        this.running = false;
        this.passwords = {};

        // this info is useless since every time a game ends/starts
        // port will change
        this.port = 0;

        this.serverProcess;
        this.proxy;
    }

    startProxy() {
        this.proxy = new Proxy(this);
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

    configServer(gameMode, scripts, maps) {
        for (let script of scripts) {
            if (script.startsWith("piqueserver."))
                continue;

            let srcPath = `./server_scripts/scripts/${script}.py`;
            let dstPath = `./servers/${this.identifier}/scripts/${script}.py`;
            copyFileSync(srcPath, dstPath);
        }

        for (let map of maps) {
            let srcPathVXL = `./server_maps/${map}.vxl`,
                srcPathTXT = `./server_maps/${map}.txt`;
            let dstPathVXL = `./servers/${this.identifier}/maps/${map}.vxl`,
                dstPathTXT = `./servers/${this.identifier}/maps/${map}.txt`;

            access(srcPathTXT, constants.R_OK | constants.W_OK, (err) => {
                if (err) {
                    return;
                }

                copyFileSync(srcPathTXT, dstPathTXT);
            });

            copyFileSync(srcPathVXL, dstPathVXL);
        }

        if (gameMode != "ctf" && gameMode != "tc" && !gameMode.startsWith("piqueserver.")) {
            let srcPath = `./server_scripts/game_modes/${gameMode}.py`;
            let dstPath = `./servers/${this.identifier}/game_modes/${gameMode}.py`;

            copyFileSync(srcPath, dstPath);
        }
    }

    generatePasswords(players) {
        let passwords = {
            admin: []
        };

        // later get all players that will play and gen a password
        // for each player using their discord id as identifier
        for (let i = 0; i < 16; i++) {
            if (!passwords.admin[0])
                passwords.admin[0] = "";

            let asciiCode = Math.round(Math.random()*(126-33)+33);
            passwords.admin[0] += String.fromCharCode(asciiCode);
        }

        this.passwords = passwords;
    }

    startServer(serverType) {
        let stats = this.createServerFolder();
        if (!stats) {
            console.log(`Can't start server ${this.identifier}.`);
            return false;
        }

        let serverConfig = SERVER_TYPES[serverType];
        if (!serverConfig) {
            console.log(`${serverType} not exists in config.`);
            return false;
        }

        this.configServer(serverConfig.game_mode, serverConfig.scripts, serverConfig.rotation);
        this.generatePasswords();

        serverConfig.passwords = this.passwords;
        serverConfig.port = this.port;

        console.log(serverConfig.passwords);
        let serverPath = `./servers/${this.identifier}`;
        this.serverProcess = spawn(`piqueserver`, ["-j", JSON.stringify(serverConfig), "-d", serverPath]);
    }
}

module.exports = Server;
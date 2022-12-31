const AoS = require("aos.js");
const Timer = require("./Timer.js");

class AoSTV {
    constructor(proxy) {
        this.client = new AoS.Client({name: "AoSTV"});
        this.matchTimer = new Timer(this);
        this.proxy = proxy;

        /*
        warmup - waiting for players
        running - match already started
        */
        this.state = "warmup";
        this.gameMode;
    }

    stateDataHandler(data) {
        let password = this.proxy.server.serverConfig.passwords.admin[0];

        this.client.joinGame({team: -1});
        this.client.sendMessage(`/login ${password}`, 1);

        this.organizeServer();
    }

    organizeServer() {
        this.client.sendLines([
            "/lock blue",
            "/lock green",
            "/lock spectator",
            "/togglebuild",
            "/togglekill",
            "/timelimit 300min" // time will be managed by aostv
        ], 1, 10);
    }

    playerJoinHandler(data) {
        if (this.state == "warmup") {
            let newPlayerId = data.player_id.value;
            let botId = this.client.localPlayerId;

            this.client.sendLines([
                `/pm #${newPlayerId} Welcome, use /pm #${botId} login <your password>`,
                `/pm #${newPlayerId} When you feel ready to start, use /pm #${botId} ready`,
                `/switch #${newPlayerId}`,
            ], 0, 1000);

            if (this.client.getOnlinePlayers().length >= this.proxy.server.serverConfig.max_players) {
                this.matchTimer.startBeginCountdown(60);
            }
        }

        this.gameMode.onPlayerJoin(data);
    }

    playerLeftHandler(data) {
        if (this.state == "warmup") {
            if (this.client.getOnlinePlayers().length-1 < this.proxy.server.serverConfig.max_players) {
                this.matchTimer.stopTimers();
                this.client.sendMessage("/say Match start stopped, waiting for players...");
            }
        }

        this.gameMode.onPlayerLeft(data);
    }

    startMatch() {
        this.state = "running";
        this.client.sendLines([
            "/togglebuild",
            "/togglekill",
            "/resetgame",
            "-- Match started! Good luck!",
        ], 0, 10);

        this.gameMode.onStart();
    }

    connect(ip, port) {
        this.client.on("StateData", this.stateDataHandler.bind(this));
        this.client.on("rawPacket", this.proxy.packetHandler.bind(this.proxy));

        this.client.on("PlayerJoin", this.playerJoinHandler.bind(this));
        this.client.on("PlayerLeft", this.playerLeftHandler.bind(this));
        this.client.on("KillAction", this.gameMode.onKill.bind(this.gameMode));

        this.client.connect(`${ip}:${port}`);
    }
}

module.exports = AoSTV;
const enet = require("enet");
const AoS = require("aos.js");
const Spectator = require("./Spectator.js");

class ProxyBase {
    constructor() {
        this.host;

        this.stateData;
        this.spectators = [];
    }

    createProxy() {
        console.log(this.port)
        this.host = enet.createServer({
            address: {
                address: "0.0.0.0",
                port: this.port
            },
            peers: 32,
            channels: 1,
            down: 0,
            up: 0
        });
        this.host.enableCompression();

        this.host.on("connect", (peer, data) => {
            console.log("Connected: ", data);
            
            let spectatorClass = new Spectator(this, peer);
            this.spectators.push(spectatorClass);

            spectatorClass.sendMap();
            peer.send(0, this.stateData); // State Data

            peer.on("message", packet => {
                let d = packet.data();
                if (d[0] == 9) {
                    let cp = new AoS.Packets.CreatePlayer();
                    cp.fields.player_id.value = 0;
                    cp.fields.weapon.value = 0;
                    cp.fields.team.value = -1;
                    cp.fields.x.value = 0;
                    cp.fields.y.value = 0;
                    cp.fields.z.value = 0;
                    cp.fields.name.value = "test";

                    let tosend = cp.encodeInfos();
                    tosend.writeUInt8(12, 0);

                    peer.send(0, tosend);
                }
            });
        })

        this.host.start();
    }

    packetHandler(data) {
        if (data[0] == 15) {
            this.stateData = data;
        }

        for (let peer in this.host.connectedPeers) {
            peer = this.host.connectedPeers[peer];
            peer.send(0, data);
        }
    }
}

module.exports = ProxyBase;
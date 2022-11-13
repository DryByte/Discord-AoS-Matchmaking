const enet = require("enet");
const AoS = require("aos.js");

class ProxyBase {
    constructor() {
        this.host;

        this.queue = [];
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
            console.log("Connectou: ", data);
            let c = 0;
            setInterval(() => {
                if (this.queue[c]) {
                    peer.send(0, this.queue[c]);
                }
                c+=1;
            }, 10)

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
        if (data[0] == 18 || data[0] == 19 || data[0] == 15) {
            this.queue.push(data);
        }

        for (let peer in this.host.connectedPeers) {
            peer = this.host.connectedPeers[peer];
            peer.send(0, data);
        }
    }
}

module.exports = ProxyBase;
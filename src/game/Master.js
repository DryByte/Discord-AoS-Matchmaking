const enet = require("enet");

const MASTER_IP = "67.205.183.163";
const MASTER_PORT = 32886;

const addr = new enet.Address(MASTER_IP, MASTER_PORT);

class Master {
    constructor(proxy) {
        this.proxy = proxy;
        this.peer;
    };

    connectMaster() {
        let client = enet.createClient();
        client.enableCompression();

        client.connect(addr, 1, 31, (err, peer, data) => {
            if (err){
                console.log(peer);
                return;
            }
            console.log("Masterlist connected");
            this.peer = peer;

            this.updateMasterInfos();
        });
    };

    updateMasterInfos() {
        let nameLength = this.proxy.infos.name.length+1;
        let gameLength = this.proxy.infos.game.length+1;
        let mapLength = this.proxy.infos.map.length+1;
        let fullSize = nameLength+gameLength+mapLength;

        let majorPacket = Buffer.alloc(4+fullSize);
        majorPacket.writeUInt8(16,0);
        majorPacket.writeUInt16LE(this.proxy.port,1);
        majorPacket.write(this.proxy.infos.name, 3, nameLength);
        majorPacket.write(this.proxy.infos.game, 3+nameLength, gameLength);
        majorPacket.write(this.proxy.infos.map, 3+fullSize-mapLength, mapLength);

        let mp = new enet.Packet(majorPacket, enet.PACKET_FLAG.UNRELIABLE);
        this.peer.send(0, mp);
    }

    updateCount() {
        let countPacket = Buffer.alloc(1);
        countPacket.writeUInt8();

        let cp = new enet.Packet(countPacket, enet.PACKET_FLAG.UNRELIABLE);
        this.peer.send(0, cp);
    }
}

module.exports = Master;
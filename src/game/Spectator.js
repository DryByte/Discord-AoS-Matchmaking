const { Packets } = require("aos.js");
const zlib = require("zlib");

class Spectator {
    constructor(proxy, peer) {
        this.proxy = proxy;
        this.peer = peer;
    }

    sendMap() {
        let mapBuffer = this.proxy.AoSTV.client.game.map.saveVXL();
        let compressedMap = zlib.deflateSync(mapBuffer);

        let mapStart = new Packets.MapStart();
        mapStart.setValue("map_size", compressedMap.length);
        this.peer.send(0, mapStart.encodeInfos());

        let mapChunkBuffer = Buffer.alloc(compressedMap.length+1);
        compressedMap.copy(mapChunkBuffer, 1);
        mapChunkBuffer.writeUInt8(19,0);

        this.peer.send(0, mapChunkBuffer);
    }
}

module.exports = Spectator;
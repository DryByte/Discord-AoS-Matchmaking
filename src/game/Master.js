const enet = require("enet");

const MASTER_IP = "67.205.183.163";
const MASTER_PORT = 32886;

const addr = new enet.Address(MASTER_IP, MASTER_PORT);

class Master {
	constructor() {
		this.peer;

		this.connect()
	};

	connect() {
		let client = enet.createClient();
		client.enableCompression();

		client.connect(addr, 1, 31, (err, peer, data) => {
			if (err){
				console.log(peer);
				return;
			}
			console.log("Masterlist connected");
			this.peer = peer;

			let majorPacket = Buffer.alloc(1+3+10+6+4);
			majorPacket.writeUInt8(16,0);
			majorPacket.writeUInt16LE(6666,1);
			majorPacket.write('Cool name', 3, 10);
			majorPacket.write('heheh', 3+10, 6);
			majorPacket.write('abc', 3+10+6, 4);

			var mp = new enet.Packet(majorPacket, enet.PACKET_FLAG.UNRELIABLE);
			peer.send(0, mp);
		});
	};
}

module.exports = Master;
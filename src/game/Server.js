const Master = require("./Master.js");
const Proxy = require("./Proxy.js");

class Server {
	constructor(name, port_range, proxy_port) {
		this.identifier = name;
		this.proxy_port = proxy_port;
		this.port_range = port_range;
		this.running = false;

		// this info is useless since every time a game ends/starts
		this.port = 0;

		this.server;
		this.proxy;
		this.master;
	}

	startProxy() {
		this.proxy = new Proxy(this.proxy_port);
		this.master = new Master();
	}

	startServer() {

	}
}

module.exports = Server;
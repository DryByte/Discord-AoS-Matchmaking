function sleep(ms) {
	return new Promise(res => {
		setTimeout(() => {
			res(1);
		}, ms);
	})
}

class Timer {
	constructor(aostv) {
		this.aostv = aostv;
		this.stop = false;
	}

	async startBeginCountdown(time) {
		let i = time;
		this.stop = false;

		while (i > 0) {
			if (this.stop)
				break;

			if (i <= 10 || !(i%15)) {
				this.aostv.client.sendMessage(`/say Match will start in ${i} seconds.`, 0);
			}

			await sleep(1000);
			i-=1;

			if (i<=0) {
				this.aostv.startMatch();
				break;
			}
		}
	}

	stopTimers() {
		this.stop = true;
	}
}

module.exports = Timer;
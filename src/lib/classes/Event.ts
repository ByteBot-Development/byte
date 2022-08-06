class Event {
	constructor(client, name) {
		this.client = client;
		this.name = name;
		this._listener = this._run.bind(this);
	}
	async _run(...args) {
		try {
			await this.run(...args);
		} catch (error) {
			console.error(error);
		}
	}

	startListener() {
		this.once ? this.client.once(this.name, this._listener) : this.client.on(this.name, this._listener);
	}

	stopListener() {
		this.client.off(this.name, this._listener);
	}
}

export default Event;

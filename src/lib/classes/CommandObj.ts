import Byte from './Byte';

export class CommandObj {
	client: any;
	name: any;
	constructor(client: Byte, name: string) {
		this.client = client;
		this.name = name;
	}
}

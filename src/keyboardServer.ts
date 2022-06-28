import { Request, Response, Express } from "express";
import * as express from "express";
import { Instance } from "express-ws";
import * as createWebsocketInstance from "express-ws";

export class KeyboardServer {
	public constructor(private instance: Instance) {}

	public sendKey(key: string) {
		const message = { key };
		console.log(this.instance.getWss().clients, message);
		this.instance
			.getWss()
			.clients.forEach((client) => client.send(JSON.stringify(message)));
	}
}

const startKeyboardServer = (port: number): KeyboardServer => {
	const app = express();
	const websocketInstance = createWebsocketInstance(app);

	websocketInstance.app.get("/heartbeat", (_req: Request, res: Response) => {
		res.status(200).send(JSON.stringify({ response: "OK" }));
	});

	websocketInstance.app.ws("/", () => {
		console.log("clients", websocketInstance.getWss().clients);
	});

	websocketInstance.app.listen(port, () => {
		console.log(`server started at http://localhost:${port}`);
	});

	return new KeyboardServer(websocketInstance);
};

export default startKeyboardServer;

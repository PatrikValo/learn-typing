import { Request, Response } from "express";
import * as express from "express";
import * as cors from "cors";
import * as path from "path";
import { Instance } from "express-ws";
import * as createWebsocketInstance from "express-ws";

const port = 8080;

export class KeyboardServer {
	public constructor(private instance: Instance) {}

	public sendKey(key: string) {
		const clients = this.instance.getWss().clients;
		clients.forEach((client) => client.send(JSON.stringify({ key })));
	}
}

const runKeyboardServer = (): KeyboardServer => {
	const app = express();
	const websocketInstance = createWebsocketInstance(app);

	websocketInstance.app.use(cors());

	websocketInstance.app.use(
		"/",
		express.static(path.join(__dirname, "../ui/dist"))
	);

	websocketInstance.app.get("/heartbeat", (_req: Request, res: Response) => {
		res.status(200).send(JSON.stringify({ response: "OK" }));
	});

	websocketInstance.app.ws("/", () => {
		// KeyboardServer implements pushing messages
	});

	websocketInstance.app.listen(port, () => {
		console.log(`server started at http://localhost:${port}`);
	});

	return new KeyboardServer(websocketInstance);
};

export default runKeyboardServer;

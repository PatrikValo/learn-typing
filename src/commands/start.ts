import * as vscode from "vscode";
import runKeyboardServer, { KeyboardServer } from "../server/index";
import * as fs from "fs";
import * as path from "path";
import Command from "./command";
import InlineCompletionProvider from "../providers/inlineCompletionProvider";

const runUIComponent = () => {
	const panel = vscode.window.createWebviewPanel(
		"openWebview",
		"Keyboard Helper",
		{ viewColumn: vscode.ViewColumn.Beside, preserveFocus: true },
		{
			enableScripts: true,
		}
	);

	panel.webview.html = fs.readFileSync(
		path.join(__dirname, "..", "ui", "dist", "index.html"),
		{ encoding: "utf-8" }
	);
};

const runCompletionComponent = (server: KeyboardServer) => {
	vscode.languages.registerInlineCompletionItemProvider(
		{ pattern: "**" },
		new InlineCompletionProvider(server)
	);
};

const startExecutor = () => {
	const server = runKeyboardServer();
	runUIComponent();
	runCompletionComponent(server);
	vscode.window.showInformationMessage("Learn typing activated!");
};

const start: Command = ["learn-typing.start", startExecutor];

export default start;

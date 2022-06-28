import * as vscode from "vscode";
import start from "./commands/start";
import prepare from "./commands/prepare";

export async function activate(context: vscode.ExtensionContext) {
	const startCommand = vscode.commands.registerCommand(...start);
	const prepareCommand = vscode.commands.registerCommand(...prepare);
	context.subscriptions.push(startCommand, prepareCommand);
}

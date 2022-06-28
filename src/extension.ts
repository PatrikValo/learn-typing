import * as vscode from "vscode";
import startKeyboardServer from "./keyboardServer";
import createInlineCompletionProvider from "./inlineCompletionProvider";
import * as fs from "fs";
import * as path from "path";
import createCore from "./core";

const getMyWebviewContent = (filename: string): Promise<string> => {
	return new Promise((resolve) =>
		fs.readFile(filename, { encoding: "utf-8" }, (err, data) => resolve(data))
	);
};

export async function activate(context: vscode.ExtensionContext) {
	const start = vscode.commands.registerCommand(
		"learn-writing.start",
		async () => {
			const server = startKeyboardServer(8080);
			const panel = vscode.window.createWebviewPanel(
				"openWebview",
				"Keyboard Helper",
				vscode.ViewColumn.Beside,
				{
					enableScripts: true,
				}
			);

			panel.webview.html = await getMyWebviewContent(
				path.join(context.extensionPath, "media", "index.html")
			);

			vscode.languages.registerInlineCompletionItemProvider(
				{ pattern: "**" },
				createInlineCompletionProvider(server)
			);

			vscode.window.showInformationMessage("Learn writing activated!");
		}
	);

	const prepare = vscode.commands.registerCommand(
		"learn-writing.prepare",
		async () => {
			if (
				!vscode.workspace.workspaceFolders ||
				!vscode.workspace.workspaceFolders.length
			) {
				vscode.window.showErrorMessage(
					"There should be open project to learn writing..."
				);
				return;
			}

			try {
				vscode.window.tabGroups.close(vscode.window.tabGroups.activeTabGroup);
				const core = createCore(vscode.workspace.workspaceFolders[0].uri.path);
				core.run();
				vscode.window.showInformationMessage("Learn writing prepared!");
			} catch (e) {
				vscode.window.showErrorMessage((e as Error).message);
			}
		}
	);

	context.subscriptions.push(start, prepare);
}

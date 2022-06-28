import * as vscode from "vscode";
import createCore from "../core";
import Command from "./command";

const prepareExecutor = () => {
	if (
		!vscode.workspace.workspaceFolders ||
		!vscode.workspace.workspaceFolders.length
	) {
		vscode.window.showErrorMessage(
			"There should be open project to learn typing..."
		);
		return;
	}

	try {
		vscode.window.tabGroups.close(vscode.window.tabGroups.activeTabGroup);
		const core = createCore(vscode.workspace.workspaceFolders[0].uri.path);
		core.run();
		vscode.window.showInformationMessage("Learn typing prepared!");
	} catch (e) {
		vscode.window.showErrorMessage((e as Error).message);
	}
};

const prepare: Command = ["learn-typing.prepare", prepareExecutor];

export default prepare;

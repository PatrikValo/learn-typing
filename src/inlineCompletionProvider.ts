import * as vscode from "vscode";
import { KeyboardServer } from "./keyboardServer";
import { hiddenDirname } from "./core";
import * as path from "path";
import * as fs from "fs";

interface MyInlineCompletionItem extends vscode.InlineCompletionItem {}

const createInlineCompletionProvider = (
	server: KeyboardServer
): vscode.InlineCompletionItemProvider => {
	return {
		provideInlineCompletionItems: async (document, position) => {
			if (
				!vscode.workspace.workspaceFolders ||
				!vscode.workspace.workspaceFolders.length
			) {
				return;
			}
			const source = vscode.workspace.workspaceFolders[0].uri.path;
			const suggestionFile = path.join(
				source,
				hiddenDirname,
				path.relative(source, document.fileName)
			);

			const insertText =
				fs.readFileSync(suggestionFile, { encoding: "utf-8" }).split("\n")[
					position.line
				] + "\n";
			server.sendKey(insertText[position.character] ?? "");

			return [
				{
					insertText,
					range: new vscode.Range(
						position.line,
						0,
						position.line,
						insertText.length
					),
				},
			] as MyInlineCompletionItem[];
		},
	};
};

export default createInlineCompletionProvider;

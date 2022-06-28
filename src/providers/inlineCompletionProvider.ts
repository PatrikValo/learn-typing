import * as vscode from "vscode";
import { KeyboardServer } from "../server/index";
import { hiddenDirname } from "../core";
import * as path from "path";
import * as fs from "fs";

class InlineCompletionProvider implements vscode.InlineCompletionItemProvider {
	constructor(private readonly server: KeyboardServer) {}

	provideInlineCompletionItems(
		document: vscode.TextDocument,
		position: vscode.Position
	): vscode.ProviderResult<
		vscode.InlineCompletionItem[] | vscode.InlineCompletionList
	> {
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
		this.server.sendKey(insertText[position.character] ?? "");

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
		] as vscode.InlineCompletionItem[];
	}
}

export default InlineCompletionProvider;

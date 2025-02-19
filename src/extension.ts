// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let outputChannel: vscode.OutputChannel;

/**
 * Prints the given content on the output channel.
 *
 * @param content The content to be printed.
 * @param reveal Whether the output channel should be revealed.
 */
export const printChannelOutput = (content: string, reveal = false): void => {
	outputChannel.appendLine(content);
	if (reveal) {
		outputChannel.show(true);
	}
};
// const exec = (cmd: string) =>
// 	new Promise((res, rej) =>
// 		child_process.exec(cmd, (err, stdout, stderr) =>
// 			err ? rej([err, stderr]) : res([stdout, stderr])
// 		)
// 	);

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	outputChannel = vscode.window.createOutputChannel("Key Runner");
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "key-runner" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('key-runner.run', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from key-runner!');

		try {
			await vscode.commands.executeCommand('workbench.action.files.save');
		} catch (error) {
			vscode.window.showErrorMessage('保存文件时出错:' + error);
		}
		async function getTerminal(): Promise<vscode.Terminal> {
			let terminal: vscode.Terminal | undefined = undefined;
			terminal = vscode.window.terminals.find(t => t.name === "Runner");
			if (!terminal) {
				terminal = vscode.window.createTerminal("Runner");
			}

			return terminal;
		}
		const terminal = await getTerminal();

		terminal.sendText(`go-task`);
		terminal.show();
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
